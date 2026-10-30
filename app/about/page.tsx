import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, GraduationCap, HeartHandshake, Layers3 } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { courseCategories } from "@/data/courses";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("About Apex Learning Academy", "Learn about the proposed student-focused preparation approach and course pathways at Apex Learning Academy.", "/about");

const approach = [
  { title: "Start with the learner", text: "Understand a student's goal, current learning needs, and the examination requirements that matter to them.", icon: HeartHandshake },
  { title: "Make preparation clearer", text: "Break preparation into subjects, topics, practice, and review so a learning plan is easier to follow.", icon: Layers3 },
  { title: "Keep progress thoughtful", text: "Use reflection and practice to help identify what has been covered and where more attention may be useful.", icon: Compass },
  { title: "Share current details", text: "Course availability, teaching arrangements, and student support should be described accurately by the institute.", icon: GraduationCap },
];

export default function AboutPage() {
  return <>
    <section className="page-hero"><div className="container"><Breadcrumbs items={[{ label: "About" }]} /><span className="section-kicker">About the academy</span><h1 className="page-title" style={{ marginTop: 12 }}>Learning with clarity. Preparing with purpose.</h1><p className="page-intro">Apex Learning Academy is presented here as a Profolio concept demo. Add a verified introduction from the institute before using this page as an official description.</p></div></section>
    <section className="page-content"><div className="container">
      <article className="content-card" style={{ marginBottom: 20 }}><span className="section-kicker">Institute introduction</span><h2 style={{ marginTop: 12 }}>A place to explore your next learning step</h2><p>The academy&apos;s actual history, location, leadership, services, and teaching team have not been supplied. This page avoids implying specific experience or results. Replace this section with a client-approved introduction before production.</p></article>
      <div className="section-head section-head--left"><span className="section-kicker">Educational approach</span><h2 className="section-title">A thoughtful framework for <span className="heading-accent">preparation</span></h2><p className="section-copy">These are proposed learning principles for the demo, not claims about verified current operations.</p></div>
      <div className="about-grid">{approach.map(({ title, text, icon: Icon }) => <article className="about-card" key={title}><span className="about-mark"><Icon aria-hidden="true" /></span><h2>{title}</h2><p>{text}</p></article>)}</div>
      <div className="content-card" style={{ marginTop: 20 }}><h2>Course categories</h2><ul className="topic-list">{courseCategories.map((category) => <li key={category.id}>{category.name}</li>)}</ul><p style={{ marginTop: 14 }}>The catalogue is illustrative and centrally editable. Contact the institute to confirm which courses are currently offered.</p></div>
      <div style={{ marginTop: 24 }}><Link className="button button--primary" href="/contact">Ask about a course <ArrowRight aria-hidden="true" /></Link></div>
    </div></section>
  </>;
}
