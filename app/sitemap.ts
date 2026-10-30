import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { courses } from "@/data/courses";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.publicUrl) return [];
  const lastModified = new Date();
  const staticRoutes = ["", "/courses", "/faculty", "/results", "/about", "/contact", "/privacy", "/terms"];
  return [
    ...staticRoutes.map((route) => ({ url: `${siteConfig.publicUrl}${route}`, lastModified })),
    ...courses.map((course) => ({ url: `${siteConfig.publicUrl}/courses/${course.slug}`, lastModified })),
  ];
}
