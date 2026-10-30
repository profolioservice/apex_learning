import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export function pageMetadata(title: string, description: string, path = ""): Metadata {
  const absolute = siteConfig.publicUrl ? `${siteConfig.publicUrl}${path}` : undefined;
  const image = siteConfig.seo.openGraphImage || undefined;
  return {
    title,
    description,
    ...(absolute ? { alternates: { canonical: absolute } } : {}),
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description,
      ...(absolute ? { url: absolute } : {}),
      ...(image ? { images: [{ url: image, alt: `${siteConfig.name} identity` }] } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}
