import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { siteConfig } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Privacy Policy", "Privacy information for the Apex Learning Academy concept website and its optional enquiry form.", "/privacy");

export default function PrivacyPage() {
  return <>
    <section className="page-hero"><div className="container"><Breadcrumbs items={[{ label: "Privacy Policy" }]} /><span className="section-kicker">Privacy information</span><h1 className="page-title" style={{ marginTop: 12 }}>Privacy Policy</h1><p className="page-intro">A draft for the concept website. The responsible institute must review and adapt it to its actual practices and applicable law before launch.</p></div></section>
    <section className="page-content"><article className="container container--narrow prose">
      <p className="review-notice"><strong>Review required:</strong> This demo policy is not legal advice. The responsible legal entity is currently <strong>[RESPONSIBLE LEGAL ENTITY]</strong>. Replace the contact details and confirm all service, retention, and rights statements with the actual institute before production.</p>
      <h2>Who is responsible</h2><p>The website is a Profolio concept for {siteConfig.name}. The institute operating a production version is responsible for deciding how enquiries are handled. Its legal entity and privacy contact have not yet been supplied.</p>
      <h2>Information collected</h2><p>If you submit an enquiry through a configured form, the form collects your name, email address, phone number, selected course or examination, and any optional education level, preferred learning format, preferred contact method, and message you provide. Do not include sensitive information that is not needed to ask about a course. An operator may enable the optional temporary in-memory IP rate limit only after configuring a hosting-provider header that is overwritten with a single trusted client address; without that explicit setting, this application does not infer an address from visitor-supplied forwarded headers. The in-memory address is not written to the enquiry table.</p>
      <h2>Why information is used</h2><p>Enquiry information is used to receive and respond to the question you sent and to share relevant course information. The institute should confirm and document the lawful basis and any additional purposes that apply to its actual operations.</p>
      <h2>How information is processed</h2><p>While the form backend is not configured, this demo does not send an enquiry to the institute and displays a configuration-unavailable message instead. If the operator configures the optional Supabase integration described in the project README, validated enquiry fields are transmitted from the server to that Supabase project and stored in its <code>enquiries</code> table. The service-role key is intended to remain server-side. No separate email-notification provider is configured by default.</p>
      <h2>Service providers</h2><p>When the form integration is enabled, Supabase acts as the database service provider under the institute&apos;s configured account and terms. Website hosting and delivery providers may also process technical request data. The operator must confirm the actual providers, applicable agreements, and any cross-border processing before launch.</p>
      <h2>Retention and security</h2><p>No enquiry-retention period has been set in this demo. The institute must establish a retention period, configure deletion procedures, restrict staff access, and document appropriate security controls before accepting real enquiries. The website does not intentionally log enquiry contents.</p>
      <h2>Your requests</h2><p>Depending on applicable law, you may be able to request access to, correction of, or deletion of your personal information, or exercise other rights. Contact the responsible institute at <strong>{siteConfig.email || siteConfig.emailPlaceholder}</strong> to ask. The institute should verify the identity and legal applicability of any request.</p>
      <h2>Contact</h2><p>Privacy enquiries: <strong>{siteConfig.email || siteConfig.emailPlaceholder}</strong>. Responsible legal entity: <strong>[RESPONSIBLE LEGAL ENTITY]</strong>.</p>
      <h2>Updates</h2><p>Update this policy whenever the institute&apos;s data practices, providers, purposes, or retention rules change. The policy date and effective date must be set before production.</p>
    </article></section>
  </>;
}
