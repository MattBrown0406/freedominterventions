// Explicitly reviewed non-geographic routes. Their page components own the copy.
// Never infer a location from these slugs or maintain a second version of the text.
export const pageFallbackSources = {
  '/intervention-toolkit': 'src/pages/InterventionToolkit.tsx',
  '/how-intervention-works': 'src/pages/HowInterventionWorks.tsx',
  '/service-areas': 'src/pages/ServiceAreas.tsx',
};

export function pageFallbackMetadata(source, route) {
  const head = source.match(/<SEOHead\s([\s\S]*?)\/>/)?.[1];
  const literal = (name) => head?.match(new RegExp(`\\b${name}="([^"]+)"`))?.[1];
  const hero = source.match(/<h1\b[^>]*>([^<]+)<\/h1>[\s\S]*?<p\b[^>]*>([^<]+)<\/p>/);
  const normalize = (value) => value?.replace(/\s+/g, ' ').trim();
  const metadata = { title: literal('title'), description: literal('description'), heading: normalize(hero?.[1]), body: normalize(hero?.[2]) };
  if (literal('canonical') !== `https://freedominterventions.com${route}` || Object.values(metadata).some(value => !value)) {
    throw new Error(`Reviewed page fallback contract changed for ${route}; update the extractor rather than using geographic fallback.`);
  }
  return metadata;
}
