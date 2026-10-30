"use client";

import { useMemo, useState } from "react";
import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import { courses, courseCategories } from "@/data/courses";
import { audienceFilters } from "@/data/audiences";
import { CourseCard } from "@/components/courses/course-card";
import { EmptyState } from "@/components/ui/empty-state";

export function CourseDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [audience, setAudience] = useState("all");
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const audienceGroup = audienceFilters.find((group) => group.id === audience);
    return courses.filter((course) => {
      const matchesCategory = category === "all" || course.categoryId === category;
      const matchesAudience = !audienceGroup || audienceGroup.categoryIds.includes(course.categoryId as never);
      const text = [course.title, course.summary, course.audience, ...course.topics].join(" ").toLowerCase();
      return matchesCategory && matchesAudience && (!needle || text.includes(needle));
    });
  }, [query, category, audience]);
  const clear = () => { setQuery(""); setCategory("all"); setAudience("all"); };
  const active = Boolean(query || category !== "all" || audience !== "all");

  return (
    <div className="course-directory">
      <aside className="filter-panel" aria-label="Filter courses">
        <h2 className="filter-heading"><SlidersHorizontal size={17} aria-hidden="true" style={{ display: "inline", marginRight: 8 }} />Find a course</h2>
        <div className="filter-fields">
          <label className="search-input-wrap" htmlFor="course-search"><Search aria-hidden="true" /><input id="course-search" className="input" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search course or subject" /></label>
          <label className="filter-label" htmlFor="course-category">Examination category</label>
          <select id="course-category" className="select" value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="all">All categories</option>
            {courseCategories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
          <label className="filter-label" htmlFor="course-audience">Target audience</label>
          <select id="course-audience" className="select" value={audience} onChange={(event) => setAudience(event.target.value)}>
            <option value="all">All audiences</option>
            {audienceFilters.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
        </div>
        <div className="filter-divider" />
        <button className="button button--quiet" type="button" onClick={clear} disabled={!active} style={{ width: "100%" }}><RotateCcw aria-hidden="true" /> Clear filters</button>
        <p className="small-note" style={{ margin: "12px 0 0" }}>Class formats and schedules vary. Ask the institute for current details.</p>
      </aside>
      <section aria-label="Course results" aria-live="polite">
        <p className="course-result-count"><strong>{filtered.length}</strong> {filtered.length === 1 ? "course" : "courses"}{active ? " match your search" : " available to explore"}</p>
        {filtered.length ? <div className="course-results-grid">{filtered.map((course) => <CourseCard key={course.slug} course={course} />)}</div> : <EmptyState title="No courses match those filters" description="Try a different search term or clear your filters to see all available course pathways." />}
      </section>
    </div>
  );
}
