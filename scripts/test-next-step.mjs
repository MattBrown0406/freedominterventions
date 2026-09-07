// Run against Vite or a production preview: node scripts/test-next-step.mjs [URL]
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const base = process.argv[2] || 'http://127.0.0.1:4311';
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const cases = [
  ['Understanding options', ['Compare kinds of support', 'Choose one manageable first step'], 'Understand the options without deciding everything today'],
  ['Preparing a family conversation', ['Finding words that do not blame', 'Setting a boundary I can keep'], 'Prepare a conversation built on care and clear limits'],
  ['Immediate concern', ['Emergency and crisis steps', 'Support after urgent help is arranged'], 'Put immediate safety ahead of planning'],
];
let count = 0;
try {
  for (const width of [320, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, acceptDownloads: true });
    const page = await context.newPage();
    const requests = [], errors = [];
    page.on('request', r => requests.push({ url: r.url(), method: r.method() }));
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(`${base}/next-step`);
    await page.locator('#step-heading').waitFor();
    for (const [path, choices, title] of cases) {
      for (const choice of choices) {
        await page.getByRole('button', { name: path, exact: false }).click();
        assert.equal(await page.locator('#step-heading').evaluate(e => e === document.activeElement), true);
        await page.getByRole('button', { name: choice, exact: false }).click();
        assert.equal(await page.locator('#step-heading').innerText(), title);
        assert.equal(await page.locator('.next-step-card li').count(), 3);
        const tailored = await page.locator('.next-step-card h3').first().evaluate(e => e.nextElementSibling.textContent);
        const pending = page.waitForEvent('download');
        await page.getByRole('button', { name: 'Download text guide' }).click();
        const download = await pending;
        const text = await readFile(await download.path(), 'utf8');
        assert.equal(download.suggestedFilename(), 'my-next-step-guide.txt');
        for (const snippet of [title, tailored, '911', '988', 'https://freedominterventions.com/contact']) assert.ok(text.includes(snippet));
        for (const li of await page.locator('.next-step-card li').allTextContents()) assert.ok(text.includes(li));
        assert.equal(await page.getByRole('link', { name: 'Contact Matt — opens contact form' }).getAttribute('href'), '/contact');
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
        await page.getByRole('button', { name: 'Back', exact: true }).click();
        assert.equal(await page.locator('.next-step-card ol').count(), 0);
        await page.getByRole('button', { name: 'Back', exact: true }).click();
        assert.equal(await page.locator('#step-heading').innerText(), 'Where would you like to start?');
        await page.getByRole('button', { name: path, exact: false }).click();
        await page.getByRole('button', { name: choice, exact: false }).click();
        await page.getByRole('button', { name: 'Reset choices' }).click();
        assert.equal(await page.locator('.next-step-card ol').count(), 0);
        assert.ok((await page.getByRole('status').innerText()).includes('Choices cleared'));
        count++;
      }
    }
    await page.getByRole('button', { name: 'Understanding options' }).focus();
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('.next-step-card ol').count(), 1);
    await page.reload();
    assert.equal(await page.locator('#step-heading').innerText(), 'Where would you like to start?');
    assert.deepEqual(await page.evaluate(() => ({ local: { ...localStorage }, session: { ...sessionStorage }, cookie: document.cookie })), { local: {}, session: {}, cookie: '' });
    assert.ok(requests.every(r => r.method === 'GET'));
    assert.ok(!requests.some(r => /clarity|google-analytics|googletagmanager|supabase|facebook|doubleclick/i.test(r.url)));
    assert.equal(page.url(), `${base}/next-step`);
    assert.deepEqual(errors, []);
    for (const href of ['tel:911', 'tel:988', 'sms:988']) assert.equal(await page.locator(`a[href="${href}"]`).count(), 1);
    await context.close();
  }
  const context = await browser.newContext();
  // Keep unrelated homepage integrations offline; record their attempted loading.
  await context.route('**/*', route => route.request().url().startsWith(base) ? route.continue() : route.abort());
  const page = await context.newPage();
  await page.goto(base);
  const entry = page.getByRole('link', { name: 'Make a plan for your next step', exact: true });
  await entry.waitFor();
  await page.evaluate(() => { window.__oldDocument = true; });
  await entry.click();
  await page.locator('#step-heading').waitFor();
  assert.equal(await page.evaluate(() => window.__oldDocument), undefined);
  await page.getByRole('button', { name: 'Understanding options' }).click();
  await page.getByRole('button', { name: 'Compare kinds of support' }).click();
  await page.getByRole('link', { name: 'Return to Freedom Interventions' }).click();
  await page.goBack();
  assert.equal(await page.locator('#step-heading').innerText(), 'Where would you like to start?');
  await context.close();
  console.log(JSON.stringify({ passed: true, choiceViewportCases: count, widths: [320, 1440], gates: ['six choices', 'downloads match rendered steps', 'back/reset', 'keyboard/focus', 'reload', 'storage/network privacy', 'emergency links', 'homepage hard navigation', 'history return reset', 'mobile overflow'], base }));
} finally { await browser.close(); }
