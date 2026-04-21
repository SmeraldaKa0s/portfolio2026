export const PROTECTED_SLUGS = new Set<string>([
  "building-once-ui-a-customizable-design-system",
  "evidencia-de-entrega-configurable-por-retailer",
]);

export function isProtected(slug: string): boolean {
  return PROTECTED_SLUGS.has(slug);
}
