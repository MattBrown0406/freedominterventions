import { useCallback, useEffect, useMemo, useState } from "react";
import { format, isBefore, parseISO } from "date-fns";
import { CalendarClock, Columns3, Mail, Phone, RefreshCw } from "lucide-react";
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

const RevenuePipelineManager = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
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
