import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, AlertTriangle, Info } from "lucide-react";

type ResponseValue = "never" | "occasionally" | "often" | "almost_always" | "";

interface Question {
  id: string;
  text: string;
}

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

const responseLabels: Record<ResponseValue, string> = {
  never: "Never",
  occasionally: "Occasionally",
  often: "Often",
  almost_always: "Almost Always",
  "": "",
};

const SelfAssessment = () => {
  const [responses, setResponses] = useState<Record<string, ResponseValue>>({});
  const [showResults, setShowResults] = useState(false);

  const handleResponse = (questionId: string, value: ResponseValue) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };

  const calculateResults = () => {
    const scores = { never: 0, occasionally: 1, often: 2, almost_always: 3 };
    let total = 0;
    let answered = 0;

    Object.values(responses).forEach((response) => {
      if (response && response in scores) {
        total += scores[response as keyof typeof scores];
        answered++;
      }
    });

    return { total, answered, percentage: answered > 0 ? (total / (answered * 3)) * 100 : 0 };
  };

  const getResultCategory = (percentage: number) => {
    if (percentage < 33) return "early";
    if (percentage < 66) return "turning_point";
    return "urgent";
  };

  const allQuestionsAnswered = sections.every((section) =>
    section.questions.every((q) => responses[q.id] && responses[q.id] !== "")
  );

  const handleSubmit = () => {
    if (allQuestionsAnswered) {
      setShowResults(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const { percentage } = calculateResults();
  const resultCategory = getResultCategory(percentage);

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
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
              "Is It Time for an Intervention?"
            </h1>
            <p className="text-xl text-primary font-medium mb-4">
              A Guided Self-Assessment for Families
            </p>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Families rarely wake up one morning and decide they need an intervention. Most arrive here after months—or years—of confusion, hope, fear, and repeated attempts to help that did not lead to lasting change.
            </p>
          </div>
        </section>

        {showResults ? (
          /* Results Section */
          <section className="py-12">
            <div className="container mx-auto px-4 max-w-4xl">
              <Card className="mb-8 border-2 border-primary/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl md:text-3xl font-serif">Your Assessment Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {resultCategory === "early" && (
                    <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-6">
                      <div className="flex items-start gap-4">
                        <CheckCircle2 className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">
                            Mostly Never or Occasionally
                          </h3>
                          <p className="text-green-700 dark:text-green-300">
                            Your family may still be in an early phase. Education, boundaries, and outside guidance can help prevent escalation.
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
                            A Mix of Occasionally and Often
                          </h3>
                          <p className="text-amber-700 dark:text-amber-300">
                            This often indicates a turning point. Families in this range usually feel stuck—aware that something is wrong, but unsure how to act without making things worse.
                          </p>
                          <p className="text-amber-700 dark:text-amber-300 mt-2">
                            Professional guidance can help you evaluate next steps before risk increases.
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
                            Many Often or Almost Always Responses
                          </h3>
                          <p className="text-red-700 dark:text-red-300">
                            This strongly suggests the situation has outgrown informal solutions. Continued delay often benefits the addiction—not the family or the person struggling.
                          </p>
                          <p className="text-red-700 dark:text-red-300 mt-2">
                            At this stage, intervention planning is not about confrontation. It is about safety, structure, and clarity.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-6">
                      <h4 className="font-semibold text-lg mb-3">A Critical Reminder for Families</h4>
                      <p className="text-muted-foreground italic">
                        If you are asking, "Is it bad enough yet?"
                        <br />
                        <strong className="text-foreground">That question alone is often your answer.</strong>
                      </p>
                      <p className="text-muted-foreground mt-3">
                        Intervention is not reserved for rock bottom. It is most effective before irreversible consequences occur.
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

                  <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 text-center">
                    <h4 className="font-serif text-xl font-semibold mb-3">Next Step: Confidential Guidance</h4>
                    <p className="text-muted-foreground mb-4">
                      A confidential consultation can help you clarify whether intervention is appropriate and what level of support is needed.
                    </p>
                    <p className="text-sm text-muted-foreground mb-6 italic">
                      You do not need to have all the answers.<br />
                      You just need a clearer plan than the one you have now.
                    </p>
                    <Button asChild size="lg" className="group">
                      <Link to="/contact">
                        Schedule a Consultation
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>

                  <div className="text-center pt-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowResults(false);
                        setResponses({});
                      }}
                    >
                      Retake Assessment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        ) : (
          /* Quiz Section */
          <section className="py-12">
            <div className="container mx-auto px-4 max-w-4xl">
              {/* Instructions */}
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4">
                    This assessment is not a diagnosis. It is a pattern-recognition tool designed to help you clarify what you are already living with.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Answer each question as honestly as you can, based on what has been true over the past 6–12 months.
                  </p>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="font-medium mb-2">For each statement, select the option that best fits your situation:</p>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span className="bg-background px-3 py-1 rounded-full">Never</span>
                      <span className="bg-background px-3 py-1 rounded-full">Occasionally</span>
                      <span className="bg-background px-3 py-1 rounded-full">Often</span>
                      <span className="bg-background px-3 py-1 rounded-full">Almost Always</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3 italic">
                      There are no "right" or "wrong" answers. This is about clarity, not blame.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Questions */}
              <div className="space-y-8">
                {sections.map((section, sectionIndex) => (
                  <Card key={sectionIndex}>
                    <CardHeader>
                      <CardTitle className="text-xl font-serif">
                        Section {sectionIndex + 1}: {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {section.questions.map((question, questionIndex) => (
                        <div key={question.id} className="space-y-3">
                          <p className="font-medium">
                            {sectionIndex * 5 + questionIndex + 1}. {question.text}
                          </p>
                          <RadioGroup
                            value={responses[question.id] || ""}
                            onValueChange={(value) => handleResponse(question.id, value as ResponseValue)}
                            className="flex flex-wrap gap-4"
                          >
                            {(["never", "occasionally", "often", "almost_always"] as ResponseValue[]).map((value) => (
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
                ))}
              </div>

              {/* Submit Button */}
              <div className="mt-8 text-center">
                <Button
                  size="lg"
                  onClick={handleSubmit}
                  disabled={!allQuestionsAnswered}
                  className="group"
                >
                  View My Results
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                {!allQuestionsAnswered && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Please answer all questions to see your results.
                  </p>
                )}
              </div>

              {/* Bottom Context */}
              <Card className="mt-12 bg-muted/30">
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
