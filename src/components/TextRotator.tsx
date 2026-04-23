"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface TextRotatorProps {
  words: string[];
  interval?: number;
  className?: string;
  style?: React.CSSProperties;
  onWidthChange?: (width: number) => void;
}

export function TextRotator({
  words,
  interval = 2500,
  className,
  style,
  onWidthChange,
}: TextRotatorProps) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"visible" | "exiting" | "entering">("visible");
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setPhase("exiting");

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setPhase("entering");

        setTimeout(() => {
          setPhase("visible");
        }, 50);
      }, 400);
    }, interval);

    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [index, phase, words.length, interval]);

  useLayoutEffect(() => {
    if (!onWidthChange || !measureRef.current) return;
    const el = measureRef.current;
    const emit = () => onWidthChange(el.getBoundingClientRect().width);
    emit();
    const ro = new ResizeObserver(emit);
    ro.observe(el);
    window.addEventListener("resize", emit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", emit);
    };
  }, [index, onWidthChange]);

  const transform =
    phase === "exiting"
      ? "translateY(-100%)"
      : phase === "entering"
        ? "translateY(40%)"
        : "translateY(0)";

  const opacity = phase === "visible" ? 1 : 0;

  return (
    <span
      style={{
        display: "inline-block",
        overflow: "hidden",
        verticalAlign: "bottom",
        height: "1.15em",
        position: "relative",
        ...style,
      }}
    >
      <span
        ref={measureRef}
        className={className}
        style={{
          display: "inline-block",
          transform,
          opacity,
          transition:
            phase === "entering"
              ? "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease"
              : "transform 0.35s cubic-bezier(0.55, 0, 1, 0.45), opacity 0.3s ease",
        }}
      >
        {words[index]}
      </span>
    </span>
  );
}
