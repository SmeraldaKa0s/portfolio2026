"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  maxTilt?: number;
  hoverScale?: number;
  perspective?: number;
  style?: React.CSSProperties;
  className?: string;
}

export function Tilt3D({
  children,
  maxTilt = 10,
  hoverScale = 1.025,
  perspective = 1200,
  style,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, hovering: false });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(m.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const el = ref.current;
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
    <div style={{ perspective: `${perspective}px`, ...style }} className={className}>
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(${tilt.hovering ? hoverScale : 1})`,
          transition: tilt.hovering
            ? "transform 120ms ease-out"
            : "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}
