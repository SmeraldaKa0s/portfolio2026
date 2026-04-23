"use client";

import { useEffect } from "react";

/**
 * Publishes a `--hero-progress` custom property on <html> that goes from 0 to 1
 * as the user scrolls the first viewport height. Descendants consume it via
 * `var(--hero-progress, 0)` to animate in lockstep.
 */
export function HeroScrollProgress() {
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;

    const update = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight || 1;
      const progress = Math.max(0, Math.min(1, scrollY / vh));
      root.style.setProperty("--hero-progress", progress.toFixed(4));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      root.style.removeProperty("--hero-progress");
    };
  }, []);

  return null;
}
