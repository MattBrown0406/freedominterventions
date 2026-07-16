import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Info,
  Loader2,
  Lock,
  Phone,
  ShieldCheck,
} from "lucide-react";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import { trackEvent } from "@/lib/analytics";
import { getFunnelAttribution } from "@/lib/funnelAttribution";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type ResponseValue = "never" | "occasionally" | "often" | "almost_always" | "";

const sections = [
  {
    title: "Substance Use & Behavior Patterns",
    questions: [
      { id: "q1", text: "My loved one uses substances more frequently or in larger amounts than they intend." },
      { id: "q2", text: "Promises to cut back or stop have been made—and broken—multiple times." },
      { id: "q3", text: "Substance use continues despite clear negative consequences (health, legal, work, relationships)." },
      { id: "q4", text: "Their behavior becomes unpredictable when using or withdrawing." },
      { id: "q5", text: "Conversations about substance use quickly turn defensive, dismissive, or hostile." },
    ],
  },
  {
    title: "Impact on the Family",
    questions: [
      { id: "q6", text: "Our family life feels centered around managing, monitoring, or reacting to their behavior." },
      { id: "q7", text: "We argue among ourselves about how serious the problem really is." },
      { id: "q8", text: "We avoid certain topics or situations to 'keep the peace.'" },
      { id: "q9", text: "Trust has been damaged, but we keep hoping things will improve without outside help." },
      { id: "q10", text: "Stress related to their substance use is affecting our sleep, health, or emotional well-being." },
    ],
  },
  {
    title: "Boundaries & Enabling",
    questions: [
      { id: "q11", text: "We have set boundaries before but struggled to hold them consistently." },
      { id: "q12", text: "We have protected them from consequences (financial, legal, relational) to prevent worse outcomes." },
      { id: "q13", text: "We often change our plans, expectations, or standards to accommodate their behavior." },
      { id: "q14", text: "Saying 'no' feels more frightening than continuing the current situation." },
      { id: "q15", text: "The line between helping and enabling feels increasingly unclear." },
    ],
  },
  {
    title: "Risk & Escalation",
    questions: [
      { id: "q16", text: "Substance use has escalated in frequency, intensity, or risk over time." },
      { id: "q17", text: "There have been medical scares, overdoses, or near-misses." },
      { id: "q18", text: "There is mixing of substances (alcohol with pills, fentanyl exposure, multiple drugs)." },
      { id: "q19", text: "Mental health symptoms (depression, anxiety, paranoia, suicidal thinking) have increased." },
      { id: "q20", text: "We worry about what will happen if nothing changes—but feel stuck about what to do next." },
    ],
  },
];

const SAFETY_QUESTION_IDS = ["q17", "q19"];
const SAFETY_ANSWERS: ResponseValue[] = ["often", "almost_always"];

const responseLabels: Record<Exclude<ResponseValue, "">, string> = {
  never: "Never",
  occasionally: "Occasionally",
  often: "Often",
  almost_always: "Almost Always",
};

const responseOptions = Object.keys(responseLabels) as Exclude<ResponseValue, "">[];

type Step = "quiz" | "safety" | "contact" | "results";

const SelfAssessment = () => {
  const [responses, setResponses] = useState<Record<string, ResponseValue>>({});
  const [currentSection, setCurrentSection] = useState(0);
  const [step, setStep] = useState<Step>("quiz");
  const [safetyShown, setSafetyShown] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactRelationship, setContactRelationship] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const section = sections[currentSection];

  const { score, percentage } = useMemo(() => {
    const scores = { never: 0, occasionally: 1, often: 2, almost_always: 3 } as const;
    let total = 0;
    let answered = 0;
    Object.values(responses).forEach((response) => {
      if (response && response in scores) {
        total += scores[response as keyof typeof scores];
        answered++;
      }
    });
    return {
      score: total,
      percentage: answered > 0 ? (total / (answered * 3)) * 100 : 0,
    };
  }, [responses]);

  const resultCategory = percentage < 33 ? "early" : percentage < 66 ? "turning_point" : "urgent";

  const safetyFlag = SAFETY_QUESTION_IDS.some((id) =>
    SAFETY_ANSWERS.includes(responses[id] || ""),
  );

  const sectionComplete = section.questions.every(
    (q) => responses[q.id] && responses[q.id] !== "",
  );

  const handleResponse = (questionId: string, value: ResponseValue) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));

    // Safety short-circuit: overdose/near-miss or rising suicidal thinking
    // gets an immediate "call now" screen — before finishing the quiz.
    if (
      !safetyShown &&
      SAFETY_QUESTION_IDS.includes(questionId) &&
      SAFETY_ANSWERS.includes(value)
    ) {
      setSafetyShown(true);
      setStep("safety");
      trackEvent("self_assessment_safety_interstitial", {
        question_id: questionId,
        response: value,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToSection = (index: number) => {
    setCurrentSection(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSectionNext = () => {
    if (!sectionComplete) return;
    trackEvent("self_assessment_section_complete", {
      section: currentSection + 1,
      section_title: section.title,
    });
    if (currentSection < sections.length - 1) {
      goToSection(currentSection + 1);
    } else {
      setStep("contact");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const submitLead = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contactName.trim() || !emailRegex.test(contactEmail.trim())) {
      toast({
        title: "One more detail needed",
        description: "Please enter your name and a valid email so we can send your results.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("submit-self-assessment", {
        body: {
          contact_name: contactName.trim(),
          contact_email: contactEmail.trim(),
          contact_phone: contactPhone.trim() || null,
          contact_relationship: contactRelationship.trim() || null,
          responses,
          score,
          percentage,
          result_category: resultCategory,
          safety_flag: safetyFlag,
          source_attribution: getFunnelAttribution() || {},
        },
      });
      if (error) throw error;
      trackEvent("self_assessment_lead_captured", {
        result_category: resultCategory,
        safety_flag: safetyFlag,
      });
    } catch (err) {
      // Never block a family in crisis on a backend error — show results anyway.
      console.error("Self-assessment submission failed:", err);
      toast({
        title: "We saved your results locally",
        description: "There was a connection issue, but your results are below. Please call if you need help now.",
      });
    } finally {
      setSubmitting(false);
      setStep("results");
      trackEvent("self_assessment_results_viewed", {
        result_category: resultCategory,
        safety_flag: safetyFlag,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const restart = () => {
    setResponses({});
    setCurrentSection(0);
    setSafetyShown(false);
    setStep("quiz");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalQuestions = sections.reduce((acc, s) => acc + s.questions.length, 0);
  const answeredCount = Object.values(responses).filter(Boolean).length;
  const quizProgress = step === "quiz" ? (answeredCount / totalQuestions) * 100 : 100;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Is It Time for an Intervention? Self-Assessment"
        description="A guided self-assessment for families to determine if professional intervention may be needed. Answer honestly to gain clarity on your situation."
        canonical="https://freedominterventions.com/self-assessment"
        keywords="intervention assessment, addiction self-assessment, family intervention quiz, need intervention help"
      />
      <OrganizationSchema />

      <Navbar />

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-12">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
              "Is It Time for an Intervention?"
            </h1>
            <p className="text-xl text-primary font-medium mb-3">
              A Guided Self-Assessment for Families
            </p>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              20 questions, about 3 minutes. Families rarely wake up one morning and decide they
              need an intervention. Most arrive here after months—or years—of confusion, hope,
              fear, and repeated attempts to help that did not lead to lasting change.
            </p>
          </div>
        </section>

        {/* SAFETY INTERSTITIAL */}
        {step === "safety" && (
          <section className="py-12">
            <div className="container mx-auto px-4 max-w-3xl">
              <Card className="border-2 border-red-300 dark:border-red-800">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
                    <AlertTriangle className="h-7 w-7 text-red-600" />
                  </div>
                  <CardTitle className="text-2xl font-serif">
                    Before You Go Further
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5 text-center">
                  <p className="text-muted-foreground">
                    Based on what you just shared—medical scares, overdoses, or rising mental
                    health symptoms—this may be a situation where waiting is the biggest risk.
                    You do not need to finish this assessment before asking for help.
                  </p>
                  <div className="rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 p-5 space-y-3">
                    <p className="font-medium text-foreground">
                      Talk to Matt directly. This call is confidential and free.
                    </p>
                    <TrackedPhoneLink
                      phoneNumber="+14582988000"
                      metadata={{ location: "self_assessment_safety" }}
                    >
                      <Button size="lg" className="w-full sm:w-auto">
                        <Phone className="mr-2 h-5 w-5" />
                        Call (541) 668-8084 Now
                      </Button>
                    </TrackedPhoneLink>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    If someone is in immediate danger, call 911. If suicide is a concern, call or
                    text <strong>988</strong> (Suicide &amp; Crisis Lifeline) right now.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setStep("quiz");
                      trackEvent("self_assessment_safety_continue", {});
                    }}
                  >
                    Continue the assessment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* QUIZ — one section per screen */}
        {step === "quiz" && (
          <section className="py-10">
            <div className="container mx-auto px-4 max-w-3xl">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Section {currentSection + 1} of {sections.length}: {section.title}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {Math.min(Math.round(quizProgress), 100)}%
                  </span>
                </div>
                <Progress value={Math.min(quizProgress, 100)} className="h-2" />
              </div>

              {currentSection === 0 && (
                <Card className="mb-6 bg-muted/30">
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">
                      This is not a diagnosis—it is a pattern-recognition tool. Answer based on
                      the past 6–12 months. There are no right or wrong answers.
                    </p>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-serif">{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {section.questions.map((question, questionIndex) => (
                    <div key={question.id} className="space-y-3">
                      <p className="font-medium">
                        {currentSection * 5 + questionIndex + 1}. {question.text}
                      </p>
                      <RadioGroup
                        value={responses[question.id] || ""}
                        onValueChange={(value) =>
                          handleResponse(question.id, value as ResponseValue)
                        }
                        className="flex flex-wrap gap-4"
                      >
                        {responseOptions.map((value) => (
                          <div key={value} className="flex items-center space-x-2">
                            <RadioGroupItem value={value} id={`${question.id}-${value}`} />
                            <Label
                              htmlFor={`${question.id}-${value}`}
                              className="text-sm cursor-pointer"
                            >
                              {responseLabels[value]}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="mt-6 flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={() => goToSection(currentSection - 1)}
                  disabled={currentSection === 0}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button size="lg" onClick={handleSectionNext} disabled={!sectionComplete} className="group">
                  {currentSection < sections.length - 1 ? "Next Section" : "See My Results"}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              {!sectionComplete && (
                <p className="text-sm text-muted-foreground mt-2 text-right">
                  Please answer all {section.questions.length} questions to continue.
                </p>
              )}
            </div>
          </section>
        )}

        {/* CONTACT CAPTURE — before results */}
        {step === "contact" && (
          <section className="py-12">
            <div className="container mx-auto px-4 max-w-2xl">
              <Card className="border-2 border-primary/20">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle2 className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-serif">
                    Your Results Are Ready
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <p className="text-muted-foreground text-center">
                    Tell us where to send your results and a personalized next-step plan from
                    Matt. You will see your results on the next screen either way.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="sa-name">Your First and Last Name *</Label>
                      <Input
                        id="sa-name"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        autoComplete="name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="sa-email">Email Address *</Label>
                      <Input
                        id="sa-email"
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        autoComplete="email"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="sa-phone">Phone Number (optional — for a faster callback)</Label>
                      <Input
                        id="sa-phone"
                        type="tel"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        autoComplete="tel"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sa-relationship">Your Relationship to Your Loved One (optional)</Label>
                      <Input
                        id="sa-relationship"
                        placeholder="Parent, spouse, sibling, friend..."
                        value={contactRelationship}
                        onChange={(e) => setContactRelationship(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button
                    size="lg"
                    className="w-full group"
                    onClick={submitLead}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Preparing your results...
                      </>
                    ) : (
                      <>
                        Show My Results
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                  <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Lock className="h-3.5 w-3.5" />
                    Confidential. Never shared. No spam — just your results and a clear next step.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* RESULTS — routed to the right next step */}
        {step === "results" && (
          <section className="py-12">
            <div className="container mx-auto px-4 max-w-4xl">
              <Card className="mb-8 border-2 border-primary/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl md:text-3xl font-serif">Your Assessment Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Safety-first block always leads when flagged */}
                  {safetyFlag && (
                    <div className="bg-red-50 dark:bg-red-950/30 border-2 border-red-300 dark:border-red-800 rounded-xl p-6">
                      <div className="flex items-start gap-4">
                        <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">
                            Safety Comes First
                          </h3>
                          <p className="text-red-700 dark:text-red-300 mb-4">
                            Your answers indicate medical scares, overdoses, or rising mental
                            health symptoms. Whatever else is true, this deserves a direct
                            conversation today—not a form or an email.
                          </p>
                          <TrackedPhoneLink
                            phoneNumber="+14582988000"
                            metadata={{ location: "self_assessment_results_safety" }}
                          >
                            <Button size="lg">
                              <Phone className="mr-2 h-5 w-5" />
                              Call Matt Now — (541) 668-8084
                            </Button>
                          </TrackedPhoneLink>
                          <p className="text-sm text-red-700 dark:text-red-300 mt-3">
                            Immediate danger: call 911. Suicide concern: call or text 988.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {resultCategory === "early" && (
                    <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-6">
                      <div className="flex items-start gap-4">
                        <CheckCircle2 className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">
                            An Early Phase — And a Real Opportunity
                          </h3>
                          <p className="text-green-700 dark:text-green-300">
                            Your family may still be in an early phase. Education, boundaries, and
                            outside guidance now can prevent the escalation most families only
                            recognize in hindsight.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {resultCategory === "turning_point" && (
                    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
                      <div className="flex items-start gap-4">
                        <Info className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-xl font-semibold text-amber-800 dark:text-amber-200 mb-2">
                            A Turning Point
                          </h3>
                          <p className="text-amber-700 dark:text-amber-300">
                            Families in this range usually feel stuck—aware that something is
                            wrong, but unsure how to act without making things worse. This is
                            exactly the window where structured guidance changes the trajectory.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {resultCategory === "urgent" && (
                    <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl p-6">
                      <div className="flex items-start gap-4">
                        <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">
                            The Situation Has Outgrown Informal Solutions
                          </h3>
                          <p className="text-red-700 dark:text-red-300">
                            Continued delay usually benefits the addiction—not the family or the
                            person struggling. At this stage, intervention planning is not about
                            confrontation. It is about safety, structure, and clarity.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tier-routed next step */}
                  <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 text-center">
                    <h4 className="font-serif text-xl font-semibold mb-3">
                      {resultCategory === "early" && "Your Next Step: A Free Consultation"}
                      {resultCategory === "turning_point" && "Your Next Step: A Crisis Coaching Session"}
                      {resultCategory === "urgent" && "Your Next Step: Talk to Matt Today"}
                    </h4>
                    <p className="text-muted-foreground mb-6">
                      {resultCategory === "early" &&
                        "A confidential conversation to review what you are seeing and give you a clear read on whether structure and boundaries are enough for now."}
                      {resultCategory === "turning_point" &&
                        "One structured session ($150) that turns mixed messages and uncertainty into a working plan for the next hard conversation. Not sure? Start with the free consultation."}
                      {resultCategory === "urgent" &&
                        "Call now, or start the intervention readiness path. Either way, the goal is the same: a professional plan before the next crisis makes the decision for you."}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      {resultCategory === "early" && (
                        <Button asChild size="lg" className="group">
                          <Link
                            to="/?type=consultation#booking"
                            onClick={() => trackEvent("self_assessment_cta", { tier: "early", cta: "consultation" })}
                          >
                            Book My Free Consultation
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      )}
                      {resultCategory === "turning_point" && (
                        <>
                          <Button asChild size="lg" className="group">
                            <Link
                              to="/?type=crisis-coaching#booking"
                              onClick={() => trackEvent("self_assessment_cta", { tier: "turning_point", cta: "crisis_coaching" })}
                            >
                              Book Crisis Coaching
                              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </Button>
                          <Button asChild size="lg" variant="outline">
                            <Link
                              to="/?type=consultation#booking"
                              onClick={() => trackEvent("self_assessment_cta", { tier: "turning_point", cta: "consultation" })}
                            >
                              Start With a Free Consult
                            </Link>
                          </Button>
                        </>
                      )}
                      {resultCategory === "urgent" && (
                        <>
                          <TrackedPhoneLink
                            phoneNumber="+14582988000"
                            metadata={{ location: "self_assessment_results_urgent" }}
                          >
                            <Button size="lg">
                              <Phone className="mr-2 h-5 w-5" />
                              Call (541) 668-8084
                            </Button>
                          </TrackedPhoneLink>
                          <Button asChild size="lg" variant="outline">
                            <Link
                              to="/intervention-readiness?source=self_assessment"
                              onClick={() => trackEvent("self_assessment_cta", { tier: "urgent", cta: "readiness" })}
                            >
                              <ShieldCheck className="mr-2 h-5 w-5" />
                              Intervention Readiness Path
                            </Link>
                          </Button>
                        </>
                      )}
                    </div>
                  </div>

                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold text-lg mb-3">A Critical Reminder for Families</h4>
                      <p className="text-muted-foreground italic">
                        If you are asking, "Is it bad enough yet?"
                        <br />
                        <strong className="text-foreground">That question alone is often your answer.</strong>
                      </p>
                      <p className="text-muted-foreground mt-3">
                        Intervention is not reserved for rock bottom. It is most effective before
                        irreversible consequences occur.
                      </p>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">What This Assessment Means</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-sm font-medium text-muted-foreground mb-2">This does NOT mean:</p>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• You have failed</li>
                          <li>• You caused the addiction</li>
                          <li>• You must act immediately without support</li>
                        </ul>
                      </div>
                      <div className="bg-primary/5 rounded-lg p-4">
                        <p className="text-sm font-medium text-foreground mb-2">It DOES mean:</p>
                        <p className="text-sm text-muted-foreground">
                          Continuing the same approach is unlikely to produce a different result.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center pt-4">
                    <Button variant="outline" onClick={restart}>
                      Retake Assessment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Bottom Context — quiz step only */}
        {step === "quiz" && (
          <section className="pb-12">
            <div className="container mx-auto px-4 max-w-3xl">
              <Card className="bg-muted/30">
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground italic">
                    If you are reading these questions, it likely means:
                  </p>
                  <ul className="text-muted-foreground mt-3 space-y-1">
                    <li>You've tried to help</li>
                    <li>You've waited</li>
                    <li>You've hoped things would improve on their own</li>
                  </ul>
                  <p className="font-medium text-foreground mt-4">
                    Education brings clarity. Action brings change.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SelfAssessment;
