import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import texasBanner from "@/assets/texas-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const ElPasoTexas = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Texas", href: "/texas" },
    { name: "El Paso", href: "/el-paso-texas" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in El Paso, Texas | Freedom Interventions"
        description="El Paso families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving El Paso County. Free consultation. (541) 838-6009."
        keywords="El Paso addiction intervention, El Paso County drug intervention, El Paso family intervention, border fentanyl El Paso, meth crisis El Paso TX, bilingual intervention Texas, intervention specialist El Paso"
        canonical="https://freedominterventions.com/el-paso-texas"
      />
      <LocalBusinessSchema location="El Paso" state="Texas" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={texasBanner}
          alt="El Paso Texas border city landscape with Franklin Mountains"
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
              El Paso, Texas
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              El Paso's Border Fentanyl Crisis: Professional Intervention Services for El Paso County Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              El Paso sits directly on the US-Mexico border at one of the nation's busiest fentanyl entry points. With 680,000 residents in a city where the drug supply flows through daily, El Paso County families face an addiction emergency that demands immediate, expert intervention. Freedom Interventions provides professional, bilingual-aware services to help El Paso families save their loved ones.
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
                  Understanding El Paso's Addiction Challenge
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  El Paso's Ports of Entry—including the Ysleta, Bridge of the Americas, and Paso del Norte crossings—handle millions of border crossings annually and are major entry points for fentanyl and methamphetamine destined for markets across the United States. Living at the epicenter of this supply chain means El Paso families have extraordinarily easy access to deadly drugs, creating an addiction environment unlike almost anywhere else in the country.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">680k+</div>
                <p className="text-muted-foreground">El Paso County residents, in one of the nation's most significant drug trafficking corridors</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">#1</div>
                <p className="text-muted-foreground">El Paso is among the top US border cities for fentanyl seizures—meaning what gets through is a fraction of what enters</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">High</div>
                <p className="text-muted-foreground">Methamphetamine rates in El Paso remain significantly elevated compared to national averages</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              El Paso is a predominantly Latino city with deep family values, strong community bonds, and complex relationships with both sides of the border. These strengths, when channeled correctly, are powerful drivers of recovery. But cultural stigma, fear of immigration-related consequences, and distrust of institutions can delay families from seeking the professional help that could save a life.
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
                  How Addiction Affects El Paso Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    El Paso families often struggle with the paradox of tight community bonds and deep shame around addiction. The cultural value of protecting family reputation—not airing problems publicly—can delay intervention for years. By the time families reach out, the addiction is often severe.
                  </p>
                  <p>
                    The city's binational character means some families have members on both sides of the border. This can complicate intervention logistics but also means families sometimes have access to treatment options in Ciudad Juárez. We help navigate the full range of possibilities.
                  </p>
                  <p>
                    Young adults in El Paso face particular risk—cheap and accessible drugs combined with economic challenges and limited local opportunity create a perfect storm for substance use disorder to take hold in an otherwise close-knit community.
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
                  How Freedom Interventions Helps El Paso Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Matt Brown brings over 20 years of professional intervention experience to El Paso families. We approach El Paso's unique border-region dynamics with cultural awareness and respect while remaining direct and effective in confronting addiction.
                  </p>
                  <p>
                    <strong className="text-foreground">Culturally Competent:</strong> We understand that family loyalty and community bonds are profound in El Paso. We help families channel these values into intervention rather than letting them become barriers to action.
                  </p>
                  <p>
                    <strong className="text-foreground">Local Treatment Network:</strong> We connect El Paso families with University Medical Center of El Paso, Emergence Health Network, La Fe Clinic, and Behavioral Health Services—plus quality residential treatment options across Texas and the nation.
                  </p>
                  <p>
                    <strong className="text-foreground">Urgent Response:</strong> Given El Paso's fentanyl accessibility, we treat every case with appropriate urgency. A single use of a counterfeit pill can be fatal. We move quickly and effectively to help families act before the next crisis.
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
                  Hope for El Paso Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery happens in El Paso. The city's resilience—evident in everything from its response to tragedy to its deep community bonds—is equally present in recovery. We've helped families throughout the Borderland guide their loved ones toward healing.
                  </p>
                  <p>
                    The proximity to drugs raises the risk. If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you.
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
              Get Help for Your El Paso Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve all of El Paso County including El Paso, Socorro, San Elizario, Anthony, and surrounding communities.
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


      <LocationLinks currentLocation="El Paso" locationType="city" />
      <Footer />
    </div>
  );
};

export default ElPasoTexas;
