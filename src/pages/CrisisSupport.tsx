import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, AlertTriangle, Building2, Heart, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import crisisBanner from "@/assets/crisis-support-banner.jpg";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema, BreadcrumbSchema, ServiceSchema } from "@/components/StructuredData";
import OptimizedImage from "@/components/OptimizedImage";

const CrisisSupport = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Crisis Support | Freedom Interventions"
        description="Professional interventionists help families navigate addiction crises including jail, hospital visits, overdoses, and self-harm. Get expert crisis support now."
        canonical="https://freedominterventions.com/crisis-support"
        keywords="addiction crisis support, intervention crisis help, overdose family support, addiction emergency help"
      />
      <OrganizationSchema />
      <ServiceSchema
        name="Addiction Crisis Support"
        description="Professional interventionists help families navigate addiction crises including jail stays, hospital visits, overdoses, and self-harm risks."
        url="https://freedominterventions.com/crisis-support"
        serviceType="Crisis Intervention"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Crisis Support", url: "https://freedominterventions.com/crisis-support" },
        ]}
      />
      <Navbar />
      
      {/* Banner Image */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <OptimizedImage 
          src={crisisBanner} 
          alt="Lighthouse beacon cutting through storm clouds at dawn" 
          className="w-full h-full"
          priority={true}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
      </div>
      
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">
              Crisis Support
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground leading-tight">
              How Interventionists Help Families Navigate Addiction Crises
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional interventionists specialize in guiding families through addiction crises like jail stays, hospital visits, emergencies, and self-harm risks, turning chaos into pathways for recovery.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+15038362136">
                <Button variant="default" size="lg" className="w-full sm:w-auto">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: (503) 836-2136
                </Button>
              </a>
              <Link to="/#booking">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Schedule a Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-16">
              <p className="text-lg text-muted-foreground leading-relaxed">
                By addressing enabling patterns and stabilizing acute situations, interventionists help loved ones accept treatment before tragedies escalate.
              </p>
            </div>

            {/* Common Crises Section */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
                  Common Addiction Crises Requiring Intervention
                </h2>
              </div>
              <div className="pl-0 md:pl-15">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Addiction often spirals into crises that overwhelm families, including repeated jail time for DUIs or possession, emergency room overdoses, psychiatric hospital commitments, and self-harm attempts tied to substance-induced despair. These events signal that enabling—such as bailing out of jail or covering medical bills—has prolonged the problem rather than solving it.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Interventionists step in during these high-stakes moments to assess risks, de-escalate tensions, and coordinate immediate safety measures like rapid evaluations or linkage to detox facilities. Their expertise prevents families from reacting impulsively, which can worsen outcomes.
                </p>
              </div>
            </div>

            {/* Jail and Legal Crises */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
                  Jail and Legal Crises
                </h2>
              </div>
              <div className="pl-0 md:pl-15">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Arrests represent a common crisis where interventionists shine, as jail stints for drug-related charges disrupt lives and highlight addiction's consequences without family enabling to soften the blow. Rather than posting bail repeatedly, interventionists help families use this as a "teachable moment" by planning structured conversations post-release that link freedom to treatment entry.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  They collaborate with legal systems to arrange court-mandated rehab, reducing recidivism and breaking cycles of incarceration fueled by untreated addiction. This approach shifts focus from punishment to recovery, protecting both the individual and family from ongoing legal emergencies.
                </p>
              </div>
            </div>

            {/* Hospital and Overdose Emergencies */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
                  Hospital and Overdose Emergencies
                </h2>
              </div>
              <div className="pl-0 md:pl-15">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Hospital crises, like overdose reversals or withdrawal seizures, demand swift action that interventionists provide through crisis stabilization techniques such as rapid assessments and safety planning. Families often enable by minimizing these events as "one-offs," but professionals educate them on the chronic risks and facilitate direct transfers to long-term care from the ER.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  In emergencies, interventionists ensure follow-up linkages to avoid the "revolving door" of readmissions, emphasizing that true recovery starts with ending financial or emotional bailouts. Their involvement cuts overdose fatalities by bridging acute care to sustained sobriety programs.
                </p>
              </div>
            </div>

            {/* Self-Harm and Mental Health Crises */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
                  Self-Harm and Mental Health Crises
                </h2>
              </div>
              <div className="pl-0 md:pl-15">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Self-harm crises, including suicidal ideation amplified by drugs or alcohol, require immediate de-escalation and boundary-setting that families struggle to enforce alone. Interventionists use rapport-building and problem identification to stabilize the individual while teaching relatives to stop enabling behaviors like ignoring threats or providing cash for substances.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  They address codependency, helping loved ones recognize self-harm as an addiction symptom rather than isolated drama, paving the way for dual-diagnosis treatment. If the threats of self harm are more manipulative in nature, the interventionists can help to see through the emotion of the moment and identify the true nature of the threat. This unified front fosters recovery by replacing rescue missions with accountable support.
                </p>
              </div>
            </div>

            {/* Breaking Enabling Patterns */}
            <div className="mb-16 bg-card rounded-2xl p-8 border border-border/50">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-6">
                Breaking Enabling Patterns
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Enabling prolongs crises by shielding addicts from natural consequences, such as paying fines, hiding relapses, or tolerating chaos at home. Interventionists train families to establish firm boundaries—like no more money without treatment verification—creating discomfort that motivates change without cruelty.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                By unifying family messages, they eliminate manipulation tactics, ensuring crises lead to intervention rather than repetition. This shift from enabling to empowerment is key to sustainable recovery.
              </p>
            </div>

            {/* Path to Long-Term Recovery */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-6">
                Path to Long-Term Recovery
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Post-crisis, interventionists connect families to resources like family therapy, support groups, and medication-assisted treatment, boosting completion rates by 30% according to health data. They monitor progress, adjust plans for setbacks, and reinforce boundaries to prevent relapse triggers.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Ongoing involvement turns emergencies into turning points, where families learn addiction as a treatable disease requiring collective vigilance.
              </p>
            </div>

            {/* Steps Families Can Take Now */}
            <div className="bg-primary/5 rounded-2xl p-8 mb-16">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-6">
                Steps Families Can Take Now
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">Contact an interventionist immediately</strong> after any crisis like jail or hospital discharge for a safety assessment and action plan.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">Attend Al-Anon or Nar-Anon</strong> to identify and stop enabling behaviors fueling emergencies.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">Document incidents</strong> (self-harm threats, overdoses) to build a clear case for treatment during interventions.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">Prepare consequences in advance</strong>, such as home eviction without sobriety proof, enforced consistently.
                  </span>
                </li>
              </ul>
            </div>

            {/* Closing Statement */}
            <div className="text-center mb-16">
              <p className="text-lg text-foreground leading-relaxed font-medium">
                Interventionists transform addiction crises into recovery opportunities by halting enabling, ensuring safety, and guiding families toward healing. Acting decisively ends the cycle of jail, hospitals, emergencies, and self-harm, replacing despair with hope.
              </p>
            </div>

            {/* CTA */}
            <div className="bg-card rounded-2xl p-8 md:p-12 text-center border border-border/50">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-4">
                Ready to Get Help?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Don't wait for another crisis. Contact us today to discuss how we can help your family navigate this difficult time and find a path to recovery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+15038362136">
                  <Button variant="default" size="lg" className="w-full sm:w-auto">
                    <Phone className="w-5 h-5 mr-2" />
                    Call (503) 836-2136
                  </Button>
                </a>
                <Link to="/#booking">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Schedule a Consultation
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CrisisSupport;
