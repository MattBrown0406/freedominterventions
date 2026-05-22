import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import utahBanner from "@/assets/utah-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const OgdenUtah = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Utah", href: "/utah" },
    { name: "Ogden", href: "/ogden-utah" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Ogden, Utah | Freedom Interventions"
        description="Ogden families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Weber County. Free consultation. (541) 668-8084."
        keywords="Ogden addiction intervention, Weber County drug intervention, Ogden family intervention, meth opioid addiction Ogden, addiction help Ogden UT"
        canonical="https://freedominterventions.com/ogden-utah"
      />
      <LocalBusinessSchema location="Ogden" state="Utah" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={utahBanner}
          alt="Utah landscape representing Ogden and Weber County"
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
              Ogden, Utah
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Ogden's Meth and Opioid Crisis: Professional Intervention for Weber County Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Ogden's working-class manufacturing heritage and economic hardship have created fertile ground for meth and opioid addiction. Weber County families face a serious substance use crisis with limited access to quality treatment. Freedom Interventions provides compassionate, professional guidance to help Ogden families fight back.
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
                  Understanding Weber County's Addiction Challenge
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Ogden's approximately 90,000 residents face disproportionate addiction rates driven by economic stress, limited opportunity, and proximity to drug trafficking routes along the I-15 corridor. Methamphetamine and opioids are the primary substances devastating Weber County families, with overdose deaths continuing to climb year over year.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">High</div>
                <p className="text-muted-foreground">Meth and opioid prevalence in Weber County communities</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Rising</div>
                <p className="text-muted-foreground">Overdose deaths year-over-year in northern Utah</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Limited</div>
                <p className="text-muted-foreground">Access to quality addiction treatment in Weber County</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Ogden's industrial neighborhoods, financial stress, and historical economic decline have compounded the addiction crisis. Workers injured on the job become opioid-dependent. Unemployed young adults turn to meth. Families cycle through crisis and relapse without professional intervention to break the pattern.
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
                  How Addiction Affects Ogden Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    In Ogden's working-class communities, addiction often begins with workplace injury and prescription pain management, or with the stress of economic hardship. Once dependency takes hold, families are left trying to manage crisis after crisis without professional guidance.
                  </p>
                  <p>
                    Many Ogden families have tried everything—ultimatums, threats, taking away money, providing a place to live. Without professional intervention strategy, these efforts often backfire, reinforcing enabling patterns that sustain addiction rather than disrupt it.
                  </p>
                  <p>
                    Generational addiction patterns are common in Weber County, where children grow up watching addiction normalize. Breaking this cycle requires structured, professional intervention.
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
                  How Freedom Interventions Helps Ogden Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Matt Brown's 20+ years of experience includes working with working-class families across the Mountain West who face the dual challenge of addiction and economic hardship. We meet Ogden families where they are—without judgment, with a clear plan.
                  </p>
                  <p>
                    <strong className="text-foreground">Local Resource Network:</strong> We work with McKay-Dee Hospital, Weber Human Services, Journey of Hope, and treatment facilities throughout Utah to find appropriate, accessible care for your loved one.
                  </p>
                  <p>
                    <strong className="text-foreground">Practical Approach:</strong> We help families set effective boundaries, stop enabling, and create the conditions for their loved one to choose treatment—often for the first time.
                  </p>
                  <p>
                    <strong className="text-foreground">Family Healing:</strong> We help the entire family understand addiction as a disease, establish healthy boundaries, and begin their own recovery alongside their loved one.
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
                  Hope for Ogden and Weber County Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery is possible for everyone, regardless of economic circumstances. We've helped Weber County families break generational addiction cycles and witness remarkable transformations in their loved ones and themselves.
                  </p>
                  <p>
                    Key local resources include McKay-Dee Hospital (medical care), Weber Human Services (community mental health), and Journey of Hope (residential treatment). We also connect families with statewide and national treatment resources when needed.
                  </p>
                  <p>
                    Professional intervention can give families structure, leverage, and a real plan. When your family is ready to stop waiting and start moving, Matt is ready to help.
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
              Get Help for Your Weber County Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve all of Weber County including Ogden, Roy, South Ogden, Washington Terrace, and surrounding communities.
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


      <LocationLinks currentLocation="Ogden" locationType="city" />
      <Footer />
    </div>
  );
};

export default OgdenUtah;
