// Actual Edge handlers with synthetic Supabase/provider IO. No network or credentials.
// Optional AUDIT_BASELINE_REF=HEAD loads historical handlers read-only for RED evidence.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import ts from 'typescript';
import { webcrypto, createHmac } from 'node:crypto';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const baseline = process.env.AUDIT_BASELINE_REF;
const sample = 'Private background Ω 👪\n<script>alert("x")</script> & \'quotes\'\r\n  My question';
const future = '2099-10-14';
const read = (path) => baseline && /functions\/(square-booking|contracts|send-booking-confirmation)\/index.ts$/.test(path)
  ? execFileSync('git', ['show', `${baseline}:${path}`], { cwd: root, encoding: 'utf8' })
  : readFileSync(resolve(root, path), 'utf8');

function harness() {
  const tables = { bookings: [], contracts: [], availability_settings: Array.from({ length: 7 }, (_, day_of_week) => ({ day_of_week, start_time: '08:00', end_time: '18:00', is_available: true })) };
  const emails = [], outbound = [], analytics = [], logs = [], handlers = {}, modules = new Map();
  let sequence = 0, failClientEmail = false;
  const value = (row, key) => key.includes('->>') ? row[key.split('->>')[0]]?.[key.split('->>')[1]] : row[key];
  class Query {
    constructor(table) { this.table = table; this.filters = []; this.columns = '*'; this.mode = 'read'; }
    select(columns = '*') { this.columns = columns; return this; }
    eq(k, v) { this.filters.push(r => value(r, k) === v); return this; }
    neq(k, v) { this.filters.push(r => value(r, k) !== v); return this; }
    is(k, v) { this.filters.push(r => (value(r, k) ?? null) === v); return this; }
    in(k, v) { this.filters.push(r => v.includes(value(r, k))); return this; }
    gte(k, v) { this.filters.push(r => value(r, k) >= v); return this; }
    contains(k, v) { this.filters.push(r => Object.entries(v).every(([key, val]) => r[k]?.[key] === val)); return this; }
    order() { return this; }
    limit() { return this; }
    insert(data) { this.mode = 'insert'; this.payload = data; return this; }
    update(data) { this.mode = 'update'; this.payload = data; return this; }
    delete() { this.mode = 'delete'; return this; }
    single() { this.one = true; return this; }
    maybeSingle() { this.one = true; return this; }
    then(resolvePromise, reject) {
      try {
        const table = tables[this.table] ??= [];
        let rows = table.filter(r => this.filters.every(f => f(r)));
        if (this.mode === 'insert') {
          const row = { id: `fixture-${++sequence}`, created_at: new Date().toISOString(), notes: null, client_notes: null, ...structuredClone(this.payload) };
          table.push(row); rows = [row];
        } else if (this.mode === 'update') rows.forEach(r => Object.assign(r, structuredClone(this.payload)));
        else if (this.mode === 'delete') tables[this.table] = table.filter(r => !rows.includes(r));
        const result = rows.map(r => this.columns === '*' ? structuredClone(r) : Object.fromEntries(this.columns.split(',').map(k => [k.trim(), structuredClone(r[k.trim()])])));
        return Promise.resolve({ data: this.one ? result[0] ?? null : result, error: null }).then(resolvePromise, reject);
      } catch (e) { return Promise.reject(e).then(resolvePromise, reject); }
    }
  }
  const invoke = async (name, { body }) => {
    if (!handlers[name]) return { data: { available: true }, error: null };
    const response = await handlers[name](new Request('https://fixture.invalid', { method: 'POST', body: JSON.stringify(body) }));
    return { data: await response.json(), error: response.ok ? null : new Error(`handler ${name} returned ${response.status}`) };
  };
  const supabase = { from: t => new Query(t), functions: { invoke } };
  async function fakeFetch(url, options = {}) {
    outbound.push({ url: String(url), body: options.body });
    if (String(url).includes('zoom.us/oauth')) return Response.json({ access_token: 'fixture-only' });
    if (String(url).includes('/meetings')) return options.method === 'DELETE' ? new Response(null, { status: 204 }) : Response.json({ id: ++sequence, join_url: 'https://zoom.invalid/fixture' });
    if (String(url).includes('/payment-links')) return Response.json({ payment_link: { id: 'fixture-link', order_id: 'fixture-order', url: 'https://square.invalid/checkout' } });
    if (String(url).includes('/orders/')) return Response.json({ order: { location_id: 'fixture-only', state: 'COMPLETED', total_money: { amount: 15000, currency: 'USD' }, tenders: [{ payment_id: 'fixture-payment' }] } });
    if (String(url).includes('/functions/v1/')) return Response.json({ success: true });
    throw new Error(`Unexpected network attempt blocked: ${url}`);
  }
  function load(path) {
    if (modules.has(path)) return modules.get(path);
    const exports = {}; modules.set(path, exports);
    const require = spec => {
      if (spec.includes('http/server.ts')) return { serve: fn => { handlers[path.split('/').at(-2)] = fn; } };
      if (spec.includes('supabase-js')) return { createClient: () => supabase };
      if (spec.startsWith('https:')) return {};
      if (spec.endsWith('/auth.ts')) return { isServiceRoleRequest: async () => true, unauthorized: () => new Response(null, { status: 401 }) };
      if (spec.endsWith('/rateLimit.ts')) return { checkRateLimit: async () => true, getClientIp: () => 'fixture' };
      if (spec.endsWith('/spine.ts')) return { enqueueSpineEvent: async (...args) => analytics.push(args.slice(0, 2)), extractUtm: () => ({}) };
      if (spec.endsWith('/crm.ts')) return { upsertCrmContact: async (...args) => { analytics.push(args[1]); return { data: { id: 'crm' }, error: null }; } };
      const target = resolve(root, dirname(path), spec).slice(root.length + 1);
      const result = load(target);
      if (spec.endsWith('/resend.ts')) return { ...result, sendResendEmail: async payload => {
        if (failClientEmail && payload.to !== 'matt@freedominterventions.com') throw new Error('Synthetic client delivery failure');
        emails.push(payload); return 'fixture-email';
      }, sendSystemEmail: async payload => { emails.push(payload); } };
      return result;
    };
    const code = ts.transpileModule(read(path), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
    vm.runInNewContext(code, { exports, require, Request, Response, URL, URLSearchParams, TextEncoder, Uint8Array, crypto: webcrypto, btoa, atob, fetch: fakeFetch, Deno: { env: { get: () => 'fixture-only' } }, console: Object.fromEntries(['log', 'warn', 'error'].map(k => [k, (...args) => logs.push(args)])) }, { filename: path });
    return exports;
  }
  const notes = load('supabase/functions/_shared/clientNotes.ts');
  for (const name of ['square-booking', 'contracts', 'send-booking-confirmation', 'square-webhook']) load(`supabase/functions/${name}/index.ts`);
  const call = async (name, body) => {
    const rawBody = JSON.stringify(body);
    const headers = name === 'square-webhook' ? { 'x-square-hmacsha256-signature': createHmac('sha256', 'fixture-only').update('fixture-only' + rawBody).digest('base64') } : {};
    const response = await handlers[name](new Request('https://fixture.invalid', { method: 'POST', headers, body: rawBody }));
    return { status: response.status, body: await response.json() };
  };
  return { tables, emails, outbound, analytics, logs, notes, call, setFailClientEmail: v => { failClientEmail = v; } };
}

const input = (action, clientNotes, bookingType = 'consultation') => ({ action, clientNotes, bookingType, customerName: 'Fixture Person', customerEmail: 'fixture@example.invalid', customerPhone: '5551234567', bookingDate: future, bookingTime: '10:00', amount: 15000 });
const contractInput = clientNotes => ({ action: 'create-contract', contractType: 'readiness-intensive', clientName: 'Fixture Person', clientEmail: 'fixture@example.invalid', signerName: 'Fixture Person', agreementText: 'Fixture agreement', agreementVersion: 'test', clientNotes, metadata: { bookingDate: future, bookingTime: '10:00' } });
function privateOnly(h, body, stored) {
  assert.ok(!JSON.stringify(body).includes('client_notes'), 'public response exposes client_notes');
  if (stored) {
    const encoded = JSON.stringify(stored).slice(1, -1);
    assert.ok(!JSON.stringify(body).includes(encoded), 'public response contains notes');
    for (const collection of [h.outbound, h.analytics, h.logs]) assert.ok(!JSON.stringify(collection).includes(encoded), 'notes leaked outside owner mail');
  }
  const owner = h.emails.filter(e => e.to === 'matt@freedominterventions.com');
  const client = h.emails.filter(e => e.to !== 'matt@freedominterventions.com');
  assert.ok(owner.length > 0, 'owner email missing');
  for (const mail of owner) {
    assert.ok(mail.html.includes(h.notes.renderOwnerClientNotes(stored)), 'owner notes missing or altered');
    assert.ok(!mail.subject.includes('Private background'), 'notes in subject');
    assert.ok(!mail.html.includes('<script>'), 'unescaped HTML');
  }
  for (const mail of client) assert.ok(!mail.html.includes('Client notes') && !mail.html.includes('Private background'), 'notes sent to client');
}

let passed = 0;
async function test(name, run) { await run(); console.log(`PASS ${name}`); passed++; }
await test('validator: exact text, blank, Unicode, boundary, bad types, null byte', () => {
  const { notes } = harness();
  for (const value of [undefined, null, '', ' \r\n\t']) assert.equal(notes.validateClientNotes(value), null);
  for (const value of [sample, 'x'.repeat(5000)]) assert.equal(notes.validateClientNotes(value), value);
  for (const value of ['x'.repeat(5001), {}, [], 7, true, 'x\0y']) assert.throws(() => notes.validateClientNotes(value));
  const html = notes.renderOwnerClientNotes(sample);
  assert.ok(html.includes('&lt;script&gt;') && html.includes('&amp;') && html.includes('&#039;') && html.includes('<br>'));
});
for (const bookingType of ['consultation', 'aftercare-planning']) for (const value of [sample, '', undefined]) {
  await test(`${bookingType}: create, owner-only email, lookup, reschedule and duplicate retry (${value ? 'text' : String(value)})`, async () => {
    const h = harness();
    const created = await h.call('square-booking', input('create-booking', value, bookingType));
    assert.equal(created.status, 200, JSON.stringify(created.body));
    const row = h.tables.bookings[0];
    assert.equal(row.client_notes, value || null);
    privateOnly(h, created.body, value || null);
    const lookup = await h.call('square-booking', { action: 'lookup-booking', bookingId: row.id, email: row.customer_email });
    privateOnly(h, lookup.body, value || null);
    const moved = await h.call('square-booking', { action: 'reschedule-booking', bookingId: row.id, email: row.customer_email, newDate: '2099-10-15', newTime: '11:00', clientNotes: 'Must not replace original' });
    assert.equal(moved.status, 200, JSON.stringify(moved.body));
    assert.equal(row.client_notes, value || null);
    privateOnly(h, moved.body, value || null);
    const count = h.emails.length;
    await h.call('send-booking-confirmation', { bookingId: row.id, clientNotes: 'Must not replace original' });
    assert.equal(h.emails.length, count);
    assert.equal(row.client_notes, value || null);
  });
}
for (const noteValue of [sample, '', undefined]) await test(`paid checkout + verified fulfillment/retry (${noteValue ? 'text' : String(noteValue)})`, async () => {
  const h = harness();
  const created = await h.call('square-booking', input('create-checkout-link', noteValue, 'crisis-coaching'));
  assert.equal(created.status, 200, JSON.stringify(created.body));
  const row = h.tables.bookings[0];
  assert.equal(row.client_notes, noteValue || null);
  assert.equal(row.status, 'pending');
  const paid = await h.call('square-booking', { action: 'verify-booking-payment', bookingId: row.id });
  assert.equal(paid.status, 200, JSON.stringify(paid.body));
  assert.equal(row.status, 'confirmed');
  privateOnly(h, paid.body, noteValue || null);
  await h.call('square-booking', { action: 'verify-booking-payment', bookingId: row.id });
  assert.equal(row.client_notes, noteValue || null);
});
for (const noteValue of [sample, '', undefined]) await test(`FRI signed contract + fulfillment/retry (${noteValue ? 'text' : String(noteValue)})`, async () => {
  const h = harness();
  const created = await h.call('contracts', contractInput(noteValue));
  assert.equal(created.status, 200, JSON.stringify(created.body));
  const contract = h.tables.contracts[0];
  assert.equal(contract.client_notes, noteValue || null);
  assert.ok(!JSON.stringify(created.body).includes('client_notes'));
  assert.equal(h.tables.bookings.length, 0);
  // Simulate the trusted payment transition, then execute the actual service-only fulfillment.
  contract.status = 'paid'; contract.payment_id = 'fixture-payment';
  const fulfilled = await h.call('contracts', { action: 'fulfill-paid-contract', contractId: contract.id });
  assert.equal(fulfilled.status, 200, JSON.stringify(fulfilled.body));
  assert.equal(h.tables.bookings[0].client_notes, noteValue || null);
  privateOnly(h, fulfilled.body, noteValue || null);
  await h.call('contracts', { action: 'fulfill-paid-contract', contractId: contract.id });
  assert.equal(h.tables.bookings.length, 1);
  assert.equal(h.tables.bookings[0].client_notes, noteValue || null);
});
await test('failed confirmation rollback/recovery never overwrites client background', async () => {
  const h = harness(); h.setFailClientEmail(true);
  const result = await h.call('square-booking', input('create-booking', sample));
  assert.equal(result.body.confirmationError, true);
  const row = h.tables.bookings[0];
  assert.equal(row.client_notes, sample); assert.equal(row.notes, null);
  h.setFailClientEmail(false); h.emails.length = 0;
  await h.call('send-booking-confirmation', { bookingId: row.id });
  assert.equal(row.client_notes, sample);
  privateOnly(h, result.body, sample);
});
for (const action of ['create-booking', 'create-checkout-link', 'create-contract']) {
  await test(`${action}: reject oversized and malformed notes before writes/provider calls`, async () => {
    for (const bad of ['x'.repeat(5001), { text: sample }, 42, 'a\0b']) {
      const h = harness();
      const result = await h.call(action === 'create-contract' ? 'contracts' : 'square-booking', action === 'create-contract' ? contractInput(bad) : input(action, bad, action === 'create-booking' ? 'consultation' : 'crisis-coaching'));
      assert.equal(result.status, 400);
      assert.equal(h.tables.bookings.length + h.tables.contracts.length + h.outbound.length + h.emails.length, 0);
      assert.ok(!JSON.stringify(result.body).includes(sample));
    }
  });
}
for (const type of ['crisis-coaching', 'readiness-intensive']) await test(`${type}: signed Square webhook payment and retry preserve original notes`, async () => {
  const h = harness();
  if (type === 'crisis-coaching') {
    await h.call('square-booking', input('create-checkout-link', sample, type));
  } else {
    await h.call('contracts', contractInput(sample));
    // Link association is the persisted output of Square checkout, not client notes metadata.
    h.tables.contracts[0].square_order_id = 'fixture-order';
  }
  const event = { data: { object: { payment: { id: 'fixture-payment', order_id: 'fixture-order', status: 'COMPLETED', amount_money: { amount: type === 'crisis-coaching' ? 15000 : 250000 } } } } };
  const paid = await h.call('square-webhook', event);
  assert.equal(paid.status, 200, JSON.stringify(paid.body));
  assert.equal(h.tables.bookings[0].client_notes, sample);
  assert.equal(h.tables.bookings[0].status, 'confirmed');
  privateOnly(h, paid.body, sample);
  const count = h.emails.length;
  const retried = await h.call('square-webhook', event);
  assert.equal(retried.status, 200);
  assert.equal(h.emails.length, count);
  assert.equal(h.tables.bookings.length, 1);
  assert.equal(h.tables.bookings[0].client_notes, sample);
});
console.log(`${passed} booking client-notes handler tests passed (synthetic IO; no live services).`);
