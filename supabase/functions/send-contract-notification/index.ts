import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ADMIN_EMAIL = "matt@freedominterventions.com";
const FROM_EMAIL = "noreply@freedominterventions.com";
const FROM_NAME = "Freedom Interventions";

type ContractNotificationRequest = {
  contractId: string;
  event: "signed" | "paid";
};

async function sendEmail(payload: Record<string, unknown>) {
  const sendgridApiKey = Deno.env.get("SENDGRID_API_KEY");
  if (!sendgridApiKey) throw new Error("SENDGRID_API_KEY not configured");

  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sendgridApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`SendGrid failed: ${response.status} - ${errorText}`);
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { contractId, event }: ContractNotificationRequest = await req.json();
    if (!contractId || !event) throw new Error("contractId and event are required");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: contract, error } = await supabase
      .from("contracts")
      .select("id, contract_type, status, client_name, client_email, client_phone, signer_name, signed_at, amount_cents, discount_code, discount_cents, payment_id, contract_pdf_path, contract_pdf_url")
      .eq("id", contractId)
      .single();

    if (error || !contract) throw error || new Error("Contract not found");

    const displayType = contract.contract_type === "intervention" ? "Intervention Contract" : "Family Readiness Intensive";
    const amountLabel = typeof contract.amount_cents === "number" ? `$${(contract.amount_cents / 100).toLocaleString()}` : "Unspecified";

    const adminSubject = event === "signed"
      ? `${displayType} signed by ${contract.signer_name}`
      : `${displayType} paid by ${contract.signer_name}`;

    const adminHtml = `
      <h2>${displayType} ${event === "signed" ? "Signed" : "Paid"}</h2>
      <p><strong>Signer:</strong> ${contract.signer_name}</p>
      <p><strong>Client:</strong> ${contract.client_name}</p>
      <p><strong>Email:</strong> ${contract.client_email}</p>
      <p><strong>Phone:</strong> ${contract.client_phone || "Not provided"}</p>
      <p><strong>Signed at:</strong> ${new Date(contract.signed_at).toLocaleString()}</p>
      <p><strong>Amount:</strong> ${amountLabel}</p>
      <p><strong>Status:</strong> ${contract.status}</p>
      ${contract.discount_code ? `<p><strong>Discount code:</strong> ${contract.discount_code}</p>` : ""}
      ${contract.payment_id ? `<p><strong>Payment ID:</strong> ${contract.payment_id}</p>` : ""}
      ${contract.contract_pdf_url ? `<p><a href="${contract.contract_pdf_url}">Open signed PDF</a></p>` : ""}
    `;

    await sendEmail({
      personalizations: [{ to: [{ email: ADMIN_EMAIL }] }],
      from: { email: FROM_EMAIL, name: FROM_NAME },
      subject: adminSubject,
      content: [{ type: "text/html", value: adminHtml }],
    });

    if (event === "paid") {
      let pdfAttachment: { content: string; filename: string; type: string; disposition: string } | undefined;

      if (contract.contract_pdf_path) {
        const { data: fileData, error: downloadError } = await supabase.storage
          .from("contracts")
          .download(contract.contract_pdf_path);

        if (!downloadError && fileData) {
          const buffer = await fileData.arrayBuffer();
          const bytes = new Uint8Array(buffer);
          let binary = "";
          for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
          pdfAttachment = {
            content: btoa(binary),
            filename: `${contract.contract_type}-${contract.id}.pdf`,
            type: "application/pdf",
            disposition: "attachment",
          };
        }
      }

      const signerHtml = `
        <h2>Your signed ${displayType}</h2>
        <p>Hi ${contract.signer_name},</p>
        <p>Thanks — we received your signed agreement and payment.</p>
        <p>Attached is a copy of your signed PDF document for your records.</p>
        <p><strong>Amount paid:</strong> ${amountLabel}</p>
        <p>If you need anything, reply to this email or contact Freedom Interventions.</p>
      `;

      await sendEmail({
        personalizations: [{ to: [{ email: contract.client_email, name: contract.client_name }] }],
        from: { email: FROM_EMAIL, name: FROM_NAME },
        subject: `Your signed ${displayType}`,
        content: [{ type: "text/html", value: signerHtml }],
        attachments: pdfAttachment ? [pdfAttachment] : undefined,
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("send-contract-notification error:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
