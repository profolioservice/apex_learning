import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { courseCategories, courses } from "@/data/courses";
import { CategoryIcon } from "@/components/ui/category-icon";
import { Reveal } from "@/components/ui/reveal";

export function CategorySection() {
  return (
    <section className="section" aria-labelledby="pathways-heading">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="section-kicker">Explore your options</span>
            <h2 id="pathways-heading" className="section-title">Find the right path for <span className="heading-accent">your goals</span></h2>
            <p className="section-copy">Explore preparation options based on your target examination and learning goals.</p>
          </div>
        </Reveal>
        <div className="category-grid">
          {courseCategories.map((category, index) => {
            const course = courses.find((item) => item.categoryId === category.id);
            return (
              <Reveal key={category.id} delay={Math.min(index * 0.035, 0.21)}>
                <article className="category-card">
                  <span className="category-icon"><CategoryIcon name={category.icon} /></span>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                  <p className="card-audience">For: {category.audience}</p>
                  {course && <Link className="text-link" href={`/courses/${course.slug}`}>Explore course <ArrowRight aria-hidden="true" /></Link>}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
