"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

import { routes, person, about, work, blog, gallery } from "@/resources";
import styles from "./Header.module.scss";

export const Header = () => {
  const pathname = usePathname() ?? "";
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navItems: { href: string; label: string; num: number }[] = [];
  let counter = 1;
  // Work points to home — home IS the work/projects page
  if (routes["/work"])
    navItems.push({ href: "/", label: work.label, num: counter++ });
  if (routes["/about"])
    navItems.push({ href: "/about", label: about.label, num: counter++ });
  // Lecturas
  navItems.push({ href: "/approach", label: "Lecturas", num: counter++ });
  if (routes["/blog"])
    navItems.push({ href: "/blog", label: blog.label, num: counter++ });
  if (routes["/gallery"])
    navItems.push({ href: "/gallery", label: gallery.label, num: counter++ });

  const calendarLink = "https://calendly.com/alexandra-lerner/30min?back=1&month=2026-04";

  const isActive = (href: string) => {
    if (href === "/") {
      // Work is active on home and on /work/* case study pages
      return pathname === "/" || pathname.startsWith("/work");
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${
          mobileMenuOpen ? styles.menuOpen : ""
        }`}
      >
        <div className={styles.inner}>
          <Link href="/" className={styles.left}>
            <span className={styles.name}>{person.name}</span>
            <span className={styles.role}>{person.role}</span>
          </Link>

          <nav className={styles.desktopNav}>
            <div className={styles.navPill}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.navItem} ${
                    isActive(item.href) ? styles.active : ""
                  }`}
                >
                  {item.label}
                  <sup className={styles.sup}>{item.num}</sup>
                </Link>
              ))}
            </div>
          </nav>

          <div className={styles.desktopCta}>
            <a
              href={calendarLink}
              className={styles.cta}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.dot} />
              Book a call
            </a>
          </div>

          <button
            className={styles.mobileMenuBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <span className={styles.dot} />
            {mobileMenuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <div
        className={`${styles.mobileOverlay} ${
          mobileMenuOpen ? styles.overlayVisible : ""
        }`}
      >
        <nav className={styles.mobileNav}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.mobileNavItem} ${
                isActive(item.href) ? styles.mobileActive : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={calendarLink}
            className={styles.mobileNavItem}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
          >
            Book a call
          </a>
        </nav>
      </div>
    </>
  );
};
