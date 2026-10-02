import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { enqueueSpineEvent } from "../_shared/spine.ts";
import { isServiceRoleRequest, unauthorized } from "../_shared/auth.ts";
import { upsertCrmContact } from "../_shared/crm.ts";
import { checkRateLimit, getClientIp } from "../_shared/rateLimit.ts";
import { escapeHtml, sendSystemEmail } from "../_shared/resend.ts";

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
const READINESS_INTENSIVE_DURATION_MINUTES = 90;
const MAX_CONTRACT_PDF_BYTES = 10 * 1024 * 1024;
const SITE_URL = "https://freedominterventions.com";
// Statuses a contract can be paid from (create-contract inserts 'signed-awaiting-payment';
// 'signed' is the column default). A 'paid' or 'cancelled' contract is never flipped.
const UNPAID_CONTRACT_STATUSES = ["signed", "signed-awaiting-payment"];
const CHECKOUT_TRACKING_ERROR = "We could not start checkout. Please try again, or call (458) 298-8000.";
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}(:\d{2})?$/;
const PACIFIC_TZ = "America/Los_Angeles";
const OWNER_ALERT_EMAIL = "matt@freedominterventions.com";
// Same marker square-booking uses; send-booking-confirmation keeps it with the Zoom details.
const SLOT_CONFLICT_MARKER = "⚠️ SLOT CONFLICT – needs reschedule";
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
  supabase: any,
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
  try {
    const { error } = await upsertCrmContact(supabase, {
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
    });
    if (error) console.error("CRM upsert failed for contract", contract.id, error);
  } catch (crmError) {
    console.error("CRM upsert threw for contract", contract.id, crmError);
  }
}

// Only redirect Square checkout back to our own site (or a Lovable preview / local dev).
function resolveRedirectOrigin(req: Request): string {
  const origin = req.headers.get("origin");
  if (!origin) return SITE_URL;
  try {
    const url = new URL(origin);
    const host = url.hostname.toLowerCase();
    if (url.protocol === "https:" && (
      host === "freedominterventions.com" ||
      host === "www.freedominterventions.com" ||
      host.endsWith(".lovable.app") ||
      host.endsWith(".lovableproject.com")
    )) return url.origin;
    if (url.protocol === "http:" && (host === "localhost" || host === "127.0.0.1")) return url.origin;
  } catch {
    // fall through
  }
  return SITE_URL;
}

// A client-supplied redirect must be a same-site path, never an absolute/protocol-relative URL.
function safeRedirectPath(path: unknown, fallback: string): string {
  if (typeof path !== "string" || !path.startsWith("/") || path.startsWith("//") || path.includes("\\")) {
    return fallback;
  }
  return path;
}

// Decodes the client-generated contract PDF and checks it really is a reasonably sized PDF.
function decodeContractPdf(base64: string): Uint8Array {
  const cleaned = base64.replace(/\s+/g, "");
  if (cleaned.length > Math.ceil(MAX_CONTRACT_PDF_BYTES / 3) * 4 + 4) {
    throw new Error("Contract PDF is too large");
  }
  let binaryString: string;
  try {
    binaryString = atob(cleaned);
  } catch {
    throw new Error("Contract PDF is not valid");
  }
  if (binaryString.length === 0 || binaryString.length > MAX_CONTRACT_PDF_BYTES) {
    throw new Error("Contract PDF is too large");
  }
  if (!binaryString.startsWith("%PDF")) throw new Error("Contract PDF is not valid");
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
  return bytes;
}

// Minutes Pacific time is offset from UTC at the given instant (e.g. -420 during PDT).
function pacificOffsetMinutes(at: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: PACIFIC_TZ,
    hourCycle: "h23",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  }).formatToParts(at);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour") % 24, get("minute"), get("second"));
  return Math.round((asUtc - at.getTime()) / 60000);
}

// Bookings store Pacific wall-clock date/time; convert to the real instant (DST-aware).
function pacificWallTimeToInstant(date: string, time: string): Date {
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  const wallAsUtc = Date.UTC(y, m - 1, d, hh, mm);
  let offset = pacificOffsetMinutes(new Date(wallAsUtc));
  let instant = wallAsUtc - offset * 60000;
  const corrected = pacificOffsetMinutes(new Date(instant));
  if (corrected !== offset) {
    offset = corrected;
    instant = wallAsUtc - offset * 60000;
  }
  return new Date(instant);
}

type ConflictingBooking = {
  id: string;
  booking_type: string;
  booking_time: string;
  duration_minutes: number | null;
  customer_name: string | null;
  customer_email: string | null;
  contract_metadata: Record<string, unknown> | null;
};

// Best-effort: a paid Readiness Intensive was booked into a taken or past slot. Never throws.
async function alertOwnerSlotConflict(
  contract: PaidContractRow,
  bookingId: string,
  bookingDate: string,
  slotTime: string,
  inPast: boolean,
  overlapping: ConflictingBooking[],
): Promise<void> {
  try {
    const describe = (b: { id: string; customer_name: string | null; customer_email: string | null; booking_type: string; booking_time: string; duration_minutes: number | null }) => `
      <li>
        <strong>Booking ID:</strong> ${escapeHtml(b.id)}<br>
        <strong>Name:</strong> ${escapeHtml(b.customer_name)}<br>
        <strong>Email:</strong> ${escapeHtml(b.customer_email)}<br>
        <strong>Type:</strong> ${escapeHtml(b.booking_type)}<br>
        <strong>Date/time (Pacific):</strong> ${escapeHtml(bookingDate)} ${escapeHtml(String(b.booking_time).slice(0, 5))}
        (${escapeHtml(b.duration_minutes ?? "?")} min)
      </li>`;
    const reasons = [
      inPast ? "<li>The booked time had already passed when payment was confirmed.</li>" : "",
      overlapping.length > 0 ? "<li>The slot overlaps another confirmed booking (the checkout hold expired before payment).</li>" : "",
    ].join("");
    await sendSystemEmail({
      to: OWNER_ALERT_EMAIL,
      subject: `Slot conflict: paid booking needs reschedule - ${String(contract.client_name ?? "").replace(/[\r\n]+/g, " ")}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #b91c1c;">${escapeHtml(SLOT_CONFLICT_MARKER)}</h1>
          <p>A paid Family Readiness Intensive was booked (payment kept, confirmation sent as usual) but its slot is no longer valid:</p>
          <ul>${reasons}</ul>
          <h2>Paid booking</h2>
          <ul>${describe({
            id: bookingId,
            customer_name: contract.client_name,
            customer_email: contract.client_email,
            booking_type: "readiness-intensive",
            booking_time: slotTime,
            duration_minutes: READINESS_INTENSIVE_DURATION_MINUTES,
          })}</ul>
          <p><strong>Contract ID:</strong> ${escapeHtml(contract.id)}</p>
          ${overlapping.length > 0 ? `<h2>Conflicting confirmed booking(s)</h2><ul>${overlapping.map(describe).join("")}</ul>` : ""}
          <p>Please contact the client to reschedule.</p>
        </div>
      `,
    });
  } catch (alertError) {
    console.error("Failed to send Readiness Intensive slot-conflict alert:", contract.id, alertError);
  }
}

type PaidContractRow = {
  id: string;
  contract_type: string;
  status: string;
  client_name: string;
  client_email: string;
  client_phone: string | null;
  signer_name: string;
  signed_at: string;
  agreement_text: string;
  agreement_version: string;
  amount_cents: number | null;
  payment_id: string | null;
  contract_pdf_path: string | null;
  metadata: Record<string, unknown> | null;
  source_attribution: Record<string, unknown> | null;
};

const PAID_CONTRACT_COLUMNS =
  "id, contract_type, status, client_name, client_email, client_phone, signer_name, signed_at, agreement_text, agreement_version, amount_cents, payment_id, contract_pdf_path, metadata, source_attribution";

// The Family Readiness Intensive is paid through a contract, so the session itself only
// exists as contracts.metadata until payment. Create the confirmed booking (idempotent per
// contract) and send its Zoom confirmation. Returns false on a failure worth retrying.
async function ensureReadinessBooking(supabase: any, contract: PaidContractRow): Promise<boolean> {
  if (contract.contract_type !== "readiness-intensive" || contract.status !== "paid") return true;

  const metadata = contract.metadata ?? {};
  const bookingDate = metadata.bookingDate;
  const bookingTime = metadata.bookingTime;
  if (typeof bookingDate !== "string" || !DATE_RE.test(bookingDate) || typeof bookingTime !== "string" || !TIME_RE.test(bookingTime)) {
    // Permanent data problem: retrying cannot fix it, so don't ask for a retry.
    console.error("Paid Readiness Intensive contract has no valid session date/time:", contract.id);
    return true;
  }

  const findBookings = () => supabase
    .from("bookings")
    .select("id, status, created_at")
    .eq("booking_type", "readiness-intensive")
    .contains("contract_metadata", { contract_id: contract.id })
    .order("created_at", { ascending: true })
    .order("id", { ascending: true });

  const { data: existing, error: existingError } = await findBookings();
  if (existingError) {
    console.error("Failed to look up Readiness Intensive booking:", contract.id, existingError);
    return false;
  }

  // The booking was since cancelled/completed: nothing left to confirm (a confirmation would
  // 409 and make the webhook retry forever).
  if (existing?.[0] && existing[0].status !== "confirmed") {
    console.log("Readiness Intensive booking is no longer confirmed; skipping confirmation:", contract.id, existing[0].id, existing[0].status);
    return true;
  }

  let bookingId: string | null = existing?.[0]?.id ?? null;
  if (!bookingId) {
    const slotTime = bookingTime.slice(0, 5);
    // The contract's slot hold expires after 30 minutes, so by payment time the slot may be
    // taken by another confirmed booking or already in the past.
    const [slotHour, slotMinute] = slotTime.split(":").map(Number);
    const slotStart = slotHour * 60 + slotMinute;
    const slotEnd = slotStart + READINESS_INTENSIVE_DURATION_MINUTES;
    const inPast = pacificWallTimeToInstant(bookingDate, slotTime).getTime() <= Date.now();
    const { data: sameDay, error: sameDayError } = await supabase
      .from("bookings")
      .select("id, booking_type, booking_time, duration_minutes, customer_name, customer_email, contract_metadata")
      .eq("booking_date", bookingDate)
      .eq("status", "confirmed");
    if (sameDayError) console.error("Failed to check Readiness Intensive slot conflicts:", contract.id, sameDayError);
    const overlapping = ((sameDay || []) as ConflictingBooking[]).filter((b) => {
      if (b.contract_metadata?.contract_id === contract.id) return false;
      if (typeof b.booking_time !== "string" || !TIME_RE.test(b.booking_time)) return false;
      const [h, m] = b.booking_time.split(":").map(Number);
      const otherStart = h * 60 + m;
      const otherEnd = otherStart + (typeof b.duration_minutes === "number" && b.duration_minutes > 0 ? b.duration_minutes : 60);
      return otherStart < slotEnd && slotStart < otherEnd;
    });
    const hasConflict = inPast || overlapping.length > 0;
    if (hasConflict) {
      console.warn("Readiness Intensive paid for a slot that is taken or past; creating it anyway for admin follow-up:", contract.id);
    }

    const { data: inserted, error: insertError } = await supabase
      .from("bookings")
      .insert({
        booking_type: "readiness-intensive",
        customer_name: contract.client_name,
        customer_email: contract.client_email,
        customer_phone: contract.client_phone ? contract.client_phone.slice(0, 25) : null,
        booking_date: bookingDate,
        booking_time: slotTime,
        duration_minutes: READINESS_INTENSIVE_DURATION_MINUTES,
        status: "confirmed",
        payment_id: contract.payment_id,
        amount_cents: contract.amount_cents,
        agreement_accepted: true,
        agreement_signer_name: contract.signer_name,
        agreement_signed_at: contract.signed_at,
        agreement_text: contract.agreement_text,
        agreement_version: contract.agreement_version,
        contract_pdf_path: contract.contract_pdf_path,
        contract_metadata: {
          contract_id: contract.id,
          follow_up_included: metadata.followUpIncluded === true,
        },
        source_attribution: contract.source_attribution ?? {},
        notes: hasConflict ? SLOT_CONFLICT_MARKER : null,
      })
      .select("id")
      .single();
    if (insertError || !inserted) {
      if (insertError?.code !== "23505") {
        console.error("Failed to create Readiness Intensive booking:", contract.id, insertError);
        return false;
      }
    }

    // Two fulfillment paths can race (webhook + browser). Keep only the earliest row.
    const { data: rows } = await findBookings();
    bookingId = rows?.[0]?.id ?? inserted?.id ?? null;
    if (inserted?.id && bookingId && inserted.id !== bookingId) {
      await supabase.from("bookings").delete().eq("id", inserted.id);
    }
    // Only the path whose row was kept alerts, so racing paths send one email.
    if (hasConflict && bookingId && inserted?.id === bookingId) {
      await alertOwnerSlotConflict(contract, bookingId, bookingDate, slotTime, inPast, overlapping);
    }
  }

  if (!bookingId) return false;
  // Idempotent: send-booking-confirmation skips bookings that already have a Zoom meeting.
  const { error: confirmError } = await supabase.functions.invoke("send-booking-confirmation", {
    body: { bookingId },
  });
  if (confirmError) {
    console.error("Readiness Intensive booking confirmation failed:", bookingId, confirmError);
    return false;
  }
  return true;
}

// The full run happens exactly once, by whichever path (browser mark-paid or Square webhook)
// actually flipped the contract to paid. `idempotentOnly` re-runs only the retry-safe parts
// (abandoned-cart recovery + Readiness Intensive booking/confirmation) so a Square webhook
// retry can finish a failed fulfillment; the paid notification and Spine payment event are
// never repeated. Returns false on a failure worth retrying.
async function fulfillPaidContract(
  supabase: any,
  contractId: string,
  opts: { idempotentOnly?: boolean } = {},
): Promise<boolean> {
  const { data: contract, error } = await supabase
    .from("contracts")
    .select(PAID_CONTRACT_COLUMNS)
    .eq("id", contractId)
    .maybeSingle();
  if (error) {
    console.error("fulfillPaidContract: contract lookup failed", contractId, error);
    return false;
  }
  if (!contract) {
    console.error("fulfillPaidContract: contract not found", contractId);
    return true;
  }
  if (contract.status !== "paid") {
    console.error("fulfillPaidContract: contract is not paid", contractId, contract.status);
    return true;
  }

  if (!opts.idempotentOnly) {
    const { error: notifyError } = await supabase.functions.invoke("send-contract-notification", {
      body: { contractId, event: "paid" },
    });
    if (notifyError) console.error("Failed to send paid contract notification:", contractId, notifyError);

    try {
      await enqueueSpineEvent(
        "payment",
        {
          email: contract.client_email ?? null,
          phone: contract.client_phone ?? null,
          name: contract.client_name ?? null,
          props: { source: "contract", contract_type: contract.contract_type },
          payment: { processor: "square", amount_cents: contract.amount_cents ?? 0, kind: "intervention" },
        },
        supabase,
      );
    } catch (spineError) {
      console.error("Spine enqueue failed (payment/contract):", spineError);
    }
  }

  if (contract.contract_type === "readiness-intensive") {
    const { error: cartError } = await supabase
      .from("abandoned_carts")
      .update({ status: "recovered", recovered_at: new Date().toISOString() })
      .eq("customer_email", String(contract.client_email).toLowerCase().trim())
      .eq("booking_type", "readiness-intensive")
      .in("status", ["pending", "recovery_sent"]);
    if (cartError) console.error("Failed to mark abandoned carts recovered:", cartError);
  }

  return await ensureReadinessBooking(supabase, contract as PaidContractRow);
}

function normalizeDiscountCode(code: unknown): string {
  return typeof code === "string" ? code.trim().toUpperCase() : "";
}

async function resolveContractAmount(supabase: any, contractType: string, discountCode: unknown, clientEmail?: string) {
  if (contractType === "readiness-intensive") {
    return {
      amountCents: READINESS_INTENSIVE_FEE_CENTS,
      baseAmountCents: READINESS_INTENSIVE_FEE_CENTS,
      discountCode: null,
      discountCents: 0,
      discountCodeId: null,
      reusedFromContractId: null as string | null,
    };
  }

  const normalizedDiscountCode = normalizeDiscountCode(discountCode);
  const normalizedEmail = typeof clientEmail === "string" ? clientEmail.toLowerCase().trim() : "";
  if (normalizedDiscountCode) {
    const { data: dynamicCode } = await supabase
      .from("discount_codes")
      .select("id, code, base_amount_cents, amount_cents, issued_to_email, expires_at, used_at, used_by_email, used_by_contract_id")
      .eq("code", normalizedDiscountCode)
      .maybeSingle();

    // A one-time code stays usable by the same email while the contract it was
    // claimed for is still unpaid (abandoned / failed checkout, then resubmit).
    let reusedFromContractId: string | null = null;
    let usable = Boolean(dynamicCode && !dynamicCode.used_at);
    if (dynamicCode?.used_at && normalizedEmail && dynamicCode.used_by_contract_id &&
        String(dynamicCode.used_by_email ?? "").toLowerCase().trim() === normalizedEmail) {
      const { data: priorContract } = await supabase
        .from("contracts")
        .select("id, status")
        .eq("id", dynamicCode.used_by_contract_id)
        .maybeSingle();
      if (!priorContract || priorContract.status !== "paid") {
        usable = true;
        reusedFromContractId = dynamicCode.used_by_contract_id;
      }
    }

    if (dynamicCode && usable) {
      const isExpired = dynamicCode.expires_at && new Date(dynamicCode.expires_at).getTime() < Date.now();
      const emailMatches = !dynamicCode.issued_to_email || !normalizedEmail || dynamicCode.issued_to_email.toLowerCase().trim() === normalizedEmail;
      if (!isExpired && emailMatches) {
        const baseAmountCents = typeof dynamicCode.base_amount_cents === "number" ? dynamicCode.base_amount_cents : STANDARD_INTERVENTION_FEE_CENTS;
        // amount_cents may be 0 for a custom-price quote code (no discount, custom base).
        const discountCents = Math.max(Math.min(dynamicCode.amount_cents ?? 0, baseAmountCents - 1), 0);
        return {
          amountCents: Math.max(baseAmountCents - discountCents, 0),
          baseAmountCents,
          discountCode: dynamicCode.code,
          discountCents,
          discountCodeId: dynamicCode.id,
          reusedFromContractId,
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
    reusedFromContractId: null as string | null,
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
        const clientIP = getClientIp(req);
        const allowed = await checkRateLimit(supabase, `contract:${clientIP}`, 10, 3600);
        if (!allowed) {
          return new Response(JSON.stringify({ error: "Too many attempts. Please try again later." }), {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json", "Retry-After": "3600" },
          });
        }

        // contractPdfPath and signedAt from the client are intentionally ignored: the
        // storage path and signature time are set server-side.
        const {
          contractType,
          clientName,
          clientEmail,
          clientPhone,
          signerName,
          agreementText,
          agreementVersion,
          discountCode,
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

        const normalizedClientEmail = clientEmail.toLowerCase().trim();
        const contractMetadata = metadata && typeof metadata === "object" && !Array.isArray(metadata) ? metadata : {};

        // The Readiness Intensive books a session slot: validate it server-side.
        if (contractType === "readiness-intensive") {
          const { bookingDate, bookingTime } = contractMetadata as Record<string, unknown>;
          if (typeof bookingDate !== "string" || !DATE_RE.test(bookingDate) || typeof bookingTime !== "string" || !TIME_RE.test(bookingTime)) {
            throw new Error("A valid session date and time are required");
          }
          const { data: slotData, error: slotError } = await supabase.functions.invoke("square-booking", {
            body: { action: "check-slot", date: bookingDate, time: bookingTime, holderEmail: normalizedClientEmail, bookingType: "readiness-intensive" },
          });
          if (slotError) {
            console.error("Slot check failed:", slotError);
            throw new Error("Unable to verify the selected time. Please try again.");
          }
          if (!slotData?.available) throw new Error("That time is no longer available. Please choose another time.");
        }

        const contractId = crypto.randomUUID();
        let resolvedPdfPath: string | null = null;

        if (typeof contractPdfBase64 === "string" && contractPdfBase64.trim()) {
          const bytes = decodeContractPdf(contractPdfBase64);
          // Server-built path; never a client-chosen storage location.
          resolvedPdfPath = `${contractType}/${contractId}.pdf`;

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
            client_email: normalizedClientEmail,
            client_phone: clientPhone ? sanitizeString(clientPhone).slice(0, 25) : null,
            signer_name: sanitizeString(signerName),
            signed_at: new Date().toISOString(),
            agreement_text: agreementText.trim(),
            agreement_version: agreementVersion.trim(),
            amount_cents: resolvedAmount.amountCents,
            discount_code: resolvedAmount.discountCode,
            discount_cents: resolvedAmount.discountCents,
            contract_pdf_path: resolvedPdfPath,
            contract_pdf_url: null,
            metadata: contractMetadata,
            source_attribution: normalizedSourceAttribution,
          })
          .select()
          .single();

        if (error) {
          if (resolvedPdfPath) await supabase.storage.from("contracts").remove([resolvedPdfPath]);
          throw error;
        }

        await upsertContractCrm(supabase, data, {
          clientName: sanitizeString(clientName),
          clientEmail: clientEmail.toLowerCase().trim(),
          clientPhone: clientPhone ? sanitizeString(clientPhone).slice(0, 25) : null,
          contractType,
          sourceAttribution: normalizedSourceAttribution,
        });

        if (resolvedAmount.discountCodeId) {
          // Atomic claim: either the code is unused, or it is being moved from this same
          // email's earlier, still-unpaid contract (compare-and-swap on used_by_contract_id).
          let claimQuery = supabase
            .from("discount_codes")
            .update({
              used_at: new Date().toISOString(),
              used_by_email: normalizedClientEmail,
              used_by_contract_id: data.id,
            })
            .eq("id", resolvedAmount.discountCodeId);
          claimQuery = resolvedAmount.reusedFromContractId
            ? claimQuery.eq("used_by_contract_id", resolvedAmount.reusedFromContractId).eq("used_by_email", normalizedClientEmail)
            : claimQuery.is("used_at", null);
          const { data: claimedCode, error: claimError } = await claimQuery.select("id");
          if (claimError || !claimedCode || claimedCode.length !== 1) {
            await supabase.from("contracts").delete().eq("id", data.id);
            if (resolvedPdfPath) await supabase.storage.from("contracts").remove([resolvedPdfPath]);
            throw new Error("This discount code was already used. Please refresh and try again.");
          }
        }

        const { error: signedNotifyError } = await supabase.functions.invoke("send-contract-notification", {
          body: { contractId: data.id, event: "signed" },
        });
        if (signedNotifyError) console.error("Failed to send signed contract notification:", data.id, signedNotifyError);

        // Spine: forward contract_signed (additive — never blocks).
        try {
          await enqueueSpineEvent(
            "contract_signed",
            {
              email: clientEmail.toLowerCase().trim(),
              phone: clientPhone ? sanitizeString(clientPhone).slice(0, 25) : null,
              name: sanitizeString(clientName),
              props: {
                contract_type: contractType,
                amount_cents: resolvedAmount.amountCents,
                discount_code: resolvedAmount.discountCode ?? null,
              },
            },
            supabase,
          );
        } catch (spineError) {
          console.error("Spine enqueue failed (contract_signed):", spineError);
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
        if (contract.status === "cancelled") throw new Error("This agreement is no longer active. Please contact Freedom Interventions.");
        if (contract.client_email !== customerEmail.toLowerCase().trim()) throw new Error("Customer email does not match this contract");
        if (typeof contract.amount_cents !== "number" || contract.amount_cents <= 0) throw new Error("Contract amount is invalid");

        const origin = resolveRedirectOrigin(req);
        const successUrl = new URL(safeRedirectPath(redirectPath, "/start-contract?contract_status=success"), origin);
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
        // Without a stored order id the payment can never be verified, so never hand out the link.
        if (!squareOrderId || !checkoutData.payment_link?.url) {
          console.error("Square contract checkout link missing order id or url:", contractId);
          throw new Error(CHECKOUT_TRACKING_ERROR);
        }
        const { data: trackedContract, error: trackError } = await supabase
          .from("contracts")
          .update({
            payment_link_id: paymentLinkId,
            square_order_id: squareOrderId,
            updated_at: new Date().toISOString(),
          })
          .eq("id", contractId)
          .select("id");
        if (trackError || !trackedContract || trackedContract.length === 0) {
          console.error("Failed to store Square order id on contract:", contractId, trackError);
          throw new Error(CHECKOUT_TRACKING_ERROR);
        }

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
        const { contractId } = params;
        if (!validateString(contractId, 100)) throw new Error("Valid contract ID is required");

        const { data: contract, error: contractError } = await supabase
          .from("contracts")
          .select("id, amount_cents, square_order_id, status")
          .eq("id", contractId)
          .single();
        if (contractError || !contract) throw contractError || new Error("Contract not found");
        if (contract.status === "paid") {
          // The webhook may have won the flip. Safety net: make sure a paid Readiness
          // Intensive has its booking (idempotent; no duplicate notifications).
          const { data: paidContract } = await supabase
            .from("contracts")
            .select(PAID_CONTRACT_COLUMNS)
            .eq("id", contractId)
            .maybeSingle();
          const fulfilled = paidContract ? await ensureReadinessBooking(supabase, paidContract as PaidContractRow) : true;
          return new Response(JSON.stringify({ success: true, alreadyPaid: true, confirmationError: !fulfilled }), {
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

        // Use Square's verified tender id, never a client-supplied payment id.
        const verifiedPaymentId = verification.order?.tenders?.[0]?.payment_id || verification.order?.tenders?.[0]?.id || null;

        // Conditional flip: only the path that actually marks it paid (this or the
        // Square webhook) sends the paid notification + Spine event, exactly once.
        const { data: flipped, error } = await supabase
          .from("contracts")
          .update({
            status: "paid",
            payment_id: typeof verifiedPaymentId === "string" ? sanitizeString(verifiedPaymentId).slice(0, 200) : null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", contractId)
          .in("status", UNPAID_CONTRACT_STATUSES)
          .select("id");

        if (error) throw error;

        // false => the Readiness Intensive booking/Zoom confirmation did not go out; the
        // caller tells the client we'll follow up (the webhook retry may still finish it).
        let confirmationError = false;
        if (flipped && flipped.length > 0) {
          confirmationError = !(await fulfillPaidContract(supabase, contractId));
        } else {
          // Not flipped here: the webhook marked it paid first (fine), or it was cancelled.
          const { data: latest, error: latestError } = await supabase
            .from("contracts")
            .select("status")
            .eq("id", contractId)
            .maybeSingle();
          if (latestError) throw latestError;
          if (latest?.status !== "paid") {
            return new Response(JSON.stringify({
              success: false,
              error: "This agreement is no longer active. Please contact Freedom Interventions at (458) 298-8000.",
            }), {
              status: 409,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
          }
        }

        return new Response(JSON.stringify({ success: true, confirmationError }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Service-only: the Square webhook calls this after it flips a contract to paid (or
      // with idempotentOnly when it was already paid, to finish a retry). 502 => Square retries.
      case "fulfill-paid-contract": {
        if (!(await isServiceRoleRequest(req))) return unauthorized(corsHeaders);
        const { contractId, idempotentOnly } = params;
        if (!validateString(contractId, 100)) throw new Error("Valid contract ID is required");
        const ok = await fulfillPaidContract(supabase, contractId, { idempotentOnly: idempotentOnly === true });
        return new Response(JSON.stringify({ success: ok }), {
          status: ok ? 200 : 502,
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
