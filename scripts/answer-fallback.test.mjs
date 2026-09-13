import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { COST_ANSWER_ROUTE, costAnswerMetadata } from './answer-fallback.mjs';
test('cost fallback reuses visible source rather than geographic slug heuristic', () => {
  const data = costAnswerMetadata(readFileSync(new URL('../src/data/interventionAnswers.ts', import.meta.url), 'utf8'));
  assert.equal(data.heading, 'How much does an addiction intervention cost?');
  assert.equal(data.body, data.description);
  assert.ok(data.body.includes('Intervention cost depends on urgency, travel, preparation'));
  assert.equal(COST_ANSWER_ROUTE, '/intervention-answers/how-much-does-intervention-cost');
  assert.throws(() => costAnswerMetadata(''), /source changed/);
});
