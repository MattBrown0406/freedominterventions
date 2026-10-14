// Executes the actual Reschedule callback (not a rendered/browser test).
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const source = readFileSync(new URL('../src/pages/Reschedule.tsx', import.meta.url), 'utf8');
const callback = source.match(/const handleReschedule = async \(\) => \{([\s\S]*?)\n  \};/)?.[1];
assert(callback, 'actual UI callback must remain extractable');
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const execute = new AsyncFunction('booking','selectedDate','selectedTime','setLoading','supabase','email','format','getFunctionErrorMessage','setStep','toast','console', callback.replace('catch (error: unknown)', 'catch (error)'));
for (const busy of [true, false]) {
  const steps=[], successes=[], errors=[], loading=[];
  const safeError = 'Your booking has not been changed. Confirmation delivery is still in progress or needs review. Please try again later or contact us.';
  await execute({id:'synthetic'},new Date('2099-01-01'),'11:00',v=>loading.push(v),
    {functions:{invoke:async()=>busy?{data:null,error:{context:Response.json({error:safeError},{status:409})}}:{data:{success:true},error:null}}},
    'client@example.test',()=> '2099-01-01',async e=>(await e.context.json()).error,
    v=>steps.push(v),{success:v=>successes.push(v),error:v=>errors.push(v)},{error:()=>{}});
  assert.deepEqual(loading,[true,false]);
  assert.deepEqual(steps,busy?[]:['confirmation']);
  assert.equal(successes.length,busy?0:1);
  assert.deepEqual(errors,busy?[safeError]:[]);
}
console.log('PASS: actual UI callback retains selection/error on 409; success control advances');
