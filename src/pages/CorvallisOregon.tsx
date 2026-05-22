import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import cityBanner from "@/assets/oregon-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const CorvallisOregon = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Oregon", href: "/oregon" },
    { name: "Corvallis", href: "/corvallis-oregon" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Corvallis, Oregon | Freedom Interventions"
        description="Corvallis families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Benton County. Free consultation. (541) 668-8084."
        keywords="Corvallis Oregon addiction intervention, drug intervention Corvallis OR, alcohol intervention Corvallis, family intervention Corvallis Oregon, Benton County interventionist, OSU student addiction help, college town addiction intervention, professional intervention Corvallis"
        canonical="https://freedominterventions.com/corvallis-oregon"
      />
      <LocalBusinessSchema location="Corvallis" state="Oregon" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={cityBanner}
          alt="Corvallis Oregon Willamette Valley college town landscape"
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
              Corvallis, Oregon
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Corvallis Addiction Intervention Specialist: Help for OSU Families and Benton County
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Corvallis, home to Oregon State University and approximately 60,000 residents, faces an addiction challenge that college towns across America know too well—substance use normalized in academic culture, delayed adult brain development, and families watching from a distance as a loved one struggles. Freedom Interventions provides expert, compassionate help for Corvallis and Benton County families.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/#booking">
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
                  The Hidden Crisis in Oregon's College Town
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Corvallis presents a paradox: one of Oregon's most educated cities, consistently ranked among America's best places to live, with a substance abuse crisis that the college town environment actively masks. OSU's 35,000+ students, combined with a permanent community of academics, healthcare workers, and Willamette Valley families, create a complex addiction landscape.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">35K+</div>
                <p className="text-muted-foreground">OSU students in an environment where alcohol and drug use are often normalized</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">College Risk</div>
                <p className="text-muted-foreground">18-25 age group at highest risk for developing lifelong substance use disorders</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Fentanyl</div>
                <p className="text-muted-foreground">Counterfeit pills and laced substances now reaching Corvallis student population</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              The college environment creates a perfect storm for addiction development: easy access to alcohol, social normalization of recreational drug use, academic pressure driving stimulant abuse, and parents at a geographic distance who rationalize warning signs as "normal college behavior." By the time families recognize the problem as addiction, it may have progressed for years.
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
                  How Addiction Affects Corvallis and Benton County Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    For OSU student families, addiction can develop rapidly in the freshman year and escalate through college. Parents may notice academic decline, withdrawal from family contact, financial requests that don't add up, and behavioral changes they attribute to stress or growth.
                  </p>
                  <p>
                    For Corvallis's permanent community—OSU faculty, healthcare professionals, Willamette Valley farmers and agriculture workers—addiction more often develops quietly over years. The community's academic culture can make people reluctant to admit vulnerability, while professional obligations keep the problem hidden until a crisis forces acknowledgment.
                  </p>
                  <p>
                    Benton County's rural areas outside Corvallis face different challenges: limited treatment access, agricultural injury-related opioid use, and the isolation that allows addiction to progress without community support systems engaging.
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
                  How Freedom Interventions Helps Corvallis Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Matt Brown's 20+ years of certified intervention experience includes extensive work with college-age adults and their families. We understand the unique dynamics of young adult addiction and how to engage effectively with individuals who believe they don't have a problem.
                  </p>
                  <p>
                    <strong className="text-foreground">Local Treatment Resources:</strong> We connect Corvallis families with appropriate treatment resources including <strong className="text-foreground">Benton County Health</strong>, which provides substance use disorder services, mental health treatment, and recovery support for Benton County residents, and <strong className="text-foreground">Samaritan Health Services</strong>, Corvallis's leading healthcare system offering integrated behavioral health and addiction treatment programs.
                  </p>
                  <p>
                    <strong className="text-foreground">Young Adult Expertise:</strong> Intervening with a college student or young adult requires a different approach than intervening with someone older. We're skilled at engaging this population in ways that motivate rather than alienate.
                  </p>
                  <p>
                    <strong className="text-foreground">Long-Distance Family Coordination:</strong> Many OSU families live outside Oregon. We facilitate effective intervention regardless of where family members are located, coordinating participation and logistics seamlessly.
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
                  Hope for Corvallis Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Young adults have extraordinary recovery potential when they access treatment early. The prefrontal cortex continues developing into the mid-20s, meaning early intervention doesn't just address addiction—it can redirect the entire trajectory of a young person's life.
                  </p>
                  <p>
                    Whether your loved one is an OSU student, a Corvallis professional, or a Benton County family member—recovery is possible and professional intervention dramatically increases the likelihood of success. Call today.
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
              Get Help for Your Corvallis Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Don't let another semester pass watching your loved one struggle. Our free, confidential consultation will help you create a plan that works. We serve all of Benton County including Corvallis, Philomath, Monroe, and surrounding Willamette Valley communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/#booking">
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


      <LocationLinks currentLocation="Corvallis" locationType="city" parentState="Oregon" />
      <Footer />
    </div>
  );
};

export default CorvallisOregon;
