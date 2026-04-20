export const PROTECTED_SLUGS = new Set<string>([
  "automate-design-handovers-with-a-figma-to-code-pipeline",
  "building-once-ui-a-customizable-design-system",
  "simple-portfolio-builder",
]);

export function isProtected(slug: string): boolean {
  return PROTECTED_SLUGS.has(slug);
}
