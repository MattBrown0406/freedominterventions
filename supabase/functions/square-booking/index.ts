import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SQUARE_ACCESS_TOKEN = Deno.env.get('SQUARE_ACCESS_TOKEN');
const SQUARE_LOCATION_ID = Deno.env.get('SQUARE_LOCATION_ID');
const SQUARE_BASE_URL = 'https://connect.squareup.com/v2';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, ...params } = await req.json();
    console.log(`Square booking action: ${action}`, params);

    switch (action) {
      case 'get-available-slots': {
        const { date } = params;
        // Generate available time slots for the given date (9 AM - 7 PM)
        const slots = generateTimeSlots(date);
        return new Response(JSON.stringify({ slots }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'create-payment': {
        const { sourceId, amount, customerEmail, customerName, bookingDate, bookingTime } = params;
        
        // Create payment with Square
        const paymentResponse = await fetch(`${SQUARE_BASE_URL}/payments`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
            'Square-Version': '2024-01-18',
          },
          body: JSON.stringify({
            source_id: sourceId,
            idempotency_key: crypto.randomUUID(),
            amount_money: {
              amount: amount, // in cents
              currency: 'USD',
            },
            location_id: SQUARE_LOCATION_ID,
            note: `Coaching session for ${customerName} on ${bookingDate} at ${bookingTime}`,
            buyer_email_address: customerEmail,
          }),
        });

        const paymentData = await paymentResponse.json();
        console.log('Square payment response:', paymentData);

        if (paymentData.errors) {
          throw new Error(paymentData.errors[0]?.detail || 'Payment failed');
        }

        return new Response(JSON.stringify({ 
          success: true, 
          payment: paymentData.payment,
          bookingDetails: {
            date: bookingDate,
            time: bookingTime,
            customerName,
            customerEmail,
          }
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      default:
        throw new Error(`Unknown action: ${action}`);
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in square-booking function:', error);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function generateTimeSlots(dateStr: string): string[] {
  const slots: string[] = [];
  const date = new Date(dateStr);
  const dayOfWeek = date.getDay();
  
  // Skip weekends if needed (currently allowing all days)
  // if (dayOfWeek === 0 || dayOfWeek === 6) return slots;
  
  // Generate hourly slots from 9 AM to 7 PM
  for (let hour = 9; hour < 19; hour++) {
    const timeStr = `${hour.toString().padStart(2, '0')}:00`;
    slots.push(timeStr);
  }
  
  return slots;
}
