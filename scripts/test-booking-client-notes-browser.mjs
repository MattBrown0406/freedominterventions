// Render the real BookingCalendar via local Vite; all non-local IO is intercepted.
// Start Vite with fixture-only VITE_SUPABASE_URL/key (see booking-client-notes.md).
import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { writeFileSync, unlinkSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const entry = fileURLToPath(new URL('../.booking-notes-browser-entry.tsx', import.meta.url));
writeFileSync(entry, `import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {BookingCalendar} from './src/components/BookingCalendar';
import './src/index.css';
createRoot(document.getElementById('root')!).render(<BrowserRouter><BookingCalendar defaultBookingType={window.__bookingType} /></BrowserRouter>);
`, { flag: 'wx' });
const base = process.argv[2] || 'http://127.0.0.1:4319';
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const notes = 'Private browser fixture Ω 👪\n<script>not executable</script> & question';
let tests = 0;
try {
  for (const [type, label, action] of [
    ['consultation', 'Book Consultation', 'create-booking'],
    ['crisis-coaching', 'Continue to Payment', 'create-checkout-link'],
    ['readiness-intensive', 'Continue to Payment', 'create-contract'],
  ]) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    const bodies = [], errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.route('**/*', async route => {
      const url = new URL(route.request().url());
      if (url.origin === base) {
        if (url.pathname === '/__notes-test') return route.fulfill({ contentType: 'text/html', body: `<!doctype html><html><body><div id="root"></div><script type="module">
          import RefreshRuntime from '/@react-refresh'; RefreshRuntime.injectIntoGlobalHook(window); window.$RefreshReg$ = () => {}; window.$RefreshSig$ = () => type => type; window.__vite_plugin_react_preamble_installed__ = true;
          window.__bookingType = '${type}'; await import('/.booking-notes-browser-entry.tsx');
        </script></body></html>` });
        return route.continue();
      }
      if (url.host === 'fixture.invalid' && url.pathname.includes('/functions/v1/')) {
        const body = route.request().postDataJSON(); bodies.push(body);
        let data = {};
        if (body.action === 'get-available-slots') data = { slots: ['10:00'] };
        else if (body.action === 'capture-abandoned-cart') data = { cartId: 'fixture-cart' };
        else if (body.action === 'create-booking') data = { success: true, booking: { id: 'fixture-booking' } };
        else if (body.action === 'create-contract') data = { success: true, contract: { id: 'fixture-contract' } };
        else if (body.action === 'create-checkout-link' || body.action === 'create-payment-link') data = { checkoutUrl: `${base}/__finished` };
        return route.fulfill({ contentType: 'application/json', headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify(data) });
      }
      return route.abort();
    });
    await page.goto(`${base}/__notes-test`);
    await page.getByRole('button', { name: 'Go to next month' }).click({ timeout: 10000 }).catch(async e => { console.error({ errors, text: await page.locator('body').innerText() }); throw e; });
    await page.locator('button[name="day"]:not([disabled])').filter({ hasText: /^15$/ }).first().click();
    await page.locator('#booking button').filter({ hasText: /10:00|1:00|5:00|6:00/ }).first().click();
    await page.locator('#name').fill('Fixture Person');
    await page.locator('#email').fill('fixture@example.invalid');
    await page.locator('#phone').fill('5551234567');
    const field = page.getByLabel('What would you like Matt to know? (optional)');
    await field.fill(notes);
    assert.equal(await field.getAttribute('maxlength'), '5000');
    assert.equal(await field.getAttribute('data-clarity-mask'), 'true');
    assert.equal(await field.getAttribute('aria-describedby'), 'client-notes-help');
    // Back/time/details navigation must retain the draft.
    await page.getByRole('button', { name: '← Back', exact: true }).click();
    await page.locator('#booking button').filter({ hasText: /10:00|1:00|5:00|6:00/ }).first().click();
    assert.equal(await field.inputValue(), notes);
    await page.getByRole('button', { name: label, exact: true }).click();
    if (type === 'readiness-intensive') {
      await page.locator('#fri-signer-name').fill('Fixture Person');
      await page.locator('#fri-agreement-accepted').click();
      await page.getByRole('button', { name: 'Continue to Payment', exact: true }).click();
    }
    if (type !== 'consultation') await page.getByRole('button', { name: 'Continue to Square Checkout', exact: true }).click();
    await page.waitForFunction(() => document.body.textContent.includes('Consultation Booked!') || location.pathname === '/__finished');
    const creation = bodies.find(b => b.action === action);
    assert.equal(creation?.clientNotes, notes, `${type} request lost notes`);
    for (const body of bodies.filter(b => b !== creation)) assert.ok(!JSON.stringify(body).includes(JSON.stringify(notes).slice(1, -1)), 'notes leaked into non-creation request');
    assert.ok(!await page.evaluate(() => JSON.stringify({ ...sessionStorage }).includes('Private browser fixture')), 'notes persisted in browser storage');
    assert.deepEqual(errors, []);
    if (type === 'consultation') {
      await page.getByRole('button', { name: 'Book Another Session' }).click();
      await page.getByRole('button', { name: /Free Consultation/ }).click();
      await page.getByRole('button', { name: 'Go to next month' }).click({ timeout: 10000 }).catch(async e => { console.error({ errors, text: await page.locator('body').innerText() }); throw e; });
      await page.locator('button[name="day"]:not([disabled])').filter({ hasText: /^15$/ }).first().click();
      await page.locator('#booking button').filter({ hasText: /10:00|1:00|5:00|6:00/ }).first().click();
      assert.equal(await field.inputValue(), '', 'Book Another Session did not clear notes');
    }
    await context.close(); tests++;
    console.log(`PASS rendered mobile ${type}: draft retention, payload, privacy${type === 'consultation' ? ', reset' : ''}`);
  }
} finally { await browser.close(); unlinkSync(entry); }
console.log(`${tests} real-component browser paths passed; network IO mocked.`);
