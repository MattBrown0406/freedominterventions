import { chromium } from '@playwright/test';
import fs from 'node:fs';
const base=process.env.QA_BASE || 'http://127.0.0.1:4387';
const routes=['/oregon','/washington','/portland-oregon','/bend-oregon','/eugene-oregon','/salem-oregon','/seattle-washington','/tacoma-washington','/vancouver-washington','/spokane-washington','/service-areas'];
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const results=[];
try {
 for(const width of [320,1280]) for(const route of routes){
  const page=await browser.newPage({viewport:{width,height:900}});
  await page.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin && ['GET','HEAD'].includes(r.request().method()) ? r.continue():r.abort());
  await page.goto(base+route); await page.locator('main h1').waitFor();
  await page.waitForTimeout(300);
  const data=await page.evaluate(()=>({title:document.title,description:document.querySelector('meta[name="description"]')?.content,canonical:[...document.querySelectorAll('link[rel="canonical"]')].map(e=>e.href),robots:[...document.querySelectorAll('meta[name="robots"]')].map(e=>e.content),h1:[...document.querySelectorAll('main h1')].map(e=>e.textContent.trim()),schema:[...document.querySelectorAll('script[type="application/ld+json"]')].map(e=>JSON.parse(e.textContent)),links:[...document.querySelectorAll('main a')].map(a=>({text:a.innerText,href:a.getAttribute('href'),height:a.getBoundingClientRect().height})),overflow:document.documentElement.scrollWidth>innerWidth+1,text:document.querySelector('main')?.innerText}));
  results.push({route,width,...data});
  fs.writeFileSync(process.env.QA_OUTPUT||'/root/seo-regional-or-wa/fi-routes.json',JSON.stringify(results,null,2));
  await page.close();
 }
 const page=await browser.newPage({viewport:{width:320,height:900}});
 await page.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin && ['GET','HEAD'].includes(r.request().method())?r.continue():r.abort());
 await page.goto(base+'/book-intervention-consultation?type=consultation#booking');
 await page.locator('#booking').waitFor();
 await page.waitForTimeout(1000);
 results.push({route:'booking',width:320,text:await page.locator('#booking').innerText(),overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1)});
 fs.writeFileSync(process.env.QA_OUTPUT||'/root/seo-regional-or-wa/fi-routes.json',JSON.stringify(results,null,2));
} finally {await browser.close();}
const failures=results.filter(x=>x.overflow||x.route!=='booking'&&(x.h1.length!==1||x.canonical.length!==1||x.canonical[0]!=='https://freedominterventions.com'+x.route));
console.log(JSON.stringify({checks:results.length,failures:failures.map(x=>({route:x.route,width:x.width,overflow:x.overflow,h1:x.h1,canonical:x.canonical}))}));
process.exitCode=failures.length?1:0;
