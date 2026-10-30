import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { courses, categoryById, courseBySlug } from "@/data/courses";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CategoryIcon } from "@/components/ui/category-icon";
import { WhatsAppAction } from "@/components/ui/whatsapp-action";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { FAQSection } from "@/components/home/home-sections";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = courseBySlug(slug);
  if (!course) return { title: "Course not found", robots: { index: false, follow: false } };
  return pageMetadata(course.title, `${course.summary} Contact the institute to confirm current course availability, format, fees and schedule.`, `/courses/${course.slug}`);
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = courseBySlug(slug);
  if (!course) notFound();
  const category = categoryById(course.categoryId);
  const related = courses.filter((item) => item.slug !== course.slug).slice(0, 3);
  return <>
    <section className="detail-hero">
      <div className="container">
        <Breadcrumbs items={[{ label: "Courses", href: "/courses" }, { label: course.title }]} />
        <div className="detail-head">
          <div><span className="detail-label">{category?.name ?? "Preparation pathway"}</span><h1 className="detail-title">{course.title}</h1><p className="detail-description">{course.description}</p></div>
          <div className="detail-actions"><Link className="button button--primary" href={`/contact?course=${course.slug}`}>Enquire about this course <ArrowRight aria-hidden="true" /></Link><WhatsAppAction /></div>
        </div>
      </div>
    </section>
    <section className="page-content">
      <div className="container detail-layout">
        <div className="detail-main">
          <article className="content-card"><h2>Course overview</h2><p>{course.summary}</p><p>This page describes general preparation areas only. Course availability, delivery mode, duration, schedule, and fees have not been verified for this demo. Contact the institute for current details.</p></article>
          <article className="content-card"><h2>Who this pathway may suit</h2><p>{course.audience}. Review the current official examination requirements and confirm the institute’s available course details before enrolling.</p></article>
          <article className="content-card"><h2>Subject areas and modules</h2><ul className="topic-list">{course.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul><p style={{ marginTop: 14 }}>These are general preparation areas; confirm the exact syllabus coverage for the chosen examination with the institute.</p></article>
          <article className="content-card"><h2>Preparation objectives</h2><ul className="objective-list">{course.objectives.map((objective) => <li key={objective}><CheckCircle2 aria-hidden="true" />{objective}</li>)}</ul></article>
          <article className="content-card"><h2>Course information</h2><p>For current learning format, batch timings, duration, fees, prerequisites, and availability, please contact the institute. No pricing or schedule has been assumed for this demo.</p></article>
        </div>
        <aside className="detail-sidebar" aria-label="Course enquiry">
          <span className="category-icon" style={{ marginBottom: 14 }}><CategoryIcon name={course.icon} /></span>
          <h2>Want to learn more?</h2><p>Tell us what you’re preparing for. This enquiry form already identifies {course.title}.</p>
          <Link className="button button--primary" href={`/contact?course=${course.slug}`}>Ask about this course <ArrowRight aria-hidden="true" /></Link>
          <span className="small-note">An enquiry can be sent once a submission provider is configured.</span>
        </aside>
      </div>
      <div className="container" style={{ marginTop: 35 }}>
        <EnquiryForm courseSlug={course.slug} compact />
      </div>
      <div style={{ marginTop: 30 }}><FAQSection limit={4} /></div>
      <div className="container" style={{ marginTop: 20 }}>
        <div className="section-head section-head--left"><span className="section-kicker">Continue exploring</span><h2 className="section-title">Related <span className="heading-accent">pathways</span></h2></div>
        <div className="related-grid">{related.map((item) => <Link className="related-card" key={item.slug} href={`/courses/${item.slug}`}><strong>{item.title}</strong><span>{item.summary}</span><span style={{ color: "var(--color-brand)", marginTop: 11 }}>View course <ArrowRight size={13} style={{ display: "inline" }} aria-hidden="true" /></span></Link>)}</div>
      </div>
    </section>
  </>;
}
