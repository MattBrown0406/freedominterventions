// Reuse the existing visible cost answer, rather than treating its slug as a city.
// Parse only JSON-compatible string literals; never execute application source.
export const COST_ANSWER_ROUTE = '/intervention-answers/how-much-does-intervention-cost';
export function costAnswerMetadata(source) {
  const match = source.match(/slug:\s*"how-much-does-intervention-cost",\s*question:\s*("(?:[^"\\]|\\.)*"),\s*shortAnswer:\s*("(?:[^"\\]|\\.)*")/);
  if (!match) throw new Error('Cost answer source changed; review raw HTML fallback mapping.');
  const question = JSON.parse(match[1]);
  const answer = JSON.parse(match[2]);
  return { title: question, heading: question, description: answer, body: answer };
}
