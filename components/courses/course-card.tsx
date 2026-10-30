import Link from "next/link";
import { ArrowRight, UsersRound } from "lucide-react";
import type { Course } from "@/data/courses";
import { categoryById } from "@/data/courses";
import { CategoryIcon } from "@/components/ui/category-icon";

export function CourseCard({ course }: { course: Course }) {
  const category = categoryById(course.categoryId);
  return (
    <article className="course-card">
      <div className="course-card-top">
        <span className="category-icon"><CategoryIcon name={course.icon} /></span>
        {category && <span className="course-tag">{category.name}</span>}
      </div>
      <h3><Link href={`/courses/${course.slug}`}>{course.title}</Link></h3>
      <p>{course.summary}</p>
      <div className="course-audience"><UsersRound aria-hidden="true" /><span>{course.audience}</span></div>
      <div className="course-card-bottom">
        <span className="course-info-note">Ask us for current course details</span>
        <Link className="text-link" href={`/courses/${course.slug}`}>View details <ArrowRight aria-hidden="true" /></Link>
      </div>
    </article>
  );
}
