import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BookOpen, Stethoscope, Building, Users, Home, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import treatmentBanner from "@/assets/treatment-planning-banner.jpg";

const TreatmentPlanning = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Banner Image */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img 
          src={treatmentBanner} 
          alt="Stepping stones leading toward a bright horizon" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
      </div>
      
      <main>
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-card">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4" />
                Treatment Planning
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground leading-tight">
                How Interventionists Create Treatment Plans for Lasting Recovery
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Experienced interventionists help families craft comprehensive treatment plans that start with immediate detox and progress through levels of care like inpatient, outpatient, IOP, and sober living, arresting addiction short-term while building long-term recovery success.
              </p>
            </div>
          </div>
        </section>

        {/* Assessing Needs Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Stethoscope className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
                    Assessing Needs for the Right Level of Care
                  </h2>
                </div>
              </div>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                <p>
                  Interventionists begin with thorough assessments using ASAM criteria to match the individual's addiction severity to appropriate levels of care, ensuring detox safety before advancing to inpatient or outpatient programs. For severe cases with withdrawal risks, they prioritize medically supervised detox to manage symptoms like seizures or delirium tremens, preventing emergencies and stabilizing patients for subsequent treatment.
                </p>
                <p>
                  This personalized approach considers co-occurring mental health issues, recommending dual-diagnosis inpatient programs where therapy addresses both addiction and underlying conditions, setting a strong foundation for sustained recovery.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Short-Term Arrest Section */}
        <section className="py-16 md:py-20 bg-card">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
                    Short-Term Arrest: Detox and Inpatient Stabilization
                  </h2>
                </div>
              </div>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                <p>
                  In the short term, interventionists arrange immediate detox as the critical first step, often transitioning directly to inpatient treatment programs for 24/7 monitoring and intensive therapy that breaks denial and builds early coping skills. Inpatient rehab, typically 30-90 days, provides structured environments with medical staff, group sessions, and family education, halting active use and addressing acute physical dependence effectively.
                </p>
                <p>
                  They coordinate seamless handoffs, such as post-detox inpatient admission, while coaching families to enforce boundaries that support this phase without enabling relapse, ensuring the crisis ends and recovery begins.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Transitioning Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
                    Transitioning Through Outpatient and IOP
                  </h2>
                </div>
              </div>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                <p>
                  Once stabilized, interventionists design step-down plans featuring outpatient programs and IOP (Intensive Outpatient Programs) for flexible yet intensive care, allowing individuals to reintegrate while attending 9-15 hours of weekly therapy, counseling, and relapse prevention. Outpatient levels of care suit those with milder addictions or post-inpatient needs, offering skill-building without full residential commitment.
                </p>
                <p>
                  Professionals monitor progress, adjusting from IOP to standard outpatient as milestones are met, while educating families on supporting this phase through consistent check-ins and refusing to fund non-treatment activities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sober Living Section */}
        <section className="py-16 md:py-20 bg-card">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Home className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
                    Long-Term Success with Sober Living
                  </h2>
                </div>
              </div>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                <p>
                  Sober living homes bridge treatment programs to independent life, providing structured, drug-free environments with house rules, peer accountability, and proximity to outpatient services for ongoing recovery maintenance. Interventionists select sober living options vetted for success rates, often integrating them after IOP to reinforce habits formed in inpatient and detox phases.
                </p>
                <p>
                  This continuum prevents premature discharge pitfalls, with interventionists facilitating family contracts that tie financial or housing support to sober living compliance, fostering autonomy and reducing recidivism.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Family Role Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-6">
                Family Role in the Recovery Continuum
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                <p>
                  Interventionists empower families by dismantling enabling patterns during planning, teaching them to align support with treatment milestones across detox, inpatient, outpatient, IOP, and sober living. They conduct pre-intervention education on levels of care, preparing relatives to reinforce the plan through Al-Anon participation and boundary enforcement.
                </p>
                <p>
                  Post-intervention, ongoing check-ins ensure adherence, adjusting plans for setbacks while celebrating progress, transforming family dynamics into recovery allies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Recovery Roadmap Section */}
        <section className="py-16 md:py-20 bg-card">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-6">
                Building the Full Recovery Roadmap
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                <p>
                  A skilled interventionist develops this roadmap collaboratively: initial detox for safety, inpatient for immersion, IOP/outpatient for transition, and sober living for sustainability, all tailored via clinical assessments. They pre-arrange admissions to top treatment programs, handle transportation, and provide follow-up, boosting treatment acceptance rates significantly.
                </p>
                <p>
                  Long-term, they connect to aftercare like 12-step groups or vocational training, monitoring for 6-12 months to solidify gains across all levels of care.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Action Steps Section */}
        <section className="py-16 md:py-20 bg-primary/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-8 text-center">
                Action Steps for Families
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-background p-6 rounded-xl border border-border/50">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">
                      Schedule a consultation for ASAM assessment to identify ideal detox and inpatient needs immediately.
                    </p>
                  </div>
                </div>
                <div className="bg-background p-6 rounded-xl border border-border/50">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">
                      Agree on family boundaries tied to treatment program entry, like no funds without detox verification.
                    </p>
                  </div>
                </div>
                <div className="bg-background p-6 rounded-xl border border-border/50">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">
                      Plan step-down sequence: inpatient to IOP to outpatient to sober living, with interventionist oversight.
                    </p>
                  </div>
                </div>
                <div className="bg-background p-6 rounded-xl border border-border/50">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">
                      Commit to family therapy alongside loved one's levels of care for holistic recovery support.
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-8 text-center text-lg text-muted-foreground">
                Experienced interventionists turn desperation into structured hope, guiding families through detox, inpatient, outpatient, IOP, and sober living within comprehensive treatment programs. This arrests addiction now and secures lifelong recovery.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-card">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-4">
                Ready to Create a Treatment Plan?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Let us help you navigate the levels of care and create a comprehensive treatment plan for your loved one.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/#contact">
                  <Button size="lg" className="gap-2">
                    Schedule a Consultation
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <a href="tel:+15038362136">
                  <Button size="lg" variant="outline" className="gap-2">
                    Call (503) 836-2136
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TreatmentPlanning;