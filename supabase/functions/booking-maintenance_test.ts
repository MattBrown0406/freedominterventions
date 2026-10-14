import { assert, assertEquals } from 'https://deno.land/std@0.190.0/testing/asserts.ts';
import { handler as booking } from './square-booking/index.ts';
import { handler as contracts } from './contracts/index.ts';
import { handler as webhook } from './square-webhook/index.ts';
import { handler as confirmation } from './send-booking-confirmation/index.ts';
import { bookingMaintenanceGate, BOOKING_GATE_BUILD } from './_shared/bookingMaintenance.ts';

Deno.env.set('SUPABASE_SERVICE_ROLE_KEY', 'test-service');
Deno.env.set('SQUARE_WEBHOOK_SIGNATURE_KEY', 'test-signature');
Deno.env.set('SQUARE_WEBHOOK_NOTIFICATION_URL', 'https://test.invalid/hook');
const handlers: Record<string, (req: Request, factory: any) => Promise<Response>> = { booking, contracts, webhook, confirmation };
function request(body: unknown = {}, auth = true) {
  return new Request('https://test.invalid', { method:'POST',
    headers: auth ? { authorization:'Bearer test-service' } : {}, body:JSON.stringify(body) });
}
async function signed(body = '{}') {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode('test-signature'),
    {name:'HMAC',hash:'SHA-256'},false,['sign']);
  const sig = await crypto.subtle.sign('HMAC',key,new TextEncoder().encode('https://test.invalid/hook'+body));
  return new Request('https://test.invalid',{method:'POST',body,
    headers:{'x-square-hmacsha256-signature':btoa(String.fromCharCode(...new Uint8Array(sig)))}});
}
function db(result: any = {data:{enabled:true},error:null}) {
  const calls: unknown[] = [];
  const q: any = {
    select(v: unknown){calls.push(['select',v]);return q},
    eq(k: unknown,v: unknown){calls.push(['eq',k,v]);return q},
    abortSignal(s: AbortSignal){assert(s instanceof AbortSignal);return q},
    single(){return Promise.resolve(result)},
  };
  return {calls, factory: (()=>({from(t: string){calls.push(['from',t]);assertEquals(t,'booking_maintenance_control');return q}})) as any};
}
for (const [name, handler] of Object.entries(handlers)) {
  for (const mode of ['hold','error','missing','malformed','throw']) {
    Deno.test(`${name}: ${mode} blocks before ALL business/provider IO`, async()=>{
      const test = db(mode==='hold'?{data:{enabled:true},error:null}:mode==='error'?{data:{enabled:false},error:{message:'private'}}:
        mode==='missing'?{data:null,error:null}:{data:{enabled:'false'},error:null});
      let effects = 0;
      const oldFetch = globalThis.fetch;
      globalThis.fetch = (()=>{effects++;throw new Error('provider forbidden')}) as any;
      try {
        const factory = mode==='throw'?(()=>{throw new Error('private credentials')}) as any:test.factory;
        const r = await handler(name==='webhook'?await signed():request({action:'fulfill-paid-booking',maintenance:false}),factory);
        assertEquals(r.status,503); assertEquals(r.headers.get('Retry-After'),'60');
        assertEquals(r.headers.get('X-Booking-Gate-Build'),BOOKING_GATE_BUILD);
        assertEquals((await r.json()).code,'BOOKING_MAINTENANCE');assertEquals(effects,0);
        if(mode!=='throw') assertEquals(test.calls,[['from','booking_maintenance_control'],['select','enabled'],['eq','id',true]]);
      } finally {globalThis.fetch=oldFetch;}
    });
  }
  Deno.test(`${name}: OPTIONS has version and no DB/provider IO`,async()=>{
    const r=await handler(new Request('https://test.invalid',{method:'OPTIONS'}),(()=>{throw Error('DB forbidden')}) as any);
    assertEquals(r.status,200); assertEquals(r.headers.get('X-Booking-Gate-Build'),BOOKING_GATE_BUILD);
  });
}
Deno.test('webhook: rejects invalid or missing signature BEFORE gate',async()=>{
  const r=await webhook(request(),(()=>{throw Error('must not read DB')}) as any); assertEquals(r.status,401);
});
Deno.test('confirmation: service authorization remains BEFORE gate',async()=>{
  const r=await confirmation(request({},false),(()=>{throw Error('must not read DB')}) as any); assertEquals(r.status,401);
});
Deno.test('webhook: signed ignored event is 503 held, 200 open; fresh read each time',async()=>{
  const result={data:{enabled:true},error:null};const test=db(result);
  assertEquals((await webhook(await signed(),test.factory)).status,503);
  result.data.enabled=false;
  assertEquals((await webhook(await signed(),test.factory)).status,200);
  result.data.enabled=true;
  assertEquals((await webhook(await signed(),test.factory)).status,503);
  assertEquals(test.calls.length,9);
});
Deno.test('open gate permits explicit false only',async()=>{
  assertEquals(await bookingMaintenanceGate(db({data:{enabled:false},error:null}).factory,{}),null);
});
Deno.test('stalled database read is aborted and returns 503',async()=>{
  let signal: AbortSignal|undefined;
  const q:any={select(){return q},eq(){return q},abortSignal(s:AbortSignal){signal=s;return q},single(){return new Promise(()=>{})}};
  const r=await bookingMaintenanceGate(()=>({from:()=>q}),{});
  assertEquals(r?.status,503);assertEquals(signal?.aborted,true);
});
Deno.test('all declared booking/contract actions held (including future/unknown actions)',async()=>{
  for (const [name,handler] of [['square-booking',booking],['contracts',contracts]] as const) {
    const source=await Deno.readTextFile(new URL(`./${name}/index.ts`,import.meta.url));
    const actions=[...source.matchAll(/case ['"]([^'"]+)['"]:/g)].map(x=>x[1]);assert(actions.length>0);
    for(const action of [...actions,'future-action']) {
      const r=await handler(request({action}),db().factory);assertEquals(r.status,503,action);
    }
  }
});
Deno.test('gate is admission control, not cancellation of an already admitted request',async()=>{
  const result={data:{enabled:false},error:null};const test=db(result);
  assertEquals(await bookingMaintenanceGate(test.factory,{}),null);
  result.data.enabled=true;
  // The previous admission remains granted; only the next admission is denied.
  assertEquals((await bookingMaintenanceGate(test.factory,{}))?.status,503);
});
