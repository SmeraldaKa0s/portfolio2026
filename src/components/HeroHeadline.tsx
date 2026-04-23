"use client";

import { useEffect, useState } from "react";
import { TextRotator } from "./TextRotator";

interface HeroHeadlineProps {
  anchorWord: string;
  rotatingWords: string[];
  className?: string;
}

export function HeroHeadline({ anchorWord, rotatingWords, className }: HeroHeadlineProps) {
  const [trackWidth, setTrackWidth] = useState(0);
  const [progress, setProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const onMq = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const handler = () => {
      const p = Math.min(1, Math.max(0, window.scrollY / 600));
      setProgress(p);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [prefersReducedMotion]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const scrollOffset = progress * (isMobile ? 60 : 200);
  const blurAmount = progress * (isMobile ? 6 : 14);
  const fadeOpacity = 1 - progress;

  return (
    <h1
      className={className}
      style={{
        fontSize: "clamp(58px, 11.5vw, 176px)",
        fontWeight: 400,
        lineHeight: 0.94,
        letterSpacing: "-0.035em",
        margin: 0,
        fontFamily: "var(--font-display, var(--font-heading))",
        color: "var(--neutral-on-background-strong)",
        textAlign: "left",
        transform: `translate3d(${-scrollOffset}px, 0, 0)`,
        filter: blurAmount > 0 ? `blur(${blurAmount}px)` : undefined,
        opacity: fadeOpacity,
        willChange: "transform, filter, opacity",
      }}
    >
      <span style={{ display: "block", position: "relative", paddingBottom: "0.06em" }}>
        <TextRotator
          words={rotatingWords}
          interval={2800}
          onWidthChange={setTrackWidth}
        />
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            height: "1.5px",
            width: trackWidth,
            background: "var(--neutral-on-background-strong)",
            opacity: 0.5,
            transition: "width 520ms cubic-bezier(0.22, 1, 0.36, 1)",
            pointerEvents: "none",
          }}
        />
      </span>
      <span style={{ display: "block" }}>{anchorWord}</span>
    </h1>
  );
}
