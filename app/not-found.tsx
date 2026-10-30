import Link from "next/link";
import { ArrowLeft, BookOpenCheck } from "lucide-react";

export default function NotFound() {
  return (
    <section className="not-found" aria-labelledby="not-found-heading">
      <div className="container">
        <div className="not-found-code" aria-hidden="true">404</div>
        <h1 id="not-found-heading">This page took a different path.</h1>
        <p>The page may have moved, or the course details are not available. Explore the course directory or return to the home page.</p>
        <div className="not-found-actions"><Link className="button button--primary" href="/courses"><BookOpenCheck aria-hidden="true" /> Explore courses</Link><Link className="button button--outline" href="/"><ArrowLeft aria-hidden="true" /> Back home</Link></div>
      </div>
    </section>
  );
}
