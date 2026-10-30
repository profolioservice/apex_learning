import Link from "next/link";
import { BookOpenCheck } from "lucide-react";
import { siteConfig } from "@/data/site";
import { DesktopNavigation } from "@/components/layout/desktop-navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";

const links = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Faculty", href: "/faculty" },
  { label: "Results", href: "/results" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Link href="/" className="brand" aria-label={`${siteConfig.name} home`}>
          <span className="brand-mark" aria-hidden="true"><BookOpenCheck /></span>
          <span>
            <span className="brand-name">{siteConfig.name}</span>
            <span className="brand-tagline">{siteConfig.tagline}</span>
          </span>
        </Link>
        <DesktopNavigation links={links} />
        <Link href="/contact" className="button button--primary nav-cta">Enquire Now</Link>
        <MobileNavigation links={links} />
      </div>
    </header>
  );
}
