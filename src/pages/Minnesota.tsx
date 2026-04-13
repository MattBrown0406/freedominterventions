import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema, BreadcrumbSchema, ServiceAreaSchema } from "@/components/StructuredData";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const Minnesota = () => {
  const breadcrumbItems = [
    { name: "Service Areas", href: "/service-areas" },
    { name: "Minnesota", href: "/minnesota" }
  ];

  const breadcrumbSchemaItems = [
    { name: "Home", url: "https://freedominterventions.com" },
    { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
    { name: "Minnesota", url: "https://freedominterventions.com/minnesota" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Minnesota Addiction Intervention Services | Freedom Interventions"
        description="Professional addiction intervention services in Minnesota. Help your loved one recover from opioid, methamphetamine, and alcohol addiction. Serving Minneapolis, St. Paul, and all MN communities."
        canonical="https://freedominterventions.com/minnesota"
        keywords="Minnesota addiction intervention, Minneapolis drug intervention, St. Paul family intervention, opioid crisis Minnesota, addiction help MN"
        geoRegion="US-MN"
        geoPlacename="Minnesota"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Minnesota"
        url="https://freedominterventions.com/minnesota"
        description="Professional addiction intervention services in Minnesota. Help your loved one recover from opioid, methamphetamine, and alcohol addiction. Serving Minneapolis, St. Paul, and all MN communities."
      />
      <BreadcrumbSchema items={breadcrumbSchemaItems} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />
      
      <section className="pt-20 py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              Minnesota Addiction Crisis
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Minnesota's Addiction Crisis: Professional Intervention Services for Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Minnesota families face growing challenges with opioid and methamphetamine addiction. Professional interventionists provide proven strategies for lasting recovery.
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
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1,200+</div>
              <div className="text-sm text-muted-foreground">Annual Overdose Deaths</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">90%</div>
              <div className="text-sm text-muted-foreground">Prepared Families, Better Outcomes</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">250K+</div>
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
                  Minnesota's Drug Challenges
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Minnesota has experienced rising overdose deaths, with fentanyl and methamphetamine driving the increase. The Twin Cities and rural areas alike face significant challenges. Synthetic opioids have become the leading cause of overdose fatalities across the state, while methamphetamine continues to devastate communities from Duluth to Rochester.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The state's strong tradition of quality healthcare and treatment programs provides hope, but families often struggle to navigate the complex system of care options available to them. Professional intervention bridges this gap by providing expert guidance during the most critical moments.
              </p>
            </div>

            <div className="space-y-6 bg-muted/30 p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Professional Intervention Help
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Interventionists familiar with Minnesota's treatment landscape help families create effective plans, leveraging the state's quality treatment resources. Minnesota is home to some of the nation's most respected treatment centers, and a professional interventionist knows which programs best match each individual's unique needs.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Family-Centered Approach
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Intervention services include family education, treatment coordination, and aftercare support to help Minnesota families heal together. Addiction affects every member of the family system, and lasting recovery requires addressing the needs of everyone involved — not just the person struggling with substance use.
              </p>
            </div>

            <div className="space-y-6 bg-primary/5 p-8 rounded-lg border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Schedule Free Consultation
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Professional intervention gives Minnesota families the tools and guidance needed to help loved ones find lasting recovery. Whether your family is in the Twin Cities metro area, the Iron Range, or anywhere else in the state, help is available 24/7.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Hope for Minnesota Families
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-3xl mx-auto">
            Professional intervention services offer Minnesota families a proven path to help loved ones find recovery. Contact us today.
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


      <LocationLinks currentLocation="Minnesota" locationType="state" />
      <Footer />
    </div>
  );
};

export default Minnesota;
