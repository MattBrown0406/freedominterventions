import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SQUARE_ACCESS_TOKEN = Deno.env.get('SQUARE_ACCESS_TOKEN');
const SQUARE_LOCATION_ID = Deno.env.get('SQUARE_LOCATION_ID');
const SQUARE_BASE_URL = 'https://connect.squareup.com/v2';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, ...params } = await req.json();
    console.log(`Square booking action: ${action}`, params);

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    switch (action) {
      case 'get-available-slots': {
        const { date } = params;
        const slots = generateTimeSlots(date);
        return new Response(JSON.stringify({ slots }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'lookup-booking': {
        const { bookingId, email } = params;
        
        if (!bookingId || !email) {
          throw new Error('Booking ID and email are required');
        }

        const { data: booking, error } = await supabase
          .from('bookings')
          .select('id, booking_type, booking_date, booking_time, customer_name, customer_email, status')
          .eq('id', bookingId)
          .eq('customer_email', email.toLowerCase())
          .eq('status', 'confirmed')
          .maybeSingle();

        if (error) {
          console.error('Error looking up booking:', error);
          throw new Error('Failed to lookup booking');
        }

        return new Response(JSON.stringify({ booking }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'reschedule-booking': {
        const { bookingId, email, newDate, newTime } = params;
        
        if (!bookingId || !email || !newDate || !newTime) {
          throw new Error('Missing required fields for rescheduling');
        }

        // First verify the booking exists and email matches
        const { data: existingBooking, error: lookupError } = await supabase
          .from('bookings')
          .select('id, customer_email, customer_name, booking_type')
          .eq('id', bookingId)
          .eq('customer_email', email.toLowerCase())
          .eq('status', 'confirmed')
          .maybeSingle();

        if (lookupError || !existingBooking) {
          console.error('Booking not found or email mismatch:', lookupError);
          throw new Error('Booking not found or email does not match');
        }

        // Update the booking
        const { data: updatedBooking, error: updateError } = await supabase
          .from('bookings')
          .update({
            booking_date: newDate,
            booking_time: newTime,
            updated_at: new Date().toISOString()
          })
          .eq('id', bookingId)
          .select()
          .single();

        if (updateError) {
          console.error('Error updating booking:', updateError);
          throw new Error('Failed to reschedule booking');
        }

        console.log('Booking rescheduled successfully:', updatedBooking);

        // Send reschedule confirmation email
        try {
          await supabase.functions.invoke('send-booking-confirmation', {
            body: {
              bookingId: updatedBooking.id,
              customerName: existingBooking.customer_name,
              customerEmail: email,
              bookingType: existingBooking.booking_type,
              bookingDate: newDate,
              bookingTime: newTime,
              isReschedule: true
            }
          });
        } catch (emailError) {
          console.error('Failed to send reschedule confirmation email:', emailError);
          // Don't fail the reschedule if email fails
        }

        return new Response(JSON.stringify({ 
          success: true, 
          booking: updatedBooking 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'create-payment': {
        const { sourceId, amount, customerEmail, customerName, bookingDate, bookingTime } = params;
        
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
              amount: amount,
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
  
  for (let hour = 9; hour < 19; hour++) {
    const timeStr = `${hour.toString().padStart(2, '0')}:00`;
    slots.push(timeStr);
  }
  
  return slots;
}