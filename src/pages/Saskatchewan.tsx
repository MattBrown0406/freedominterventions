import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema, BreadcrumbSchema, ServiceAreaSchema } from "@/components/StructuredData";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";

const Saskatchewan = () => {
  const breadcrumbItems = [
    { name: "Service Areas", href: "/service-areas" },
    { name: "Saskatchewan", href: "/saskatchewan" }
  ];

  const breadcrumbSchemaItems = [
    { name: "Home", url: "https://freedominterventions.com" },
    { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
    { name: "Saskatchewan", url: "https://freedominterventions.com/saskatchewan" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Saskatchewan Addiction Intervention Services | Freedom Interventions"
        description="Professional addiction intervention services in Saskatchewan, Canada. Help your loved one find recovery from opioid and drug addiction. Serving Regina, Saskatoon, and all Saskatchewan communities."
        canonical="https://freedominterventions.com/saskatchewan"
        keywords="Saskatchewan addiction intervention, Regina drug intervention, Saskatoon family intervention, opioid crisis Saskatchewan, addiction help Saskatchewan Canada"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Saskatchewan"
        url="https://freedominterventions.com/saskatchewan"
        description="Professional addiction intervention services in Saskatchewan, Canada. Help your loved one find recovery from opioid and drug addiction. Serving Regina, Saskatoon, and all Saskatchewan communities."
        country="CA"
      />
      <BreadcrumbSchema items={breadcrumbSchemaItems} />
      
      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />
      
      <section className="pt-20 py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              Saskatchewan Addiction Crisis
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Saskatchewan's Addiction Crisis: How Professional Interventionists Offer Families a Lifeline
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Saskatchewan has one of the highest per-capita overdose death rates in Canada. Communities from Regina to Saskatoon and rural areas face devastating losses to the toxic drug supply.
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
                  Understanding Saskatchewan's Addiction Emergency
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Saskatchewan has experienced a staggering increase in overdose deaths as fentanyl and other synthetic opioids contaminate the drug supply. The province's overdose death rate has more than tripled in recent years, affecting families in every community — from downtown Saskatoon to remote northern villages.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Methamphetamine use has also surged across Saskatchewan, creating a dual crisis that strains the province's healthcare and treatment systems. Many families feel helpless as they watch loved ones spiral deeper into addiction while waiting months for treatment beds to become available.
              </p>
            </div>

            <div className="space-y-6 bg-muted/30 p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Why Professional Intervention Works in Saskatchewan
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Professional intervention is not about forcing someone into treatment — it's about creating the conditions where they can make the choice to accept help. An interventionist guides the family through a structured process that removes barriers, addresses objections, and presents a clear way forward.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                For Saskatchewan families, this often means coordinating treatment options beyond the province's borders, where specialized programs can provide immediate admission and the specific level of care needed. A professional interventionist manages every logistical detail, from securing a treatment bed to arranging travel.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Healing the Entire Family
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Addiction creates wounds throughout the family system. Parents lose sleep worrying. Siblings feel neglected. Spouses live in constant fear. Professional intervention addresses these dynamics by educating family members about the disease of addiction, teaching healthy boundary-setting, and connecting family members with their own support resources.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The intervention process itself is often healing for families, as it provides a structured opportunity to express love and concern in a way that the addicted person can actually hear. Many families describe the intervention as a turning point — not just for their loved one, but for the entire family.
              </p>
            </div>

            <div className="space-y-6 bg-primary/5 p-8 rounded-lg border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Your Family Deserves Help Now
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. Saskatchewan families can access professional intervention support and a confidential consultation to develop a plan tailored to their situation.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            A Path Forward for Saskatchewan Families
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


      <LocationLinks currentLocation="Saskatchewan" locationType="province" />
      <Footer />
    </div>
  );
};

export default Saskatchewan;