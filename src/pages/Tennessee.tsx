import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { OrganizationSchema, BreadcrumbSchema, ServiceAreaSchema } from "@/components/StructuredData";

const Tennessee = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Tennessee Addiction Intervention Services | Freedom Interventions"
        description="Tennessee ranks among the top states for overdose deaths with over 3,800 annual fatalities. Professional interventionists help Volunteer State families guide loved ones to recovery."
        canonical="https://freedominterventions.com/tennessee"
        keywords="Tennessee intervention, addiction help TN, interventionist Nashville, drug intervention Memphis, Knoxville addiction help"
        geoRegion="US-TN"
        geoPlacename="Tennessee"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Tennessee"
        url="https://freedominterventions.com/tennessee"
        description="Tennessee ranks among the top states for overdose deaths with over 3,800 annual fatalities. Professional interventionists help Volunteer State families guide loved ones to recovery."
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://freedominterventions.com" },
        { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
        { name: "Tennessee", url: "https://freedominterventions.com/tennessee" }
      ]} />
      
      <Navbar />
      <BreadcrumbNav items={[
        { name: "Service Areas", href: "/service-areas" },
        { name: "Tennessee", href: "/tennessee" }
      ]} />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 max-w-4xl">
            Tennessee's Addiction Crisis: Professional Intervention Services for Volunteer State Families
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-8">
            With over 3,800 overdose deaths annually and rates climbing, Tennessee families face a devastating crisis. Professional interventionists provide the expertise needed to guide loved ones toward recovery.
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
              <div className="text-3xl font-bold text-foreground mb-2">3,814</div>
              <div className="text-sm text-muted-foreground">Overdose Deaths (2022)</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-primary/10 border border-primary/20">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">55.5</div>
              <div className="text-sm text-muted-foreground">Deaths per 100K</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-secondary/50 border border-border">
              <Users className="h-8 w-8 text-secondary-foreground mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">600K+</div>
              <div className="text-sm text-muted-foreground">Residents with SUD</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-accent/50 border border-accent">
              <Heart className="h-8 w-8 text-accent-foreground mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">80%</div>
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
                The Scope of Tennessee's Addiction Crisis
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Tennessee ranks among America's hardest-hit states in the opioid epidemic. In 2022, 3,814 Tennesseans died from drug overdoses—a rate of 55.5 per 100,000 that more than doubles the national average. The crisis has escalated dramatically over the past decade.
                </p>
                <p>
                  Fentanyl drives approximately 80% of overdose deaths, having transformed the state's drug supply. East Tennessee, including Knoxville and surrounding counties, faces particularly severe impacts, though Memphis, Nashville, and Chattanooga all struggle with concentrated addiction problems.
                </p>
                <p>
                  The prescription opioid epidemic that began decades ago laid the groundwork for today's crisis. As pill availability decreased, many transitioned to heroin and now fentanyl. Methamphetamine use has also surged, often in combination with opioids.
                </p>
              </div>
            </div>

            {/* Treatment Gap */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Tennessee's Treatment Landscape
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Tennessee has worked to expand addiction treatment access through TennCare (Medicaid) expansion and increased funding for treatment facilities. The state operates numerous treatment centers and has implemented harm reduction programs including naloxone distribution.
                </p>
                <p>
                  Despite these efforts, significant treatment gaps remain. Over 600,000 Tennesseans struggle with substance use disorder, but most receive no treatment. Wait times for residential care can extend weeks, and rural areas often lack local options. Professional interventionists help families navigate these barriers.
                </p>
              </div>
            </div>

            {/* Family Impact */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                How Addiction Impacts Tennessee Families
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Tennessee families bear enormous burdens watching loved ones struggle with addiction. The constant fear of overdose, repeated legal troubles, job losses, and deteriorating relationships create profound trauma. Many families have lost multiple members to this crisis.
                </p>
                <p>
                  Without professional guidance, family intervention attempts succeed only 20-30% of the time. Well-intentioned efforts often push the addicted person further away. Professional interventionists provide the structure and expertise that achieves significantly higher treatment acceptance rates.
                </p>
              </div>
            </div>

            {/* Role of Interventionists */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                How Professional Interventionists Serve Tennessee Families
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Interventionists bring specialized expertise to Tennessee's unique challenges. They understand the state's treatment landscape—from Nashville's major facilities to East Tennessee's community programs—and can navigate TennCare, private insurance, and other funding sources.
                </p>
                <p>
                  The intervention process begins with thorough assessment using medical criteria to determine appropriate care level. The interventionist then works with the family to prepare—coaching on communication, establishing boundaries, and arranging immediate treatment placement.
                </p>
                <p>
                  When the intervention occurs, the structured approach breaks through denial while preserving family relationships. Immediate transport to treatment prevents second thoughts, and the interventionist coordinates ongoing support throughout the recovery process.
                </p>
              </div>
            </div>

            {/* Why Seek Help */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Why Seek Professional Intervention in Tennessee
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Statewide Coverage</h3>
                    <p className="text-muted-foreground">Serving families throughout Tennessee—from Memphis to Knoxville, Nashville to Chattanooga.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Fentanyl Crisis Response</h3>
                    <p className="text-muted-foreground">Specialized understanding of fentanyl's dangers and appropriate medical protocols for detoxification.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Treatment Navigation</h3>
                    <p className="text-muted-foreground">Expert guidance through Tennessee's treatment system including TennCare and private insurance options.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Appalachian Experience</h3>
                    <p className="text-muted-foreground">Understanding of unique challenges in East Tennessee's mountain communities.</p>
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
                Hope for Tennessee Families
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Tennessee's addiction crisis is severe, but recovery is possible. Professional intervention offers families the best chance to guide loved ones into treatment before tragedy strikes. The structured, compassionate approach breaks through denial while preserving relationships.
                </p>
                <p>
                  If your family is struggling with a loved one's addiction in Tennessee, contact us today for a confidential consultation to learn how professional intervention can help your family find healing.
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
            Schedule Free Consultation for Your Tennessee Family
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Professional intervention increases treatment entry rates to significantly higher. Reach out today for a confidential consultation.
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

      
      <LocationLinks currentLocation="Tennessee" locationType="state" />
      <Footer />
    </div>
  );
};

export default Tennessee;
