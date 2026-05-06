import { useCallback, useEffect, useMemo, useState } from "react";
import { subDays } from "date-fns";
import { BarChart3, ExternalLink, PhoneCall, RefreshCw, Settings, Target, TrendingUp } from "lucide-react";
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

const defaultRemoteSites = [
  {
    id: "party_wreckers",
    name: "Party Wreckers",
    url: "https://bvqqxopmnuwzeyusnrsi.supabase.co/functions/v1/party-wreckers-funnel-report",
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

const CrossSiteRevenueDashboard = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<CrmContactRow[]>([]);
  const [assessments, setAssessments] = useState<AssessmentRow[]>([]);
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [contracts, setContracts] = useState<ContractRow[]>([]);
  const [calls, setCalls] = useState<CallRow[]>([]);
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

  const saveRemoteSites = useCallback((next: RemoteSiteConfig[]) => {
    setRemoteSites(next);
    if (typeof window === "undefined") return;

    window.localStorage.setItem(
      settingsKey,
      JSON.stringify(next.map(({ id, url, secret }) => ({ id, url, secret }))),
    );
  }, []);

  const updateRemoteSite = (id: string, patch: Partial<RemoteSiteConfig>) => {
    saveRemoteSites(remoteSites.map((site) => (site.id === id ? { ...site, ...patch } : site)));
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

    const error = [contactsResult.error, assessmentsResult.error, bookingsResult.error, contractsResult.error, callsResult.error].find(Boolean);
    if (error) {
      toast({
        title: "Could not load Freedom revenue data",
        description: "The dashboard is waiting on the latest Freedom backend tables.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    setContacts((contactsResult.data ?? []) as CrmContactRow[]);
    setAssessments((assessmentsResult.data ?? []) as AssessmentRow[]);
    setBookings((bookingsResult.data ?? []) as BookingRow[]);
    setContracts((contractsResult.data ?? []) as ContractRow[]);
    setCalls((callsResult.data ?? []) as CallRow[]);
    setLoading(false);
  }, [toast]);

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

  useEffect(() => {
    fetchFreedomData();
  }, [fetchFreedomData]);

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
