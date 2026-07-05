import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import oregonBanner from "@/assets/oregon-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const BigIslandHawaii = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Hawaii", href: "/hawaii" },
    { name: "Big Island", href: "/big-island-hawaii" },
  ];

  const otherIslands = [
    { name: "Oahu", href: "/oahu-hawaii" },
    { name: "Maui", href: "/maui-hawaii" },
    { name: "Kauai", href: "/kauai-hawaii" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services on the Big Island, Hawaii | Freedom Interventions"
        description="Professional addiction intervention on Hawaii's Big Island. Meth/ice deeply entrenched, limited local treatment, rural communities in Hilo and Kona. Matt Brown serves all of Hawaii County. Free consultation. Call (541) 668-8084."
        keywords="Big Island addiction intervention, Hawaii County drug intervention, Hilo intervention specialist, Kona addiction help, Big Island meth intervention, Hawaii Island interventionist, rural Hawaii addiction"
        canonical="https://freedominterventions.com/big-island-hawaii"
      />
      <LocalBusinessSchema location="Big Island" state="Hawaii" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={oregonBanner}
          alt="Big Island Hawaii addiction intervention services"
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
              Big Island — Hawaii County
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Big Island Addiction Intervention: Rural Communities Deserve Expert Help Too
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Hawaii County's Big Island is the state's largest island by area and one of its most rural. Methamphetamine — "ice" — is deeply entrenched in communities from Hilo to Kona to the remote agricultural areas in between. Limited treatment infrastructure means families often have nowhere local to turn. Matt Brown travels to the Big Island and helps families navigate a path forward.
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

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  The Big Island's Addiction Reality
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  The Big Island's geographic size — larger than all other Hawaiian islands combined — means communities are spread across vast distances. Access to treatment is limited. Many areas have no local treatment providers at all. Families deal with addiction in isolation, often for years before reaching out for help.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">~200K</div>
                <p className="text-muted-foreground">Hawaii County residents across a vast, largely rural island</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Ice</div>
                <p className="text-muted-foreground">Meth deeply entrenched across rural and agricultural communities</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Limited</div>
                <p className="text-muted-foreground">Treatment infrastructure — most families need mainland referrals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rural Challenge Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Rural Isolation: The Big Island's Biggest Barrier
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    The Big Island's rural character is both its appeal and its greatest obstacle when it comes to addiction. Communities in Puna, Ka'u, North and South Kohala, and the Hamakua Coast are geographically isolated from the treatment resources concentrated in Hilo and Kona. Getting to help is hard. Knowing it exists is even harder.
                  </p>
                  <p>
                    Agricultural and working-class communities on the Big Island have been hit especially hard by methamphetamine. Ice is cheap, accessible, and provides a temporary escape from economic stress — but the damage it does to individuals, families, and communities is devastating and compounding.
                  </p>
                  <p>
                    Native Hawaiian communities on the Big Island face additional systemic barriers: historical trauma, limited access to culturally competent care, and treatment systems that weren't designed with their cultural values in mind. Effective intervention must account for these realities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hilo vs Kona Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Hilo, Kona, and the Communities In Between
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Hilo on the east side and Kailua-Kona on the west are the Big Island's two population centers — and the island's primary concentrations of treatment resources. But even these areas have limited capacity. Waiting lists for residential treatment are common. Outpatient programs fill quickly.
                  </p>
                  <p>
                    The practical reality for most Big Island families is this: if your loved one needs residential treatment, it will likely be on the mainland. That's not a failure — it's a logistics challenge that a professional interventionist helps you solve. Matt Brown has helped families navigate mainland treatment placements across the country and understands the anxiety of sending a loved one far from home.
                  </p>
                  <p>
                    The intervention itself can happen on the Big Island. The treatment doesn't have to.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  How Freedom Interventions Helps Big Island Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Matt Brown travels to the Big Island and works directly with families in their community — wherever that is on the island. He brings 20+ years of experience and understands that rural island addiction carries dynamics that urban-focused interventionists often miss.
                  </p>
                  <p>
                    <strong className="text-foreground">Culturally Grounded Approach:</strong> The Big Island has one of Hawaii's highest concentrations of Native Hawaiians. Matt approaches intervention with respect for cultural values — particularly the concept of ohana (family) and the role of community in healing.
                  </p>
                  <p>
                    <strong className="text-foreground">Mainland Treatment Navigation:</strong> When local resources are insufficient, Matt helps families identify and evaluate mainland treatment programs — demystifying the process, managing logistics, and ensuring the treatment choice is the right fit for the individual.
                  </p>
                  <p>
                    <strong className="text-foreground">Family Systems Work:</strong> In tight-knit communities, enabling dynamics can run deep. Extended family members, close friends, and community connections often play roles that need to be addressed. Matt helps families organize around a unified message.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Big Island Addiction Resources
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-background p-5 rounded-xl border border-border">
                <h3 className="font-semibold text-foreground mb-1">Hawaii Island Recovery</h3>
                <p className="text-sm text-muted-foreground mb-2">Residential addiction treatment on the Big Island with nature-based, holistic programming</p>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <ExternalLink className="h-3.5 w-3.5" /> hawaiiislandrecovery.com
                </span>
              </div>
              <div className="bg-background p-5 rounded-xl border border-border">
                <h3 className="font-semibold text-foreground mb-1">Hilo Medical Center Behavioral Health</h3>
                <p className="text-sm text-muted-foreground mb-2">Hospital-based behavioral health and substance use services in Hilo</p>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <ExternalLink className="h-3.5 w-3.5" /> hilomedicalcenter.org
                </span>
              </div>
              <div className="bg-background p-5 rounded-xl border border-border">
                <h3 className="font-semibold text-foreground mb-1">Big Island Substance Abuse Council</h3>
                <p className="text-sm text-muted-foreground mb-2">Community-based substance abuse prevention and treatment services across Hawaii County</p>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <ExternalLink className="h-3.5 w-3.5" /> bisac.org
                </span>
              </div>
              <div className="bg-background p-5 rounded-xl border border-border">
                <h3 className="font-semibold text-foreground mb-1">HOPE Services Hawaii</h3>
                <p className="text-sm text-muted-foreground mb-2">Behavioral health and recovery support services for Big Island residents</p>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <ExternalLink className="h-3.5 w-3.5" /> hopeserviceshawaii.org
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4 italic">
              Resource listings are for informational purposes only. Freedom Interventions does not receive referral fees from any provider.
            </p>
          </div>
        </div>
      </section>

      {/* Other Islands */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-foreground mb-4">Serving All Hawaiian Islands</h2>
            <div className="flex flex-wrap gap-3">
              <Link to="/hawaii" className="px-4 py-2 bg-card border border-border rounded-lg text-sm text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                ← Hawaii (State Overview)
              </Link>
              {otherIslands.map((island) => (
                <Link key={island.name} to={island.href} className="px-4 py-2 bg-card border border-border rounded-lg text-sm text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                  {island.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Big Island Families: You Don't Have to Navigate This Alone
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-3xl mx-auto">
            Rural doesn't mean hopeless. Matt Brown travels to the Big Island and will help your family build a plan — from intervention to treatment placement, wherever the best care is available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/?type=consultation#booking">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Free Consultation
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <a href="tel:541-668-8084">
                <Phone className="mr-2 h-5 w-5" />
                Call (541) 668-8084
              </a>
            </Button>
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


      <Footer />
    </div>
  );
};

export default BigIslandHawaii;
