import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { siteConfig, mailtoUrl, telUrl, whatsappUrl } from "@/data/site";
import { courses } from "@/data/courses";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Contact & course enquiry", "Share your name, contact details and learning goals to ask about a course. The enquiry service is subject to configuration.", "/contact");

type Props = { searchParams: Promise<{ course?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const { course: courseSlug } = await searchParams;
  const course = courses.find((item) => item.slug === courseSlug);
  const phoneHref = telUrl();
  const emailHref = mailtoUrl();
  const whatsappHref = whatsappUrl();
  return <>
    <section className="page-hero"><div className="container"><Breadcrumbs items={[{ label: "Contact" }]} /><span className="section-kicker">We’re here to help you explore</span><h1 className="page-title" style={{ marginTop: 12 }}>Let’s talk about your learning goals.</h1><p className="page-intro">Share a few details about the course you’re interested in, and the institute can follow up using your preferred contact information.</p></div></section>
    <section className="page-content"><div className="container form-layout">
      <aside className="contact-aside"><h2>Start with a question</h2><p>Ask about course suitability, available batches, fees, and current learning formats. Details can be confirmed by the institute once its contact information is supplied.</p>
        <div className="contact-methods">
          <div className="contact-method"><span className="contact-method-icon"><Phone aria-hidden="true" /></span><div><strong>Phone</strong>{phoneHref ? <a href={phoneHref}>{siteConfig.phone}</a> : <span>{siteConfig.phonePlaceholder}</span>}</div></div>
          <div className="contact-method"><span className="contact-method-icon"><Mail aria-hidden="true" /></span><div><strong>Email</strong>{emailHref ? <a href={emailHref}>{siteConfig.email}</a> : <span>{siteConfig.emailPlaceholder}</span>}</div></div>
          <div className="contact-method"><span className="contact-method-icon"><MapPin aria-hidden="true" /></span><div><strong>Location</strong><span>{siteConfig.address || siteConfig.locationPlaceholder}</span></div></div>
          <div className="contact-method"><span className="contact-method-icon"><Phone aria-hidden="true" /></span><div><strong>WhatsApp</strong>{whatsappHref ? <a href={whatsappHref} target="_blank" rel="noreferrer">Chat with the institute</a> : <span>{siteConfig.whatsappPlaceholder} (not configured)</span>}</div></div>
        </div>
        <p className="small-note" style={{ marginTop: 20 }}>Replace the displayed placeholders with verified academy details before launch.</p>
      </aside>
      <EnquiryForm courseSlug={course?.slug} />
    </div></section>
  </>;
}
