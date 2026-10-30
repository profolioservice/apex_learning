"use client";

import { useRef, useState } from "react";
import type { BaseSyntheticEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Check, LoaderCircle, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { courses } from "@/data/courses";
import { enquirySchema, type EnquiryValues } from "@/lib/enquiry";

type EnquiryFormProps = { courseSlug?: string; compact?: boolean };
type SubmitState = { type: "error" | "success"; message: string } | null;
type ApiResult = { success?: boolean; code?: string; message?: string; errors?: { path: string; message: string }[] };
const formFieldNames = new Set<keyof EnquiryValues>(["fullName", "email", "phone", "courseSlug", "educationLevel", "preferredFormat", "preferredContactMethod", "message"]);

export function EnquiryForm({ courseSlug, compact = false }: EnquiryFormProps) {
  const [submitState, setSubmitState] = useState<SubmitState>(null);
  const [isSending, setIsSending] = useState(false);
  const submitLock = useRef(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setError } = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      fullName: "", email: "", phone: "", courseSlug: courseSlug ?? "",
      educationLevel: "", preferredFormat: "", preferredContactMethod: "", message: "",
    },
  });

  const onSubmit = async (values: EnquiryValues, event?: BaseSyntheticEvent) => {
    if (submitLock.current) return;
    submitLock.current = true;
    setIsSending(true);
    setSubmitState(null);
    const form = event?.target as HTMLFormElement | undefined;
    const website = form ? String(new FormData(form).get("website") ?? "") : "";

    try {
      if (website.trim()) {
        setSubmitState({ type: "error", message: "This submission could not be accepted. Please review the form and try again." });
        return;
      }
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website }),
      });
      const result: ApiResult = await response.json().catch(() => ({}));
      if (response.ok && result.success === true) {
        setSubmitState({ type: "success", message: result.message ?? "Your enquiry has been received." });
        reset({ fullName: "", email: "", phone: "", courseSlug: courseSlug ?? "", educationLevel: "", preferredFormat: "", preferredContactMethod: "", message: "" });
        return;
      }
      if (result.errors?.length) {
        for (const issue of result.errors) {
          if (formFieldNames.has(issue.path as keyof EnquiryValues)) {
            setError(issue.path as keyof EnquiryValues, { type: "server", message: issue.message });
          }
        }
      }
      if (response.status === 503 || result.code === "CONFIGURATION_UNAVAILABLE") {
        setSubmitState({ type: "error", message: result.message ?? "The enquiry service is not configured yet. Please contact the institute directly once its details are available." });
        return;
      }
      setSubmitState({ type: "error", message: result.message ?? "We couldn’t send your enquiry just now. Please review your details or try again later." });
    } catch {
      setSubmitState({ type: "error", message: "We couldn’t reach the enquiry service. Please check your connection and try again." });
    } finally {
      submitLock.current = false;
      setIsSending(false);
    }
  };

  const onFormSubmit = (event: BaseSyntheticEvent) => {
    void handleSubmit(onSubmit)(event);
  };

  const fieldError = (name: keyof EnquiryValues) => errors[name]?.message;
  const errorProps = (name: keyof EnquiryValues) => ({
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": fieldError(name) ? `${name}-error` : undefined,
  });
  const label = (text: string, required = false) => <span className="form-label">{text}{required && <> <span className="required-mark" aria-hidden="true">*</span><span className="sr-only"> (required)</span></>}</span>;
  const fieldMessage = (name: keyof EnquiryValues) => fieldError(name) ? <p className="field-error" id={`${name}-error`} role="alert">{String(fieldError(name))}</p> : <p className="field-error" aria-hidden="true" />;

  return (
    <div className="form-card">
      <h2>{compact ? "Ask about this course" : "Send a course enquiry"}</h2>
      <p>Share a few details so the institute can understand what information you need.</p>
      {submitState?.type === "success" ? (
        <div className="form-success" role="status" aria-live="polite"><span className="form-success-icon"><Check aria-hidden="true" /></span><h3>Enquiry received</h3><p>{submitState.message}</p></div>
      ) : (
        <>
          {submitState?.type === "error" && <div className="form-alert" role="alert"><AlertCircle aria-hidden="true" /><span>{submitState.message}</span></div>}
          <form onSubmit={onFormSubmit} noValidate>
            <div className="hp-field" aria-hidden="true"><label htmlFor="website">Leave this field empty</label><input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" /></div>
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="fullName">{label("Full name", true)}</label><input className="input" id="fullName" autoComplete="name" {...register("fullName")} {...errorProps("fullName")} placeholder="Your name" />{fieldMessage("fullName")}
              </div>
              <div className="form-field">
                <label htmlFor="email">{label("Email address", true)}</label><input className="input" id="email" type="email" autoComplete="email" {...register("email")} {...errorProps("email")} placeholder="you@example.com" />{fieldMessage("email")}
              </div>
              <div className="form-field">
                <label htmlFor="phone">{label("Phone number", true)}</label><input className="input" id="phone" type="tel" autoComplete="tel" {...register("phone")} {...errorProps("phone")} placeholder="Include your country code if relevant" />{fieldMessage("phone")}
              </div>
              <div className="form-field">
                <label htmlFor="courseSlug">{label("Course / examination", true)}</label><select className="select" id="courseSlug" {...register("courseSlug")} {...errorProps("courseSlug")}><option value="">Choose a course</option>{courses.map((course) => <option key={course.slug} value={course.slug}>{course.title}</option>)}</select>{fieldMessage("courseSlug")}
              </div>
              <div className="form-field">
                <label htmlFor="educationLevel">{label("Current education level")}</label><input className="input" id="educationLevel" {...register("educationLevel")} {...errorProps("educationLevel")} placeholder="Optional" />{fieldMessage("educationLevel")}
              </div>
              <div className="form-field">
                <label htmlFor="preferredFormat">{label("Preferred learning format")}</label><select className="select" id="preferredFormat" {...register("preferredFormat")} {...errorProps("preferredFormat")}><option value="">No preference / not sure</option><option value="in-person">In person</option><option value="online">Online</option><option value="hybrid">Hybrid</option></select>{fieldMessage("preferredFormat")}
              </div>
              <div className="form-field">
                <label htmlFor="preferredContactMethod">{label("Preferred contact method")}</label><select className="select" id="preferredContactMethod" {...register("preferredContactMethod")} {...errorProps("preferredContactMethod")}><option value="">No preference</option><option value="email">Email</option><option value="phone">Phone</option><option value="whatsapp">WhatsApp</option></select>{fieldMessage("preferredContactMethod")}
              </div>
              <div className="form-field form-field--full">
                <label htmlFor="message">{label("Message")}</label><textarea className="textarea" id="message" {...register("message")} {...errorProps("message")} placeholder="What would you like to know? (optional)" />{fieldMessage("message")}
              </div>
            </div>
            <div className="form-submit-row"><button className="button button--primary" type="submit" disabled={isSubmitting || isSending}>{isSubmitting || isSending ? <><LoaderCircle aria-hidden="true" className="spin" /> Sending…</> : <><Send aria-hidden="true" /> Send enquiry</>}</button><span className="small-note">No success message is shown unless a configured enquiry service confirms receipt.</span></div>
            <p className="form-footnote">Only share information needed to respond to your enquiry. See our <a href="/privacy" style={{ color: "var(--color-brand)", textDecoration: "underline" }}>Privacy Policy</a>.</p>
          </form>
        </>
      )}
    </div>
  );
}
