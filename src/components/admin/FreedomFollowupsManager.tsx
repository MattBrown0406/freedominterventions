import { useCallback, useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { Eye, MailCheck, MessageSquare, Play, RefreshCw, SkipForward } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface FollowupRow {
  id: string;
  lead_type: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  followup_reason: string;
  priority: string;
  sequence_step: number;
  subject: string;
  status: string;
  due_at: string;
  sent_at: string | null;
  first_opened_at: string | null;
  last_opened_at: string | null;
  open_count: number | null;
  replied_at: string | null;
  reply_snippet: string | null;
  error_message: string | null;
  source_attribution: Record<string, unknown> | null;
  created_at: string;
}

const followupTable = () => supabase.from("freedom_followup_queue" as never) as unknown as {
  select: (columns: string) => {
    order: (column: string, options?: { ascending?: boolean }) => {
      limit: (count: number) => Promise<{ data: FollowupRow[] | null; error: unknown }>;
    };
  };
  update: (values: Record<string, unknown>) => {
    eq: (column: string, value: string) => Promise<{ error: unknown }>;
  };
};

const priorityBadge = (priority: string) => {
  if (priority === "urgent") return <Badge variant="destructive">Urgent</Badge>;
  if (priority === "high") return <Badge className="bg-amber-500 text-white hover:bg-amber-500">High</Badge>;
  return <Badge variant="outline">Normal</Badge>;
};

const statusBadge = (status: string) => {
  if (status === "done" || status === "sent") return <Badge className="bg-green-600 text-white hover:bg-green-600">Done</Badge>;
  if (status === "failed") return <Badge variant="destructive">Failed</Badge>;
  if (status === "skipped") return <Badge variant="secondary">Skipped</Badge>;
  return <Badge variant="outline">Pending</Badge>;
};

const sourceLabel = (sourceAttribution: Record<string, unknown> | null) => {
  if (!sourceAttribution) return "Unknown";
  const source = sourceAttribution.source;
  const campaign = sourceAttribution.utm_campaign;
  return [source, campaign].filter(Boolean).join(" / ") || "Unknown";
};

const FreedomFollowupsManager = () => {
  const { toast } = useToast();
  const [rows, setRows] = useState<FollowupRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const fetchRows = useCallback(async () => {
    setLoading(true);
    const { data, error } = await followupTable()
      .select("*")
      .order("due_at", { ascending: true })
      .limit(100);

    if (error) {
      toast({
        title: "Could not load follow-ups",
        description: "The follow-up tables may not be applied in Lovable yet.",
        variant: "destructive",
      });
      setRows([]);
    } else {
      setRows(data ?? []);
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchRows();
  }, [fetchRows]);

  const stats = useMemo(() => ({
    pending: rows.filter((row) => row.status === "pending").length,
    due: rows.filter((row) => row.status === "pending" && new Date(row.due_at).getTime() <= Date.now()).length,
    sent: rows.filter((row) => row.status === "done" || row.status === "sent").length,
    failed: rows.filter((row) => row.status === "failed").length,
    opened: rows.filter((row) => Boolean(row.first_opened_at)).length,
    replied: rows.filter((row) => Boolean(row.replied_at)).length,
  }), [rows]);

  const markReplied = async (id: string) => {
    const { error } = await supabase.functions.invoke("log-followup-reply", {
      body: { followupId: id, snippet: "Reply logged manually in admin dashboard" },
    });

    if (error) {
      toast({ title: "Could not log reply", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Reply logged" });
      fetchRows();
    }
  };

  const runProcessor = async () => {
    setProcessing(true);
    const { data, error } = await supabase.functions.invoke("process-freedom-followups", {
      body: { manual: true },
    });

    if (error) {
      toast({
        title: "Processor failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      const result = data as { sent?: number; skipped?: number; failed?: number } | null;
      toast({
        title: "Follow-ups processed",
        description: `${result?.sent ?? 0} sent, ${result?.skipped ?? 0} skipped, ${result?.failed ?? 0} failed.`,
      });
      fetchRows();
    }
    setProcessing(false);
  };

  const sendNow = async (id: string) => {
    setProcessing(true);
    const { data, error } = await supabase.functions.invoke("process-freedom-followups", {
      body: { manual: true, followupId: id },
    });

    if (error) {
      toast({ title: "Could not send follow-up", description: error.message, variant: "destructive" });
    } else {
      const result = data as { sent?: number; skipped?: number; failed?: number } | null;
      toast({
        title: result?.sent ? "Follow-up sent" : "Follow-up not sent",
        description: `${result?.sent ?? 0} sent, ${result?.skipped ?? 0} skipped, ${result?.failed ?? 0} failed.`,
        variant: result?.sent ? "default" : "destructive",
      });
      fetchRows();
    }
    setProcessing(false);
  };

  const markSkipped = async (id: string) => {
    const { error } = await followupTable()
      .update({ status: "skipped", error_message: "Skipped manually in admin dashboard" })
      .eq("id", id);

    if (error) {
      toast({ title: "Could not skip follow-up", variant: "destructive" });
    } else {
      fetchRows();
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs uppercase text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold">{stats.pending}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs uppercase text-muted-foreground">Due Now</p>
            <p className="text-2xl font-bold text-amber-600">{stats.due}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs uppercase text-muted-foreground">Done</p>
            <p className="text-2xl font-bold text-green-600">{stats.sent}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs uppercase text-muted-foreground">Failed</p>
            <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs uppercase text-muted-foreground">Opened</p>
            <p className="text-2xl font-bold text-blue-600">{stats.opened}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs uppercase text-muted-foreground">Replied</p>
            <p className="text-2xl font-bold text-primary">{stats.replied}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={runProcessor} disabled={processing} className="gap-2">
          <Play className="h-4 w-4" />
          {processing ? "Processing..." : "Run Follow-Ups Now"}
        </Button>
        <Button variant="outline" onClick={fetchRows} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {loading ? (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">Loading follow-ups...</CardContent>
        </Card>
      ) : rows.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">No follow-ups queued yet.</CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {rows.map((row) => (
            <Card key={row.id}>
              <CardHeader className="pb-3">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      <MailCheck className="h-4 w-4 text-primary" />
                      {row.subject}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {row.contact_name} · {row.contact_email}
                      {row.contact_phone ? ` · ${row.contact_phone}` : ""}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {priorityBadge(row.priority)}
                    {statusBadge(row.status)}
                    {row.first_opened_at && (
                      <Badge className="bg-blue-600 text-white hover:bg-blue-600 gap-1">
                        <Eye className="h-3 w-3" />
                        Opened{(row.open_count ?? 0) > 1 ? ` ${row.open_count}x` : ""}
                      </Badge>
                    )}
                    {row.replied_at && (
                      <Badge className="bg-primary text-primary-foreground hover:bg-primary gap-1">
                        <MessageSquare className="h-3 w-3" />
                        Replied
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid gap-3 md:grid-cols-4 text-sm">
                  <div>
                    <p className="text-xs uppercase text-muted-foreground">Lead Type</p>
                    <p>{row.lead_type.replace(/_/g, " ")}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-muted-foreground">Reason</p>
                    <p>{row.followup_reason.replace(/_/g, " ")}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-muted-foreground">Due</p>
                    <p>{format(new Date(row.due_at), "MMM d, h:mm a")}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-muted-foreground">Source</p>
                    <p>{sourceLabel(row.source_attribution)}</p>
                  </div>
                </div>
                {(row.sent_at || row.first_opened_at || row.replied_at) && (
                  <div className="grid gap-3 md:grid-cols-3 text-sm">
                    <div>
                      <p className="text-xs uppercase text-muted-foreground">Sent</p>
                      <p>{row.sent_at ? format(new Date(row.sent_at), "MMM d, h:mm a") : "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase text-muted-foreground">First Opened</p>
                      <p>{row.first_opened_at ? format(new Date(row.first_opened_at), "MMM d, h:mm a") : "Not opened yet"}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase text-muted-foreground">Replied</p>
                      <p>{row.replied_at ? format(new Date(row.replied_at), "MMM d, h:mm a") : "No reply yet"}</p>
                    </div>
                  </div>
                )}
                {row.reply_snippet && (
                  <p className="rounded-md bg-muted p-3 text-sm">{row.reply_snippet}</p>
                )}
                {row.error_message && (
                  <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{row.error_message}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  {row.status === "pending" && (
                    <>
                      <Button size="sm" disabled={processing} onClick={() => sendNow(row.id)} className="gap-2">
                        <Play className="h-4 w-4" />
                        Send Now
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => markSkipped(row.id)} className="gap-2">
                        <SkipForward className="h-4 w-4" />
                        Skip
                      </Button>
                    </>
                  )}
                  {row.sent_at && !row.replied_at && (
                    <Button variant="outline" size="sm" onClick={() => markReplied(row.id)} className="gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Log Reply
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FreedomFollowupsManager;
