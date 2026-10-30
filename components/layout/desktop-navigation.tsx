"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = { label: string; href: string };

export function DesktopNavigation({ links }: { links: NavLink[] }) {
  const pathname = usePathname();
  return (
    <nav className="desktop-nav" aria-label="Main navigation">
      {links.map((link) => {
        const active = link.href === "/" ? pathname === "/" : pathname === link.href || pathname.startsWith(`${link.href}/`);
        return <Link key={link.href} className="nav-link" href={link.href} aria-current={active ? "page" : undefined}>{link.label}</Link>;
      })}
    </nav>
  );
}
