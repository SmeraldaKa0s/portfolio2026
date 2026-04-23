"use client";

import { useEffect, useRef, useState } from "react";

interface Sticker {
  src: string;
  size: number;
  sizeSm: number;
  parallaxAmp: number;
  orbitKeyframe: string;
  orbitDuration: number;
  anchor: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  anchorSm?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  scrollVector: { x: number; y: number };
  hideBelowSm?: boolean;
  entranceDelay: number;
}

const stickers: Sticker[] = [
  {
    src: "/images/pastilla-2.png",
    size: 92,
    sizeSm: 80,
    parallaxAmp: 10,
    orbitKeyframe: "sticker-orbit-c",
    orbitDuration: 12,
    anchor: { top: "clamp(180px, 30vh, 300px)", left: "calc(64% + 30px)" },
    anchorSm: { top: "clamp(100px, 18vh, 160px)", left: "6%" },
    scrollVector: { x: -220, y: -140 },
    hideBelowSm: false,
    entranceDelay: 720,
  },
  {
    src: "/images/pastilla-3.png",
    size: 84,
    sizeSm: 72,
    parallaxAmp: 10,
    orbitKeyframe: "sticker-orbit-a",
    orbitDuration: 11,
    anchor: { top: "clamp(72px, 14vh, 128px)", right: "calc(clamp(24px, 6vw, 96px) - 30px)" },
    anchorSm: { top: "clamp(60px, 12vh, 110px)", right: "4%" },
    scrollVector: { x: 180, y: -180 },
    hideBelowSm: false,
    entranceDelay: 800,
  },
  {
    src: "/images/pastilla-1.png",
    size: 104,
    sizeSm: 84,
    parallaxAmp: 8,
    orbitKeyframe: "sticker-orbit-b",
    orbitDuration: 13,
    anchor: { top: "clamp(220px, 38vh, 360px)", right: "calc(clamp(16px, 3vw, 48px) - 30px)" },
    anchorSm: { top: "clamp(180px, 32vh, 260px)", right: "3%" },
    scrollVector: { x: 240, y: 120 },
    hideBelowSm: false,
    entranceDelay: 920,
  },
];

export function FloatingStickers() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [entered, setEntered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isSmall, setIsSmall] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const s = window.matchMedia("(max-width: 768px)");
    setPrefersReducedMotion(m.matches);
    setIsSmall(s.matches);
    const onM = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    const onS = (e: MediaQueryListEvent) => setIsSmall(e.matches);
    m.addEventListener("change", onM);
    s.addEventListener("change", onS);
    return () => {
      m.removeEventListener("change", onM);
      s.removeEventListener("change", onS);
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || prefersReducedMotion) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setMouse({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };

    el.addEventListener("mousemove", handleMove);
    return () => el.removeEventListener("mousemove", handleMove);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const handler = () => {
      const p = Math.min(1, Math.max(0, window.scrollY / 600));
      setScrollProgress(p);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 3,
      }}
    >
      {stickers.map((s, i) => {
        if (isSmall && s.hideBelowSm) return null;

        const size = isSmall ? s.sizeSm : s.size;
        const currentAnchor = isSmall && s.anchorSm ? s.anchorSm : s.anchor;
        const px = prefersReducedMotion ? 0 : (mouse.x - 0.5) * (i % 2 === 0 ? s.parallaxAmp : -s.parallaxAmp);
        const py = prefersReducedMotion ? 0 : (mouse.y - 0.5) * (i % 2 === 0 ? -s.parallaxAmp : s.parallaxAmp);
        const scrollScale = isSmall ? 0.3 : 1;
        const scrollX = s.scrollVector.x * scrollProgress * scrollScale;
        const scrollY = s.scrollVector.y * scrollProgress * scrollScale;
        const scrollBlur = scrollProgress * (isSmall ? 6 : 14);
        const scrollOpacity = 1 - scrollProgress;

        const scale = entered ? 1 : 0.72;
        const opacity = entered ? scrollOpacity : 0;

        const entranceDelay = prefersReducedMotion ? 0 : s.entranceDelay;
        const entranceDuration = prefersReducedMotion ? 200 : 680;

        return (
          <div
            key={s.src}
            className="sticker-hover"
            style={{
              position: "absolute",
              ...currentAnchor,
              width: size,
              height: size,
              opacity,
              transform: `scale(${scale})`,
              transition: `
                opacity ${entranceDuration}ms cubic-bezier(0.22, 1, 0.36, 1) ${entranceDelay}ms,
                transform ${entranceDuration}ms cubic-bezier(0.22, 1, 0.36, 1) ${entranceDelay}ms
              `,
              willChange: "transform, opacity",
              pointerEvents: "auto",
              perspective: "700px",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                animation: prefersReducedMotion
                  ? undefined
                  : `${s.orbitKeyframe} ${s.orbitDuration}s ease-in-out infinite`,
                animationDelay: prefersReducedMotion ? undefined : `${entranceDelay + 500}ms`,
                willChange: "transform",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  transform: `translate(${px + scrollX}px, ${py + scrollY}px)`,
                  filter: scrollBlur > 0 ? `blur(${scrollBlur}px)` : undefined,
                  transition: "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  willChange: "transform, filter",
                }}
              >
                <div
                  className="sticker-flip"
                  style={{
                    width: "100%",
                    height: "100%",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <img
                    src={s.src}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      userSelect: "none",
                      pointerEvents: "none",
                      backfaceVisibility: "visible",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <style>{`
        @keyframes sticker-orbit-a {
          0%,100% { transform: translate(0, 0) rotate(0deg); }
          25%     { transform: translate(8px, 6px) rotate(1.5deg); }
          50%     { transform: translate(4px, 12px) rotate(-0.5deg); }
          75%     { transform: translate(-6px, 4px) rotate(-1.5deg); }
        }
        @keyframes sticker-orbit-b {
          0%,100% { transform: translate(0, 0) rotate(0deg); }
          25%     { transform: translate(-6px, -8px) rotate(-1.2deg); }
          50%     { transform: translate(-10px, 2px) rotate(1deg); }
          75%     { transform: translate(-4px, 8px) rotate(1.8deg); }
        }
        @keyframes sticker-orbit-c {
          0%,100% { transform: translate(0, 0) rotate(0deg); }
          25%     { transform: translate(5px, -7px) rotate(2deg); }
          50%     { transform: translate(9px, 3px) rotate(-0.8deg); }
          75%     { transform: translate(2px, 9px) rotate(-2deg); }
        }
        .sticker-flip {
          transform: rotateY(0deg);
          transition: transform 900ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sticker-hover:hover .sticker-flip {
          transform: rotateY(360deg);
        }
        @media (prefers-reduced-motion: reduce) {
          .sticker-flip,
          .sticker-hover:hover .sticker-flip {
            transition: none;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
