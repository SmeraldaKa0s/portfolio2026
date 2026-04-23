interface HeroWatermarkProps {
  character?: string;
}

export function HeroWatermark({ character = "A" }: HeroWatermarkProps) {
  return (
    <span
      aria-hidden="true"
      style={{
        position: "absolute",
        right: "-0.08em",
        bottom: "-0.18em",
        fontFamily: "var(--font-display, var(--font-heading))",
        fontSize: "clamp(40vh, 72vh, 88vh)",
        lineHeight: 0.78,
        fontWeight: 400,
        color: "var(--neutral-on-background-strong)",
        opacity: 0.045,
        letterSpacing: "-0.06em",
        pointerEvents: "none",
        userSelect: "none",
        whiteSpace: "nowrap",
        zIndex: 0,
      }}
    >
      {character}
    </span>
  );
}
