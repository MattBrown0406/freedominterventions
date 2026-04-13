import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema, BreadcrumbSchema, ServiceAreaSchema } from "@/components/StructuredData";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";

const Manitoba = () => {
  const breadcrumbItems = [
    { name: "Service Areas", href: "/service-areas" },
    { name: "Manitoba", href: "/manitoba" }
  ];

  const breadcrumbSchemaItems = [
    { name: "Home", url: "https://freedominterventions.com" },
    { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
    { name: "Manitoba", url: "https://freedominterventions.com/manitoba" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Manitoba Addiction Intervention Services | Freedom Interventions"
        description="Professional addiction intervention services in Manitoba, Canada. Help your loved one find recovery from opioid and drug addiction. Serving Winnipeg and all Manitoba communities."
        canonical="https://freedominterventions.com/manitoba"
        keywords="Manitoba addiction intervention, Winnipeg drug intervention, Manitoba family intervention, opioid crisis Manitoba, addiction help Manitoba Canada"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Manitoba"
        url="https://freedominterventions.com/manitoba"
        description="Professional addiction intervention services in Manitoba, Canada. Help your loved one find recovery from opioid and drug addiction. Serving Winnipeg and all Manitoba communities."
        country="CA"
      />
      <BreadcrumbSchema items={breadcrumbSchemaItems} />
      
      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />
      
      <section className="pt-20 py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              Manitoba Addiction Crisis
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Manitoba's Addiction Crisis: How Professional Interventionists Offer Families a Lifeline
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Manitoba has experienced a surge in opioid-related deaths, with Winnipeg and surrounding communities hit particularly hard. Families across the province struggle to find help as the toxic drug supply claims more lives each year.
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
                  The Scope of Manitoba's Addiction Crisis
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Manitoba has seen a dramatic increase in substance-related deaths over the past several years. Winnipeg's inner city has been especially hard hit, with fentanyl and methamphetamine dominating the illicit drug supply. The toxic drug crisis has spread beyond urban centers into Brandon, Thompson, and rural communities throughout the province.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Indigenous communities in Manitoba face disproportionately high rates of substance use disorder, compounded by systemic barriers to treatment access and historical trauma. Families in these communities deserve culturally sensitive support and professional guidance through the intervention and recovery process.
              </p>
            </div>

            <div className="space-y-6 bg-muted/30 p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  How Professional Intervention Helps Manitoba Families
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                A professional interventionist brings structure, expertise, and compassion to one of the most difficult conversations a family can have. For Manitoba families, this means having someone who understands addiction as a medical disease — not a moral failing — and who can guide the family through a proven process designed to motivate their loved one to accept treatment.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Interventionists coordinate every aspect of the process: preparing family members, identifying appropriate treatment programs, arranging travel logistics, and providing ongoing support throughout the recovery journey. Whether your loved one needs detox, residential treatment, or a specialized program for co-occurring mental health conditions, a professional interventionist ensures the right level of care is in place before the intervention begins.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Supporting the Whole Family
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Addiction doesn't just affect the person using substances — it impacts every member of the family. Professional intervention services include education about the disease of addiction, guidance on setting healthy boundaries, and support for family members dealing with their own trauma, codependency, and burnout.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Manitoba families often try everything they can think of before reaching out for professional help: pleading, threatening, bargaining, and monitoring. When these approaches don't work, an interventionist provides a structured alternative that addresses the root issues and creates real accountability for change.
              </p>
            </div>

            <div className="space-y-6 bg-primary/5 p-8 rounded-lg border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Schedule Free Consultation Today
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                If your Manitoba family is struggling with a loved one's addiction, you don't have to face this alone. A free, confidential consultation is the first step toward understanding your options and developing a plan that gives your loved one the best chance at lasting recovery.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            A Path Forward for Manitoba Families
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


      <LocationLinks currentLocation="Manitoba" locationType="province" />
      <Footer />
    </div>
  );
};

export default Manitoba;