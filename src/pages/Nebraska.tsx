import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema, LocalBusinessSchema, BreadcrumbSchema } from "@/components/StructuredData";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const Nebraska = () => {
  const breadcrumbItems = [
    { name: "Service Areas", href: "/service-areas" },
    { name: "Nebraska", href: "/nebraska" }
  ];

  const breadcrumbSchemaItems = [
    { name: "Home", url: "https://freedominterventions.com" },
    { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
    { name: "Nebraska", url: "https://freedominterventions.com/nebraska" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Nebraska Addiction Intervention Services | Freedom Interventions"
        description="Professional addiction intervention services in Nebraska. Help your loved one recover from methamphetamine, opioid, and alcohol addiction. Serving Omaha, Lincoln, and all NE communities."
        canonical="https://freedominterventions.com/nebraska"
        keywords="Nebraska addiction intervention, Omaha drug intervention, Lincoln family intervention, meth crisis Nebraska, addiction help NE"
        geoRegion="US-NE"
        geoPlacename="Nebraska"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="Omaha" state="NE" />
      <BreadcrumbSchema items={breadcrumbSchemaItems} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />
      
      <section className="pt-20 py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              Nebraska Addiction Crisis
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Nebraska's Addiction Crisis: Professional Intervention Services for Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Nebraska families face growing challenges with methamphetamine and opioid addiction. Professional interventionists provide proven strategies for recovery.
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
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">300+</div>
              <div className="text-sm text-muted-foreground">Annual Overdose Deaths</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">90%</div>
              <div className="text-sm text-muted-foreground">Prepared Families, Better Outcomes</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">100K+</div>
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
                  Nebraska's Drug Challenges
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Nebraska has seen rising overdose deaths, with methamphetamine and fentanyl driving the increase. Both Omaha and rural communities face significant challenges. The state's position along major interstate corridors makes it vulnerable to drug trafficking, and synthetic opioids have dramatically increased the danger of the street drug supply.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Alcohol addiction also remains a persistent challenge across Nebraska, often overlooked because of its legal status and cultural acceptance. Many families don't recognize the severity of alcohol use disorder until a crisis forces the issue.
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
                Professional interventionists serve Nebraska families across the state, connecting them with quality treatment resources throughout the Midwest. With deep knowledge of regional treatment options, interventionists match each individual with the program best suited to their specific substance use history, mental health needs, and personal circumstances.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Family-Centered Care
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Intervention services include family education, treatment coordination, and ongoing support to help Nebraska families heal together. Addiction is a family disease, and professional intervention addresses the entire family system — helping everyone involved move from crisis to recovery.
              </p>
            </div>

            <div className="space-y-6 bg-primary/5 p-8 rounded-lg border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Start the Recovery Process
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Professional intervention gives Nebraska families the tools and guidance needed to help loved ones find lasting recovery. A free, confidential phone consultation is your first step toward getting your family the help it needs.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Hope for Nebraska Families
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-3xl mx-auto">
            Professional intervention services offer Nebraska families a proven path to help loved ones find recovery. Contact us today.
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


      <LocationLinks currentLocation="Nebraska" locationType="state" />
      <Footer />
    </div>
  );
};

export default Nebraska;