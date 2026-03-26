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
import { LogOut, Eye, CheckCircle, Clock, AlertCircle, ChevronDown, ChevronUp, FileText, Image, Download, MessageSquare, Home, Calendar } from "lucide-react";
import { generateAssessmentPdf } from "@/utils/generateAssessmentPdf";
import { format } from "date-fns";
import BlogImageManager from "@/components/admin/BlogImageManager";
import AssessmentExpandedView from "@/components/admin/AssessmentExpandedView";
import TestimonialManager from "@/components/admin/TestimonialManager";
import AvailabilityManager from "@/components/admin/AvailabilityManager";
import CaseDocumentsManager from "@/components/admin/CaseDocumentsManager";
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
  treatment_history: Array<{ programName: string; dateAttended: string; successfulCompletion: boolean }> | null;
  current_triggers: string | null;
  willingness_to_change: string | null;
  financial_impact: string | null;
  financial_details: string | null;
  child_welfare_involvement: string | null;
  family_ready_intervention: string | null;
  intervention_barriers: string | null;
  family_signature: string | null;
  frequency: string | null;
  duration_of_use: string | null;
  age_first_used: number | null;
  use_increased: string | null;
  loved_one_gender: string | null;
}

// Helper to cast JSON fields
const parseAssessment = (data: unknown): Assessment => {
  const raw = data as Record<string, unknown>;
  return {
    ...raw,
    dsm_behaviors: raw.dsm_behaviors as Record<string, boolean> | null,
    treatment_history: raw.treatment_history as Array<{ programName: string; dateAttended: string; successfulCompletion: boolean }> | null,
  } as Assessment;
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/admin-login");
        return;
      }

      // Check admin role
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!roles) {
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

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        navigate("/admin-login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const fetchAssessments = async () => {
    setIsLoading(true);

    const { data, error } = await supabase.functions.invoke("admin-assessments", {
      body: { action: "list" },
    });

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

    const rows = (data as { assessments?: unknown[] } | null)?.assessments ?? [];
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
        return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" /> New</Badge>;
      case "in_progress":
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" /> In Progress</Badge>;
      case "reviewed":
        return <Badge variant="default"><CheckCircle className="w-3 h-3 mr-1" /> Reviewed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

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
            <h1 className="text-2xl font-bold text-foreground">Assessment Dashboard</h1>
            <p className="text-sm text-muted-foreground">Review submitted family assessments</p>
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
          <TabsList>
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
            <TabsTrigger value="blog-images" className="gap-2">
              <Image className="w-4 h-4" />
              Blog Images
            </TabsTrigger>
            <TabsTrigger value="case-documents" className="gap-2">
              <FileText className="w-4 h-4" />
              Case Docs
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
                  <p className="text-muted-foreground">No assessments submitted yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {assessments.map((assessment) => (
              <Card key={assessment.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {assessment.loved_one_name}
                        {assessment.loved_one_age && ` (Age ${assessment.loved_one_age})`}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Submitted by {assessment.contact_name} • {assessment.contact_relationship || "Relationship not specified"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(assessment.created_at), "MMM d, yyyy 'at' h:mm a")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(assessment.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Contact</p>
                      <p className="text-sm">{assessment.contact_email}</p>
                      {assessment.contact_phone && <p className="text-sm">{assessment.contact_phone}</p>}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Best Time</p>
                      <p className="text-sm capitalize">
                        {assessment.best_day_to_contact || "Not specified"} • {assessment.best_time_to_contact || "Any time"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Severity</p>
                      <p className="text-sm">
                        {assessment.severity_level || "Not assessed"} ({assessment.dsm_yes_count || 0}/13 criteria)
                      </p>
                    </div>
                  </div>

                  {assessment.primary_substances && (
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground uppercase">Primary Substances</p>
                      <p className="text-sm">{assessment.primary_substances}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setExpandedId(expandedId === assessment.id ? null : assessment.id)}
                    >
                      {expandedId === assessment.id ? (
                        <>
                          <ChevronUp className="w-4 h-4 mr-1" /> Hide Details
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4 mr-1" /> View Full Assessment
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={async () => {
                        toast({ title: "Generating PDF...", description: "Please wait while insurance card images are being fetched." });
                        await generateAssessmentPdf(assessment as any);
                      }}
                    >
                      <Download className="w-4 h-4 mr-1" /> Download PDF
                    </Button>
                    {assessment.status === "new" && (
                      <Button size="sm" variant="secondary" onClick={() => updateStatus(assessment.id, "in_progress")}>
                        Mark In Progress
                      </Button>
                    )}
                    {assessment.status !== "reviewed" && (
                      <Button size="sm" onClick={() => updateStatus(assessment.id, "reviewed")}>
                        Mark Reviewed
                      </Button>
                    )}
                  </div>

                  {expandedId === assessment.id && (
                    <AssessmentExpandedView assessment={assessment} />
                  )}
                </CardContent>
              </Card>
            ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="availability">
              <AvailabilityManager />
            </TabsContent>

            <TabsContent value="blog-images">
              <BlogImageManager />
            </TabsContent>

            <TabsContent value="testimonials">
              <TestimonialManager />
            </TabsContent>

            <TabsContent value="case-documents">
              <CaseDocumentsManager />
            </TabsContent>
          </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
