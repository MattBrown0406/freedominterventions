import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { chromium } from 'playwright';
const origin = process.env.SEO_TEST_ORIGIN || 'http://127.0.0.1:4288';
const states = ['oregon','washington','idaho','california','nevada','arizona','utah'];
const cities = ['portland-oregon','bend-oregon','spokane-washington','boise-idaho'];
const paths = [...states,...cities];
const browser = await chromium.launch({headless:true});
const context = await browser.newContext();
// Do not contact analytics, forms, booking providers or any other live API.
await context.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
const page = await context.newPage();
const results=[];
try {
 const sitemap=await readFile('public/sitemap.xml','utf8');
 for(const path of paths) assert(sitemap.includes(`https://freedominterventions.com/${path}</loc>`),`missing sitemap ${path}`);
 await page.goto(`${origin}/interventionist`);
 const nav=page.getByRole('navigation',{name:'Western US intervention service areas',exact:true});
 await nav.waitFor();
 assert.equal(await nav.locator('a').count(),12);
 for (const path of paths) assert.equal(await nav.locator(`a[href="/${path}"]`).count(),1,`incoming ${path}`);
 for(const width of [390,768,1280]){
  await page.setViewportSize({width,height:900});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),`overflow ${width}`);
 }
 for(const path of paths){
  await page.goto(`${origin}/interventionist`);
  await page.getByRole('navigation',{name:'Western US intervention service areas',exact:true}).locator(`a[href="/${path}"]`).click();
  await page.waitForURL(`${origin}/${path}`);
  await page.waitForFunction(path=>document.querySelector('link[rel="canonical"]')?.href===`https://freedominterventions.com/${path}`,path);
  assert.equal(await page.locator('link[rel="canonical"]').count(),1,`${path} canonical count`);
  assert.equal(await page.locator('meta[name="robots"]').count(),1,`${path} robots count`);
  assert.equal(await page.locator('meta[property="og:url"]').getAttribute('content'),`https://freedominterventions.com/${path}`);
  assert.equal(await page.locator('h1').count(),1,path);
  assert(!/Page Not Found|404 Not Found/.test(await page.locator('body').innerText()),path);
  const robots=await page.locator('meta[name="robots"]').getAttribute('content');assert(!robots?.includes('noindex'),path);
  const title=await page.title();assert(title.toLowerCase().includes(path.split('-')[0]),`${path}: ${title}`);
  for(const text of await page.locator('script[type="application/ld+json"]').allTextContents()) JSON.parse(text);
  assert(await page.locator('a[href^="tel:"]').count()>0,path);
  const book=page.locator('a[href="/book-intervention-consultation#booking"]').first();
  if(await book.count()) {await book.click();await page.waitForURL(`${origin}/book-intervention-consultation#booking`);}
  results.push({path,title,canonical:true,h1:1,indexable:true,schemaParsed:true,phonePresent:true});
 }
 console.log(JSON.stringify({passed:true,navLinks:12,stateCount:7,viewportWidths:[390,768,1280],externalNetwork:'blocked; no form submissions',results},null,2));
} finally {await browser.close();}
