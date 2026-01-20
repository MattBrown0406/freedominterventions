import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const WestVirginia = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="West Virginia Addiction Intervention Services | Freedom Interventions"
        description="West Virginia has the nation's highest overdose death rate at 81.4 per 100,000. Professional interventionists help Mountain State families navigate this devastating crisis."
        canonical="https://freedominterventions.com/west-virginia"
        keywords="West Virginia intervention, addiction help WV, interventionist Charleston, drug intervention West Virginia, opioid crisis WV"
        geoRegion="US-WV"
        geoPlacename="West Virginia"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="Charleston" state="WV" />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://freedominterventions.com" },
        { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
        { name: "West Virginia", url: "https://freedominterventions.com/west-virginia" }
      ]} />
      
      <Navbar />
      <BreadcrumbNav items={[
        { name: "Service Areas", href: "/service-areas" },
        { name: "West Virginia", href: "/west-virginia" }
      ]} />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 max-w-4xl">
            West Virginia's Addiction Crisis: Professional Intervention in America's Hardest-Hit State
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-8">
            With the nation's highest overdose death rate—81.4 per 100,000, nearly four times the national average—West Virginia families face an unprecedented crisis. Professional interventionists provide critical expertise to guide loved ones toward recovery.
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
              <div className="text-3xl font-bold text-foreground mb-2">1,456</div>
              <div className="text-sm text-muted-foreground">Overdose Deaths (2022)</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-primary/10 border border-primary/20">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">81.4</div>
              <div className="text-sm text-muted-foreground">Deaths per 100K (#1 in US)</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-secondary/50 border border-border">
              <Users className="h-8 w-8 text-secondary-foreground mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">200K+</div>
              <div className="text-sm text-muted-foreground">Residents with SUD</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-accent/50 border border-accent">
              <Heart className="h-8 w-8 text-accent-foreground mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">90%</div>
              <div className="text-sm text-muted-foreground">Opioid-Involved Deaths</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Scope of Crisis */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Understanding West Virginia's Devastating Crisis
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  West Virginia holds the tragic distinction of America's highest overdose death rate. In 2022, 1,456 West Virginians died from drug overdoses—a rate of 81.4 per 100,000 that nearly quadruples the national average of 21.4. No state has been hit harder by the opioid epidemic.
                </p>
                <p>
                  The crisis traces back decades to aggressive prescription opioid marketing in Appalachian communities. As pill mills closed, many turned to heroin, and now fentanyl dominates the illicit supply. Approximately 90% of overdose deaths involve opioids, with fentanyl driving the majority.
                </p>
                <p>
                  Every corner of West Virginia has been affected—from Charleston and Huntington to the smallest mountain communities. Entire families have been devastated, with grandparents raising children whose parents died from overdoses or lost custody due to addiction.
                </p>
              </div>
            </div>

            {/* Treatment Landscape */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                West Virginia's Treatment Challenges
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  West Virginia has worked to expand treatment access, including expanded Medicaid and increased medication-assisted treatment availability. However, the scale of the crisis overwhelms available resources, and geographic barriers compound the challenge.
                </p>
                <p>
                  Many West Virginia communities lack local treatment options, requiring families to travel hours for care. Insurance navigation remains difficult, and waitlists for residential treatment can extend weeks. Professional interventionists help families overcome these barriers.
                </p>
              </div>
            </div>

            {/* Family Impact */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                How Addiction Devastates West Virginia Families
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  West Virginia families have endured immeasurable loss. Many have buried multiple family members to overdoses. Those still living with addiction watch helplessly as loved ones deteriorate, caught in cycles of use, brief recovery, and relapse.
                </p>
                <p>
                  Without professional guidance, family attempts to intervene often fail. The emotional weight of watching addiction destroy loved ones impairs judgment, and good intentions frequently backfire. Professional interventionists provide the objective expertise needed to break through.
                </p>
              </div>
            </div>

            {/* Role of Interventionists */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                How Professional Interventionists Help West Virginia Families
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Interventionists bring specialized expertise to West Virginia's unique challenges. They understand the state's limited treatment infrastructure and can identify appropriate programs both within West Virginia and in neighboring states when needed.
                </p>
                <p>
                  The intervention process begins with comprehensive assessment to determine appropriate care level. Given the severity of opioid dependence common in West Virginia, medical detox is often essential. The interventionist arranges immediate placement and transport.
                </p>
                <p>
                  Family preparation is equally important. The interventionist helps families understand healthy boundaries, stop enabling behaviors, and communicate effectively. When the intervention occurs, the structured approach achieves 80-90% treatment acceptance.
                </p>
              </div>
            </div>

            {/* Why Seek Help */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Why Seek Professional Intervention in West Virginia
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Highest-Risk State</h3>
                    <p className="text-muted-foreground">Every day without treatment in West Virginia carries extreme risk—professional intervention is urgent.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Rural Expertise</h3>
                    <p className="text-muted-foreground">Experience navigating West Virginia's geographic challenges and limited local treatment options.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Opioid Specialization</h3>
                    <p className="text-muted-foreground">Deep understanding of opioid dependence and appropriate medical interventions for safe detox.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Regional Connections</h3>
                    <p className="text-muted-foreground">Access to treatment programs throughout West Virginia and neighboring states.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">5</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Long-Term Support</h3>
                    <p className="text-muted-foreground">Aftercare planning including MAT coordination, therapy, and ongoing recovery support.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Path Forward */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Hope for West Virginia Families
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  West Virginia's crisis is the nation's worst, but recovery remains possible. Professional intervention provides families with the expertise and structure needed to break through denial and guide loved ones into treatment. Every successful recovery represents hope for the Mountain State.
                </p>
                <p>
                  If your family is struggling with a loved one's addiction in West Virginia, waiting is not an option—the stakes are too high. Contact us today for a confidential consultation to learn how professional intervention can help your family find healing.
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
            Take the First Step for Your West Virginia Family
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            In the nation's hardest-hit state, professional intervention can save lives. Reach out today for a confidential consultation.
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
      
      <LocationLinks currentLocation="West Virginia" locationType="state" />
      <Footer />
    </div>
  );
};

export default WestVirginia;
