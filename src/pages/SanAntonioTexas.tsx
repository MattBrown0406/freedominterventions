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

const SanAntonioTexas = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Texas", href: "/texas" },
    { name: "San Antonio", href: "/san-antonio-texas" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in San Antonio, Texas | Freedom Interventions"
        description="San Antonio families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Bexar County. Free consultation. (541) 668-8084."
        keywords="San Antonio addiction intervention, Bexar County drug intervention, San Antonio family intervention, veteran addiction San Antonio, military addiction Texas, fentanyl San Antonio, meth crisis San Antonio TX, intervention specialist San Antonio"
        canonical="https://freedominterventions.com/san-antonio-texas"
      />
      <LocalBusinessSchema location="San Antonio" state="Texas" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={texasBanner}
          alt="San Antonio Texas River Walk and skyline"
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
              San Antonio, Texas
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              San Antonio's Military & Border Addiction Crisis: Professional Intervention Services for Bexar County Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              San Antonio—home to Fort Sam Houston, Lackland Air Force Base, and Joint Base San Antonio—carries one of the nation's heaviest military addiction burdens. Add border proximity to Mexico's fentanyl supply chains and a sprawling metro population of 1.4 million, and Bexar County families face a layered crisis that demands professional intervention expertise. Freedom Interventions is here to help.
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
                  Understanding San Antonio's Addiction Challenge
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  San Antonio's overdose death toll has climbed sharply in recent years, driven by fentanyl flooding in through South Texas border crossings and methamphetamine devastating working-class neighborhoods. The city's massive military presence—the highest concentration of military bases of any US city—creates a veteran and active-duty addiction crisis that often goes unacknowledged due to cultural stigma.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">1.4M+</div>
                <p className="text-muted-foreground">Bexar County residents, with addiction affecting families in every neighborhood and zip code</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">2x</div>
                <p className="text-muted-foreground">Veterans are twice as likely to develop substance use disorder as their civilian counterparts</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">150 mi</div>
                <p className="text-muted-foreground">Proximity to Laredo—one of the busiest fentanyl smuggling points on the southern border</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              From the South Side to Alamo Heights, from the Military Drive corridor to the Stone Oak suburbs, San Antonio's addiction crisis reaches every demographic. Military families often bear the weight in silence, afraid that seeking help will damage a service member's career. Meanwhile, working-class families watch methamphetamine and fentanyl take loved ones faster than they can find help.
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
                  How Addiction Affects San Antonio Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Military families in San Antonio face a unique set of barriers. The code of silence around mental health and addiction runs deep in military culture. Service members fear losing their security clearances, their rank, or their career. Spouses and children carry enormous secondary trauma while feeling isolated and unsupported.
                  </p>
                  <p>
                    Veterans transitioning out of military service often struggle with loss of identity, purpose, and community—powerful drivers of self-medication. San Antonio's large veteran population means this crisis is particularly acute in the city.
                  </p>
                  <p>
                    For San Antonio's large Latino community, addiction is often compounded by cultural barriers—shame, family privacy norms, distrust of the healthcare system, and limited Spanish-language treatment options. Families suffer in isolation when professional intervention could change everything.
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
                  How Freedom Interventions Helps San Antonio Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Matt Brown brings over 20 years of professional intervention experience to San Antonio families. We understand military culture, border-region dynamics, and the specific treatment landscape of South Texas.
                  </p>
                  <p>
                    <strong className="text-foreground">Military-Aware:</strong> We approach military and veteran families with respect for service culture while being direct about addiction's reality. We know VA resources, TRICARE navigation, and veteran-specific treatment programs.
                  </p>
                  <p>
                    <strong className="text-foreground">Local Treatment Network:</strong> We connect San Antonio families with University Health, Laurel Ridge Treatment Center, SAMMinistries, and HealthTexas Medical Group—plus a national network of specialized residential programs for cases requiring higher levels of care.
                  </p>
                  <p>
                    <strong className="text-foreground">Boundary Setting:</strong> We teach families that love without consequences enables addiction. We help you draw the lines that give your loved one a real chance at recovery.
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
                  Hope for San Antonio Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery happens in San Antonio every day. The same courage that drives military service can drive recovery. The same family bonds that characterize San Antonio's community can be the foundation of lasting sobriety.
                  </p>
                  <p>
                    We've helped families throughout Bexar County and South Texas guide their loved ones into treatment and watched lives transform. If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you.
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
              Get Help for Your San Antonio Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve all of Bexar County including San Antonio, Converse, Universal City, Helotes, and surrounding communities.
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


      <LocationLinks currentLocation="San Antonio" locationType="city" />
      <Footer />
    </div>
  );
};

export default SanAntonioTexas;
