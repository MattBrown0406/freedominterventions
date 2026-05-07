import { useCallback, useEffect, useMemo, useState } from "react";
import { subDays } from "date-fns";
import { AlertCircle, BarChart3, CheckCircle2, DollarSign, ExternalLink, Mail, Megaphone, PhoneCall, RefreshCw, Save, Settings, Target, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import type { Json } from "@/integrations/supabase/types";

interface SourceAttribution {
  source?: string;
  utm_source?: string | null;
  utm_campaign?: string | null;
}

interface CrmContactRow {
  id: string;
  source: string;
  source_attribution: Json;
  lead_score: number;
  revenue_path: string | null;
  pipeline_status: string;
  created_at: string;
}

interface AssessmentRow {
  id: string;
  source_attribution: Json;
  created_at: string;
}

interface BookingRow {
  id: string;
  booking_type: string;
  status: string;
  amount_cents: number | null;
  source_attribution: Json;
  created_at: string;
}

interface ContractRow {
  id: string;
  status: string;
  amount_cents: number | null;
  source_attribution: Json;
  created_at: string;
}

interface CallRow {
  id: string;
  source_attribution: Json;
  phone_number: string;
  page_path: string;
  created_at: string;
}

interface RemoteReport {
  window_days?: number;
  totals?: Record<string, number>;
  by_event?: Array<{ name: string; count: number }>;
  top_pages?: Array<{ name: string; count: number }>;
  top_destinations?: Array<{ name: string; count: number }>;
}

interface RemoteSiteConfig {
  id: string;
  name: string;
  url: string;
  secret: string;
  status: "idle" | "loading" | "ready" | "error";
  error?: string;
  report?: RemoteReport;
}

interface OpenClawNumberConfig {
  id: string;
  name: string;
  phoneNumber: string;
  status: "pending" | "active";
  notes: string;
}

interface CommandCenterSettingsRow {
  id: string;
  remote_sites: Json;
  openclaw_numbers: Json;
  updated_at: string;
}

interface ChannelStats {
  source: string;
  leads: number;
  calls: number;
  assessments: number;
  consultations: number;
  paidConversions: number;
  revenueCents: number;
  highIntentLeads: number;
}

const settingsKey = "freedom_cross_site_revenue_settings";
const openClawSettingsKey = "freedom_openclaw_number_settings";
const commandCenterSettingsId = "default";

const defaultRemoteSites = [
  {
    id: "party_wreckers",
    name: "Party Wreckers",
    url: "https://bvqqxopmnuwzeyusnrsi.supabase.co/functions/v1/party-wreckers-revenue-report",
  },
  {
    id: "sober_helpline",
    name: "Sober Helpline",
    url: "https://anwqprmpzmcqbkttmxos.supabase.co/functions/v1/sober-helpline-revenue-report",
  },
  {
    id: "no_more_enabling",
    name: "No More Enabling",
    url: "https://ctqbadyfhcoxhywrkorf.supabase.co/functions/v1/nme-revenue-report",
  },
];

const defaultOpenClawNumbers = defaultRemoteSites.map((site) => ({
  id: site.id,
  name: site.name,
  phoneNumber: "",
  status: "pending" as const,
  notes: site.id === "no_more_enabling"
    ? "Route NME education/intervention calls to Matt; use label no_more_enabling:openclaw."
    : site.id === "sober_helpline"
      ? "Route Sober Helpline support/coaching calls; use label sober_helpline:openclaw."
      : "Route Party Wreckers listener calls; use label party_wreckers:openclaw.",
}));

const commandCenterSettingsTable = () => supabase.from("admin_command_center_settings" as never) as unknown as {
  select: (columns: string) => {
    eq: (column: string, value: string) => {
      maybeSingle: () => Promise<{ data: CommandCenterSettingsRow | null; error: { message?: string } | null }>;
    };
  };
  upsert: (
    values: {
      id: string;
      remote_sites: Array<{ id: string; url: string; secret: string }>;
      openclaw_numbers: Array<{ id: string; phoneNumber: string; status: OpenClawNumberConfig["status"]; notes: string }>;
      updated_at: string;
    },
    options?: { onConflict?: string },
  ) => Promise<{ error: { message?: string } | null }>;
};

const asSourceAttribution = (value: Json | null | undefined): SourceAttribution => {
  if (value && typeof value === "object" && !Array.isArray(value)) return value as SourceAttribution;
  return {};
};

const sourceKey = (value: Json | null | undefined, fallback = "unknown") => {
  const attribution = asSourceAttribution(value);
  return attribution.source || attribution.utm_source || fallback;
};

const sourceTitle = (source: string) => {
  const labels: Record<string, string> = {
    no_more_enabling: "No More Enabling",
    no_more_enabling_bridge: "No More Enabling",
    sober_helpline: "Sober Helpline",
    sober_helpline_bridge: "Sober Helpline",
    party_wreckers: "Party Wreckers",
    organic_google: "Google Organic",
    organic_bing: "Bing Organic",
    direct: "Direct",
    referral: "Referral",
    unknown: "Unknown",
  };
  return labels[source] || source.replace(/_/g, " ");
};

const sourceFamily = (source: string) => {
  if (source.includes("no_more_enabling") || source.includes("nme")) return "no_more_enabling";
  if (source.includes("sober_helpline") || source.includes("family_squares")) return "sober_helpline";
  if (source.includes("party_wreckers")) return "party_wreckers";
  return source;
};

const formatUsd = (cents: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);

const formatPercent = (numerator: number, denominator: number) => {
  if (!denominator) return "0%";
  return `${Math.round((numerator / denominator) * 100)}%`;
};

const numberFromTotals = (report: RemoteReport | undefined, keys: string[]) => {
  if (!report?.totals) return 0;
  return keys.reduce((sum, key) => sum + (Number(report.totals?.[key]) || 0), 0);
};

const topRemotePages = (remoteSites: RemoteSiteConfig[]) =>
  remoteSites
    .flatMap((site) => (site.report?.top_pages ?? []).map((page) => ({ ...page, site: site.name })))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

const openClawCampaignKey = (siteId: string) => `${siteId}:openclaw`;

const safeRemoteSettings = (value: Json): Array<{ id: string; url?: string; secret?: string }> => {
  if (!Array.isArray(value)) return [];
  return value.filter((site): site is { id: string; url?: string; secret?: string } => {
    if (!site || typeof site !== "object" || Array.isArray(site)) return false;
    const row = site as Record<string, unknown>;
    return typeof row.id === "string";
  });
};

const safeOpenClawSettings = (value: Json): Array<{ id: string; phoneNumber?: string; status?: OpenClawNumberConfig["status"]; notes?: string }> => {
  if (!Array.isArray(value)) return [];
  return value.filter((site): site is { id: string; phoneNumber?: string; status?: OpenClawNumberConfig["status"]; notes?: string } => {
    if (!site || typeof site !== "object" || Array.isArray(site)) return false;
    const row = site as Record<string, unknown>;
    return typeof row.id === "string";
  });
};

const CrossSiteRevenueDashboard = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<CrmContactRow[]>([]);
  const [assessments, setAssessments] = useState<AssessmentRow[]>([]);
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [contracts, setContracts] = useState<ContractRow[]>([]);
  const [calls, setCalls] = useState<CallRow[]>([]);
  const [dataIssues, setDataIssues] = useState<string[]>([]);
  const [settingsStatus, setSettingsStatus] = useState<"local" | "backend" | "missing_backend">("local");
  const [settingsBusy, setSettingsBusy] = useState(false);
  const [weeklySummarySending, setWeeklySummarySending] = useState(false);
  const [weeklySummaryStatus, setWeeklySummaryStatus] = useState<string | null>(null);
  const [remoteSites, setRemoteSites] = useState<RemoteSiteConfig[]>(() => {
    if (typeof window === "undefined") {
      return defaultRemoteSites.map((site) => ({ ...site, secret: "", status: "idle" }));
    }

    const saved = window.localStorage.getItem(settingsKey);
    const savedMap = new Map<string, { id: string; url?: string; secret?: string }>();

    if (saved) {
      try {
        (JSON.parse(saved) as Array<{ id: string; url?: string; secret?: string }>).forEach((site) => {
          savedMap.set(site.id, site);
        });
      } catch {
        window.localStorage.removeItem(settingsKey);
      }
    }

    return defaultRemoteSites.map((site) => ({
      ...site,
      url: savedMap.get(site.id)?.url || site.url,
      secret: savedMap.get(site.id)?.secret || "",
      status: "idle",
    }));
  });
  const [openClawNumbers, setOpenClawNumbers] = useState<OpenClawNumberConfig[]>(() => {
    if (typeof window === "undefined") return defaultOpenClawNumbers;

    const saved = window.localStorage.getItem(openClawSettingsKey);
    const savedMap = new Map<string, { id: string; phoneNumber?: string; status?: OpenClawNumberConfig["status"]; notes?: string }>();

    if (saved) {
      try {
        (JSON.parse(saved) as Array<{ id: string; phoneNumber?: string; status?: OpenClawNumberConfig["status"]; notes?: string }>).forEach((site) => {
          savedMap.set(site.id, site);
        });
      } catch {
        window.localStorage.removeItem(openClawSettingsKey);
      }
    }

    return defaultOpenClawNumbers.map((site) => ({
      ...site,
      phoneNumber: savedMap.get(site.id)?.phoneNumber || "",
      status: savedMap.get(site.id)?.status || "pending",
      notes: savedMap.get(site.id)?.notes || "",
    }));
  });

  const saveRemoteSites = useCallback((next: RemoteSiteConfig[]) => {
    setRemoteSites(next);
    if (typeof window === "undefined") return;

    window.localStorage.setItem(
      settingsKey,
      JSON.stringify(next.map(({ id, url, secret }) => ({ id, url, secret }))),
    );
  }, []);

  const saveOpenClawNumbers = useCallback((next: OpenClawNumberConfig[]) => {
    setOpenClawNumbers(next);
    if (typeof window === "undefined") return;

    window.localStorage.setItem(
      openClawSettingsKey,
      JSON.stringify(next.map(({ id, phoneNumber, status, notes }) => ({ id, phoneNumber, status, notes }))),
    );
  }, []);

  const updateRemoteSite = (id: string, patch: Partial<RemoteSiteConfig>) => {
    saveRemoteSites(remoteSites.map((site) => (site.id === id ? { ...site, ...patch } : site)));
  };

  const updateOpenClawNumber = (id: string, patch: Partial<OpenClawNumberConfig>) => {
    saveOpenClawNumbers(openClawNumbers.map((site) => (site.id === id ? { ...site, ...patch } : site)));
  };

  const loadSavedSettings = useCallback(async () => {
    setSettingsBusy(true);
    const { data, error } = await commandCenterSettingsTable()
      .select("id,remote_sites,openclaw_numbers,updated_at")
      .eq("id", commandCenterSettingsId)
      .maybeSingle();

    if (error) {
      setSettingsStatus("missing_backend");
      setSettingsBusy(false);
      return;
    }

    if (data) {
      const remoteMap = new Map(safeRemoteSettings(data.remote_sites).map((site) => [site.id, site]));
      const openClawMap = new Map(safeOpenClawSettings(data.openclaw_numbers).map((site) => [site.id, site]));
      const nextRemoteSites = defaultRemoteSites.map((site) => ({
        ...site,
        url: remoteMap.get(site.id)?.url || site.url,
        secret: remoteMap.get(site.id)?.secret || "",
        status: "idle" as const,
      }));
      const nextOpenClawNumbers = defaultOpenClawNumbers.map((site) => ({
        ...site,
        phoneNumber: openClawMap.get(site.id)?.phoneNumber || "",
        status: openClawMap.get(site.id)?.status || "pending",
        notes: openClawMap.get(site.id)?.notes || "",
      }));

      saveRemoteSites(nextRemoteSites);
      saveOpenClawNumbers(nextOpenClawNumbers);
      setSettingsStatus("backend");
    }

    setSettingsBusy(false);
  }, [saveOpenClawNumbers, saveRemoteSites]);

  const saveSettingsToBackend = async () => {
    setSettingsBusy(true);
    const { error } = await commandCenterSettingsTable().upsert({
      id: commandCenterSettingsId,
      remote_sites: remoteSites.map(({ id, url, secret }) => ({ id, url, secret })),
      openclaw_numbers: openClawNumbers.map(({ id, phoneNumber, status, notes }) => ({ id, phoneNumber, status, notes })),
      updated_at: new Date().toISOString(),
    }, { onConflict: "id" });

    setSettingsBusy(false);

    if (error) {
      setSettingsStatus("missing_backend");
      toast({
        title: "Settings saved in this browser",
        description: "The durable backend settings table still needs to be applied in Lovable.",
      });
      return;
    }

    setSettingsStatus("backend");
    toast({
      title: "Command Center settings saved",
      description: "Report URLs, secrets, and OpenClaw numbers are now stored for admin use.",
    });
  };

  const fetchFreedomData = useCallback(async () => {
    setLoading(true);
    const since = subDays(new Date(), 30).toISOString();

    const [contactsResult, assessmentsResult, bookingsResult, contractsResult, callsResult] = await Promise.all([
      supabase.from("crm_contacts").select("id,source,source_attribution,lead_score,revenue_path,pipeline_status,created_at").gte("created_at", since).order("created_at", { ascending: false }).limit(1000),
      supabase.from("assessments").select("id,source_attribution,created_at").gte("created_at", since).order("created_at", { ascending: false }).limit(1000),
      supabase.from("bookings").select("id,booking_type,status,amount_cents,source_attribution,created_at").gte("created_at", since).order("created_at", { ascending: false }).limit(1000),
      supabase.from("contracts").select("id,status,amount_cents,source_attribution,created_at").gte("created_at", since).order("created_at", { ascending: false }).limit(1000),
      supabase.from("call_analytics").select("id,source_attribution,phone_number,page_path,created_at").gte("created_at", since).order("created_at", { ascending: false }).limit(1000),
    ]);

    const issues: string[] = [];

    if (contactsResult.error) issues.push("CRM contacts");
    if (assessmentsResult.error) issues.push("assessments");
    if (bookingsResult.error) issues.push("bookings");
    if (contractsResult.error) issues.push("contracts");
    if (callsResult.error) issues.push("call tracking");

    setContacts((contactsResult.error ? [] : contactsResult.data ?? []) as CrmContactRow[]);
    setAssessments((assessmentsResult.error ? [] : assessmentsResult.data ?? []) as AssessmentRow[]);
    setBookings((bookingsResult.error ? [] : bookingsResult.data ?? []) as BookingRow[]);
    setContracts((contractsResult.error ? [] : contractsResult.data ?? []) as ContractRow[]);
    setCalls((callsResult.error ? [] : callsResult.data ?? []) as CallRow[]);
    setDataIssues(issues);
    setLoading(false);
  }, []);

  const fetchRemoteReports = useCallback(async () => {
    const loadingSites = remoteSites.map((site) => (site.url && site.secret ? { ...site, status: "loading" as const } : site));
    setRemoteSites(loadingSites);

    const next = await Promise.all(loadingSites.map(async (site) => {
      if (!site.url || !site.secret) return site;

      try {
        const response = await fetch(site.url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "x-report-secret": site.secret,
          },
        });

        const report = await response.json();
        if (!response.ok) throw new Error(report?.error || "Report request failed");
        return { ...site, status: "ready" as const, report, error: undefined };
      } catch (error) {
        const message = error instanceof Error ? error.message : "Could not load report";
        return { ...site, status: "error" as const, error: message };
      }
    }));

    saveRemoteSites(next);
  }, [remoteSites, saveRemoteSites]);

  const sendWeeklyOwnerSummary = async () => {
    setWeeklySummarySending(true);
    setWeeklySummaryStatus(null);

    const { data, error } = await supabase.functions.invoke("send-weekly-owner-summary", {
      body: { manual: true, source: "freedom_command_center" },
    });

    setWeeklySummarySending(false);

    if (error) {
      setWeeklySummaryStatus("Could not send weekly email. The Lovable backend function may need to be deployed.");
      toast({
        title: "Weekly email was not sent",
        description: error.message || "Deploy the weekly owner summary function in Lovable, then try again.",
        variant: "destructive",
      });
      return;
    }

    const sentTo = typeof data === "object" && data && "sent_to" in data ? String(data.sent_to) : "Matt";
    setWeeklySummaryStatus(`Last sent to ${sentTo}.`);
    toast({
      title: "Weekly owner email sent",
      description: "The Freedom revenue summary has been emailed.",
    });
  };

  useEffect(() => {
    fetchFreedomData();
  }, [fetchFreedomData]);

  useEffect(() => {
    void loadSavedSettings();
  }, [loadSavedSettings]);

  const channelStats = useMemo(() => {
    const map = new Map<string, ChannelStats>();
    const get = (source: string) => {
      const key = sourceFamily(source);
      const existing = map.get(key);
      if (existing) return existing;
      const next: ChannelStats = {
        source: key,
        leads: 0,
        calls: 0,
        assessments: 0,
        consultations: 0,
        paidConversions: 0,
        revenueCents: 0,
        highIntentLeads: 0,
      };
      map.set(key, next);
      return next;
    };

    contacts.forEach((contact) => {
      const stats = get(sourceKey(contact.source_attribution, contact.source));
      stats.leads += 1;
      if ((contact.lead_score || 0) >= 50 || ["consultation_booked", "readiness_intensive", "contract_sent", "contract_signed"].includes(contact.pipeline_status)) {
        stats.highIntentLeads += 1;
      }
    });

    assessments.forEach((assessment) => {
      get(sourceKey(assessment.source_attribution, "assessment")).assessments += 1;
    });

    calls.forEach((call) => {
      get(sourceKey(call.source_attribution, "call")).calls += 1;
    });

    bookings.forEach((booking) => {
      const stats = get(sourceKey(booking.source_attribution, "booking"));
      if (booking.booking_type === "consultation") {
        stats.consultations += 1;
      } else if (booking.status === "confirmed") {
        stats.paidConversions += 1;
        stats.revenueCents += booking.amount_cents || 0;
      }
    });

    contracts.forEach((contract) => {
      const stats = get(sourceKey(contract.source_attribution, "contract"));
      if (contract.status === "paid") {
        stats.paidConversions += 1;
        stats.revenueCents += contract.amount_cents || 0;
      }
    });

    return [...map.values()].sort((a, b) => {
      if (b.revenueCents !== a.revenueCents) return b.revenueCents - a.revenueCents;
      return b.highIntentLeads + b.consultations + b.calls - (a.highIntentLeads + a.consultations + a.calls);
    });
  }, [assessments, bookings, calls, contacts, contracts]);

  const totals = useMemo(() => {
    const freedom = channelStats.reduce(
      (acc, row) => ({
        leads: acc.leads + row.leads,
        calls: acc.calls + row.calls,
        consultations: acc.consultations + row.consultations,
        paidConversions: acc.paidConversions + row.paidConversions,
        revenueCents: acc.revenueCents + row.revenueCents,
        highIntentLeads: acc.highIntentLeads + row.highIntentLeads,
      }),
      { leads: 0, calls: 0, consultations: 0, paidConversions: 0, revenueCents: 0, highIntentLeads: 0 },
    );

    const remoteRevenueIntent = remoteSites.reduce(
      (sum, site) => sum + numberFromTotals(site.report, ["revenue_intent_clicks", "consultation_requests", "intervention_readiness_clicks", "advertiser_inquiries"]),
      0,
    );

    return { ...freedom, remoteRevenueIntent };
  }, [channelStats, remoteSites]);

  const bestChannel = channelStats[0];
  const connectedReports = remoteSites.filter((site) => site.status === "ready").length;
  const missingSecrets = remoteSites.filter((site) => !site.secret).length;
  const openClawReady = openClawNumbers.filter((site) => site.phoneNumber.trim().length > 0).length;
  const remoteTotals = useMemo(() => {
    const events = remoteSites.reduce((sum, site) => sum + numberFromTotals(site.report, ["events", "total_events", "page_views"]), 0);
    const pageViews = remoteSites.reduce((sum, site) => sum + numberFromTotals(site.report, ["page_views"]), 0);
    const registrations = remoteSites.reduce((sum, site) => sum + numberFromTotals(site.report, ["registrations"]), 0);
    const advertiserInquiries = remoteSites.reduce((sum, site) => sum + numberFromTotals(site.report, ["advertiser_inquiries"]), 0);
    const consultationRequests = remoteSites.reduce((sum, site) => sum + numberFromTotals(site.report, ["consultation_requests"]), 0);
    return { events, pageViews, registrations, advertiserInquiries, consultationRequests };
  }, [remoteSites]);
  const advertiserPages = topRemotePages(remoteSites);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-6">
        <MetricCard label="Freedom Leads" value={totals.leads.toLocaleString()} />
        <MetricCard label="High Intent" value={totals.highIntentLeads.toLocaleString()} />
        <MetricCard label="Tracked Calls" value={totals.calls.toLocaleString()} />
        <MetricCard label="Consultations" value={totals.consultations.toLocaleString()} />
        <MetricCard label="Paid Closes" value={totals.paidConversions.toLocaleString()} />
        <MetricCard label="Tracked Revenue" value={formatUsd(totals.revenueCents)} highlight />
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase text-muted-foreground">Weekly Revenue Question</p>
              <h3 className="mt-1 text-xl font-semibold">
                {bestChannel
                  ? `${sourceTitle(bestChannel.source)} is the channel to inspect first this week.`
                  : "Waiting for enough attributed channel data."}
              </h3>
              {bestChannel && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {bestChannel.highIntentLeads} high-intent leads · {bestChannel.calls} calls · {bestChannel.consultations} consults · {formatUsd(bestChannel.revenueCents)} tracked revenue.
                </p>
              )}
            </div>
            <Button variant="outline" onClick={() => { void fetchFreedomData(); void fetchRemoteReports(); }} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh All
            </Button>
          </div>
        </CardContent>
      </Card>

      {dataIssues.length > 0 && (
        <Card className="border-amber-300 bg-amber-50 text-amber-950">
          <CardContent className="flex flex-col gap-2 p-4 md:flex-row md:items-start">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <div className="text-sm">
              <p className="font-semibold">Some Freedom-side data is not available yet.</p>
              <p className="mt-1">
                The Command Center is still usable. These sources could not be read from the current backend session: {dataIssues.join(", ")}.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CheckCircle2 className="h-4 w-4 text-green-700" />
              Command Center QA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <QaLine good={connectedReports === remoteSites.length} label={`${connectedReports}/${remoteSites.length} upstream reports connected`} />
            <QaLine good={missingSecrets === 0} label={missingSecrets === 0 ? "All report secrets are entered" : `${missingSecrets} report secret${missingSecrets === 1 ? "" : "s"} missing`} />
            <QaLine good={dataIssues.length === 0} label={dataIssues.length === 0 ? "Freedom-side admin data is readable" : "Some Freedom-side data is partially unavailable"} />
            <QaLine good={settingsStatus === "backend"} label={settingsStatus === "backend" ? "Settings are saved durably" : "Settings are currently local to this browser"} />
            <QaLine good={openClawReady === openClawNumbers.length} label={openClawReady === openClawNumbers.length ? "OpenClaw numbers are fully mapped" : `${openClawNumbers.length - openClawReady} OpenClaw number${openClawNumbers.length - openClawReady === 1 ? "" : "s"} still pending`} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <DollarSign className="h-4 w-4 text-green-700" />
              Weekly Revenue Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p><span className="font-semibold text-foreground">{totals.remoteRevenueIntent}</span> upstream revenue-intent signals are visible.</p>
            <p><span className="font-semibold text-foreground">{totals.highIntentLeads}</span> Freedom leads are high-intent and should be worked first.</p>
            <p><span className="font-semibold text-foreground">{remoteTotals.consultationRequests}</span> upstream consultation requests and <span className="font-semibold text-foreground">{remoteTotals.registrations}</span> registrations are in the reporting window.</p>
            <p className="pt-1 text-xs">
              Best next action: {bestChannel
                ? `inspect ${sourceTitle(bestChannel.source)}, compare call volume to booked consults, and work the Money List top to bottom.`
                : "load upstream reports and refresh Freedom data."}
            </p>
            <Button size="sm" onClick={() => void sendWeeklyOwnerSummary()} disabled={weeklySummarySending} className="mt-2 w-full gap-2">
              {weeklySummarySending ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
              Email Summary Now
            </Button>
            {weeklySummaryStatus && <p className="text-xs text-muted-foreground">{weeklySummaryStatus}</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Megaphone className="h-4 w-4 text-primary" />
              Advertiser Readiness
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p><span className="font-semibold text-foreground">{remoteTotals.events}</span> reportable upstream events.</p>
            <p><span className="font-semibold text-foreground">{remoteTotals.pageViews}</span> tracked page views and <span className="font-semibold text-foreground">{remoteTotals.advertiserInquiries}</span> advertiser inquiries.</p>
            <p className="pt-1 text-xs">
              {connectedReports >= 2
                ? "Enough report coverage to start building an advertiser snapshot."
                : "Connect at least two upstream reports before using this as advertiser proof."}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Freedom Revenue by Source
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading ? (
              <p className="text-sm text-muted-foreground">Loading Freedom revenue data...</p>
            ) : channelStats.length === 0 ? (
              <p className="text-sm text-muted-foreground">No attributed Freedom revenue data in the last 30 days.</p>
            ) : (
              channelStats.map((row) => (
                <div key={row.source} className="rounded-lg border border-border p-4">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <h3 className="font-semibold">{sourceTitle(row.source)}</h3>
                      <p className="text-sm text-muted-foreground">
                        {row.leads} leads · {row.highIntentLeads} high-intent · {row.calls} calls · {row.consultations} consults
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Consult rate {formatPercent(row.consultations, row.leads)} · paid close rate {formatPercent(row.paidConversions, row.leads)}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{row.assessments} assessments</Badge>
                      <Badge variant="outline">{row.paidConversions} paid closes</Badge>
                      <Badge className="bg-green-700 text-white hover:bg-green-700">{formatUsd(row.revenueCents)}</Badge>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5 text-primary" />
                Upstream Site Reports
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-muted/30 p-3">
                <div>
                  <p className="text-sm font-semibold">Saved Settings</p>
                  <p className="text-xs text-muted-foreground">
                    {settingsStatus === "backend"
                      ? "Report credentials and OpenClaw numbers are stored for admin use."
                      : settingsStatus === "missing_backend"
                        ? "Durable settings need the Lovable backend table; local browser settings still work."
                        : "Settings are saved in this browser until backend storage is applied."}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => void loadSavedSettings()} disabled={settingsBusy} className="gap-2">
                    <RefreshCw className={`h-4 w-4 ${settingsBusy ? "animate-spin" : ""}`} />
                    Load Saved
                  </Button>
                  <Button size="sm" onClick={() => void saveSettingsToBackend()} disabled={settingsBusy} className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Settings
                  </Button>
                </div>
              </div>
              {remoteSites.map((site) => (
                <div key={site.id} className="rounded-lg border border-border p-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-semibold">{site.name}</h3>
                      <RemoteStatusBadge site={site} />
                    </div>
                    <Input
                      value={site.url}
                      onChange={(event) => updateRemoteSite(site.id, { url: event.target.value })}
                      placeholder="Report endpoint URL"
                    />
                    <Input
                      type="password"
                      value={site.secret}
                      onChange={(event) => updateRemoteSite(site.id, { secret: event.target.value })}
                      placeholder="Report secret"
                    />
                    {site.report && <RemoteSummary site={site} />}
                    {site.error && <p className="text-xs text-destructive">{site.error}</p>}
                  </div>
                </div>
              ))}
              <Button variant="outline" onClick={() => { void fetchRemoteReports(); }} className="w-full gap-2">
                <Settings className="h-4 w-4" />
                Load Upstream Reports
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PhoneCall className="h-5 w-5 text-primary" />
                OpenClaw Call Attribution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-border bg-muted/30 p-3 text-sm">
                <p className="font-semibold">{openClawReady}/{openClawNumbers.length} routing numbers entered</p>
                <p className="text-xs text-muted-foreground">Add each OpenClaw number here as you receive it. This gives us the map for call-tracking clarity once routing is dialed in.</p>
              </div>
              {openClawNumbers.map((site) => (
                <div key={site.id} className="rounded-lg border border-border p-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-semibold">{site.name}</h3>
                      <Badge variant={site.phoneNumber ? "default" : "outline"}>{site.phoneNumber ? "Number Set" : "Pending"}</Badge>
                    </div>
                    <div className="rounded-md border border-dashed border-border bg-muted/30 p-3 text-xs text-muted-foreground">
                      <p><span className="font-semibold text-foreground">OpenClaw label:</span> {openClawCampaignKey(site.id)}</p>
                      <p className="mt-1">Use this label in OpenClaw notes/campaign naming so calls reconcile cleanly with Freedom attribution.</p>
                    </div>
                    <Input
                      value={site.phoneNumber}
                      onChange={(event) => updateOpenClawNumber(site.id, { phoneNumber: event.target.value })}
                      placeholder="OpenClaw tracking number"
                    />
                    <Input
                      value={site.notes}
                      onChange={(event) => updateOpenClawNumber(site.id, { notes: event.target.value })}
                      placeholder="Routing notes or campaign label"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Next Revenue Moves
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <Recommendation
                active={totals.remoteRevenueIntent > 0}
                title="Follow upstream intent quickly"
                body={`${totals.remoteRevenueIntent} upstream revenue-intent signals are visible from connected site reports.`}
              />
              <Recommendation
                active={totals.calls > 0}
                title="Use OpenClaw as source truth"
                body={`${totals.calls} call clicks are already attributed in Freedom. Add the new OpenClaw numbers here as they go live.`}
              />
              <Recommendation
                active={totals.consultations < totals.highIntentLeads}
                title="Turn high intent into booked consults"
                body={`${totals.highIntentLeads} high-intent leads vs. ${totals.consultations} consultations means the near-term lift is follow-up speed.`}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-primary" />
            Advertiser Snapshot Builder
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="space-y-3 text-sm">
            <SnapshotMetric label="Connected reports" value={`${connectedReports}/${remoteSites.length}`} />
            <SnapshotMetric label="Revenue-intent signals" value={totals.remoteRevenueIntent.toLocaleString()} />
            <SnapshotMetric label="Advertiser inquiries" value={remoteTotals.advertiserInquiries.toLocaleString()} />
            <SnapshotMetric label="Reportable events" value={remoteTotals.events.toLocaleString()} />
          </div>
          <div className="rounded-lg border border-border p-4">
            <h3 className="font-semibold">Top advertiser-facing pages to inspect</h3>
            {advertiserPages.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">Load upstream reports to populate top pages.</p>
            ) : (
              <div className="mt-3 space-y-2">
                {advertiserPages.map((page) => (
                  <div key={`${page.site}-${page.name}`} className="flex items-center justify-between gap-3 text-sm">
                    <span className="truncate">{page.site}: {page.name}</span>
                    <Badge variant="outline">{page.count}</Badge>
                  </div>
                ))}
              </div>
            )}
            <p className="mt-4 text-xs text-muted-foreground">
              Use this to build the media kit: audience volume, intent signals, top content, and advertiser inquiry count.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const MetricCard = ({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) => (
  <Card>
    <CardContent className="p-4">
      <p className="text-xs uppercase text-muted-foreground">{label}</p>
      <p className={`text-2xl font-bold ${highlight ? "text-green-700" : ""}`}>{value}</p>
    </CardContent>
  </Card>
);

const QaLine = ({ good, label }: { good: boolean; label: string }) => (
  <div className="flex items-center gap-2">
    {good ? <CheckCircle2 className="h-4 w-4 text-green-700" /> : <AlertCircle className="h-4 w-4 text-amber-600" />}
    <span className={good ? "text-foreground" : "text-muted-foreground"}>{label}</span>
  </div>
);

const SnapshotMetric = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-lg border border-border p-4">
    <p className="text-xs uppercase text-muted-foreground">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const RemoteStatusBadge = ({ site }: { site: RemoteSiteConfig }) => {
  if (site.status === "ready") return <Badge className="bg-green-700 text-white hover:bg-green-700">Connected</Badge>;
  if (site.status === "loading") return <Badge variant="outline">Loading</Badge>;
  if (site.status === "error") return <Badge variant="destructive">Needs backend</Badge>;
  return <Badge variant="outline">Not loaded</Badge>;
};

const RemoteSummary = ({ site }: { site: RemoteSiteConfig }) => {
  const intent = numberFromTotals(site.report, ["revenue_intent_clicks", "consultation_requests", "intervention_readiness_clicks", "advertiser_inquiries"]);
  const events = numberFromTotals(site.report, ["events", "total_events", "page_views"]);
  const topEvent = site.report?.by_event?.[0];
  const topPage = site.report?.top_pages?.[0];

  return (
    <div className="rounded-lg bg-muted/40 p-3 text-sm">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs uppercase text-muted-foreground">Events</p>
          <p className="font-semibold">{events.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs uppercase text-muted-foreground">Revenue Intent</p>
          <p className="font-semibold">{intent.toLocaleString()}</p>
        </div>
      </div>
      {topEvent && <p className="mt-2 text-xs text-muted-foreground">Top event: {topEvent.name} ({topEvent.count})</p>}
      {topPage && <p className="mt-1 truncate text-xs text-muted-foreground">Top page: {topPage.name}</p>}
    </div>
  );
};

const Recommendation = ({ active, title, body }: { active: boolean; title: string; body: string }) => (
  <div className={`rounded-lg border p-4 ${active ? "border-primary/30 bg-primary/5" : "border-border"}`}>
    <div className="flex items-center gap-2">
      {active ? <TrendingUp className="h-4 w-4 text-primary" /> : <PhoneCall className="h-4 w-4 text-muted-foreground" />}
      <p className="font-semibold">{title}</p>
    </div>
    <p className="mt-1 text-muted-foreground">{body}</p>
  </div>
);

export default CrossSiteRevenueDashboard;
