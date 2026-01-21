import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const Wyoming = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Wyoming Addiction Intervention Services | Freedom Interventions"
        description="Professional intervention services for Wyoming families. Expert interventionists help loved ones find treatment across the Equality State. Fentanyl and methamphetamine crisis support."
        canonical="https://freedominterventions.com/wyoming"
        keywords="Wyoming intervention, addiction help WY, interventionist Cheyenne, drug intervention Casper, Laramie addiction help, Wyoming fentanyl crisis"
        geoRegion="US-WY"
        geoPlacename="Wyoming"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="Wyoming" state="WY" />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://freedominterventions.com" },
        { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
        { name: "Wyoming", url: "https://freedominterventions.com/wyoming" }
      ]} />
      
      <Navbar />
      <BreadcrumbNav items={[
        { name: "Service Areas", href: "/service-areas" },
        { name: "Wyoming", href: "/wyoming" }
      ]} />
      
      <section className="pt-8 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">Wyoming Addiction Crisis</span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Wyoming's Addiction Crisis: Professional Intervention Services</h1>
            <p className="text-lg text-muted-foreground mb-8">Wyoming's rural communities face unique addiction challenges. Professional interventionists help families navigate treatment options across the Equality State.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg"><Link to="/#booking"><Calendar className="mr-2 h-5 w-5" />Schedule Free Consultation</Link></Button>
              <Button asChild variant="outline" size="lg"><a href="tel:503-836-2136"><Phone className="mr-2 h-5 w-5" />Call (503) 836-2136</a></Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">142</div>
              <p className="text-sm text-muted-foreground">Drug Overdose Deaths (2022)</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">90%</div>
              <p className="text-sm text-muted-foreground">Intervention Success Rate</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">37K+</div>
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
                  <h2 className="text-2xl font-bold">Wyoming's Rural Addiction Challenge</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Wyoming's vast geography and sparse population create unique barriers to addiction treatment. With only 23 counties spread across nearly 100,000 square miles, many residents live hours from the nearest treatment facility.
                </p>
                <p className="text-muted-foreground mb-4">
                  Methamphetamine remains the primary drug threat, while fentanyl deaths have increased dramatically. The state's overdose death rate has risen 45% since 2019, with synthetic opioids driving much of this increase.
                </p>
                <p className="text-muted-foreground">
                  Rural isolation, limited mental health resources, and cultural stigma around seeking help make professional intervention crucial for Wyoming families facing addiction.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-8 w-8 text-primary" />
                  <h2 className="text-2xl font-bold">Impact on Wyoming Families</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  In tight-knit Wyoming communities, addiction affects entire families and networks. The stigma in small towns can prevent families from seeking help, while geographic isolation limits treatment options.
                </p>
                <p className="text-muted-foreground mb-4">
                  Many Wyoming families struggle with multi-generational addiction patterns, complicated by limited access to specialized treatment and the challenges of maintaining recovery in rural areas.
                </p>
                <p className="text-muted-foreground">
                  Professional interventionists understand Wyoming's unique culture and can help families navigate both the emotional and logistical challenges of getting a loved one into treatment.
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
                  <h2 className="text-2xl font-bold">How We Help Wyoming Families</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Freedom Interventions provides comprehensive support for families throughout Wyoming, from Cheyenne to Casper, Laramie to Gillette. We understand the unique challenges of rural intervention.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    Travel anywhere in Wyoming for in-person interventions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    Connect families with appropriate treatment centers nationwide
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    Coordinate transportation to out-of-state facilities when needed
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    Provide ongoing family support throughout the recovery process
                  </li>
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                  <h2 className="text-2xl font-bold">A Path Forward</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Despite Wyoming's challenges, recovery is possible. Professional intervention creates a structured opportunity for your loved one to accept help, with immediate access to treatment.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our interventionists have helped families across Wyoming's most remote communities find hope. We handle the logistics so you can focus on your loved one's healing.
                </p>
                <p className="text-muted-foreground">
                  Don't let distance or isolation keep your family from getting help. One call can start the journey toward recovery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Hope for Wyoming Families</h2>
          <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">No matter where you are in Wyoming, help is available. Our team travels statewide to support families facing addiction.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary"><Link to="/#booking"><Calendar className="mr-2 h-5 w-5" />Schedule Free Consultation</Link></Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"><a href="tel:503-836-2136"><Phone className="mr-2 h-5 w-5" />Call (503) 836-2136</a></Button>
          </div>
        </div>
      </section>
      
      <LocationLinks currentLocation="Wyoming" locationType="state" />
      <Footer />
    </div>
  );
};

export default Wyoming;