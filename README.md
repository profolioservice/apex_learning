# Apex Learning Academy: Profolio concept demo

A polished, responsive coaching-centre marketing website built to demonstrate how Profolio can present courses and guide enquiries. The institute-specific content is sample configuration, not verified business information. Replace it before production.

## Technology

- Next.js App Router and React with TypeScript
- Tailwind CSS 4 via PostCSS, plus a small global design system
- Lucide React icons and Motion for React (with reduced-motion support)
- React Hook Form and Zod for accessible enquiry validation
- Optional Supabase REST persistence for the enquiry API; no credentials are included

## Features

The site includes Home, Courses, dynamic Course Details, Faculty, Results & Achievements, About, Contact/Enquire, Privacy Policy, Terms & Conditions, and a custom 404. Course search, category and audience filters, faculty search, mobile navigation, FAQ disclosure, course-related enquiry prefilling, metadata, sitemap, and robots rules are implemented. Contact links are inactive until real contact details are set. No student results, testimonials, faculty identities, awards, statistics, prices, or availability claims have been invented.

### Project structure

- `app/`: App Router pages, shared layout, metadata, robots/sitemap, custom 404, and `/api/enquiries`.
- `components/layout/`: site navigation and footer.
- `components/home/`: responsive home sections and call to action.
- `components/courses/`: course cards and the working course directory.
- `components/forms/`: validated enquiry interface.
- `components/faculty/`: faculty placeholder search/listing.
- `components/ui/`: common visual and navigation elements.
- `data/`: editable academy configuration, course catalogue, audiences, FAQs, faculty placeholders and verified results.
- `lib/`: validation and canonical metadata helpers.
- `supabase/schema.sql`: optional enquiry-table schema.

## Install and run locally

Requirements: Node.js 20.9+ and pnpm 11.25.0 (pinned in `package.json`).

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

The development server listens on port 3000. Type-check and lint with `pnpm typecheck` and `pnpm lint`; create a production build with `pnpm build`, then serve it with `pnpm start`.

## Customize academy information

1. Edit `data/site.ts` for institute name, short name, tagline, verified phone/WhatsApp/email/address/location, social links, SEO defaults, public URL, and brand colours. The actual academy should supply these values. Empty contacts deliberately render placeholders and never create fake working links.
2. The shared layout applies this palette to the site-wide CSS tokens. Edit `app/globals.css` only if the design system itself changes; Outfit and Inter are loaded through Google Fonts with system fallbacks.
3. Edit `data/courses.ts` for categories, course descriptions, audiences, subjects, objectives, and featured status. Course slugs create matching `/courses/[slug]` detail pages. Verify every entry against the institute's current catalogue and official examination information.
4. Edit `data/audiences.ts` to change the audience filter groups.
5. Replace `data/faculty.ts` placeholders only with verified, approved names, subjects, qualifications and biographies; supply genuine, licensed portraits if desired.
6. Add outcomes to `data/results.ts` only after verifying the source, examination/year, exact claim and permission to publish. The results page is intentionally empty otherwise.
7. Update `data/faqs.ts` with current institute-approved answers. Keep fees, schedules, demo availability, delivery mode and response times accurate.
8. Configure `NEXT_PUBLIC_SITE_URL` to the actual public domain. Until then the project omits absolute canonical/OG links and returns an empty sitemap rather than guessing a URL. Never put internal Preview URLs in public metadata.

## Configure enquiry persistence (optional)

The enquiry form validates in both the browser and server. It confirms receipt only if the database accepts a real insert. Without credentials the API responds with HTTP 503 and the form shows a friendly configuration-unavailable message; it does not fake submission success. The rest of the website works without backend credentials.

To enable persistence:

1. Create a Supabase project under the institute's control.
2. Apply `supabase/schema.sql` in the project's SQL editor to create `public.enquiries`, enable row-level security, and add named field/option checks. It revokes table access from `PUBLIC`, `anon`, and `authenticated`. The service role receives only insert access to the form fields and select access to `id` and `created_at` for the insert confirmation. Reapplication is idempotent for those constraints and grants. If an existing table has rows that violate a new check, review and correct those rows before applying; do not bypass the constraint. No public policy or enquiry-read endpoint is added.
3. Set `SUPABASE_URL` to the HTTPS root URL of that project and `SUPABASE_SERVICE_ROLE_KEY` as server-only environment variables in `.env.local` for local development, and in the hosting provider's server environment for production. The API refuses non-HTTPS URLs. Never use `NEXT_PUBLIC_` for the service-role key or commit real secrets.
4. Submit an enquiry in the contact page and verify the row is present in the intended Supabase project. Do not declare the form production-ready until this real test succeeds.
5. Establish access restrictions, retention/deletion processes, and staff controls for that database. Supabase's service-role credential bypasses row-level security and may have privileges elsewhere in the project, so protect it and rotate it if exposed even though this table's grants are narrowed.

### Current connection status (2026-10-30)

The integration code and setup schema exist, but there is no live Supabase connection. The project environment and secret configuration contain no Supabase URL/key, no `.env.local` or `DATABASE_URL` exists, and WebDev's managed Database feature is off. Consequently the current API returns HTTP 503 for an otherwise valid enquiry and stores no data. The SQL has **not** been applied to an external project. Without credentials, a valid submission must show the configuration-unavailable message, not a success state.

The API validates the course slug and fields, caps the request body at 16 KB, includes a hidden honeypot, and avoids logging enquiry content. An optional in-process IP rate limit is disabled by default. To enable it, set `TRUSTED_CLIENT_IP_HEADER` only to a hosting-provider header that the ingress overwrites with one canonical client IP and strips from visitor-supplied requests; the API validates that value as a single IPv4/IPv6 address. It deliberately does not trust an arbitrary `X-Forwarded-For` value. Even when enabled, the in-memory limiter is per application instance and is not a substitute for a provider-level WAF or distributed rate limit at scale. No email notification provider is configured. The client-selected contact preference is recorded but does not send an email or message automatically.

## Contact and WhatsApp

Set `phone`, `whatsappNumber`, `email`, and `address` in `data/site.ts`. The WhatsApp action uses a prefilled general course enquiry and appears as unavailable until a real number is provided. Phone and email links become active only when valid values are present. Do not launch using placeholder contacts.

## Legal pages

`/privacy` and `/terms` are starting-point drafts that explain the demo's actual optional persistence behavior. Replace the responsible legal entity/contact placeholders, confirm subprocessors and retention, set effective dates, and have the academy review both documents against its actual practices and applicable law. These pages are not legal advice or a verified compliance claim.

## Deploy to Vercel

1. Connect the project repository to Vercel and select the Next.js framework preset.
2. Set `NEXT_PUBLIC_SITE_URL` to the confirmed production domain; add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` only if the academy has configured and tested Supabase.
3. Apply the production database schema, set up access/retention procedures, and test actual enquiry persistence.
4. Confirm domain, HTTPS, course/contact/legal content, mobile layouts and all metadata on the public deployment. No deployment secrets belong in the browser bundle.

## Known limitations

- No academy contact details, legal entity, public domain, confirmed courses, batch details, prices, verified faculty, results or testimonials were provided.
- No Supabase or email credentials are configured; enquiry submission is expected to return an honest configuration-unavailable response until set up.
- The optional per-IP rate limiter is off until a sanitized trusted client-IP header is configured; basic schema checks, a payload cap and a honeypot remain active. Add provider-level abuse controls before accepting high-volume public traffic.
- The draft Privacy Policy and Terms require institute/legal review. WCAG 2.2 AA conformance has not been certified.
- Social links, portraits and external brand assets should be added only when the academy supplies approved values/assets.

## Verification record

The final Next.js production build completed successfully. `pnpm typecheck` passed. `pnpm lint` exited successfully with no errors; it reports one warning for the required literal default export in `app.config.ts`.

A Chromium end-to-end pass on the production server passed **22/22 assertions**: all 18 generated public URLs rendered with primary headings; both unknown-course and unknown-page requests returned the custom 404; search, category/audience filters, clear-results/empty state, faculty search, FAQ keyboard activation, mobile Escape and route navigation, course-specific enquiry selection, 28 internal destinations, client validation, loading/duplicate prevention and honest error handling all worked. No inactive contact values produced real links and no unexpected browser runtime/console errors were observed.

Responsive width checks found no horizontal overflow across Home, Courses, Contact and a Course Details page at **48 viewport/page combinations** from 320 px through 1920 px. Desktop full-page views at 1280 px and mobile views at 375 px were reviewed for Home, Courses and Contact.

Direct production API checks returned HTTP 400 for invalid fields and the honeypot, HTTP 413 for an oversized payload, and HTTP 503 with the friendly configuration-unavailable response for otherwise-valid data without a backend. In the final default configuration, six repeated requests carrying visitor-controlled `X-Forwarded-For` values all returned schema-validation HTTP 400; they did not activate a rate-limit bucket. The opt-in limiter branch was separately verified on a loopback-only production listener with an explicit test header: five requests returned HTTP 400, the sixth from that configured address returned HTTP 429, and a different address began a fresh bucket. The route manifest returned nine page patterns including `/courses/:slug`; `/sitemap.xml` and `/robots.txt` returned HTTP 200. The sitemap is intentionally empty until the real public origin is set.

**Not testable without institute services/details:** a successful persistent enquiry insert and success screen, email notification delivery, and canonical/sitemap output for a real public domain. No production deployment was performed. The expected HTTP 503 configuration-unavailable path was tested; no fake submission was reported as successful.

### Backend audit and verification (2026-10-30)

- Audit result: the Next.js `POST /api/enquiries` and client form already existed, with browser and server Zod validation and an optional direct Supabase REST insert. On success the server now requires exactly one returned row with a valid generated `id` and `created_at`, requesting only those fields. The route is write-only. There is no auth/admin or alternate database client. Server is enabled, managed Database is off, and no Supabase credentials, `.env.local`, or `DATABASE_URL` are configured. No real enquiry is currently persisted.
- The final production build and strict TypeScript check passed. ESLint exited with zero errors and one warning for the required literal project-logo export in `app.config.ts`.
- Production API checks passed for a valid request with missing credentials (HTTP 503 `CONFIGURATION_UNAVAILABLE`), invalid select value (400), unknown course (400), honeypot (400), malformed JSON (400), content-length and chunked payloads over 16 KiB (413), and `GET /api/enquiries` (405). A valid browser form request reached the endpoint, showed the loading/disabled state, suppressed a repeated submit, preserved fields after the 503, and showed no false success.
- With dummy values on loopback-only test servers, an HTTP Supabase URL was rejected with 503 and an unreachable HTTPS-shaped endpoint returned a generic 502 without exposing endpoint/key text. These were failure-path checks only; no external database was contacted.
- The schema was applied twice in a temporary in-memory PostgreSQL-compatible engine. It accepted a valid test row, rejected eight invalid-field cases, and showed row-level security enabled with zero public policies. Simulated Supabase roles confirmed that `anon` cannot read or insert and `service_role` can insert and return only `id`/`created_at`, but cannot read enquiry PII, update or delete rows. This checks SQL only; it does not apply the schema to Supabase or prove production persistence. A bundle scan found no Supabase key/URL references in browser static assets.

**Still required from the institute:** choose/create an institute-controlled Supabase project, run `supabase/schema.sql` in that project's SQL editor, configure its HTTPS root `SUPABASE_URL` and server-only `SUPABASE_SERVICE_ROLE_KEY` through a protected environment, then make a real test enquiry and confirm the row appears there. Only that final live check can verify a successful submission. No credentials should be pasted into source files or committed.

### Follow-up homepage and copy refinements (2026-10-29)

- Production Chromium passed the final layout check at 17 widths from 320 px through 1920 px. There was no horizontal overflow, hero-title clipping, or roadmap/study-focus card overlap.
- The final hero was visually reviewed at 1366 × 768, 1536 × 864, 1024 × 768, 768 × 1024 and 375 × 812. At both requested desktop resolutions the headline, supporting copy, CTAs and illustration fit comfortably in the first viewport. Tablet and mobile content stacks naturally.
- The production hero entrance animation reached its visible state. Explore Courses routed to `/courses`; Talk to Our Team and Enquire Now routed to `/contact`. The mobile menu opened, closed with Escape, and navigated to Courses. The FAQ opened. Chromium reported no page or console errors.
- A tracked-project search found no remaining em dash characters, and the specified homepage badge is absent.
- The final production build and TypeScript check passed. ESLint exited successfully with zero errors and one warning for the required literal `app.config.ts` export.

## Production launch checklist

- [ ] Confirm the legal entity, public location, address, phone, WhatsApp, email and approved social links.
- [ ] Confirm course availability, examination coverage, audiences, modules, durations, formats, batches, prerequisites, fees and policies.
- [ ] Replace faculty placeholders with verified, approved educator details; add only appropriately licensed portraits.
- [ ] Add only source-verified achievements and testimonials with required permission.
- [ ] Set the canonical public domain and verify page metadata, sitemap and robots on production.
- [ ] Configure and security-review Supabase (or another chosen submission backend), server-side secrets, access controls, abuse protection, data retention and deletion.
- [ ] Verify a real accepted form insert; test provider failure and configuration-unavailable behavior.
- [ ] Review actual privacy/terms documents with the responsible institute and legal adviser.
- [ ] Test routes, keyboard use, mobile/tablet/desktop widths, links, search/filters, responsive zoom and browser console.
- [ ] Run lint, TypeScript checks and a production build; record any uncompleted checks.
