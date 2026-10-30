import Link from "next/link";
import { ArrowDownRight, ArrowRight, Check, Compass, ListChecks } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export function HeroSection() {
  return (
    <section className="hero">
      <div className="container hero-layout">
        <div className="hero-copy">
          <h1 className="hero-title">Your goals deserve a <span>smarter preparation strategy.</span></h1>
          <p className="hero-description">Explore structured courses, focused learning, and guided preparation designed to help you move forward with confidence.</p>
          <div className="hero-actions">
            <Link className="button button--primary" href="/courses">Explore courses <ArrowRight aria-hidden="true" /></Link>
            <Link className="button button--outline" href="/contact">Talk to our team <ArrowDownRight aria-hidden="true" /></Link>
          </div>
          <div className="hero-trust" aria-label="Learning approach">
            <span><Check aria-hidden="true" /> Structured learning</span>
            <span><Check aria-hidden="true" /> Focused preparation</span>
            <span><Check aria-hidden="true" /> Student-focused approach</span>
          </div>
        </div>
        <Reveal className="hero-visual" delay={0.08}>
          <div className="hero-orbit" aria-hidden="true"><Compass /></div>
          <div className="floating-note" aria-hidden="true">A plan for every next step</div>
          <div className="planner-card">
            <div className="planner-top">
              <div><div className="planner-eyebrow">Learning roadmap</div><div className="planner-title">A clearer way to prepare</div></div>
              <span className="planner-status"><i /> Start with a plan</span>
            </div>
            <div className="planner-divider" />
            <div className="planner-label">A thoughtful study rhythm</div>
            <div className="planner-steps">
              <div className="planner-step"><i>01</i><span>Understand the topic</span></div>
              <div className="planner-step"><i>02</i><span>Practice with purpose</span></div>
              <div className="planner-step"><i>03</i><span>Review and refine</span></div>
            </div>
            <div className="planner-footer"><span>Learning, organized</span><strong>Explore pathways&nbsp; ↗</strong></div>
          </div>
          <div className="focus-card" aria-hidden="true">
            <div className="focus-card-head"><span className="focus-icon"><ListChecks /></span><span><span className="focus-title">Study focus</span><span className="focus-subtitle">Make each step count</span></span></div>
            <div className="focus-lines"><i /><i /><i /></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
