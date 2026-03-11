import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema, LocalBusinessSchema, BreadcrumbSchema } from "@/components/StructuredData";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const Mississippi = () => {
  const breadcrumbItems = [
    { name: "Service Areas", href: "/service-areas" },
    { name: "Mississippi", href: "/mississippi" }
  ];

  const breadcrumbSchemaItems = [
    { name: "Home", url: "https://freedominterventions.com" },
    { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
    { name: "Mississippi", url: "https://freedominterventions.com/mississippi" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Mississippi Addiction Intervention Services | Freedom Interventions"
        description="Professional addiction intervention services in Mississippi. Help your loved one recover from opioid, methamphetamine, and alcohol addiction. Serving Jackson, Gulfport, and all MS communities."
        canonical="https://freedominterventions.com/mississippi"
        keywords="Mississippi addiction intervention, Jackson drug intervention, Gulfport family intervention, opioid crisis Mississippi, addiction help MS"
        geoRegion="US-MS"
        geoPlacename="Mississippi"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="Jackson" state="MS" />
      <BreadcrumbSchema items={breadcrumbSchemaItems} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />
      
      <section className="pt-20 py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              Mississippi Addiction Crisis
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Mississippi's Addiction Crisis: Professional Intervention Services for Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Mississippi families face growing challenges with opioid and methamphetamine addiction. Professional interventionists provide proven strategies for recovery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/#booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Free Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:541-838-6009">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (541) 838-6009
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">600+</div>
              <div className="text-sm text-muted-foreground">Annual Overdose Deaths</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">90%</div>
              <div className="text-sm text-muted-foreground">Intervention Success Rate</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">150K+</div>
              <div className="text-sm text-muted-foreground">Residents Affected</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Mississippi's Drug Challenges
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Mississippi has seen rising overdose deaths as fentanyl infiltrates the drug supply. Rural communities face particular challenges accessing treatment resources. The state's opioid prescription rate remains among the highest in the nation, creating a pipeline from prescription painkillers to illicit street drugs.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Methamphetamine also continues to pose a significant threat across the state, particularly in rural areas where law enforcement and treatment resources are stretched thin. Families in these communities often feel isolated and unsure where to turn for help.
              </p>
            </div>

            <div className="space-y-6 bg-muted/30 p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Professional Intervention Support
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Interventionists help Mississippi families create effective plans and connect with quality treatment programs throughout the state and region. A professional interventionist brings expertise in navigating both in-state and out-of-state treatment options, ensuring your loved one receives the level of care they need.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Complete Family Support
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                From intervention through aftercare, professional services support the entire recovery journey for Mississippi families. This includes family education about addiction as a disease, boundary-setting guidance, and ongoing support as your loved one transitions through treatment and into sustained recovery.
              </p>
            </div>

            <div className="space-y-6 bg-primary/5 p-8 rounded-lg border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Get Help Today
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Professional intervention provides Mississippi families with proven strategies for helping loved ones find recovery. Distance and location are never barriers — we travel to families throughout the state and coordinate treatment placement nationwide.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Mississippi Families Deserve Hope
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-3xl mx-auto">
            Professional intervention services have helped countless Mississippi families find the path to recovery. Take the first step today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/#booking">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Free Consultation
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <a href="tel:541-838-6009">
                <Phone className="mr-2 h-5 w-5" />
                Call (541) 838-6009
              </a>
            </Button>
          </div>
        </div>
      </section>

      <LocationLinks currentLocation="Mississippi" locationType="state" />
      <Footer />
    </div>
  );
};

export default Mississippi;