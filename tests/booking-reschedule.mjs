import ts from 'typescript';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const source=fs.readFileSync(new URL('../src/pages/Reschedule.tsx',import.meta.url),'utf8');
const tree=ts.createSourceFile('Reschedule.tsx',source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);let handler;
function visit(n){if(ts.isVariableDeclaration(n)&&n.name.getText(tree)==='handleReschedule')handler=n.initializer.getText(tree);ts.forEachChild(n,visit);}visit(tree);assert(handler);
const code=ts.transpileModule('const action='+handler+';return action;', {compilerOptions:{target:ts.ScriptTarget.ES2022}}).outputText;
for(const outcome of ['409','partial','ok','malformed']){
 const changes=[],notes=[];
 const result=outcome==='409'?{data:null,error:{context:new Response(JSON.stringify({error:'BOOKING_DISPATCH_BUSY'}),{status:409})}}:{data:outcome==='malformed'?{}:{success:true,confirmationError:outcome==='partial'},error:null};
 const action=new Function('supabase','booking','selectedDate','selectedTime','email','format','setLoading','setStep','setConfirmationFailed','toast','getFunctionErrorMessage',code)(
  {functions:{invoke:async()=>result}}, {id:'synthetic'},new Date(2099,0,1),'10:00','test@example.invalid',()=> '2099-01-01',()=>{},x=>changes.push(x),x=>changes.push(x),{success:x=>notes.push(x),error:x=>notes.push(x)},async e=>(await e.context.json()).error);
 await action();
 if(outcome==='409'||outcome==='malformed')assert.deepEqual(changes,[]);
 else assert.deepEqual(changes,[outcome==='partial','confirmation']);
 console.log('PASS actual reschedule handler '+outcome);
}
