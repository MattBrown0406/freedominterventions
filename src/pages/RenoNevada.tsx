import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import nevadaBanner from "@/assets/nevada-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const RenoNevada = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Nevada", href: "/nevada" },
    { name: "Reno", href: "/reno-nevada" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Reno, Nevada | Freedom Interventions"
        description="Reno families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Washoe County. Free consultation. (541) 668-8084."
        keywords="Reno addiction intervention, Washoe County drug intervention, Reno family intervention, gambling alcohol meth addiction Reno NV, intervention services Reno Nevada"
        canonical="https://freedominterventions.com/reno-nevada"
      />
      <LocalBusinessSchema location="Reno" state="Nevada" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={nevadaBanner}
          alt="Nevada landscape representing Reno and Washoe County"
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
              Reno, Nevada
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Reno's "Biggest Little" Addiction Crisis: Professional Intervention for Washoe County Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Reno — the "Biggest Little City in the World" — carries a big addiction problem. The gaming and entertainment culture, combined with meth trafficking through northern Nevada, has created a serious substance use crisis in Washoe County. Freedom Interventions provides expert, compassionate intervention services to help Reno families break the cycle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/?type=consultation#booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Free Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:541-668-8084">
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
                  Understanding Washoe County's Addiction Challenge
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Reno's 270,000 Washoe County residents face a substance use crisis shaped by the city's gaming culture, transient workforce, and position along major drug trafficking corridors. Gambling disorder, alcohol dependency, and methamphetamine addiction intersect in ways that require specialized intervention expertise.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Severe</div>
                <p className="text-muted-foreground">Alcohol and gambling co-addiction rates in casino communities</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Growing</div>
                <p className="text-muted-foreground">Meth crisis fueled by I-80 trafficking corridor through Reno</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">High</div>
                <p className="text-muted-foreground">Nevada overall drug overdose mortality rate nationally</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Reno's transformation into a tech and logistics hub has brought economic growth but also new populations vulnerable to addiction. The city's casino culture normalizes drinking and risk-taking, while the I-80 corridor provides easy access to methamphetamine. Washoe County families are caught in the crossfire.
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
                  How Addiction Affects Reno Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    In Reno, addiction wears many faces. Casino and hospitality workers develop alcohol dependencies through their work environment. Warehouse and logistics employees turn to stimulants to manage grueling shifts. Young adults in Reno's growing university and tech population experiment with substances that lead to dependency.
                  </p>
                  <p>
                    The transient nature of Reno's population means many addicts lack stable family support networks. Those who do have family nearby often see loved ones struggle with enabling behaviors born of desperation and love.
                  </p>
                  <p>
                    Without professional intervention, Reno families cycle through crisis: emergency room visits, short-term sobriety, relapse, and repeat. Breaking this cycle requires professional strategy, not just more love and more threats.
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
                  How Freedom Interventions Helps Reno Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    With over 20 years of experience, Matt Brown provides expert intervention services for Reno and Washoe County families navigating Nevada's unique addiction landscape—including the complex interplay of gambling disorder and substance dependency.
                  </p>
                  <p>
                    <strong className="text-foreground">Local Resource Network:</strong> We connect families with Renown Health (medical), Behavioral Health Services of Northern Nevada, Step2 (women's residential), and treatment programs throughout Washoe County and the region.
                  </p>
                  <p>
                    <strong className="text-foreground">Multi-Addiction Expertise:</strong> When gambling disorder and substance addiction co-occur—as they frequently do in Reno—we ensure treatment addresses both conditions effectively.
                  </p>
                  <p>
                    <strong className="text-foreground">Family Healing:</strong> We help Washoe County families stop enabling, set effective boundaries, and create the conditions for lasting recovery.
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
                  Hope for Reno and Washoe County Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery is possible, even in Nevada's challenging environment. We've helped Washoe County families guide their loved ones out of addiction and into lasting recovery.
                  </p>
                  <p>
                    Key local resources include Renown Health (medical and behavioral health), Behavioral Health Services of Northern Nevada, and Step2 for women's residential treatment. We also connect families with national treatment resources when specialized care is needed.
                  </p>
                  <p>
                    Professional intervention is one of the clearest tools available to families. When your family is ready to stop waiting and start moving, Matt is ready to help.
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
              Get Help for Your Washoe County Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve all of Washoe County including Reno, Sparks, Sun Valley, Spanish Springs, and surrounding communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/?type=consultation#booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Free Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:541-668-8084">
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


      <LocationLinks currentLocation="Reno" locationType="city" />
      <Footer />
    </div>
  );
};

export default RenoNevada;
