import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { enqueueSpineEvent } from "../_shared/spine.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-square-hmacsha256-signature",
};

async function hmacSha256Base64(secret: string, message: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return btoa(String.fromCharCode(...new Uint8Array(signature)));
}

function timingSafeEqual(a: string, b: string) {
  const aBytes = new TextEncoder().encode(a);
  const bBytes = new TextEncoder().encode(b);
  if (aBytes.length !== bBytes.length) return false;
  let result = 0;
  for (let i = 0; i < aBytes.length; i++) result |= aBytes[i] ^ bBytes[i];
  return result === 0;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const rawBody = await req.text();
  const signature = req.headers.get("x-square-hmacsha256-signature") || "";
  const signatureKey = Deno.env.get("SQUARE_WEBHOOK_SIGNATURE_KEY");
  const notificationUrl = Deno.env.get("SQUARE_WEBHOOK_NOTIFICATION_URL");

  if (!signatureKey || !notificationUrl) {
    return new Response(JSON.stringify({ error: "Square webhook verification is not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const expectedSignature = await hmacSha256Base64(signatureKey, `${notificationUrl}${rawBody}`);
  if (!timingSafeEqual(signature, expectedSignature)) {
    return new Response(JSON.stringify({ error: "Invalid Square webhook signature" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const event = JSON.parse(rawBody);
    const payment = event?.data?.object?.payment;
    const orderId = payment?.order_id;
    const paymentId = payment?.id;
    const status = payment?.status;
    const amount = payment?.amount_money?.amount;

    if (!orderId || status !== "COMPLETED" || typeof amount !== "number") {
      return new Response(JSON.stringify({ success: true, ignored: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    const { data: contract } = await supabase
      .from("contracts")
      .select("id, amount_cents, status")
      .eq("square_order_id", orderId)
      .maybeSingle();

    if (contract && contract.status !== "paid" && contract.amount_cents === amount) {
      const { error } = await supabase
        .from("contracts")
        .update({
          status: "paid",
          payment_id: paymentId || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", contract.id);
      if (error) throw error;
      await supabase.functions.invoke("send-contract-notification", {
        body: { contractId: contract.id, event: "paid" },
      }).catch((error) => console.error("Contract paid notification failed:", error));
    }

    const { data: booking } = await supabase
      .from("bookings")
      .select("id, amount_cents, status, customer_name, customer_email, booking_type, booking_date, booking_time, duration_minutes")
      .eq("square_order_id", orderId)
      .maybeSingle();

    if (booking && booking.status !== "confirmed" && booking.amount_cents === amount) {
      const { error } = await supabase
        .from("bookings")
        .update({
          status: "confirmed",
          payment_id: paymentId || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", booking.id);
      if (error) throw error;
      await supabase.functions.invoke("send-booking-confirmation", {
        body: {
          bookingId: booking.id,
          customerName: booking.customer_name,
          customerEmail: booking.customer_email,
          bookingType: booking.booking_type,
          bookingDate: booking.booking_date,
          bookingTime: booking.booking_time,
          durationMinutes: booking.duration_minutes,
        },
      }).catch((error) => console.error("Booking confirmation failed:", error));
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
