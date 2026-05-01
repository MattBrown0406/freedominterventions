import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { Loader2, Mail, RefreshCw, Send, Tag, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type DiscountCode = {
  id: string;
  code: string;
  base_amount_cents: number;
  amount_cents: number;
  issued_to_name: string | null;
  issued_to_email: string | null;
  expires_at: string | null;
  used_at: string | null;
  used_by_email: string | null;
  created_at: string;
};

const formatUsd = (cents: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);

export default function EmailOutreachSection() {
  const { toast } = useToast();
  const [prospectName, setProspectName] = useState("");
  const [prospectEmail, setProspectEmail] = useState("");
  const [baseAmount, setBaseAmount] = useState("9500");
  const [discountAmount, setDiscountAmount] = useState("0");
  const [expiresDays, setExpiresDays] = useState("30");
  const [personalNote, setPersonalNote] = useState("");
  const [previewEmail, setPreviewEmail] = useState("");
  const [sendingProspect, setSendingProspect] = useState(false);

  const [campaignSubject, setCampaignSubject] = useState("");
  const [campaignBody, setCampaignBody] = useState("");
  const [campaignCtaUrl, setCampaignCtaUrl] = useState("");
  const [campaignCtaLabel, setCampaignCtaLabel] = useState("");
  const [campaignSource, setCampaignSource] = useState<"all" | "manual" | "assessment" | "contract">("manual");
  const [campaignSinceDays, setCampaignSinceDays] = useState("365");
  const [campaignTestEmail, setCampaignTestEmail] = useState("");
  const [sendingCampaign, setSendingCampaign] = useState(false);
  const [recipientCount, setRecipientCount] = useState<number | null>(null);

  const [codes, setCodes] = useState<DiscountCode[]>([]);
  const [loadingCodes, setLoadingCodes] = useState(false);

  const loadCodes = useCallback(async () => {
    setLoadingCodes(true);
    const { data, error } = await supabase
      .from("discount_codes")
      .select("id, code, base_amount_cents, amount_cents, issued_to_name, issued_to_email, expires_at, used_at, used_by_email, created_at")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      toast({ title: "Failed to load codes", description: error.message, variant: "destructive" });
      setCodes([]);
    } else {
      setCodes((data ?? []) as DiscountCode[]);
    }
    setLoadingCodes(false);
  }, [toast]);

  const previewCount = useCallback(async () => {
    let query = supabase
      .from("crm_contacts")
      .select("id", { count: "exact", head: true })
      .eq("unsubscribed", false);
    if (campaignSource !== "all") query = query.eq("source", campaignSource);
    const days = Number.parseInt(campaignSinceDays, 10);
    if (days > 0) query = query.gte("created_at", new Date(Date.now() - days * 86400000).toISOString());
    const { count, error } = await query;
    if (error) {
      setRecipientCount(0);
      return;
    }
    setRecipientCount(count ?? 0);
  }, [campaignSource, campaignSinceDays]);

  useEffect(() => {
    loadCodes();
  }, [loadCodes]);

  useEffect(() => {
    previewCount();
  }, [previewCount]);

  const sendProspect = async (previewOnly: boolean) => {
    setSendingProspect(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-prospect-contract", {
        body: {
          recipientName: prospectName,
          recipientEmail: prospectEmail,
          baseAmountCents: Math.round(Number.parseFloat(baseAmount || "0") * 100),
          discountAmountCents: Math.round(Number.parseFloat(discountAmount || "0") * 100),
          expiresInDays: Number.parseInt(expiresDays, 10) || 30,
          personalNote,
          previewOnly,
          previewEmail: previewOnly ? previewEmail : undefined,
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      toast({
        title: previewOnly ? "Preview sent" : "Prospect email sent",
        description: previewOnly
          ? `Preview delivered to ${previewEmail || prospectEmail}`
          : `Sent to ${prospectEmail}${data?.code ? ` with code ${data.code}` : ""}`,
      });

      if (!previewOnly) {
        setProspectName("");
        setProspectEmail("");
        setDiscountAmount("0");
        setPersonalNote("");
        loadCodes();
      }
    } catch (error) {
      toast({
        title: "Failed to send",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setSendingProspect(false);
    }
  };

  const sendCampaign = async (testOnly: boolean) => {
    setSendingCampaign(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-campaign", {
        body: {
          subject: campaignSubject,
          bodyHtml: campaignBody,
          ctaUrl: campaignCtaUrl || undefined,
          ctaLabel: campaignCtaLabel || undefined,
          source: campaignSource,
          sinceDays: Number.parseInt(campaignSinceDays, 10) || 0,
          testEmail: testOnly ? campaignTestEmail : undefined,
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast({
        title: testOnly ? "Test sent" : "Campaign sent",
        description: testOnly
          ? `Test sent to ${campaignTestEmail}`
          : `${data.sent} sent, ${data.failed} failed out of ${data.recipientCount}`,
      });
      previewCount();
    } catch (error) {
      toast({
        title: "Failed to send",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setSendingCampaign(false);
    }
  };

  const baseCents = Math.round(Number.parseFloat(baseAmount || "0") * 100);
  const discountCents = Math.round(Number.parseFloat(discountAmount || "0") * 100);
  const finalCents = Math.max(baseCents - discountCents, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Mail className="h-4 w-4" /> Contract Outreach
        </CardTitle>
        <CardDescription>Send a contract invite to one prospect, or send a campaign to a CRM segment.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="prospect" className="space-y-4">
          <TabsList>
            <TabsTrigger value="prospect">Send to Prospect</TabsTrigger>
            <TabsTrigger value="campaign">Campaigns</TabsTrigger>
            <TabsTrigger value="codes">Discount Codes</TabsTrigger>
          </TabsList>

          <TabsContent value="prospect" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Recipient name</Label>
                <Input value={prospectName} onChange={(event) => setProspectName(event.target.value)} placeholder="Jane Smith" />
              </div>
              <div className="space-y-2">
                <Label>Recipient email</Label>
                <Input type="email" value={prospectEmail} onChange={(event) => setProspectEmail(event.target.value)} placeholder="jane@example.com" />
              </div>
              <div className="space-y-2">
                <Label>Contract amount ($)</Label>
                <Input type="number" value={baseAmount} onChange={(event) => setBaseAmount(event.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Discount amount ($)</Label>
                <Input type="number" value={discountAmount} onChange={(event) => setDiscountAmount(event.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Code expires in days</Label>
                <Input type="number" value={expiresDays} onChange={(event) => setExpiresDays(event.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Preview email</Label>
                <Input type="email" value={previewEmail} onChange={(event) => setPreviewEmail(event.target.value)} placeholder="matt@freedominterventions.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Personal note</Label>
              <Textarea value={personalNote} onChange={(event) => setPersonalNote(event.target.value)} rows={3} placeholder="A short note that appears in the email..." />
            </div>
            <p className="text-sm text-muted-foreground">
              Final amount: <strong>{formatUsd(finalCents)}</strong>
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => sendProspect(true)} disabled={sendingProspect || !prospectName || !prospectEmail}>
                {sendingProspect ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Send Preview
              </Button>
              <Button onClick={() => sendProspect(false)} disabled={sendingProspect || !prospectName || !prospectEmail}>
                <Send className="mr-2 h-4 w-4" /> Send to Prospect
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="campaign" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Subject</Label>
                <Input value={campaignSubject} onChange={(event) => setCampaignSubject(event.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Audience</Label>
                <Select value={campaignSource} onValueChange={(value) => setCampaignSource(value as typeof campaignSource)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All CRM contacts</SelectItem>
                    <SelectItem value="manual">Manual/prospect contacts</SelectItem>
                    <SelectItem value="assessment">Assessment submitters</SelectItem>
                    <SelectItem value="contract">Contract signers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>From the last days (0 = all time)</Label>
                <Input type="number" value={campaignSinceDays} onChange={(event) => setCampaignSinceDays(event.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>CTA button URL</Label>
                <Input value={campaignCtaUrl} onChange={(event) => setCampaignCtaUrl(event.target.value)} placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <Label>CTA button label</Label>
                <Input value={campaignCtaLabel} onChange={(event) => setCampaignCtaLabel(event.target.value)} placeholder="Schedule a Call" />
              </div>
              <div className="space-y-2">
                <Label>Test email</Label>
                <Input type="email" value={campaignTestEmail} onChange={(event) => setCampaignTestEmail(event.target.value)} placeholder="matt@freedominterventions.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Body (HTML allowed)</Label>
              <Textarea
                value={campaignBody}
                onChange={(event) => setCampaignBody(event.target.value)}
                rows={8}
                placeholder="<p>Hi {{first_name}},</p><p>I wanted to follow up...</p>"
              />
              <p className="text-xs text-muted-foreground">
                Personalization: {"{{first_name}}"}, {"{{last_name}}"}, {"{{email}}"}. An unsubscribe link is added automatically.
              </p>
            </div>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" /> {recipientCount ?? "..."} recipients match
              <Button size="sm" variant="ghost" onClick={previewCount}><RefreshCw className="h-3 w-3" /></Button>
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => sendCampaign(true)} disabled={sendingCampaign || !campaignSubject || !campaignBody || !campaignTestEmail}>
                {sendingCampaign ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Send Test
              </Button>
              <Button onClick={() => sendCampaign(false)} disabled={sendingCampaign || !campaignSubject || !campaignBody}>
                <Send className="mr-2 h-4 w-4" /> Send to {recipientCount ?? 0} Contacts
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="codes" className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Tag className="h-4 w-4" /> Issued discount codes
              </p>
              <Button size="sm" variant="ghost" onClick={loadCodes}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            {loadingCodes ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : codes.length === 0 ? (
              <p className="text-sm text-muted-foreground">No codes yet.</p>
            ) : (
              <div className="space-y-2">
                {codes.map((code) => (
                  <div key={code.id} className="flex flex-col gap-2 rounded-md border p-3 text-sm md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-mono font-bold">{code.code}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatUsd(code.amount_cents)} off {formatUsd(code.base_amount_cents)} · {code.issued_to_name || "No name"} ({code.issued_to_email || "No email"}) · created {format(new Date(code.created_at), "MMM d, yyyy")}
                        {code.expires_at ? ` · expires ${format(new Date(code.expires_at), "MMM d, yyyy")}` : ""}
                      </p>
                    </div>
                    {code.used_at ? <Badge variant="secondary">Used by {code.used_by_email}</Badge> : <Badge>Active</Badge>}
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
