// Production-preview regression: raw HTML, isolated initial fallback, hydration, SPA ownership.
// Run after npm run build. External requests are blocked; no forms or call links are activated.
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir, mkdtemp, cp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawn, execFileSync } from 'node:child_process';
import { chromium } from 'playwright';
import { pageFallbackSources, pageFallbackMetadata } from './page-fallback.mjs';
import { fitSeoTitle, fitSeoDescription } from './helmet-markup.mjs';
import { excludedSitemapRoutes } from './seo-routes.mjs';
const port = process.env.SEO_TEST_PORT || '4493';
const origin = `http://127.0.0.1:${port}`;
const site = 'https://freedominterventions.com';
const artifacts = process.env.SEO_TEST_ARTIFACTS;
const expected = {};
for (const [route, file] of Object.entries(pageFallbackSources)) {
  const source = await readFile(file, 'utf8');
  const m = pageFallbackMetadata(source, route);
  expected[route] = { ...m, title: fitSeoTitle(m.title), description: fitSeoDescription(m.description) };
  assert.throws(() => pageFallbackMetadata(source.replace('<SEOHead', '<RemovedSEOHead'), route));
}
assert.equal(Object.keys(expected).length, 3);
assert(excludedSitemapRoutes.has('/next-step'));
const fixture = await mkdtemp(path.join(tmpdir(), 'fi-initial-seo-'));
const results = { initial: [], raw: [], hydrated: [], spa: [], sitemaps: [], privateRequests: [] };
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', port, '--strictPort'], { stdio: 'ignore' });
let browser;
function inspectDOM() {
  const values = selector => [...document.head.querySelectorAll(selector)].map(e => e.content || e.href || e.textContent);
  return {
    title: values('title'), description: values('meta[name="description"]'), canonical: values('link[rel="canonical"]'), robots: values('meta[name="robots"]'),
    ogTitle: values('meta[property="og:title"]'), ogDescription: values('meta[property="og:description"]'), ogUrl: values('meta[property="og:url"]'),
    twitterTitle: values('meta[name="twitter:title"]'), twitterDescription: values('meta[name="twitter:description"]'),
    h1: [...document.querySelectorAll('h1')].map(e => e.textContent.trim()),
    schemas: [...document.querySelectorAll('script[type="application/ld+json"]')].map(e => JSON.parse(e.textContent)),
    overflow: document.documentElement.scrollWidth > innerWidth,
    links: [...document.querySelectorAll('a[href]')].map(e => e.getAttribute('href')),
  };
}
function check(route, value, hydrated = false) {
  const m = expected[route];
  if (m) {
    for (const key of ['title', 'ogTitle', 'twitterTitle']) assert.deepEqual(value[key], [m.title], `${route}: ${key}`);
    for (const key of ['description', 'ogDescription', 'twitterDescription']) assert.deepEqual(value[key], [m.description], `${route}: ${key}`);
    assert(value.h1.includes(m.heading), `${route}: approved H1`);
    if (hydrated) assert.equal(value.h1.length, 1);
    assert.equal(value.robots.length, 1); assert(!value.robots[0].includes('noindex'));
  } else if (route === '/next-step') {
    assert.deepEqual(value.robots, ['noindex, follow']);
    assert.deepEqual(value.title, ['Not ready to call? | Freedom Interventions']);
  }
  assert.deepEqual(value.canonical, [site + route]);
  if (m || route === '/next-step') assert.deepEqual(value.ogUrl, [site + route]);
  const serialized = JSON.stringify(value.schemas);
  for (const fake of ['"name":"Intervention Toolkit"', '"name":"How Intervention Works"']) assert(!serialized.includes(fake), 'No fabricated location schema');
  const nodes = value.schemas.flatMap(s => s['@graph'] || [s]);
  assert.equal(nodes.filter(s => s['@id'] === site + '/#organization').length, 1, 'One organization owner');
}
try {
  for (let i = 0; i < 100; i++) {
    if (server.exitCode !== null) throw new Error('Preview failed (port occupied?)');
    try { if ((await fetch(origin)).ok) break; } catch { /* readiness */ }
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROME_PATH, args: ['--no-sandbox'] });
  const parserContext = await browser.newContext({ javaScriptEnabled: false });
  await parserContext.route('**/*', route => route.abort());
  const parser = await parserContext.newPage();
  // An isolated real generator run checks pre-hydration output even after prerender rewrites dist.
  for (const f of ['scripts/generate-static-fallbacks.mjs', 'scripts/helmet-markup.mjs', 'scripts/seo-routes.mjs', 'scripts/answer-fallback.mjs', 'scripts/page-fallback.mjs', 'src/App.tsx', 'src/data/interventionAnswers.ts', ...Object.values(pageFallbackSources)]) {
    await mkdir(path.dirname(path.join(fixture, f)), { recursive: true }); await cp(f, path.join(fixture, f));
  }
  await mkdir(path.join(fixture, 'dist')); await cp('index.html', path.join(fixture, 'dist/index.html'));
  if (process.env.SEO_TEST_BASELINE) {
    await writeFile(path.join(fixture, 'scripts/generate-static-fallbacks.mjs'), execFileSync('git', ['show', `${process.env.SEO_TEST_BASELINE}:scripts/generate-static-fallbacks.mjs`]));
  }
  execFileSync(process.execPath, [path.join(fixture, 'scripts/generate-static-fallbacks.mjs')]);
  const routes = [...Object.keys(expected), '/next-step'];
  for (const route of routes) {
    for (const suffix of [route + '.html', route + '/index.html']) {
      const html = await readFile(path.join(fixture, 'dist', suffix), 'utf8');
      await parser.setContent(html); const value = await parser.evaluate(inspectDOM); check(route, value);
      results.initial.push({ route, suffix, ...value });
    }
    const response = await fetch(origin + route); assert.equal(response.status, 200);
    await parser.setContent(await response.text()); const value = await parser.evaluate(inspectDOM); check(route, value);
    results.raw.push({ route, status: response.status, ...value });
  }
  for (const resource of ['sitemap.xml', 'post-sitemap.xml']) {
    const response = await fetch(origin + '/' + resource); assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /xml/);
    const xml = await response.text();
    const parsed = await parser.evaluate(xml => {
      const doc = new DOMParser().parseFromString(xml, 'application/xml');
      return { error: !!doc.querySelector('parsererror'), type: doc.documentElement.localName, urls: [...doc.querySelectorAll('loc')].map(e => e.textContent) };
    }, xml);
    assert(!parsed.error); assert.equal(parsed.urls.length, new Set(parsed.urls).size);
    assert(!parsed.urls.includes(site + '/next-step'));
    if (resource === 'post-sitemap.xml') assert.deepEqual(parsed.urls, [site + '/sitemap.xml']);
    for (const folder of ['public', 'dist']) assert.equal(await readFile(`${folder}/${resource}`, 'utf8'), xml);
    results.sitemaps.push({ resource, ...parsed });
  }
  await parserContext.close();
  for (const width of [390, 1280]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    await context.route('**/*', route => route.request().url().startsWith(origin) ? route.continue() : route.abort());
    const page = await context.newPage(); const errors = []; page.on('pageerror', e => errors.push(e.message));
    for (const route of routes) {
      const requests = []; const capture = request => requests.push(request.url()); page.on('request', capture);
      await page.goto(origin + route + '?source=local-seo-check');
      await page.locator('h1').first().waitFor(); await page.waitForTimeout(700);
      const value = await page.evaluate(inspectDOM); check(route, value, true); assert(!value.overflow, `${route}: overflow at ${width}`);
      assert(value.links.length > 0); assert.deepEqual(errors, []);
      if (route === '/next-step') {
        assert.equal(await page.locator('form').count(), 0);
        assert(requests.every(url => url.startsWith(origin)), 'Guide requests must stay on origin');
        assert(!requests.some(url => /supabase|analytics|clarity|tawk/i.test(url)));
        results.privateRequests.push({ width, requests });
      }
      page.off('request', capture); results.hydrated.push({ width, route, ...value });
    }
    // Exercise actual React-router navigation; no reload or metadata mocks.
    await page.goto(origin + '/intervention-toolkit'); await page.locator('h1').waitFor();
    for (const route of ['/service-areas', '/how-intervention-works', '/intervention-toolkit']) {
      await page.evaluate(route => { history.pushState({}, '', route); dispatchEvent(new PopStateEvent('popstate')); }, route);
      await page.waitForFunction(title => document.title === title, expected[route].title); await page.waitForTimeout(250);
      const value = await page.evaluate(inspectDOM); check(route, value, true); results.spa.push({ width, route, ...value });
    }
    await context.close();
  }
  if (artifacts) { await mkdir(artifacts, { recursive: true }); await writeFile(path.join(artifacts, 'metadata-regression.json'), JSON.stringify(results, null, 2)); }
  console.log(JSON.stringify({ passed: true, initialVariants: results.initial.length, rawRoutes: results.raw.length, viewportCases: results.hydrated.length, spaCases: results.spa.length, sitemapCounts: results.sitemaps.map(s => ({ file: s.resource, urls: s.urls.length })) }));
} finally { await browser?.close(); server.kill(); await rm(fixture, { recursive: true, force: true }); }
