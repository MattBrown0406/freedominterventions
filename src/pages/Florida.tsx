import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import floridaBanner from "@/assets/florida-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const Florida = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Florida Addiction Intervention Services | Marchman & Baker Acts | Freedom Interventions"
        description="Florida families often ask how to navigate addiction crises, treatment options, and when the Marchman Act or Baker Act may be relevant. Freedom Interventions provides professional guidance and treatment planning statewide."
        canonical="https://freedominterventions.com/florida"
        keywords="Florida addiction intervention, Miami intervention services, Marchman Act, Baker Act, Florida drug intervention, Tampa addiction help"
        geoRegion="US-FL"
        geoPlacename="Florida"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="Miami" state="FL" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
          { name: "Florida", url: "https://freedominterventions.com/florida" },
        ]}
      />
      <Navbar />
      
      <BreadcrumbNav items={[
        { name: "Service Areas", href: "/service-areas" },
        { name: "Florida", href: "/florida" },
      ]} />
      
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
            Florida Addiction Intervention Services and Family Guidance
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-8">
            Florida families face serious addiction and mental health crises every day. Matt Brown helps families understand their options, build a treatment plan, and use tools like the Marchman Act or Baker Act appropriately when those options fit the situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="text-lg">
              <Link to="/#contact">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Free Consultation
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg">
              <a href="tel:+15418386009">
                <Phone className="mr-2 h-5 w-5" />
                Call (541) 838-6009
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
              <div className="text-3xl font-bold text-foreground mb-2">Prepared Families</div>
              <div className="text-sm text-muted-foreground">Better Treatment Outcomes</div>
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
                  Florida continues to face serious overdose, alcohol misuse, and treatment-access challenges. South Florida has been hit hard by fentanyl and cocaine contamination, Central Florida continues to see methamphetamine and prescription drug misuse, and many parts of North Florida still struggle with treatment access.
                </p>
                <p>
                  Alcohol also remains a major issue for Florida families, especially when repeated DUI arrests, crashes, job instability, and untreated mental health concerns start stacking up around the addiction.
                </p>
                <p>
                  Even with many treatment programs across the state, families still run into waitlists, uneven quality, and confusion about what level of care actually fits the situation.
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
                  Substance use disorders put Florida families under constant pressure, from overdose scares and psychiatric crises to arrests, financial chaos, and broken trust. Well-intentioned enabling, like paying bail, covering up consequences, or avoiding hard conversations, often keeps the cycle going.
                </p>
                <p>
                  A professional intervention gives families structure, preparation, and a coordinated next step instead of another round of arguments, fear, or mixed messages.
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
                    The Marchman Act allows families to pursue involuntary assessment and stabilization for someone whose substance use has made them unable to make safe decisions. The exact process varies by county, and families usually need to show clear evidence that the person is impaired and at risk.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">The Baker Act (Chapter 394)</h3>
                  <p>
                    The Baker Act applies to acute mental health crises, including situations where addiction is happening alongside dangerous psychiatric symptoms. It is different from the Marchman Act and is generally used when there is a serious concern about immediate safety and mental health instability.
                  </p>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <h4 className="font-semibold text-foreground mb-2">How Interventionists Help with These Acts</h4>
                  <p className="text-sm">
                    Florida families often ask about the Marchman Act and Baker Act. Matt can help you understand when those options may apply, what the process generally looks like, and when working with a local attorney or court advocate makes sense. These are tools families should know about, but they work best as part of a broader intervention strategy, not as a standalone approach.
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
                  Using ASAM criteria and real-world family dynamics, Matt helps determine what level of care makes sense, whether that is detox, residential treatment, partial hospitalization, intensive outpatient care, or sober living after primary treatment.
                </p>
                <p>
                  The process includes family preparation, clear communication, appropriate boundaries, treatment coordination, and transportation planning when needed. After the intervention, families also need a follow-through plan that may include therapy, family recovery work, and ongoing accountability.
                </p>
                <p>
                  When families are considering court-based options, local legal guidance and county-specific procedures matter. Matt's role is to help the family make a sound plan and coordinate with the right professionals when those steps are needed.
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
                  When families are prepared, united, and a treatment plan is in place, professional interventions have a significantly higher chance of success. Just as important, the process helps the family stop reacting emotionally and start responding with consistency.
                </p>
                <p>
                  That combination of preparation, leverage, and immediate next steps often changes the trajectory faster than families expect.
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
                  Florida families also deal with practical barriers, including long distances, fragmented systems, uneven treatment quality, and the confusion of sorting legal, clinical, and family issues all at once.
                </p>
                <p>
                  Even where statewide numbers improve, individual families still need a workable plan for the person right in front of them.
                </p>
              </div>
            </div>

            {/* Why Seek Help */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Why Seek Professional Intervention in Florida
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Expert Assessment</h3>
                    <p className="text-muted-foreground">Comprehensive evaluation of your loved one's specific circumstances using proven clinical criteria.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Tailored Strategies</h3>
                    <p className="text-muted-foreground">Customized approaches that account for Florida's unique legal frameworks, regional resources, and cultural factors.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Treatment Coordination</h3>
                    <p className="text-muted-foreground">Connections to detox centers, inpatient rehabs, outpatient programs, and sober living facilities statewide.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Legal Navigation</h3>
                    <p className="text-muted-foreground">Guidance on how Marchman Act and Baker Act options may fit into a broader intervention plan, and when to involve local legal counsel or court advocates.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">5</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Aftercare Planning</h3>
                    <p className="text-muted-foreground">Collaboration with treatment teams for ongoing therapy, AA/NA participation, and long-term recovery support.</p>
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
                  Florida families need clear guidance, not pressure or false promises. With the right preparation and treatment plan, an intervention can create a real turning point.
                </p>
                <p>
                  If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you.
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
            Schedule Free Consultation for Your Florida Family
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            When families are prepared, united, and a treatment plan is in place, professional interventions have a significantly higher chance of success. We can help you think through treatment options and whether Marchman Act or Baker Act steps should be part of the plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg">
              <Link to="/#contact">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Consultation
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <a href="tel:+15418386009">
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Family Intervention Link */}
      <section className="py-8 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-foreground">Need help planning a family intervention?</p>
              <p className="text-sm text-muted-foreground">Learn how our family intervention services work — and what to expect.</p>
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


      <LocationLinks currentLocation="Florida" locationType="state" />

      <Footer />
    </div>
  );
};

export default Florida;
