import { bookingMaintenanceGate, maintenanceHeaders } from "../_shared/bookingMaintenance.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { sendOwnerAlert } from "../_shared/ownerAlert.ts";

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

// Contract statuses that may still be paid (create-contract inserts 'signed-awaiting-payment';
// 'signed' is the column default). Never 'paid' or 'cancelled'.
const UNPAID_CONTRACT_STATUSES = ["signed", "signed-awaiting-payment"];
// Fixed website prices (crisis coaching, Readiness Intensive). An unmatched payment
// at one of these amounts is almost certainly a website booking that didn't link
// up; other unmatched payments (invoices, in-person) are left alone.
const WEBSITE_FIXED_FEES_CENTS = new Set([15000, 250000]);
const formatUsd = (cents: unknown) => typeof cents === "number" ? `$${(cents / 100).toFixed(2)}` : String(cents);

function timingSafeEqual(a: string, b: string) {
  const aBytes = new TextEncoder().encode(a);
  const bBytes = new TextEncoder().encode(b);
  if (aBytes.length !== bBytes.length) return false;
  let result = 0;
  for (let i = 0; i < aBytes.length; i++) result |= aBytes[i] ^ bBytes[i];
  return result === 0;
}

export const handler = async (req: Request, clientFactory = createClient): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response(null, { headers: { ...corsHeaders, ...maintenanceHeaders } });
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

  const maintenance = await bookingMaintenanceGate(
    () => clientFactory(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!), corsHeaders);
  if (maintenance) return maintenance;

  let alertOrderId: string | undefined;
  try {
    const event = JSON.parse(rawBody);
    const payment = event?.data?.object?.payment;
    const orderId = payment?.order_id;
    const paymentId = payment?.id;
    const status = payment?.status;
    const amount = payment?.amount_money?.amount;
    const refundedAmount = payment?.refunded_money?.amount;
    alertOrderId = typeof orderId === "string" ? orderId : undefined;

    if (!orderId || status !== "COMPLETED" || typeof amount !== "number") {
      return new Response(JSON.stringify({ success: true, ignored: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    // A refunded payment stays COMPLETED in Square; never (re)confirm or fulfill from it.
    if (typeof refundedAmount === "number" && refundedAmount > 0) {
      return new Response(JSON.stringify({ success: true, ignored: true, refunded: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = clientFactory(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const fulfillmentFailures: string[] = [];

    const { data: contract, error: contractLookupError } = await supabase
      .from("contracts")
      .select("id, amount_cents, status")
      .eq("square_order_id", orderId)
      .maybeSingle();
    if (contractLookupError) throw contractLookupError;

    const contractMatches = Boolean(
      contract &&
      contract.amount_cents === amount &&
      (UNPAID_CONTRACT_STATUSES.includes(contract.status) || contract.status === "paid")
    );
    if (contract && contractMatches) {
      // Already paid: only re-run the retry-safe fulfillment (Readiness Intensive booking +
      // Zoom confirmation) so a webhook retry can finish what a failed run left undone.
      let idempotentOnly = true;
      if (UNPAID_CONTRACT_STATUSES.includes(contract.status)) {
        // Conditional flip, only from an unpaid status (never revives a cancelled contract):
        // only the path that actually marks it paid (this webhook or the browser's contracts
        // mark-paid) sends the paid notification + Spine payment event, exactly once.
        const { data: flipped, error } = await supabase
          .from("contracts")
          .update({
            status: "paid",
            payment_id: paymentId || null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", contract.id)
          .in("status", UNPAID_CONTRACT_STATUSES)
          .select("id");
        if (error) throw error;
        idempotentOnly = !(flipped && flipped.length > 0);
      }
      const { error: fulfillError } = await supabase.functions.invoke("contracts", {
        body: { action: "fulfill-paid-contract", contractId: contract.id, idempotentOnly },
      });
      if (fulfillError) {
        console.error("Contract fulfillment failed:", contract.id, fulfillError);
        fulfillmentFailures.push(`contract ${contract.id}`);
      }
    }

    const { data: booking, error: bookingLookupError } = await supabase
      .from("bookings")
      .select("id, amount_cents, status")
      .eq("square_order_id", orderId)
      .maybeSingle();
    if (bookingLookupError) throw bookingLookupError;

    const bookingMatches = Boolean(
      booking &&
      booking.amount_cents === amount &&
      (booking.status === "pending" || booking.status === "confirmed")
    );
    if (booking && bookingMatches) {
      let idempotentOnly = true;
      if (booking.status === "pending") {
        // Only from the checkout's pending status: a cancelled/completed booking is never revived.
        const { data: flipped, error } = await supabase
          .from("bookings")
          .update({
            status: "confirmed",
            payment_id: paymentId || null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", booking.id)
          .eq("status", "pending")
          .select("id");
        if (error) throw error;
        idempotentOnly = !(flipped && flipped.length > 0);
      }
      // Full run: Zoom confirmation, Spine payment event, abandoned-cart recovery.
      // idempotentOnly: just the Zoom confirmation (skips if already sent) + cart recovery.
      const { error: fulfillError } = await supabase.functions.invoke("square-booking", {
        body: { action: "fulfill-paid-booking", bookingId: booking.id, idempotentOnly },
      });
      if (fulfillError) {
        console.error("Booking fulfillment failed:", booking.id, fulfillError);
        fulfillmentFailures.push(`booking ${booking.id}`);
      }
    }

    if (!contractMatches && !bookingMatches) {
      const row = contract
        ? { type: "contract", id: contract.id, amount: contract.amount_cents, status: contract.status }
        : booking
        ? { type: "booking", id: booking.id, amount: booking.amount_cents, status: booking.status }
        : null;
      if (row || WEBSITE_FIXED_FEES_CENTS.has(amount)) {
        await sendOwnerAlert(supabase, {
          key: `webhook-unmatched:${orderId}`,
          subject: row
            ? `Square payment of ${formatUsd(amount)} didn't match its ${row.type} (amount or status)`
            : `Square payment of ${formatUsd(amount)} isn't linked to any website booking`,
          details: {
            "Square order": orderId,
            "Square payment": paymentId,
            "Amount paid": formatUsd(amount),
            [`${row?.type ?? "record"} id`]: row?.id,
            [`${row?.type ?? "record"} expected amount`]: row ? formatUsd(row.amount) : undefined,
            [`${row?.type ?? "record"} status`]: row?.status,
          },
          action: "A family may have paid without getting a confirmation. Look up the payment in Square, contact the payer, and confirm or refund.",
        });
      }
    }

    // 5xx makes Square retry; the retry takes the idempotent path above.
    if (fulfillmentFailures.length > 0) {
      await sendOwnerAlert(supabase, {
        key: `webhook-fulfill:${orderId}`,
        subject: "Paid booking couldn't be fully confirmed",
        details: {
          "Square order": orderId,
          "Square payment": paymentId,
          "Amount paid": formatUsd(amount),
          "Failed": fulfillmentFailures.join(", "),
        },
        action: "Square will retry automatically. If the family hasn't received a confirmation or Zoom link within the hour, contact them directly.",
      });
      return new Response(JSON.stringify({ error: `Fulfillment failed: ${fulfillmentFailures.join(", ")}` }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    try {
      await sendOwnerAlert(
        clientFactory(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!),
        {
          key: `webhook-error:${alertOrderId ?? "unknown"}`,
          subject: "Square payment webhook failed",
          details: { "Square order": alertOrderId, Error: message.slice(0, 300) },
          action: "Square will retry automatically. If this repeats, check the payment in Square and the square-webhook logs in Supabase.",
        },
      );
    } catch (alertError) {
      console.error("square-webhook alert failed:", alertError);
    }
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

if (import.meta.main) serve((req) => handler(req));
