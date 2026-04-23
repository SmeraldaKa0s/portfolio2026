interface GrainOverlayProps {
  opacity?: number;
  blendMode?: "overlay" | "soft-light" | "multiply" | "screen";
  zIndex?: number;
  scope?: "fixed" | "absolute";
}

export function GrainOverlay({
  opacity = 0.035,
  blendMode = "overlay",
  zIndex = 0,
  scope = "absolute",
}: GrainOverlayProps) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`;
  const encoded = svg.replace(/#/g, "%23");

  return (
    <div
      aria-hidden="true"
      style={{
        position: scope,
        inset: 0,
        pointerEvents: "none",
        zIndex,
        opacity,
        mixBlendMode: blendMode,
        backgroundImage: `url("data:image/svg+xml;utf8,${encoded}")`,
        backgroundSize: "240px 240px",
      }}
    />
  );
}
