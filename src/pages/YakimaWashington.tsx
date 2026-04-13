import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import cityBanner from "@/assets/washington-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const YakimaWashington = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Washington", href: "/washington" },
    { name: "Yakima", href: "/yakima-washington" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Yakima, Washington | Freedom Interventions"
        description="Yakima families in Eastern Washington facing addiction get expert intervention support from Matt Brown. Serving Yakima County. Free consultation. (541) 838-6009."
        keywords="Yakima addiction intervention, Yakima County drug intervention, Eastern Washington intervention, meth heroin intervention Yakima, addiction help Yakima WA, Yakima Valley intervention services"
        canonical="https://freedominterventions.com/yakima-washington"
      />
      <LocalBusinessSchema location="Yakima" state="Washington" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={cityBanner}
          alt="Washington State landscape representing hope for Yakima families facing addiction"
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
              Yakima, Washington
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Yakima's Meth and Heroin Crisis: Professional Intervention for Eastern Washington Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Yakima County is one of Eastern Washington's hardest-hit communities for methamphetamine and heroin addiction. In this agricultural region with a large Latino population and significant rural access barriers to treatment, families often face addiction with few local resources and enormous barriers to care. Freedom Interventions brings professional, culturally sensitive intervention services to Yakima and the Yakima Valley.
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
                  Understanding Yakima's Addiction Challenge
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Yakima County has long struggled with methamphetamine and heroin addiction, compounded by economic hardship in the agricultural sector, language and cultural barriers for Latino families, and the geographic isolation of rural communities throughout the valley. The transition from heroin to fentanyl has made an already dangerous situation even more lethal.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">~95K</div>
                <p className="text-muted-foreground">Yakima residents in one of Eastern WA's most addiction-affected counties</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">High</div>
                <p className="text-muted-foreground">Meth and heroin/fentanyl rates among Eastern Washington's worst-affected regions</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Rural</div>
                <p className="text-muted-foreground">Treatment access barriers leave many Yakima Valley families without local options</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              From Yakima city to Sunnyside, Selah to Grandview, Yakima Valley families face addiction in communities where treatment resources are limited and stigma runs deep. Agricultural workers, many of whom are seasonal employees without insurance, face additional barriers to accessing care. Cultural considerations—including language access and family honor dynamics in Latino communities—require a sensitive, informed approach.
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
                  How Addiction Affects Yakima Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    In Yakima's agricultural community, addiction often goes unaddressed because of shame, fear of legal consequences for undocumented family members, and limited awareness of treatment options. Families carry the weight of their loved one's addiction while trying to maintain work, household stability, and community standing.
                  </p>
                  <p>
                    Methamphetamine addiction is particularly destructive in close-knit communities where the behavioral changes—paranoia, aggression, neglect of responsibilities—are impossible to hide but difficult to address without outside help. Heroin and fentanyl bring the constant fear of overdose to families already stretched to the limit.
                  </p>
                  <p>
                    Rural families in the Yakima Valley often lack transportation to treatment, don't know how to navigate the system, and face months-long waitlists even when they do seek help. Professional intervention helps families navigate these barriers efficiently and get their loved one care immediately.
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
                  How Freedom Interventions Helps Yakima Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Matt Brown brings over 20 years of experience working with diverse communities across geographic and cultural contexts. We approach Yakima families with deep respect for community values while providing the direct, expert guidance needed to create real change.
                  </p>
                  <p>
                    <strong className="text-foreground">Yakima Valley Resources:</strong> We connect families with Virginia Mason Memorial, Comprehensive Healthcare, and Yakima Valley Farm Workers Clinic—as well as statewide and national options when local capacity is insufficient or when a geographic change is beneficial to recovery.
                  </p>
                  <p>
                    <strong className="text-foreground">Culturally Sensitive Approach:</strong> We understand the dynamics within Latino families and agricultural communities and work in ways that honor family structure while still creating the conditions for your loved one to accept help.
                  </p>
                  <p>
                    <strong className="text-foreground">Rural Navigation:</strong> We help Yakima Valley families navigate transportation, insurance, and access barriers that often prevent rural residents from getting timely treatment.
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
                  Hope for Yakima Valley Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery happens in communities like Yakima every day—when families have the right support and guidance. We've helped Eastern Washington families guide their loved ones into treatment despite enormous barriers, and we've watched people rebuild their lives from the ground up.
                  </p>
                  <p>
                    Geography, language, and resources don't have to be barriers when you have a professional in your corner. One call to Freedom Interventions begins a process designed to overcome every obstacle between your family and recovery.
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
              Get Help for Your Yakima Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. Our free, confidential consultation will help you understand your options. We serve all of Yakima County including Yakima, Selah, Sunnyside, Grandview, Wapato, Toppenish, and rural communities throughout the Yakima Valley.
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


      <LocationLinks currentLocation="Yakima" locationType="city" parentState="Washington" />
      <Footer />
    </div>
  );
};

export default YakimaWashington;
