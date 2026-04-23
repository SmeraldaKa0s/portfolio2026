"use client";

import { useEffect, useState, useRef } from "react";

interface TextRotatorProps {
  words: string[];
  interval?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function TextRotator({
  words,
  interval = 2500,
  className,
  style,
}: TextRotatorProps) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"visible" | "exiting" | "entering">("visible");
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

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
        ...style,
      }}
    >
      <span
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
