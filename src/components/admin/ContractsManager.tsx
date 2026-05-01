import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileSignature, RefreshCw, Search, ExternalLink } from "lucide-react";
import { formatUsdFromCents } from "@/lib/contracts";
import { useToast } from "@/hooks/use-toast";

type ContractRow = {
  id: string;
  contract_type: string;
  client_name: string;
  client_email: string;
  client_phone: string | null;
  status: string;
  amount_cents: number | null;
  payment_id: string | null;
  signer_name: string;
  signed_at: string;
  agreement_version: string;
  agreement_text: string;
  contract_pdf_path?: string | null;
  contract_pdf_url?: string | null;
  discount_code?: string | null;
  discount_cents?: number | null;
  created_at: string;
};

const typeLabel = (type: string) => {
  if (type === "intervention") return "Intervention Contract";
  if (type === "readiness-intensive") return "FRI Contract";
  return type;
};

export default function ContractsManager() {
  const { toast } = useToast();
  const [contracts, setContracts] = useState<ContractRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const fetchContracts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contracts")
      .select("id, contract_type, client_name, client_email, client_phone, status, amount_cents, payment_id, signer_name, signed_at, agreement_version, agreement_text, contract_pdf_path, contract_pdf_url, discount_code, discount_cents, created_at")
      .order("signed_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: "Failed to load signed contracts.", variant: "destructive" });
      setContracts([]);
    } else {
      setContracts((data ?? []) as ContractRow[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return contracts;
    return contracts.filter((row) =>
      [row.client_name, row.client_email, row.contract_type, row.signer_name || "", row.discount_code || ""]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [contracts, query]);

  const handleOpenPdf = async (row: ContractRow) => {
    if (!row.contract_pdf_path) {
      toast({ title: "No PDF stored", description: "This contract does not have a stored PDF yet.", variant: "destructive" });
      return;
    }

    const { data, error } = await supabase.storage
      .from("contracts")
      .createSignedUrl(row.contract_pdf_path, 60);

    if (error || !data?.signedUrl) {
      toast({ title: "Open failed", description: "Could not open stored contract PDF.", variant: "destructive" });
      return;
    }

    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FileSignature className="w-4 h-4" /> Signed Contracts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by family, email, type, signer, code" className="pl-9" />
            </div>
            <Button variant="outline" size="sm" onClick={fetchContracts} disabled={loading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
            </Button>
          </div>

          {loading ? (
            <p className="py-8 text-center text-sm text-muted-foreground">Loading signed contracts...</p>
          ) : filtered.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">No signed contracts found yet.</p>
          ) : (
            <div className="space-y-3">
              {filtered.map((row) => (
                <Card key={row.id}>
                  <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium text-foreground">{row.client_name}</p>
                        <Badge variant="secondary">{typeLabel(row.contract_type)}</Badge>
                        <Badge variant="outline">{formatUsdFromCents(row.amount_cents ?? 0)}</Badge>
                        {row.discount_cents ? <Badge variant="outline">-{formatUsdFromCents(row.discount_cents)}</Badge> : null}
                        {row.discount_code ? <Badge>{row.discount_code}</Badge> : null}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>{row.client_email}{row.client_phone ? ` • ${row.client_phone}` : ""}</p>
                        <p>Signed by {row.signer_name || "Unknown signer"}{row.signed_at ? ` • ${new Date(row.signed_at).toLocaleString()}` : ""}</p>
                        <p>Status: {row.status}</p>
                        <p>Version: {row.agreement_version || "—"}{row.payment_id ? ` • Square payment: ${row.payment_id}` : ""}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">View Text</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>{typeLabel(row.contract_type)} — {row.client_name}</DialogTitle>
                          </DialogHeader>
                          <ScrollArea className="h-[65vh] rounded-md border p-4">
                            <pre className="whitespace-pre-wrap text-sm leading-6">{row.agreement_text || "No agreement text stored."}</pre>
                          </ScrollArea>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm" onClick={() => handleOpenPdf(row)}>
                        <ExternalLink className="mr-2 h-4 w-4" /> Open PDF
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
