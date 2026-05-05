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
const STANDARD_INTERVENTION_FEE_CENTS = 950000;
const READINESS_INTENSIVE_FEE_CENTS = 250000;
const INTERVENTION_DISCOUNT_CODES: Record<string, number> = {
  SAVE500: 50000,
  SAVE1000: 100000,
  SAVE1500: 150000,
  SAVE2000: 200000,
  SAVE2500: 250000,
};

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

function normalizeAttribution(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

async function upsertContractCrm(
  supabase: ReturnType<typeof createClient>,
  contract: { id: string },
  payload: {
    clientName: string;
    clientEmail: string;
    clientPhone: string | null;
    contractType: string;
    sourceAttribution: Record<string, unknown>;
  }
) {
  const nameParts = payload.clientName.trim().split(/\s+/);
  const firstName = nameParts[0] || null;
  const lastName = nameParts.slice(1).join(" ") || null;
  await supabase.from("crm_contacts").upsert({
    email: payload.clientEmail,
    first_name: firstName,
    last_name: lastName,
    phone: payload.clientPhone,
    source: "contract",
    source_id: contract.id,
    source_attribution: payload.sourceAttribution,
    lead_score: payload.contractType === "intervention" ? 100 : 95,
    revenue_path: payload.contractType === "intervention" ? "intervention_contract" : "family_readiness_intensive",
    pipeline_status: "contract_signed",
    next_action: "Confirm payment and prepare fulfillment",
    next_action_due_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    last_engagement_at: new Date().toISOString(),
  }, { onConflict: "email" });
}

function normalizeDiscountCode(code: unknown): string {
  return typeof code === "string" ? code.trim().toUpperCase() : "";
}

async function resolveContractAmount(supabase: ReturnType<typeof createClient>, contractType: string, discountCode: unknown, clientEmail?: string) {
  if (contractType === "readiness-intensive") {
    return {
      amountCents: READINESS_INTENSIVE_FEE_CENTS,
      baseAmountCents: READINESS_INTENSIVE_FEE_CENTS,
      discountCode: null,
      discountCents: 0,
      discountCodeId: null,
    };
  }

  const normalizedDiscountCode = normalizeDiscountCode(discountCode);
  if (normalizedDiscountCode) {
    const { data: dynamicCode } = await supabase
      .from("discount_codes")
      .select("id, code, base_amount_cents, amount_cents, issued_to_email, expires_at, used_at")
      .eq("code", normalizedDiscountCode)
      .maybeSingle();

    if (dynamicCode && !dynamicCode.used_at) {
      const isExpired = dynamicCode.expires_at && new Date(dynamicCode.expires_at).getTime() < Date.now();
      const emailMatches = !dynamicCode.issued_to_email || !clientEmail || dynamicCode.issued_to_email.toLowerCase().trim() === clientEmail.toLowerCase().trim();
      if (!isExpired && emailMatches) {
        const baseAmountCents = typeof dynamicCode.base_amount_cents === "number" ? dynamicCode.base_amount_cents : STANDARD_INTERVENTION_FEE_CENTS;
        const discountCents = Math.min(dynamicCode.amount_cents, baseAmountCents - 1);
        return {
          amountCents: Math.max(baseAmountCents - discountCents, 0),
          baseAmountCents,
          discountCode: dynamicCode.code,
          discountCents,
          discountCodeId: dynamicCode.id,
        };
      }
    }
  }

  const discountCents = INTERVENTION_DISCOUNT_CODES[normalizedDiscountCode] ?? 0;
  return {
    amountCents: Math.max(STANDARD_INTERVENTION_FEE_CENTS - discountCents, 0),
    baseAmountCents: STANDARD_INTERVENTION_FEE_CENTS,
    discountCode: discountCents > 0 ? normalizedDiscountCode : null,
    discountCents,
    discountCodeId: null,
  };
}

function formatUsdFromCents(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

async function verifySquareOrderPaid(orderId: string, expectedAmountCents: number) {
  if (!SQUARE_ACCESS_TOKEN) throw new Error("Square access token is not configured");
  if (!SQUARE_LOCATION_ID) throw new Error("Square location ID is not configured");

  const orderResponse = await fetch(`${SQUARE_BASE_URL}/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${SQUARE_ACCESS_TOKEN}`,
      "Square-Version": "2024-01-18",
    },
  });
  const orderData = await orderResponse.json();
  if (!orderResponse.ok || orderData.errors) {
    throw new Error(orderData.errors?.[0]?.detail || "Could not verify Square order");
  }

  const order = orderData.order;
  const orderAmount = order?.total_money?.amount;
  const locationMatches = !order?.location_id || order.location_id === SQUARE_LOCATION_ID;
  const amountMatches = typeof orderAmount === "number" && orderAmount === expectedAmountCents;
  const isComplete = order?.state === "COMPLETED";

  return {
    paid: Boolean(locationMatches && amountMatches && isComplete),
    order,
  };
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
          discountCode,
          contractPdfPath,
          contractPdfBase64,
          metadata,
          sourceAttribution,
        } = params;
        const normalizedSourceAttribution = normalizeAttribution(sourceAttribution);

        if (!["intervention", "readiness-intensive"].includes(contractType)) {
          throw new Error("Valid contract type is required");
        }
        if (!validateString(clientName, 100)) throw new Error("Valid client name is required");
        if (!validateEmail(clientEmail)) throw new Error("Valid client email is required");
        if (clientPhone && !validateString(clientPhone, 25)) throw new Error("Invalid client phone");
        if (!validateString(signerName, 100)) throw new Error("Signer name is required");
        if (!validateString(agreementText, 30000)) throw new Error("Agreement text is required");
        if (!validateString(agreementVersion, 50)) throw new Error("Agreement version is required");
        const resolvedAmount = await resolveContractAmount(supabase, contractType, discountCode, clientEmail);
        if (contractType === "intervention" && !agreementText.includes(`Base Intervention Fee: ${formatUsdFromCents(resolvedAmount.baseAmountCents)}`)) {
          throw new Error("Agreement base amount does not match approved contract amount");
        }
        if (contractType === "intervention" && !agreementText.includes(`Final Intervention Fee Due: ${formatUsdFromCents(resolvedAmount.amountCents)}`)) {
          throw new Error("Agreement amount does not match approved contract amount");
        }

        const contractId = crypto.randomUUID();
        const resolvedPdfPath = typeof contractPdfPath === "string" && contractPdfPath.trim() ? contractPdfPath : `${contractType}/${contractId}.pdf`;

        if (typeof contractPdfBase64 === "string" && contractPdfBase64.trim()) {
          const binaryString = atob(contractPdfBase64);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);

          const { error: uploadError } = await supabase.storage
            .from("contracts")
            .upload(resolvedPdfPath, bytes, {
              contentType: "application/pdf",
              upsert: false,
            });
          if (uploadError) throw uploadError;
        }

        const { data, error } = await supabase
          .from("contracts")
          .insert({
            id: contractId,
            contract_type: contractType,
            status: "signed-awaiting-payment",
            client_name: sanitizeString(clientName),
            client_email: clientEmail.toLowerCase().trim(),
            client_phone: clientPhone ? sanitizeString(clientPhone).slice(0, 25) : null,
            signer_name: sanitizeString(signerName),
            signed_at: typeof signedAt === "string" ? signedAt : new Date().toISOString(),
            agreement_text: agreementText.trim(),
            agreement_version: agreementVersion.trim(),
            amount_cents: resolvedAmount.amountCents,
            discount_code: resolvedAmount.discountCode,
            discount_cents: resolvedAmount.discountCents,
            contract_pdf_path: resolvedPdfPath,
            contract_pdf_url: null,
            metadata: metadata && typeof metadata === "object" ? metadata : {},
            source_attribution: normalizedSourceAttribution,
          })
          .select()
          .single();

        if (error) throw error;

        await upsertContractCrm(supabase, data, {
          clientName: sanitizeString(clientName),
          clientEmail: clientEmail.toLowerCase().trim(),
          clientPhone: clientPhone ? sanitizeString(clientPhone).slice(0, 25) : null,
          contractType,
          sourceAttribution: normalizedSourceAttribution,
        });

        if (resolvedAmount.discountCodeId) {
          const { error: claimError } = await supabase
            .from("discount_codes")
            .update({
              used_at: new Date().toISOString(),
              used_by_email: clientEmail.toLowerCase().trim(),
              used_by_contract_id: data.id,
            })
            .eq("id", resolvedAmount.discountCodeId)
            .is("used_at", null)
            .select("id")
            .single();
          if (claimError) {
            await supabase.from("contracts").delete().eq("id", data.id);
            if (resolvedPdfPath) await supabase.storage.from("contracts").remove([resolvedPdfPath]);
            throw new Error("This discount code was already used. Please refresh and try again.");
          }
        }

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

      case "validate-discount-code": {
        const { contractType = "intervention", discountCode, clientEmail } = params;
        if (!["intervention", "readiness-intensive"].includes(contractType)) throw new Error("Valid contract type is required");
        if (clientEmail && !validateEmail(clientEmail)) throw new Error("Invalid email address");
        const resolvedAmount = await resolveContractAmount(supabase, contractType, discountCode, clientEmail);
        return new Response(JSON.stringify({
          success: true,
          baseAmountCents: resolvedAmount.baseAmountCents,
          discountCode: resolvedAmount.discountCode,
          discountCents: resolvedAmount.discountCents,
          finalAmountCents: resolvedAmount.amountCents,
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "create-payment-link": {
        const { contractId, customerEmail, customerName, redirectPath, note } = params;
        if (!validateString(contractId, 100)) throw new Error("Valid contract ID is required");
        if (!validateEmail(customerEmail)) throw new Error("Invalid email address");
        if (!validateString(customerName, 100)) throw new Error("Invalid customer name");

        const { data: contract, error: contractError } = await supabase
          .from("contracts")
          .select("id, contract_type, amount_cents, client_email, client_name, status")
          .eq("id", contractId)
          .single();
        if (contractError || !contract) throw contractError || new Error("Contract not found");
        if (contract.status === "paid") throw new Error("Contract has already been paid");
        if (contract.client_email !== customerEmail.toLowerCase().trim()) throw new Error("Customer email does not match this contract");
        if (typeof contract.amount_cents !== "number" || contract.amount_cents <= 0) throw new Error("Contract amount is invalid");

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
              name: contract.contract_type === "readiness-intensive" ? "Family Readiness Intensive" : "Intervention Agreement",
              price_money: { amount: contract.amount_cents, currency: "USD" },
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
        const squareOrderId = checkoutData.payment_link?.order_id ?? null;
        await supabase
          .from("contracts")
          .update({
            payment_link_id: paymentLinkId,
            square_order_id: squareOrderId,
            updated_at: new Date().toISOString(),
          })
          .eq("id", contractId);

        return new Response(JSON.stringify({
          success: true,
          contractId,
          checkoutUrl: checkoutData.payment_link?.url,
          paymentLinkId,
          squareOrderId,
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "mark-paid": {
        const { contractId, paymentId } = params;
        if (!validateString(contractId, 100)) throw new Error("Valid contract ID is required");

        const { data: contract, error: contractError } = await supabase
          .from("contracts")
          .select("id, amount_cents, square_order_id, status")
          .eq("id", contractId)
          .single();
        if (contractError || !contract) throw contractError || new Error("Contract not found");
        if (contract.status === "paid") {
          return new Response(JSON.stringify({ success: true, alreadyPaid: true }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        if (!contract.square_order_id) throw new Error("Square order ID is missing for this contract");
        if (typeof contract.amount_cents !== "number" || contract.amount_cents <= 0) throw new Error("Contract amount is invalid");

        const verification = await verifySquareOrderPaid(contract.square_order_id, contract.amount_cents);
        if (!verification.paid) {
          return new Response(JSON.stringify({ success: false, paid: false }), {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        const verifiedPaymentId = paymentId || verification.order?.tenders?.[0]?.payment_id || verification.order?.tenders?.[0]?.id || null;

        const { error } = await supabase
          .from("contracts")
          .update({
            status: "paid",
            payment_id: typeof verifiedPaymentId === "string" ? sanitizeString(verifiedPaymentId).slice(0, 200) : null,
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
