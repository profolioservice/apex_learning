"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

type NavLink = { label: string; href: string };

export function MobileNavigation({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = () => setOpen(false);
  return (
    <div className="mobile-nav-control">
      <button ref={buttonRef} className="mobile-menu-button" type="button" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((current) => !current)}>
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      {open && <nav id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation"><div className="mobile-menu-links">
        {links.map((link) => {
          const active = link.href === "/" ? pathname === "/" : pathname === link.href || pathname.startsWith(`${link.href}/`);
          return <Link key={link.href} href={link.href} aria-current={active ? "page" : undefined} onClick={close}>{link.label}</Link>;
        })}
        <Link className="mobile-menu-enquire" href="/contact" onClick={close}>Enquire Now</Link>
      </div></nav>}
    </div>
  );
}
