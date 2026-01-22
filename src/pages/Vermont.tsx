import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const Vermont = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Vermont Addiction Intervention Services | Freedom Interventions"
        description="Vermont faces rising overdose deaths with fentanyl driving the crisis. Professional interventionists help Green Mountain State families guide loved ones toward recovery."
        canonical="https://freedominterventions.com/vermont"
        keywords="Vermont intervention, addiction help VT, interventionist Burlington, drug intervention Vermont, opioid crisis Vermont"
        geoRegion="US-VT"
        geoPlacename="Vermont"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="Burlington" state="VT" />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://freedominterventions.com" },
        { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
        { name: "Vermont", url: "https://freedominterventions.com/vermont" }
      ]} />
      
      <Navbar />
      <BreadcrumbNav items={[
        { name: "Service Areas", href: "/service-areas" },
        { name: "Vermont", href: "/vermont" }
      ]} />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 max-w-4xl">
            Vermont's Addiction Crisis: Professional Intervention Services for Green Mountain Families
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-8">
            Despite its small population, Vermont faces a significant addiction crisis with overdose rates above the national average. Professional interventionists provide the expertise families need to navigate this challenging landscape.
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
              <div className="text-3xl font-bold text-foreground mb-2">234</div>
              <div className="text-sm text-muted-foreground">Overdose Deaths (2022)</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-primary/10 border border-primary/20">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">36.4</div>
              <div className="text-sm text-muted-foreground">Deaths per 100K</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-secondary/50 border border-border">
              <Users className="h-8 w-8 text-secondary-foreground mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">45K+</div>
              <div className="text-sm text-muted-foreground">Residents with SUD</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-accent/50 border border-accent">
              <Heart className="h-8 w-8 text-accent-foreground mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">93%</div>
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
                Understanding Vermont's Addiction Crisis
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Vermont confronts a disproportionate addiction burden for its small population. With a 2022 overdose death rate of 36.4 per 100,000 residents—70% higher than the national average—the Green Mountain State faces an acute crisis that touches nearly every community.
                </p>
                <p>
                  Opioids, particularly fentanyl, drive the majority of overdose deaths. The synthetic opioid has infiltrated Vermont's drug supply, making heroin and counterfeit pills exponentially more dangerous. Cocaine-related deaths have also increased, often involving fentanyl contamination.
                </p>
                <p>
                  Vermont's rural character presents unique challenges. Limited transportation, geographic isolation, and sparse treatment infrastructure mean many residents struggle to access care. Professional interventionists help families navigate these barriers.
                </p>
              </div>
            </div>

            {/* Treatment Landscape */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Vermont's Progressive Treatment Approach
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Vermont has implemented "hub and spoke" treatment model, integrating medication-assisted treatment throughout the healthcare system. This innovative approach has expanded access to buprenorphine and methadone, helping many Vermonters manage opioid use disorder.
                </p>
                <p>
                  Despite these advances, significant gaps remain. Residential treatment capacity is limited, and wait times can be substantial. Many individuals need the structure of inpatient care before transitioning to outpatient services—and getting them to agree to treatment remains the critical first step.
                </p>
              </div>
            </div>

            {/* Family Impact */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                How Addiction Impacts Vermont Families
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  In Vermont's close-knit communities, addiction's impact ripples far beyond the individual. Families endure the constant stress of watching loved ones struggle, often depleting emotional and financial resources in attempts to help that may inadvertently enable continued use.
                </p>
                <p>
                  Many Vermont families have tried everything they know—conversations, ultimatums, even temporary estrangement—without success. Professional interventionists provide the structured, evidence-based approach that transforms these difficult situations into opportunities for recovery.
                </p>
              </div>
            </div>

            {/* Role of Interventionists */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                How Professional Interventionists Help Vermont Families
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Interventionists bring specialized expertise to Vermont's unique situation. They understand the state's treatment landscape, including the hub and spoke model, residential programs in Burlington and beyond, and connections to specialized facilities throughout New England.
                </p>
                <p>
                  The intervention process begins with comprehensive assessment to determine appropriate care level. The interventionist then prepares the family for a structured intervention—coaching on communication, establishing boundaries, and arranging immediate treatment placement when the loved one agrees.
                </p>
                <p>
                  With professional guidance, interventions achieve 80-90% treatment acceptance rates, compared to 20-30% for family-led attempts. This dramatic improvement can mean the difference between continued crisis and the beginning of recovery.
                </p>
              </div>
            </div>

            {/* Why Seek Help */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Why Seek Professional Intervention in Vermont
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Rural Expertise</h3>
                    <p className="text-muted-foreground">Experience serving families throughout Vermont, including remote communities with limited local resources.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Treatment Navigation</h3>
                    <p className="text-muted-foreground">Deep knowledge of Vermont's hub and spoke model and treatment options throughout New England.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Opioid Crisis Response</h3>
                    <p className="text-muted-foreground">Specialized understanding of fentanyl dangers and appropriate medical interventions for safe detox.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Community Sensitivity</h3>
                    <p className="text-muted-foreground">Respect for Vermont's tight-knit communities while maintaining necessary confidentiality.</p>
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
                Hope for Vermont Families
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Vermont's addiction crisis is serious, but recovery is possible. Professional intervention provides families with the expertise and structure needed to break through denial and guide loved ones into treatment. The compassionate, evidence-based approach preserves relationships while facilitating life-saving change.
                </p>
                <p>
                  If your family is struggling with a loved one's addiction, you don't have to face this crisis alone. Contact us today for a confidential consultation to learn how intervention can help your Vermont family find healing.
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
            Take the First Step for Your Vermont Family
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
      
      <LocationLinks currentLocation="Vermont" locationType="state" />
      <Footer />
    </div>
  );
};

export default Vermont;
