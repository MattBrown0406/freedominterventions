// Render the actual BookingCalendar in each summary state without any effects or IO.
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import ts from 'typescript';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const source = process.env.AUDIT_BASELINE_REF ? execFileSync('git',['show',`${process.env.AUDIT_BASELINE_REF}:src/components/BookingCalendar.tsx`],{encoding:'utf8'}) : fs.readFileSync(new URL('../src/components/BookingCalendar.tsx',import.meta.url),'utf8');
const timeJs = ts.transpileModule(fs.readFileSync(new URL('../src/lib/bookingTime.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const timeModule={exports:{}};new Function('exports',timeJs)(timeModule.exports);
const transformer = context => root => {
 const visit=node=>{
  if(ts.isVariableDeclaration(node)&&ts.isArrayBindingPattern(node.name)&&node.initializer&&ts.isCallExpression(node.initializer)&&node.initializer.expression.getText()==='useState') {
   return ts.factory.updateVariableDeclaration(node,node.name,node.exclamationToken,node.type,ts.factory.createCallExpression(ts.factory.createIdentifier('__state'),undefined,[ts.factory.createStringLiteral(node.name.elements[0].name.getText()),...node.initializer.arguments]));
  }
  return ts.visitEachChild(node,visit,context);
 };return ts.visitNode(root,visit);
};
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022},transformers:{before:[transformer]}}).outputText;
let overrides;
const mocks = id => {
 if(id==='react-router-dom')return {useLocation:()=>({key:'test',hash:'',search:''})};
 if(id==='@/lib/bookingTime')return timeModule.exports;
 if(id==='@/integrations/supabase/client')return {supabase:{functions:{invoke(){throw Error('No IO allowed')}}}};
 if(id==='@/lib/funnelAttribution')return {getFunnelAttribution:()=>({})};
 if(id==='@/lib/analytics')return {trackEvent(){throw Error('No tracking allowed')}};
 if(id==='@/components/ResponsePromise')return {RESPONSE_PROMISE:''};
 if(id==='@/components/BookingNextSteps')return {PrepChecklist:()=>null};
 if(id.startsWith('@/components/ui/'))return new Proxy({}, {get:()=>({children})=>React.createElement('div',null,children)});
 return require(id);
};
const module={exports:{}};
new Function('require','exports','__state',compiled)(mocks,module.exports,(name,value)=>React.useState(Object.hasOwn(overrides,name)?overrides[name]:value));
for(const step of ['details','agreement','payment','confirmation']) {
 overrides={bookingType:'readiness-intensive',selectedDate:new Date(2026,10,10),selectedTime:'16:00',step,customerInfo:{name:'Synthetic',email:'synthetic@example.invalid',phone:''}};
 const html=renderToStaticMarkup(React.createElement(module.exports.BookingCalendar,{}));
 assert.match(html,/Your appointment:/);assert.match(html,/Nov 11, 2026, 12:00 AM UTC/);assert.match(html,/Provider time:/);assert.match(html,/Nov 10, 2026, 4:00 PM PST/);
 console.log(`PASS actual summary renderer: ${step}`);
}
for (const paymentIssue of ['reschedule','review']) {
 overrides={bookingType:'readiness-intensive',selectedDate:new Date(2026,10,10),selectedTime:'16:00',step:'confirmation',paymentIssue,bookingId:'synthetic'};
 const html=renderToStaticMarkup(React.createElement(module.exports.BookingCalendar,{}));
 assert.match(html,/Do not pay again/); assert.match(html,/not confirmed/);
 assert.doesNotMatch(html,/Booking Confirmed|Your appointment:|Book Another Session|Continue to Square|Before your appointment/);
 console.log(`PASS actual payment safety renderer: ${paymentIssue}`);
}
