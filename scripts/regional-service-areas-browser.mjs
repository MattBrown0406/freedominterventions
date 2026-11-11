import { chromium } from '@playwright/test';
import fs from 'node:fs';
const base=process.env.QA_BASE || 'http://127.0.0.1:4387';
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_BIN || chromium.executablePath(),args:['--no-sandbox']});
const results=[];
try {
 for (const width of [320,390,768,1280]) {
  const page=await browser.newPage({viewport:{width,height:900}});
  await page.route('**/*',route=>new URL(route.request().url()).origin===new URL(base).origin && ['GET','HEAD'].includes(route.request().method()) ? route.continue():route.abort());
  await page.goto(base+'/service-areas');
  await page.locator('main h1').waitFor();
  const before=await page.evaluate(()=>({title:document.title,canonical:document.querySelector('link[rel="canonical"]')?.getAttribute('href'),h1:[...document.querySelectorAll('main h1')].map(e=>e.textContent.trim()),schema:[...document.querySelectorAll('script[type="application/ld+json"]')].map(e=>JSON.parse(e.textContent)),links:[...document.querySelectorAll('main a')].map(a=>a.getAttribute('href')),overflow:document.documentElement.scrollWidth>innerWidth+1}));
  for (const [term,slug] of [['Portland','portland-oregon'],['Bend','bend-oregon'],['Eugene','eugene-oregon'],['Salem','salem-oregon'],['Seattle','seattle-washington'],['Tacoma','tacoma-washington'],['Vancouver','vancouver-washington'],['Spokane','spokane-washington'],[' Oregon ','oregon'],['Washington','washington'],['Ontario','ontario']]) {
   await page.locator('input').fill(term);
   const visible=await page.locator(`main a[href="/${slug}"]`).first().isVisible();
   results.push({width,term,visible,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1)});
  }
  await page.locator('input').fill('not-a-real-area-xyz');
  results.push({width,test:'no-results',pass:await page.getByText('No locations found matching').isVisible()});
  await page.locator('input').fill('');
  results.push({width,test:'empty-state-restored',pass:await page.locator('main a[href="/oregon"]').first().isVisible(),before});
  const west=page.getByRole('button',{name:/West Coast/});
  await west.click();
  const collapsed=!(await page.locator('main a[href="/oregon"]').first().isVisible());
  await page.locator('input').fill('Seattle');
  results.push({width,test:'search-reopens-collapsed-region',pass:collapsed && await page.locator('main a[href="/seattle-washington"]').first().isVisible() && await west.getAttribute('aria-expanded')==='true'});
  await page.locator('main a[href="/seattle-washington"]').first().focus();
  await page.keyboard.press('Enter');
  await page.waitForURL('**/seattle-washington');
  await page.locator('main h1').waitFor();
  results.push({width,test:'keyboard-city-navigation',pass:(await page.locator('main h1').innerText()).includes('Seattle')});
  await page.close();
 }
} finally { await browser.close(); }
fs.writeFileSync(process.env.QA_OUTPUT || '/root/seo-regional-or-wa/fi-browser.json',JSON.stringify(results,null,2));
const failures=results.filter(r=>r.visible===false||r.pass===false||r.overflow);
console.log(JSON.stringify({checks:results.length,failures:failures.map(({before,...r})=>r)},null,2));
process.exitCode=failures.length?1:0;
