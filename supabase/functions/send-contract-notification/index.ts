import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { escapeHtml } from "../_shared/resend.ts";
import { isServiceRoleRequest, unauthorized } from "../_shared/auth.ts";

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

  // Only our own Edge Functions (service-role bearer) may trigger contract emails.
  if (!(await isServiceRoleRequest(req))) {
    return unauthorized(corsHeaders);
  }

  try {
    const { contractId, event }: ContractNotificationRequest = await req.json();
    if (!contractId || (event !== "signed" && event !== "paid")) throw new Error("contractId and a valid event are required");

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
    if (event === "paid" && contract.status !== "paid") {
      return new Response(JSON.stringify({ error: "Contract is not paid" }), {
        status: 409,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Only trust the server-built storage path (`${type}/${id}.pdf`). Older rows used a
    // client-chosen path; accept those only if they look like a contract PDF and no other
    // contract points at the same object.
    let trustedPdfPath: string | null = null;
    if (contract.contract_pdf_path) {
      const expectedPath = `${contract.contract_type}/${contract.id}.pdf`;
      if (contract.contract_pdf_path === expectedPath) {
        trustedPdfPath = expectedPath;
      } else if (/^(fri|intervention|readiness-intensive)\/[0-9a-f-]{36}\.pdf$/i.test(contract.contract_pdf_path)) {
        const { data: sharing } = await supabase
          .from("contracts")
          .select("id")
          .eq("contract_pdf_path", contract.contract_pdf_path)
          .neq("id", contract.id)
          .limit(1);
        if (!sharing || sharing.length === 0) trustedPdfPath = contract.contract_pdf_path;
      }
      if (!trustedPdfPath) console.warn("Ignoring untrusted contract_pdf_path for contract", contract.id);
    }

    const displayType = contract.contract_type === "intervention" ? "Intervention Contract" : "Family Readiness Intensive";
    const amountLabel = typeof contract.amount_cents === "number" ? `$${(contract.amount_cents / 100).toLocaleString()}` : "Unspecified";

    const signerNameForSubject = String(contract.signer_name ?? "").replace(/[\r\n]+/g, " ");
    const adminSubject = event === "signed"
      ? `${displayType} signed by ${signerNameForSubject}`
      : `${displayType} paid by ${signerNameForSubject}`;
    let contractPdfSignedUrl: string | null = null;
    if (trustedPdfPath) {
      const { data: signedPdf } = await supabase.storage
        .from("contracts")
        .createSignedUrl(trustedPdfPath, 60 * 60 * 24 * 7);
      contractPdfSignedUrl = signedPdf?.signedUrl ?? null;
    }

    const signedAtLabel = new Date(contract.signed_at).toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
    const adminHtml = `
      <h2>${displayType} ${event === "signed" ? "Signed" : "Paid"}</h2>
      <p><strong>Signer:</strong> ${escapeHtml(contract.signer_name)}</p>
      <p><strong>Client:</strong> ${escapeHtml(contract.client_name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(contract.client_email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(contract.client_phone || "Not provided")}</p>
      <p><strong>Signed at:</strong> ${escapeHtml(signedAtLabel)} (Pacific)</p>
      <p><strong>Amount:</strong> ${escapeHtml(amountLabel)}</p>
      <p><strong>Status:</strong> ${escapeHtml(contract.status)}</p>
      ${contract.discount_code ? `<p><strong>Discount code:</strong> ${escapeHtml(contract.discount_code)}</p>` : ""}
      ${contract.payment_id ? `<p><strong>Payment ID:</strong> ${escapeHtml(contract.payment_id)}</p>` : ""}
      ${contractPdfSignedUrl ? `<p><a href="${escapeHtml(contractPdfSignedUrl)}">Open signed PDF</a></p>` : ""}
    `;

    await sendEmail({
      personalizations: [{ to: [{ email: ADMIN_EMAIL }] }],
      from: { email: FROM_EMAIL, name: FROM_NAME },
      subject: adminSubject,
      content: [{ type: "text/html", value: adminHtml }],
    });

    if (event === "paid") {
      let pdfAttachment: { content: string; filename: string; type: string; disposition: string } | undefined;

      if (trustedPdfPath) {
        const { data: fileData, error: downloadError } = await supabase.storage
          .from("contracts")
          .download(trustedPdfPath);

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
        <p>Hi ${escapeHtml(contract.signer_name)},</p>
        <p>Thanks — we received your signed agreement and payment.</p>
        ${pdfAttachment
          ? "<p>Attached is a copy of your signed PDF document for your records.</p>"
          : "<p>If you would like a copy of your signed agreement, just reply to this email.</p>"}
        <p><strong>Amount paid:</strong> ${escapeHtml(amountLabel)}</p>
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
