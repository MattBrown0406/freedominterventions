import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const origin=process.env.ORIGIN || 'http://127.0.0.1:4377';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM,headless:true});
try {
 for(const type of ['crisis-coaching','fri-contract']) for(const state of ['paid_needs_reschedule','ready-error','missing-booking','409']) {
  const context=await browser.newContext();const page=await context.newPage();let verify=0,otherWrites=0;
  await page.route('**/*',async route=>{
   const url=new URL(route.request().url());if(url.origin===origin)return route.continue();
   if(url.pathname.includes('/functions/v1/')){
    const body=route.request().postDataJSON();
    if(['mark-paid','verify-booking-payment'].includes(body?.action)){
     verify++;return route.fulfill({status:state==='409'?409:200,contentType:'application/json',body:JSON.stringify(state==='409'?{error:'Review required. Do not pay again.'}:{success:true,paid:true,confirmationError:true,booking:state==='missing-booking'?null:{id:'synthetic',status:'confirmed',fulfillmentState:state==='paid_needs_reschedule'?state:'ready'}})});
    }
    if(['create-checkout-link','create-booking','create-payment-link'].includes(body?.action))otherWrites++;
   }
   return route.abort();
  });
  await page.goto(`${origin}/?square_status=success&booking_id=synthetic&type=${type}&date=2099-01-01&time=10:00#booking`);
  if(state==='ready-error' || state==='missing-booking')await page.getByText('Booking saved — details pending',{exact:true}).waitFor();
  else {await page.getByText('Do not pay again. Contact us to resolve your booking.',{exact:true}).waitFor({timeout:25000});assert.equal(await page.getByText('Booking Confirmed!',{exact:true}).count(),0);assert.equal(await page.getByText('Book Another Session',{exact:true}).count(),0);}
  assert.equal(otherWrites,0);assert(verify>0);console.log(`PASS paid return ${type} ${state}`);await context.close();
 }
 for(const type of ['crisis-coaching','fri-contract']) {
  const context=await browser.newContext();const page=await context.newPage();let otherWrites=0;
  await page.route('**/*',async route=>{
   const url=new URL(route.request().url());if(url.origin===origin)return route.continue();
   if(url.pathname.includes('/functions/v1/')) {
    const body=route.request().postDataJSON();
    if(['mark-paid','verify-booking-payment'].includes(body?.action))return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(type==='fri-contract'?{success:true,alreadyPaid:true,confirmationError:false}:{success:true,paid:true,confirmationError:false,booking:{id:'synthetic',status:'confirmed',booking_type:'crisis-coaching',booking_date:'2099-01-01',booking_time:'10:00'}})});
    if(['create-checkout-link','create-booking','create-payment-link'].includes(body?.action))otherWrites++;
   }
   return route.abort();
  });
  await page.goto(`${origin}/?square_status=success&booking_id=synthetic&type=${type}&date=2099-01-01&time=10:00#booking`);
  await page.getByText('Booking Confirmed!',{exact:true}).waitFor();
  assert.equal(otherWrites,0);console.log(`PASS current-main response compatibility ${type}`);await context.close();
 }
}finally{await browser.close();}
