import { useCallback, useEffect, useMemo, useState } from "react";
import { differenceInCalendarDays, format, isBefore, parseISO, startOfToday } from "date-fns";
import { AlertTriangle, CalendarClock, CheckCircle2, CircleDollarSign, FileSignature, Mail, Phone, RefreshCw, Target, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Json } from "@/integrations/supabase/types";

interface CrmContactRow {
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
  last_engagement_at: string | null;
  created_at: string;
  updated_at: string;
}

interface BookingRow {
  id: string;
  customer_email: string;
  customer_name: string;
  customer_phone: string | null;
  booking_type: string;
  booking_date: string;
  booking_time: string;
  status: string;
  source_attribution: Json;
  created_at: string;
}

interface ContractRow {
  id: string;
  client_email: string;
  client_name: string;
  client_phone: string | null;
  contract_type: string;
  status: string;
  amount_cents: number | null;
  source_attribution: Json;
  signed_at: string;
  created_at: string;
  updated_at: string;
}

interface FollowupRow {
  id: string;
  contact_email: string;
  contact_name: string;
  contact_phone: string | null;
  followup_reason: string;
  priority: string;
  status: string;
  due_at: string;
  source_attribution: Json;
}

interface RevenueAction {
  id: string;
  title: string;
  person: string;
  email: string;
  phone: string | null;
  reason: string;
  source: string;
  urgency: "critical" | "high" | "normal";
  dueLabel: string;
  meta: string;
}

interface MoneyListItem extends RevenueAction {
  moneyScore: number;
  lane: "close" | "book" | "recover" | "nurture";
  valueLabel: string;
  evidence: string;
}

const revenueStages = new Set(["consultation_booked", "readiness_intensive", "contract_sent", "contract_signed", "paid_booking_started"]);
const closedStages = new Set(["paid", "lost", "closed"]);
const funnelSources = new Set(["no_more_enabling", "sober_helpline", "party_wreckers"]);

const asSourceAttribution = (value: Json | null | undefined) => {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as { source?: string; utm_source?: string | null; utm_campaign?: string | null };
  }
  return {};
};

const sourceKey = (value: Json | null | undefined, fallback = "unknown") => {
  const attribution = asSourceAttribution(value);
  return attribution.source || attribution.utm_source || fallback;
};

const sourceFamily = (source: string) => {
  if (source.includes("no_more_enabling") || source.includes("nme")) return "no_more_enabling";
  if (source.includes("sober_helpline") || source.includes("family_squares")) return "sober_helpline";
  if (source.includes("party_wreckers")) return "party_wreckers";
  return source;
};

const sourceTitle = (source: string) => {
  const labels: Record<string, string> = {
    sober_helpline: "Sober Helpline",
    no_more_enabling: "No More Enabling",
    party_wreckers: "Party Wreckers",
    organic_google: "Google Organic",
    organic_bing: "Bing Organic",
    direct: "Direct",
    referral: "Referral",
    contact_message: "Contact Form",
    booking: "Booking",
    assessment: "Assessment",
    unknown: "Unknown",
  };
  const key = sourceFamily(source);
  return labels[key] || key.replace(/_/g, " ");
};

const contactName = (lead: CrmContactRow) => {
  return [lead.first_name, lead.last_name].filter(Boolean).join(" ") || lead.email;
};

const formatPhoneHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

const urgencyBadge = (urgency: RevenueAction["urgency"]) => {
  if (urgency === "critical") return <Badge variant="destructive">Critical</Badge>;
  if (urgency === "high") return <Badge className="bg-amber-500 text-white hover:bg-amber-500">High</Badge>;
  return <Badge variant="outline">Normal</Badge>;
};

const statusLabel = (status: string) => status.replace(/_/g, " ");

const formatUsd = (cents: number | null) => {
  if (!cents) return "$0";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
};

const laneLabel = (lane: MoneyListItem["lane"]) => {
  const labels: Record<MoneyListItem["lane"], string> = {
    close: "Close",
    book: "Book",
    recover: "Recover",
    nurture: "Nurture",
  };
  return labels[lane];
};

const laneClass = (lane: MoneyListItem["lane"]) => {
  if (lane === "close") return "bg-green-700 text-white hover:bg-green-700";
  if (lane === "book") return "bg-blue-700 text-white hover:bg-blue-700";
  if (lane === "recover") return "bg-amber-500 text-white hover:bg-amber-500";
  return "bg-muted text-foreground hover:bg-muted";
};

const dueText = (value: string | null) => {
  if (!value) return "No due date";
  const date = parseISO(value);
  if (Number.isNaN(date.getTime())) return "No due date";
  const diff = differenceInCalendarDays(date, startOfToday());
  if (diff < 0) return `${Math.abs(diff)} day${Math.abs(diff) === 1 ? "" : "s"} overdue`;
  if (diff === 0) return "Due today";
  if (diff === 1) return "Due tomorrow";
  return `Due ${format(date, "MMM d")}`;
};

const sourceBoost = (source: string) => {
  const family = sourceFamily(source);
  if (family === "no_more_enabling") return 12;
  if (family === "sober_helpline") return 10;
  if (family === "party_wreckers") return 7;
  return 0;
};

const dueBoost = (dueAt: string | null) => {
  if (!dueAt) return 6;
  const date = parseISO(dueAt);
  if (Number.isNaN(date.getTime())) return 0;
  const diff = differenceInCalendarDays(date, startOfToday());
  if (diff < 0) return 18;
  if (diff === 0) return 14;
  if (diff === 1) return 6;
  return 0;
};

const stageBoost = (status: string) => {
  const boost: Record<string, number> = {
    contract_signed: 55,
    contract_sent: 48,
    readiness_intensive: 36,
    consultation_booked: 30,
    contacted: 18,
    new: 16,
  };
  return boost[status] || 0;
};

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const actionSort = (a: MoneyListItem, b: MoneyListItem) => {
  if (b.moneyScore !== a.moneyScore) return b.moneyScore - a.moneyScore;
  const laneOrder: Record<MoneyListItem["lane"], number> = { close: 4, book: 3, recover: 2, nurture: 1 };
  return laneOrder[b.lane] - laneOrder[a.lane];
};

const ActionList = ({ title, icon: Icon, actions, empty }: {
  title: string;
  icon: typeof Target;
  actions: RevenueAction[];
  empty: string;
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center justify-between gap-3 text-base">
        <span className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-primary" />
          {title}
        </span>
        <Badge variant="outline">{actions.length}</Badge>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      {actions.length === 0 ? (
        <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">{empty}</p>
      ) : (
        actions.map((action) => (
          <div key={action.id} className="rounded-lg border border-border p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-foreground">{action.title}</h3>
                  {urgencyBadge(action.urgency)}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{action.person} · {action.email}</p>
                {action.phone && <p className="text-sm text-muted-foreground">{action.phone}</p>}
                <p className="mt-3 text-sm leading-relaxed text-foreground">{action.reason}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {sourceTitle(action.source)} · {action.dueLabel} · {action.meta}
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                {action.phone && (
                  <Button asChild size="sm" variant="outline" className="gap-2">
                    <a href={formatPhoneHref(action.phone)}>
                      <Phone className="h-4 w-4" />
                      Call
                    </a>
                  </Button>
                )}
                <Button asChild size="sm" variant="outline" className="gap-2">
                  <a href={`mailto:${action.email}`}>
                    <Mail className="h-4 w-4" />
                    Email
                  </a>
                </Button>
              </div>
            </div>
          </div>
        ))
      )}
    </CardContent>
  </Card>
);

const DailyMoneyList = ({ items }: { items: MoneyListItem[] }) => (
  <Card className="border-green-200 bg-green-50/60">
    <CardHeader>
      <CardTitle className="flex flex-col gap-3 text-base md:flex-row md:items-center md:justify-between">
        <span className="flex items-center gap-2">
          <CircleDollarSign className="h-5 w-5 text-green-700" />
          Daily Money List
        </span>
        <Badge className="w-fit bg-green-700 text-white hover:bg-green-700">{items.length} priority actions</Badge>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      {items.length === 0 ? (
        <p className="rounded-lg border border-dashed border-green-200 bg-white/70 p-4 text-sm text-muted-foreground">
          No money-list actions are due right now. Refresh after new leads, calls, consults, or contracts come in.
        </p>
      ) : (
        items.map((item, index) => (
          <div key={item.id} className="rounded-lg border border-green-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">#{index + 1}</Badge>
                  <Badge className={laneClass(item.lane)}>{laneLabel(item.lane)}</Badge>
                  {urgencyBadge(item.urgency)}
                  <Badge variant="outline">Score {item.moneyScore}</Badge>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.person} · {item.email}</p>
                {item.phone && <p className="text-sm text-muted-foreground">{item.phone}</p>}
                <p className="mt-3 text-sm leading-relaxed text-foreground">{item.reason}</p>
                <div className="mt-3 grid gap-2 text-xs text-muted-foreground md:grid-cols-3">
                  <p><span className="font-semibold text-foreground">Source:</span> {sourceTitle(item.source)}</p>
                  <p><span className="font-semibold text-foreground">Value:</span> {item.valueLabel}</p>
                  <p><span className="font-semibold text-foreground">Timing:</span> {item.dueLabel}</p>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{item.evidence}</p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                {item.phone && (
                  <Button asChild size="sm" className="gap-2">
                    <a href={formatPhoneHref(item.phone)}>
                      <Phone className="h-4 w-4" />
                      Call
                    </a>
                  </Button>
                )}
                <Button asChild size="sm" variant="outline" className="gap-2">
                  <a href={`mailto:${item.email}`}>
                    <Mail className="h-4 w-4" />
                    Email
                  </a>
                </Button>
              </div>
            </div>
          </div>
        ))
      )}
    </CardContent>
  </Card>
);

const WeeklyRevenueActionsManager = () => {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<CrmContactRow[]>([]);
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [contracts, setContracts] = useState<ContractRow[]>([]);
  const [followups, setFollowups] = useState<FollowupRow[]>([]);
  const [dataIssues, setDataIssues] = useState<string[]>([]);

  const fetchActions = useCallback(async () => {
    setLoading(true);
    const [contactsResult, bookingsResult, contractsResult, followupsResult] = await Promise.all([
      supabase
        .from("crm_contacts")
        .select("id,email,first_name,last_name,phone,source,source_attribution,lead_score,revenue_path,pipeline_status,next_action,next_action_due_at,last_engagement_at,created_at,updated_at")
        .order("next_action_due_at", { ascending: true, nullsFirst: false })
        .limit(750),
      supabase
        .from("bookings")
        .select("id,customer_email,customer_name,customer_phone,booking_type,booking_date,booking_time,status,source_attribution,created_at")
        .order("booking_date", { ascending: false })
        .limit(500),
      supabase
        .from("contracts")
        .select("id,client_email,client_name,client_phone,contract_type,status,amount_cents,source_attribution,signed_at,created_at,updated_at")
        .order("updated_at", { ascending: false })
        .limit(500),
      supabase
        .from("freedom_followup_queue")
        .select("id,contact_email,contact_name,contact_phone,followup_reason,priority,status,due_at,source_attribution")
        .eq("status", "pending")
        .order("due_at", { ascending: true })
        .limit(500),
    ]);

    const issues: string[] = [];
    if (contactsResult.error) issues.push("CRM contacts");
    if (bookingsResult.error) issues.push("bookings");
    if (contractsResult.error) issues.push("contracts");
    if (followupsResult.error) issues.push("follow-up queue");

    setContacts((contactsResult.error ? [] : contactsResult.data ?? []) as CrmContactRow[]);
    setBookings((bookingsResult.error ? [] : bookingsResult.data ?? []) as BookingRow[]);
    setContracts((contractsResult.error ? [] : contractsResult.data ?? []) as ContractRow[]);
    setFollowups((followupsResult.error ? [] : followupsResult.data ?? []) as FollowupRow[]);
    setDataIssues(issues);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchActions();
  }, [fetchActions]);

  const contractEmails = useMemo(() => new Set(contracts.map((row) => row.client_email.toLowerCase())), [contracts]);
  const paidEmails = useMemo(() => new Set(contracts.filter((row) => row.status === "paid").map((row) => row.client_email.toLowerCase())), [contracts]);

  const callToday = useMemo(() => {
    const now = new Date();
    return contacts
      .filter((lead) => !closedStages.has(lead.pipeline_status))
      .filter((lead) => lead.lead_score >= 60 || ["new", "contacted", "consultation_booked"].includes(lead.pipeline_status))
      .filter((lead) => !lead.next_action_due_at || isBefore(parseISO(lead.next_action_due_at), now) || differenceInCalendarDays(parseISO(lead.next_action_due_at), startOfToday()) === 0)
      .sort((a, b) => {
        if (b.lead_score !== a.lead_score) return b.lead_score - a.lead_score;
        return new Date(a.next_action_due_at || a.created_at).getTime() - new Date(b.next_action_due_at || b.created_at).getTime();
      })
      .slice(0, 10)
      .map((lead): RevenueAction => ({
        id: `call-${lead.id}`,
        title: lead.next_action || (lead.lead_score >= 75 ? "Call this high-intent lead" : "Call and clarify next step"),
        person: contactName(lead),
        email: lead.email,
        phone: lead.phone,
        reason: `${statusLabel(lead.pipeline_status)} · lead score ${lead.lead_score}. Move them toward consult, readiness, contract, or close.`,
        source: sourceKey(lead.source_attribution, lead.source),
        urgency: lead.lead_score >= 80 ? "critical" : lead.lead_score >= 60 ? "high" : "normal",
        dueLabel: dueText(lead.next_action_due_at),
        meta: lead.revenue_path ? lead.revenue_path.replace(/_/g, " ") : "No revenue path set",
      }));
  }, [contacts]);

  const staleContracts = useMemo(() => {
    const crmContractActions = contacts
      .filter((lead) => ["contract_sent", "contract_signed"].includes(lead.pipeline_status))
      .filter((lead) => !paidEmails.has(lead.email.toLowerCase()))
      .filter((lead) => differenceInCalendarDays(new Date(), parseISO(lead.last_engagement_at || lead.updated_at || lead.created_at)) >= 1)
      .map((lead): RevenueAction => ({
        id: `crm-contract-${lead.id}`,
        title: lead.pipeline_status === "contract_sent" ? "Contract sent but not closed" : "Signed agreement needs payment/onboarding",
        person: contactName(lead),
        email: lead.email,
        phone: lead.phone,
        reason: lead.pipeline_status === "contract_sent"
          ? "Call before the family loses momentum. Resolve objections, signing questions, or payment timing."
          : "Confirm payment and schedule the next intervention preparation step.",
        source: sourceKey(lead.source_attribution, lead.source),
        urgency: "critical",
        dueLabel: dueText(lead.next_action_due_at),
        meta: statusLabel(lead.pipeline_status),
      }));

    const signedUnpaid = contracts
      .filter((contract) => contract.status !== "paid")
      .filter((contract) => differenceInCalendarDays(new Date(), parseISO(contract.signed_at || contract.created_at)) >= 1)
      .map((contract): RevenueAction => ({
        id: `contract-${contract.id}`,
        title: "Signed contract has not converted to paid",
        person: contract.client_name,
        email: contract.client_email,
        phone: contract.client_phone,
        reason: `Signed ${contract.contract_type.replace(/-/g, " ")} contract for ${formatUsd(contract.amount_cents)} still shows ${contract.status}.`,
        source: sourceKey(contract.source_attribution, "contract"),
        urgency: "critical",
        dueLabel: `${differenceInCalendarDays(new Date(), parseISO(contract.signed_at || contract.created_at))} days since signature`,
        meta: `Status ${contract.status}`,
      }));

    return [...crmContractActions, ...signedUnpaid].slice(0, 10);
  }, [contacts, contracts, paidEmails]);

  const consultsNotConverted = useMemo(() => {
    const today = startOfToday();
    return bookings
      .filter((booking) => booking.booking_type === "consultation")
      .filter((booking) => !contractEmails.has(booking.customer_email.toLowerCase()))
      .filter((booking) => isBefore(parseISO(booking.booking_date), today))
      .sort((a, b) => new Date(b.booking_date).getTime() - new Date(a.booking_date).getTime())
      .slice(0, 10)
      .map((booking): RevenueAction => ({
        id: `consult-${booking.id}`,
        title: "Consult happened but did not become contract",
        person: booking.customer_name,
        email: booking.customer_email,
        phone: booking.customer_phone,
        reason: "Follow up with a clear recommendation: no paid help needed, readiness intensive, or full intervention engagement.",
        source: sourceKey(booking.source_attribution, "booking"),
        urgency: differenceInCalendarDays(today, parseISO(booking.booking_date)) <= 3 ? "high" : "normal",
        dueLabel: `${differenceInCalendarDays(today, parseISO(booking.booking_date))} days since consult`,
        meta: `${booking.status} · ${booking.booking_date} ${booking.booking_time}`,
      }));
  }, [bookings, contractEmails]);

  const readinessProspects = useMemo(() => {
    return contacts
      .filter((lead) => !closedStages.has(lead.pipeline_status))
      .filter((lead) => lead.pipeline_status === "readiness_intensive" || /readiness|intervention/i.test(`${lead.revenue_path || ""} ${lead.next_action || ""}`))
      .sort((a, b) => {
        const aDue = new Date(a.next_action_due_at || a.last_engagement_at || a.created_at).getTime();
        const bDue = new Date(b.next_action_due_at || b.last_engagement_at || b.created_at).getTime();
        return aDue - bDue;
      })
      .slice(0, 10)
      .map((lead): RevenueAction => ({
        id: `readiness-${lead.id}`,
        title: lead.pipeline_status === "readiness_intensive" ? "Readiness prospect needs next step" : "Intervention/readiness intent needs triage",
        person: contactName(lead),
        email: lead.email,
        phone: lead.phone,
        reason: lead.next_action || "Clarify whether this is a Family Readiness Intensive, contract path, or coaching-only lead.",
        source: sourceKey(lead.source_attribution, lead.source),
        urgency: lead.lead_score >= 75 ? "critical" : "high",
        dueLabel: dueText(lead.next_action_due_at),
        meta: `Lead score ${lead.lead_score} · ${statusLabel(lead.pipeline_status)}`,
      }));
  }, [contacts]);

  const attributedOpportunities = useMemo(() => {
    return contacts
      .filter((lead) => funnelSources.has(sourceFamily(sourceKey(lead.source_attribution, lead.source))))
      .filter((lead) => revenueStages.has(lead.pipeline_status) || lead.lead_score >= 60 || Boolean(lead.revenue_path))
      .sort((a, b) => {
        if (revenueStages.has(b.pipeline_status) !== revenueStages.has(a.pipeline_status)) {
          return revenueStages.has(b.pipeline_status) ? 1 : -1;
        }
        if (b.lead_score !== a.lead_score) return b.lead_score - a.lead_score;
        return new Date(b.last_engagement_at || b.created_at).getTime() - new Date(a.last_engagement_at || a.created_at).getTime();
      })
      .slice(0, 12)
      .map((lead): RevenueAction => ({
        id: `attributed-${lead.id}`,
        title: `${sourceTitle(sourceKey(lead.source_attribution, lead.source))} opportunity`,
        person: contactName(lead),
        email: lead.email,
        phone: lead.phone,
        reason: `This lead came from the connected funnel and is now ${statusLabel(lead.pipeline_status)}. Keep attribution tight so we know which upstream site is producing revenue.`,
        source: sourceKey(lead.source_attribution, lead.source),
        urgency: revenueStages.has(lead.pipeline_status) ? "high" : "normal",
        dueLabel: dueText(lead.next_action_due_at),
        meta: lead.revenue_path ? lead.revenue_path.replace(/_/g, " ") : `Lead score ${lead.lead_score}`,
      }));
  }, [contacts]);

  const dueFollowups = useMemo(() => {
    const now = new Date();
    return followups.filter((row) => isBefore(parseISO(row.due_at), now)).length;
  }, [followups]);

  const dailyMoneyList = useMemo(() => {
    const candidates: MoneyListItem[] = [];
    const contractValueByEmail = new Map<string, number>();

    contracts.forEach((contract) => {
      const email = normalizeEmail(contract.client_email);
      contractValueByEmail.set(email, Math.max(contractValueByEmail.get(email) || 0, contract.amount_cents || 0));
    });

    contacts
      .filter((lead) => !closedStages.has(lead.pipeline_status))
      .forEach((lead) => {
        const source = sourceKey(lead.source_attribution, lead.source);
        const due = dueText(lead.next_action_due_at);
        const score = Math.round(
          lead.lead_score +
          stageBoost(lead.pipeline_status) +
          dueBoost(lead.next_action_due_at) +
          sourceBoost(source) +
          (lead.phone ? 8 : 0) +
          (lead.revenue_path ? 6 : 0),
        );

        let lane: MoneyListItem["lane"] = "nurture";
        if (["contract_sent", "contract_signed"].includes(lead.pipeline_status)) lane = "close";
        else if (["consultation_booked", "readiness_intensive"].includes(lead.pipeline_status)) lane = "book";
        else if (lead.lead_score >= 60 || funnelSources.has(sourceFamily(source))) lane = "book";

        const contractValue = contractValueByEmail.get(normalizeEmail(lead.email)) || 0;
        candidates.push({
          id: `money-lead-${lead.id}`,
          title: lead.next_action || (lane === "close" ? "Close the next revenue step" : "Call and create the next revenue step"),
          person: contactName(lead),
          email: lead.email,
          phone: lead.phone,
          reason: lane === "close"
            ? "This is already in the contract or payment lane. Call first and remove the final blocker."
            : "This lead has enough intent to justify same-day human follow-up. Move them toward consult, readiness, or contract.",
          source,
          urgency: score >= 120 ? "critical" : score >= 85 ? "high" : "normal",
          dueLabel: due,
          meta: lead.revenue_path ? lead.revenue_path.replace(/_/g, " ") : statusLabel(lead.pipeline_status),
          moneyScore: score,
          lane,
          valueLabel: contractValue ? formatUsd(contractValue) : lead.revenue_path ? lead.revenue_path.replace(/_/g, " ") : "Unknown, qualify on call",
          evidence: `${statusLabel(lead.pipeline_status)} · lead score ${lead.lead_score} · ${sourceTitle(source)}`,
        });
      });

    contracts
      .filter((contract) => contract.status !== "paid")
      .forEach((contract) => {
        const daysSinceSignature = differenceInCalendarDays(new Date(), parseISO(contract.signed_at || contract.created_at));
        candidates.push({
          id: `money-contract-${contract.id}`,
          title: "Signed contract needs payment or final close",
          person: contract.client_name,
          email: contract.client_email,
          phone: contract.client_phone,
          reason: "This is closest to revenue. Call to confirm payment, remove hesitation, and schedule the next intervention preparation step.",
          source: sourceKey(contract.source_attribution, "contract"),
          urgency: "critical",
          dueLabel: `${daysSinceSignature} day${daysSinceSignature === 1 ? "" : "s"} since signature`,
          meta: `Status ${contract.status}`,
          moneyScore: 150 + Math.min(Math.round((contract.amount_cents || 0) / 10000), 40) + Math.max(daysSinceSignature, 0),
          lane: "close",
          valueLabel: formatUsd(contract.amount_cents),
          evidence: `${contract.contract_type.replace(/-/g, " ")} · ${statusLabel(contract.status)}`,
        });
      });

    bookings
      .filter((booking) => booking.booking_type === "consultation")
      .filter((booking) => !contractEmails.has(booking.customer_email.toLowerCase()))
      .filter((booking) => isBefore(parseISO(booking.booking_date), startOfToday()))
      .forEach((booking) => {
        const daysSinceConsult = differenceInCalendarDays(startOfToday(), parseISO(booking.booking_date));
        candidates.push({
          id: `money-consult-${booking.id}`,
          title: "Past consultation needs a revenue decision",
          person: booking.customer_name,
          email: booking.customer_email,
          phone: booking.customer_phone,
          reason: "Do not let a completed consult drift. Follow up with the recommended lane: no paid help, coaching, readiness intensive, or intervention.",
          source: sourceKey(booking.source_attribution, "booking"),
          urgency: daysSinceConsult <= 2 ? "high" : "normal",
          dueLabel: `${daysSinceConsult} day${daysSinceConsult === 1 ? "" : "s"} since consult`,
          meta: `${booking.status} · ${booking.booking_date}`,
          moneyScore: 92 - Math.min(daysSinceConsult, 21) + sourceBoost(sourceKey(booking.source_attribution, "booking")) + (booking.customer_phone ? 8 : 0),
          lane: "recover",
          valueLabel: "Post-consult opportunity",
          evidence: `Consultation completed · no contract found`,
        });
      });

    followups
      .filter((row) => row.status === "pending")
      .filter((row) => !isBefore(new Date(), parseISO(row.due_at)))
      .forEach((row) => {
        const source = sourceKey(row.source_attribution, "followup");
        const priorityScore = row.priority === "urgent" ? 34 : row.priority === "high" ? 22 : 10;
        candidates.push({
          id: `money-followup-${row.id}`,
          title: "Automated follow-up is due now",
          person: row.contact_name || row.contact_email,
          email: row.contact_email,
          phone: row.contact_phone,
          reason: "The system says this follow-up is due. If it is high-priority, pair the email with a personal call or text.",
          source,
          urgency: row.priority === "urgent" ? "critical" : row.priority === "high" ? "high" : "normal",
          dueLabel: dueText(row.due_at),
          meta: row.followup_reason.replace(/_/g, " "),
          moneyScore: 62 + priorityScore + dueBoost(row.due_at) + sourceBoost(source) + (row.contact_phone ? 8 : 0),
          lane: row.priority === "urgent" ? "book" : "nurture",
          valueLabel: "Follow-up due",
          evidence: `${row.priority} priority · ${row.followup_reason.replace(/_/g, " ")}`,
        });
      });

    const byEmail = new Map<string, MoneyListItem>();
    candidates.forEach((item) => {
      const key = normalizeEmail(item.email);
      const existing = byEmail.get(key);
      if (!existing || actionSort(item, existing) < 0) {
        byEmail.set(key, item);
      }
    });

    return [...byEmail.values()].sort(actionSort).slice(0, 12);
  }, [bookings, contacts, contractEmails, contracts, followups]);

  const totals = useMemo(() => ({
    callToday: callToday.length,
    staleContracts: staleContracts.length,
    consults: consultsNotConverted.length,
    readiness: readinessProspects.length,
    attributed: attributedOpportunities.length,
    moneyList: dailyMoneyList.length,
  }), [attributedOpportunities.length, callToday.length, consultsNotConverted.length, dailyMoneyList.length, readinessProspects.length, staleContracts.length]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-6">
        <Card className="border-green-200 bg-green-50/70">
          <CardContent className="p-4">
            <p className="text-xs uppercase text-muted-foreground">Money List</p>
            <p className="text-2xl font-bold text-green-700">{totals.moneyList}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs uppercase text-muted-foreground">Call Today</p>
            <p className="text-2xl font-bold text-red-600">{totals.callToday}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs uppercase text-muted-foreground">Contract Risk</p>
            <p className="text-2xl font-bold text-amber-600">{totals.staleContracts}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs uppercase text-muted-foreground">Consult Gaps</p>
            <p className="text-2xl font-bold">{totals.consults}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs uppercase text-muted-foreground">Readiness</p>
            <p className="text-2xl font-bold">{totals.readiness}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs uppercase text-muted-foreground">NME/SH Opps</p>
            <p className="text-2xl font-bold text-green-700">{totals.attributed}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground">Daily money list</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Work the top row first: closest money, fastest response, highest attribution value. There are {dueFollowups} automated follow-up emails due now.
            </p>
          </div>
          <Button variant="outline" onClick={fetchActions} disabled={loading} className="gap-2">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </CardContent>
      </Card>

      {dataIssues.length > 0 && (
        <Card className="border-amber-300 bg-amber-50 text-amber-950">
          <CardContent className="flex flex-col gap-2 p-4 md:flex-row md:items-start">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <div className="text-sm">
              <p className="font-semibold">Some revenue-action data is not available yet.</p>
              <p className="mt-1">
                This tab is still usable. These sources could not be read from the current backend session: {dataIssues.join(", ")}.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">Loading daily money list...</CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <DailyMoneyList items={dailyMoneyList} />
          <div className="grid gap-6 xl:grid-cols-2">
          <ActionList
            title="Leads Needing a Call Today"
            icon={Phone}
            actions={callToday}
            empty="No urgent call actions are due right now."
          />
          <ActionList
            title="Contracts Sitting Too Long"
            icon={FileSignature}
            actions={staleContracts}
            empty="No contract-stage leads look stale right now."
          />
          <ActionList
            title="Consults Booked But Not Converted"
            icon={CalendarClock}
            actions={consultsNotConverted}
            empty="No past consultations are missing a next revenue step."
          />
          <ActionList
            title="Readiness and Intervention Prospects"
            icon={Users}
            actions={readinessProspects}
            empty="No readiness-stage prospects need attention right now."
          />
          <div className="xl:col-span-2">
            <ActionList
              title="NME and Sober Helpline Revenue Opportunities"
              icon={Target}
              actions={attributedOpportunities}
              empty="No attributed NME or Sober Helpline opportunities yet."
            />
          </div>
          <Card className="xl:col-span-2">
            <CardContent className="flex flex-col gap-3 p-5 md:flex-row md:items-center">
              {dueFollowups > 0 ? (
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              ) : (
                <CheckCircle2 className="h-5 w-5 text-green-700" />
              )}
              <p className="text-sm text-muted-foreground">
                Follow-up queue: {dueFollowups > 0 ? `${dueFollowups} pending email${dueFollowups === 1 ? "" : "s"} are due now. Run the Follow-Ups tab processor when ready.` : "No automated emails are overdue."}
              </p>
            </CardContent>
          </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyRevenueActionsManager;
