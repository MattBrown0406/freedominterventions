import { useCallback, useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { BarChart3, PhoneCall, RefreshCw, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import type { Json } from "@/integrations/supabase/types";

interface SourceAttribution {
  source?: string;
  utm_source?: string | null;
  utm_campaign?: string | null;
  first_landing_page?: string;
  landing_page?: string;
}

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
}

interface AssessmentRow {
  id: string;
  contact_email: string;
  source_attribution: Json;
  created_at: string;
}

interface BookingRow {
  id: string;
  customer_email: string;
  booking_type: string;
  status: string;
  amount_cents: number | null;
  source_attribution: Json;
  created_at: string;
}

interface ContractRow {
  id: string;
  client_email: string;
  contract_type: string;
  status: string;
  amount_cents: number;
  source_attribution: Json;
  created_at: string;
}

interface CallRow {
  id: string;
  source_attribution: Json;
  metadata: Json | null;
  page_path: string;
  phone_number: string;
  created_at: string;
}

interface ContactMessageRow {
  id: string;
  source_attribution: Json;
  created_at: string;
}

interface FollowupRow {
  id: string;
  status: string;
  source_attribution: Json;
  created_at: string;
}

interface SourceStats {
  source: string;
  contacts: number;
  calls: number;
  contactMessages: number;
  assessments: number;
  consultations: number;
  paidBookings: number;
  contractsSigned: number;
  contractsPaid: number;
  followupsPending: number;
  bookedRevenueCents: number;
  contractRevenueCents: number;
}

const asSourceAttribution = (value: Json | null | undefined): SourceAttribution => {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as SourceAttribution;
  }
  return {};
};

const asRecord = (value: Json | null | undefined): Record<string, unknown> => {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return {};
};

const sourceKey = (value: Json | null | undefined, fallback = "unknown") => {
  const attribution = asSourceAttribution(value);
  return attribution.source || attribution.utm_source || fallback;
};

const stringFromMetadata = (metadata: Json | null | undefined, key: string) => {
  const value = asRecord(metadata)[key];
  return typeof value === "string" && value.trim().length > 0 ? value : null;
};

const formatUsd = (cents: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
};

const formatPercent = (numerator: number, denominator: number) => {
  if (!denominator) return "0%";
  return `${Math.round((numerator / denominator) * 100)}%`;
};

const sourceTitle = (source: string) => {
  const labels: Record<string, string> = {
    sober_helpline: "Sober Helpline",
    no_more_enabling: "No More Enabling",
    organic_google: "Google Organic",
    organic_bing: "Bing Organic",
    direct: "Direct",
    referral: "Referral",
    contact_message: "Contact Form",
    booking: "Booking",
    assessment: "Assessment",
    contract: "Contract",
    unknown: "Unknown",
  };
  return labels[source] || source.replace(/_/g, " ");
};

const locationTitle = (location: string) => {
  const labels: Record<string, string> = {
    hero_primary_cta: "Homepage hero",
    header_phone: "Header phone",
    footer_phone: "Footer phone",
    mobile_sticky_cta: "Mobile sticky CTA",
    contact_page: "Contact page",
  };
  return labels[location] || location.replace(/_/g, " ");
};

const RevenueAttributionManager = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<CrmContactRow[]>([]);
  const [assessments, setAssessments] = useState<AssessmentRow[]>([]);
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [contracts, setContracts] = useState<ContractRow[]>([]);
  const [calls, setCalls] = useState<CallRow[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessageRow[]>([]);
  const [followups, setFollowups] = useState<FollowupRow[]>([]);

  const fetchAttribution = useCallback(async () => {
    setLoading(true);
    const [
      contactsResult,
      assessmentsResult,
      bookingsResult,
      contractsResult,
      callsResult,
      contactMessagesResult,
      followupsResult,
    ] = await Promise.all([
      supabase.from("crm_contacts").select("id,email,first_name,last_name,phone,source,source_attribution,lead_score,revenue_path,pipeline_status,next_action,next_action_due_at,last_engagement_at,created_at").order("created_at", { ascending: false }).limit(500),
      supabase.from("assessments").select("id,contact_email,source_attribution,created_at").order("created_at", { ascending: false }).limit(500),
      supabase.from("bookings").select("id,customer_email,booking_type,status,amount_cents,source_attribution,created_at").order("created_at", { ascending: false }).limit(500),
      supabase.from("contracts").select("id,client_email,contract_type,status,amount_cents,source_attribution,created_at").order("created_at", { ascending: false }).limit(500),
      supabase.from("call_analytics").select("id,source_attribution,metadata,page_path,phone_number,created_at").order("created_at", { ascending: false }).limit(500),
      supabase.from("contact_messages").select("id,source_attribution,created_at").order("created_at", { ascending: false }).limit(500),
      supabase.from("freedom_followup_queue").select("id,status,source_attribution,created_at").order("created_at", { ascending: false }).limit(500),
    ]);

    const error = [
      contactsResult.error,
      assessmentsResult.error,
      bookingsResult.error,
      contractsResult.error,
      callsResult.error,
      contactMessagesResult.error,
      followupsResult.error,
    ].find(Boolean);

    if (error) {
      toast({
        title: "Could not load attribution",
        description: "Make sure the latest Freedom attribution migration is applied in Lovable.",
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
    setContactMessages((contactMessagesResult.data ?? []) as ContactMessageRow[]);
    setFollowups((followupsResult.data ?? []) as FollowupRow[]);
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchAttribution();
  }, [fetchAttribution]);

  const sourceStats = useMemo(() => {
    const map = new Map<string, SourceStats>();
    const get = (source: string) => {
      const existing = map.get(source);
      if (existing) return existing;
      const next: SourceStats = {
        source,
        contacts: 0,
        calls: 0,
        contactMessages: 0,
        assessments: 0,
        consultations: 0,
        paidBookings: 0,
        contractsSigned: 0,
        contractsPaid: 0,
        followupsPending: 0,
        bookedRevenueCents: 0,
        contractRevenueCents: 0,
      };
      map.set(source, next);
      return next;
    };

    contacts.forEach((row) => {
      get(sourceKey(row.source_attribution, row.source)).contacts += 1;
    });

    calls.forEach((row) => {
      get(sourceKey(row.source_attribution)).calls += 1;
    });

    contactMessages.forEach((row) => {
      get(sourceKey(row.source_attribution, "contact_message")).contactMessages += 1;
    });

    assessments.forEach((row) => {
      get(sourceKey(row.source_attribution, "assessment")).assessments += 1;
    });

    bookings.forEach((row) => {
      const stats = get(sourceKey(row.source_attribution, "booking"));
      if (row.booking_type === "consultation") {
        stats.consultations += 1;
      } else {
        stats.paidBookings += 1;
        if (row.status === "confirmed") stats.bookedRevenueCents += row.amount_cents || 0;
      }
    });

    contracts.forEach((row) => {
      const stats = get(sourceKey(row.source_attribution, "contract"));
      if (row.status === "paid") {
        stats.contractsPaid += 1;
        stats.contractRevenueCents += row.amount_cents || 0;
      } else if (row.status === "signed-awaiting-payment") {
        stats.contractsSigned += 1;
      }
    });

    followups.forEach((row) => {
      if (row.status === "pending") get(sourceKey(row.source_attribution)).followupsPending += 1;
    });

    return [...map.values()].sort((a, b) => {
      const aRevenue = a.bookedRevenueCents + a.contractRevenueCents;
      const bRevenue = b.bookedRevenueCents + b.contractRevenueCents;
      if (aRevenue !== bRevenue) return bRevenue - aRevenue;
      return b.contacts + b.assessments + b.consultations - (a.contacts + a.assessments + a.consultations);
    });
  }, [assessments, bookings, calls, contactMessages, contacts, contracts, followups]);

  const topLeads = useMemo(() => {
    return [...contacts]
      .sort((a, b) => {
        if (b.lead_score !== a.lead_score) return b.lead_score - a.lead_score;
        return new Date(b.last_engagement_at || b.created_at).getTime() - new Date(a.last_engagement_at || a.created_at).getTime();
      })
      .slice(0, 12);
  }, [contacts]);

  const callSourceStats = useMemo(() => {
    const map = new Map<string, {
      key: string;
      count: number;
      phoneNumber: string;
      source: string;
      location: string;
      pagePath: string;
      latestAt: string;
    }>();

    calls.forEach((call) => {
      const location = stringFromMetadata(call.metadata, "call_location") || stringFromMetadata(call.metadata, "location") || "unknown";
      const source = sourceKey(call.source_attribution);
      const key = `${call.phone_number}|${source}|${location}`;
      const existing = map.get(key);
      if (existing) {
        existing.count += 1;
        if (new Date(call.created_at).getTime() > new Date(existing.latestAt).getTime()) {
          existing.latestAt = call.created_at;
          existing.pagePath = call.page_path;
        }
        return;
      }

      map.set(key, {
        key,
        count: 1,
        phoneNumber: call.phone_number,
        source,
        location,
        pagePath: call.page_path,
        latestAt: call.created_at,
      });
    });

    return [...map.values()].sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return new Date(b.latestAt).getTime() - new Date(a.latestAt).getTime();
    });
  }, [calls]);

  const totals = useMemo(() => {
    return sourceStats.reduce(
      (acc, row) => ({
        contacts: acc.contacts + row.contacts,
        calls: acc.calls + row.calls,
        assessments: acc.assessments + row.assessments,
        consultations: acc.consultations + row.consultations,
        paidBookings: acc.paidBookings + row.paidBookings,
        contractsPaid: acc.contractsPaid + row.contractsPaid,
        revenue: acc.revenue + row.bookedRevenueCents + row.contractRevenueCents,
      }),
      { contacts: 0, calls: 0, assessments: 0, consultations: 0, paidBookings: 0, contractsPaid: 0, revenue: 0 },
    );
  }, [sourceStats]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs uppercase text-muted-foreground">Attributed Leads</p>
            <p className="text-2xl font-bold">{totals.contacts}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs uppercase text-muted-foreground">Tracked Calls</p>
            <p className="text-2xl font-bold">{totals.calls}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs uppercase text-muted-foreground">Consults Booked</p>
            <p className="text-2xl font-bold">{totals.consultations}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs uppercase text-muted-foreground">Paid Conversions</p>
            <p className="text-2xl font-bold">{totals.paidBookings + totals.contractsPaid}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs uppercase text-muted-foreground">Tracked Revenue</p>
            <p className="text-2xl font-bold text-green-700">{formatUsd(totals.revenue)}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={fetchAttribution} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {loading ? (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">Loading attribution...</CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Source Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sourceStats.length === 0 ? (
                <p className="text-sm text-muted-foreground">No attribution data yet.</p>
              ) : (
                sourceStats.map((row) => (
                  <div key={row.source} className="rounded-xl border border-border p-4">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <h3 className="font-semibold capitalize">{sourceTitle(row.source)}</h3>
                        <p className="text-sm text-muted-foreground">
                          {row.contacts} leads · {row.calls} calls · {row.assessments} assessments · {row.consultations} consults
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Consult rate {formatPercent(row.consultations, row.contacts)} · paid close rate {formatPercent(row.paidBookings + row.contractsPaid, row.contacts)} · revenue per lead {formatUsd(row.contacts ? Math.round((row.bookedRevenueCents + row.contractRevenueCents) / row.contacts) : 0)}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">{row.paidBookings} paid bookings</Badge>
                        <Badge variant="outline">{row.contractsSigned} signed contracts</Badge>
                        <Badge className="bg-green-700 text-white hover:bg-green-700">
                          {formatUsd(row.bookedRevenueCents + row.contractRevenueCents)}
                        </Badge>
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
                  <PhoneCall className="h-5 w-5 text-primary" />
                  OpenClaw Call Clarity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {callSourceStats.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No tracked calls yet.</p>
                ) : (
                  callSourceStats.map((row) => (
                    <div key={row.key} className="rounded-lg border border-border p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold">{row.phoneNumber}</p>
                          <p className="text-sm text-muted-foreground">
                            {sourceTitle(row.source)} · {locationTitle(row.location)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Last click: {format(new Date(row.latestAt), "MMM d, h:mm a")} · {row.pagePath}
                          </p>
                        </div>
                        <Badge>{row.count}</Badge>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Highest-Intent Leads
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {topLeads.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No CRM leads yet.</p>
                ) : (
                  topLeads.map((lead) => (
                    <div key={lead.id} className="rounded-lg border border-border p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold">
                            {[lead.first_name, lead.last_name].filter(Boolean).join(" ") || lead.email}
                          </p>
                          <p className="text-sm text-muted-foreground">{lead.email}</p>
                          {lead.phone && <p className="text-sm text-muted-foreground">{lead.phone}</p>}
                        </div>
                        <Badge>{lead.lead_score}</Badge>
                      </div>
                      <div className="mt-3 space-y-1 text-sm">
                        <p><span className="text-muted-foreground">Source:</span> {sourceTitle(sourceKey(lead.source_attribution, lead.source))}</p>
                        <p><span className="text-muted-foreground">Path:</span> {lead.revenue_path || "Not set"}</p>
                        <p><span className="text-muted-foreground">Status:</span> {lead.pipeline_status}</p>
                        {lead.next_action && <p><span className="text-muted-foreground">Next:</span> {lead.next_action}</p>}
                        {lead.next_action_due_at && (
                          <p className="text-muted-foreground">Due {format(new Date(lead.next_action_due_at), "MMM d, h:mm a")}</p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default RevenueAttributionManager;
