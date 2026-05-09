import { useEffect, useMemo, useState } from "react";
import { ArrowRight, MousePointerClick, Phone, RefreshCw, Search, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { interventionAnswers, interventionAnswerPath } from "@/data/interventionAnswers";

type QueryResult<T> = { data: T[] | null; error: { message?: string } | null };
type QueryChain<T> = PromiseLike<QueryResult<T>> & {
  select: (columns: string) => QueryChain<T>;
  in: (column: string, values: string[]) => QueryChain<T>;
  gte: (column: string, value: string) => QueryChain<T>;
  like: (column: string, value: string) => QueryChain<T>;
  order: (column: string, options?: { ascending?: boolean }) => QueryChain<T>;
  limit: (count: number) => QueryChain<T>;
};
type UntypedSupabase = { from: <T>(table: string) => QueryChain<T> };

interface FreedomEvent {
  id: string;
  event_name: string;
  page_path: string | null;
  target_href: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

interface CallEvent {
  id: string;
  page_path: string;
  created_at: string;
}

interface AttributedLead {
  id: string;
  source_attribution: Record<string, unknown> | null;
  created_at: string;
}

interface AnswerStats {
  slug: string;
  question: string;
  category: string;
  path: string;
  views: number;
  calls: number;
  startHereClicks: number;
  readinessClicks: number;
  nextStepClicks: number;
  leads: number;
}

const answerEvents = [
  "page_view",
  "phone_call_click",
  "intervention_answer_view",
  "intervention_answer_click",
  "intervention_answer_service_link_click",
];

const fromTable = <T,>(table: string) => (supabase as unknown as UntypedSupabase).from<T>(table);

const attributionIncludesAnswerPath = (sourceAttribution: Record<string, unknown> | null, path: string) => {
  if (!sourceAttribution) return false;
  return [
    sourceAttribution.landing_page,
    sourceAttribution.first_landing_page,
    sourceAttribution.page_path,
    sourceAttribution.entry_path,
    sourceAttribution.current_url,
    sourceAttribution.referrer,
  ].some((value) => typeof value === "string" && value.includes(path));
};

export default function AnswerPagePerformance() {
  const [events, setEvents] = useState<FreedomEvent[]>([]);
  const [calls, setCalls] = useState<CallEvent[]>([]);
  const [contacts, setContacts] = useState<AttributedLead[]>([]);
  const [assessments, setAssessments] = useState<AttributedLead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataIssues, setDataIssues] = useState<string[]>([]);

  const fetchData = async () => {
    setIsLoading(true);
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const issues: string[] = [];

    const [eventResult, callResult, contactResult, assessmentResult] = await Promise.all([
      fromTable<FreedomEvent>("freedom_funnel_events")
        .select("id,event_name,page_path,target_href,metadata,created_at")
        .in("event_name", answerEvents)
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .limit(1000),
      fromTable<CallEvent>("call_analytics")
        .select("id,page_path,created_at")
        .like("page_path", "/intervention-answers/%")
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .limit(500),
      fromTable<AttributedLead>("crm_contacts")
        .select("id,source_attribution,created_at")
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .limit(500),
      fromTable<AttributedLead>("assessments")
        .select("id,source_attribution,created_at")
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .limit(500),
    ]);

    if (eventResult.error) issues.push("Answer event table is waiting on the Freedom backend migration.");
    if (callResult.error) issues.push("Call tracking data could not be loaded.");
    if (contactResult.error) issues.push("CRM lead attribution could not be loaded.");
    if (assessmentResult.error) issues.push("Assessment attribution could not be loaded.");

    setEvents(eventResult.data ?? []);
    setCalls(callResult.data ?? []);
    setContacts(contactResult.data ?? []);
    setAssessments(assessmentResult.data ?? []);
    setDataIssues(issues);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const rows = useMemo<AnswerStats[]>(() => {
    return interventionAnswers.map((answer) => {
      const path = interventionAnswerPath(answer);
      const answerPageEvents = events.filter((event) => event.page_path === path || event.metadata?.answer_slug === answer.slug);

      const views = answerPageEvents.filter((event) =>
        event.event_name === "intervention_answer_view" ||
        (event.event_name === "page_view" && event.page_path === path)
      ).length;

      const clicks = answerPageEvents.filter((event) => event.event_name === "intervention_answer_click");
      const answerCalls = calls.filter((call) => call.page_path === path).length +
        answerPageEvents.filter((event) => event.event_name === "phone_call_click").length;

      return {
        slug: answer.slug,
        question: answer.question,
        category: answer.category,
        path,
        views,
        calls: answerCalls,
        startHereClicks: clicks.filter((event) => event.metadata?.click_type === "start_here" || event.target_href === "/start-here").length,
        readinessClicks: clicks.filter((event) => event.target_href === "/intervention-readiness").length,
        nextStepClicks: clicks.filter((event) => event.metadata?.click_type === "primary_next_step").length,
        leads: contacts.filter((contact) => attributionIncludesAnswerPath(contact.source_attribution, path)).length +
          assessments.filter((assessment) => attributionIncludesAnswerPath(assessment.source_attribution, path)).length,
      };
    }).sort((a, b) => {
      const aIntent = a.calls + a.leads + a.startHereClicks + a.readinessClicks + a.nextStepClicks;
      const bIntent = b.calls + b.leads + b.startHereClicks + b.readinessClicks + b.nextStepClicks;
      if (bIntent !== aIntent) return bIntent - aIntent;
      return b.views - a.views;
    });
  }, [assessments, calls, contacts, events]);

  const totals = rows.reduce(
    (acc, row) => ({
      views: acc.views + row.views,
      calls: acc.calls + row.calls,
      leads: acc.leads + row.leads,
      clicks: acc.clicks + row.startHereClicks + row.readinessClicks + row.nextStepClicks,
    }),
    { views: 0, calls: 0, leads: 0, clicks: 0 },
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Answer AEO Performance</h2>
          <p className="text-sm text-muted-foreground">
            Last 30 days of intervention answer page views, calls, clicks, and attributable leads.
          </p>
        </div>
        <Button variant="outline" onClick={fetchData} disabled={isLoading}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {dataIssues.length > 0 && (
        <Card className="border-amber-300 bg-amber-50">
          <CardContent className="p-4 text-sm text-amber-900">
            {dataIssues.join(" ")}
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="flex items-center gap-2 text-xs uppercase text-muted-foreground"><Search className="h-4 w-4" /> Answer views</p>
            <p className="mt-2 text-2xl font-bold">{totals.views.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="flex items-center gap-2 text-xs uppercase text-muted-foreground"><Phone className="h-4 w-4" /> Calls</p>
            <p className="mt-2 text-2xl font-bold">{totals.calls.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="flex items-center gap-2 text-xs uppercase text-muted-foreground"><MousePointerClick className="h-4 w-4" /> Money clicks</p>
            <p className="mt-2 text-2xl font-bold">{totals.clicks.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="flex items-center gap-2 text-xs uppercase text-muted-foreground"><Users className="h-4 w-4" /> Leads</p>
            <p className="mt-2 text-2xl font-bold">{totals.leads.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Answer Pages Ranked By Revenue Intent</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="py-3 pr-4">Answer</th>
                <th className="py-3 pr-4 text-right">Views</th>
                <th className="py-3 pr-4 text-right">Calls</th>
                <th className="py-3 pr-4 text-right">Next Step</th>
                <th className="py-3 pr-4 text-right">Start Here</th>
                <th className="py-3 pr-4 text-right">Readiness</th>
                <th className="py-3 pr-4 text-right">Leads</th>
                <th className="py-3 text-right">Open</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.slug} className="border-b last:border-0">
                  <td className="max-w-[360px] py-3 pr-4">
                    <div className="font-medium text-foreground">{row.question}</div>
                    <Badge variant="outline" className="mt-1">{row.category}</Badge>
                  </td>
                  <td className="py-3 pr-4 text-right">{row.views}</td>
                  <td className="py-3 pr-4 text-right">{row.calls}</td>
                  <td className="py-3 pr-4 text-right">{row.nextStepClicks}</td>
                  <td className="py-3 pr-4 text-right">{row.startHereClicks}</td>
                  <td className="py-3 pr-4 text-right">{row.readinessClicks}</td>
                  <td className="py-3 pr-4 text-right">{row.leads}</td>
                  <td className="py-3 text-right">
                    <Button asChild size="sm" variant="ghost">
                      <a href={row.path} target="_blank" rel="noreferrer">
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
