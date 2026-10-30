import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    ...(siteConfig.publicUrl ? { sitemap: `${siteConfig.publicUrl}/sitemap.xml` } : {}),
  };
}
