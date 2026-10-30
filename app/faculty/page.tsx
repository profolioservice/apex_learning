import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { FacultyDirectory } from "@/components/faculty/faculty-directory";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Faculty and learning guides", "Review clearly identified faculty profile placeholders. Verified educator identities, subjects and qualifications should replace them before launch.", "/faculty");

export default function FacultyPage() {
  return <>
    <section className="page-hero"><div className="container"><Breadcrumbs items={[{ label: "Faculty" }]} /><span className="section-kicker">Learning guides</span><h1 className="page-title" style={{ marginTop: 12 }}>Meet your learning guides</h1><p className="page-intro">Faculty identities and qualifications have not been supplied. These neutral profile cards are placeholders only and must be replaced with verified educator details before production.</p></div></section>
    <section className="page-content"><div className="container"><FacultyDirectory /></div></section>
  </>;
}
