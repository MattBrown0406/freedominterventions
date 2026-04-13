import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema, LocalBusinessSchema, BreadcrumbSchema } from "@/components/StructuredData";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";

const PrinceEdwardIsland = () => {
  const breadcrumbItems = [
    { name: "Service Areas", href: "/service-areas" },
    { name: "Prince Edward Island", href: "/prince-edward-island" }
  ];

  const breadcrumbSchemaItems = [
    { name: "Home", url: "https://freedominterventions.com" },
    { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
    { name: "Prince Edward Island", url: "https://freedominterventions.com/prince-edward-island" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Prince Edward Island Addiction Intervention Services | Freedom Interventions"
        description="Professional addiction intervention services in Prince Edward Island, Canada. Help your loved one find recovery from opioid and drug addiction. Serving Charlottetown and all PEI communities."
        canonical="https://freedominterventions.com/prince-edward-island"
        keywords="PEI addiction intervention, Charlottetown drug intervention, Prince Edward Island family intervention, opioid crisis PEI, addiction help PEI Canada"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="Prince Edward Island" state="Canada" />
      <BreadcrumbSchema items={breadcrumbSchemaItems} />
      
      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />
      
      <section className="pt-20 py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              Prince Edward Island Addiction Crisis
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Prince Edward Island's Addiction Crisis: How Professional Interventionists Offer Families a Lifeline
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Even Canada's smallest province is not immune to the opioid crisis. Prince Edward Island families face addiction challenges with limited local resources, making professional intervention support essential.
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

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Addiction on Prince Edward Island
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Despite its small size, Prince Edward Island faces the same addiction challenges as the rest of Canada. Opioid-related overdoses have increased significantly, and the province's limited treatment infrastructure means many families struggle to find appropriate care for their loved ones close to home.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Alcohol addiction remains the most common substance use disorder on PEI, often overshadowed by the opioid crisis but equally devastating to families. The island's tight-knit communities can make seeking help feel difficult due to concerns about stigma and privacy — but professional intervention provides a confidential, structured path forward.
              </p>
            </div>

            <div className="space-y-6 bg-muted/30 p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Why PEI Families Choose Professional Intervention
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                With limited local treatment options, PEI families often need to look beyond the island for the right program. A professional interventionist has the expertise and connections to identify treatment centers across Canada that match your loved one's specific needs — whether they require medical detox, residential treatment, or specialized care for co-occurring mental health conditions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The interventionist handles all logistics: securing a treatment bed, coordinating travel from the island, managing insurance and payment details, and providing continuous support from the moment you call through your loved one's transition into recovery.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Supporting Island Families Through Recovery
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Living with a loved one's addiction in a small community adds unique pressures. Everyone knows everyone, and the fear of judgment can keep families suffering in silence for years. Professional intervention provides a confidential, dignified process that protects your family's privacy while taking decisive action to help your loved one move toward treatment.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The intervention process also helps family members begin their own healing journey. Through education, boundary-setting guidance, and connections to support resources, family members learn how to care for themselves while supporting their loved one's recovery.
              </p>
            </div>

            <div className="space-y-6 bg-primary/5 p-8 rounded-lg border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Help Is Just a Phone Call Away
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                PEI families don't have to navigate addiction alone. A free, confidential consultation is available 24/7 to help you understand your options, assess your situation, and start building a plan that gives your loved one the best possible chance at recovery.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            A Path Forward for PEI Families
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-3xl mx-auto">
            Professional intervention offers a structured, compassionate path to treatment. Contact us today for a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/#booking">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Free Consultation
              </Link>
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


      <LocationLinks currentLocation="Prince Edward Island" locationType="province" />
      <Footer />
    </div>
  );
};

export default PrinceEdwardIsland;