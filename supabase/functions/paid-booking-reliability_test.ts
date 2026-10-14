import { assertEquals, assert } from 'https://deno.land/std@0.190.0/testing/asserts.ts';
import { handler as webhook } from './square-webhook/index.ts';
import { handler as confirmation } from './send-booking-confirmation/index.ts';
import { handler as bookingHandler } from './square-booking/index.ts';
import { handler as contractsHandler } from './contracts/index.ts';
import { verifySquareOrderPaid } from './_shared/squarePayment.ts';

// All provider HTTP is replaced. These tests NEVER call a real provider or database.
const env = { SUPABASE_URL: 'https://test.invalid', SUPABASE_SERVICE_ROLE_KEY: 'test-service',
  SQUARE_ACCESS_TOKEN: 'test-square', SQUARE_LOCATION_ID: 'location', SQUARE_WEBHOOK_SIGNATURE_KEY: 'test-signature',
  SQUARE_WEBHOOK_NOTIFICATION_URL: 'https://test.invalid/hook', RESEND_API_KEY: 'test-resend',
  ZOOM_ACCOUNT_ID: 'test-account', ZOOM_CLIENT_ID: 'test-client', ZOOM_CLIENT_SECRET: 'test-secret' };
for (const [k,v] of Object.entries(env)) Deno.env.set(k,v);
const baseBooking = () => ({ id:'booking', square_order_id:'order', payment_id:null, amount_cents:15000, status:'pending',
  customer_name:'Test', customer_email:'client@example.test', booking_type:'crisis-coaching', booking_date:'2099-10-15',
  booking_time:'10:00:00', duration_minutes:60, notes:'Original notes', client_notes:'Client <script>\nUnicode ✓', confirmation_revision:0 });
class DB {
  tables: Record<string, any[]> = { bookings:[baseBooking()], contracts:[], booking_deliveries:[] };
  fail: ((table:string, update:any)=>boolean) | null = null;
  invoked: any[] = [];
  functions = { invoke: async (name:string, opts:any) => {
    this.invoked.push([name,opts]);
    if (['send-booking-confirmation','square-booking','contracts'].includes(name)) {
      const target: any = name === 'square-booking' ? (bookingHandler as any) : name === 'contracts' ? (contractsHandler as any) : (confirmation as any);
      const r = await target(request(opts.body), (() => this) as any);
      return { data:await r.json(), error:r.ok ? null : new Error('confirmation failed') };
    }
    return {data:{success:true},error:null};
  }};
  async rpc(name:string,p:any) {
    if (name === 'check_rate_limit') return {data:false,error:null};
    assertEquals(name,'claim_booking_delivery');
    let row=this.tables.booking_deliveries.find(x=>x.booking_id===p.p_booking_id && x.occurrence===p.p_occurrence);
    if (!row) {row={booking_id:p.p_booking_id,occurrence:p.p_occurrence,client_sent:false,owner_sent:false,creation_started:false};this.tables.booking_deliveries.push(row);}
    if(row.lease_until && Date.parse(row.lease_until)>Date.now()) return {data:null,error:null};
    Object.assign(row,{lease_token:p.p_token,lease_until:new Date(Date.now()+600000).toISOString()});
    return {data:structuredClone(row),error:null};
  }
  from(table:string) {
    const db=this; let update:any=null; let insert:any=null; const filters: ((x:any)=>boolean)[]=[]; let single=false;
    const q:any={
      select(){return q},update(v:any){update=v;return q},insert(v:any){insert=v;return q},
      contains(k:string,v:any){filters.push(x=>Object.entries(v).every(([key,val])=>x[k]?.[key]===val));return q},order(){return q},
      eq(k:string,v:any){filters.push(x=>x[k]===v);return q},is(k:string,v:any){filters.push(x=>(x[k]??null)===v);return q},
      in(k:string,v:any[]){filters.push(x=>v.includes(x[k]));return q},neq(k:string,v:any){filters.push(x=>x[k]!==v);return q},
      maybeSingle(){single=true;return q},single(){single=true;return q},
      then(resolve:any,reject:any){return Promise.resolve().then(()=>{
        if(db.fail?.(table,update)) return {data:null,error:new Error('synthetic DB failure')};
        if(insert) { const row={id:table==='bookings'?'readiness-booking':crypto.randomUUID(),confirmation_revision:0,...insert};(db.tables[table]??=[]).push(row);insert=null; }
        const rows=(db.tables[table]??[]).filter(x=>filters.every(f=>f(x)));
        if(update) rows.forEach(x=>Object.assign(x,update));
        return {data:structuredClone(single ? rows[0]??null : rows),error:null};
      }).then(resolve,reject)}
    }; return q;
  }
}
function request(body:any,auth=true) {return new Request('https://test.invalid',{method:'POST',headers:auth?{authorization:'Bearer test-service'}:{},body:JSON.stringify(body)});}
async function signed(payment:any, type='payment.updated') {
  const body=JSON.stringify({type,data:{object:{payment}}});
  const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(env.SQUARE_WEBHOOK_SIGNATURE_KEY),{name:'HMAC',hash:'SHA-256'},false,['sign']);
  const sig=await crypto.subtle.sign('HMAC',key,new TextEncoder().encode(env.SQUARE_WEBHOOK_NOTIFICATION_URL+body));
  return new Request('https://test.invalid',{method:'POST',headers:{'x-square-hmacsha256-signature':btoa(String.fromCharCode(...new Uint8Array(sig)))},body});
}
function providers() {
  const io={order:{id:'order',state:'OPEN',location_id:'location',total_money:{amount:15000,currency:'USD'},tenders:[{payment_id:'payment'}]},
    payment:{id:'payment',order_id:'order',status:'COMPLETED',location_id:'location',amount_money:{amount:15000,currency:'USD'},refunded_money:{amount:0}},
    meetings:0, emails:[] as any[], keys:new Set<string>(), failOwner:false,failClient:false,failAuth:false,failZoom:false, rejectZoom:false, failSquare:false};
  globalThis.fetch=(async (input:any,init:any={})=>{
    const url=String(input);
    if(url.includes('connect.squareup.com')) return io.failSquare ? Response.json({}, {status:503}) : Response.json(url.includes('/orders/')?{order:io.order}:{payment:io.payment});
    if(url.includes('zoom.us/oauth')) return io.failAuth ? Response.json({}, {status:401}) : Response.json({access_token:'fake-token'});
    if(url.includes('api.zoom.us') && init.method==='DELETE') return new Response(null,{status:204});
    if(url.includes('api.zoom.us')) {if(io.rejectZoom) return Response.json({}, {status:401});io.meetings++; if(io.failZoom) throw new Error('ambiguous Zoom timeout'); return Response.json({id:100+io.meetings,join_url:`https://zoom.test/${io.meetings}`});}
    if(url.includes('api.resend.com')) {
      const email=JSON.parse(init.body);const key=init.headers['Idempotency-Key'];
      if((io.failOwner&&email.to[0]==='matt@freedominterventions.com')||(io.failClient&&email.to[0]==='client@example.test')) return Response.json({}, {status:503});
      if(!io.keys.has(key)){io.keys.add(key);io.emails.push(email)}
      return Response.json({id:'email'});
    }
    throw new Error(`Unexpected HTTP ${url}`);
  }) as typeof fetch;
  return io;
}
async function runConfirm(db:DB,body:any={bookingId:'booking'}) {return await confirmation(request(body),(()=>db) as any);}

Deno.test('signed webhook fulfills without browser; replay does not duplicate Zoom/email; notes survive',async()=>{
 const db=new DB(),io=providers();
 assertEquals((await webhook(await signed(io.payment),(()=>db) as any)).status,200);
 assertEquals(db.tables.bookings[0].status,'confirmed'); assertEquals(io.meetings,1);assertEquals(io.emails.length,2);
 assert(io.emails[1].html.includes('Client &lt;script&gt;'));assert(db.tables.bookings[0].notes.includes('Original notes'));
 assertEquals((await webhook(await signed(io.payment),(()=>db) as any)).status,200);
 assertEquals(io.meetings,1);assertEquals(io.emails.length,2);
});
Deno.test('owner failure remains retryable; replay only sends missing owner',async()=>{
 const db=new DB(),io=providers();io.failOwner=true;
 assertEquals((await webhook(await signed(io.payment),(()=>db) as any)).status,500);
 assertEquals(io.emails.length,1);io.failOwner=false;
 assertEquals((await webhook(await signed(io.payment),(()=>db) as any)).status,200);
 assertEquals(io.meetings,1);assertEquals(io.emails.length,2);
});
Deno.test('client email failure keeps persisted meeting for retry',async()=>{
 const db=new DB(),io=providers();db.tables.bookings[0].status='confirmed';io.failClient=true;
 assertEquals((await runConfirm(db)).status,500);io.failClient=false;
 assertEquals((await runConfirm(db)).status,200);assertEquals(io.meetings,1);assertEquals(io.emails.length,2);
});
Deno.test('DB failure after successful send retries stable provider key',async()=>{
 const db=new DB(),io=providers();db.tables.bookings[0].status='confirmed';
 db.fail=(t,u)=>t==='booking_deliveries'&&u?.client_sent===true;
 assertEquals((await runConfirm(db)).status,500);assertEquals(io.emails.length,1);db.fail=null;
 assertEquals((await runConfirm(db)).status,200);assertEquals(io.emails.length,2);assertEquals(io.meetings,1);
});
Deno.test('DB failure storing Zoom requires reconciliation, never a duplicate meeting',async()=>{
 const db=new DB(),io=providers();db.tables.bookings[0].status='confirmed';db.fail=(t,u)=>t==='booking_deliveries'&&!!u?.join_url;
 assertEquals((await runConfirm(db)).status,500);db.fail=null;
 assertEquals((await runConfirm(db)).status,500);assertEquals(io.meetings,1);assertEquals(io.emails.length,0);
});
Deno.test('OAuth failure safely retries; ambiguous POST never repeats',async()=>{
 const db=new DB(),io=providers();db.tables.bookings[0].status='confirmed';io.failAuth=true;
 assertEquals((await runConfirm(db)).status,500);io.failAuth=false;io.failZoom=true;
 assertEquals((await runConfirm(db)).status,500);io.failZoom=false;
 assertEquals((await runConfirm(db)).status,500);assertEquals(io.meetings,1);
});
Deno.test('unsigned and unauthorized calls have no side effects',async()=>{
 const db=new DB(),io=providers(); assertEquals((await webhook(request({}),(()=>db) as any)).status,401);
 assertEquals((await confirmation(request({bookingId:'booking'},false),(()=>db) as any)).status,401);
 assertEquals(io.meetings,0);
});
Deno.test('webhook DB lookup/update errors are 500, unrelated events are acknowledged',async()=>{
 const db=new DB(),io=providers();db.fail=()=>true;
 assertEquals((await webhook(await signed(io.payment),(()=>db) as any)).status,500);
 db.fail=(t,u)=>t==='bookings'&&!!u;
 assertEquals((await webhook(await signed(io.payment),(()=>db) as any)).status,500);
 db.fail=null;db.tables.bookings=[];
 assertEquals((await webhook(await signed(io.payment),(()=>db) as any)).status,200);assertEquals(io.meetings,0);
});
Deno.test('current provider amount/currency/location/order/id/status/refund must match; completed order alone insufficient',async()=>{
 for(const changes of [{amount_money:{amount:1,currency:'USD'}},{amount_money:{amount:15000,currency:'CAD'}},{location_id:'other'},{location_id:null},{order_id:'other'},{id:'other'},{status:'APPROVED'},{refunded_money:{amount:1}}]) {
   const io=providers();Object.assign(io.payment,changes);io.order.state='COMPLETED';
   assertEquals((await verifySquareOrderPaid('order',15000)).paid,false);
 }
 for(const changes of [{id:'other'},{location_id:null},{total_money:{amount:15000,currency:'CAD'}},{state:'CANCELED'}]) {
   const io=providers();Object.assign(io.order,changes);assertEquals((await verifySquareOrderPaid('order',15000)).paid,false);
 }
 const io=providers();assertEquals((await verifySquareOrderPaid('order',15000)).paid,true);
 io.order.state='COMPLETED';assertEquals((await verifySquareOrderPaid('order',15000)).paid,true);
});
Deno.test('old signed success replay after current refund never fulfills',async()=>{
 const db=new DB(),io=providers();const event=structuredClone(io.payment);io.payment.refunded_money.amount=15000;
 assertEquals((await webhook(await signed(event),(()=>db) as any)).status,200);
 assertEquals(db.tables.bookings[0].status,'pending');assertEquals(io.meetings,0);
});
Deno.test('provider unavailable returns retryable webhook failure',async()=>{
 const db=new DB(),io=providers();io.failSquare=true;
 assertEquals((await webhook(await signed(io.payment),(()=>db) as any)).status,500);
 assertEquals(db.tables.bookings[0].status,'pending');
});
Deno.test('browser then webhook and webhook then browser converge through actual handlers',async()=>{
 for(const browserFirst of [true,false]) {
   const db=new DB(),io=providers();
   const browser=()=>bookingHandler(request({action:'verify-booking-payment',bookingId:'booking'}),(()=>db) as any);
   const hook=async()=>webhook(await signed(io.payment),(()=>db) as any);
   assertEquals((await (browserFirst?browser():hook())).status,200);
   assertEquals((await (browserFirst?hook():browser())).status,200);
   assertEquals(io.meetings,1);assertEquals(io.emails.length,2);
 }
});
Deno.test('legacy link is not silently mass-resent; explicit authorized recovery reuses it',async()=>{
 const db=new DB(),io=providers();Object.assign(db.tables.bookings[0],{status:'confirmed',notes:'Original notes\nZoom Meeting ID: 99, Join URL: https://zoom.test/old'});
 assertEquals((await (await runConfirm(db)).json()).legacyDeliveryUnknown,true);assertEquals(io.emails.length,0);
 assertEquals((await runConfirm(db,{bookingId:'booking',recoverLegacy:true,legacyClientNotified:false,legacyOwnerNotified:false})).status,200);assertEquals(io.meetings,0);assertEquals(io.emails.length,2);
});
Deno.test('reschedule failure/retry uses new meeting; return to original slot uses revision',async()=>{
 const db=new DB(),io=providers();db.tables.bookings[0].status='confirmed';await runConfirm(db);
 Object.assign(db.tables.bookings[0],{booking_time:'11:00:00',confirmation_revision:1});io.failOwner=true;
 assertEquals((await runConfirm(db,{bookingId:'booking',isReschedule:true})).status,500);io.failOwner=false;
 assertEquals((await runConfirm(db)).status,200);assertEquals(io.meetings,2);
 Object.assign(db.tables.bookings[0],{booking_time:'10:00:00',confirmation_revision:2});
 assertEquals((await runConfirm(db)).status,200);assertEquals(io.meetings,3);assertEquals(io.emails.length,6);
 assert(db.tables.bookings[0].notes.includes('Original notes'));
});
Deno.test('concurrent confirmations only one creates and sends; loser is retryable',async()=>{
 const db=new DB(),io=providers();db.tables.bookings[0].status='confirmed';
 const results=await Promise.all([runConfirm(db),runConfirm(db)]);
 assertEquals(results.map(r=>r.status).sort(),[200,500]);assertEquals(io.meetings,1);assertEquals(io.emails.length,2);
});
Deno.test('FRI signed webhook and browser create one booking and retry owner with preserved client notes',async()=>{
 const db=new DB(),io=providers();db.tables.bookings=[];
 db.tables.contracts=[{id:'contract',square_order_id:'order',amount_cents:15000,status:'signed-awaiting-payment',contract_type:'readiness-intensive',client_name:'Test',client_email:'client@example.test',client_notes:'My <notes> ✓',metadata:{bookingDate:'2099-10-15',bookingTime:'10:00'}}];
 io.failOwner=true;
 assertEquals((await webhook(await signed(io.payment),(()=>db) as any)).status,500);
 assertEquals(db.tables.contracts[0].status,'paid');assertEquals(db.tables.bookings.length,1);
 io.failOwner=false;
 assertEquals((await contractsHandler(request({action:'mark-paid',contractId:'contract'}),(()=>db) as any)).status,200);
 assertEquals(db.tables.bookings.length,1);assertEquals(io.meetings,1);assertEquals(io.emails.length,2);
 assertEquals(db.tables.bookings[0].client_notes,'My <notes> ✓');
 assertEquals((await webhook(await signed(io.payment),(()=>db) as any)).status,200);
 assertEquals(io.meetings,1);assertEquals(io.emails.length,2);
});
Deno.test('explicit Zoom auth rejection is safe to retry',async()=>{
 const db=new DB(),io=providers();db.tables.bookings[0].status='confirmed';io.rejectZoom=true;
 assertEquals((await runConfirm(db)).status,500);io.rejectZoom=false;
 assertEquals((await runConfirm(db)).status,200);assertEquals(io.meetings,1);
});
Deno.test('known confirmed browser booking revalidates current refund before repairing email',async()=>{
 const db=new DB(),io=providers();Object.assign(db.tables.bookings[0],{status:'confirmed',payment_id:'payment'});io.payment.refunded_money.amount=1;
 assertEquals((await bookingHandler(request({action:'verify-booking-payment',bookingId:'booking'}),(()=>db) as any)).status,402);
 assertEquals(io.meetings,0);assertEquals(io.emails.length,0);
});
Deno.test('expired email ambiguity fails closed instead of duplicate sending',async()=>{
 const db=new DB(),io=providers();db.tables.bookings[0].status='confirmed';io.failClient=true;await runConfirm(db);io.failClient=false;
 db.tables.booking_deliveries[0].client_attempt_at=new Date(Date.now()-24*3600000).toISOString();
 assertEquals((await runConfirm(db)).status,500);assertEquals(io.meetings,1);assertEquals(io.emails.length,0);
});
Deno.test('legacy owner-only recovery does not resend client confirmation',async()=>{
 const db=new DB(),io=providers();Object.assign(db.tables.bookings[0],{status:'confirmed',notes:'Zoom Meeting ID: 99, Join URL: https://zoom.test/old'});
 assertEquals((await runConfirm(db,{bookingId:'booking',recoverLegacy:true})).status,400);
 assertEquals((await runConfirm(db,{bookingId:'booking',recoverLegacy:true,legacyClientNotified:true,legacyOwnerNotified:false})).status,200);
 assertEquals(io.meetings,0);assertEquals(io.emails.length,1);assertEquals(io.emails[0].to[0],'matt@freedominterventions.com');
});
Deno.test('contract browser accepts OPEN paid order, refuses refund',async()=>{
 const db=new DB(),io=providers();db.tables.contracts=[{id:'contract',square_order_id:'order',amount_cents:15000,status:'cancelled'}];
 // Cancelled is not revived even when paid. Actual handler traverses provider verification.
 assertEquals((await contractsHandler(request({action:'mark-paid',contractId:'contract'}),(()=>db) as any)).status,409);
 io.payment.refunded_money.amount=1;
 assertEquals((await contractsHandler(request({action:'mark-paid',contractId:'contract'}),(()=>db) as any)).status,402);
});
