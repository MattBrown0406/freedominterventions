import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import oregonBanner from "@/assets/oregon-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const OahuHawaii = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Hawaii", href: "/hawaii" },
    { name: "Oahu", href: "/oahu-hawaii" },
  ];

  const otherIslands = [
    { name: "Maui", href: "/maui-hawaii" },
    { name: "Big Island", href: "/big-island-hawaii" },
    { name: "Kauai", href: "/kauai-hawaii" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services on Oahu, Hawaii | Freedom Interventions"
        description="Professional addiction intervention services on Oahu, Hawaii. Matt Brown serves Honolulu, military families at Pearl Harbor & Schofield Barracks, and all of Oahu. Ice/meth, fentanyl, PTSD-linked substance use. Free consultation. Call (541) 668-8084."
        keywords="Oahu addiction intervention, Honolulu drug intervention, Hawaii intervention specialist, Oahu interventionist, military addiction Oahu, meth intervention Oahu, fentanyl Honolulu"
        canonical="https://freedominterventions.com/oahu-hawaii"
      />
      <LocalBusinessSchema location="Oahu" state="Hawaii" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={oregonBanner}
          alt="Oahu Hawaii addiction intervention services"
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
              Oahu, Hawaii — Honolulu County
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Oahu's Urban Addiction Crisis: Professional Intervention Services for Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Oahu is home to nearly one million people and Hawaii's most concentrated addiction crisis. Ice/methamphetamine dominates the drug landscape, fentanyl is arriving in the supply chain, and Oahu's large military community faces a distinct PTSD-substance use co-occurrence. Freedom Interventions serves all of Oahu — Honolulu, Kailua, Kaneohe, Kapolei, and beyond.
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
                  Oahu's Addiction Landscape
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  As Hawaii's most populous island, Oahu accounts for a substantial share of the state's ~400 annual overdose deaths. Honolulu's urban environment concentrates drug availability while simultaneously creating a false sense that addiction is someone else's problem.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">~1M</div>
                <p className="text-muted-foreground">Oahu population — Hawaii's most populous island</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Ice</div>
                <p className="text-muted-foreground">Methamphetamine remains the dominant drug crisis across Oahu</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">60K+</div>
                <p className="text-muted-foreground">Active duty military and dependents on Oahu — PTSD/substance use risk</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Fentanyl is increasingly being detected in Honolulu's drug supply — often mixed into methamphetamine or counterfeit pills. People who believe they're only using ice are now dying from fentanyl exposure. This makes early intervention more urgent than ever.
            </p>
          </div>
        </div>
      </section>

      {/* Military Community Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Military Families on Oahu: A Distinct Challenge
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Pearl Harbor, Schofield Barracks, Marine Corps Base Hawaii (Kaneohe Bay), and Hickam Air Force Base make Oahu home to one of the nation's largest military communities. This population carries a disproportionate burden of PTSD, traumatic brain injury, and combat-related stress — all significant risk factors for substance use disorders.
                  </p>
                  <p>
                    Military families face unique intervention challenges: fear of career consequences, chain-of-command complications, frequent moves that disrupt treatment, and a culture of self-reliance that can delay seeking help. Spouses and dependents are often left in isolation far from their home communities, increasing vulnerability.
                  </p>
                  <p>
                    Matt Brown understands these dynamics. He works with military families to navigate TRICARE coverage, VA resources, and treatment options that accommodate the military lifestyle — without putting a service member's career at unnecessary risk.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  How Freedom Interventions Serves Oahu Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Matt Brown travels to Oahu and works directly with your family — before, during, and after the intervention. The goal isn't just getting your loved one to agree to treatment. It's building a plan that has the best possible chance of leading to lasting recovery.
                  </p>
                  <p>
                    <strong className="text-foreground">Pre-Intervention Coaching:</strong> Matt prepares every family member — what to say, how to say it, and what to do if the answer is no. Poor preparation is the biggest reason interventions fail.
                  </p>
                  <p>
                    <strong className="text-foreground">Treatment Placement:</strong> Treatment must be arranged before the intervention. Matt helps Oahu families evaluate local resources like Hina Mauka alongside mainland options — and helps families understand what makes a treatment program actually effective.
                  </p>
                  <p>
                    <strong className="text-foreground">Boundaries Without Blame:</strong> Families often enable addiction without realizing it. Matt helps the family identify and stop enabling behaviors — not to punish their loved one, but because boundaries are the most powerful lever families have.
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
              Oahu Addiction Resources
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-background p-5 rounded-xl border border-border">
                <h3 className="font-semibold text-foreground mb-1">Hina Mauka</h3>
                <p className="text-sm text-muted-foreground mb-2">Oahu's leading nonprofit substance use disorder treatment provider with residential and outpatient services</p>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <ExternalLink className="h-3.5 w-3.5" /> hinamauka.org
                </span>
              </div>
              <div className="bg-background p-5 rounded-xl border border-border">
                <h3 className="font-semibold text-foreground mb-1">Hawaii DOH Alcohol & Drug Abuse Division</h3>
                <p className="text-sm text-muted-foreground mb-2">State agency overseeing treatment services; provides referrals to licensed providers statewide</p>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <ExternalLink className="h-3.5 w-3.5" /> health.hawaii.gov/substance-abuse
                </span>
              </div>
              <div className="bg-background p-5 rounded-xl border border-border">
                <h3 className="font-semibold text-foreground mb-1">Queen's Medical Center Behavioral Health</h3>
                <p className="text-sm text-muted-foreground mb-2">Inpatient and outpatient psychiatric and substance use services at Hawaii's largest hospital</p>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <ExternalLink className="h-3.5 w-3.5" /> queensmedicalcenter.net
                </span>
              </div>
              <div className="bg-background p-5 rounded-xl border border-border">
                <h3 className="font-semibold text-foreground mb-1">The CARE Hawaii</h3>
                <p className="text-sm text-muted-foreground mb-2">Comprehensive addiction recovery and education services on Oahu</p>
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <ExternalLink className="h-3.5 w-3.5" /> carehawaii.org
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
            Oahu Families: Get Expert Help Today
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-3xl mx-auto">
            Whether your family is in Honolulu, Kailua, Aiea, or anywhere on Oahu — Matt Brown will come to you. Start with a free, confidential consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/#booking">
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

export default OahuHawaii;
