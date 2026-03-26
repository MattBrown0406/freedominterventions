import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import oregonBanner from "@/assets/oregon-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const KauaiHawaii = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Hawaii", href: "/hawaii" },
    { name: "Kauai", href: "/kauai-hawaii" },
  ];

  const otherIslands = [
    { name: "Oahu", href: "/oahu-hawaii" },
    { name: "Maui", href: "/maui-hawaii" },
    { name: "Big Island", href: "/big-island-hawaii" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services on Kauai, Hawaii | Freedom Interventions"
        description="Professional addiction intervention on Kauai, Hawaii. Extreme geographic isolation, limited local treatment, meth and alcohol crisis. Matt Brown serves all of Kauai County. Free consultation. Call (541) 838-6009."
        keywords="Kauai addiction intervention, Kauai drug intervention, Hawaii intervention specialist Kauai, Kauai County substance abuse, meth Kauai, Kauai interventionist, Garden Isle addiction help"
        canonical="https://freedominterventions.com/kauai-hawaii"
      />
      <LocalBusinessSchema location="Kauai" state="Hawaii" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={oregonBanner}
          alt="Kauai Hawaii addiction intervention services"
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
              Kauai — Kauai County
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Kauai Addiction Intervention: When Isolation Makes Every Barrier Bigger
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Kauai is Hawaii's most geographically isolated populated island — and that isolation creates unique, compounding barriers to addiction treatment. With approximately 73,000 residents, a tight-knit community culture where stigma silences families, and severely limited local treatment options, most Kauai families need help they can't find on-island. Matt Brown travels to Kauai and helps families navigate a path forward — including mainland treatment when necessary.
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
                  Kauai's Unique Addiction Challenge
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  At roughly 73,000 residents, Kauai is Hawaii's smallest populated island. There are no bridges to the other islands. The nearest major treatment resources are a flight away on Oahu. And in a community where everyone knows everyone, the shame of acknowledging addiction can feel like an impossible obstacle.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">~73K</div>
                <p className="text-muted-foreground">Kauai County residents — smallest populated Hawaiian island</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">No Bridge</div>
                <p className="text-muted-foreground">Extreme geographic isolation — accessing other-island treatment requires air travel</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Stigma</div>
                <p className="text-muted-foreground">Tight-knit community culture makes families fear judgment when seeking help</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Isolation and Stigma Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Why Kauai Families Wait — And Why They Can't Afford To
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    In a community as small and interconnected as Kauai's, privacy is a precious commodity. Families often delay seeking help because they fear that calling an interventionist, entering treatment, or even attending a support group will expose their situation to neighbors, coworkers, and friends. On an island of 73,000 people, that fear is understandable — but it's also a trap.
                  </p>
                  <p>
                    Every month a family waits, addiction deepens. By the time many Kauai families finally reach out, the situation has been escalating for years. The person they love has lost more: more health, more relationships, more ability to function. And the family has spent more time absorbing consequences that should have stopped long ago.
                  </p>
                  <p>
                    Matt Brown brings confidential, professional intervention services to Kauai. He is an outsider — which in a tight-knit community is actually an asset. Families can work with someone who has no connection to the local social network, ensuring that the process remains private and professional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meth and Alcohol Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Meth and Alcohol: Kauai's Primary Drug Threats
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Like the other Hawaiian islands, Kauai has been deeply affected by methamphetamine. Ice is accessible, affordable, and has woven itself into the fabric of communities across the island — from Lihue to Hanalei, Waimea to Poipu. Its damage compounds over time in ways that become harder to reverse the longer intervention is delayed.
                  </p>
                  <p>
                    Alcohol use disorder is also significant on Kauai, often invisible because of cultural normalization and the island's relaxed, hospitality-oriented social culture. Many families living with a loved one's alcohol addiction have never heard it named as such — they've just been managing around it for years.
                  </p>
                  <p>
                    With limited local treatment infrastructure, most Kauai residents who need residential treatment will need to travel to Oahu or the mainland. This logistics reality is exactly why having a professional interventionist in your corner matters — someone who can help you plan the whole picture, not just the conversation.
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
                  How Freedom Interventions Helps Kauai Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Matt Brown travels to Kauai and works with your family from start to finish — phone consultation, family preparation, in-person intervention, and post-intervention follow-up. No family is too small, no situation too complicated.
                  </p>
                  <p>
                    <strong className="text-foreground">Confidential Process:</strong> Everything is handled with complete confidentiality. Matt has no connections to the Kauai community, which provides families with a level of privacy they often can't find when working with local resources.
                  </p>
                  <p>
                    <strong className="text-foreground">Mainland Treatment Coordination:</strong> For most Kauai residents, residential treatment will require travel — to Oahu or the mainland. Matt helps families identify the right programs, understand what to look for, verify insurance coverage, and manage the logistics so the family can focus on what matters: getting their loved one help.
                  </p>
                  <p>
                    <strong className="text-foreground">Family Preparation:</strong> In tight-knit Kauai communities, family dynamics are often complex. Matt helps families understand enabling, develop unified messaging, and approach the intervention with clarity and confidence rather than fear and chaos.
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
              Kauai Addiction Resources
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-background p-5 rounded-xl border border-border">
                <h3 className="font-semibold text-foreground mb-1">Kauai Veterans Center</h3>
                <p className="text-sm text-muted-foreground mb-2">VA-affiliated services for veterans dealing with PTSD, mental health, and substance use disorders on Kauai</p>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <ExternalLink className="h-3.5 w-3.5" /> va.gov — Kauai location
                </span>
              </div>
              <div className="bg-background p-5 rounded-xl border border-border">
                <h3 className="font-semibold text-foreground mb-1">Kauai Community Mental Health Center</h3>
                <p className="text-sm text-muted-foreground mb-2">State-operated community mental health services including substance use disorder treatment</p>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <ExternalLink className="h-3.5 w-3.5" /> health.hawaii.gov
                </span>
              </div>
              <div className="bg-background p-5 rounded-xl border border-border">
                <h3 className="font-semibold text-foreground mb-1">KCMHC Substance Abuse Services</h3>
                <p className="text-sm text-muted-foreground mb-2">Outpatient substance abuse counseling and treatment services through the Kauai Community Mental Health Center</p>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <ExternalLink className="h-3.5 w-3.5" /> health.hawaii.gov/substance-abuse
                </span>
              </div>
              <div className="bg-background p-5 rounded-xl border border-border">
                <h3 className="font-semibold text-foreground mb-1">Garden Isle Recovery</h3>
                <p className="text-sm text-muted-foreground mb-2">Substance use disorder recovery support services for Kauai County residents</p>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <ExternalLink className="h-3.5 w-3.5" /> Local Kauai resource
                </span>
              </div>
            </div>
            <div className="mt-6 p-5 bg-background rounded-xl border border-primary/30">
              <p className="text-sm text-foreground font-medium mb-1">Hawaii CARES Crisis Line (Statewide)</p>
              <a href="tel:1-800-753-6879" className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
                <Phone className="h-3.5 w-3.5" /> 1-800-753-6879 (24/7)
              </a>
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
            Kauai Families: Confidential Help Is One Call Away
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-3xl mx-auto">
            In a small community, fear of judgment keeps families from asking for help. That silence costs lives. Matt Brown is an outside professional who brings expertise, confidentiality, and a proven process. Call now — everything stays private.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/#booking">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Free Consultation
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <a href="tel:541-838-6009">
                <Phone className="mr-2 h-5 w-5" />
                Call (541) 838-6009
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

export default KauaiHawaii;
