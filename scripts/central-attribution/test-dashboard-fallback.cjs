// Component state/render contract tests; no backend requests or real records.
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const { runInNewContext } = require('node:vm');
const assert = require('node:assert/strict');
const ts = require('typescript');
const source = readFileSync(resolve(__dirname, '../../src/components/admin/RevenueAttributionManager.tsx'), 'utf8');
const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
async function renderResponse(response) {
  const states = [], refs = [], effects = [];
  let cursor = 0, refCursor = 0, first = true;
  const jsx = (type, props) => ({ type, props });
  const hooks = {
    useState(value) { const i = cursor++; if (first) states[i] = value; return [states[i], next => { states[i] = next; }]; },
    useRef(value) { const i = refCursor++; return refs[i] ||= { current: value }; },
    useCallback(fn) { return fn; },
    useEffect(fn) { if (first) effects.push(fn); },
  };
  const exports = {};
  let requests = 0;
  runInNewContext(code, { exports, require(name) {
    if (name === 'react') return hooks;
    if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx, Fragment: 'Fragment' };
    if (name.includes('supabase/client')) return { supabase: { rpc: async () => { requests++; return response; } } };
    if (name.includes('LegacyRevenue')) return { default: 'LegacyDashboard' };
    return new Proxy({}, { get: (_, key) => String(key) });
  }, Intl, Date });
  const render = () => { cursor = 0; refCursor = 0; return exports.default(); };
  render(); first = false; effects.forEach(fn => fn());
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(requests, 1);
  return JSON.stringify(render());
}
(async () => {
  const missing = { code: 'PGRST202', message: 'Could not find the function public.get_central_attribution(p_end, p_start) in the schema cache' };
  let passed = 0;
  const fallback = await renderResponse({ error: missing });
  assert.match(fallback, /LegacyDashboard/); assert.match(fallback, /not configured yet/); passed++;
  for (const error of [
    { code: '42501', message: 'permission denied for function get_central_attribution' },
    { code: 'PGRST301', message: 'JWT expired' },
    { code: 'PGRST202', message: 'Could not find public.other_function' },
    { code: '42883', message: 'function is_strict_admin does not exist' },
    { message: 'Network unavailable' },
  ]) {
    const tree = await renderResponse({ error });
    assert.doesNotMatch(tree, /LegacyDashboard/); assert.match(tree, /could not be loaded/); passed++;
  }
  const valid = await renderResponse({ error: null, data: { rows: [], feeds: [] } });
  assert.doesNotMatch(valid, /LegacyDashboard/); assert.match(valid, /Attribution & phone outcomes/); passed++;
  const invalid = await renderResponse({ error: null, data: {} });
  assert.doesNotMatch(invalid, /LegacyDashboard/); assert.match(invalid, /could not be loaded/); passed++;
  console.log(`${passed} dashboard fallback component-contract tests passed (mocked RPC; not live UI QA)`);
})().catch(error => { console.error(error); process.exitCode = 1; });
