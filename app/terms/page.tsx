import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { siteConfig } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Terms & Conditions", "Draft terms for the Apex Learning Academy concept website. The operating institute must review them before production.", "/terms");

export default function TermsPage() {
  return <>
    <section className="page-hero"><div className="container"><Breadcrumbs items={[{ label: "Terms & Conditions" }]} /><span className="section-kicker">Website information</span><h1 className="page-title" style={{ marginTop: 12 }}>Terms &amp; Conditions</h1><p className="page-intro">A draft for the concept website. The responsible institute should obtain a review against its actual services and applicable law before launch.</p></div></section>
    <section className="page-content"><article className="container container--narrow prose">
      <p className="review-notice"><strong>Review required:</strong> These general terms are a starting point, not a verified legal document or legal advice. Replace <strong>[RESPONSIBLE LEGAL ENTITY]</strong> and confirm the terms with the institute&apos;s legal adviser before production.</p>
      <h2>Website information</h2><p>This website is a Profolio concept demo for {siteConfig.name}. Course descriptions and learning frameworks are general examples. They are not a representation that a particular course, class, batch, or service is currently available.</p>
      <h2>Courses and availability</h2><p>Examination syllabi, requirements, fees, schedules, delivery formats, prerequisites, and course availability can change. Confirm current details directly with the institute and consult official examination sources where appropriate. No fee, discount, scholarship, result, or admission outcome is promised by this demo.</p>
      <h2>Enquiries</h2><p>An enquiry is a request for information and does not constitute enrolment, a contract, or a guarantee of a response time. If the enquiry service is not configured, the form will say that the request could not be sent. A production institute should describe its confirmed submission and response process.</p>
      <h2>Intellectual property</h2><p>Site layout, original interface elements, and written material created for the demo may be protected by intellectual-property rights. Academy-owned names, logos, course materials, and third-party resources remain subject to their owners’ rights. Do not publish content without permission.</p>
      <h2>Third-party services</h2><p>Links or configured integrations may lead to third-party services with their own terms and privacy practices. The operator should list the services actually used and review their terms before launch.</p>
      <h2>Appropriate use and limitations</h2><p>Use the website lawfully and do not attempt to interfere with its operation or submit malicious content. Website material is supplied for general information and may not be complete or current. To the extent allowed by applicable law, the operator should define the limitations and responsibilities applicable to the actual service.</p>
      <h2>Contact</h2><p>Responsible entity: <strong>[RESPONSIBLE LEGAL ENTITY]</strong>. Contact: <strong>{siteConfig.email || siteConfig.emailPlaceholder}</strong>. Supply verified details and an effective date before production.</p>
    </article></section>
  </>;
}
