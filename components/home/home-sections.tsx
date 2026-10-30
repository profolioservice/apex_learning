import Link from "next/link";
import { ArrowRight, BookOpenCheck, CheckCircle2, Headphones, NotebookPen, ShieldCheck, Target, UsersRound } from "lucide-react";
import { facultyPlaceholders } from "@/data/faculty";
import { faqs } from "@/data/faqs";
import { courses } from "@/data/courses";
import { resultsEmptyState, verifiedAchievements } from "@/data/results";
import { CourseCard } from "@/components/courses/course-card";
import { Reveal } from "@/components/ui/reveal";

const features = [
  { title: "Structured learning", description: "A clear learning path organized around subjects, topics, and preparation milestones.", icon: BookOpenCheck },
  { title: "Focused practice", description: "Practice activities to reinforce understanding and build familiarity with examination formats.", icon: Target },
  { title: "Progress awareness", description: "Simple tools and guidance to help identify what is covered and what needs more attention.", icon: NotebookPen },
  { title: "Learning support", description: "Clear channels for course enquiries and information about available academic support.", icon: Headphones },
];

export function FeaturesSection() {
  return (
    <section className="section section--soft" aria-labelledby="approach-heading">
      <div className="container">
        <Reveal><div className="section-head">
          <span className="section-kicker">A considered approach</span>
          <h2 id="approach-heading" className="section-title">A clearer way to <span className="heading-accent">prepare</span></h2>
          <p className="section-copy">A proposed learning framework, designed around the way preparation can be made easier to understand.</p>
        </div></Reveal>
        <div className="feature-grid">
          {features.map(({ title, description, icon: Icon }, index) => <Reveal key={title} delay={index * 0.05}>
            <article className="feature-card"><span className="feature-icon"><Icon aria-hidden="true" /></span><h3>{title}</h3><p>{description}</p></article>
          </Reveal>)}
        </div>
        <p className="small-note" style={{ textAlign: "center", marginTop: 18 }}>These are proposed educational features for this concept demo, not verified claims about current academy operations.</p>
      </div>
    </section>
  );
}

export function FeaturedCoursesSection() {
  const featured = courses.filter((course) => course.featured).slice(0, 4);
  return (
    <section className="section" aria-labelledby="featured-heading">
      <div className="container">
        <div className="section-head section-head--left" style={{ display: "flex", alignItems: "end", justifyContent: "space-between", gap: 20, maxWidth: "none" }}>
          <div><span className="section-kicker">Popular pathways</span><h2 id="featured-heading" className="section-title">Explore our <span className="heading-accent">programs</span></h2><p className="section-copy">A closer look at selected preparation options. Contact the institute for current course details.</p></div>
          <Link className="button button--quiet" href="/courses">View all courses <ArrowRight aria-hidden="true" /></Link>
        </div>
        <div className="course-grid">{featured.map((course, index) => <Reveal key={course.slug} delay={index * 0.045}><CourseCard course={course} /></Reveal>)}</div>
      </div>
    </section>
  );
}

const journey = [
  { name: "Understand", copy: "Identify goals and current learning needs." },
  { name: "Plan", copy: "Organize a preparation roadmap around the syllabus." },
  { name: "Practice", copy: "Work through subjects, questions, and revision." },
  { name: "Review", copy: "Evaluate progress and decide what to improve next." },
];

export function JourneySection() {
  return (
    <section className="section section--soft" aria-labelledby="journey-heading">
      <div className="container">
        <Reveal><div className="section-head"><span className="section-kicker">A practical framework</span><h2 id="journey-heading" className="section-title">From preparation to <span className="heading-accent">progress</span></h2><p className="section-copy">These four steps can make a learning plan easier to follow. They do not promise examination success.</p></div></Reveal>
        <div className="journey-grid">{journey.map((step, index) => <Reveal key={step.name} delay={index * .07}><article className="journey-step"><span className="journey-number">0{index + 1}</span><h3>{step.name}</h3><p>{step.copy}</p></article></Reveal>)}</div>
      </div>
    </section>
  );
}

export function FacultyPreviewSection() {
  return (
    <section className="section" aria-labelledby="faculty-preview-heading">
      <div className="container">
        <div className="section-head section-head--left" style={{ display: "flex", alignItems: "end", justifyContent: "space-between", gap: 20, maxWidth: "none" }}>
          <div><span className="section-kicker">People who guide learning</span><h2 id="faculty-preview-heading" className="section-title">Meet your learning <span className="heading-accent">guides</span></h2><p className="section-copy">Profiles are intentionally left as replaceable placeholders until verified faculty information is supplied.</p></div>
          <Link className="button button--quiet" href="/faculty">Explore faculty <ArrowRight aria-hidden="true" /></Link>
        </div>
        <div className="faculty-grid">{facultyPlaceholders.map((person, index) => <Reveal key={person.id} delay={index * .06}>
          <article className="faculty-card"><div className="faculty-visual"><span className="faculty-avatar"><UsersRound aria-hidden="true" /></span></div><div className="faculty-card-body"><span className="faculty-placeholder-label">Demo placeholder</span><h3>{person.label}</h3><div className="faculty-subject">{person.subject}</div><p>{person.note}</p><p className="faculty-placeholder-note">No name, qualification or experience has been invented.</p></div></article>
        </Reveal>)}</div>
      </div>
    </section>
  );
}

export function ResultsPreviewSection() {
  return (
    <section className="section section--soft" aria-labelledby="results-preview-heading">
      <div className="container">
        <Reveal><div className="section-head"><span className="section-kicker">Verified milestones only</span><h2 id="results-preview-heading" className="section-title">Celebrate learning <span className="heading-accent">milestones</span></h2><p className="section-copy">A dedicated space for achievements, shared only when the information is verified and approved.</p></div></Reveal>
        {verifiedAchievements.length ? <div className="course-grid">{verifiedAchievements.map((item) => <article className="course-card" key={item.id}><span className="course-tag">{item.category} · {item.year}</span><h3>{item.title}</h3><p>{item.summary}</p><p className="small-note">Verification: {item.verificationSource}</p></article>)}</div> : <div className="empty-state"><span className="empty-state-icon"><ShieldCheck aria-hidden="true" /></span><h3>Verified achievements will appear here</h3><p>{resultsEmptyState}</p></div>}
      </div>
    </section>
  );
}

export function ParentInformationSection() {
  const points = [
    "Tell us which examination or learning goal you have in mind.",
    "Ask about course suitability, current batches, fees, and available formats.",
    "Share your contact details and preferred way for the institute to follow up.",
    "Parents are welcome to use the same enquiry channels for course information.",
  ];
  return (
    <section className="section" aria-labelledby="getting-started-heading">
      <div className="container">
        <Reveal><div className="info-panel"><div><span className="section-kicker">For students and families</span><h2 id="getting-started-heading">Everything you need to get started</h2><p>Start with a question. The institute can share the latest details about courses and available batches once its contact and enquiry information is configured.</p><Link className="button button--primary" href="/contact" style={{ marginTop: 18 }}>Ask about a course <ArrowRight aria-hidden="true" /></Link></div><ul className="info-list">{points.map((point) => <li key={point}><CheckCircle2 aria-hidden="true" />{point}</li>)}</ul></div></Reveal>
      </div>
    </section>
  );
}

export function FAQSection({ limit }: { limit?: number }) {
  const visible = typeof limit === "number" ? faqs.slice(0, limit) : faqs;
  return (
    <section className="section section--soft" aria-labelledby="faq-heading">
      <div className="container container--narrow">
        <Reveal><div className="section-head"><span className="section-kicker">Useful information</span><h2 id="faq-heading" className="section-title">Questions, <span className="heading-accent">answered</span></h2><p className="section-copy">Please contact the institute for the latest information on fees, batches, and course availability.</p></div></Reveal>
        <div className="faq-list">{visible.map((faq) => <details className="faq-item" key={faq.question}><summary>{faq.question}</summary><div className="faq-answer">{faq.answer}</div></details>)}</div>
      </div>
    </section>
  );
}
