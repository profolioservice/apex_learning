import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

const metadataBase = siteConfig.publicUrl ? new URL(siteConfig.publicUrl) : undefined;
const academyTheme = {
  "--color-background": siteConfig.colors.background,
  "--color-soft": siteConfig.colors.secondaryBackground,
  "--color-ink": siteConfig.colors.text,
  "--color-muted": siteConfig.colors.secondaryText,
  "--color-brand": siteConfig.colors.primary,
  "--color-brand-deep": siteConfig.colors.primaryDeep,
  "--color-violet": siteConfig.colors.secondary,
  "--color-cyan": siteConfig.colors.accent,
  "--color-border": siteConfig.colors.border,
} as CSSProperties;

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.seo.keywords],
  applicationName: siteConfig.name,
  ...(siteConfig.seo.openGraphImage
    ? { openGraph: { images: [{ url: siteConfig.seo.openGraphImage }] } }
    : {}),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body style={academyTheme}>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
