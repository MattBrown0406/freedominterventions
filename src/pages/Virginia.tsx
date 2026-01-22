import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const Virginia = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Virginia Addiction Intervention Services | Freedom Interventions"
        description="Professional intervention services for Virginia families. Expert interventionists help loved ones find treatment across the Commonwealth. Fentanyl crisis support available."
        canonical="https://freedominterventions.com/virginia"
        keywords="Virginia intervention, addiction help VA, interventionist Richmond, drug intervention Virginia Beach, Norfolk addiction help, Virginia fentanyl crisis"
        geoRegion="US-VA"
        geoPlacename="Virginia"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="Virginia" state="VA" />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://freedominterventions.com" },
        { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
        { name: "Virginia", url: "https://freedominterventions.com/virginia" }
      ]} />
      
      <Navbar />
      <BreadcrumbNav items={[
        { name: "Service Areas", href: "/service-areas" },
        { name: "Virginia", href: "/virginia" }
      ]} />
      
      <section className="pt-8 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">Virginia Addiction Crisis</span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Virginia's Addiction Crisis: Professional Intervention Services</h1>
            <p className="text-lg text-muted-foreground mb-8">Virginia families face a devastating fentanyl crisis. Professional interventionists help loved ones find life-saving treatment across the Commonwealth.</p>
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
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">2,490</div>
              <p className="text-sm text-muted-foreground">Drug Overdose Deaths (2022)</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">90%</div>
              <p className="text-sm text-muted-foreground">Intervention Success Rate</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500K+</div>
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
                  <h2 className="text-2xl font-bold">Virginia's Fentanyl Emergency</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Virginia has experienced a 1,300% increase in fentanyl-related deaths since 2015. The Commonwealth now sees nearly 2,500 overdose deaths annually, with fentanyl involved in over 80% of cases.
                </p>
                <p className="text-muted-foreground mb-4">
                  The crisis affects all regions—from Northern Virginia's suburbs to Southwest Virginia's Appalachian communities. No demographic has been spared, with deaths increasing across all age groups and backgrounds.
                </p>
                <p className="text-muted-foreground">
                  Virginia's proximity to major drug trafficking routes has intensified the crisis, making professional intervention more critical than ever for families seeking to save their loved ones.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-8 w-8 text-primary" />
                  <h2 className="text-2xl font-bold">Impact on Virginia Families</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Over 500,000 Virginians struggle with substance use disorders. Behind each statistic is a family desperate for answers, watching their loved one spiral while feeling powerless to help.
                </p>
                <p className="text-muted-foreground mb-4">
                  Many Virginia families have tried everything—conversations, ultimatums, treatment programs—only to face repeated relapses. The emotional and financial toll can be devastating.
                </p>
                <p className="text-muted-foreground">
                  Professional intervention provides a structured, effective approach that dramatically increases the likelihood of treatment acceptance and long-term recovery success.
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
                  <h2 className="text-2xl font-bold">How We Help Virginia Families</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Freedom Interventions serves families throughout Virginia, from Richmond to Virginia Beach, Northern Virginia to the Blue Ridge Mountains. We understand the Commonwealth's diverse communities.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    Experienced interventionists who travel throughout Virginia
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    Connections to top treatment centers matched to individual needs
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    Insurance verification and financial planning assistance
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    Ongoing family support and education throughout recovery
                  </li>
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                  <h2 className="text-2xl font-bold">A Path Forward</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Recovery is possible, even in the midst of Virginia's crisis. Every day, families across the Commonwealth take the courageous step of seeking professional help—and see their loved ones choose life.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our proven intervention methods have helped countless Virginia families. We provide the expertise, compassion, and immediate action needed to break through denial and resistance.
                </p>
                <p className="text-muted-foreground">
                  Don't wait for the crisis to worsen. With fentanyl's deadly potency, every day matters. One call can be the turning point your family needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Hope for Virginia Families</h2>
          <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">Professional intervention has saved thousands of lives across Virginia. Your family's story can have a different ending.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary"><Link to="/#booking"><Calendar className="mr-2 h-5 w-5" />Schedule Free Consultation</Link></Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"><a href="tel:503-836-2136"><Phone className="mr-2 h-5 w-5" />Call (503) 836-2136</a></Button>
          </div>
        </div>
      </section>
      
      <LocationLinks currentLocation="Virginia" locationType="state" />
      <Footer />
    </div>
  );
};

export default Virginia;