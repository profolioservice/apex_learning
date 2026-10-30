# Implementation Plan: Apex Learning Academy

## Scope and approach

Build the complete Profolio portfolio-demo marketing website described in the project brief. Use Next.js App Router with TypeScript, Tailwind CSS and server rendering for meaningful crawler-visible page content. Centralize editable academy and course content; use reusable shared navigation, footer, course cards, accordions and form components. Provide all ten requested page types, including data-driven course detail routes and a custom not-found page. Keep client-side code limited to navigation, filters/search, accordions and form behavior.

The catalogue will contain the nine requested examination/training categories and four highlighted programs; descriptions are general and factual. Unverified academy details (formats, durations, schedules, fees and faculty credentials) remain clearly identified as unavailable or placeholders. Faculty profiles are clearly marked replaceable demo placeholders; achievements use a verified-results empty state. No fictitious contacts, claims, testimonials, awards, rankings, or outcomes.

The visual standard is a polished, professional coaching academy rather than a generic dashboard or student project. Lead with a strong editorial hero, clear and prominent CTAs, a crafted CSS learning-roadmap illustration, attractive course cards, deliberate but balanced spacing, a refined faculty presentation, and a cohesive footer. Avoid excessive whitespace, boilerplate card-grid layouts, fabricated scores and stock-photo-heavy imagery. Preserve the requested purple-led restrained palette and Outfit/Inter pairing.

The enquiry form will have accessible client-side validation and server-side schema validation, loading/error/confirmed-success states, duplicate-submit prevention, request-size bounds and a honeypot. An optional in-process IP limit is enabled only when the host supplies a configured, sanitized single-IP header; never infer a trusted address from arbitrary visitor-controlled forwarded headers. Return success only after the configured persistence service returns exactly one inserted row with a valid generated identifier and creation timestamp. If backend credentials are absent, return a friendly configuration-unavailable error; never simulate success. Document optional Supabase configuration in `.env.example` and README; all secrets are server-only. Privacy and Terms describe actual demo behavior and are flagged for academy/legal review.

## Platform and dependencies

Use pnpm with a pinned package manager, Next.js App Router, TypeScript, Tailwind CSS, Lucide icons, React Hook Form and Zod; use Motion only for restrained value-adding transitions and respect reduced motion. Request the managed server capability for SSR and server-validated form submission. Do not enable an unnecessary managed database; optional Supabase persistence is credential-configured. Add route-specific metadata, robots and sitemap support; emit absolute canonical/OG URLs only after a real public origin is configured. Do not guess an origin or institute location.

## Design

Follow the user's premium modern-education identity: white and soft-neutral surfaces, near-black type, slate secondary text, purple-to-violet as a selective signature, cyan used sparingly, thin borders, readable density, Outfit headings and Inter body. Create a CSS-built learning roadmap/timetable hero (no scores or fake outcomes). Use an intentional, replaceable text wordmark with a simple abstract clarity/learning mark. Navigation, forms and controls are keyboard accessible. Animation is restrained and never required for comprehension.

Brand essence: organized preparation for prospective students and parents, communicated with clarity, restraint and approachability. Voice: specific, encouraging and informative. Example lines: “Your goals deserve a smarter preparation strategy.” “Ask us which details are available for your target course.”

## Customization model

One configuration/data layer owns brand name/tagline/colors, contact/address/social links, public-origin/SEO defaults, category/course data, faculty placeholders, FAQs and verified achievements. Components consume that layer instead of repeating academy facts. Keep secrets in environment configuration, not public data.

## Project structure

- `app/`: App Router layout and public routes, route metadata, sitemap/robots and enquiry API route.
- `components/layout/`: responsive site header, mobile navigation and footer.
- `components/home/`: homepage sections and custom CSS learning visual.
- `components/courses/`: searchable/filterable directory, course cards and reusable detail content.
- `components/forms/`: accessible enquiry form and status feedback.
- `components/ui/`: small reusable accessible primitives.
- `data/`: central academy configuration, courses/categories, FAQs, clearly marked faculty placeholders and empty verified achievements.
- `lib/`: validation, contact-link helpers and optional persistence/abuse logic.
- `public/`: route manifest and static assets.
- Root: pinned package configuration, Next/Tailwind/TypeScript setup, `.env.example`, README and this plan.

## Backend audit and architecture

The current App Router includes a POST-only `/api/enquiries` route. The React Hook Form sends to that route, shared Zod schemas validate on both client and server, and the server writes to Supabase PostgREST using `SUPABASE_URL` and a server-only `SUPABASE_SERVICE_ROLE_KEY`. The SQL migration enables row-level security, revokes table access from public/anonymous/authenticated roles and restricts the service role on this table to form-column insertion and identifier/timestamp selection for confirmation. This is an existing integration path, not proof of an active database connection.

The sandbox environment has neither Supabase credentials nor `.env.local`; WebDev reports Server enabled and its managed Database disabled, and no Supabase secret declarations exist. The current enquiry endpoint therefore returns configuration-unavailable and no enquiry can yet be persisted. There is no authentication, admin interface, alternative database client, or enquiry-read endpoint. Course catalogue, search, faculty and results content are static and do not require database access.

Retain the existing Supabase REST architecture without adding a second backend or unrelated dependencies. Validate form option values and database constraints; require an HTTPS Supabase root URL before sending the service-role credential; request only the generated `id` and `created_at` for insert confirmation, and do not return success unless exactly one valid inserted row is represented. Keep failures non-successful, stream-bound request bodies, and document precisely which external setup remains. Do not claim a connected database or live persistence without project credentials, applied schema and a real verified insert.

## Material constraints

No academy contact details, public origin, backend credentials, verified faculty or results were supplied. Until supplied, contact placeholders remain inactive; form submission reports configuration unavailable; unverified academy content stays absent or clearly marked. Privacy/Terms require review against the actual academy and jurisdiction before launch. Do not claim accessibility certification, legal compliance or backend success without evidence.
