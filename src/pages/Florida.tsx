import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import floridaBanner from "@/assets/florida-crisis-banner.jpg";

const Florida = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Banner Image */}
      <section className="pt-20">
        <div className="w-full h-[300px] md:h-[400px] overflow-hidden">
          <img 
            src={floridaBanner} 
            alt="Florida coastal landscape with palm trees and lighthouse symbolizing hope and recovery" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 max-w-4xl">
            Florida's Addiction Epidemic: Leveraging Marchman and Baker Acts
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-8">
            Florida recorded 7,220 drug overdose deaths in 2023 at a rate of 31.7 per 100,000 residents. Professional interventionists achieve 80-90% success in facilitating treatment entry, adeptly navigating Florida's unique legal frameworks like the Marchman and Baker Acts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="text-lg">
              <Link to="/#contact">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Free Consultation
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg">
              <a href="tel:+15038362136">
                <Phone className="mr-2 h-5 w-5" />
                Call (503) 836-2136
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-lg bg-destructive/10 border border-destructive/20">
              <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">7,220</div>
              <div className="text-sm text-muted-foreground">Overdose Deaths in 2023</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-primary/10 border border-primary/20">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">38,000+</div>
              <div className="text-sm text-muted-foreground">DUI-Related Crashes (2021)</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-secondary/50 border border-border">
              <Users className="h-8 w-8 text-secondary-foreground mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">80,000</div>
              <div className="text-sm text-muted-foreground">Floridians Need Treatment</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-accent/50 border border-accent">
              <Heart className="h-8 w-8 text-accent-foreground mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">80-90%</div>
              <div className="text-sm text-muted-foreground">Intervention Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Magnitude */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Magnitude of Florida's Substance Use Challenges
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Overdose mortality escalated 42% from 2019 to 2020 (5,019 to 7,137 deaths), peaking at 35 per 100,000 before recent declines attributable to enhanced state interventions. Regional disparities persist: South Florida (Miami-Dade, Broward) leads in fentanyl and overdoses, Central Florida (Orlando, Tampa) grapples with methamphetamine and prescription misuse, while North Florida faces treatment shortages.
                </p>
                <p>
                  DUI statistics underscore alcohol's peril—Hillsborough County logged 3,256 convictions in 2011 and Tampa 2,087 arrests in 2016, with over half self-initiated stops. Repeat offenses comprise 74% first-time but 2-4% fourth-or-more convictions. Florida's DUI fatality rate stands at 5.09 per 100,000, surpassing national averages.
                </p>
                <p>
                  Demographic vulnerabilities amplify risks, with males predominant in DUI fatalities and urban-rural access gaps hindering care. Despite abundant facilities, capacity constraints leave most untreated, perpetuating cycles of relapse and legal entanglements.
                </p>
              </div>
            </div>

            {/* Familial Strain */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Familial Strain Amid Legal and Health Crises
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Substance use disorders fracture Florida families, from Miami's opioid corridors to Tampa's DUI hotspots, manifesting in overdoses, crashes, and relational discord. Well-intentioned enabling—such as bail payments or denial—prolongs suffering, as unstructured family interventions succeed only 20-30% against entrenched resistance.
                </p>
                <p>
                  With 90% untreated, households endure instability. Interventionists, employing evidence-based methodologies, unify families for markedly higher efficacy, tailoring strategies to Florida's epidemiological profile and statutory tools.
                </p>
              </div>
            </div>

            {/* Marchman and Baker Acts */}
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Scale className="h-8 w-8 text-primary" />
                <h2 className="font-serif text-3xl font-bold text-foreground">
                  Florida's Involuntary Treatment Statutes
                </h2>
              </div>
              <div className="prose prose-lg text-muted-foreground space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">The Marchman Act (Chapter 397)</h3>
                  <p>
                    Authorizes involuntary assessment and treatment for substance use disorders. Relatives or three affiants petition the court, demonstrating impaired control and imminent harm. Ex parte orders enable immediate 5-day evaluations, extendable to 90 days upon judicial review. It circumvents voluntary refusal, prioritizing public safety.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">The Baker Act (Chapter 394)</h3>
                  <p>
                    Addresses mental health crises, including addiction-induced psychiatric decompensation, permitting 72-hour involuntary holds for examination, with extensions if criteria persist. Distinct from Marchman, it requires substantial mental illness evidence beyond substance intoxication.
                  </p>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <h4 className="font-semibold text-foreground mb-2">How Interventionists Help with These Acts</h4>
                  <p className="text-sm">
                    Interventionists operationalize these acts adeptly: conducting pre-petition assessments, compiling affidavits, police reports, and medical records; securing ex parte relief; representing families in hearings; and coordinating seamless facility placements while safeguarding due process. This expertise accelerates intervention, often averting acute crises.
                  </p>
                </div>
              </div>
            </div>

            {/* Strategic Interventions */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Interventionists' Strategic Interventions in Florida
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Utilizing ASAM criteria, professionals evaluate severity, aligning with local patterns—fentanyl dominance southward, DUI prevalence centrally. Continuum planning encompasses detox, inpatient, intensive outpatient (IOP), and sober living transitions.
                </p>
                <p>
                  Interventions feature structured dialogues with impact letters, boundary establishment (e.g., financial cessation absent treatment verification), and expedited transport. Post-event monitoring enforces aftercare—12-step participation, therapy, family counseling—integrating Marchman/Baker where voluntary compliance falters.
                </p>
                <p>
                  Florida specialists expedite statutory filings, leveraging networks to bypass waitlists amid high-demand regions.
                </p>
              </div>
            </div>

            {/* Empirical Efficacy */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Empirical Efficacy and Familial Restoration
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Interventionists elevate treatment initiation to 80-90%, mitigating relapse in underserved contexts. In Florida's high-DUI, overdose landscape, they dismantle enabling dynamics, fostering sustained recovery; social reinforcement halves recidivism risks.
                </p>
                <p>
                  Targeted protocols yield threefold referral increases, underscoring systemic value.
                </p>
              </div>
            </div>

            {/* Structural Impediments */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Addressing Florida's Structural Impediments
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Urban density, tourism-driven access barriers, adolescent misuse, and DUI surfeits constrain services, though overdose trajectories improve. Interventions yield fiscal returns via averted hospitalizations and incarcerations.
                </p>
                <p>
                  Provisional 2025 metrics signal optimism, with a 14% statewide decline in overdoses and fentanyl fatalities dropping 35%.
                </p>
              </div>
            </div>

            {/* Action Steps */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Actionable Recommendations for Florida Families
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Monitor Warning Signs</h3>
                    <p className="text-muted-foreground">Track DUI incidents, overdose indicators, or behavioral changes. Solicit complimentary consultations via state resources.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Engage Specialists</h3>
                    <p className="text-muted-foreground">Contact Freedom Interventions for expert guidance spanning Miami to Tampa and throughout Florida.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Prepare Documentation</h3>
                    <p className="text-muted-foreground">Amass toxicology reports, medical records, and legal documents. Rehearse boundaries with professional guidance.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Invoke Marchman/Baker Acts</h3>
                    <p className="text-muted-foreground">Procure interventionist-guided petitions when voluntary treatment is refused and criteria are met.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">5</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Institutionalize Aftercare</h3>
                    <p className="text-muted-foreground">Establish AA/NA attendance, therapy, and family counseling. Monitor progress for 6-12 months.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pathways */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Pathways to Recovery in the Sunshine State
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Florida's 7,220 overdoses and 38,000+ DUI crashes evince fentanyl and alcohol's devastation. Interventionists, harnessing Marchman and Baker Acts, forge 90% conduits to care, bridging pervasive gaps.
                </p>
                <p>
                  Forestall further tragedy: initiate specialist consultation—assess, petition, reclaim futures. Transformation commences forthwith.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            Take the First Step for Your Florida Family
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Professional intervention achieves 80-90% success rates. We can help navigate Marchman and Baker Act processes. Reach out today for a confidential consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg">
              <Link to="/#contact">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Consultation
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <a href="tel:+15038362136">
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Florida;
