// Reuse the visible intervention answers (question + short answer) for raw HTML fallbacks,
// rather than treating answer slugs as cities.
// Parse only JSON-compatible string literals; never execute application source.
export const COST_ANSWER_ROUTE = '/intervention-answers/how-much-does-intervention-cost';
export function answerMetadata(source, slug) {
  const escapedSlug = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = source.match(new RegExp(`slug:\\s*"${escapedSlug}",\\s*question:\\s*("(?:[^"\\\\]|\\\\.)*"),\\s*shortAnswer:\\s*("(?:[^"\\\\]|\\\\.)*")`));
  if (!match) return null;
  const question = JSON.parse(match[1]);
  const answer = JSON.parse(match[2]);
  return { title: question, heading: question, description: answer, body: answer };
}
export function costAnswerMetadata(source) {
  const metadata = answerMetadata(source, 'how-much-does-intervention-cost');
  if (!metadata) throw new Error('Cost answer source changed; review raw HTML fallback mapping.');
  return metadata;
}
