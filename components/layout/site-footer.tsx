import Link from "next/link";
import { BookOpenCheck, Mail, MapPin, Phone } from "lucide-react";
import { courseCategories, courses } from "@/data/courses";
import { siteConfig, mailtoUrl, telUrl } from "@/data/site";

const footerPages = [
  { label: "Home", href: "/" }, { label: "Courses", href: "/courses" },
  { label: "Faculty", href: "/faculty" }, { label: "Results", href: "/results" },
  { label: "About us", href: "/about" }, { label: "Contact", href: "/contact" },
];

export function SiteFooter() {
  const phoneHref = telUrl();
  const emailHref = mailtoUrl();
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Link href="/" className="brand" aria-label={`${siteConfig.name} home`}>
            <span className="brand-mark" aria-hidden="true"><BookOpenCheck /></span>
            <span><span className="brand-name">{siteConfig.name}</span><span className="brand-tagline">{siteConfig.tagline}</span></span>
          </Link>
          <p>Structured preparation information to help students and families explore learning pathways with clarity.</p>
          <p className="footer-contact-note">{siteConfig.conceptNote}</p>
        </div>
        <div>
          <h2 className="footer-heading">Explore</h2>
          <ul className="footer-links">{footerPages.map((item) => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul>
        </div>
        <div>
          <h2 className="footer-heading">Course pathways</h2>
          <ul className="footer-links">
            {courseCategories.slice(0, 6).map((category) => {
              const course = courses.find((item) => item.categoryId === category.id);
              return <li key={category.id}><Link href={course ? `/courses/${course.slug}` : "/courses"}>{category.name}</Link></li>;
            })}
          </ul>
        </div>
        <div>
          <h2 className="footer-heading">Contact</h2>
          <ul className="footer-links">
            <li>{phoneHref ? <a href={phoneHref}><Phone size={13} aria-hidden="true" /> {siteConfig.phone}</a> : <span><Phone size={13} aria-hidden="true" /> {siteConfig.phonePlaceholder}</span>}</li>
            <li>{emailHref ? <a href={emailHref}><Mail size={13} aria-hidden="true" /> {siteConfig.email}</a> : <span><Mail size={13} aria-hidden="true" /> {siteConfig.emailPlaceholder}</span>}</li>
            <li><span><MapPin size={13} aria-hidden="true" /> {siteConfig.address || siteConfig.locationPlaceholder}</span></li>
            {siteConfig.socialLinks.map((item) => <li key={item.label}><a href={item.href} target="_blank" rel="noreferrer">{item.label}</a></li>)}
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {year} {siteConfig.name}. All rights reserved.</span>
        <div className="footer-legal"><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms &amp; Conditions</Link></div>
      </div>
    </footer>
  );
}
