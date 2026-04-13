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

const GreshamOregon = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Oregon", href: "/oregon" },
    { name: "Gresham", href: "/gresham-oregon" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Gresham, Oregon | Freedom Interventions"
        description="Gresham families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Multnomah County. Free consultation. (541) 838-6009."
        keywords="Gresham Oregon addiction intervention, drug intervention Gresham OR, alcohol intervention Gresham, family intervention Gresham Oregon, Multnomah County interventionist, east Portland addiction help, overdose crisis Gresham, professional intervention Gresham"
        canonical="https://freedominterventions.com/gresham-oregon"
      />
      <LocalBusinessSchema location="Gresham" state="Oregon" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={cityBanner}
          alt="Gresham Oregon east Portland metro landscape"
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
              Gresham, Oregon
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Gresham Addiction Intervention Specialist: East Portland Families Deserve Expert Help
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Gresham, Oregon's fourth-largest city with approximately 115,000 residents, carries some of the highest overdose rates in Multnomah County. As the urban eastern edge of the Portland metro area, Gresham has been hit hard by the fentanyl crisis, economic pressures, and limited treatment access. Freedom Interventions brings certified, expert help directly to east Portland metro families.
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
                  Gresham's Overdose Crisis: Oregon's Hardest-Hit Community
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Gresham sits on the front lines of Multnomah County's devastating addiction crisis. As urban displacement has pushed lower-income residents eastward from Portland proper, Gresham has absorbed both vulnerable populations and the drug markets that follow them. The city's high overdose rates reflect years of underinvestment in treatment infrastructure relative to the scale of need.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">High OD</div>
                <p className="text-muted-foreground">Gresham among Multnomah County's highest overdose rate neighborhoods</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">533%</div>
                <p className="text-muted-foreground">Fentanyl death increase in Multnomah County from 2018 to 2022</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Underserved</div>
                <p className="text-muted-foreground">Treatment capacity in east Portland area lags significantly behind need</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Gresham's working-class communities, diverse immigrant populations, and young adult demographic all face unique barriers to accessing addiction treatment. Without professional intervention, families cycle through emergency services, jail, and homelessness without accessing sustainable recovery pathways.
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
                  How Addiction Affects Gresham Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Gresham's economic landscape—characterized by manufacturing, logistics, and service industries—creates conditions where injury-related opioid use, stress-driven drinking, and stimulant use for long work hours are commonplace starting points for addiction.
                  </p>
                  <p>
                    The city's proximity to Portland's drug markets, combined with lower housing costs that attract vulnerable individuals, has made Gresham a focal point of the region's fentanyl epidemic. Families in neighborhoods like Rockwood, Powell Valley, Pleasant Valley, and the historic downtown all contend with addiction's reach.
                  </p>
                  <p>
                    Many Gresham families face multiple stressors simultaneously—addiction, housing instability, domestic violence, and mental health challenges—making professional intervention not just helpful but often the only thing standing between a loved one and permanent consequences.
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
                  How Freedom Interventions Helps Gresham Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Matt Brown's 20+ years of certified intervention experience means Gresham families get expert help that understands the reality of east Portland metro addiction—not a one-size-fits-all approach. We meet families where they are, without judgment.
                  </p>
                  <p>
                    <strong className="text-foreground">Local Treatment Network:</strong> We work with Multnomah County treatment providers including <strong className="text-foreground">Cascadia Behavioral Healthcare</strong>, one of Oregon's largest community mental health organizations serving the east Portland area with integrated behavioral health and SUD services, and <strong className="text-foreground">Multnomah County SUD</strong> programs providing assessment, crisis services, and treatment coordination for county residents.
                  </p>
                  <p>
                    <strong className="text-foreground">Navigating Complex Cases:</strong> Gresham families often face co-occurring challenges—mental health disorders, housing instability, legal issues. We help navigate these complexities and find treatment programs equipped to address the whole person.
                  </p>
                  <p>
                    <strong className="text-foreground">No-Cost Consultation:</strong> We believe every family deserves access to expert guidance. Our initial consultation is always free and completely confidential.
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
                  Hope for Gresham and East Portland Metro Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    The severity of Gresham's addiction crisis doesn't make recovery less possible—it makes professional intervention more essential. We've helped families in some of the most challenging circumstances guide their loved ones into treatment and witnessed lasting recoveries.
                  </p>
                  <p>
                    Recovery doesn't require perfect conditions. It requires the right help at the right moment. That's what we provide. Call today—your family has waited long enough.
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
              Get Help for Your Gresham Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              The sooner families have a clear plan, the more options they have. Our free, confidential consultation will help you create an action plan for your loved one. We serve all of Multnomah County's east metro area including Gresham, Troutdale, Wood Village, Fairview, and surrounding communities.
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


      <LocationLinks currentLocation="Gresham" locationType="city" parentState="Oregon" />
      <Footer />
    </div>
  );
};

export default GreshamOregon;
