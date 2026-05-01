import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const functionsUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/crm-unsubscribe`;

export default function Unsubscribe() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const token = new URLSearchParams(window.location.search).get("token") || "";

  useEffect(() => {
    if (!token) {
      setError("No unsubscribe token was provided.");
      setLoading(false);
      return;
    }

    fetch(`${functionsUrl}?token=${encodeURIComponent(token)}`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Invalid unsubscribe link.");
        setEmail(data.email || "");
        setDone(Boolean(data.alreadyUnsubscribed));
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load unsubscribe link."))
      .finally(() => setLoading(false));
  }, [token]);

  const confirm = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(functionsUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to unsubscribe.");
      setEmail(data.email || email);
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not unsubscribe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Unsubscribe | Freedom Interventions"
        description="Unsubscribe from Freedom Interventions email updates."
        canonical="https://freedominterventions.com/unsubscribe"
      />
      <Navbar />
      <main className="container mx-auto max-w-xl px-6 py-32">
        <Card>
          <CardHeader>
            <CardTitle>Email Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? <p className="text-sm text-muted-foreground">Loading...</p> : null}
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            {!loading && !error && done ? (
              <p className="text-sm text-muted-foreground">{email || "This email"} has been unsubscribed.</p>
            ) : null}
            {!loading && !error && !done ? (
              <>
                <p className="text-sm text-muted-foreground">
                  You are about to unsubscribe <strong>{email}</strong> from Freedom Interventions email updates.
                </p>
                <Button onClick={confirm}>Unsubscribe</Button>
              </>
            ) : null}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
