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

// Simple in-memory rate limiter for payment attempts
const paymentAttempts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PAYMENT_ATTEMPTS = 5; // 5 attempts per hour per IP

// Separate rate limiter for booking creation (consultations)
const bookingAttempts = new Map<string, { count: number; resetTime: number }>();
const MAX_BOOKING_ATTEMPTS = 5; // 5 booking attempts per hour per IP

function getClientIP(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
         req.headers.get('x-real-ip') || 
         'unknown';
}

function checkRateLimit(ip: string, limitMap: Map<string, { count: number; resetTime: number }>, maxAttempts: number): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = limitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    limitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: maxAttempts - 1 };
  }
  
  if (record.count >= maxAttempts) {
    return { allowed: false, remaining: 0 };
  }
  
  record.count++;
  return { allowed: true, remaining: maxAttempts - record.count };
}

// Input validation helpers
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

function validateString(value: string, maxLength: number): boolean {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= maxLength;
}

function sanitizeString(value: string): string {
  return value.trim().slice(0, 255);
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, ...params } = await req.json();
    console.log(`Square booking action: ${action}`, { action, timestamp: new Date().toISOString() });

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    switch (action) {
      case 'get-available-slots': {
        const { date } = params;
        if (!date || typeof date !== 'string') {
          throw new Error('Valid date is required');
        }
        const slots = await generateTimeSlots(date, supabase);
        return new Response(JSON.stringify({ slots }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'lookup-booking': {
        const { bookingId, email } = params;
        
        if (!bookingId || !email) {
          throw new Error('Booking ID and email are required');
        }

        // Validate inputs
        if (!validateString(bookingId, 100) || !validateEmail(email)) {
          throw new Error('Invalid booking ID or email format');
        }

        const { data: booking, error } = await supabase
          .from('bookings')
          .select('id, booking_type, booking_date, booking_time, customer_name, customer_email, status')
          .eq('id', bookingId)
          .eq('customer_email', email.toLowerCase().trim())
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

        // Validate inputs
        if (!validateString(bookingId, 100) || !validateEmail(email)) {
          throw new Error('Invalid booking ID or email format');
        }

        if (!validateString(newDate, 20) || !validateString(newTime, 10)) {
          throw new Error('Invalid date or time format');
        }

        // First verify the booking exists and email matches
        const { data: existingBooking, error: lookupError } = await supabase
          .from('bookings')
          .select('id, customer_email, customer_name, booking_type')
          .eq('id', bookingId)
          .eq('customer_email', email.toLowerCase().trim())
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

        console.log('Booking rescheduled successfully:', { bookingId: updatedBooking.id });

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
        // Rate limit check for payment attempts
        const clientIP = getClientIP(req);
        const rateLimit = checkRateLimit(clientIP, paymentAttempts, MAX_PAYMENT_ATTEMPTS);
        
        if (!rateLimit.allowed) {
          console.warn(`Rate limit exceeded for IP: ${clientIP}`);
          return new Response(JSON.stringify({ 
            error: 'Too many payment attempts. Please try again later.' 
          }), {
            status: 429,
            headers: { 
              ...corsHeaders, 
              'Content-Type': 'application/json',
              'Retry-After': '3600'
            },
          });
        }

        const { sourceId, amount, customerEmail, customerName, bookingDate, bookingTime } = params;
        
        // Validate all required inputs
        if (!sourceId || typeof sourceId !== 'string' || sourceId.length > 500) {
          throw new Error('Invalid payment source');
        }

        if (typeof amount !== 'number' || amount <= 0 || amount > 100000) {
          throw new Error('Invalid payment amount');
        }

        if (!validateEmail(customerEmail)) {
          throw new Error('Invalid email address');
        }

        if (!validateString(customerName, 100)) {
          throw new Error('Invalid customer name');
        }

        if (!validateString(bookingDate, 20) || !validateString(bookingTime, 10)) {
          throw new Error('Invalid booking date or time');
        }

        const sanitizedName = sanitizeString(customerName);
        const sanitizedEmail = customerEmail.toLowerCase().trim();

        console.log('Processing payment', { 
          amount, 
          customerEmail: sanitizedEmail, 
          bookingDate, 
          rateLimitRemaining: rateLimit.remaining 
        });
        
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
            note: `Coaching session for ${sanitizedName} on ${bookingDate} at ${bookingTime}`,
            buyer_email_address: sanitizedEmail,
          }),
        });

        const paymentData = await paymentResponse.json();
        console.log('Square payment response status:', paymentResponse.status);

        if (paymentData.errors) {
          console.error('Square payment error:', paymentData.errors);
          throw new Error(paymentData.errors[0]?.detail || 'Payment failed');
        }

        return new Response(JSON.stringify({ 
          success: true, 
          payment: paymentData.payment,
          bookingDetails: {
            date: bookingDate,
            time: bookingTime,
            customerName: sanitizedName,
            customerEmail: sanitizedEmail,
          }
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'create-booking': {
        // Rate limit check for booking creation
        const clientIP = getClientIP(req);
        const rateLimit = checkRateLimit(clientIP, bookingAttempts, MAX_BOOKING_ATTEMPTS);
        
        if (!rateLimit.allowed) {
          console.warn(`Booking rate limit exceeded for IP: ${clientIP}`);
          return new Response(JSON.stringify({ 
            error: 'Too many booking attempts. Please try again later.' 
          }), {
            status: 429,
            headers: { 
              ...corsHeaders, 
              'Content-Type': 'application/json',
              'Retry-After': '3600'
            },
          });
        }

        const { bookingType, customerName, customerEmail, customerPhone, bookingDate, bookingTime, durationMinutes, paymentId, amountCents } = params;

        // Validate required fields
        if (!validateString(customerName, 100)) {
          throw new Error('Valid customer name is required');
        }

        if (!validateEmail(customerEmail)) {
          throw new Error('Valid email address is required');
        }

        if (!validateString(bookingDate, 20) || !validateString(bookingTime, 10)) {
          throw new Error('Valid booking date and time are required');
        }

        if (!bookingType || !['consultation', 'coaching'].includes(bookingType)) {
          throw new Error('Valid booking type is required');
        }

        const sanitizedData = {
          booking_type: bookingType,
          customer_name: sanitizeString(customerName),
          customer_email: customerEmail.toLowerCase().trim(),
          customer_phone: customerPhone ? sanitizeString(customerPhone).slice(0, 20) : null,
          booking_date: bookingDate,
          booking_time: bookingTime,
          duration_minutes: typeof durationMinutes === 'number' ? Math.min(Math.max(durationMinutes, 15), 180) : 60,
          status: 'confirmed',
          payment_id: paymentId || null,
          amount_cents: typeof amountCents === 'number' ? amountCents : null,
        };

        console.log('Creating booking:', { 
          type: sanitizedData.booking_type,
          date: sanitizedData.booking_date,
          time: sanitizedData.booking_time,
          rateLimitRemaining: rateLimit.remaining 
        });

        const { data: booking, error: bookingError } = await supabase
          .from('bookings')
          .insert(sanitizedData)
          .select()
          .single();

        if (bookingError) {
          console.error('Error creating booking:', bookingError);
          throw new Error('Failed to create booking');
        }

        console.log('Booking created successfully:', { bookingId: booking.id });

        // Sync booking to Notion CRM (async, don't block response)
        try {
          const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
          const syncResponse = await fetch(`${supabaseUrl}/functions/v1/sync-booking-to-notion`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`
            },
            body: JSON.stringify({
              customerName: sanitizedData.customer_name,
              customerEmail: sanitizedData.customer_email,
              customerPhone: sanitizedData.customer_phone,
              bookingType: sanitizedData.booking_type,
              bookingDate: sanitizedData.booking_date,
              bookingTime: sanitizedData.booking_time,
              durationMinutes: sanitizedData.duration_minutes,
              paymentId: sanitizedData.payment_id,
              amountCents: sanitizedData.amount_cents
            })
          });
          
          if (syncResponse.ok) {
            console.log('Successfully synced booking to Notion CRM');
          } else {
            console.error('Failed to sync booking to Notion:', await syncResponse.text());
          }
        } catch (syncError) {
          console.error('Error syncing booking to Notion:', syncError);
          // Don't fail the booking if Notion sync fails
        }

        return new Response(JSON.stringify({ 
          success: true, 
          booking 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      default:
        throw new Error(`Unknown action: ${action}`);
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in square-booking function:', errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function generateTimeSlots(dateStr: string, supabase: any): Promise<string[]> {
  const slots: string[] = [];
  const date = new Date(dateStr);
  const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
  
  // 1. Fetch availability for this day of week
  const { data: availability, error: availabilityError } = await supabase
    .from('availability_settings')
    .select('start_time, end_time, is_available')
    .eq('day_of_week', dayOfWeek)
    .single();
  
  if (availabilityError || !availability || !availability.is_available) {
    return slots;
  }
  
  // 2. Fetch existing bookings for this specific date
  const { data: existingBookings, error: bookingsError } = await supabase
    .from('bookings')
    .select('booking_time')
    .eq('booking_date', dateStr)
    .eq('status', 'confirmed');

  if (bookingsError) {
    console.error('Error fetching existing bookings:', bookingsError);
    // Continue anyway, better to show possibly double-booked slots than none
  }

  // Create a set of taken times for fast lookup (normalize to HH:MM)
  const takenSlots = new Set(
    (existingBookings || []).map((b: { booking_time: string }) => {
      // Postgres time might come back as "10:00:00"
      const [h, m] = b.booking_time.split(':');
      return `${h}:${m}`;
    })
  );
  
  // 3. Generate hourly slots based on availability settings
  const startHour = parseInt(availability.start_time.split(':')[0]);
  const endHour = parseInt(availability.end_time.split(':')[0]);
  
  for (let hour = startHour; hour < endHour; hour++) {
    const timeStr = `${hour.toString().padStart(2, '0')}:00`;
    
    // Only add if not already booked
    if (!takenSlots.has(timeStr)) {
      slots.push(timeStr);
    }
  }
  
  return slots;
}
