import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const Ohio = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Ohio Addiction Intervention Services | Freedom Interventions"
        description="Ohio has been devastated by the opioid epidemic with over 5,000 annual overdose deaths. Professional interventionists help families throughout the Buckeye State."
        canonical="https://freedominterventions.com/ohio"
        keywords="Ohio addiction intervention, Columbus intervention services, Cleveland drug intervention, Ohio opioid crisis, Cincinnati addiction help"
        geoRegion="US-OH"
        geoPlacename="Ohio"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="Columbus" state="OH" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
          { name: "Ohio", url: "https://freedominterventions.com/ohio" },
        ]}
      />
      <Navbar />
      <BreadcrumbNav items={[
        { name: "Service Areas", href: "/service-areas" },
        { name: "Ohio", href: "/ohio" },
      ]} />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 max-w-4xl">
            Ohio's Addiction Epidemic: Professional Intervention Services for Buckeye State Families
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-8">
            With over 5,000 overdose deaths annually—among the highest totals in the nation—Ohio families face a devastating crisis. Professional interventionists provide the expertise needed to guide loved ones toward recovery.
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
              <div className="text-3xl font-bold text-foreground mb-2">5,122</div>
              <div className="text-sm text-muted-foreground">Overdose Deaths (2022)</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-primary/10 border border-primary/20">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">43.8</div>
              <div className="text-sm text-muted-foreground">Deaths per 100K</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-secondary/50 border border-border">
              <Users className="h-8 w-8 text-secondary-foreground mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">1.1M</div>
              <div className="text-sm text-muted-foreground">Residents with SUD</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-accent/50 border border-accent">
              <Heart className="h-8 w-8 text-accent-foreground mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">81%</div>
              <div className="text-sm text-muted-foreground">Fentanyl-Involved Deaths</div>
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
                The Scope of Ohio's Addiction Epidemic
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Ohio has been one of the epicenters of America's opioid crisis for over a decade. In 2022, the state recorded 5,122 overdose deaths—a death rate of 43.8 per 100,000 that more than doubles the national average. Ohio consistently ranks among the top five states for overdose fatalities.
                </p>
                <p>
                  Fentanyl drives the crisis, involved in approximately 81% of all overdose deaths. The synthetic opioid has completely transformed Ohio's drug supply, appearing not just in heroin but increasingly in cocaine, methamphetamine, and counterfeit prescription pills. This contamination makes every use potentially lethal.
                </p>
                <p>
                  Urban centers like Cleveland, Columbus, Cincinnati, and Dayton face concentrated impacts, but Appalachian Ohio has been equally devastated. Rural communities often lack treatment resources, forcing families to travel significant distances for care.
                </p>
              </div>
            </div>

            {/* Treatment Gap */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Ohio's Treatment Landscape and Gaps
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Ohio has made significant investments in addiction treatment, including expanded Medicaid coverage, Quick Response Teams, and increased naloxone distribution. The state operates hundreds of treatment facilities serving tens of thousands of patients annually.
                </p>
                <p>
                  Despite these efforts, an enormous treatment gap persists. More than one million Ohioans struggle with substance use disorder, yet the majority receive no treatment. Wait times for residential care can extend weeks, and insurance barriers remain formidable. Professional interventionists help families navigate this complex system.
                </p>
              </div>
            </div>

            {/* Family Impact */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                How Addiction Devastates Ohio Families
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Across Ohio, families bear witness to loved ones' destruction from addiction. The constant fear of overdose, repeated legal troubles, job losses, and shattered relationships create profound trauma. Many families have buried children, siblings, or parents to this crisis.
                </p>
                <p>
                  Without professional guidance, family intervention attempts succeed only 20-30% of the time. Well-meaning efforts often devolve into arguments or ultimatums that push the addicted person further away. Professional interventionists provide the structure and expertise that achieves 80-90% treatment acceptance.
                </p>
              </div>
            </div>

            {/* Role of Interventionists */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                How Professional Interventionists Serve Ohio Families
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Interventionists bring specialized expertise to Ohio's unique challenges. They understand the state's treatment landscape—from major urban facilities to Appalachian community programs—and can navigate insurance, waitlists, and placement barriers that overwhelm families.
                </p>
                <p>
                  The intervention process begins with thorough assessment using ASAM criteria to determine appropriate care level. Whether the individual needs medical detox, residential treatment, intensive outpatient, or medication-assisted treatment, the interventionist identifies suitable options.
                </p>
                <p>
                  Family preparation is equally critical. The interventionist coaches family members on effective communication, helps establish healthy boundaries, and ensures everyone understands their role. When the intervention occurs, immediate transport to treatment prevents second thoughts.
                </p>
              </div>
            </div>

            {/* Why Seek Help */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Why Seek Professional Intervention in Ohio
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Statewide Coverage</h3>
                    <p className="text-muted-foreground">Serving families throughout Ohio—from Cleveland to Cincinnati, Columbus to rural Appalachia.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Fentanyl Expertise</h3>
                    <p className="text-muted-foreground">Specialized understanding of fentanyl's dangers and medical protocols for safe detoxification.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Treatment Navigation</h3>
                    <p className="text-muted-foreground">Deep knowledge of Ohio's treatment system including Medicaid, private insurance, and scholarship programs.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Appalachian Experience</h3>
                    <p className="text-muted-foreground">Understanding of unique challenges in rural Ohio where treatment access is limited.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">5</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Aftercare Planning</h3>
                    <p className="text-muted-foreground">Comprehensive support for ongoing recovery including therapy, MAT, and sober living coordination.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Path Forward */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Hope for Ohio Families
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Ohio's addiction epidemic is among the nation's worst, but recovery is possible. Professional intervention offers families the best chance to guide loved ones into treatment before tragedy strikes. The structured, compassionate approach breaks through denial while preserving relationships.
                </p>
                <p>
                  Every day without treatment is a day of risk in Ohio's fentanyl-saturated landscape. If your family is struggling with a loved one's addiction, contact us today for a confidential consultation to learn how professional intervention can help.
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
            Take the First Step for Your Ohio Family
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Professional intervention increases treatment entry rates to 80-90%. Reach out today for a confidential consultation.
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

      <LocationLinks currentLocation="Ohio" locationType="state" />
      <Footer />
    </div>
  );
};

export default Ohio;
