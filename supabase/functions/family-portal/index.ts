import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { escapeHtml, sendSystemEmail } from "../_shared/resend.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const ADMIN_EMAIL =
  Deno.env.get("FAMILY_PORTAL_NOTIFY_EMAIL") || "matt@freedominterventions.com";
const SITE_URL = Deno.env.get("SITE_URL") || "https://freedominterventions.com";

type PortalAction =
  | "admin-list"
  | "admin-create-case"
  | "admin-update-case"
  | "admin-add-update"
  | "admin-mark-message-read"
  | "family-submit-message";

type PortalRequest = {
  action: PortalAction;
  caseId?: string;
  case?: Record<string, unknown>;
  update?: Record<string, unknown>;
  message?: string;
  messageId?: string;
  sendInvite?: boolean;
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function asText(value: unknown) {
  return String(value ?? "").trim();
}

async function getAuthedClients(req: Request) {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !supabaseAnonKey || !serviceKey)
    throw new Error("Server not configured");

  const authHeader = req.headers.get("authorization") ?? "";
  if (!authHeader) return { error: json({ error: "Unauthorized" }, 401) };

  const userClient = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: authHeader } },
  });
  const adminClient = createClient(supabaseUrl, serviceKey);
  const {
    data: { user },
    error,
  } = await userClient.auth.getUser();

  if (error || !user) return { error: json({ error: "Unauthorized" }, 401) };
  return { userClient, adminClient, user };
}

async function requireAdmin(userClient: ReturnType<typeof createClient>) {
  const { data, error } = await userClient.rpc("is_strict_admin");
  return !error && data === true;
}

async function maybeInviteFamilyUser(
  adminClient: ReturnType<typeof createClient>,
  email: string,
  fullName: string,
  caseId: string,
  shouldInvite: boolean,
) {
  const { data: existingUsers } = await adminClient.auth.admin.listUsers();
  const existing = existingUsers?.users?.find(
    (candidate) => candidate.email?.toLowerCase() === email.toLowerCase(),
  );
  if (existing?.id)
    return { invited: false, userId: existing.id, existingUser: true };

  if (!shouldInvite) return { invited: false, userId: null as string | null };

  const redirectTo = `${SITE_URL}/family-portal`;
  const { data, error } = await adminClient.auth.admin.inviteUserByEmail(
    email,
    {
      redirectTo,
      data: { full_name: fullName, family_portal_case_id: caseId },
    },
  );

  if (error) {
    console.error("family portal invite error", error);
    return {
      invited: false,
      inviteError: error.message,
      userId: null as string | null,
    };
  }

  return { invited: true, userId: data.user?.id ?? null };
}

async function notifyAdminOfMessage(args: {
  familyName: string;
  senderName: string;
  senderEmail: string;
  message: string;
  caseId: string;
}) {
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #172033; max-width: 680px;">
      <h2 style="margin:0 0 12px;">New family portal message</h2>
      <p><strong>Case:</strong> ${escapeHtml(args.familyName)}</p>
      <p><strong>From:</strong> ${escapeHtml(args.senderName)} &lt;${escapeHtml(args.senderEmail)}&gt;</p>
      <div style="margin:18px 0; padding:16px; background:#f6f7f9; border-left:4px solid #1f4f46;">
        ${escapeHtml(args.message).replace(/\n/g, "<br />")}
      </div>
      <p><a href="${SITE_URL}/admin" style="color:#1f4f46;">Open the Freedom Interventions admin dashboard</a></p>
      <p style="font-size:12px; color:#667085;">Case ID: ${escapeHtml(args.caseId)}</p>
    </div>
  `;

  return await sendSystemEmail({
    to: ADMIN_EMAIL,
    subject: `Family portal message: ${args.familyName}`,
    html,
    replyTo: args.senderEmail,
  });
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS")
    return new Response(null, { headers: corsHeaders });

  try {
    const clients = await getAuthedClients(req);
    if ("error" in clients) return clients.error;
    const { userClient, adminClient, user } = clients;
    const body = (await req.json().catch(() => null)) as PortalRequest | null;
    if (!body?.action) return json({ error: "Invalid request" }, 400);

    const adminActions: PortalAction[] = [
      "admin-list",
      "admin-create-case",
      "admin-update-case",
      "admin-add-update",
      "admin-mark-message-read",
    ];

    if (
      adminActions.includes(body.action) &&
      !(await requireAdmin(userClient))
    ) {
      return json({ error: "Forbidden" }, 403);
    }

    if (body.action === "admin-list") {
      const [
        { data: cases, error: casesError },
        { data: messages, error: messagesError },
      ] = await Promise.all([
        adminClient
          .from("family_portal_cases")
          .select(
            "*, family_portal_members(*), family_portal_updates(*), family_portal_messages(*)",
          )
          .order("updated_at", { ascending: false })
          .order("created_at", {
            foreignTable: "family_portal_updates",
            ascending: false,
          })
          .order("created_at", {
            foreignTable: "family_portal_messages",
            ascending: false,
          }),
        adminClient
          .from("family_portal_messages")
          .select("*")
          .eq("is_read_by_admin", false)
          .order("created_at", { ascending: false }),
      ]);
      if (casesError || messagesError) {
        console.error(
          "family portal admin-list error",
          casesError || messagesError,
        );
        return json({ error: "Failed to load family portal" }, 500);
      }
      return json({ cases: cases ?? [], unreadMessages: messages ?? [] });
    }

    if (body.action === "admin-create-case") {
      const payload = body.case ?? {};
      const familyName = asText(payload.family_name);
      const primaryContactName = asText(payload.primary_contact_name);
      const primaryContactEmail = asText(
        payload.primary_contact_email,
      ).toLowerCase();
      if (!familyName || !primaryContactName || !primaryContactEmail) {
        return json(
          {
            error: "Family name, primary contact name, and email are required",
          },
          400,
        );
      }

      const { data: portalCase, error: createError } = await adminClient
        .from("family_portal_cases")
        .insert({
          family_name: familyName,
          primary_contact_name: primaryContactName,
          primary_contact_email: primaryContactEmail,
          primary_contact_phone: asText(payload.primary_contact_phone) || null,
          loved_one_name: asText(payload.loved_one_name) || null,
          status: asText(payload.status) || "Intake started",
          phase: asText(payload.phase) || "Intake",
          next_step: asText(payload.next_step) || null,
          next_step_due_at: asText(payload.next_step_due_at) || null,
          summary: asText(payload.summary) || null,
          risk_level: asText(payload.risk_level) || "standard",
          created_by: user.id,
        })
        .select("*")
        .single();

      if (createError || !portalCase) {
        console.error("family portal create case error", createError);
        return json({ error: "Failed to create case" }, 500);
      }

      const invite = await maybeInviteFamilyUser(
        adminClient,
        primaryContactEmail,
        primaryContactName,
        portalCase.id,
        body.sendInvite !== false,
      );

      const { error: memberError } = await adminClient
        .from("family_portal_members")
        .insert({
          case_id: portalCase.id,
          user_id: invite.userId,
          email: primaryContactEmail,
          full_name: primaryContactName,
          role: "primary_contact",
          invited_at: invite.invited ? new Date().toISOString() : null,
        });

      if (memberError)
        console.error("family portal create member error", memberError);

      if (
        asText(payload.initial_update_title) &&
        asText(payload.initial_update_body)
      ) {
        await adminClient.from("family_portal_updates").insert({
          case_id: portalCase.id,
          title: asText(payload.initial_update_title),
          body: asText(payload.initial_update_body),
          update_type: "case_update",
          is_visible_to_family: true,
          created_by: user.id,
        });
      }

      return json({
        case: portalCase,
        invite,
        memberError: memberError?.message ?? null,
      });
    }

    if (body.action === "admin-update-case") {
      if (!body.caseId) return json({ error: "caseId required" }, 400);
      const payload = body.case ?? {};
      const allowed = [
        "family_name",
        "primary_contact_name",
        "primary_contact_email",
        "primary_contact_phone",
        "loved_one_name",
        "status",
        "phase",
        "next_step",
        "next_step_due_at",
        "summary",
        "risk_level",
        "is_active",
      ];
      const updates: Record<string, unknown> = {};
      for (const key of allowed)
        if (key in payload) updates[key] = payload[key] || null;
      const { data, error } = await adminClient
        .from("family_portal_cases")
        .update(updates)
        .eq("id", body.caseId)
        .select("*")
        .single();
      if (error) return json({ error: "Failed to update case" }, 500);
      return json({ case: data });
    }

    if (body.action === "admin-add-update") {
      if (!body.caseId) return json({ error: "caseId required" }, 400);
      const update = body.update ?? {};
      const title = asText(update.title);
      const bodyText = asText(update.body);
      if (!title || !bodyText)
        return json({ error: "Update title and body are required" }, 400);
      const { data, error } = await adminClient
        .from("family_portal_updates")
        .insert({
          case_id: body.caseId,
          title,
          body: bodyText,
          update_type: asText(update.update_type) || "case_update",
          is_visible_to_family: update.is_visible_to_family !== false,
          created_by: user.id,
        })
        .select("*")
        .single();
      if (error) return json({ error: "Failed to add update" }, 500);
      await adminClient
        .from("family_portal_cases")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", body.caseId);
      return json({ update: data });
    }

    if (body.action === "admin-mark-message-read") {
      if (!body.messageId) return json({ error: "messageId required" }, 400);
      const { error } = await adminClient
        .from("family_portal_messages")
        .update({ is_read_by_admin: true })
        .eq("id", body.messageId);
      if (error) return json({ error: "Failed to mark message read" }, 500);
      return json({ ok: true });
    }

    if (body.action === "family-submit-message") {
      if (!body.caseId) return json({ error: "caseId required" }, 400);
      const message = asText(body.message);
      if (!message || message.length < 2)
        return json({ error: "Message is required" }, 400);

      const { data: membership, error: memberError } = await adminClient
        .from("family_portal_members")
        .select("*, family_portal_cases(family_name)")
        .eq("case_id", body.caseId)
        .eq("user_id", user.id)
        .maybeSingle();

      if (memberError || !membership) return json({ error: "Forbidden" }, 403);

      const { data: inserted, error: insertError } = await adminClient
        .from("family_portal_messages")
        .insert({
          case_id: body.caseId,
          sender_user_id: user.id,
          sender_name: membership.full_name || user.email || "Family member",
          sender_email: membership.email || user.email || "unknown",
          message,
        })
        .select("*")
        .single();

      if (insertError || !inserted) {
        console.error("family portal message insert error", insertError);
        return json({ error: "Failed to submit message" }, 500);
      }

      const familyName =
        (membership.family_portal_cases as { family_name?: string } | null)
          ?.family_name || "Family Portal Case";
      try {
        await notifyAdminOfMessage({
          familyName,
          senderName: inserted.sender_name,
          senderEmail: inserted.sender_email,
          message,
          caseId: body.caseId,
        });
        await adminClient
          .from("family_portal_messages")
          .update({ admin_notified_at: new Date().toISOString() })
          .eq("id", inserted.id);
      } catch (emailError) {
        console.error("family portal message email failed", emailError);
        // Keep the message saved even if notification fails.
      }

      await adminClient
        .from("family_portal_cases")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", body.caseId);
      return json({ message: inserted });
    }

    return json({ error: "Unsupported action" }, 400);
  } catch (e) {
    console.error("family-portal error", e);
    return json({ error: "Unexpected error" }, 500);
  }
});
