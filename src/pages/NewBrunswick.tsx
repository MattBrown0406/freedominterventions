import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema, LocalBusinessSchema, BreadcrumbSchema } from "@/components/StructuredData";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";

const NewBrunswick = () => {
  const breadcrumbItems = [
    { name: "Service Areas", href: "/service-areas" },
    { name: "New Brunswick", href: "/new-brunswick" }
  ];

  const breadcrumbSchemaItems = [
    { name: "Home", url: "https://freedominterventions.com" },
    { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
    { name: "New Brunswick", url: "https://freedominterventions.com/new-brunswick" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="New Brunswick Addiction Intervention Services | Freedom Interventions"
        description="Professional addiction intervention services in New Brunswick, Canada. Help your loved one find recovery from opioid and drug addiction. Serving Saint John, Moncton, Fredericton, and all NB communities."
        canonical="https://freedominterventions.com/new-brunswick"
        keywords="New Brunswick addiction intervention, Saint John drug intervention, Moncton family intervention, opioid crisis New Brunswick, addiction help NB Canada"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="New Brunswick" state="Canada" />
      <BreadcrumbSchema items={breadcrumbSchemaItems} />
      
      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />
      
      <section className="pt-20 py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              New Brunswick Addiction Crisis
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              New Brunswick's Addiction Crisis: How Professional Interventionists Offer Families a Lifeline
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              New Brunswick faces growing challenges from opioid addiction, with communities across the province affected. Families from Saint John to Moncton and Fredericton need support navigating the path to recovery.
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
                  New Brunswick's Growing Addiction Emergency
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                New Brunswick has seen a significant rise in opioid-related hospitalizations and deaths as the toxic drug supply reaches Atlantic Canada. The province's three major cities — Saint John, Moncton, and Fredericton — have all experienced increased overdose rates, while smaller communities struggle with limited access to treatment resources.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Prescription opioid misuse has long been a concern in New Brunswick, and the transition to illicit fentanyl has made the crisis far more deadly. Methamphetamine and cocaine use are also rising, creating complex addiction profiles that require specialized treatment approaches.
              </p>
            </div>

            <div className="space-y-6 bg-muted/30 p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Professional Intervention for New Brunswick Families
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                When a loved one refuses to acknowledge their addiction or accept help, a professional intervention provides a proven framework for breaking through denial and resistance. The interventionist works closely with your family to prepare for the conversation, identify the right treatment program, and coordinate every detail so that when your loved one agrees to treatment, they can go immediately.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                For New Brunswick families, this often means exploring treatment options both within the province and across Canada, ensuring the best possible match for your loved one's specific needs, including any co-occurring mental health conditions, medical requirements, or cultural considerations.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  The Family's Role in Recovery
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Families are not just bystanders in the addiction process — they play a critical role in both enabling the disease and supporting recovery. Professional intervention educates family members about healthy boundaries, codependency patterns, and self-care strategies. This knowledge empowers families to stop unintentionally fueling the addiction and start creating conditions that support lasting change.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Many New Brunswick families have been living with the stress of a loved one's addiction for years before seeking professional help. The intervention process provides relief, clarity, and a concrete plan of action — often for the first time.
              </p>
            </div>

            <div className="space-y-6 bg-primary/5 p-8 rounded-lg border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Don't Wait — Help Is Available Now
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Every day that passes without intervention is another day of risk. New Brunswick families can access professional intervention support 24/7 with a free, confidential phone consultation. Let us help you understand your options and take the first step toward your family's recovery.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            A Path Forward for New Brunswick Families
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


      <LocationLinks currentLocation="New Brunswick" locationType="province" />
      <Footer />
    </div>
  );
};

export default NewBrunswick;