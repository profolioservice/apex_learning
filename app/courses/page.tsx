import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CourseDirectory } from "@/components/courses/course-directory";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Explore courses", "Browse preparation pathways by examination category, target audience, or subject. Ask the institute for current course availability and details.", "/courses");

export default function CoursesPage() {
  return <>
    <section className="page-hero"><div className="container"><Breadcrumbs items={[{ label: "Courses" }]} /><span className="section-kicker">Preparation pathways</span><h1 className="page-title" style={{ marginTop: 12 }}>Explore courses</h1><p className="page-intro">Find preparation options that align with your examination goals. Course availability and current schedules should be confirmed with the institute.</p></div></section>
    <section className="page-content"><div className="container"><CourseDirectory /></div></section>
  </>;
}
