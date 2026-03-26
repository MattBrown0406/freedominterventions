import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const NewHampshire = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="New Hampshire Addiction Intervention Services | Freedom Interventions"
        description="New Hampshire has one of the highest overdose death rates in New England. Professional interventionists help families navigate addiction crisis in the Granite State."
        canonical="https://freedominterventions.com/new-hampshire"
        keywords="New Hampshire addiction intervention, Manchester intervention services, Nashua drug intervention, New Hampshire opioid crisis, fentanyl intervention NH"
        geoRegion="US-NH"
        geoPlacename="New Hampshire"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="Manchester" state="NH" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
          { name: "New Hampshire", url: "https://freedominterventions.com/new-hampshire" },
        ]}
      />
      
      <Navbar />
      
      <BreadcrumbNav items={[
        { name: "Service Areas", href: "/service-areas" },
        { name: "New Hampshire", href: "/new-hampshire" },
      ]} />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 max-w-4xl">
            New Hampshire's Addiction Crisis: Professional Intervention Services for Granite State Families
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-8">
            With overdose death rates among the highest in New England and fentanyl driving the crisis, New Hampshire families need professional intervention expertise to guide loved ones toward recovery.
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
              <div className="text-3xl font-bold text-foreground mb-2">487</div>
              <div className="text-sm text-muted-foreground">Overdose Deaths (2022)</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-primary/10 border border-primary/20">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">35.0</div>
              <div className="text-sm text-muted-foreground">Deaths per 100K</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-secondary/50 border border-border">
              <Users className="h-8 w-8 text-secondary-foreground mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">95K+</div>
              <div className="text-sm text-muted-foreground">Residents with SUD</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-accent/50 border border-accent">
              <Heart className="h-8 w-8 text-accent-foreground mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">90%</div>
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
                Understanding New Hampshire's Addiction Emergency
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  New Hampshire has faced one of the nation's most severe opioid crises for nearly a decade. With a 2022 overdose death rate of 35.0 per 100,000 residents—significantly above the national average of 21.4—the Granite State continues to struggle despite aggressive intervention efforts.
                </p>
                <p>
                  Fentanyl dominates the crisis, involved in approximately 90% of all overdose deaths. The synthetic opioid has completely transformed the illicit drug supply, appearing in heroin, counterfeit pills, and increasingly in cocaine and methamphetamine. This contamination makes every use potentially fatal.
                </p>
                <p>
                  Manchester, Nashua, and the Seacoast region face particularly concentrated impacts, though rural communities have been devastated as well. The crisis affects all demographics, shattering the myth that addiction only impacts certain communities.
                </p>
              </div>
            </div>

            {/* Treatment Landscape */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                New Hampshire's Treatment Resources
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  New Hampshire has invested significantly in addiction treatment infrastructure, including expanded Medicaid coverage and crisis intervention services. The state operates multiple treatment facilities and has partnered with community organizations to increase access.
                </p>
                <p>
                  Despite these efforts, treatment capacity often falls short of demand. Wait times for residential treatment can extend for weeks, and many families struggle to navigate the complex system of care. Professional interventionists help bridge this gap, identifying available resources and expediting admission.
                </p>
              </div>
            </div>

            {/* Family Impact */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                How Addiction Impacts New Hampshire Families
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Families across New Hampshire bear the weight of watching loved ones struggle with addiction. The constant fear of overdose, financial strain from enabling behaviors, and deterioration of family relationships create profound trauma that extends far beyond the addicted individual.
                </p>
                <p>
                  Many New Hampshire families have tried multiple approaches—pleading, threats, ultimatums—only to see their loved ones continue using. Professional interventionists provide the structured, evidence-based approach that transforms these desperate situations into pathways toward recovery.
                </p>
              </div>
            </div>

            {/* Role of Interventionists */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                How Professional Interventionists Serve New Hampshire Families
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Interventionists bring specialized expertise to help families navigate New Hampshire's unique challenges. They understand the local treatment landscape, from facilities in Manchester and Concord to specialized programs throughout New England.
                </p>
                <p>
                  The intervention process begins with a thorough assessment, determining the appropriate level of care based on medical criteria. The interventionist then works with the family to prepare for the intervention itself—coaching family members on effective communication, establishing clear boundaries, and arranging treatment placement.
                </p>
                <p>
                  When executed professionally, interventions achieve 80-90% treatment acceptance rates. The interventionist coordinates immediate transport to treatment and provides ongoing support to ensure successful transition into care.
                </p>
              </div>
            </div>

            {/* Why Seek Help */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Why Seek Professional Intervention in New Hampshire
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Regional Expertise</h3>
                    <p className="text-muted-foreground">Deep knowledge of New Hampshire's treatment resources, from local facilities to New England-wide programs.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Fentanyl Crisis Response</h3>
                    <p className="text-muted-foreground">Specialized understanding of fentanyl's dangers and appropriate medical protocols for safe detoxification.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Rural Access Solutions</h3>
                    <p className="text-muted-foreground">Experience serving families throughout New Hampshire, including rural communities with limited local resources.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Family Healing</h3>
                    <p className="text-muted-foreground">Support for family members dealing with trauma, enabling patterns, and relationship repair.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">5</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Aftercare Coordination</h3>
                    <p className="text-muted-foreground">Planning for ongoing recovery support including therapy, medication-assisted treatment, and sober living.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Path Forward */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Hope for New Hampshire Families
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Despite the severity of New Hampshire's addiction crisis, recovery is possible. Professional intervention offers families the best chance to guide their loved ones into treatment before tragedy strikes. The structured, compassionate approach breaks through denial while preserving relationships.
                </p>
                <p>
                  If your family is struggling with a loved one's addiction, you don't have to face it alone. Contact us today for a confidential consultation to learn how professional intervention can help your New Hampshire family find healing.
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
            Take the First Step for Your New Hampshire Family
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


      <LocationLinks currentLocation="New Hampshire" locationType="state" />

      <Footer />
    </div>
  );
};

export default NewHampshire;
