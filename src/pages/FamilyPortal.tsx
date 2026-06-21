import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  LogOut,
  Mail,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

type PortalCase = {
  id: string;
  family_name: string;
  primary_contact_name: string;
  primary_contact_email: string;
  primary_contact_phone: string | null;
  loved_one_name: string | null;
  status: string;
  phase: string;
  next_step: string | null;
  next_step_due_at: string | null;
  summary: string | null;
  risk_level: string;
  updated_at: string;
  created_at: string;
};

type PortalMember = {
  id: string;
  case_id: string;
  full_name: string;
  email: string;
  role: string;
};

type PortalUpdate = {
  id: string;
  case_id: string;
  title: string;
  body: string;
  update_type: string;
  created_at: string;
};

type PortalMessage = {
  id: string;
  case_id: string;
  sender_name: string;
  sender_email: string;
  message: string;
  created_at: string;
};

type PortalTable =
  | "family_portal_members"
  | "family_portal_cases"
  | "family_portal_updates"
  | "family_portal_messages";
const portalTable = (table: PortalTable) =>
  (supabase.from as any)(table);

export default function FamilyPortal() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sessionReady, setSessionReady] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [memberships, setMemberships] = useState<PortalMember[]>([]);
  const [cases, setCases] = useState<PortalCase[]>([]);
  const [updates, setUpdates] = useState<PortalUpdate[]>([]);
  const [messages, setMessages] = useState<PortalMessage[]>([]);
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsAuthed(Boolean(session));
      setSessionReady(true);
    };
    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthed(Boolean(session));
      if (session) setTimeout(() => loadPortal(), 0);
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isAuthed) loadPortal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthed]);

  const activeCase = useMemo(
    () => cases.find((item) => item.id === activeCaseId) ?? cases[0] ?? null,
    [activeCaseId, cases],
  );

  const caseUpdates = useMemo(
    () => updates.filter((item) => item.case_id === activeCase?.id),
    [activeCase?.id, updates],
  );

  const caseMessages = useMemo(
    () => messages.filter((item) => item.case_id === activeCase?.id),
    [activeCase?.id, messages],
  );

  const loadPortal = async () => {
    setLoading(true);
    try {
      const { data: memberRows, error: memberError } = await portalTable(
        "family_portal_members",
      )
        .select("*")
        .order("created_at", { ascending: true });
      if (memberError) throw memberError;
      const caseIds = (memberRows ?? []).map(
        (row: PortalMember) => row.case_id,
      );
      setMemberships(memberRows ?? []);
      if (caseIds.length === 0) {
        setCases([]);
        setUpdates([]);
        setMessages([]);
        return;
      }

      const [
        { data: caseRows, error: caseError },
        { data: updateRows, error: updateError },
        { data: messageRows, error: messageError },
      ] = await Promise.all([
        portalTable("family_portal_cases")
          .select("*")
          .in("id", caseIds)
          .order("updated_at", { ascending: false }),
        portalTable("family_portal_updates")
          .select("*")
          .in("case_id", caseIds)
          .order("created_at", { ascending: false }),
        portalTable("family_portal_messages")
          .select("*")
          .in("case_id", caseIds)
          .order("created_at", { ascending: false }),
      ]);

      if (caseError || updateError || messageError)
        throw caseError || updateError || messageError;
      setCases(caseRows ?? []);
      setUpdates(updateRows ?? []);
      setMessages(messageRows ?? []);
      if (!activeCaseId && caseRows?.[0]?.id) setActiveCaseId(caseRows[0].id);
    } catch (error) {
      toast({
        title: "Could not load your portal",
        description:
          error instanceof Error
            ? error.message
            : "Please try again or contact Matt.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    }
    setAuthLoading(false);
  };

  const sendPasswordReset = async () => {
    if (!email.trim()) {
      toast({ title: "Enter your email first", variant: "destructive" });
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/family-portal`,
    });
    if (error) {
      toast({
        title: "Reset failed",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Check your email",
      description: "If your portal account exists, a reset link is on the way.",
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthed(false);
    setCases([]);
    setUpdates([]);
    setMessages([]);
  };

  const submitMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!activeCase || !message.trim()) return;
    setSending(true);
    const { error } = await supabase.functions.invoke("family-portal", {
      body: { action: "family-submit-message", caseId: activeCase.id, message },
    });
    if (error) {
      toast({
        title: "Message not sent",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Message sent",
        description: "Matt has been notified by email.",
      });
      setMessage("");
      loadPortal();
    }
    setSending(false);
  };

  if (!sessionReady) {
    return <div className="min-h-screen bg-background" />;
  }

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Family Portal Login | Freedom Interventions</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <Navbar />
        <main className="container mx-auto max-w-5xl px-4 py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
            <div>
              <Badge variant="outline" className="mb-4">
                Private family portal
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                One steady place for your family's case status.
              </h1>
              <p className="mt-5 text-lg text-muted-foreground">
                Sign in to see current case status, next steps, private updates,
                and a secure way to message Freedom Interventions.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border bg-card p-4">
                  <ShieldCheck className="mb-2 h-5 w-5 text-primary" />
                  <p className="font-semibold">Private</p>
                  <p className="text-sm text-muted-foreground">
                    Access is invite-only for active families.
                  </p>
                </div>
                <div className="rounded-lg border bg-card p-4">
                  <Clock className="mb-2 h-5 w-5 text-primary" />
                  <p className="font-semibold">Current</p>
                  <p className="text-sm text-muted-foreground">
                    Review the latest phase, status, and next step.
                  </p>
                </div>
                <div className="rounded-lg border bg-card p-4">
                  <MessageSquare className="mb-2 h-5 w-5 text-primary" />
                  <p className="font-semibold">Connected</p>
                  <p className="text-sm text-muted-foreground">
                    Send a message when the family needs clarity.
                  </p>
                </div>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Family login</CardTitle>
                <CardDescription>
                  Use the email address Matt invited to the portal.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    className="w-full"
                    type="submit"
                    disabled={authLoading}
                  >
                    {authLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </form>
                <Button
                  variant="link"
                  className="mt-3 w-full"
                  onClick={sendPasswordReset}
                >
                  Need a password/reset link?
                </Button>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Not invited yet?{" "}
                  <Link to="/contact" className="underline">
                    Contact Freedom Interventions
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Family Portal | Freedom Interventions</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div>
            <p className="text-sm text-muted-foreground">
              Freedom Interventions
            </p>
            <h1 className="text-2xl font-bold">Family Portal</h1>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Sign out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Loading your case...
            </CardContent>
          </Card>
        ) : cases.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No active case connected yet</CardTitle>
              <CardDescription>
                Your login works, but no family case has been attached to this
                account yet.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate("/contact")}>
                Contact Freedom Interventions
              </Button>
            </CardContent>
          </Card>
        ) : activeCase ? (
          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <aside className="space-y-3">
              {cases.map((portalCase) => (
                <button
                  key={portalCase.id}
                  onClick={() => setActiveCaseId(portalCase.id)}
                  className={`w-full rounded-lg border p-4 text-left transition hover:bg-muted ${activeCase.id === portalCase.id ? "border-primary bg-primary/5" : "bg-card"}`}
                >
                  <p className="font-semibold">{portalCase.family_name}</p>
                  <p className="text-sm text-muted-foreground">
                    {portalCase.phase}
                  </p>
                </button>
              ))}
            </aside>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl">
                        {activeCase.family_name}
                      </CardTitle>
                      <CardDescription>
                        Updated{" "}
                        {format(
                          new Date(activeCase.updated_at),
                          "MMM d, yyyy 'at' h:mm a",
                        )}
                      </CardDescription>
                    </div>
                    <Badge className="text-sm">{activeCase.phase}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border bg-muted/30 p-4">
                    <p className="text-xs uppercase text-muted-foreground">
                      Current status
                    </p>
                    <p className="mt-1 font-semibold">{activeCase.status}</p>
                  </div>
                  <div className="rounded-lg border bg-muted/30 p-4">
                    <p className="text-xs uppercase text-muted-foreground">
                      Next step
                    </p>
                    <p className="mt-1 font-semibold">
                      {activeCase.next_step || "Matt will update this shortly."}
                    </p>
                    {activeCase.next_step_due_at && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        Due{" "}
                        {format(new Date(activeCase.next_step_due_at), "MMM d")}
                      </p>
                    )}
                  </div>
                  <div className="rounded-lg border bg-muted/30 p-4">
                    <p className="text-xs uppercase text-muted-foreground">
                      Primary contact
                    </p>
                    <p className="mt-1 font-semibold">
                      {activeCase.primary_contact_name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activeCase.primary_contact_email}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {activeCase.summary && (
                <Card>
                  <CardHeader>
                    <CardTitle>Case summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap text-muted-foreground">
                      {activeCase.summary}
                    </p>
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" /> Updates
                    </CardTitle>
                    <CardDescription>
                      Visible notes and progress updates from Freedom
                      Interventions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {caseUpdates.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        No updates posted yet.
                      </p>
                    ) : (
                      caseUpdates.map((item) => (
                        <div key={item.id} className="rounded-lg border p-4">
                          <div className="mb-2 flex items-center justify-between gap-3">
                            <p className="font-semibold">{item.title}</p>
                            <span className="text-xs text-muted-foreground">
                              {format(new Date(item.created_at), "MMM d")}
                            </span>
                          </div>
                          <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                            {item.body}
                          </p>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-primary" /> Message Matt
                    </CardTitle>
                    <CardDescription>
                      Messages are stored in the portal and also emailed to
                      Matt.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={submitMessage} className="space-y-3">
                      <Textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write a private case message..."
                        rows={5}
                      />
                      <Button
                        type="submit"
                        disabled={sending || !message.trim()}
                      >
                        {sending ? "Sending..." : "Send message"}{" "}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                    <div className="mt-6 space-y-3">
                      {caseMessages.slice(0, 5).map((item) => (
                        <div
                          key={item.id}
                          className="rounded-lg border bg-muted/20 p-3"
                        >
                          <div className="mb-1 flex items-center justify-between gap-3 text-xs text-muted-foreground">
                            <span>{item.sender_name}</span>
                            <span>
                              {format(
                                new Date(item.created_at),
                                "MMM d, h:mm a",
                              )}
                            </span>
                          </div>
                          <p className="whitespace-pre-wrap text-sm">
                            {item.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
