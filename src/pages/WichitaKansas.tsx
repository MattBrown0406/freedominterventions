import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import oregonBanner from "@/assets/oregon-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const WichitaKansas = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Kansas", href: "/kansas" },
    { name: "Wichita", href: "/wichita-kansas" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Wichita, Kansas | Freedom Interventions"
        description="Professional addiction intervention services in Wichita, KS. Matt Brown, certified interventionist with 20+ years experience, helps Sedgwick County families navigate meth and fentanyl addiction. Free consultation. Call (541) 838-6009."
        keywords="Wichita addiction intervention, Wichita Kansas interventionist, drug intervention Wichita KS, Sedgwick County addiction help, meth intervention Wichita, fentanyl Wichita Kansas"
        canonical="https://freedominterventions.com/wichita-kansas"
      />
      <LocalBusinessSchema location="Wichita" state="Kansas" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={oregonBanner}
          alt="Wichita Kansas — addiction intervention services for Sedgwick County families"
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
              Wichita, Kansas — Sedgwick County
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Addiction Intervention Services in Wichita, Kansas
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Wichita is Kansas's largest city — and its drug crisis reflects the scale of that. With meth deeply entrenched in the working-class aerospace and manufacturing community and fentanyl spreading rapidly across Sedgwick County, families need more than good intentions. They need a plan, a professional, and someone who will show up. Matt Brown has 20+ years of experience helping families in communities exactly like Wichita.
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

      {/* Crisis Stats */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Wichita's Addiction Crisis
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Wichita sits at the center of Kansas's drug trafficking geography. As a major I-35 corridor city, it serves as a distribution hub for methamphetamine and increasingly for fentanyl coming through I-70 from the west. Sedgwick County's working-class population — heavily concentrated in aerospace, manufacturing, and service industries — faces economic pressures that compound addiction risk while public behavioral health resources remain severely limited.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-background p-6 rounded-xl border border-border">
                    <div className="text-3xl font-bold text-primary mb-2">~395K</div>
                    <p className="text-muted-foreground">Wichita population — Kansas's largest city</p>
                  </div>
                  <div className="bg-background p-6 rounded-xl border border-border">
                    <div className="text-3xl font-bold text-primary mb-2">Meth + Fentanyl</div>
                    <p className="text-muted-foreground">Dual drug crisis driving Sedgwick County overdose deaths</p>
                  </div>
                  <div className="bg-background p-6 rounded-xl border border-border">
                    <div className="text-3xl font-bold text-primary mb-2">Limited</div>
                    <p className="text-muted-foreground">Public behavioral health capacity vs. demand in Wichita</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Addiction Affects Wichita Families */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  How Addiction Affects Wichita Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    In Wichita's aviation and manufacturing sector, addiction often develops in plain sight — shift workers using meth to power through back-to-back shifts, union employees hiding a growing opioid problem after a workplace injury, veterans self-medicating trauma with alcohol that escalates to harder substances. The blue-collar ethic of toughness and self-sufficiency makes asking for help feel like weakness.
                  </p>
                  <p>
                    Wichita families often try to manage addiction privately for years before reaching out. By the time they do, enabling patterns are deeply entrenched — families paying bills, making excuses to employers, bailing loved ones out of legal trouble. Dismantling those patterns requires professional guidance, not just good intentions.
                  </p>
                  <p>
                    The gap between those who need treatment and those who can access it is significant in Wichita. Limited public mental health resources, long wait times, and insufficient detox capacity mean that families need a professional who knows how to navigate the system and secure placement quickly — before the window closes.
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
                  How Freedom Interventions Helps Wichita Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Matt Brown travels to Wichita and throughout Sedgwick County to work directly with families at their most critical moment. His approach is evidence-based, compassionate, and built on a singular reality: addiction is a chronic medical illness with a spiritual solution, not a character flaw.
                  </p>
                  <p>
                    <strong className="text-foreground">Pre-Intervention Preparation:</strong> Matt works with family members in the days before the intervention, teaching them about addiction, identifying enabling behaviors, and preparing impact statements that communicate love while holding firm on consequences.
                  </p>
                  <p>
                    <strong className="text-foreground">Treatment Placement:</strong> Matt knows the Wichita treatment landscape and the broader Kansas and national network. He secures a treatment bed before intervention day so there's no delay between acceptance and admission.
                  </p>
                  <p>
                    <strong className="text-foreground">Post-Intervention Support:</strong> Whether the intervention results in immediate treatment entry or requires ongoing family boundary work, Matt stays involved to support the family through the process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Resources */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Wichita Addiction Resources
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              These Wichita-area resources can provide immediate support. For professional intervention services, call Matt Brown at (541) 838-6009.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: "Sedgwick County AODTS", detail: "Alcohol and Other Drug Treatment Services — county-funded treatment and referral programs" },
                { name: "Prairie View", detail: "Behavioral health services including substance use treatment (Newton, serving Wichita metro)" },
                { name: "Lighthouse Behavioral Health", detail: "Outpatient substance use treatment and mental health services in Wichita" },
                { name: "Kansas Neurological Institute", detail: "State facility with behavioral health support programs" },
                { name: "Kansas Crisis Line", detail: "1-888-363-2287 — 24/7 statewide crisis support" }
              ].map((resource) => (
                <div key={resource.name} className="bg-card border border-border p-4 rounded-lg">
                  <div className="font-semibold text-foreground mb-1">{resource.name}</div>
                  <div className="text-sm text-muted-foreground">{resource.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Cities */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Other Kansas Cities We Serve
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                to="/kansas"
                className="block bg-background border border-border rounded-xl p-5 hover:border-primary/50 hover:shadow-md transition-all group"
              >
                <div className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">Kansas (State Page)</div>
                <div className="text-sm text-muted-foreground">Full statewide resources and information</div>
              </Link>
              <Link
                to="/overland-park-kansas"
                className="block bg-background border border-border rounded-xl p-5 hover:border-primary/50 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-1 mb-1">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Johnson County</span>
                </div>
                <div className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">Overland Park</div>
                <div className="text-sm text-muted-foreground">Affluent KC suburb, high-functioning addiction</div>
              </Link>
              <Link
                to="/topeka-kansas"
                className="block bg-background border border-border rounded-xl p-5 hover:border-primary/50 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-1 mb-1">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Shawnee County</span>
                </div>
                <div className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">Topeka</div>
                <div className="text-sm text-muted-foreground">State capital, significant poverty & addiction</div>
              </Link>
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
                  Hope for Wichita Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery is happening in Wichita every day. People who were deep in meth addiction, who had burned bridges and exhausted their families, are now building back their lives. A professional intervention is often the turning point — the moment when the family stops enabling and the person struggling gets the clear message that treatment is the only path forward.
                  </p>
                  <p>
                    Don't wait for the next arrest, the next overdose, the next hospital call. Call now. The consultation is free, confidential, and could be the most important call you make.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Get Help for Your Wichita Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Free, confidential consultation. Matt Brown serves Wichita, Sedgwick County, and all of Kansas. Call now or schedule online.
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


      <LocationLinks currentLocation="Wichita" locationType="city" />
      <Footer />
    </div>
  );
};

export default WichitaKansas;
