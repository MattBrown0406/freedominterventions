const BRAND_SUFFIX = " | Freedom Interventions";

function truncateAtWord(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;
  const budget = Math.max(1, maxLength - 3);
  const slice = value.slice(0, budget);
  const lastSpace = slice.lastIndexOf(" ");
  const base = lastSpace > Math.floor(budget * 0.5) ? slice.slice(0, lastSpace) : slice;
  return `${base.replace(/[\s,;:\-–—|]+$/, "").trimEnd()}...`;
}

export function fitSeoTitle(value: string, maxLength = 60): string {
  const cleaned = value.replace(/\s+/g, " ").trim();
  if (cleaned.length <= maxLength) return cleaned;

  if (cleaned.endsWith(BRAND_SUFFIX)) {
    const base = cleaned.slice(0, -BRAND_SUFFIX.length).trim();
    // Prefer dropping the brand suffix over chopping the meaningful title.
    if (base.length <= maxLength) return base;
    return truncateAtWord(base, maxLength);
  }

  return truncateAtWord(cleaned, maxLength);
}

export function fitSeoDescription(value: string, maxLength = 160): string {
  const cleaned = value.replace(/\s+/g, " ").trim();
  if (cleaned.length <= maxLength) return cleaned;
  return truncateAtWord(cleaned, maxLength);
}
