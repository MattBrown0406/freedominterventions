import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const RhodeIsland = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Rhode Island Addiction Intervention Services | Freedom Interventions"
        description="Professional intervention services for Rhode Island families. Expert interventionists help loved ones find treatment in the Ocean State. Fentanyl crisis support available."
        canonical="https://freedominterventions.com/rhode-island"
        keywords="Rhode Island intervention, addiction help RI, interventionist Providence, drug intervention Rhode Island, fentanyl crisis RI"
        geoRegion="US-RI"
        geoPlacename="Rhode Island"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="Rhode Island" state="RI" />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://freedominterventions.com" },
        { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
        { name: "Rhode Island", url: "https://freedominterventions.com/rhode-island" }
      ]} />
      
      <Navbar />
      <BreadcrumbNav items={[
        { name: "Service Areas", href: "/service-areas" },
        { name: "Rhode Island", href: "/rhode-island" }
      ]} />
      
      <section className="pt-8 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">Rhode Island Addiction Crisis</span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Rhode Island's Addiction Crisis: Professional Intervention Services</h1>
            <p className="text-lg text-muted-foreground mb-8">Rhode Island has one of the nation's highest overdose death rates. Professional interventionists help families save lives across the Ocean State.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg"><Link to="/#booking"><Calendar className="mr-2 h-5 w-5" />Schedule Free Consultation</Link></Button>
              <Button asChild variant="outline" size="lg"><a href="tel:541-838-6009"><Phone className="mr-2 h-5 w-5" />Call (541) 838-6009</a></Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">435</div>
              <p className="text-sm text-muted-foreground">Drug Overdose Deaths (2022)</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">90%</div>
              <p className="text-sm text-muted-foreground">Intervention Success Rate</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">73K+</div>
              <p className="text-sm text-muted-foreground">Residents with SUD</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
              <p className="text-sm text-muted-foreground">Crisis Support Available</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="h-8 w-8 text-primary" />
                  <h2 className="text-2xl font-bold">Rhode Island's Overdose Emergency</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Despite its small size, Rhode Island consistently ranks among states with the highest overdose death rates per capita. With over 40 deaths per 100,000 residents, the crisis touches nearly every community.
                </p>
                <p className="text-muted-foreground mb-4">
                  Fentanyl has transformed the crisis—now involved in over 85% of overdose deaths. The state's urban areas, particularly Providence, have been hit hardest, but no community is unaffected.
                </p>
                <p className="text-muted-foreground">
                  Rhode Island has responded with progressive harm reduction policies, but families still need professional support to help loved ones accept treatment.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-8 w-8 text-primary" />
                  <h2 className="text-2xl font-bold">Impact on Rhode Island Families</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  In Rhode Island's close-knit communities, addiction's impact is felt deeply. Over 73,000 residents struggle with substance use disorders—roughly 7% of the population.
                </p>
                <p className="text-muted-foreground mb-4">
                  Many families have lost loved ones to overdose or watched helplessly as addiction destroyed relationships, careers, and health. The grief and frustration can be overwhelming.
                </p>
                <p className="text-muted-foreground">
                  Professional intervention offers a structured path forward, helping families move from chaos to clarity and creating the conditions for lasting recovery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                  <h2 className="text-2xl font-bold">How We Help Rhode Island Families</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Freedom Interventions serves families throughout Rhode Island, from Providence to Newport, Warwick to Woonsocket. Our interventionists understand the unique dynamics of this tight-knit state.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    In-person interventions anywhere in Rhode Island
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    Access to treatment centers throughout New England and nationwide
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    Insurance verification and treatment financing guidance
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    Ongoing family support and recovery coaching
                  </li>
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                  <h2 className="text-2xl font-bold">A Path Forward</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Recovery is happening across Rhode Island. Despite the severity of the crisis, thousands of residents are living in long-term recovery, rebuilding their lives and relationships.
                </p>
                <p className="text-muted-foreground mb-4">
                  Professional intervention creates the breakthrough moment that many families have been waiting for. With immediate treatment placement and ongoing support, change is possible.
                </p>
                <p className="text-muted-foreground">
                  Don't wait until it's too late. With fentanyl's deadly potency, every day of active addiction carries life-threatening risk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Hope for Rhode Island Families</h2>
          <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">Families across Rhode Island have found hope through professional intervention. Your loved one's recovery journey can begin today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary"><Link to="/#booking"><Calendar className="mr-2 h-5 w-5" />Schedule Free Consultation</Link></Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"><a href="tel:503-836-2136"><Phone className="mr-2 h-5 w-5" />Call (503) 836-2136</a></Button>
          </div>
        </div>
      </section>
      
      <LocationLinks currentLocation="Rhode Island" locationType="state" />
      <Footer />
    </div>
  );
};

export default RhodeIsland;