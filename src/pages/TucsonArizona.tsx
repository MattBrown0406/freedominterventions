import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import arizonaBanner from "@/assets/arizona-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const TucsonArizona = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Arizona", href: "/arizona" },
    { name: "Tucson", href: "/tucson-arizona" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Tucson, Arizona | Freedom Interventions"
        description="Tucson families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Pima County. Free consultation. (541) 668-8084."
        keywords="Tucson addiction intervention, Pima County drug intervention, Tucson family intervention, fentanyl meth addiction Tucson AZ, intervention services Tucson Arizona"
        canonical="https://freedominterventions.com/tucson-arizona"
      />
      <LocalBusinessSchema location="Tucson" state="Arizona" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={arizonaBanner}
          alt="Arizona landscape representing Tucson and Pima County"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              <MapPin className="h-4 w-4" />
              Tucson, Arizona
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Tucson's Border Crisis: Professional Addiction Intervention for Pima County Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Tucson's position as Arizona's second-largest city and proximity to the US-Mexico border create a unique and severe addiction landscape. Fentanyl and methamphetamine flow through Pima County at alarming rates, devastating families across all demographics. Freedom Interventions provides expert, compassionate intervention services to help Tucson families navigate this crisis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/?type=consultation#booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Free Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:458-298-8000">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (541) 668-8084
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Crisis Stats Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Understanding Pima County's Addiction Challenge
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Pima County faces one of Arizona's most severe substance use crises, driven by border proximity, economic disparities, and a large unhoused population with untreated addiction. Fentanyl trafficking has dramatically increased overdose deaths, while methamphetamine remains widely available across all Tucson communities.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Severe</div>
                <p className="text-muted-foreground">Fentanyl and meth trafficking through Pima County border region</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Rising</div>
                <p className="text-muted-foreground">Overdose death rates year-over-year in Tucson metro area</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">High</div>
                <p className="text-muted-foreground">University of Arizona student population at risk for substance use</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Tucson's socioeconomic diversity means addiction affects families across all income levels. University of Arizona students face party culture and experimentation. Working-class neighborhoods deal with meth and fentanyl. Military families at nearby bases navigate service-related addiction. Each population requires a tailored intervention approach.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  How Addiction Affects Tucson Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Tucson families face addiction across generational lines. Parents watch college students spiral into addiction. Children cope with parents' chronic substance use. Spouses carry the entire family on their shoulders while their partner disappears into addiction.
                  </p>
                  <p>
                    The desert city's culture of resilience and independence can work against seeking help. Families often believe they should handle this privately, trying intervention after intervention on their own before recognizing they need professional guidance.
                  </p>
                  <p>
                    Without professional intervention strategy, well-meaning families enable their loved one's addiction through financial support, housing, and emotional rescue—patterns that sustain use rather than create pathways to recovery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  How Freedom Interventions Helps Tucson Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Matt Brown brings over 20 years of experience to Pima County families navigating the complex addiction landscape of southern Arizona. We understand Tucson's unique demographics and treatment resources.
                  </p>
                  <p>
                    <strong className="text-foreground">Local Resource Network:</strong> We connect families with Banner University Medical Center Tucson, University of Arizona treatment programs, La Frontera Center, and treatment facilities throughout Pima County.
                  </p>
                  <p>
                    <strong className="text-foreground">Culturally Competent:</strong> Tucson's diverse Hispanic, Native American, university, and military communities each have unique needs. We bring cultural sensitivity to every intervention.
                  </p>
                  <p>
                    <strong className="text-foreground">Family Healing:</strong> We help the entire family establish healthy boundaries, end enabling behaviors, and build a foundation for lasting recovery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hope Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-accent/50 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Hope for Tucson and Pima County Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery is possible even in the face of severe addiction. We've helped Tucson families guide their loved ones from crisis into lasting recovery, witnessing remarkable transformations.
                  </p>
                  <p>
                    Key local resources include Banner University Medical Center Tucson (medical detox), La Frontera Center (comprehensive behavioral health), and numerous outpatient and residential programs throughout Pima County. We also connect families with specialized national treatment centers when needed.
                  </p>
                  <p>
                    Don't face Tucson's addiction crisis alone. Professional intervention provides the structure and expertise your family needs to move forward.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Get Help for Your Pima County Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve all of Pima County including Tucson, Marana, Oro Valley, Sahuarita, and surrounding communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/?type=consultation#booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Free Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:458-298-8000">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (541) 668-8084
                </a>
              </Button>
            </div>
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


      <LocationLinks currentLocation="Tucson" locationType="city" />
      <Footer />
    </div>
  );
};

export default TucsonArizona;
