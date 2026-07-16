import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { sendResendEmail } from "../_shared/resend.ts";
import { enqueueSpineEvent } from "../_shared/spine.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SITE_URL = "https://www.freedominterventions.com";

interface AbandonedCart {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  booking_type: string;
  booking_date: string | null;
  booking_time: string | null;
  amount_cents: number;
  created_at: string;
}

function getOfferMeta(bookingType: string) {
  if (bookingType === "readiness-intensive") {
    return {
      label: "Family Readiness Intensive",
      duration: "90-minute Zoom session + 7 days of follow-up support",
      price: "$2,500",
      isPremium: true,
    };
  }
  return {
    label: "Crisis Coaching Session",
    duration: "60-minute Zoom session",
    price: "$150",
    isPremium: false,
  };
}

function buildResumeUrl(cart: AbandonedCart): string {
  const params = new URLSearchParams({
    type: cart.booking_type,
    name: cart.customer_name,
    email: cart.customer_email,
  });
  if (cart.customer_phone) params.set("phone", cart.customer_phone);
  if (cart.booking_date) params.set("date", cart.booking_date);
  if (cart.booking_time) params.set("time", cart.booking_time);
  return `${SITE_URL}/?${params.toString()}#booking`;
}

async function sendRecoveryEmail(cart: AbandonedCart): Promise<void> {
  const offer = getOfferMeta(cart.booking_type);
  const resumeUrl = buildResumeUrl(cart);

  const subject = `${cart.customer_name.split(" ")[0]}, your ${offer.label} is still waiting`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1f2937;">
      <h1 style="color: #1e40af; margin-bottom: 8px;">We saved your spot</h1>
      <p style="font-size: 16px;">Hi ${cart.customer_name.split(" ")[0]},</p>
      <p style="font-size: 16px; line-height: 1.6;">
        I noticed you started booking a <strong>${offer.label}</strong> with Freedom Interventions but didn't finish. 
        I want you to know — when families reach out, they're usually at a moment that matters. I don't want you to lose that momentum.
      </p>

      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 24px 0; border-left: 4px solid #1e40af;">
        <h2 style="color: #1e40af; margin-top: 0; font-size: 18px;">${offer.label}</h2>
        <p style="margin: 4px 0;"><strong>What you get:</strong> ${offer.duration}</p>
        <p style="margin: 4px 0;"><strong>Investment:</strong> ${offer.price}</p>
        ${cart.booking_date && cart.booking_time ? `<p style="margin: 4px 0;"><strong>Time you selected:</strong> ${cart.booking_date} at ${cart.booking_time} Pacific</p>` : ""}
      </div>

      <div style="text-align: center; margin: 32px 0;">
        <a href="${resumeUrl}" style="display: inline-block; background-color: #1e40af; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
          Complete My Booking
        </a>
      </div>

      <p style="font-size: 15px; line-height: 1.6;">
        ${offer.isPremium
          ? "The Family Readiness Intensive is the most complete preparation we offer. 90 minutes of focused planning followed by 7 days of direct access to me by phone, text, Zoom, or email — for the moments when you need to think out loud with someone who's been there."
          : "A 60-minute Crisis Coaching Session gives you and your loved ones a clear, actionable plan. Most families walk away knowing exactly what their next 48 hours need to look like."}
      </p>

      <p style="font-size: 15px; line-height: 1.6;">
        If you're unsure or have questions before booking, just reply to this email or call me directly at 
        <a href="tel:4582988000" style="color: #1e40af;">458-298-8000</a>. No pressure — I'd rather have a 5-minute conversation than have you book something that isn't the right fit.
      </p>

      <p style="font-size: 15px; margin-top: 28px;">
        — Matt Brown<br>
        <span style="color: #6b7280; font-size: 14px;">Freedom Interventions</span>
      </p>

      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0 16px;">
      <p style="font-size: 12px; color: #9ca3af; text-align: center;">
        Freedom Interventions • 458-298-8000 • matt@freedominterventions.com
      </p>
    </div>
  `;

  await sendResendEmail({
    to: cart.customer_email,
    subject,
    html,
    replyTo: "matt@freedominterventions.com",
  });
}

async function sendTelegramAlert(cart: AbandonedCart): Promise<void> {
  const token = Deno.env.get("TELEGRAM_BOT_TOKEN");
  if (!token) {
    console.log("TELEGRAM_BOT_TOKEN not set, skipping alert");
    return;
  }
  // Matt's chat ID — try common env names, fall back to bot self-resolve via getUpdates not supported here
  const chatId = Deno.env.get("TELEGRAM_CHAT_ID") || Deno.env.get("TELEGRAM_ADMIN_CHAT_ID");
  if (!chatId) {
    console.log("TELEGRAM_CHAT_ID not set, skipping alert");
    return;
  }

  const offer = getOfferMeta(cart.booking_type);
  const text =
    `🚨 *High-value abandoned cart*\n\n` +
    `*${offer.label}* (${offer.price})\n\n` +
    `*Name:* ${cart.customer_name}\n` +
    `*Email:* ${cart.customer_email}\n` +
    (cart.customer_phone ? `*Phone:* ${cart.customer_phone}\n` : "") +
    (cart.booking_date && cart.booking_time
      ? `*Selected:* ${cart.booking_date} at ${cart.booking_time} PT\n`
      : "") +
    `\nRecovery email sent. Consider a personal follow-up.`;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "Markdown",
    }),
  });
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Find pending carts at least 1 hour old, no recovery email yet
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    // Don't recover carts older than 7 days
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const { data: carts, error } = await supabase
      .from("abandoned_carts")
      .select("*")
      .eq("status", "pending")
      .lte("created_at", oneHourAgo)
      .gte("created_at", sevenDaysAgo)
      .is("recovery_email_sent_at", null);

    if (error) throw error;

    console.log(`Found ${carts?.length || 0} carts to recover`);

    const results = {
      processed: 0,
      sent: 0,
      failed: 0,
      expired: 0,
    };

    // Mark very old carts as expired
    const { error: expireError } = await supabase
      .from("abandoned_carts")
      .update({ status: "expired" })
      .eq("status", "pending")
      .lt("created_at", sevenDaysAgo);
    if (expireError) console.error("Expire error:", expireError);

    for (const cart of (carts || []) as AbandonedCart[]) {
      results.processed++;

      // Skip if customer already has a confirmed booking with same email after cart creation
      const { data: bookings } = await supabase
        .from("bookings")
        .select("id")
        .eq("customer_email", cart.customer_email)
        .gte("created_at", cart.created_at)
        .limit(1);

      if (bookings && bookings.length > 0) {
        await supabase
          .from("abandoned_carts")
          .update({ status: "recovered", recovered_at: new Date().toISOString() })
          .eq("id", cart.id);
        continue;
      }

      try {
        await sendRecoveryEmail(cart);

        // Telegram alert only for premium tier
        if (cart.booking_type === "readiness-intensive") {
          try {
            await sendTelegramAlert(cart);
          } catch (e) {
            console.error("Telegram alert failed:", e);
          }
        }

        await supabase
          .from("abandoned_carts")
          .update({
            status: "recovery_sent",
            recovery_email_sent_at: new Date().toISOString(),
          })
          .eq("id", cart.id);

        // Spine: forward cart_abandoned (additive — never blocks).
        try {
          await enqueueSpineEvent(
            "cart_abandoned",
            {
              email: cart.customer_email,
              phone: cart.customer_phone,
              name: cart.customer_name,
              props: {
                booking_type: cart.booking_type,
                amount_cents: cart.amount_cents,
              },
            },
            supabase,
          );
        } catch (spineError) {
          console.error("Spine enqueue failed (cart_abandoned):", spineError);
        }

        results.sent++;
      } catch (e) {
        console.error(`Failed to recover cart ${cart.id}:`, e);
        results.failed++;
      }
    }

    return new Response(JSON.stringify({ success: true, ...results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    console.error("recover-abandoned-carts error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
