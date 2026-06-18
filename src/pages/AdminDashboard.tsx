import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  LogOut,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  FileText,
  Download,
  MessageSquare,
  Home,
  Calendar,
  ShoppingCart,
  FileSignature,
  Mail,
  MailCheck,
  BarChart3,
  Columns3,
  Target,
  HelpCircle,
  Users,
} from "lucide-react";
import { generateAssessmentPdf } from "@/utils/generateAssessmentPdf";
import { format } from "date-fns";
import AssessmentExpandedView from "@/components/admin/AssessmentExpandedView";
import TestimonialManager from "@/components/admin/TestimonialManager";
import AvailabilityManager from "@/components/admin/AvailabilityManager";
import CaseDocumentsManager from "@/components/admin/CaseDocumentsManager";
import AbandonedCartsManager from "@/components/admin/AbandonedCartsManager";
import ContractsManager from "@/components/admin/ContractsManager";
import EmailOutreachSection from "@/components/admin/EmailOutreachSection";
import FreedomFollowupsManager from "@/components/admin/FreedomFollowupsManager";
import CrossSiteRevenueDashboard from "@/components/admin/CrossSiteRevenueDashboard";
import RevenueAttributionManager from "@/components/admin/RevenueAttributionManager";
import RevenuePipelineManager from "@/components/admin/RevenuePipelineManager";
import WeeklyRevenueActionsManager from "@/components/admin/WeeklyRevenueActionsManager";
import AnswerPagePerformance from "@/components/admin/AnswerPagePerformance";
import FamilyPortalManager from "@/components/admin/FamilyPortalManager";
interface Assessment {
  id: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  contact_relationship: string | null;
  best_day_to_contact: string | null;
  best_time_to_contact: string | null;
  loved_one_name: string;
  loved_one_age: number | null;
  primary_substances: string | null;
  severity_level: string | null;
  dsm_yes_count: number | null;
  status: string;
  created_at: string;
  dsm_behaviors: Record<string, boolean> | null;
  withdrawal_symptoms: string | null;
  withdrawal_description: string | null;
  recent_detox: string | null;
  hospitalized_detox: string | null;
  withdrawal_medications: string | null;
  withdrawal_medications_list: string | null;
  health_issues: string | null;
  health_issues_list: string | null;
  recent_er_visits: string | null;
  er_visit_details: string | null;
  prescribed_medications: string | null;
  prescribed_medications_list: string | null;
  mental_health_signs: string | null;
  mental_health_details: string | null;
  psychiatric_history: string | null;
  psychiatric_details: string | null;
  violence_history: string | null;
  violence_details: string | null;
  stable_living: string | null;
  homeless_unstable: string | null;
  family_enabling: string | null;
  enabling_details: string | null;
  children_present: string | null;
  children_impacted: string | null;
  support_network: string | null;
  prior_treatment: string | null;
  treatment_history: Array<{
    programName: string;
    dateAttended: string;
    successfulCompletion: boolean;
  }> | null;
  current_triggers: string | null;
  willingness_to_change: string | null;
  financial_impact: string | null;
  financial_details: string | null;
  child_welfare_involvement: string | null;
  family_ready_intervention: string | null;
  intervention_barriers: string | null;
  urgency_level: string | null;
  immediate_safety_concerns: string | null;
  overdose_history: string | null;
  suicide_ideation: string | null;
  suicide_attempts_history: string | null;
  family_signature: string | null;
  frequency: string | null;
  duration_of_use: string | null;
  age_first_used: number | null;
  use_increased: string | null;
  loved_one_gender: string | null;
  source_attribution?: Record<string, unknown> | null;
}

// Helper to cast JSON fields
const parseAssessment = (data: unknown): Assessment => {
  const raw = data as Record<string, unknown>;
  return {
    ...raw,
    dsm_behaviors: raw.dsm_behaviors as Record<string, boolean> | null,
    treatment_history: raw.treatment_history as Array<{
      programName: string;
      dateAttended: string;
      successfulCompletion: boolean;
    }> | null,
  } as Assessment;
};

const includesYes = (value: string | null | undefined) => {
  if (!value) return false;
  return /\b(yes|true|high|urgent|immediate|active|current)\b/i.test(value);
};

const calculateLeadScore = (assessment: Assessment) => {
  let score = 0;

  if (assessment.status === "new") score += 20;
  if (
    assessment.urgency_level &&
    /urgent|high|immediate/i.test(assessment.urgency_level)
  )
    score += 25;
  if ((assessment.dsm_yes_count || 0) >= 6) score += 20;
  if (includesYes(assessment.overdose_history)) score += 20;
  if (
    includesYes(assessment.suicide_ideation) ||
    includesYes(assessment.suicide_attempts_history)
  )
    score += 25;
  if (includesYes(assessment.violence_history)) score += 15;
  if (includesYes(assessment.immediate_safety_concerns)) score += 20;
  if (includesYes(assessment.homeless_unstable)) score += 10;
  if (includesYes(assessment.family_ready_intervention)) score += 15;
  if (assessment.contact_phone) score += 5;

  return Math.min(score, 100);
};

const getLeadPriority = (score: number) => {
  if (score >= 75)
    return {
      label: "Hot Lead",
      className: "bg-red-600 text-white hover:bg-red-600",
    };
  if (score >= 50)
    return {
      label: "High Priority",
      className: "bg-amber-500 text-white hover:bg-amber-500",
    };
  if (score >= 25)
    return {
      label: "Needs Review",
      className: "bg-blue-600 text-white hover:bg-blue-600",
    };
  return {
    label: "Standard",
    className: "bg-muted text-foreground hover:bg-muted",
  };
};

const getFollowUpLabel = (assessment: Assessment) => {
  if (assessment.status === "reviewed") return "Reviewed";

  const created = new Date(assessment.created_at).getTime();
  const hoursOld = Number.isFinite(created)
    ? (Date.now() - created) / (1000 * 60 * 60)
    : 0;
  if (assessment.status === "new" && hoursOld >= 24) return "Overdue";
  if (assessment.status === "new" && hoursOld >= 4) return "Same-day follow-up";
  if (assessment.status === "in_progress") return "Active follow-up";
  return "New lead";
};

const getSourceLabel = (
  sourceAttribution: Record<string, unknown> | null | undefined,
) => {
  if (!sourceAttribution) return "Unknown";
  const source = sourceAttribution.source;
  const campaign = sourceAttribution.utm_campaign;
  return [source, campaign].filter(Boolean).join(" / ") || "Unknown";
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/admin-login");
        return;
      }

      // Server-side admin verification via edge function
      const { data, error } = await supabase.functions.invoke(
        "admin-assessments",
        {
          body: { action: "verify-admin" },
        },
      );

      if (error || !data?.isAdmin) {
        toast({
          title: "Access Denied",
          description: "You do not have admin privileges.",
          variant: "destructive",
        });
        await supabase.auth.signOut();
        navigate("/admin-login");
        return;
      }

      fetchAssessments();
    };

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        navigate("/admin-login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const fetchAssessments = async () => {
    setIsLoading(true);

    const { data, error } = await supabase.functions.invoke(
      "admin-assessments",
      {
        body: { action: "list" },
      },
    );

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load assessments.",
        variant: "destructive",
      });
      setAssessments([]);
      setIsLoading(false);
      return;
    }

    const rows =
      (data as { assessments?: unknown[] } | null)?.assessments ?? [];
    setAssessments(rows.map(parseAssessment));
    setIsLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("assessments")
      .update({ status, reviewed_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update status.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Status Updated",
        description: `Assessment marked as ${status}.`,
      });
      fetchAssessments();
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <Badge variant="destructive">
            <AlertCircle className="w-3 h-3 mr-1" /> New
          </Badge>
        );
      case "in_progress":
        return (
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" /> In Progress
          </Badge>
        );
      case "reviewed":
        return (
          <Badge variant="default">
            <CheckCircle className="w-3 h-3 mr-1" /> Reviewed
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const sortedAssessments = [...assessments].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  const hotLeadCount = assessments.filter(
    (assessment) => calculateLeadScore(assessment) >= 75,
  ).length;
  const newLeadCount = assessments.filter(
    (assessment) => assessment.status === "new",
  ).length;
  const overdueCount = assessments.filter(
    (assessment) => getFollowUpLabel(assessment) === "Overdue",
  ).length;

  // These must match the exact keys used in Assessment.tsx form submission
  const dsmBehaviorQuestions = [
    "Has your loved one used substances in larger amounts or for longer periods than they originally intended?",
    "Has your loved one expressed a desire to cut down or stop using but been unable to do so?",
    "Does your loved one spend a significant amount of time obtaining, using, or recovering from substances?",
    "Does your loved one experience strong cravings or urges to use substances?",
    "Has substance use caused your loved one to miss important family events, work responsibilities, or school obligations?",
    "Has your loved one continued using despite it causing problems in their relationships or social life?",
    "Has your loved one given up or reduced participation in activities they once enjoyed because of substance use?",
    "Has your loved one engaged in risky behaviors while using, such as driving under the influence or unsafe sexual activity?",
    "Has your loved one needed to use more of the substance to achieve the same effect they used to get with less (tolerance)?",
    "Has your loved one experienced physical or emotional withdrawal symptoms when not using the substance?",
    "Has your loved one used substances specifically to avoid or relieve withdrawal symptoms?",
    "Has substance use interfered with your loved one's ability to fulfill major responsibilities at work, school, or home?",
    "Has your loved one experienced legal problems as a result of their substance use?",
  ];

  // Short labels for display
  const dsmBehaviorLabels = [
    "Used larger amounts or longer than intended",
    "Wanted to cut down but couldn't",
    "Spent excessive time obtaining/using/recovering",
    "Cravings or strong urges to use",
    "Missed family/work obligations due to use",
    "Continued despite social/relationship problems",
    "Gave up important activities for use",
    "Risky use (driving, unsafe sex, etc.)",
    "Tolerance (needs more for same effect)",
    "Withdrawal symptoms (physical/emotional)",
    "Used to relieve withdrawal",
    "Failed to fulfill major role obligations",
    "Legal problems related to use",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Admin Dashboard | Freedom Interventions</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Assessment Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Review submitted family assessments
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => navigate("/")}>
              <Home className="w-4 h-4 mr-2" /> Home
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="assessments" className="space-y-6">
          <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 rounded-lg p-1.5">
            <TabsTrigger value="assessments" className="gap-2">
              <FileText className="w-4 h-4" />
              Assessments
            </TabsTrigger>
            <TabsTrigger value="availability" className="gap-2">
              <Calendar className="w-4 h-4" />
              Availability
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Testimonials
            </TabsTrigger>
            <TabsTrigger value="abandoned-carts" className="gap-2">
              <ShoppingCart className="w-4 h-4" />
              Abandoned Carts
            </TabsTrigger>
            <TabsTrigger value="case-documents" className="gap-2">
              <FileText className="w-4 h-4" />
              Case Docs
            </TabsTrigger>
            <TabsTrigger value="family-portal" className="gap-2">
              <Users className="w-4 h-4" />
              Family Portal
            </TabsTrigger>
            <TabsTrigger value="contracts" className="gap-2">
              <FileSignature className="w-4 h-4" />
              Contracts
            </TabsTrigger>
            <TabsTrigger value="outreach" className="gap-2">
              <Mail className="w-4 h-4" />
              Outreach
            </TabsTrigger>
            <TabsTrigger value="followups" className="gap-2">
              <MailCheck className="w-4 h-4" />
              Follow-Ups
            </TabsTrigger>
            <TabsTrigger value="revenue-pipeline" className="gap-2">
              <Columns3 className="w-4 h-4" />
              Revenue Pipeline
            </TabsTrigger>
            <TabsTrigger value="revenue-actions" className="gap-2">
              <Target className="w-4 h-4" />
              Money List
            </TabsTrigger>
            <TabsTrigger value="cross-site-revenue" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Command Center
            </TabsTrigger>
            <TabsTrigger value="attribution" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Attribution
            </TabsTrigger>
            <TabsTrigger value="answer-aeo" className="gap-2">
              <HelpCircle className="w-4 h-4" />
              Answer AEO
            </TabsTrigger>
          </TabsList>

          <TabsContent value="assessments">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading assessments...</p>
              </div>
            ) : assessments.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">
                    No assessments submitted yet.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-4">
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-xs uppercase text-muted-foreground">
                        New Leads
                      </p>
                      <p className="text-2xl font-bold">{newLeadCount}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-xs uppercase text-muted-foreground">
                        Hot Leads
                      </p>
                      <p className="text-2xl font-bold text-red-600">
                        {hotLeadCount}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-xs uppercase text-muted-foreground">
                        Overdue Follow-Up
                      </p>
                      <p className="text-2xl font-bold text-amber-600">
                        {overdueCount}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-xs uppercase text-muted-foreground">
                        Total Assessments
                      </p>
                      <p className="text-2xl font-bold">{assessments.length}</p>
                    </CardContent>
                  </Card>
                </div>

                {sortedAssessments.map((assessment) => {
                  const leadScore = calculateLeadScore(assessment);
                  const priority = getLeadPriority(leadScore);
                  const followUpLabel = getFollowUpLabel(assessment);

                  return (
                    <Card key={assessment.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">
                              {assessment.loved_one_name}
                              {assessment.loved_one_age &&
                                ` (Age ${assessment.loved_one_age})`}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                              Submitted by {assessment.contact_name} •{" "}
                              {assessment.contact_relationship ||
                                "Relationship not specified"}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {format(
                                new Date(assessment.created_at),
                                "MMM d, yyyy 'at' h:mm a",
                              )}
                            </p>
                          </div>
                          <div className="flex flex-wrap items-center justify-end gap-2">
                            <Badge className={priority.className}>
                              {priority.label} · {leadScore}
                            </Badge>
                            <Badge variant="outline">
                              {getSourceLabel(assessment.source_attribution)}
                            </Badge>
                            <Badge
                              variant={
                                followUpLabel === "Overdue"
                                  ? "destructive"
                                  : "outline"
                              }
                            >
                              {followUpLabel}
                            </Badge>
                            {getStatusBadge(assessment.status)}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-muted-foreground uppercase">
                              Contact
                            </p>
                            <p className="text-sm">
                              {assessment.contact_email}
                            </p>
                            {assessment.contact_phone && (
                              <p className="text-sm">
                                {assessment.contact_phone}
                              </p>
                            )}
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground uppercase">
                              Best Time
                            </p>
                            <p className="text-sm capitalize">
                              {assessment.best_day_to_contact ||
                                "Not specified"}{" "}
                              • {assessment.best_time_to_contact || "Any time"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground uppercase">
                              Severity
                            </p>
                            <p className="text-sm">
                              {assessment.severity_level || "Not assessed"} (
                              {assessment.dsm_yes_count || 0}/13 criteria)
                            </p>
                          </div>
                        </div>

                        {assessment.primary_substances && (
                          <div className="mb-4">
                            <p className="text-xs text-muted-foreground uppercase">
                              Primary Substances
                            </p>
                            <p className="text-sm">
                              {assessment.primary_substances}
                            </p>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 rounded-lg border border-border bg-muted/30 p-4">
                          <div>
                            <p className="text-xs text-muted-foreground uppercase">
                              Urgency
                            </p>
                            <p className="text-sm">
                              {assessment.urgency_level || "Not specified"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground uppercase">
                              Safety Concerns
                            </p>
                            <p className="text-sm">
                              {assessment.immediate_safety_concerns ||
                                "Not specified"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground uppercase">
                              Family Ready
                            </p>
                            <p className="text-sm">
                              {assessment.family_ready_intervention ||
                                "Not specified"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground uppercase">
                              Suggested Next Step
                            </p>
                            <p className="text-sm font-medium">
                              {leadScore >= 75
                                ? "Call first"
                                : leadScore >= 50
                                  ? "Same-day review"
                                  : "Review in queue"}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setExpandedId(
                                expandedId === assessment.id
                                  ? null
                                  : assessment.id,
                              )
                            }
                          >
                            {expandedId === assessment.id ? (
                              <>
                                <ChevronUp className="w-4 h-4 mr-1" /> Hide
                                Details
                              </>
                            ) : (
                              <>
                                <Eye className="w-4 h-4 mr-1" /> View Full
                                Assessment
                              </>
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={async () => {
                              toast({
                                title: "Generating PDF...",
                                description:
                                  "Please wait while insurance card images are being fetched.",
                              });
                              await generateAssessmentPdf(
                                assessment as Parameters<
                                  typeof generateAssessmentPdf
                                >[0],
                              );
                            }}
                          >
                            <Download className="w-4 h-4 mr-1" /> Download PDF
                          </Button>
                          {assessment.status === "new" && (
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() =>
                                updateStatus(assessment.id, "in_progress")
                              }
                            >
                              Mark In Progress
                            </Button>
                          )}
                          {assessment.status !== "reviewed" && (
                            <Button
                              size="sm"
                              onClick={() =>
                                updateStatus(assessment.id, "reviewed")
                              }
                            >
                              Mark Reviewed
                            </Button>
                          )}
                        </div>

                        {expandedId === assessment.id && (
                          <AssessmentExpandedView assessment={assessment} />
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="availability">
            <AvailabilityManager />
          </TabsContent>

          <TabsContent value="testimonials">
            <TestimonialManager />
          </TabsContent>

          <TabsContent value="case-documents">
            <CaseDocumentsManager />
          </TabsContent>

          <TabsContent value="family-portal">
            <FamilyPortalManager />
          </TabsContent>

          <TabsContent value="contracts">
            <ContractsManager />
          </TabsContent>

          <TabsContent value="outreach">
            <EmailOutreachSection />
          </TabsContent>

          <TabsContent value="followups">
            <FreedomFollowupsManager />
          </TabsContent>

          <TabsContent value="revenue-pipeline">
            <RevenuePipelineManager />
          </TabsContent>

          <TabsContent value="revenue-actions">
            <WeeklyRevenueActionsManager />
          </TabsContent>

          <TabsContent value="cross-site-revenue">
            <CrossSiteRevenueDashboard />
          </TabsContent>

          <TabsContent value="attribution">
            <RevenueAttributionManager />
          </TabsContent>

          <TabsContent value="answer-aeo">
            <AnswerPagePerformance />
          </TabsContent>

          <TabsContent value="abandoned-carts">
            <AbandonedCartsManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
