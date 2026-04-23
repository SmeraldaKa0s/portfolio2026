"use client";

import { useEffect, useRef, useState } from "react";

interface Sticker {
  src: string;
  x: number;
  y: number;
  size: number;
  orbitRadius: number;
  orbitSpeed: number;
  orbitDirection: 1 | -1;
}

const stickers: Sticker[] = [
  { src: "/images/pastilla-2.png", x: 8, y: 25, size: 100, orbitRadius: 12, orbitSpeed: 8, orbitDirection: 1 },
  { src: "/images/pastilla-3.png", x: 75, y: 15, size: 90, orbitRadius: 10, orbitSpeed: 10, orbitDirection: -1 },
  { src: "/images/pastilla-1.png", x: 70, y: 65, size: 95, orbitRadius: 14, orbitSpeed: 12, orbitDirection: 1 },
];

export function FloatingStickers() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setMouse({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };

    el.addEventListener("mousemove", handleMove);
    return () => el.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {stickers.map((s, i) => {
        const parallaxX = (mouse.x - 0.5) * (i % 2 === 0 ? 18 : -14);
        const parallaxY = (mouse.y - 0.5) * (i % 2 === 0 ? -14 : 18);

        return (
          <div
            key={s.src}
            style={{
              position: "absolute",
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              transform: `translate(${parallaxX}px, ${parallaxY}px)`,
              transition: "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              animation: `sticker-orbit-${i} ${s.orbitSpeed}s linear infinite`,
              pointerEvents: "auto",
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
              }}
            />
          </div>
        );
      })}
      <style>{`
        @keyframes sticker-orbit-0 {
          0%   { transform: translate(0px, 0px); }
          25%  { transform: translate(${stickers[0].orbitRadius}px, ${stickers[0].orbitRadius * 0.7}px); }
          50%  { transform: translate(0px, ${stickers[0].orbitRadius}px); }
          75%  { transform: translate(-${stickers[0].orbitRadius}px, ${stickers[0].orbitRadius * 0.3}px); }
          100% { transform: translate(0px, 0px); }
        }
        @keyframes sticker-orbit-1 {
          0%   { transform: translate(0px, 0px); }
          25%  { transform: translate(-${stickers[1].orbitRadius}px, ${stickers[1].orbitRadius * 0.6}px); }
          50%  { transform: translate(0px, -${stickers[1].orbitRadius}px); }
          75%  { transform: translate(${stickers[1].orbitRadius}px, -${stickers[1].orbitRadius * 0.4}px); }
          100% { transform: translate(0px, 0px); }
        }
        @keyframes sticker-orbit-2 {
          0%   { transform: translate(0px, 0px); }
          25%  { transform: translate(${stickers[2].orbitRadius * 0.8}px, -${stickers[2].orbitRadius}px); }
          50%  { transform: translate(-${stickers[2].orbitRadius * 0.5}px, 0px); }
          75%  { transform: translate(-${stickers[2].orbitRadius}px, ${stickers[2].orbitRadius * 0.7}px); }
          100% { transform: translate(0px, 0px); }
        }
      `}</style>
    </div>
  );
}
