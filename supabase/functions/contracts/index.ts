import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SQUARE_ACCESS_TOKEN = Deno.env.get("SQUARE_ACCESS_TOKEN");
const SQUARE_LOCATION_ID = Deno.env.get("SQUARE_LOCATION_ID");
const SQUARE_BASE_URL = "https://connect.squareup.com/v2";

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

function validateString(value: string, maxLength: number): boolean {
  return typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;
}

function sanitizeString(value: string): string {
  return value.trim().slice(0, 255);
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, ...params } = await req.json();
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    switch (action) {
      case "create-contract": {
        const {
          contractType,
          clientName,
          clientEmail,
          clientPhone,
          signerName,
          signedAt,
          agreementText,
          agreementVersion,
          amountCents,
          discountCode,
          discountCents,
          contractPdfPath,
          contractPdfUrl,
          metadata,
        } = params;

        if (!["intervention", "readiness-intensive"].includes(contractType)) {
          throw new Error("Valid contract type is required");
        }
        if (!validateString(clientName, 100)) throw new Error("Valid client name is required");
        if (!validateEmail(clientEmail)) throw new Error("Valid client email is required");
        if (clientPhone && !validateString(clientPhone, 25)) throw new Error("Invalid client phone");
        if (!validateString(signerName, 100)) throw new Error("Signer name is required");
        if (!validateString(agreementText, 30000)) throw new Error("Agreement text is required");
        if (!validateString(agreementVersion, 50)) throw new Error("Agreement version is required");

        const { data, error } = await supabase
          .from("contracts")
          .insert({
            contract_type: contractType,
            status: "signed-awaiting-payment",
            client_name: sanitizeString(clientName),
            client_email: clientEmail.toLowerCase().trim(),
            client_phone: clientPhone ? sanitizeString(clientPhone).slice(0, 25) : null,
            signer_name: sanitizeString(signerName),
            signed_at: typeof signedAt === "string" ? signedAt : new Date().toISOString(),
            agreement_text: agreementText.trim(),
            agreement_version: agreementVersion.trim(),
            amount_cents: typeof amountCents === "number" ? amountCents : null,
            discount_code: typeof discountCode === "string" && discountCode.trim() ? sanitizeString(discountCode).slice(0, 40) : null,
            discount_cents: typeof discountCents === "number" ? discountCents : null,
            contract_pdf_path: typeof contractPdfPath === "string" ? contractPdfPath : null,
            contract_pdf_url: typeof contractPdfUrl === "string" ? contractPdfUrl : null,
            metadata: metadata && typeof metadata === "object" ? metadata : {},
          })
          .select()
          .single();

        if (error) throw error;

        try {
          await supabase.functions.invoke("send-contract-notification", {
            body: { contractId: data.id, event: "signed" },
          });
        } catch (notifyError) {
          console.error("Failed to send signed contract notification:", notifyError);
        }

        return new Response(JSON.stringify({ success: true, contract: data }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "create-payment-link": {
        const { contractId, amount, customerEmail, customerName, redirectPath, note } = params;
        if (!validateString(contractId, 100)) throw new Error("Valid contract ID is required");
        if (typeof amount !== "number" || amount <= 0 || amount > 1000000) throw new Error("Invalid payment amount");
        if (!validateEmail(customerEmail)) throw new Error("Invalid email address");
        if (!validateString(customerName, 100)) throw new Error("Invalid customer name");

        const origin = req.headers.get("origin") || "https://freedominterventions.com";
        const successUrl = new URL(redirectPath || "/start-contract?contract_status=success", origin);
        successUrl.searchParams.set("contract_id", contractId);

        const checkoutResponse = await fetch(`${SQUARE_BASE_URL}/online-checkout/payment-links`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${SQUARE_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
            "Square-Version": "2024-01-18",
          },
          body: JSON.stringify({
            idempotency_key: crypto.randomUUID(),
            quick_pay: {
              name: "Intervention Agreement",
              price_money: { amount, currency: "USD" },
              location_id: SQUARE_LOCATION_ID,
            },
            checkout_options: {
              redirect_url: successUrl.toString(),
              ask_for_shipping_address: false,
            },
            pre_populated_data: {
              buyer_email: customerEmail.toLowerCase().trim(),
            },
            description: note || `Intervention Agreement for ${sanitizeString(customerName)}`,
          }),
        });

        const checkoutData = await checkoutResponse.json();
        if (checkoutData.errors) {
          throw new Error(checkoutData.errors[0]?.detail || "Failed to create contract payment link");
        }

        const paymentLinkId = checkoutData.payment_link?.id ?? null;
        await supabase
          .from("contracts")
          .update({ payment_link_id: paymentLinkId })
          .eq("id", contractId);

        return new Response(JSON.stringify({
          success: true,
          contractId,
          checkoutUrl: checkoutData.payment_link?.url,
          paymentLinkId,
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "mark-paid": {
        const { contractId, paymentId } = params;
        if (!validateString(contractId, 100)) throw new Error("Valid contract ID is required");

        const { error } = await supabase
          .from("contracts")
          .update({
            status: "paid",
            payment_id: typeof paymentId === "string" ? sanitizeString(paymentId).slice(0, 200) : null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", contractId);

        if (error) throw error;

        try {
          await supabase.functions.invoke("send-contract-notification", {
            body: { contractId, event: "paid" },
          });
        } catch (notifyError) {
          console.error("Failed to send paid contract notification:", notifyError);
        }

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      default:
        throw new Error(`Unsupported action: ${action}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in contracts function:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
