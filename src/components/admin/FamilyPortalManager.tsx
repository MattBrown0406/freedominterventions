import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import {
  Bell,
  Check,
  Mail,
  MessageSquare,
  Plus,
  RefreshCw,
  Save,
  Users,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
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
  is_active: boolean;
  created_at: string;
  updated_at: string;
  family_portal_members?: PortalMember[];
  family_portal_updates?: PortalUpdate[];
  family_portal_messages?: PortalMessage[];
};

type PortalMember = {
  id: string;
  email: string;
  full_name: string;
  role: string;
  invited_at: string | null;
};

type PortalUpdate = {
  id: string;
  title: string;
  body: string;
  update_type: string;
  is_visible_to_family: boolean;
  created_at: string;
};

type PortalMessage = {
  id: string;
  sender_name: string;
  sender_email: string;
  message: string;
  is_read_by_admin: boolean;
  created_at: string;
};

type CaseForm = {
  family_name: string;
  primary_contact_name: string;
  primary_contact_email: string;
  primary_contact_phone: string;
  loved_one_name: string;
  status: string;
  phase: string;
  next_step: string;
  next_step_due_at: string;
  summary: string;
  risk_level: string;
  initial_update_title: string;
  initial_update_body: string;
};

const emptyForm: CaseForm = {
  family_name: "",
  primary_contact_name: "",
  primary_contact_email: "",
  primary_contact_phone: "",
  loved_one_name: "",
  status: "Intake started",
  phase: "Intake",
  next_step: "",
  next_step_due_at: "",
  summary: "",
  risk_level: "standard",
  initial_update_title: "Welcome to your family portal",
  initial_update_body:
    "This is where we will keep the current case status, next steps, and private updates for your family.",
};

export default function FamilyPortalManager() {
  const { toast } = useToast();
  const [cases, setCases] = useState<PortalCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState<CaseForm>(emptyForm);
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateBody, setUpdateBody] = useState("");

  const selectedCase = useMemo(
    () => cases.find((item) => item.id === selectedId) ?? cases[0] ?? null,
    [cases, selectedId],
  );

  const unreadCount = cases.reduce(
    (count, item) =>
      count +
      (item.family_portal_messages ?? []).filter(
        (message) => !message.is_read_by_admin,
      ).length,
    0,
  );

  useEffect(() => {
    loadCases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!selectedCase) return;
    setForm({
      family_name: selectedCase.family_name ?? "",
      primary_contact_name: selectedCase.primary_contact_name ?? "",
      primary_contact_email: selectedCase.primary_contact_email ?? "",
      primary_contact_phone: selectedCase.primary_contact_phone ?? "",
      loved_one_name: selectedCase.loved_one_name ?? "",
      status: selectedCase.status ?? "",
      phase: selectedCase.phase ?? "",
      next_step: selectedCase.next_step ?? "",
      next_step_due_at: selectedCase.next_step_due_at
        ? selectedCase.next_step_due_at.slice(0, 16)
        : "",
      summary: selectedCase.summary ?? "",
      risk_level: selectedCase.risk_level ?? "standard",
      initial_update_title: "",
      initial_update_body: "",
    });
  }, [selectedCase]);

  const invokePortal = async (body: Record<string, unknown>) => {
    const { data, error } = await supabase.functions.invoke("family-portal", {
      body,
    });
    if (error) throw error;
    return data as Record<string, unknown>;
  };

  const loadCases = async () => {
    setLoading(true);
    try {
      const data = await invokePortal({ action: "admin-list" });
      const nextCases = (data.cases as PortalCase[] | undefined) ?? [];
      setCases(nextCases);
      if (!selectedId && nextCases[0]?.id) setSelectedId(nextCases[0].id);
    } catch (error) {
      toast({
        title: "Family portal failed to load",
        description:
          error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createCase = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try {
      const data = await invokePortal({
        action: "admin-create-case",
        case: form,
        sendInvite: true,
      });
      const invite = data.invite as
        | { invited?: boolean; inviteError?: string }
        | undefined;
      toast({
        title: "Family portal case created",
        description: invite?.invited
          ? "Invitation email sent to the family contact."
          : invite?.inviteError || "Case created. Invitation status unknown.",
      });
      setForm(emptyForm);
      await loadCases();
    } catch (error) {
      toast({
        title: "Could not create case",
        description:
          error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const saveCase = async () => {
    if (!selectedCase) return;
    setSaving(true);
    try {
      await invokePortal({
        action: "admin-update-case",
        caseId: selectedCase.id,
        case: form,
      });
      toast({
        title: "Case updated",
        description: "The family dashboard now shows the latest case status.",
      });
      await loadCases();
    } catch (error) {
      toast({
        title: "Could not update case",
        description:
          error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const addUpdate = async () => {
    if (!selectedCase || !updateTitle.trim() || !updateBody.trim()) return;
    setSaving(true);
    try {
      await invokePortal({
        action: "admin-add-update",
        caseId: selectedCase.id,
        update: {
          title: updateTitle,
          body: updateBody,
          update_type: "case_update",
          is_visible_to_family: true,
        },
      });
      toast({
        title: "Update posted",
        description: "The family can now see this update in their portal.",
      });
      setUpdateTitle("");
      setUpdateBody("");
      await loadCases();
    } catch (error) {
      toast({
        title: "Could not post update",
        description:
          error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const markRead = async (messageId: string) => {
    try {
      await invokePortal({ action: "admin-mark-message-read", messageId });
      await loadCases();
    } catch (error) {
      toast({
        title: "Could not mark read",
        description:
          error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  const updateField = (key: keyof CaseForm, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs uppercase text-muted-foreground">
              Active portal cases
            </p>
            <p className="text-2xl font-bold">
              {cases.filter((item) => item.is_active).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs uppercase text-muted-foreground">
              Unread family messages
            </p>
            <p className="text-2xl font-bold text-amber-600">{unreadCount}</p>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <p className="font-medium">Family login URL</p>
              <p className="text-sm text-muted-foreground">
                https://freedominterventions.com/family-portal
              </p>
            </div>
            <Button variant="outline" onClick={loadCases} disabled={loading}>
              <RefreshCw className="mr-2 h-4 w-4" /> Refresh
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" /> Create family portal
            </CardTitle>
            <CardDescription>
              Create a case, attach the primary family contact, and send the
              login invite.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={createCase} className="space-y-3">
              <Field
                label="Family name"
                value={form.family_name}
                onChange={(value) => updateField("family_name", value)}
                required
              />
              <Field
                label="Primary contact name"
                value={form.primary_contact_name}
                onChange={(value) => updateField("primary_contact_name", value)}
                required
              />
              <Field
                label="Primary contact email"
                type="email"
                value={form.primary_contact_email}
                onChange={(value) =>
                  updateField("primary_contact_email", value)
                }
                required
              />
              <Field
                label="Primary contact phone"
                value={form.primary_contact_phone}
                onChange={(value) =>
                  updateField("primary_contact_phone", value)
                }
              />
              <Field
                label="Loved one name"
                value={form.loved_one_name}
                onChange={(value) => updateField("loved_one_name", value)}
              />
              <Field
                label="Phase"
                value={form.phase}
                onChange={(value) => updateField("phase", value)}
              />
              <Field
                label="Status"
                value={form.status}
                onChange={(value) => updateField("status", value)}
              />
              <Field
                label="Next step"
                value={form.next_step}
                onChange={(value) => updateField("next_step", value)}
              />
              <div className="space-y-2">
                <Label>Case summary</Label>
                <Textarea
                  value={form.summary}
                  onChange={(e) => updateField("summary", e.target.value)}
                  rows={4}
                />
              </div>
              <Button type="submit" className="w-full" disabled={saving}>
                <Mail className="mr-2 h-4 w-4" /> Create and invite family
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" /> Existing portal cases
              </CardTitle>
              <CardDescription>
                Select a case to update the family's visible dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="py-8 text-center text-muted-foreground">
                  Loading family portal cases...
                </p>
              ) : cases.length === 0 ? (
                <p className="py-8 text-center text-muted-foreground">
                  No family portal cases yet.
                </p>
              ) : (
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {cases.map((portalCase) => {
                    const unread = (
                      portalCase.family_portal_messages ?? []
                    ).filter((item) => !item.is_read_by_admin).length;
                    return (
                      <button
                        key={portalCase.id}
                        onClick={() => setSelectedId(portalCase.id)}
                        className={`rounded-lg border p-4 text-left transition hover:bg-muted ${selectedCase?.id === portalCase.id ? "border-primary bg-primary/5" : "bg-card"}`}
                      >
                        <div className="mb-2 flex items-start justify-between gap-2">
                          <div>
                            <p className="font-semibold">
                              {portalCase.family_name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {portalCase.primary_contact_email}
                            </p>
                          </div>
                          {unread > 0 && (
                            <Badge variant="destructive">{unread}</Badge>
                          )}
                        </div>
                        <p className="text-sm">
                          {portalCase.phase} · {portalCase.status}
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">
                          Updated{" "}
                          {format(
                            new Date(portalCase.updated_at),
                            "MMM d, h:mm a",
                          )}
                        </p>
                      </button>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {selectedCase && (
            <div className="grid gap-6 xl:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Edit visible case status</CardTitle>
                  <CardDescription>
                    This controls what the family sees when they log in.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Field
                    label="Family name"
                    value={form.family_name}
                    onChange={(value) => updateField("family_name", value)}
                  />
                  <Field
                    label="Phase"
                    value={form.phase}
                    onChange={(value) => updateField("phase", value)}
                  />
                  <Field
                    label="Status"
                    value={form.status}
                    onChange={(value) => updateField("status", value)}
                  />
                  <Field
                    label="Next step"
                    value={form.next_step}
                    onChange={(value) => updateField("next_step", value)}
                  />
                  <Field
                    label="Next step due"
                    type="datetime-local"
                    value={form.next_step_due_at}
                    onChange={(value) => updateField("next_step_due_at", value)}
                  />
                  <div className="space-y-2">
                    <Label>Case summary</Label>
                    <Textarea
                      value={form.summary}
                      onChange={(e) => updateField("summary", e.target.value)}
                      rows={5}
                    />
                  </div>
                  <Button onClick={saveCase} disabled={saving}>
                    <Save className="mr-2 h-4 w-4" /> Save dashboard status
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Post family-visible update</CardTitle>
                  <CardDescription>
                    Use this for call summaries, decisions, tasks, or next-step
                    clarity.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Field
                    label="Update title"
                    value={updateTitle}
                    onChange={setUpdateTitle}
                  />
                  <div className="space-y-2">
                    <Label>Update body</Label>
                    <Textarea
                      value={updateBody}
                      onChange={(e) => setUpdateBody(e.target.value)}
                      rows={7}
                      placeholder="What changed, what was decided, and what should the family do next?"
                    />
                  </div>
                  <Button
                    onClick={addUpdate}
                    disabled={
                      saving || !updateTitle.trim() || !updateBody.trim()
                    }
                  >
                    <Plus className="mr-2 h-4 w-4" /> Post update
                  </Button>

                  <div className="mt-6 space-y-3">
                    <p className="text-sm font-medium">Recent updates</p>
                    {(selectedCase.family_portal_updates ?? [])
                      .slice(0, 4)
                      .map((item) => (
                        <div key={item.id} className="rounded-lg border p-3">
                          <p className="font-medium">{item.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(item.created_at), "MMM d, h:mm a")}
                          </p>
                          <p className="mt-2 line-clamp-3 whitespace-pre-wrap text-sm text-muted-foreground">
                            {item.body}
                          </p>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {selectedCase && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" /> Family messages
                </CardTitle>
                <CardDescription>
                  New family messages also send an email alert to Matt.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {(selectedCase.family_portal_messages ?? []).length === 0 ? (
                  <p className="py-6 text-center text-muted-foreground">
                    No family messages yet.
                  </p>
                ) : (
                  (selectedCase.family_portal_messages ?? []).map((message) => (
                    <div
                      key={message.id}
                      className={`rounded-lg border p-4 ${message.is_read_by_admin ? "bg-card" : "bg-amber-50"}`}
                    >
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <p className="font-semibold">{message.sender_name}</p>
                          <p className="text-xs text-muted-foreground">
                            {message.sender_email} ·{" "}
                            {format(
                              new Date(message.created_at),
                              "MMM d, h:mm a",
                            )}
                          </p>
                        </div>
                        {!message.is_read_by_admin && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => markRead(message.id)}
                          >
                            <Check className="mr-2 h-4 w-4" /> Mark read
                          </Button>
                        )}
                      </div>
                      <p className="whitespace-pre-wrap text-sm">
                        {message.message}
                      </p>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          )}

          <Card className="border-dashed">
            <CardContent className="flex items-start gap-3 p-4 text-sm text-muted-foreground">
              <Bell className="mt-0.5 h-4 w-4 text-primary" />
              <p>
                Admin-created cases invite the primary contact to the family
                portal. Family-submitted messages are stored here and emailed to
                Matt using the configured Resend sender.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
      />
    </div>
  );
}
