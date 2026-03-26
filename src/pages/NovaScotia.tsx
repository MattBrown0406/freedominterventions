import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema, LocalBusinessSchema, BreadcrumbSchema } from "@/components/StructuredData";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";

const NovaScotia = () => {
  const breadcrumbItems = [
    { name: "Service Areas", href: "/service-areas" },
    { name: "Nova Scotia", href: "/nova-scotia" }
  ];

  const breadcrumbSchemaItems = [
    { name: "Home", url: "https://freedominterventions.com" },
    { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
    { name: "Nova Scotia", url: "https://freedominterventions.com/nova-scotia" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Nova Scotia Addiction Intervention Services | Freedom Interventions"
        description="Professional addiction intervention services in Nova Scotia, Canada. Help your loved one find recovery from opioid and drug addiction. Serving Halifax and all Nova Scotia communities."
        canonical="https://freedominterventions.com/nova-scotia"
        keywords="Nova Scotia addiction intervention, Halifax drug intervention, Nova Scotia family intervention, opioid crisis Nova Scotia, addiction help Nova Scotia Canada"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="Nova Scotia" state="Canada" />
      <BreadcrumbSchema items={breadcrumbSchemaItems} />
      
      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />
      
      <section className="pt-20 py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              Nova Scotia Addiction Crisis
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Nova Scotia's Addiction Crisis: How Professional Interventionists Offer Families a Lifeline
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Nova Scotia has seen rising opioid-related deaths as the toxic drug supply reaches Atlantic Canada. Halifax and communities throughout the province need support to combat this growing crisis.
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
                  Nova Scotia's Substance Abuse Crisis
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Nova Scotia has experienced a sharp increase in overdose deaths as fentanyl and other synthetic opioids infiltrate the province's drug supply. Halifax, as the province's largest city, has seen the most concentrated impact, but rural communities across Nova Scotia are increasingly affected as well.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Alcohol addiction continues to be a widespread but often underrecognized problem throughout the province. Combined with rising rates of cocaine and methamphetamine use, Nova Scotia families face complex addiction challenges that require professional expertise to navigate effectively.
              </p>
            </div>

            <div className="space-y-6 bg-muted/30 p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Professional Intervention in Nova Scotia
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                A professional interventionist brings decades of experience to help Nova Scotia families break through the cycle of addiction. The intervention process is carefully planned and executed: family members are coached and prepared, treatment options are researched and secured, and every logistical detail is handled so that the focus can remain on the conversation that matters most.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Because Nova Scotia's treatment options may be limited for certain conditions, the interventionist identifies programs across Canada that provide the specific type and level of care your loved one needs. Having a treatment bed secured before the intervention takes place is critical — it eliminates delays that can cause a willing person to change their mind.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Rebuilding Family Relationships
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Addiction erodes trust, communication, and emotional connection within families. The intervention process begins the work of rebuilding these relationships by creating a safe, structured space for honest communication. Family members learn to express their love and concern without enabling, and the addicted person hears — often for the first time — how their behavior has affected the people who care about them most.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Beyond the intervention itself, professional support continues throughout the treatment and aftercare process, helping families establish new patterns of communication and support that sustain long-term recovery.
              </p>
            </div>

            <div className="space-y-6 bg-primary/5 p-8 rounded-lg border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Take Action Today
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Nova Scotia families facing addiction don't have to wait for rock bottom. Professional intervention is available now, and the process begins with a free, confidential phone conversation. Let us help you develop a plan that gives your loved one — and your entire family — the best chance at healing.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            A Path Forward for Nova Scotia Families
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


      <LocationLinks currentLocation="Nova Scotia" locationType="province" />
      <Footer />
    </div>
  );
};

export default NovaScotia;