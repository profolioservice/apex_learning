import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { resultsEmptyState, verifiedAchievements } from "@/data/results";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Results & achievements", "Verified student achievements and results will be shared here when approved information is available.", "/results");

export default function ResultsPage() {
  return <>
    <section className="page-hero"><div className="container"><Breadcrumbs items={[{ label: "Results & achievements" }]} /><span className="section-kicker">Verified milestones only</span><h1 className="page-title" style={{ marginTop: 12 }}>Results &amp; achievements</h1><p className="page-intro">This page is for confirmed examination outcomes, scholarships, competitions, and student stories. Information is shared only after it has been verified and approved.</p></div></section>
    <section className="page-content"><div className="container">
      {verifiedAchievements.length ? <div className="course-grid">{verifiedAchievements.map((item) => <article className="course-card" key={item.id}><div className="course-card-top"><span className="category-icon"><ShieldCheck aria-hidden="true" /></span><span className="course-tag">{item.category} · {item.year}</span></div><h2>{item.title}</h2><p>{item.summary}</p><span className="small-note">Verification source: {item.verificationSource}</span></article>)}</div> : <div className="empty-state"><span className="empty-state-icon"><ShieldCheck aria-hidden="true" /></span><h2>No verified achievements have been published</h2><p>{resultsEmptyState} Any future result should be supported by accurate, approved source information.</p></div>}
      <div className="info-panel" style={{ marginTop: 27 }}><div><h2>Share milestones responsibly</h2><p>Before adding a result, confirm the examination, year, student consent, source, and the exact claim that may be published.</p></div><ul className="info-list"><li>Use verified records and precise examination context.</li><li>Obtain permission before naming students or publishing their stories.</li><li>Never imply that one result predicts another student’s outcome.</li></ul></div>
      <p style={{ marginTop: 24 }}><Link className="text-link" href="/courses">Explore course pathways <ArrowRight aria-hidden="true" /></Link></p>
    </div></section>
  </>;
}
