import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import californiaBanner from "@/assets/california-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const SanJoseCalifornia = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "California", href: "/california" },
    { name: "San Jose", href: "/san-jose-california" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in San Jose, California | Freedom Interventions"
        description="San Jose families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Santa Clara County. Free consultation. (541) 838-6009."
        keywords="San Jose addiction intervention, San Jose drug intervention, Silicon Valley family intervention, intervention specialist San Jose CA, Santa Clara County interventionist, high-functioning addiction San Jose, tech addiction Silicon Valley"
        canonical="https://freedominterventions.com/san-jose-california"
      />
      <LocalBusinessSchema location="San Jose" state="California" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={californiaBanner}
          alt="San Jose Silicon Valley addiction intervention services"
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
              San Jose, California
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Silicon Valley's Hidden Addiction Crisis: Expert Intervention Services for San Jose Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Silicon Valley's culture of high performance masks a serious addiction crisis. In San Jose and across Santa Clara County, high-functioning addiction among tech professionals, meth's resurgence in working-class communities, and fentanyl's deadly reach are devastating families. Freedom Interventions provides expert, confidential intervention services to help San Jose families take action before it's too late.
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
                  Understanding San Jose's Addiction Challenge
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Santa Clara County's addiction crisis defies the stereotype of Silicon Valley prosperity. Overdose deaths have climbed sharply as fentanyl infiltrates the drug supply. Methamphetamine has made a resurgence in working-class neighborhoods. And behind the doors of expensive homes in Willow Glen and Almaden Valley, high-functioning addiction thrives unchecked—often for years before families recognize the severity.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">400+</div>
                <p className="text-muted-foreground">Overdose deaths in Santa Clara County annually</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">~1M</div>
                <p className="text-muted-foreground">San Jose population—California's third-largest city</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">↑</div>
                <p className="text-muted-foreground">Meth-related ER visits rising across Santa Clara County</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              From East San Jose to Cupertino, from Milpitas to Gilroy, Santa Clara County's addiction epidemic knows no boundaries. The pressure of Silicon Valley's high-achievement culture can drive individuals toward alcohol and drugs as coping mechanisms—and high incomes can sustain addiction far longer than it would otherwise survive.
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
                  How Addiction Affects San Jose Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Silicon Valley's high-performance culture creates unique addiction dynamics. Tech workers use stimulants and alcohol to manage impossible workloads. Young professionals at companies across the Valley discover that weekend party drugs have become daily dependencies. University students at San Jose State and UC Santa Clara face pressure to perform and party simultaneously.
                  </p>
                  <p>
                    High-functioning addiction is particularly dangerous in San Jose. Because the person is still working, still paying bills, still appearing "normal," families minimize the severity—and the person uses their continued success as proof they don't have a problem. By the time the consequences catch up, the addiction is deeply entrenched.
                  </p>
                  <p>
                    Whether your loved one is a tech professional hiding addiction behind stock options or a young adult in East San Jose caught up in fentanyl, Freedom Interventions knows how to break through the denial.
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
                  How Freedom Interventions Helps San Jose Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    With over 20 years of experience, Matt Brown provides specialized intervention services for Silicon Valley families. We understand the unique pressures of San Jose's high-achievement culture and the specific treatment resources available in Santa Clara County.
                  </p>
                  <p>
                    <strong className="text-foreground">Treatment Connections:</strong> Santa Clara County has quality resources including Santa Clara Valley Medical Center's behavioral health services, Kaiser San Jose, and the Bill Wilson Center. We match each person with the right level and type of care for lasting recovery.
                  </p>
                  <p>
                    <strong className="text-foreground">Executive & Professional Experience:</strong> We specialize in working with high-functioning individuals who believe they don't need help. Our intervention approach is specifically designed to cut through the rationalizations that high achievement enables.
                  </p>
                  <p>
                    <strong className="text-foreground">Absolute Discretion:</strong> In Silicon Valley's small professional world, privacy is critical. We handle every intervention with complete confidentiality.
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
                  Hope for San Jose Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery is possible for Silicon Valley families. We've helped professionals, families, and young adults throughout Santa Clara County guide their loved ones into treatment—and watched them rebuild careers, relationships, and lives.
                  </p>
                  <p>
                    High-functioning doesn't mean untouchable. Every addiction eventually catches up. A professional intervention now can prevent the catastrophic collapse that comes later. Reach out today—the consultation is free and completely confidential.
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
              Get Help for Your San Jose Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve all of Santa Clara County including San Jose, Sunnyvale, Santa Clara, Cupertino, Milpitas, Gilroy, and surrounding areas.
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


      <LocationLinks currentLocation="San Jose" locationType="city" parentState="California" />
      <Footer />
    </div>
  );
};

export default SanJoseCalifornia;
