const HELMET_META_KEYS = new Set([
  "title", "description", "keywords", "robots", "ai:description", "llm:description",
  "og:type", "og:title", "og:description", "og:image", "og:image:secure_url",
  "og:image:width", "og:image:height", "og:image:alt", "og:image:type", "og:url",
  "og:site_name", "og:locale", "twitter:card", "twitter:title", "twitter:description",
  "twitter:image", "twitter:image:alt", "twitter:site", "twitter:creator",
  "article:published_time", "article:modified_time", "article:section", "article:author",
  "author", "publisher", "geo.region", "geo.placename", "geo.position", "icbm",
  "format-detection", "theme-color", "apple-mobile-web-app-title", "application-name",
]);

const BRAND_SUFFIX = " | Freedom Interventions";

const truncateAtWord = (value, maxLength) => {
  if (value.length <= maxLength) return value;
  const budget = Math.max(1, maxLength - 3);
  const slice = value.slice(0, budget);
  const lastSpace = slice.lastIndexOf(" ");
  const base = lastSpace > Math.floor(budget * 0.5) ? slice.slice(0, lastSpace) : slice;
  return `${base.replace(/[\s,;:\-–—|]+$/, "").trimEnd()}...`;
};

export const fitSeoTitle = (value, maxLength = 60) => {
  const cleaned = String(value || "").replace(/\s+/g, " ").trim();
  if (cleaned.length <= maxLength) return cleaned;
  if (cleaned.endsWith(BRAND_SUFFIX)) {
    const base = cleaned.slice(0, -BRAND_SUFFIX.length).trim();
    if (base.length <= maxLength) return base;
    return truncateAtWord(base, maxLength);
  }
  return truncateAtWord(cleaned, maxLength);
};

export const fitSeoDescription = (value, maxLength = 160) => {
  const cleaned = String(value || "").replace(/\s+/g, " ").trim();
  return cleaned.length <= maxLength ? cleaned : truncateAtWord(cleaned, maxLength);
};


export const markHelmetManagedTags = (html) => html
  .replace(/<title(?![^>]*\bdata-react-helmet=)([^>]*)>/gi, '<title$1 data-react-helmet="true">')
  .replace(/<meta\b([^>]*)>/gi, (tag, attributes) => {
    if (/\bdata-react-helmet=/i.test(attributes)) return tag;
    const key = attributes.match(/\b(?:name|property)=["']([^"']+)["']/i)?.[1]?.toLowerCase();
    const cleanAttributes = attributes.replace(/\s*\/\s*$/, "");
    return key && HELMET_META_KEYS.has(key) ? `<meta${cleanAttributes} data-react-helmet="true">` : tag;
  })
  .replace(/<link\b([^>]*)>/gi, (tag, attributes) => {
    if (/\bdata-react-helmet=/i.test(attributes)) return tag;
    const rel = attributes.match(/\brel=["']([^"']+)["']/i)?.[1]?.toLowerCase();
    const cleanAttributes = attributes.replace(/\s*\/\s*$/, "");
    return rel && ["canonical", "ai-context", "ai-context-full"].includes(rel)
      ? `<link${cleanAttributes} data-react-helmet="true">`
      : tag;
  })
  .replace(/<script\b([^>]*)type=["']application\/ld\+json["']([^>]*)>([\s\S]*?)<\/script>/gi, (tag, before, after, body) => {
    if (/\bdata-react-helmet=/i.test(`${before} ${after}`) || body.includes('"@id": "https://freedominterventions.com/#organization"')) return tag;
    return `<script${before}type="application/ld+json"${after} data-react-helmet="true">${body}</script>`;
  });
