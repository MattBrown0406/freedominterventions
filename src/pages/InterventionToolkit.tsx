import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema } from "@/components/StructuredData";
import { 
  Target, 
  AlertTriangle, 
  Heart, 
  Shield, 
  Scale, 
  XCircle, 
  Users, 
  ArrowRight,
  CheckCircle,
  Clock,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const InterventionToolkit = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Family Intervention Planning Guide: Step-by-Step | Freedom Interventions"
        description="A complete family intervention planning guide. Learn the process, avoid common mistakes, and know when to bring in a professional. Free consultation: (541) 668-8084."
        canonical="https://freedominterventions.com/intervention-toolkit"
        keywords="family intervention planning, intervention guide, how to plan an intervention, intervention steps, family intervention checklist, intervention mistakes, when to hire interventionist"
      />
      <OrganizationSchema />
      <Navbar />
      
      <main>

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <FileText className="w-4 h-4" />
                Family Planning Resource
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                The Family Intervention Planning Guide
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                A Step-by-Step Family Intervention Planning Resource for Families Preparing for Change
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <p className="text-lg text-muted-foreground leading-relaxed">
                When families reach the point of considering an intervention, they are usually exhausted, 
                afraid, and unsure what the "right" next step is. This toolkit exists to provide clarity 
                and structure, not pressure.
              </p>
              
              <div className="bg-card border border-border rounded-xl p-6 my-8">
                <h3 className="text-xl font-serif font-semibold text-foreground mb-4">
                  This toolkit is designed to help families:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Understand what intervention planning actually involves</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Recognize common mistakes that delay or derail change</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Prepare emotionally and practically for next steps</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Know when professional guidance is necessary</span>
                  </li>
                </ul>
              </div>

              <p className="text-muted-foreground italic border-l-4 border-primary pl-4">
                This toolkit does not replace professional intervention. It helps families stop reacting and start planning.
              </p>
            </div>
          </div>
        </section>

        {/* Family Intervention Internal Link */}
        <section className="py-8 bg-primary/5 border-y border-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-foreground">Ready to plan a family intervention?</p>
                <p className="text-sm text-muted-foreground">Learn how our family intervention services work — and what to expect when you hire a professional.</p>
              </div>
              <Link to="/family-intervention" className="shrink-0">
                <Button variant="outline" className="gap-2 whitespace-nowrap">
                  <Users className="h-4 w-4" />
                  Family Intervention Services
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Section 1 */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                  Section 1: What a Family Intervention Is—and What It Is Not
                </h2>
              </div>
              
              <p className="text-muted-foreground mb-8">
                An intervention is often misunderstood as a dramatic confrontation meant to "shock" someone 
                into treatment. In reality, effective interventions are structured, calm, and coordinated.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    An intervention IS:
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>• A planned conversation grounded in concern, not accusation</li>
                    <li>• A shift in family behavior, not an attempt to control the addicted person</li>
                    <li>• A moment where boundaries and consequences become clear and aligned</li>
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-destructive" />
                    An intervention is NOT:
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>• A spontaneous argument</li>
                    <li>• A threat or ultimatum driven by anger</li>
                    <li>• A last-ditch emotional appeal</li>
                  </ul>
                </div>
              </div>

              <p className="text-foreground font-medium mt-8 text-center bg-primary/5 p-4 rounded-lg">
                Families succeed when the intervention is treated as a process, not a single event.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                  Section 2: Clarifying the Family's Goal
                </h2>
              </div>

              <p className="text-muted-foreground mb-6">
                Before planning anything, families must answer a foundational question:
              </p>

              <p className="text-xl font-serif text-foreground text-center bg-muted/50 p-6 rounded-xl mb-8">
                "What are we actually trying to change?"
              </p>

              <p className="text-muted-foreground mb-4">
                Many families say, "We want them to stop using."
                <br />More effective goals sound like:
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 bg-card border border-border rounded-lg p-4">
                  <ArrowRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">"We want to stop enabling behavior that protects the addiction."</span>
                </li>
                <li className="flex items-start gap-3 bg-card border border-border rounded-lg p-4">
                  <ArrowRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">"We want to create conditions where treatment becomes the logical next step."</span>
                </li>
                <li className="flex items-start gap-3 bg-card border border-border rounded-lg p-4">
                  <ArrowRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">"We want to regain stability, safety, and honesty in our family."</span>
                </li>
              </ul>

              <p className="text-foreground font-medium bg-primary/5 p-4 rounded-lg">
                When families align around their behavior—not just the loved one's—interventions become more effective and less chaotic.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                  Section 3: Identifying Patterns, Not Incidents
                </h2>
              </div>

              <p className="text-muted-foreground mb-6">
                Addiction is not defined by one bad moment. It is defined by patterns over time.
              </p>

              <div className="bg-card border border-border rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Families are encouraged to write down:
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Repeated behaviors that have caused harm</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Promises that were made and broken</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Boundaries that were set and later abandoned</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Crises that keep repeating with different details</span>
                  </li>
                </ul>
              </div>

              <p className="text-muted-foreground mb-4">
                This exercise helps families move away from arguing facts and toward recognizing trends.
              </p>

              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
                <h4 className="font-semibold text-foreground mb-2">Key reminder:</h4>
                <p className="text-muted-foreground">
                  If the same conversations keep happening with no lasting change, the problem is not communication—it is structure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                  Section 4: Understanding Enabling vs. Support
                </h2>
              </div>

              <p className="text-muted-foreground mb-8">
                Many families unintentionally protect addiction while trying to help.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 text-destructive">
                    Examples of enabling:
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>• Covering for missed work or legal issues</li>
                    <li>• Providing money, housing, or access without accountability</li>
                    <li>• Lowering expectations to "keep the peace"</li>
                    <li>• Avoiding hard conversations out of fear</li>
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 text-green-600">
                    Support focuses on:
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>• Clear expectations</li>
                    <li>• Consistent boundaries</li>
                    <li>• Allowing natural consequences</li>
                    <li>• Encouraging treatment and recovery resources</li>
                  </ul>
                </div>
              </div>

              <p className="text-foreground font-medium bg-primary/5 p-4 rounded-lg">
                Intervention planning requires families to change what they will and will not participate in going forward.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                  Section 5: Defining Boundaries and Consequences
                </h2>
              </div>

              <p className="text-muted-foreground mb-6">
                Boundaries are not punishments. They are statements of what the family will do to protect itself.
              </p>

              <div className="bg-card border border-border rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Effective boundaries:</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Are specific and realistic</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Focus on the family's behavior, not the loved one's compliance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Are enforceable without rage or collapse</span>
                  </li>
                </ul>
              </div>

              <p className="text-muted-foreground mb-6">
                Consequences are not threats. They are the natural outcomes of continued behavior.
              </p>

              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                <h4 className="font-semibold text-foreground mb-2">A key planning question:</h4>
                <p className="text-xl font-serif text-foreground italic">
                  "If nothing changes, what can we no longer continue to do?"
                </p>
                <p className="text-muted-foreground mt-4 text-sm">
                  This is one of the most emotionally difficult steps for families—and one of the most important.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Scale className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                  Section 6: Assessing Risk and Readiness
                </h2>
              </div>

              <p className="text-muted-foreground mb-6">
                Not all situations require the same level of response. Families should consider:
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  "Substance type and overdose risk",
                  "Mental health concerns or suicidality",
                  "History of violence or unpredictability",
                  "Prior treatment attempts",
                  "Current safety of children or vulnerable adults"
                ].map((item, index) => (
                  <div key={index} className="bg-card border border-border rounded-lg p-4 flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-foreground font-medium mb-4">
                High-risk situations require professional coordination, not improvisation.
              </p>

              <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6">
                <p className="text-foreground font-medium">
                  If fentanyl, polysubstance use, or escalating instability is present, waiting for certainty can be dangerous.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7 */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                  Section 7: Common Family Intervention Planning Mistakes Families Make
                </h2>
              </div>

              <p className="text-muted-foreground mb-6">
                This toolkit intentionally names common pitfalls:
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Waiting for the \"right moment\"",
                  "Trying to get everyone to agree emotionally",
                  "Giving repeated warnings without follow-through",
                  "Allowing fear of anger, rejection, or estrangement to stall action",
                  "Attempting to negotiate treatment during active use"
                ].map((mistake, index) => (
                  <div key={index} className="bg-card border border-border rounded-lg p-4 flex items-center gap-3">
                    <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <span className="text-foreground">{mistake}</span>
                  </div>
                ))}
              </div>

              <p className="text-foreground font-medium bg-primary/5 p-4 rounded-lg">
                Awareness of these traps helps families avoid repeating the same cycle under a new name.
              </p>
            </div>
          </div>
        </section>

        {/* Section 8 */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                  Section 8: When Professional Family Intervention Is Warranted
                </h2>
              </div>

              <p className="text-muted-foreground mb-6">
                Families benefit from professional intervention when:
              </p>

              <div className="bg-card border border-border rounded-xl p-6 mb-8">
                <ul className="space-y-3">
                  {[
                    "Previous attempts to help have failed",
                    "Boundaries have not been held consistently",
                    "The loved one manipulates or divides family members",
                    "Safety or overdose risk is increasing",
                    "Emotions override planning"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-muted/50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  A professional interventionist provides:
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Structure and coordination",
                    "Emotional containment",
                    "Objective assessment",
                    "Treatment placement guidance",
                    "Protection for the family system—not just the individual"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-foreground font-medium text-center bg-primary/5 p-4 rounded-lg">
                This is not about families "failing."<br />
                It is about recognizing when the problem has outgrown informal solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Section 9 */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                  Section 9: Preparing for the Next Step
                </h2>
              </div>

              <p className="text-muted-foreground mb-6">
                Families who complete this toolkit often arrive at one of two conclusions:
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-primary">1</span>
                  </div>
                  <p className="text-foreground font-medium">
                    They need immediate professional guidance
                  </p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-primary">2</span>
                  </div>
                  <p className="text-foreground font-medium">
                    They need help clarifying how to move forward safely
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground mb-4">Either outcome is valid.</p>

              <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6">
                <p className="text-foreground font-medium text-center">
                  What matters is this: doing nothing is still a decision, and it usually favors the addiction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final Reminder */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-8">
                Final Reminder for Families
              </h2>
              
              <div className="space-y-4 mb-10">
                <p className="text-lg text-foreground">
                  You are <span className="font-semibold">not responsible</span> for causing your loved one's addiction.
                </p>
                <p className="text-lg text-foreground">
                  You are <span className="font-semibold">not required</span> to sacrifice your safety or integrity to prove love.
                </p>
                <p className="text-lg text-foreground">
                  You are <span className="font-semibold">allowed</span> to ask for help before things get worse.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/contact">
                    Schedule a Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="tel:+1-541-903-0724">
                    Call Now: (541) 903-0724
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default InterventionToolkit;
