import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  BarChart3,
  PhoneCall,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LegacyRevenueAttributionManager from "./LegacyRevenueAttributionManager";

const sites = {
  freedom: "Freedom Interventions",
  sober_helpline: "Sober Helpline",
  nme: "No More Enabling",
  partywreckers: "Party Wreckers",
  familybridge: "FamilyBridge",
  ayuda_sobria: "AyudaSobria",
  unknown: "Unknown routing",
};
type Row = {
  feed: string;
  site: keyof typeof sites;
  day: string;
  metric: string;
  channel: string;
  value: number;
};
type Feed = {
  feed: string;
  site: keyof typeof sites;
  status: string;
  coverage_start: string | null;
  coverage_end: string | null;
  last_success_at: string | null;
  checked_at: string;
};
type Snapshot = { rows: Row[]; feeds: Feed[] };
const pacificToday = () =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
const daysBefore = (day: string, days: number) => {
  const d = new Date(`${day}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
};
const timestamp = (date: string | null) =>
  date
    ? new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Los_Angeles",
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(date)) + " PT"
    : "Never synced";
const metricNames: Record<string, string> = {
  sessions: "Recorded sessions",
  engaged_sessions: "Engaged sessions",
  phone_connections: "Phone connections",
  ai_audio_observed: "AI audio observed",
  transfer_requested: "Transfer requested",
  transfer_bridged: "Transfer bridged",
  call_ended: "Call ended",
  callback_requested: "Callback requested",
};

export default function RevenueAttributionManager() {
  const today = pacificToday();
  // The existing operational attribution view stays the default until the
  // central aggregate feed is actually receiving data.
  const [mode, setMode] = useState<"operational" | "central">("operational");
  const [start, setStart] = useState(daysBefore(today, 27));
  const [end, setEnd] = useState(today);
  const [site, setSite] = useState("");
  const [view, setView] = useState("overview");
  const [channel, setChannel] = useState("all");
  const [data, setData] = useState<Snapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [backendMissing, setBackendMissing] = useState(false);
  const generation = useRef(0);
  const load = useCallback(async () => {
    const id = ++generation.current;
    setLoading(true);
    setError("");
    setBackendMissing(false);
    setData(null);
    if (
      !start ||
      !end ||
      start > end ||
      end > pacificToday() ||
      (Date.parse(end) - Date.parse(start)) / 86400000 > 89
    ) {
      setError(
        "Choose a valid date window of at most 90 days, ending today or earlier.",
      );
      setLoading(false);
      return;
    }
    try {
      const result = await supabase.rpc("get_central_attribution", {
        p_start: start,
        p_end: end,
        ...(site ? { p_site: site } : {}),
      });
      if (result.error) throw result.error;
      const value = result.data as unknown as Snapshot;
      if (!value || !Array.isArray(value.rows) || !Array.isArray(value.feeds))
        throw new Error("Invalid response");
      if (id === generation.current) setData(value);
    } catch (cause) {
      if (id === generation.current) {
        // Only the exact missing RPC/schema-cache contract enables legacy reads.
        // Permission, JWT, network and other SQL errors must remain errors.
        const failure = cause as { code?: string; message?: string } | null;
        if (failure?.code === "PGRST202" &&
            failure.message?.includes("public.get_central_attribution")) {
          setBackendMissing(true);
        } else {
        setError(
          "Attribution could not be loaded. Check admin access and backend deployment, then retry. No missing data is counted as zero.",
        );
        }
      }
    } finally {
      if (id === generation.current) setLoading(false);
    }
  }, [start, end, site]);
  useEffect(() => {
    if (mode !== "central") {
      setLoading(false);
      return;
    }
    void load();
    return () => {
      generation.current++;
    };
  }, [load, mode]);
  const selectedSites = Object.entries(sites).filter(
    ([key]) => !site || key === site,
  );
  const rows =
    data?.rows.filter((r) => r.feed === "livekit" || r.channel === channel) ??
    [];
  const total = (metric: string) => {
    const values = rows.filter((r) => r.metric === metric);
    return values.length
      ? values.reduce((sum, r) => sum + r.value, 0).toLocaleString()
      : "—";
  };
  const breakdown = rows.filter(
    (r) =>
      (view === "phone"
        ? r.feed === "livekit"
        : view === "traffic"
          ? r.feed === "ga4"
          : true) && r.value > 0,
  );
  const preset = (days: number) => {
    setStart(daysBefore(today, days - 1));
    setEnd(today);
  };
  if (mode === "operational") {
    return (
      <section className="space-y-6" aria-label="Attribution">
        <div className="flex flex-wrap items-center justify-end gap-2">
          <Button variant="outline" onClick={() => setMode("central")}>
            Ecosystem feed (new)
          </Button>
        </div>
        <LegacyRevenueAttributionManager />
      </section>
    );
  }
  if (backendMissing && !loading) {
    return (
      <section className="space-y-6" aria-label="Legacy attribution while central backend is unavailable">
        <div role="status" className="space-y-3 rounded-lg border bg-amber-50 p-4 text-amber-950">
          <p>Central attribution is not configured yet: its read function is unavailable. The existing Freedom attribution view remains available below; these are legacy operational records, not the new aggregate feed.</p>
          <Button variant="outline" onClick={() => void load()}>Retry central attribution</Button>
        </div>
        <LegacyRevenueAttributionManager />
      </section>
    );
  }
  return (
    <section className="space-y-6" aria-label="Central attribution">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
            Ecosystem intelligence
          </p>
          <h2 className="text-2xl font-bold">Attribution & phone outcomes</h2>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            Recorded website traffic and LiveKit operational outcomes.
            Aggregate-only, strict-admin access. Dates and call-day grouping use
            Pacific time.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={() => setMode("operational")}>
            Back to Freedom attribution
          </Button>
          <Button
            variant="outline"
            onClick={() => void load()}
            disabled={loading}
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-3 rounded-xl border bg-muted/30 p-4">
        <label className="flex flex-col gap-1 text-sm">
          Website / business
          <select
            className="h-10 max-w-full rounded-md border bg-background px-3"
            value={site}
            onChange={(e) => setSite(e.target.value)}
          >
            <option value="">All businesses</option>
            {Object.entries(sites).map(([key, name]) => (
              <option key={key} value={key}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          From
          <input
            aria-label="From date"
            className="h-10 rounded-md border bg-background px-3"
            type="date"
            value={start}
            max={end}
            onChange={(e) => setStart(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Through
          <input
            aria-label="Through date"
            className="h-10 rounded-md border bg-background px-3"
            type="date"
            value={end}
            min={start}
            max={today}
            onChange={(e) => setEnd(e.target.value)}
          />
        </label>
        {[1, 7, 28].map((days) => (
          <Button key={days} variant="outline" onClick={() => preset(days)}>
            {days === 1 ? "Today" : `${days} days`}
          </Button>
        ))}
      </div>
      <nav className="flex flex-wrap gap-2" aria-label="Attribution views">
        {["overview", "traffic", "phone", "coverage"].map((tab) => (
          <Button
            key={tab}
            variant={view === tab ? "default" : "outline"}
            aria-pressed={view === tab}
            onClick={() => setView(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </nav>
      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-destructive/40 bg-destructive/5 p-4"
        >
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}
      {loading && (
        <p role="status" className="py-8 text-muted-foreground">
          Loading authorized aggregate data…
        </p>
      )}
      {!loading && data && (
        <>
          {(view === "overview" || view === "traffic") && (
            <>
              <div className="flex flex-wrap items-center gap-3">
                <BarChart3 className="h-5 w-5" />
                <h3 className="font-semibold">Website acquisition</h3>
                <label className="text-sm">
                  Channel{" "}
                  <select
                    className="ml-2 rounded-md border bg-background p-2"
                    value={channel}
                    onChange={(e) => setChannel(e.target.value)}
                  >
                    <option value="all">All traffic</option>
                    <option value="organic">Organic search</option>
                    <option value="chatgpt">ChatGPT (exact source)</option>
                  </select>
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {["sessions", "engaged_sessions"].map((metric) => (
                  <Card key={metric}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        {metricNames[metric]}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">{total(metric)}</p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Available coverage only · sums across properties, not
                        unique people
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                GA4 excludes the latest two complete days for processing lag.
                Today may have no GA4 coverage. ChatGPT means exact
                sessionSource=chatgpt.com, not verified citations or
                recommendations. Channel subsets overlap All traffic; never add
                them together. Campaign names are withheld until an approved
                safe taxonomy exists.
              </p>
            </>
          )}
          {(view === "overview" || view === "phone") && (
            <>
              <h3 className="flex items-center gap-2 font-semibold">
                <PhoneCall className="h-5 w-5" />
                LiveKit phone outcomes
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {[
                  "phone_connections",
                  "ai_audio_observed",
                  "transfer_requested",
                  "transfer_bridged",
                  "call_ended",
                  "callback_requested",
                ].map((metric) => {
                  const values = data.rows.filter(
                    (r) => r.metric === metric && r.channel === "all",
                  );
                  return (
                    <Card key={metric}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          {metricNames[metric]}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold">
                          {values.length
                            ? values
                                .reduce((sum, r) => sum + r.value, 0)
                                .toLocaleString()
                            : "—"}
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">
                          {metric === "transfer_bridged"
                            ? "Human vs voicemail is unverified"
                            : "Observed operational record, not a phone-link click"}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              <p className="rounded-lg border bg-amber-50 p-4 text-sm text-amber-950">
                A phone connection means a participant reached the LiveKit
                worker. It does not mean Matt answered. The current
                announce-then-bridge flow can connect either a human or
                voicemail; those are not separately measured. Calls missed
                before worker arrival, voicemail messages left, and completed
                consultations are unknown. Entry business uses the trusted
                called-number map; unknown numbers remain unknown. No
                visitor-to-caller matching is performed.
              </p>
            </>
          )}
          {view !== "coverage" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Daily breakdown · Pacific dates · nonzero rows
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[540px] text-left text-sm">
                    <caption className="sr-only">
                      Daily recorded aggregates, not individual visitors or
                      callers
                    </caption>
                    <thead>
                      <tr className="border-b">
                        <th className="p-2">Date</th>
                        <th className="p-2">Business</th>
                        <th className="p-2">Measure</th>
                        <th className="p-2 text-right">Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {breakdown.map((r) => (
                        <tr
                          className="border-b"
                          key={`${r.feed}/${r.site}/${r.day}/${r.metric}/${r.channel}`}
                        >
                          <td className="p-2 whitespace-nowrap">{r.day}</td>
                          <td className="p-2">{sites[r.site]}</td>
                          <td className="p-2">
                            {metricNames[r.metric] ?? r.metric}
                          </td>
                          <td className="p-2 text-right tabular-nums">
                            {r.value.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {rows.length === 0 && (
                  <p className="py-6 text-muted-foreground">
                    No aggregate rows for this selection. Check coverage below;
                    an absent feed is not zero activity.
                  </p>
                )}
              </CardContent>
            </Card>
          )}
          <div className="space-y-3">
            <h3 className="flex items-center gap-2 font-semibold">
              <ShieldCheck className="h-5 w-5" />
              Connections, freshness & coverage
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {selectedSites.map(([key, name]) => (
                <Card key={key}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {["ga4", "livekit"].map((feed) => {
                      const f = data.feeds.find(
                        (f) => f.site === key && f.feed === feed,
                      );
                      const stale =
                        f?.last_success_at &&
                        Date.now() - Date.parse(f.last_success_at) >
                          36 * 3600000;
                      return (
                        <div key={feed} className="text-sm">
                          <div className="flex flex-wrap justify-between gap-2">
                            <span>
                              {feed === "ga4"
                                ? "GA4"
                                : "LiveKit operational records"}
                            </span>
                            <Badge
                              variant={
                                f?.status === "ok" && !stale
                                  ? "secondary"
                                  : "outline"
                              }
                            >
                              {!f
                                ? "Not connected"
                                : stale
                                  ? `${f.status} · stale`
                                  : f.status.replace(/_/g, " ")}
                            </Badge>
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {timestamp(f?.last_success_at ?? null)}
                            {f?.coverage_start &&
                              ` · ${f.coverage_start} to ${f.coverage_end}`}
                          </p>
                          {f?.status === "error" && (
                            <p className="text-xs text-destructive">
                              Latest sync failed; any rows shown are last-known
                              data.
                            </p>
                          )}
                        </div>
                      );
                    })}
                    <p className="text-xs text-muted-foreground">
                      Bookings, registrations, payments and browser phone
                      clicks: not connected to this aggregate feed.
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}
      <p className="text-xs text-muted-foreground">
        Privacy: no caller numbers, names, email addresses, recordings,
        transcripts, case details, raw URLs, query strings or session
        identifiers. Historical GA4 consent status remains unverified; no new
        browser tracking is added.
      </p>
    </section>
  );
}
