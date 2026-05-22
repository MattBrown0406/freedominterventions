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
const BOOKING_FEES_CENTS: Record<string, number> = {
  consultation: 0,
  coaching: 15000,
  'crisis-coaching': 15000,
  'readiness-intensive': 250000,
};
const SITE_URL = 'https://freedominterventions.com';

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

function normalizeAttribution(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

async function upsertBookingCrm(
  supabase: ReturnType<typeof createClient>,
  booking: { id: string },
  payload: {
    customerName: string;
    customerEmail: string;
    customerPhone: string | null;
    bookingType: string;
    sourceAttribution: Record<string, unknown>;
  }
) {
  const nameParts = payload.customerName.trim().split(/\s+/);
  const firstName = nameParts[0] || null;
  const lastName = nameParts.slice(1).join(' ') || null;
  const revenuePath = payload.bookingType === 'consultation'
    ? 'free_consultation'
    : payload.bookingType === 'readiness-intensive'
    ? 'family_readiness_intensive'
    : 'crisis_coaching';
  const leadScore = payload.bookingType === 'consultation' ? 50 : payload.bookingType === 'readiness-intensive' ? 95 : 70;

  await supabase.from('crm_contacts').upsert({
    email: payload.customerEmail,
    first_name: firstName,
    last_name: lastName,
    phone: payload.customerPhone,
    source: 'booking',
    source_id: booking.id,
    source_attribution: payload.sourceAttribution,
    lead_score: leadScore,
    revenue_path: revenuePath,
    pipeline_status: payload.bookingType === 'consultation' ? 'consultation_booked' : 'paid_booking_started',
    next_action: payload.bookingType === 'consultation'
      ? 'Review source, assessment status, and prepare for consultation'
      : 'Confirm payment and prepare paid session',
    next_action_due_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    last_engagement_at: new Date().toISOString(),
  }, { onConflict: 'email' });
}

async function queueConsultationPrep(
  supabase: ReturnType<typeof createClient>,
  booking: { id: string },
  payload: {
    customerName: string;
    customerEmail: string;
    customerPhone: string | null;
    sourceAttribution: Record<string, unknown>;
  }
) {
  const firstName = payload.customerName.trim().split(/\s+/)[0] || 'there';
  const assessmentUrl = `${SITE_URL}/assessment`;
  const { error } = await supabase.from('freedom_followup_queue').insert({
    lead_type: 'consultation',
    lead_id: booking.id,
    contact_email: payload.customerEmail,
    contact_name: payload.customerName,
    contact_phone: payload.customerPhone,
    followup_reason: 'consultation_assessment_prompt',
    priority: 'high',
    sequence_step: 1,
    subject: `${firstName}, one thing before our consultation`,
    body_html: `
      <p>Hi ${firstName},</p>
      <p>Before our consultation, please complete the family assessment if you have not already. It gives me the clearest picture of urgency, safety, treatment history, leverage, and family alignment before we talk.</p>
      <p><a href="${assessmentUrl}">Complete the family assessment</a></p>
      <p>If things escalate before our call, you can call me directly at <a href="tel:5416688084">541-668-8084</a>.</p>
      <p>- Matt Brown<br>Freedom Interventions</p>
    `,
    source_attribution: payload.sourceAttribution,
    due_at: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
  });
  if (error) console.error('Failed to queue consultation prep followup:', error);
}

function resolveBookingAmountCents(bookingType: string): number {
  return BOOKING_FEES_CENTS[bookingType] ?? -1;
}

async function verifySquareOrderPaid(orderId: string, expectedAmountCents: number) {
  if (!SQUARE_ACCESS_TOKEN) throw new Error('Square access token is not configured');
  if (!SQUARE_LOCATION_ID) throw new Error('Square location ID is not configured');

  const orderResponse = await fetch(`${SQUARE_BASE_URL}/orders/${orderId}`, {
    headers: {
      'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
      'Square-Version': '2024-01-18',
    },
  });
  const orderData = await orderResponse.json();
  if (!orderResponse.ok || orderData.errors) {
    throw new Error(orderData.errors?.[0]?.detail || 'Could not verify Square order');
  }

  const order = orderData.order;
  const orderAmount = order?.total_money?.amount;
  const locationMatches = !order?.location_id || order.location_id === SQUARE_LOCATION_ID;
  const amountMatches = typeof orderAmount === 'number' && orderAmount === expectedAmountCents;
  const isComplete = order?.state === 'COMPLETED';

  return {
    paid: Boolean(locationMatches && amountMatches && isComplete),
    order,
  };
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

      case 'create-payment':
      case 'create-checkout-link':
      case 'create-contract-payment-link': {
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

        const {
          sourceId,
          amount,
          customerEmail,
          customerName,
          customerPhone,
          bookingDate,
          bookingTime,
          bookingType: paymentBookingType,
          durationMinutes,
          agreementAccepted,
          agreementSignerName,
          agreementSignedAt,
          agreementText,
          agreementVersion,
          discountCode,
          discountCents,
          contractMetadata,
          sourceAttribution,
        } = params;
        const normalizedSourceAttribution = normalizeAttribution(sourceAttribution);

        if (!validateEmail(customerEmail)) {
          throw new Error('Invalid email address');
        }

        if (!validateString(customerName, 100)) {
          throw new Error('Invalid customer name');
        }

        const isContractPaymentLink = action === 'create-contract-payment-link';

        if (!isContractPaymentLink && (!validateString(bookingDate, 20) || !validateString(bookingTime, 10))) {
          throw new Error('Invalid booking date or time');
        }

        if (!isContractPaymentLink && (!paymentBookingType || !['consultation', 'crisis-coaching', 'readiness-intensive', 'coaching', 'intervention-contract'].includes(paymentBookingType))) {
          throw new Error('Valid booking type is required');
        }

        const normalizedBookingType = isContractPaymentLink ? 'intervention-contract' : paymentBookingType === 'coaching' ? 'crisis-coaching' : paymentBookingType;
        if (!isContractPaymentLink && normalizedBookingType === 'intervention-contract') {
          throw new Error('Intervention contract payments must be created from a signed contract');
        }
        if (!isContractPaymentLink && (typeof amount !== 'number' || amount <= 0 || amount > 500000)) {
          throw new Error('Invalid payment amount');
        }
        const resolvedAmount = normalizedBookingType === 'intervention-contract'
          ? amount
          : resolveBookingAmountCents(normalizedBookingType);
        if (resolvedAmount <= 0 || resolvedAmount > 500000) {
          throw new Error('Invalid payment amount for booking type');
        }
        if (!isContractPaymentLink && amount !== resolvedAmount) {
          throw new Error('Payment amount does not match booking type');
        }
        const sanitizedName = sanitizeString(customerName);
        const sanitizedEmail = customerEmail.toLowerCase().trim();
        const sanitizedPhone = customerPhone ? sanitizeString(customerPhone).slice(0, 20) : null;

        const sessionLabel = normalizedBookingType === 'readiness-intensive'
          ? 'Family Readiness Intensive'
          : normalizedBookingType === 'crisis-coaching'
          ? 'Crisis Coaching Session'
          : normalizedBookingType === 'intervention-contract'
          ? 'Intervention Agreement'
          : 'Coaching session';

        if (action === 'create-contract-payment-link') {
          const { contractId, redirectPath, note } = params;
          if (!validateString(contractId, 100)) {
            throw new Error('Valid contract ID is required');
          }
          const { data: contract, error: contractError } = await supabase
            .from('contracts')
            .select('id, contract_type, amount_cents, client_email, status')
            .eq('id', contractId)
            .single();
          if (contractError || !contract) throw contractError || new Error('Contract not found');
          if (contract.status === 'paid') throw new Error('Contract has already been paid');
          if (contract.client_email !== sanitizedEmail) throw new Error('Customer email does not match this contract');
          if (typeof contract.amount_cents !== 'number' || contract.amount_cents <= 0) throw new Error('Contract amount is invalid');

          const origin = req.headers.get('origin') || 'https://freedominterventions.com';
          const successUrl = new URL(redirectPath || '/start-contract?contract_status=success', origin);
          successUrl.searchParams.set('contract_id', contractId);

          const checkoutResponse = await fetch(`${SQUARE_BASE_URL}/online-checkout/payment-links`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
              'Content-Type': 'application/json',
              'Square-Version': '2024-01-18',
            },
            body: JSON.stringify({
              idempotency_key: crypto.randomUUID(),
              quick_pay: {
                name: contract.contract_type === 'readiness-intensive' ? 'Family Readiness Intensive' : sessionLabel,
                price_money: {
                  amount: contract.amount_cents,
                  currency: 'USD',
                },
                location_id: SQUARE_LOCATION_ID,
              },
              checkout_options: {
                redirect_url: successUrl.toString(),
                ask_for_shipping_address: false,
              },
              pre_populated_data: {
                buyer_email: sanitizedEmail,
              },
              description: note || `${sessionLabel} for ${sanitizedName}`,
            }),
          });

          const checkoutData = await checkoutResponse.json();
          console.log('Square contract checkout response status:', checkoutResponse.status);

          if (checkoutData.errors) {
            console.error('Square contract checkout link error:', checkoutData.errors);
            throw new Error(checkoutData.errors[0]?.detail || 'Failed to create contract payment link');
          }

          const paymentLinkId = checkoutData.payment_link?.id ?? null;
          const squareOrderId = checkoutData.payment_link?.order_id ?? null;
          await supabase
            .from('contracts')
            .update({
              payment_link_id: paymentLinkId,
              square_order_id: squareOrderId,
              updated_at: new Date().toISOString(),
            })
            .eq('id', contractId);

          return new Response(JSON.stringify({
            success: true,
            contractId,
            checkoutUrl: checkoutData.payment_link?.url,
            paymentLinkId,
            squareOrderId,
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        if (action === 'create-payment') {
          if (!sourceId || typeof sourceId !== 'string' || sourceId.length > 500) {
            throw new Error('Invalid payment source');
          }

          console.log('Processing direct payment', {
            amount,
            customerEmail: sanitizedEmail,
            bookingDate,
            bookingType: normalizedBookingType,
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
                amount: resolvedAmount,
                currency: 'USD',
              },
              location_id: SQUARE_LOCATION_ID,
              note: `${sessionLabel} for ${sanitizedName} on ${bookingDate} at ${bookingTime}`,
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

        const requiresAgreementStorage = normalizedBookingType === 'readiness-intensive' || normalizedBookingType === 'intervention-contract';

        const bookingPayload = {
          booking_type: normalizedBookingType,
          customer_name: sanitizedName,
          customer_email: sanitizedEmail,
          customer_phone: sanitizedPhone,
          booking_date: bookingDate,
          booking_time: bookingTime,
          duration_minutes: typeof durationMinutes === 'number' ? Math.min(Math.max(durationMinutes, 15), 180) : 60,
          status: 'pending',
          payment_id: null,
          amount_cents: resolvedAmount,
          agreement_accepted: requiresAgreementStorage ? agreementAccepted === true : false,
          agreement_signer_name: requiresAgreementStorage && validateString(agreementSignerName, 100) ? sanitizeString(agreementSignerName) : null,
          agreement_signed_at: requiresAgreementStorage ? (typeof agreementSignedAt === 'string' ? agreementSignedAt : new Date().toISOString()) : null,
          agreement_text: requiresAgreementStorage && validateString(agreementText, 30000) ? agreementText.trim() : null,
          agreement_version: requiresAgreementStorage && validateString(agreementVersion, 50) ? agreementVersion.trim() : null,
          discount_code: typeof discountCode === 'string' && discountCode.trim().length > 0 ? sanitizeString(discountCode).slice(0, 40) : null,
          discount_cents: typeof discountCents === 'number' && discountCents >= 0 ? discountCents : null,
          contract_metadata: contractMetadata && typeof contractMetadata === 'object' ? contractMetadata : {},
          source_attribution: normalizedSourceAttribution,
        };

        const { data: booking, error: bookingError } = await supabase
          .from('bookings')
          .insert(bookingPayload)
          .select()
          .single();

        if (bookingError) {
          console.error('Error creating booking for checkout link:', bookingError);
          throw new Error('Failed to create booking before checkout');
        }

        await upsertBookingCrm(supabase, booking, {
          customerName: sanitizedName,
          customerEmail: sanitizedEmail,
          customerPhone: sanitizedPhone,
          bookingType: normalizedBookingType,
          sourceAttribution: normalizedSourceAttribution,
        });

        const origin = req.headers.get('origin') || 'https://freedominterventions.com';
        const successUrl = new URL(normalizedBookingType === 'intervention-contract' ? '/start-contract' : '/#booking', origin);
        successUrl.searchParams.set('square_status', 'success');
        successUrl.searchParams.set('booking_id', booking.id);
        successUrl.searchParams.set('type', normalizedBookingType);
        successUrl.searchParams.set('date', bookingDate);
        successUrl.searchParams.set('time', bookingTime);
        successUrl.searchParams.set('name', sanitizedName);
        successUrl.searchParams.set('email', sanitizedEmail);
        if (sanitizedPhone) successUrl.searchParams.set('phone', sanitizedPhone);

        const checkoutResponse = await fetch(`${SQUARE_BASE_URL}/online-checkout/payment-links`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${SQUARE_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
            'Square-Version': '2024-01-18',
          },
          body: JSON.stringify({
            idempotency_key: crypto.randomUUID(),
            quick_pay: {
              name: sessionLabel,
              price_money: {
                amount: resolvedAmount,
                currency: 'USD',
              },
              location_id: SQUARE_LOCATION_ID,
            },
            checkout_options: {
              redirect_url: successUrl.toString(),
              ask_for_shipping_address: false,
            },
            pre_populated_data: {
              buyer_email: sanitizedEmail,
            },
            description: `${sessionLabel} for ${sanitizedName} on ${bookingDate} at ${bookingTime}`,
          }),
        });

        const checkoutData = await checkoutResponse.json();
        console.log('Square checkout response status:', checkoutResponse.status);

        if (checkoutData.errors) {
          console.error('Square checkout link error:', checkoutData.errors);
          throw new Error(checkoutData.errors[0]?.detail || 'Failed to create Square Checkout link');
        }

        const paymentLinkId = checkoutData.payment_link?.id ?? null;
        const squareOrderId = checkoutData.payment_link?.order_id ?? null;
        await supabase
          .from('bookings')
          .update({
            payment_link_id: paymentLinkId,
            square_order_id: squareOrderId,
            updated_at: new Date().toISOString(),
          })
          .eq('id', booking.id);

        return new Response(JSON.stringify({
          success: true,
          bookingId: booking.id,
          checkoutUrl: checkoutData.payment_link?.url,
          paymentLinkId,
          squareOrderId,
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'verify-booking-payment': {
        const { bookingId } = params;
        if (!validateString(bookingId, 100)) {
          throw new Error('Valid booking ID is required');
        }

        const { data: booking, error: bookingError } = await supabase
          .from('bookings')
          .select('id, booking_type, booking_date, booking_time, customer_name, customer_email, customer_phone, duration_minutes, amount_cents, payment_id, square_order_id, status')
          .eq('id', bookingId)
          .single();
        if (bookingError || !booking) throw bookingError || new Error('Booking not found');
        if (booking.status === 'confirmed' && booking.payment_id) {
          return new Response(JSON.stringify({ success: true, paid: true, booking }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        if (!booking.square_order_id) throw new Error('Square order ID is missing for this booking');
        if (typeof booking.amount_cents !== 'number' || booking.amount_cents <= 0) throw new Error('Booking amount is invalid');

        const verification = await verifySquareOrderPaid(booking.square_order_id, booking.amount_cents);
        if (!verification.paid) {
          return new Response(JSON.stringify({ success: false, paid: false }), {
            status: 402,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        const verifiedPaymentId = verification.order?.tenders?.[0]?.payment_id ?? verification.order?.tenders?.[0]?.id ?? null;
        const { data: confirmedBooking, error: updateError } = await supabase
          .from('bookings')
          .update({
            status: 'confirmed',
            payment_id: typeof verifiedPaymentId === 'string' ? sanitizeString(verifiedPaymentId).slice(0, 200) : null,
            updated_at: new Date().toISOString(),
          })
          .eq('id', booking.id)
          .select()
          .single();
        if (updateError) throw updateError;

        try {
          await supabase.functions.invoke('send-booking-confirmation', {
            body: {
              bookingId: booking.id,
              customerName: booking.customer_name,
              customerEmail: booking.customer_email,
              bookingType: booking.booking_type,
              bookingDate: booking.booking_date,
              bookingTime: booking.booking_time,
              durationMinutes: booking.duration_minutes,
            }
          });
        } catch (emailError) {
          console.error('Failed to send booking confirmation:', emailError);
        }

        return new Response(JSON.stringify({ success: true, paid: true, booking: confirmedBooking }), {
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

        const { bookingType, customerName, customerEmail, customerPhone, bookingDate, bookingTime, durationMinutes, paymentId, amountCents, agreementAccepted, agreementSignerName, agreementSignedAt, agreementText, agreementVersion, discountCode, discountCents, contractMetadata, sourceAttribution } = params;
        const normalizedSourceAttribution = normalizeAttribution(sourceAttribution);

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

        if (!bookingType || !['consultation', 'crisis-coaching', 'readiness-intensive', 'coaching', 'intervention-contract'].includes(bookingType)) {
          throw new Error('Valid booking type is required');
        }

        // Normalize legacy 'coaching' -> 'crisis-coaching'
        const normalizedBookingType = bookingType === 'coaching' ? 'crisis-coaching' : bookingType;
        if (resolveBookingAmountCents(normalizedBookingType) > 0 || normalizedBookingType === 'intervention-contract') {
          throw new Error('Paid bookings must be created through verified Square checkout');
        }

        if (normalizedBookingType === 'readiness-intensive' || normalizedBookingType === 'intervention-contract') {
          if (agreementAccepted !== true) {
            throw new Error('Agreement acceptance is required for this contract flow');
          }
          if (!validateString(agreementSignerName, 100)) {
            throw new Error('Agreement signer name is required for this contract flow');
          }
          if (!validateString(agreementText, 30000)) {
            throw new Error('Agreement text is required for this contract flow');
          }
          if (!validateString(agreementVersion, 50)) {
            throw new Error('Agreement version is required for this contract flow');
          }
        }

        const requiresAgreementStorage = normalizedBookingType === 'readiness-intensive' || normalizedBookingType === 'intervention-contract';

        const sanitizedData = {
          booking_type: normalizedBookingType,
          customer_name: sanitizeString(customerName),
          customer_email: customerEmail.toLowerCase().trim(),
          customer_phone: customerPhone ? sanitizeString(customerPhone).slice(0, 20) : null,
          booking_date: bookingDate,
          booking_time: bookingTime,
          duration_minutes: typeof durationMinutes === 'number' ? Math.min(Math.max(durationMinutes, 15), 180) : 60,
          status: 'confirmed',
          payment_id: paymentId || null,
          amount_cents: typeof amountCents === 'number' ? amountCents : null,
          agreement_accepted: requiresAgreementStorage ? agreementAccepted === true : false,
          agreement_signer_name: requiresAgreementStorage ? sanitizeString(agreementSignerName) : null,
          agreement_signed_at: requiresAgreementStorage ? (typeof agreementSignedAt === 'string' ? agreementSignedAt : new Date().toISOString()) : null,
          agreement_text: requiresAgreementStorage ? agreementText.trim() : null,
          agreement_version: requiresAgreementStorage ? agreementVersion.trim() : null,
          discount_code: typeof discountCode === 'string' && discountCode.trim().length > 0 ? sanitizeString(discountCode).slice(0, 40) : null,
          discount_cents: typeof discountCents === 'number' && discountCents >= 0 ? discountCents : null,
          contract_metadata: contractMetadata && typeof contractMetadata === 'object' ? contractMetadata : {},
          source_attribution: normalizedSourceAttribution,
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

        await upsertBookingCrm(supabase, booking, {
          customerName: sanitizedData.customer_name,
          customerEmail: sanitizedData.customer_email,
          customerPhone: sanitizedData.customer_phone,
          bookingType: sanitizedData.booking_type,
          sourceAttribution: normalizedSourceAttribution,
        });

        if (sanitizedData.booking_type === 'consultation') {
          await queueConsultationPrep(supabase, booking, {
            customerName: sanitizedData.customer_name,
            customerEmail: sanitizedData.customer_email,
            customerPhone: sanitizedData.customer_phone,
            sourceAttribution: normalizedSourceAttribution,
          });
        }

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

        // Sync contact to Mailchimp (async, don't block response)
        try {
          const supabaseUrl2 = Deno.env.get('SUPABASE_URL')!;
          const nameParts = (sanitizedData.customer_name || '').trim().split(/\s+/);
          const firstName = nameParts[0] || '';
          const lastName = nameParts.slice(1).join(' ') || '';

          const mcResponse = await fetch(`${supabaseUrl2}/functions/v1/add-to-mailchimp`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`
            },
            body: JSON.stringify({
              email: sanitizedData.customer_email,
              firstName,
              lastName
            })
          });

          if (mcResponse.ok) {
            console.log('Successfully synced contact to Mailchimp');
          } else {
            console.error('Failed to sync to Mailchimp:', await mcResponse.text());
          }
        } catch (mcError) {
          console.error('Error syncing to Mailchimp:', mcError);
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
