"use client";

import { useEffect, useRef, useState } from "react";
import { Media } from "@once-ui-system/core";
import styles from "@/app/about/about.module.scss";

interface Props {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  maxRotation?: number;
  maxTilt?: number;
}

export function FloatingAvatar({
  src,
  alt,
  width = 590,
  height = 665,
  maxRotation = -20,
  maxTilt = 10,
}: Props) {
  const tiltRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0, hovering: false });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(m.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setRotation(0);
      return;
    }

    let raf = 0;

    const update = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrollY / vh));
      setRotation(maxRotation * progress);
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
    };
  }, [reducedMotion, maxRotation]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const x = (px - 0.5) * 2 * maxTilt;
    const y = -(py - 0.5) * 2 * maxTilt;
    setTilt({ x, y, hovering: true });
  };

  const onMouseLeave = () => {
    setTilt({ x: 0, y: 0, hovering: false });
  };

  return (
    <div
      style={{
        width,
        maxWidth: "100%",
        height: "auto",
        aspectRatio: `${width} / ${height}`,
        perspective: "1200px",
      }}
    >
      <div
        ref={tiltRef}
        className={styles.avatarFrame}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          rotate: `${rotation}deg`,
          transformOrigin: "50% 60%",
          transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(${tilt.hovering ? 1.025 : 1})`,
          transition: tilt.hovering
            ? "transform 120ms ease-out"
            : "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
          transformStyle: "preserve-3d",
          willChange: "transform, rotate, translate",
          animation: reducedMotion
            ? undefined
            : "avatar-float 9s ease-in-out infinite",
        }}
      >
        <Media
          radius="l"
          alt={alt}
          src={src}
          sizes={`${width}px`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
        <style>{`
          @keyframes avatar-float {
            0%, 100% { translate: 0 0; }
            33%      { translate: 6px -10px; }
            66%      { translate: -4px 8px; }
          }
          @media (prefers-reduced-motion: reduce) {
            @keyframes avatar-float {
              0%, 100% { translate: 0 0; }
            }
          }
        `}</style>
      </div>
    </div>
  );
}
