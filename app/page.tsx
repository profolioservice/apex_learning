import type { Metadata } from "next";
import { CategorySection } from "@/components/home/category-section";
import { FinalCTA } from "@/components/home/final-cta";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection, FeaturedCoursesSection, FacultyPreviewSection, FAQSection, JourneySection, ParentInformationSection, ResultsPreviewSection } from "@/components/home/home-sections";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("Smarter preparation starts with clarity", "Explore general course pathways and preparation options at Apex Learning Academy. Contact the institute for current verified course information.", "/");

export default function HomePage() {
  return <>
    <HeroSection />
    <CategorySection />
    <FeaturesSection />
    <FeaturedCoursesSection />
    <JourneySection />
    <FacultyPreviewSection />
    <ResultsPreviewSection />
    <ParentInformationSection />
    <FAQSection limit={5} />
    <FinalCTA />
  </>;
}
