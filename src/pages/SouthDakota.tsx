import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { OrganizationSchema, BreadcrumbSchema, ServiceAreaSchema } from "@/components/StructuredData";

const SouthDakota = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="South Dakota Addiction Intervention Services | Freedom Interventions"
        description="Professional intervention services for South Dakota families. Expert interventionists help loved ones find treatment across the Mount Rushmore State. Meth and fentanyl crisis support."
        canonical="https://freedominterventions.com/south-dakota"
        keywords="South Dakota intervention, addiction help SD, interventionist Sioux Falls, drug intervention Rapid City, South Dakota meth crisis"
        geoRegion="US-SD"
        geoPlacename="South Dakota"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="South Dakota"
        url="https://freedominterventions.com/south-dakota"
        description="Professional intervention services for South Dakota families. Expert interventionists help loved ones find treatment across the Mount Rushmore State. Meth and fentanyl crisis support."
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://freedominterventions.com" },
        { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
        { name: "South Dakota", url: "https://freedominterventions.com/south-dakota" }
      ]} />
      
      <Navbar />
      <BreadcrumbNav items={[
        { name: "Service Areas", href: "/service-areas" },
        { name: "South Dakota", href: "/south-dakota" }
      ]} />
      
      <section className="pt-8 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">South Dakota Addiction Crisis</span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">South Dakota's Addiction Crisis: Professional Intervention Services</h1>
            <p className="text-lg text-muted-foreground mb-8">South Dakota's methamphetamine crisis demands professional intervention. Our experts help families across the Mount Rushmore State find treatment solutions.</p>
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
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">130</div>
              <p className="text-sm text-muted-foreground">Drug Overdose Deaths (2022)</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">90%</div>
              <p className="text-sm text-muted-foreground">Prepared Families, Better Outcomes</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">47K+</div>
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
                  <h2 className="text-2xl font-bold">South Dakota's Meth Emergency</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  South Dakota faces one of the nation's most severe methamphetamine crises. Meth is the primary drug threat, with law enforcement reporting it as a factor in over 50% of arrests statewide.
                </p>
                <p className="text-muted-foreground mb-4">
                  Fentanyl has also emerged as a growing concern, increasingly mixed with other drugs and driving rising overdose deaths. The combination of meth and fentanyl creates especially dangerous conditions.
                </p>
                <p className="text-muted-foreground">
                  South Dakota's rural nature means limited treatment resources, with many residents living hours from specialized care. Professional intervention helps bridge this gap.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-8 w-8 text-primary" />
                  <h2 className="text-2xl font-bold">Impact on South Dakota Families</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Approximately 47,000 South Dakotans struggle with substance use disorders. In small communities, addiction's impact is amplified—everyone knows someone affected.
                </p>
                <p className="text-muted-foreground mb-4">
                  Native American communities face disproportionate impacts, with overdose death rates significantly higher than the state average. Cultural considerations matter in effective intervention.
                </p>
                <p className="text-muted-foreground">
                  Many South Dakota families feel isolated in their struggle. Professional intervention provides both expertise and the emotional support families desperately need.
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
                  <h2 className="text-2xl font-bold">How We Help South Dakota Families</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Freedom Interventions serves families throughout South Dakota, from Sioux Falls to Rapid City, Aberdeen to the Pine Ridge Reservation. We understand South Dakota's unique challenges.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    Travel anywhere in South Dakota for in-person interventions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    Expertise in methamphetamine and polysubstance addiction
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    Connections to specialized treatment centers nationwide
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    Culturally sensitive approaches for diverse communities
                  </li>
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                  <h2 className="text-2xl font-bold">A Path Forward</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Recovery is possible, even from severe methamphetamine addiction. Professional intervention creates a moment of clarity that can lead to life-changing treatment.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our interventionists coordinate everything—from the intervention itself to treatment placement and transportation, even when that means traveling out of state for specialized care.
                </p>
                <p className="text-muted-foreground">
                  Don't let South Dakota's remote geography keep your family from getting help. We bring professional intervention to you, wherever you are.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Hope for South Dakota Families</h2>
          <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">No matter how remote your location, help is available. Our team serves families across South Dakota with compassion and expertise.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary"><Link to="/#booking"><Calendar className="mr-2 h-5 w-5" />Schedule Free Consultation</Link></Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"><a href="tel:541-838-6009"><Phone className="mr-2 h-5 w-5" />Call (541) 838-6009</a></Button>
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

      
      <LocationLinks currentLocation="South Dakota" locationType="state" />
      <Footer />
    </div>
  );
};

export default SouthDakota;