import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema, LocalBusinessSchema, BreadcrumbSchema } from "@/components/StructuredData";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const Montana = () => {
  const breadcrumbItems = [
    { name: "Service Areas", href: "/service-areas" },
    { name: "Montana", href: "/montana" }
  ];

  const breadcrumbSchemaItems = [
    { name: "Home", url: "https://freedominterventions.com" },
    { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
    { name: "Montana", url: "https://freedominterventions.com/montana" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Montana Addiction Intervention Services | Freedom Interventions"
        description="Professional addiction intervention services in Montana. Help your loved one recover from methamphetamine, opioid, and alcohol addiction. Serving Billings, Missoula, Great Falls, and all MT communities."
        canonical="https://freedominterventions.com/montana"
        keywords="Montana addiction intervention, Billings drug intervention, Missoula family intervention, meth crisis Montana, addiction help MT"
        geoRegion="US-MT"
        geoPlacename="Montana"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="Billings" state="MT" />
      <BreadcrumbSchema items={breadcrumbSchemaItems} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />
      
      <section className="pt-20 py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              Montana Addiction Crisis
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Montana's Addiction Crisis: Professional Intervention Services for Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Montana families face challenges with methamphetamine and opioid addiction despite the state's rural character. Professional interventionists help bridge the gap to treatment.
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
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">200+</div>
              <div className="text-sm text-muted-foreground">Annual Overdose Deaths</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">90%</div>
              <div className="text-sm text-muted-foreground">Intervention Success Rate</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50K+</div>
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
                  Montana's Rural Challenges
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Montana's vast geography creates significant barriers to treatment access. Methamphetamine remains the primary drug threat, while opioids and fentanyl are increasingly present. Many Montana communities are hours from the nearest treatment facility, making it difficult for families to access the help they desperately need.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The state's Native American communities have been disproportionately affected by the addiction crisis, with overdose rates significantly higher than the national average. Cultural sensitivity and understanding of local resources are essential components of effective intervention in Montana.
              </p>
            </div>

            <div className="space-y-6 bg-muted/30 p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Interventions Across Big Sky Country
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Professional interventionists travel throughout Montana and coordinate with treatment centers across the state and region to find the best fit for each individual. Whether your family is in Billings, Missoula, Helena, or a small ranching community, a professional interventionist can come to you and manage every aspect of the process.
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
                From initial consultation through aftercare, professional interventionists provide comprehensive support for Montana families facing addiction. This includes helping families understand the disease of addiction, preparing intervention letters, coordinating travel logistics for treatment, and providing ongoing guidance throughout the recovery journey.
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
                Distance doesn't have to be a barrier. Professional interventionists help Montana families access quality treatment wherever it's available. Your free, confidential consultation is just a phone call away.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Hope for Montana Families
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-3xl mx-auto">
            Professional intervention services help Montana families overcome the unique challenges of rural addiction treatment. Contact us today.
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

      <LocationLinks currentLocation="Montana" locationType="state" />
      <Footer />
    </div>
  );
};

export default Montana;