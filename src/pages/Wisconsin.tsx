import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const Wisconsin = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Wisconsin Addiction Intervention Services | Freedom Interventions"
        description="Professional intervention services for Wisconsin families. Expert interventionists help loved ones find treatment across the Badger State. Opioid and alcohol crisis support."
        canonical="https://freedominterventions.com/wisconsin"
        keywords="Wisconsin intervention, addiction help WI, interventionist Milwaukee, drug intervention Madison, Green Bay addiction help, Wisconsin opioid crisis"
        geoRegion="US-WI"
        geoPlacename="Wisconsin"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="Wisconsin" state="WI" />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://freedominterventions.com" },
        { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
        { name: "Wisconsin", url: "https://freedominterventions.com/wisconsin" }
      ]} />
      
      <Navbar />
      <BreadcrumbNav items={[
        { name: "Service Areas", href: "/service-areas" },
        { name: "Wisconsin", href: "/wisconsin" }
      ]} />
      
      <section className="pt-8 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">Wisconsin Addiction Crisis</span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Wisconsin's Addiction Crisis: Professional Intervention Services</h1>
            <p className="text-lg text-muted-foreground mb-8">Wisconsin faces a dual crisis of opioids and alcohol addiction. Professional interventionists help families find treatment solutions across the Badger State.</p>
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
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1,627</div>
              <p className="text-sm text-muted-foreground">Drug Overdose Deaths (2022)</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">90%</div>
              <p className="text-sm text-muted-foreground">Intervention Success Rate</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">350K+</div>
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
                  <h2 className="text-2xl font-bold">Wisconsin's Dual Addiction Crisis</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Wisconsin faces unique challenges with both opioid addiction and one of the nation's highest rates of alcohol abuse. The state consistently ranks among the top for binge drinking, with alcohol-related deaths exceeding 3,000 annually.
                </p>
                <p className="text-muted-foreground mb-4">
                  Simultaneously, fentanyl has transformed the opioid crisis. Overdose deaths have increased 400% since 2015, with synthetic opioids now involved in over 70% of fatal overdoses across the state.
                </p>
                <p className="text-muted-foreground">
                  From Milwaukee to Madison, rural communities to urban centers, addiction has touched every corner of Wisconsin. Professional intervention offers families a proven path forward.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-8 w-8 text-primary" />
                  <h2 className="text-2xl font-bold">Impact on Wisconsin Families</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Over 350,000 Wisconsinites struggle with substance use disorders. Many families normalize heavy drinking due to cultural acceptance, making it harder to recognize when use crosses into addiction.
                </p>
                <p className="text-muted-foreground mb-4">
                  Wisconsin's strong family and community ties can be both a strength and a challenge. While support networks exist, enabling behaviors often develop as families try to protect their loved ones.
                </p>
                <p className="text-muted-foreground">
                  Professional intervention helps families break these patterns, set healthy boundaries, and guide their loved one toward treatment with compassion and clarity.
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
                  <h2 className="text-2xl font-bold">How We Help Wisconsin Families</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Freedom Interventions serves families throughout Wisconsin, from the shores of Lake Michigan to the forests of the Northwoods. We understand Wisconsin's culture and communities.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    Specialized expertise in both alcohol and opioid intervention
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    In-person interventions available throughout Wisconsin
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    Connections to quality treatment centers matched to individual needs
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    Family education and ongoing recovery support
                  </li>
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                  <h2 className="text-2xl font-bold">A Path Forward</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Recovery is possible for your loved one. Professional intervention creates a breakthrough moment where change becomes possible, supported by immediate access to appropriate treatment.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our interventionists have helped families across Wisconsin find hope. Whether the struggle is alcohol, opioids, or both, we provide the expertise and compassion needed.
                </p>
                <p className="text-muted-foreground">
                  Don't let another day pass. The sooner you act, the more options your loved one will have for recovery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Hope for Wisconsin Families</h2>
          <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">From Milwaukee to Madison, families across Wisconsin have found hope through professional intervention. Your family can too.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary"><Link to="/#booking"><Calendar className="mr-2 h-5 w-5" />Schedule Free Consultation</Link></Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"><a href="tel:503-836-2136"><Phone className="mr-2 h-5 w-5" />Call (503) 836-2136</a></Button>
          </div>
        </div>
      </section>
      
      <LocationLinks currentLocation="Wisconsin" locationType="state" />
      <Footer />
    </div>
  );
};

export default Wisconsin;