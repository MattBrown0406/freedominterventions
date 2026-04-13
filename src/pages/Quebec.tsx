import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema, BreadcrumbSchema, ServiceAreaSchema } from "@/components/StructuredData";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";

const Quebec = () => {
  const breadcrumbItems = [
    { name: "Service Areas", href: "/service-areas" },
    { name: "Quebec", href: "/quebec" }
  ];

  const breadcrumbSchemaItems = [
    { name: "Home", url: "https://freedominterventions.com" },
    { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
    { name: "Quebec", url: "https://freedominterventions.com/quebec" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Quebec Addiction Intervention Services | Freedom Interventions"
        description="Professional addiction intervention services in Quebec, Canada. Help your loved one find recovery from opioid and drug addiction. Serving Montreal, Quebec City, and all Quebec communities. Bilingual services available."
        canonical="https://freedominterventions.com/quebec"
        keywords="Quebec addiction intervention, Montreal drug intervention, Quebec City family intervention, opioid crisis Quebec, addiction help Quebec Canada"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Quebec"
        url="https://freedominterventions.com/quebec"
        description="Professional addiction intervention services in Quebec, Canada. Help your loved one find recovery from opioid and drug addiction. Serving Montreal, Quebec City, and all Quebec communities. Bilingual services available."
        country="CA"
      />
      <BreadcrumbSchema items={breadcrumbSchemaItems} />
      
      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />
      
      <section className="pt-20 py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              Quebec Addiction Crisis
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Quebec's Addiction Crisis: How Professional Interventionists Offer Families a Lifeline
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Quebec faces growing addiction challenges, with opioid-related deaths rising significantly in recent years. From Montreal to Quebec City and rural regions, families need support navigating the path to recovery.
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
              <div className="text-sm text-muted-foreground">Prepared Families, Better Outcomes</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">175K</div>
              <div className="text-sm text-muted-foreground">Quebecers Affected</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">70%</div>
              <div className="text-sm text-muted-foreground">Deaths Involve Opioids</div>
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
                  The Scope of Quebec's Addiction Challenges
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                While Quebec has historically had lower overdose rates than Western Canada, the province has seen significant increases in fentanyl-related deaths. The toxic drug supply has spread throughout the province, requiring families to act quickly when addiction takes hold.
              </p>
            </div>

            <div className="space-y-6 bg-muted/30 p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Why Families Need Intervention Support Now
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Professional interventionists help Quebec families navigate both public and private treatment options. With bilingual support available, families can receive guidance in French or English throughout the intervention process.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            A Path Forward for Quebec Families
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-3xl mx-auto">
            If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. Professional intervention offers a structured, compassionate path to treatment.
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


      <LocationLinks currentLocation="Quebec" locationType="province" />
      <Footer />
    </div>
  );
};

export default Quebec;