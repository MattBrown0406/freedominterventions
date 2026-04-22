import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Mail, Phone, Trash2, RefreshCw, CheckCircle2, Clock, Send, XCircle, DollarSign } from "lucide-react";

interface AbandonedCart {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  booking_type: string;
  booking_date: string | null;
  booking_time: string | null;
  amount_cents: number;
  status: string;
  recovery_email_sent_at: string | null;
  recovered_at: string | null;
  created_at: string;
}

const offerLabel = (type: string) =>
  type === "readiness-intensive" ? "Family Readiness Intensive" : "Crisis Coaching Session";

const statusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
    case "recovery_sent":
      return <Badge variant="default"><Send className="w-3 h-3 mr-1" />Recovery sent</Badge>;
    case "recovered":
      return <Badge className="bg-green-600 hover:bg-green-700"><CheckCircle2 className="w-3 h-3 mr-1" />Recovered</Badge>;
    case "expired":
      return <Badge variant="outline"><XCircle className="w-3 h-3 mr-1" />Expired</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const AbandonedCartsManager = () => {
  const [carts, setCarts] = useState<AbandonedCart[]>([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const { toast } = useToast();

  const fetchCarts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("abandoned_carts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) {
      toast({ title: "Error", description: "Failed to load abandoned carts.", variant: "destructive" });
    } else {
      setCarts((data || []) as AbandonedCart[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  const runRecoveryNow = async () => {
    setRunning(true);
    const { data, error } = await supabase.functions.invoke("recover-abandoned-carts");
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({
        title: "Recovery run complete",
        description: `Processed ${data?.processed || 0} • Sent ${data?.sent || 0} • Failed ${data?.failed || 0}`,
      });
      fetchCarts();
    }
    setRunning(false);
  };

  const markRecovered = async (id: string) => {
    const { error } = await supabase
      .from("abandoned_carts")
      .update({ status: "recovered", recovered_at: new Date().toISOString() })
      .eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      fetchCarts();
    }
  };

  const deleteCart = async (id: string) => {
    if (!confirm("Delete this abandoned cart record?")) return;
    const { error } = await supabase.from("abandoned_carts").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      fetchCarts();
    }
  };

  const stats = {
    total: carts.length,
    pending: carts.filter((c) => c.status === "pending").length,
    recovered: carts.filter((c) => c.status === "recovered").length,
    revenue: carts.filter((c) => c.status === "recovered").reduce((sum, c) => sum + c.amount_cents, 0),
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase">Total carts</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase">Pending</p>
            <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase">Recovered</p>
            <p className="text-2xl font-bold text-green-600">{stats.recovered}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase">Revenue recovered</p>
            <p className="text-2xl font-bold text-primary">${(stats.revenue / 100).toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Customers who entered details for a paid booking but didn't complete payment. Recovery emails go out automatically 1 hour after abandonment.
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchCarts} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-1 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button size="sm" onClick={runRecoveryNow} disabled={running}>
            <Send className={`w-4 h-4 mr-1 ${running ? "animate-pulse" : ""}`} />
            Run recovery now
          </Button>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-muted-foreground py-8">Loading...</p>
      ) : carts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No abandoned carts yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {carts.map((cart) => (
            <Card key={cart.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      {cart.customer_name}
                      <span className="text-sm font-normal text-muted-foreground">
                        — {offerLabel(cart.booking_type)} (${(cart.amount_cents / 100).toLocaleString()})
                      </span>
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                      Started {format(new Date(cart.created_at), "MMM d, yyyy 'at' h:mm a")}
                    </p>
                  </div>
                  {statusBadge(cart.status)}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm mb-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <a href={`mailto:${cart.customer_email}`} className="text-primary hover:underline truncate">
                      {cart.customer_email}
                    </a>
                  </div>
                  {cart.customer_phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <a href={`tel:${cart.customer_phone}`} className="text-primary hover:underline">
                        {cart.customer_phone}
                      </a>
                    </div>
                  )}
                  {cart.booking_date && cart.booking_time && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{cart.booking_date} at {cart.booking_time} PT</span>
                    </div>
                  )}
                </div>
                {cart.recovery_email_sent_at && (
                  <p className="text-xs text-muted-foreground">
                    Recovery email sent {format(new Date(cart.recovery_email_sent_at), "MMM d 'at' h:mm a")}
                  </p>
                )}
                <div className="flex gap-2 mt-3">
                  {cart.status !== "recovered" && (
                    <Button size="sm" variant="outline" onClick={() => markRecovered(cart.id)}>
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Mark recovered
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" onClick={() => deleteCart(cart.id)}>
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AbandonedCartsManager;
