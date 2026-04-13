import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema, BreadcrumbSchema, ServiceAreaSchema } from "@/components/StructuredData";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const Missouri = () => {
  const breadcrumbItems = [
    { name: "Service Areas", href: "/service-areas" },
    { name: "Missouri", href: "/missouri" }
  ];

  const breadcrumbSchemaItems = [
    { name: "Home", url: "https://freedominterventions.com" },
    { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
    { name: "Missouri", url: "https://freedominterventions.com/missouri" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Missouri Addiction Intervention Services | Freedom Interventions"
        description="Professional addiction intervention services in Missouri. Help your loved one recover from opioid, methamphetamine, and fentanyl addiction. Serving St. Louis, Kansas City, and all MO communities."
        canonical="https://freedominterventions.com/missouri"
        keywords="Missouri addiction intervention, St. Louis drug intervention, Kansas City family intervention, opioid crisis Missouri, addiction help MO"
        geoRegion="US-MO"
        geoPlacename="Missouri"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Missouri"
        url="https://freedominterventions.com/missouri"
        description="Professional addiction intervention services in Missouri. Help your loved one recover from opioid, methamphetamine, and fentanyl addiction. Serving St. Louis, Kansas City, and all MO communities."
      />
      <BreadcrumbSchema items={breadcrumbSchemaItems} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />
      
      <section className="pt-20 py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              Missouri Addiction Crisis
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Missouri's Addiction Crisis: Professional Intervention Services for Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Missouri families face significant challenges with opioid and methamphetamine addiction. Professional interventionists help guide loved ones toward recovery.
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
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1,800+</div>
              <div className="text-sm text-muted-foreground">Annual Overdose Deaths</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">90%</div>
              <div className="text-sm text-muted-foreground">Prepared Families, Better Outcomes</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">300K+</div>
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
                  Missouri's Growing Crisis
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Missouri has been significantly impacted by the opioid epidemic, with St. Louis and Kansas City areas seeing particularly high overdose rates. Fentanyl and methamphetamine drive the crisis. The state consistently ranks among the top states for overdose death rates, and the I-70 corridor has become a major drug trafficking route.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Rural Missouri communities face additional challenges with limited access to treatment facilities and long wait times for available beds. Professional intervention helps families cut through these barriers and find immediate solutions.
              </p>
            </div>

            <div className="space-y-6 bg-muted/30 p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Statewide Intervention Services
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Professional interventionists serve Missouri families across the state, connecting them with quality treatment resources in the Midwest region. Whether your family is in Springfield, Columbia, or any community in between, a professional interventionist can coordinate the entire process from assessment through treatment placement.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Comprehensive Family Support
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Intervention services include family education, treatment coordination, and aftercare planning for lasting recovery success. Families learn how to set healthy boundaries, stop enabling behaviors, and create an environment that supports long-term sobriety.
              </p>
            </div>

            <div className="space-y-6 bg-primary/5 p-8 rounded-lg border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Start the Recovery Journey
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Professional intervention provides Missouri families with the structure and expertise needed to help loved ones break free from addiction. The first step is always a free, confidential consultation where we assess your situation and develop a personalized plan.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Hope for Missouri Families
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-3xl mx-auto">
            Professional intervention services have helped countless Missouri families find a way forward. Take the first step today.
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


      <LocationLinks currentLocation="Missouri" locationType="state" />
      <Footer />
    </div>
  );
};

export default Missouri;