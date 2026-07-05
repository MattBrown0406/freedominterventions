import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Wine, Pill, Zap, Brain, Leaf, FlaskConical } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema } from "@/components/StructuredData";

const SubstanceGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Substance Types and Their Effects | Family Guide"
        description="A practical guide for families to understand substance types, recognize addiction patterns, and know when professional intervention is needed."
        canonical="https://freedominterventions.com/substance-guide"
        keywords="alcohol addiction, opioid addiction, fentanyl, methamphetamine, benzodiazepines, cannabis addiction, substance types"
      />
      <OrganizationSchema />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              Family Resource Guide
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
              Substance Types and Their Effects
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              A Clear, Practical Guide for Families Trying to Understand What They're Seeing
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/?type=consultation#booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Free Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:541-668-8084">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (541) 668-8084
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <p className="text-lg text-muted-foreground leading-relaxed">
              When a loved one is struggling with addiction, families often sense that something is wrong long before they understand what is happening. Behavior changes, broken trust, secrecy, emotional volatility, and repeated crises tend to show up first. The substance itself often remains confusing, minimized, or misunderstood.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mt-4">
              This guide is not designed to overwhelm you with medical language or turn you into a clinician. Its purpose is to help you recognize patterns, understand why behavior changes the way it does, and know when education alone is no longer enough.
            </p>
            <p className="text-lg font-medium text-foreground mt-6 border-l-4 border-primary pl-4">
              Different substances affect the brain and body in different ways—but addiction follows predictable patterns across all of them.
            </p>
          </div>
        </div>
      </section>

      {/* Alcohol Section */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                <Wine className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">Alcohol</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Alcohol is legal, socially accepted, and often underestimated. That combination makes it one of the most dangerous substances when addiction develops.
            </p>
            
            <h3 className="text-xl font-semibold text-foreground mb-4">What families commonly notice:</h3>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                Personality changes, irritability, or emotional volatility
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                Promises to cut back that never last
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                Drinking earlier in the day or in secret
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                Blackouts, memory gaps, or risky behavior
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                Defensiveness or anger when drinking is discussed
              </li>
            </ul>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h4 className="font-semibold text-foreground mb-2">What's important to understand:</h4>
              <p className="text-muted-foreground">
                Alcohol disrupts judgment, impulse control, and emotional regulation. Over time, the brain adapts to alcohol being present, making stopping suddenly physically dangerous without medical supervision.
              </p>
              <p className="text-muted-foreground mt-3">
                Many families delay action because alcohol does not look as serious as other drugs. In practice, alcohol addiction can be just as destructive—and often more normalized—than any illicit substance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Opioids Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                <Pill className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">Opioids and Opiates</h2>
                <p className="text-sm text-muted-foreground">Prescription Painkillers, Heroin, Fentanyl</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">
              Opioids fundamentally change how the brain processes pain, reward, and survival. Once dependence develops, the body no longer uses the substance to get high—it needs it to function at baseline.
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-4">Common opioids include:</h3>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                Prescription pain medications such as OxyContin, Percocet, Vicodin
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                Heroin
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                Fentanyl and fentanyl-contaminated substances
              </li>
            </ul>
            
            <h3 className="text-xl font-semibold text-foreground mb-4">What families often notice:</h3>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                Extreme mood swings or emotional flatness
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                Nodding off, slowed speech, or pinpoint pupils
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                Withdrawal symptoms when not using (flu-like illness, agitation, anxiety)
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                Missing medications or unexplained financial problems
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                Increased isolation and secrecy
              </li>
            </ul>

            {/* Fentanyl Warning */}
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6 mt-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-destructive" />
                <h3 className="text-xl font-bold text-foreground">A Critical Note on Fentanyl</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Fentanyl deserves special attention. It is not simply "another opioid." It is extremely potent, fast-acting, and unpredictable.
              </p>
              <p className="text-muted-foreground mb-4">
                Many people do not realize they are using fentanyl at all. It is frequently mixed into heroin, counterfeit pain pills, cocaine, and even stimulants without the user's knowledge. This dramatically increases overdose risk.
              </p>
              <h4 className="font-semibold text-foreground mb-3">What families need to understand:</h4>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-destructive mt-1">•</span>
                  There is no safe or consistent dose
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-destructive mt-1">•</span>
                  Tolerance can drop rapidly after even short periods of abstinence
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-destructive mt-1">•</span>
                  Overdose risk increases significantly when use resumes
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-destructive mt-1">•</span>
                  Mixing fentanyl with alcohol or benzodiazepines is especially dangerous
                </li>
              </ul>
              <p className="text-foreground font-medium">
                Families often focus on how much their loved one is using. With fentanyl, the real danger is loss of tolerance, contamination, and unpredictability. Waiting for clarity or certainty can be fatal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stimulants Section */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                <Zap className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">Stimulants</h2>
                <p className="text-sm text-muted-foreground">Cocaine, Methamphetamine, Prescription Stimulants</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">
              Stimulants accelerate the nervous system. They create bursts of energy, confidence, focus, and urgency—followed by emotional crashes that drive compulsive use.
            </p>
            
            <h3 className="text-xl font-semibold text-foreground mb-4">What families often notice:</h3>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                Rapid or pressured speech
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                Agitation, restlessness, or inability to relax
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                Long periods without sleep
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                Irritability, paranoia, or sudden anger
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                Weight loss and erratic decision-making
              </li>
            </ul>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h4 className="font-semibold text-foreground mb-2">What's important to understand:</h4>
              <p className="text-muted-foreground">
                Stimulant addiction often looks like a personality change rather than a chemical problem. Over time, anxiety, paranoia, emotional instability, and aggression increase. Families frequently feel like they are "walking on eggshells," unsure which version of their loved one will appear.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benzodiazepines Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                <Brain className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">Benzodiazepines</h2>
                <p className="text-sm text-muted-foreground">Xanax, Valium, Ativan, Klonopin</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">
              Benzodiazepines are commonly prescribed for anxiety or sleep disorders, which makes dependence harder to recognize—especially when prescriptions are involved.
            </p>
            
            <h3 className="text-xl font-semibold text-foreground mb-4">What families often notice:</h3>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                Sedation or emotional blunting
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                Memory gaps or confusion
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                Increased anxiety between doses
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                Disorientation or poor judgment
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                Defensiveness around prescriptions
              </li>
            </ul>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h4 className="font-semibold text-foreground mb-2">What's important to understand:</h4>
              <p className="text-muted-foreground">
                Dependence can develop even when medications are taken as prescribed. Withdrawal from benzodiazepines can be medically dangerous and should never be handled without supervision. Risk increases significantly when these medications are combined with alcohol or opioids.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cannabis Section */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                <Leaf className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">Cannabis</h2>
                <p className="text-sm text-muted-foreground">Marijuana, Concentrates, Edibles</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">
              While widely viewed as harmless, heavy or prolonged cannabis use—particularly with high-potency products—can significantly impact motivation, emotional regulation, and mental health.
            </p>
            
            <h3 className="text-xl font-semibold text-foreground mb-4">What families often notice:</h3>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                Loss of motivation or direction
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                Withdrawal from responsibilities or relationships
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                Increased irritability or emotional flatness
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                Anxiety, paranoia, or depressive symptoms
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                Strong resistance to discussing use
              </li>
            </ul>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h4 className="font-semibold text-foreground mb-2">What's important to understand:</h4>
              <p className="text-muted-foreground">
                Cannabis addiction often shows up as stagnation rather than chaos. Families may struggle to justify concern because there is no immediate crisis—just gradual erosion of engagement, accountability, and connection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Polysubstance Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                <FlaskConical className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">Polysubstance Use</h2>
                <p className="text-sm text-muted-foreground">Mixing Substances</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">
              Many individuals struggling with addiction use more than one substance, intentionally or unintentionally.
            </p>
            
            <h3 className="text-xl font-semibold text-foreground mb-4">Why this matters:</h3>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                Overdose risk increases dramatically
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                Withdrawal becomes more complex
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                Behavior becomes less predictable
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                Treatment planning requires professional oversight
              </li>
            </ul>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <p className="text-muted-foreground">
                Families often try to rank substances by danger. In reality, polysubstance use is one of the clearest indicators that professional help is needed, regardless of which substances are involved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Matters More Section */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-6">
              What Matters More Than the Substance Itself
            </h2>
            
            <p className="text-muted-foreground mb-6">Families often ask:</p>
            <p className="text-lg font-medium text-foreground italic mb-6">"Is this drug bad enough to justify an intervention?"</p>
            
            <p className="text-muted-foreground mb-4">More useful questions are:</p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2 text-foreground">
                <span className="text-primary mt-1">→</span>
                Is their behavior becoming unsafe or unmanageable?
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <span className="text-primary mt-1">→</span>
                Are relationships deteriorating despite repeated attempts to help?
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <span className="text-primary mt-1">→</span>
                Are boundaries being ignored, manipulated, or redefined?
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <span className="text-primary mt-1">→</span>
                Is the family adapting more than the individual is changing?
              </li>
            </ul>

            <div className="bg-primary/10 border border-primary/30 rounded-lg p-6">
              <p className="text-foreground font-medium">
                Addiction is not defined by the substance alone. It is defined by loss of control, continued use despite consequences, and the toll it takes on the family system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* When Education Needs Action Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-6">
              When Education Needs to Turn Into Action
            </h2>
            
            <p className="text-muted-foreground mb-6">
              Understanding substances helps families make sense of what they are seeing. It does not replace the need for structure, boundaries, and coordinated support.
            </p>
            
            <p className="text-muted-foreground mb-6">
              If you recognize your loved one in these patterns—and recognize your family in the fear, exhaustion, or confusion surrounding them—it may be time to stop managing this alone.
            </p>

            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <p className="text-foreground font-medium mb-2">Professional intervention is not about confrontation.</p>
              <p className="text-muted-foreground">
                It is about clarity, alignment, and creating a path forward that families cannot create on their own.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Step CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">Next Step</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-6">
            If you are unsure which substances are involved, how serious the risk is, or whether an intervention is appropriate, a confidential consultation can help you evaluate next steps and protect both your loved one and your family.
          </p>
          <p className="text-xl font-medium mb-2">You are not overreacting.</p>
          <p className="text-xl font-medium mb-8">You are responding to something real.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/?type=consultation#booking">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Free Consultation
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
              <a href="tel:541-668-8084">
                <Phone className="mr-2 h-5 w-5" />
                Call (541) 668-8084
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SubstanceGuide;
