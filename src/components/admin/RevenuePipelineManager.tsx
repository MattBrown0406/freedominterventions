import { useCallback, useEffect, useMemo, useState } from "react";
import { format, isBefore, parseISO } from "date-fns";
import { CalendarClock, Columns3, Mail, MailPlus, Phone, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { Json } from "@/integrations/supabase/types";

interface RevenueLead {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  source: string;
  source_attribution: Json;
  lead_score: number;
  revenue_path: string | null;
  pipeline_status: string;
  next_action: string | null;
  next_action_due_at: string | null;
  notes: string | null;
  last_engagement_at: string | null;
  created_at: string;
}

const pipelineStages = [
  { id: "new", label: "New", nextAction: "Call within 15 minutes" },
  { id: "contacted", label: "Contacted", nextAction: "Book consultation or readiness call" },
  { id: "consultation_booked", label: "Consult Booked", nextAction: "Prepare call notes" },
  { id: "readiness_intensive", label: "Readiness Intensive", nextAction: "Confirm family decision makers" },
  { id: "contract_sent", label: "Contract Sent", nextAction: "Follow up on agreement" },
  { id: "contract_signed", label: "Contract Signed", nextAction: "Collect payment and schedule intervention" },
  { id: "paid", label: "Paid", nextAction: "Start case onboarding" },
  { id: "lost", label: "Lost", nextAction: "Archive or add nurture note" },
];

const SITE_URL = "https://freedominterventions.com";

const revenueStageIds = new Set(["consultation_booked", "readiness_intensive", "contract_sent", "contract_signed", "paid"]);

const sourceTitle = (source: string) => {
  const labels: Record<string, string> = {
    sober_helpline: "Sober Helpline",
    no_more_enabling: "No More Enabling",
    organic_google: "Google Organic",
    organic_bing: "Bing Organic",
    direct: "Direct",
    referral: "Referral",
    assessment: "Assessment",
    booking: "Booking",
    contact_message: "Contact Form",
    unknown: "Unknown",
  };
  return labels[source] || source.replace(/_/g, " ");
};

const asSourceAttribution = (value: Json | null | undefined) => {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as { source?: string; utm_source?: string | null; utm_campaign?: string | null };
  }
  return {};
};

const getSource = (lead: RevenueLead) => {
  const attribution = asSourceAttribution(lead.source_attribution);
  return attribution.source || attribution.utm_source || lead.source || "unknown";
};

const getLeadName = (lead: RevenueLead) => {
  return [lead.first_name, lead.last_name].filter(Boolean).join(" ") || lead.email;
};

const escapeHtml = (value: string) => value
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039;");

const getFirstName = (lead: RevenueLead) => {
  return lead.first_name || getLeadName(lead).trim().split(/\s+/)[0] || "there";
};

const priorityClass = (score: number) => {
  if (score >= 80) return "bg-red-600 text-white hover:bg-red-600";
  if (score >= 60) return "bg-amber-500 text-white hover:bg-amber-500";
  return "bg-muted text-foreground hover:bg-muted";
};

const toDatetimeLocal = (value: string | null) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 16);
};

const fromDatetimeLocal = (value: string) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
};

type FollowupInsert = {
  lead_type: "assessment" | "contact_message" | "consultation" | "paid_booking" | "contract" | "abandoned_cart";
  lead_id: string;
  contact_email: string;
  contact_name: string;
  contact_phone: string | null;
  recipient_type?: "lead" | "owner";
  followup_reason: string;
  priority: "normal" | "high" | "urgent";
  sequence_step: number;
  subject: string;
  body_html: string;
  source_attribution: Json;
  due_at: string;
};

const dueIn = (minutes: number) => new Date(Date.now() + minutes * 60 * 1000).toISOString();

const leadTypeForStatus = (status: string): FollowupInsert["lead_type"] => {
  if (status.includes("contract")) return "contract";
  if (status === "paid") return "paid_booking";
  if (status === "consultation_booked") return "consultation";
  return "contact_message";
};

const priorityForLead = (lead: RevenueLead): FollowupInsert["priority"] => {
  if (lead.lead_score >= 80) return "urgent";
  if (lead.lead_score >= 60) return "high";
  return "normal";
};

const buildStageFollowups = (lead: RevenueLead, status: string): FollowupInsert[] => {
  const firstName = escapeHtml(getFirstName(lead));
  const contactName = getLeadName(lead);
  const priority = priorityForLead(lead);
  const leadType = leadTypeForStatus(status);
  const consultUrl = `${SITE_URL}/?type=consultation&email=${encodeURIComponent(lead.email)}${lead.phone ? `&phone=${encodeURIComponent(lead.phone)}` : ""}#booking`;
  const assessmentUrl = `${SITE_URL}/assessment?email=${encodeURIComponent(lead.email)}`;
  const readinessUrl = `${SITE_URL}/intervention-readiness?source=pipeline_followup&utm_source=freedom_followup&utm_medium=email&utm_campaign=${status}`;
  const afterConsultUrl = `${SITE_URL}/after-consultation?source=pipeline_followup&utm_source=freedom_followup&utm_medium=email&utm_campaign=${status}`;
  const contractUrl = `${SITE_URL}/start-contract`;

  const base = {
    lead_type: leadType,
    lead_id: lead.id,
    contact_email: lead.email,
    contact_name: contactName,
    contact_phone: lead.phone,
    priority,
    source_attribution: lead.source_attribution,
  };

  switch (status) {
    case "contacted":
      return [
        {
          ...base,
          sequence_step: 1,
          followup_reason: "pipeline_contacted_consult_invite",
          subject: `${firstName}, the next step is a clear plan`,
          body_html: `
            <p>Hi ${firstName},</p>
            <p>I wanted to follow up after your family reached out. The first goal is not to force a decision. It is to understand whether this calls for consultation, family readiness work, or full intervention planning.</p>
            <p>If you have not booked a time yet, start here:</p>
            <p><a href="${consultUrl}">Book a free consultation</a></p>
            <p>If things are moving quickly, call me directly at <a href="tel:5416688084">541-668-8084</a>.</p>
            <p>- Matt</p>
          `,
          due_at: dueIn(120),
        },
        {
          ...base,
          sequence_step: 2,
          followup_reason: "pipeline_contacted_readiness_prompt",
          subject: "If the family is divided, do not wait for everyone to agree",
          body_html: `
            <p>Hi ${firstName},</p>
            <p>Families often wait until everyone agrees, but addiction uses family division as cover. If refusal, relapse, or safety risk is already present, it may be time to look at intervention readiness.</p>
            <p><a href="${readinessUrl}">Check intervention readiness</a></p>
            <p><a href="${consultUrl}">Or book the free consultation</a></p>
            <p>- Matt</p>
          `,
          due_at: dueIn(48 * 60),
        },
      ];
    case "consultation_booked":
      return [
        {
          ...base,
          lead_type: "consultation",
          sequence_step: 1,
          followup_reason: "pipeline_consultation_assessment_prompt",
          subject: `${firstName}, one thing before our consultation`,
          body_html: `
            <p>Hi ${firstName},</p>
            <p>Before our consultation, please complete the family assessment if you have not already. It helps me understand urgency, safety, treatment history, leverage, and where the family may need to get aligned.</p>
            <p><a href="${assessmentUrl}">Complete the family assessment</a></p>
            <p>If things escalate before our call, call me directly at <a href="tel:5416688084">541-668-8084</a>.</p>
            <p>- Matt</p>
          `,
          due_at: dueIn(15),
        },
        {
          ...base,
          lead_type: "consultation",
          recipient_type: "owner",
          sequence_step: 2,
          followup_reason: "pipeline_consultation_owner_prep",
          subject: `Prep consultation: ${contactName}`,
          body_html: `
            <p>${escapeHtml(contactName)} has been moved to consultation booked.</p>
            <p>Prep points: review source, assessment status, phone number, prior treatment, family readiness, and whether this looks like coaching, intensive, or intervention work.</p>
            <p>Lead source: ${escapeHtml(sourceTitle(getSource(lead)))}</p>
          `,
          due_at: dueIn(5),
        },
      ];
    case "readiness_intensive":
      return [
        {
          ...base,
          sequence_step: 1,
          followup_reason: "pipeline_readiness_intensive_prep",
          subject: `${firstName}, what to gather before the Family Readiness Intensive`,
          body_html: `
            <p>Hi ${firstName},</p>
            <p>Before the intensive, gather the facts that usually matter most: recent incidents, treatment history, safety concerns, who has been enabling what, and who needs to participate in the family plan.</p>
            <p>This page explains what happens after the first consultation and how the readiness path fits:</p>
            <p><a href="${afterConsultUrl}">What happens after the consultation</a></p>
            <p>- Matt</p>
          `,
          due_at: dueIn(30),
        },
        {
          ...base,
          recipient_type: "owner",
          sequence_step: 2,
          followup_reason: "pipeline_readiness_owner_prep",
          subject: `Readiness intensive prep: ${contactName}`,
          body_html: `
            <p>${escapeHtml(contactName)} is in the readiness intensive stage.</p>
            <p>Prep the family system questions: decision makers, leverage, safety, treatment fit, intervention readiness, and likely resistance points.</p>
          `,
          due_at: dueIn(10),
        },
      ];
    case "contract_sent":
      return [
        {
          ...base,
          lead_type: "contract",
          sequence_step: 1,
          followup_reason: "pipeline_contract_sent_lead",
          subject: `${firstName}, next step on the intervention agreement`,
          body_html: `
            <p>Hi ${firstName},</p>
            <p>I wanted to follow up on the intervention agreement. At this stage, the goal is to move from uncertainty into a clear plan: family preparation, treatment coordination, the intervention process, and follow-through.</p>
            <p>If you have questions before signing, reply here or call me directly.</p>
            <p><a href="${contractUrl}">Review the intervention agreement</a></p>
            <p>- Matt</p>
          `,
          due_at: dueIn(24 * 60),
        },
        {
          ...base,
          lead_type: "contract",
          recipient_type: "owner",
          sequence_step: 2,
          followup_reason: "pipeline_contract_sent_owner",
          subject: `Contract follow-up due: ${contactName}`,
          body_html: `
            <p>The intervention agreement is marked sent for ${escapeHtml(contactName)}.</p>
            <p>If they have not signed within 24 hours, call before the family loses momentum.</p>
          `,
          due_at: dueIn(26 * 60),
        },
      ];
    case "contract_signed":
      return [
        {
          ...base,
          lead_type: "contract",
          recipient_type: "owner",
          sequence_step: 1,
          followup_reason: "pipeline_contract_signed_owner",
          subject: `Signed agreement: collect payment and schedule ${contactName}`,
          body_html: `
            <p>${escapeHtml(contactName)} is marked contract signed.</p>
            <p>Next actions: confirm payment, schedule family preparation, gather treatment options, and lock intervention logistics.</p>
          `,
          due_at: dueIn(5),
        },
        {
          ...base,
          lead_type: "contract",
          sequence_step: 2,
          followup_reason: "pipeline_contract_signed_lead",
          subject: `${firstName}, next we organize the family plan`,
          body_html: `
            <p>Hi ${firstName},</p>
            <p>Now that the agreement is in motion, the next step is getting the family organized. We will clarify decision makers, treatment options, boundaries, logistics, and how we handle resistance.</p>
            <p>I will help you move this from fear and confusion into a practical plan.</p>
            <p>- Matt</p>
          `,
          due_at: dueIn(30),
        },
      ];
    case "paid":
      return [
        {
          ...base,
          lead_type: "paid_booking",
          recipient_type: "owner",
          sequence_step: 1,
          followup_reason: "pipeline_paid_owner_onboarding",
          subject: `Paid case onboarding: ${contactName}`,
          body_html: `
            <p>${escapeHtml(contactName)} is marked paid.</p>
            <p>Start onboarding: schedule prep session, collect family participant list, verify treatment path, and document immediate safety concerns.</p>
          `,
          due_at: dueIn(5),
        },
      ];
    default:
      return [];
  }
};

const RevenuePipelineManager = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [queuingId, setQueuingId] = useState<string | null>(null);
  const [leads, setLeads] = useState<RevenueLead[]>([]);
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});
  const [actionDrafts, setActionDrafts] = useState<Record<string, string>>({});
  const [dueDrafts, setDueDrafts] = useState<Record<string, string>>({});

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("crm_contacts")
      .select("id,email,first_name,last_name,phone,source,source_attribution,lead_score,revenue_path,pipeline_status,next_action,next_action_due_at,notes,last_engagement_at,created_at")
      .order("created_at", { ascending: false })
      .limit(500);

    if (error) {
      toast({
        title: "Could not load revenue pipeline",
        description: "Make sure the latest CRM attribution migration is applied in Lovable.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const rows = (data ?? []) as RevenueLead[];
    setLeads(rows);
    setNoteDrafts(Object.fromEntries(rows.map((lead) => [lead.id, lead.notes || ""])));
    setActionDrafts(Object.fromEntries(rows.map((lead) => [lead.id, lead.next_action || ""])));
    setDueDrafts(Object.fromEntries(rows.map((lead) => [lead.id, toDatetimeLocal(lead.next_action_due_at)])));
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const updateLead = async (leadId: string, patch: Partial<RevenueLead>, successMessage = "Lead updated") => {
    setSavingId(leadId);
    const { error } = await supabase
      .from("crm_contacts")
      .update({ ...patch, updated_at: new Date().toISOString() })
      .eq("id", leadId);

    if (error) {
      toast({
        title: "Update failed",
        description: "The lead was not changed. Try refreshing the dashboard.",
        variant: "destructive",
      });
      setSavingId(null);
      return;
    }

    toast({ title: successMessage });
    setLeads((current) => current.map((lead) => (lead.id === leadId ? { ...lead, ...patch } : lead)));
    setSavingId(null);
  };

  const handleStatusChange = async (lead: RevenueLead, status: string) => {
    const stage = pipelineStages.find((item) => item.id === status);
    const nextAction = stage?.nextAction || lead.next_action;
    setActionDrafts((current) => ({ ...current, [lead.id]: nextAction || "" }));
    await updateLead(lead.id, {
      pipeline_status: status,
      next_action: nextAction,
      last_engagement_at: new Date().toISOString(),
    }, `Moved to ${stage?.label || status}`);
  };

  const queueStageFollowups = async (lead: RevenueLead) => {
    const rows = buildStageFollowups(lead, lead.pipeline_status);
    if (!rows.length) {
      toast({
        title: "No stage sequence",
        description: "This stage does not have a follow-up sequence attached.",
      });
      return;
    }

    setQueuingId(lead.id);
    const reasons = rows.map((row) => row.followup_reason);
    const { data: existing, error: existingError } = await supabase
      .from("freedom_followup_queue")
      .select("followup_reason")
      .eq("contact_email", lead.email)
      .in("followup_reason", reasons);

    if (existingError) {
      toast({
        title: "Could not check existing follow-ups",
        description: "Try refreshing the pipeline before queueing again.",
        variant: "destructive",
      });
      setQueuingId(null);
      return;
    }

    const existingReasons = new Set((existing ?? []).map((row) => row.followup_reason));
    const rowsToInsert = rows.filter((row) => !existingReasons.has(row.followup_reason));

    if (!rowsToInsert.length) {
      toast({
        title: "Already queued",
        description: "This lead already has the follow-ups for the current stage.",
      });
      setQueuingId(null);
      return;
    }

    const { error } = await supabase.from("freedom_followup_queue").insert(rowsToInsert);

    if (error) {
      toast({
        title: "Could not queue follow-ups",
        description: "The follow-up table may need the latest Lovable migration or admin policy.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Stage follow-ups queued",
        description: `${rowsToInsert.length} follow-up${rowsToInsert.length === 1 ? "" : "s"} added for ${getLeadName(lead)}.`,
      });
    }
    setQueuingId(null);
  };

  const saveAction = async (lead: RevenueLead) => {
    await updateLead(lead.id, {
      next_action: actionDrafts[lead.id] || null,
      next_action_due_at: fromDatetimeLocal(dueDrafts[lead.id] || ""),
    }, "Next action saved");
  };

  const saveNotes = async (lead: RevenueLead) => {
    await updateLead(lead.id, { notes: noteDrafts[lead.id] || null }, "Notes saved");
  };

  const stageGroups = useMemo(() => {
    const map = new Map<string, RevenueLead[]>();
    pipelineStages.forEach((stage) => map.set(stage.id, []));
    leads.forEach((lead) => {
      const status = pipelineStages.some((stage) => stage.id === lead.pipeline_status) ? lead.pipeline_status : "new";
      map.get(status)?.push(lead);
    });
    map.forEach((rows) => rows.sort((a, b) => {
      if (b.lead_score !== a.lead_score) return b.lead_score - a.lead_score;
      return new Date(b.last_engagement_at || b.created_at).getTime() - new Date(a.last_engagement_at || a.created_at).getTime();
    }));
    return map;
  }, [leads]);

  const totals = useMemo(() => {
    const now = new Date();
    return {
      leads: leads.length,
      hot: leads.filter((lead) => lead.lead_score >= 75 && lead.pipeline_status !== "lost").length,
      activeRevenue: leads.filter((lead) => revenueStageIds.has(lead.pipeline_status)).length,
      due: leads.filter((lead) => lead.next_action_due_at && isBefore(parseISO(lead.next_action_due_at), now) && !["paid", "lost"].includes(lead.pipeline_status)).length,
    };
  }, [leads]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs uppercase text-muted-foreground">Pipeline Leads</p>
            <p className="text-2xl font-bold">{totals.leads}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs uppercase text-muted-foreground">Hot Leads</p>
            <p className="text-2xl font-bold text-red-600">{totals.hot}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs uppercase text-muted-foreground">Revenue Stage</p>
            <p className="text-2xl font-bold text-green-700">{totals.activeRevenue}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs uppercase text-muted-foreground">Overdue Actions</p>
            <p className="text-2xl font-bold text-amber-600">{totals.due}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={fetchLeads} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {loading ? (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">Loading revenue pipeline...</CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
          {pipelineStages.map((stage) => {
            const rows = stageGroups.get(stage.id) ?? [];
            return (
              <Card key={stage.id} className="h-fit">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between gap-2 text-base">
                    <span className="flex items-center gap-2">
                      <Columns3 className="h-4 w-4 text-primary" />
                      {stage.label}
                    </span>
                    <Badge variant="outline">{rows.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {rows.length === 0 ? (
                    <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">No leads here.</p>
                  ) : (
                    rows.map((lead) => (
                      <div key={lead.id} className="space-y-3 rounded-lg border border-border p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate font-semibold">{getLeadName(lead)}</p>
                            <p className="truncate text-sm text-muted-foreground">{lead.email}</p>
                            {lead.phone && <p className="text-sm text-muted-foreground">{lead.phone}</p>}
                          </div>
                          <Badge className={priorityClass(lead.lead_score)}>{lead.lead_score}</Badge>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">{sourceTitle(getSource(lead))}</Badge>
                          {lead.revenue_path && <Badge variant="secondary">{lead.revenue_path.replace(/_/g, " ")}</Badge>}
                        </div>

                        <Select
                          value={pipelineStages.some((item) => item.id === lead.pipeline_status) ? lead.pipeline_status : "new"}
                          onValueChange={(value) => handleStatusChange(lead, value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {pipelineStages.map((item) => (
                              <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <div className="space-y-2">
                          <Input
                            value={actionDrafts[lead.id] || ""}
                            onChange={(event) => setActionDrafts((current) => ({ ...current, [lead.id]: event.target.value }))}
                            placeholder="Next action"
                          />
                          <Input
                            type="datetime-local"
                            value={dueDrafts[lead.id] || ""}
                            onChange={(event) => setDueDrafts((current) => ({ ...current, [lead.id]: event.target.value }))}
                          />
                          <Button size="sm" variant="outline" onClick={() => saveAction(lead)} disabled={savingId === lead.id} className="w-full gap-2">
                            <CalendarClock className="h-4 w-4" />
                            Save Action
                          </Button>
                        </div>

                        <Textarea
                          value={noteDrafts[lead.id] || ""}
                          onChange={(event) => setNoteDrafts((current) => ({ ...current, [lead.id]: event.target.value }))}
                          placeholder="Private lead notes"
                          rows={3}
                        />

                        <div className="flex flex-wrap gap-2">
                          {lead.phone && (
                            <Button asChild size="sm" variant="outline" className="gap-2">
                              <a href={`tel:${lead.phone}`}><Phone className="h-4 w-4" />Call</a>
                            </Button>
                          )}
                          <Button asChild size="sm" variant="outline" className="gap-2">
                            <a href={`mailto:${lead.email}`}><Mail className="h-4 w-4" />Email</a>
                          </Button>
                          <Button size="sm" onClick={() => saveNotes(lead)} disabled={savingId === lead.id}>
                            Save Notes
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => queueStageFollowups(lead)}
                            disabled={queuingId === lead.id}
                            className="gap-2"
                          >
                            <MailPlus className="h-4 w-4" />
                            Queue Stage Emails
                          </Button>
                        </div>

                        <p className="text-xs text-muted-foreground">
                          Created {format(new Date(lead.created_at), "MMM d, h:mm a")}
                        </p>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RevenuePipelineManager;
