import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import coloradoBanner from "@/assets/denver-colorado-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const AuroraColorado = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Colorado", href: "/colorado" },
    { name: "Aurora", href: "/aurora-colorado" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Aurora, Colorado | Freedom Interventions"
        description="Aurora families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Arapahoe County. Free consultation. (541) 838-6009."
        keywords="Aurora Colorado addiction intervention, Arapahoe County drug intervention, Aurora family intervention, fentanyl Aurora Colorado, meth crisis Aurora, Denver metro intervention, intervention specialist Aurora CO"
        canonical="https://freedominterventions.com/aurora-colorado"
      />
      <LocalBusinessSchema location="Aurora" state="Colorado" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={coloradoBanner}
          alt="Aurora Colorado city skyline"
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
              Aurora, Colorado
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Aurora's Growing Addiction Crisis: Professional Intervention Services for Arapahoe County Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Aurora, Colorado's third-largest city and one of the most diverse communities in the Mountain West, is battling a devastating surge in fentanyl and methamphetamine addiction. Freedom Interventions provides culturally aware, compassionate intervention services for Aurora and Arapahoe County families ready to help a loved one find recovery.
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
                  Understanding Aurora's Addiction Challenge
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Aurora's rapid population growth, economic diversity, and proximity to major drug trafficking corridors have made it a focal point of Colorado's addiction crisis. Fentanyl—often disguised as counterfeit prescription pills—and methamphetamine are devastating families across the city's diverse neighborhoods.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">390k+</div>
                <p className="text-muted-foreground">Aurora residents, with addiction affecting families across every zip code</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">#1</div>
                <p className="text-muted-foreground">Fentanyl is now the leading cause of overdose death in Colorado</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">High</div>
                <p className="text-muted-foreground">Aurora's diverse immigrant communities face additional barriers to seeking addiction help</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              From the Montbello corridor to the Havana Street district, Aurora's neighborhoods reflect Colorado's full spectrum of addiction struggles. The city's large immigrant population—including significant African, Latino, and Southeast Asian communities—often faces language barriers and cultural stigma that complicate getting help.
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
                  How Addiction Affects Aurora Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Aurora families often struggle to recognize when substance use has crossed the line into addiction—especially when cultural norms discourage discussion of mental health and substance issues. By the time a family reaches out for help, the addiction may have progressed significantly.
                  </p>
                  <p>
                    The ease of obtaining counterfeit pills laced with fentanyl means even casual or first-time users face fatal risk. Young adults and teens who believe they're taking "Xanax" or "Percocet" are unknowingly ingesting lethal doses of fentanyl. For families, this accelerates the urgency of intervention.
                  </p>
                  <p>
                    Methamphetamine continues to affect working-class and middle-class families across Aurora, often presenting as erratic behavior, paranoia, and extended disappearances that leave families confused, frightened, and unsure of where to turn.
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
                  How Freedom Interventions Helps Aurora Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Matt Brown brings over 20 years of professional intervention experience to Aurora families. We meet families where they are—regardless of background, language, or circumstances—and provide a clear, compassionate path forward.
                  </p>
                  <p>
                    <strong className="text-foreground">Culturally Sensitive:</strong> We respect Aurora's extraordinary diversity and work to understand the cultural context of each family's situation. Shame, stigma, and fear don't have to be barriers to getting help.
                  </p>
                  <p>
                    <strong className="text-foreground">Local Resources:</strong> We connect Aurora families with treatment options including Children's Hospital Colorado (for younger patients), Aurora Mental Health, and Addiction Research and Treatment Services (ARTS)—plus a full national network when specialized care is needed.
                  </p>
                  <p>
                    <strong className="text-foreground">Boundary Setting:</strong> We teach families how to stop enabling and how to make the hard-but-necessary choices that give their loved one a real chance at recovery.
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
                  Hope for Aurora Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery is possible for every family in Aurora. We've helped families across the Denver metro area—from Stapleton to Centennial, from Englewood to Commerce City—guide loved ones out of active addiction and into treatment that works.
                  </p>
                  <p>
                    The crisis is real, and so is hope. A professional intervention, done right, can be the moment everything changes. When your family is ready to stop waiting and start moving, Matt is ready to help.
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
              Get Help for Your Aurora Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve all of Aurora and surrounding Arapahoe County communities.
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


      <LocationLinks currentLocation="Aurora" locationType="city" />
      <Footer />
    </div>
  );
};

export default AuroraColorado;
