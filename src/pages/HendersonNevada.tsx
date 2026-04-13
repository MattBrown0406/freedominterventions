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

const HendersonNevada = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Nevada", href: "/nevada" },
    { name: "Henderson", href: "/henderson-nevada" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Henderson, Nevada | Freedom Interventions"
        description="Henderson families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Clark County. Free consultation. (541) 838-6009."
        keywords="Henderson addiction intervention, Clark County drug intervention, Henderson family intervention, alcohol gambling addiction Henderson NV, intervention services Henderson Nevada"
        canonical="https://freedominterventions.com/henderson-nevada"
      />
      <LocalBusinessSchema location="Henderson" state="Nevada" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={nevadaBanner}
          alt="Nevada landscape representing Henderson and Clark County"
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
              Henderson, Nevada
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Henderson's Suburban Addiction Crisis: Professional Intervention for Clark County Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Henderson's suburban Las Vegas location creates a unique addiction environment where the gambling and alcohol culture of the Strip seeps into residential neighborhoods. With 325,000 residents navigating proximity to constant temptation, Clark County families face an alcohol and gambling-linked addiction nexus unlike anywhere else. Freedom Interventions provides expert guidance to help Henderson families reclaim their lives.
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
                  Understanding Clark County's Addiction Challenge
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Clark County recorded over 1,300 overdose deaths in 2023, making Nevada one of the hardest-hit states in the nation. Henderson families live in the shadow of Las Vegas—where 24/7 alcohol availability, gambling access, and party culture normalize addictive behaviors that spill directly into suburban homes.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">1,300+</div>
                <p className="text-muted-foreground">Overdose deaths in Clark County in 2023</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <p className="text-muted-foreground">Alcohol and gambling access in the greater Las Vegas area</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Unique</div>
                <p className="text-muted-foreground">Alcohol-gambling addiction nexus affecting Henderson families</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Henderson's affluent suburban image masks a significant addiction problem. Casino workers bring the gambling mentality home. Families with access to the Strip develop alcohol dependencies. The normalization of substance use in Nevada's entertainment culture creates dangerous blind spots for recognizing addiction.
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
                  How Addiction Affects Henderson Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Henderson's proximity to Las Vegas creates an environment where the line between recreation and addiction blurs. Casino workers experience occupational exposure to gambling and alcohol that follows them home. "A night out" in Las Vegas can mask a serious dependency. Spouses and children cope with the fallout of a loved one's gambling and substance use disorder.
                  </p>
                  <p>
                    The normalization of alcohol and gambling in Nevada's culture means many Henderson families don't recognize addiction until financial ruin, health crisis, or family breakdown makes it impossible to deny.
                  </p>
                  <p>
                    Without professional intervention, families attempt to manage the crisis through enabling—covering debts, making excuses, providing housing—patterns that sustain addiction rather than break it.
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
                  How Freedom Interventions Helps Henderson Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Matt Brown brings over 20 years of specialized experience helping families navigate complex addiction scenarios, including co-occurring alcohol and gambling disorders common in the Las Vegas metro area.
                  </p>
                  <p>
                    <strong className="text-foreground">Local Resource Network:</strong> We connect families with St. Rose Dominican Hospital, Montevista Hospital (behavioral health), WestCare Nevada, and treatment programs throughout Clark County and beyond.
                  </p>
                  <p>
                    <strong className="text-foreground">Dual-Disorder Expertise:</strong> When addiction intersects with gambling disorder or co-occurring mental health issues, we ensure treatment recommendations address the complete picture.
                  </p>
                  <p>
                    <strong className="text-foreground">Family Healing:</strong> We help Henderson families establish healthy boundaries, end enabling behaviors, and build a recovery-supportive environment in their home.
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
                  Hope for Henderson and Clark County Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery is possible, even in Nevada's challenging environment. We've helped Clark County families guide their loved ones out of the cycle of addiction and witnessed lasting transformations.
                  </p>
                  <p>
                    Key local resources include St. Rose Dominican Hospital (medical), Montevista Hospital (behavioral health), and WestCare Nevada (community-based treatment). When specialized care is needed, we connect families with top treatment centers nationally.
                  </p>
                  <p>
                    Don't let Nevada's culture of excess normalize your loved one's addiction. Professional intervention can change everything.
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
              Get Help for Your Clark County Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve all of Clark County including Henderson, Green Valley, Boulder City, and surrounding communities.
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


      <LocationLinks currentLocation="Henderson" locationType="city" />
      <Footer />
    </div>
  );
};

export default HendersonNevada;
