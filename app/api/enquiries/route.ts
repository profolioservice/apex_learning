import { isIP } from "node:net";
import { NextResponse } from "next/server";
import { courses } from "@/data/courses";
import { enquiryRequestSchema } from "@/lib/enquiry";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const requestsByAddress = new Map<string, { count: number; resetAt: number }>();
const json = (payload: unknown, status = 200, extraHeaders: Record<string, string> = {}) =>
  NextResponse.json(payload, { status, headers: { "Cache-Control": "no-store", ...extraHeaders } });

function trustedClientAddress(request: Request) {
  const headerName = process.env.TRUSTED_CLIENT_IP_HEADER?.trim().toLowerCase();
  if (!headerName || !/^[a-z0-9-]{1,100}$/.test(headerName)) return null;
  const candidate = request.headers.get(headerName)?.trim();
  if (!candidate || candidate.length > 45 || candidate.includes(",") || isIP(candidate) === 0) return null;
  return candidate;
}

function rateLimit(address: string, now = Date.now()) {
  const previous = requestsByAddress.get(address);
  if (!previous || previous.resetAt <= now) {
    requestsByAddress.set(address, { count: 1, resetAt: now + WINDOW_MS });
    if (requestsByAddress.size > 5000) {
      for (const [key, value] of requestsByAddress) if (value.resetAt <= now) requestsByAddress.delete(key);
    }
    return { allowed: true, retryAfter: 0 };
  }
  if (previous.count >= MAX_REQUESTS) return { allowed: false, retryAfter: Math.ceil((previous.resetAt - now) / 1000) };
  previous.count += 1;
  return { allowed: true, retryAfter: 0 };
}

function supabaseEnquiriesEndpoint(configuredUrl: string | undefined) {
  if (!configuredUrl) return null;
  try {
    const base = new URL(configuredUrl);
    if (base.protocol !== "https:" || base.username || base.password || base.pathname !== "/" || base.search || base.hash) return null;
    const endpoint = new URL("/rest/v1/enquiries", base);
    endpoint.searchParams.set("select", "id,created_at");
    return endpoint;
  } catch {
    return null;
  }
}

function isPersistedEnquiry(value: unknown): value is { id: string; created_at: string } {
  if (typeof value !== "object" || value === null) return false;
  const row = value as Record<string, unknown>;
  return typeof row.id === "string" &&
    /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(row.id) &&
    typeof row.created_at === "string" && Number.isFinite(Date.parse(row.created_at));
}

const MAX_REQUEST_BYTES = 16_384;

export async function POST(request: Request) {
  const address = trustedClientAddress(request);
  if (address) {
    const limit = rateLimit(address);
    if (!limit.allowed) {
      return json({ success: false, code: "RATE_LIMITED", message: "Too many enquiries were sent from this connection. Please try again in a few minutes." }, 429, { "Retry-After": String(limit.retryAfter) });
    }
  }

  const declaredLength = request.headers.get("content-length");
  if (declaredLength && Number(declaredLength) > MAX_REQUEST_BYTES) {
    return json({ success: false, code: "PAYLOAD_TOO_LARGE", message: "Please shorten your enquiry and try again." }, 413);
  }

  const reader = request.body?.getReader();
  if (!reader) return json({ success: false, code: "INVALID_JSON", message: "Please submit the enquiry form with valid information." }, 400);
  const chunks: Uint8Array[] = [];
  let receivedBytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      receivedBytes += value.byteLength;
      if (receivedBytes > MAX_REQUEST_BYTES) {
        await reader.cancel().catch(() => undefined);
        return json({ success: false, code: "PAYLOAD_TOO_LARGE", message: "Please shorten your enquiry and try again." }, 413);
      }
      chunks.push(value);
    }
  } catch {
    return json({ success: false, code: "INVALID_JSON", message: "Please submit the enquiry form with valid information." }, 400);
  } finally {
    reader.releaseLock();
  }

  const requestBytes = new Uint8Array(receivedBytes);
  let offset = 0;
  for (const chunk of chunks) {
    requestBytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  let raw: unknown;
  try {
    raw = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(requestBytes));
  } catch {
    return json({ success: false, code: "INVALID_JSON", message: "Please submit the enquiry form with valid information." }, 400);
  }

  const parsed = enquiryRequestSchema.safeParse(raw);
  if (!parsed.success) {
    const errors = parsed.error.issues.map((issue) => ({ path: issue.path.join("."), message: issue.message }));
    return json({ success: false, code: "VALIDATION_ERROR", message: "Please review the highlighted fields and try again.", errors }, 400);
  }
  if (parsed.data.website) {
    return json({ success: false, code: "INVALID_SUBMISSION", message: "This submission could not be accepted." }, 400);
  }

  const course = courses.find((item) => item.slug === parsed.data.courseSlug);
  if (!course) return json({ success: false, code: "INVALID_COURSE", message: "Choose a course from the available list." }, 400);

  const endpoint = supabaseEnquiriesEndpoint(process.env.SUPABASE_URL);
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!endpoint || !serviceKey?.trim()) {
    return json({ success: false, code: "CONFIGURATION_UNAVAILABLE", message: "The enquiry service is not configured yet. No message has been sent. Please contact the institute using its confirmed contact details once available." }, 503);
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        full_name: parsed.data.fullName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        course_slug: course.slug,
        education_level: parsed.data.educationLevel || null,
        preferred_format: parsed.data.preferredFormat || null,
        preferred_contact_method: parsed.data.preferredContactMethod || null,
        message: parsed.data.message || null,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      return json({ success: false, code: "PROVIDER_ERROR", message: "We couldn’t send your enquiry right now. Please try again later or use the institute’s confirmed contact details." }, 502);
    }
    let insertedRows: unknown;
    try {
      insertedRows = await response.json();
    } catch {
      return json({ success: false, code: "PROVIDER_ERROR", message: "We couldn’t confirm that your enquiry was saved. Please try again later or use the institute’s confirmed contact details." }, 502);
    }
    if (!Array.isArray(insertedRows) || insertedRows.length !== 1 || !isPersistedEnquiry(insertedRows[0])) {
      return json({ success: false, code: "PROVIDER_ERROR", message: "We couldn’t confirm that your enquiry was saved. Please try again later or use the institute’s confirmed contact details." }, 502);
    }
    return json({ success: true, message: "Your enquiry has been received. The institute can follow up using the contact information you provided." }, 201);
  } catch {
    return json({ success: false, code: "PROVIDER_UNAVAILABLE", message: "The enquiry service could not be reached. Please try again later or use the institute’s confirmed contact details." }, 502);
  }
}
