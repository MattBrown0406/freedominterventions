import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const Oklahoma = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Oklahoma Addiction Intervention Services | Freedom Interventions"
        description="Professional intervention services for Oklahoma families. Expert interventionists help loved ones find treatment across the Sooner State. Meth and opioid crisis support."
        canonical="https://freedominterventions.com/oklahoma"
        keywords="Oklahoma addiction intervention, Oklahoma City intervention services, Tulsa drug intervention, Oklahoma opioid crisis, Oklahoma meth intervention"
        geoRegion="US-OK"
        geoPlacename="Oklahoma"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="Oklahoma City" state="OK" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
          { name: "Oklahoma", url: "https://freedominterventions.com/oklahoma" },
        ]}
      />
      <Navbar />
      <BreadcrumbNav items={[
        { name: "Service Areas", href: "/service-areas" },
        { name: "Oklahoma", href: "/oklahoma" },
      ]} />
      
      <section className="pt-8 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">Oklahoma Addiction Crisis</span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Oklahoma's Addiction Crisis: Professional Intervention Services</h1>
            <p className="text-lg text-muted-foreground mb-8">Oklahoma families face escalating meth and opioid challenges. Professional interventionists help find pathways to recovery throughout the Sooner State.</p>
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
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1,073</div>
              <p className="text-sm text-muted-foreground">Drug Overdose Deaths (2022)</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">90%</div>
              <p className="text-sm text-muted-foreground">Intervention Success Rate</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">260K+</div>
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
                  <h2 className="text-2xl font-bold">Oklahoma's Drug Crisis</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Oklahoma has experienced a 300% increase in overdose deaths since 2000. The state battles both a severe methamphetamine problem and a growing fentanyl crisis that has transformed the opioid epidemic.
                </p>
                <p className="text-muted-foreground mb-4">
                  Methamphetamine remains the most commonly reported drug in Oklahoma's drug seizures, while fentanyl deaths have increased over 600% since 2018. Many users are unaware their drugs contain fentanyl.
                </p>
                <p className="text-muted-foreground">
                  Rural Oklahoma communities face particular challenges with limited treatment access, while urban areas like Oklahoma City and Tulsa see concentrated drug trafficking and high overdose rates.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-8 w-8 text-primary" />
                  <h2 className="text-2xl font-bold">Impact on Oklahoma Families</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Over 260,000 Oklahomans struggle with substance use disorders. The crisis affects families across every demographic—from Oklahoma City professionals to rural farming communities.
                </p>
                <p className="text-muted-foreground mb-4">
                  Oklahoma's strong family and faith-based culture means addiction often carries intense shame. Many families suffer in silence, unsure how to help their loved one without expert guidance.
                </p>
                <p className="text-muted-foreground">
                  Professional intervention provides the structure, expertise, and compassion Oklahoma families need to break through denial and guide loved ones toward treatment.
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
                  <h2 className="text-2xl font-bold">How We Help Oklahoma Families</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  Freedom Interventions serves families throughout Oklahoma, from Oklahoma City to Tulsa, Norman to Lawton. We understand Oklahoma's culture and values.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    Experienced interventionists who travel statewide
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    Expertise in both methamphetamine and opioid intervention
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
                  Recovery is possible for your loved one. Thousands of Oklahomans are living in long-term recovery, having rebuilt their lives, careers, and relationships.
                </p>
                <p className="text-muted-foreground mb-4">
                  Professional intervention creates a breakthrough moment—a structured opportunity for your loved one to accept help with immediate treatment placement available.
                </p>
                <p className="text-muted-foreground">
                  Don't wait for a tragedy to force action. Every day of active addiction carries risk. One call can start your family's journey toward healing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Hope for Oklahoma Families</h2>
          <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">Families across Oklahoma have found hope through professional intervention. Your family's breakthrough moment is one call away.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary"><Link to="/#booking"><Calendar className="mr-2 h-5 w-5" />Schedule Free Consultation</Link></Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"><a href="tel:541-838-6009"><Phone className="mr-2 h-5 w-5" />Call (541) 838-6009</a></Button>
          </div>
        </div>
      </section>

      <LocationLinks currentLocation="Oklahoma" locationType="state" />
      <Footer />
    </div>
  );
};

export default Oklahoma;