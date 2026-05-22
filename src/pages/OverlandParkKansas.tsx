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

const OverlandParkKansas = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Kansas", href: "/kansas" },
    { name: "Overland Park", href: "/overland-park-kansas" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Overland Park, Kansas | Freedom Interventions"
        description="Professional addiction intervention services in Overland Park, KS. Helping Johnson County families address high-functioning addiction, prescription opioids, alcohol, and teen drug issues. Free consultation. Call (541) 668-8084."
        keywords="Overland Park addiction intervention, Overland Park Kansas interventionist, Johnson County drug intervention, high-functioning addiction Overland Park, prescription opioid intervention Kansas, teen addiction help Overland Park"
        canonical="https://freedominterventions.com/overland-park-kansas"
      />
      <LocalBusinessSchema location="Overland Park" state="Kansas" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={oregonBanner}
          alt="Overland Park Kansas — addiction intervention services for Johnson County families"
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
              Overland Park, Kansas — Johnson County
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Addiction Intervention Services in Overland Park, Kansas
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Overland Park's affluence doesn't protect families from addiction — it hides it. High-functioning addiction, prescription opioids, alcohol dependence, and a growing teen drug crisis are real and present in Johnson County. Families here often wait longer to seek help because the stigma in a wealthy, successful community feels unbearable. Matt Brown provides discreet, professional intervention services for Overland Park families ready to stop waiting.
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
                  Overland Park's Hidden Addiction Reality
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Johnson County is one of the most affluent counties in the Midwest — and that wealth creates a dangerous illusion. High-functioning addiction thrives here: executives managing alcohol dependence, teens abusing prescription pills, parents hiding opioid addiction behind active social lives. The silence around addiction in communities where appearances matter is often what allows it to progress unchecked until crisis strikes.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-background p-6 rounded-xl border border-border">
                    <div className="text-3xl font-bold text-primary mb-2">~200K</div>
                    <p className="text-muted-foreground">Overland Park population — largest city in Johnson County</p>
                  </div>
                  <div className="bg-background p-6 rounded-xl border border-border">
                    <div className="text-3xl font-bold text-primary mb-2">High-Functioning</div>
                    <p className="text-muted-foreground">Addiction goes undetected longer in affluent professional communities</p>
                  </div>
                  <div className="bg-background p-6 rounded-xl border border-border">
                    <div className="text-3xl font-bold text-primary mb-2">Stigma</div>
                    <p className="text-muted-foreground">Wealthy communities face unique shame barriers that delay intervention</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Addiction Affects OP Families */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  How Addiction Affects Overland Park Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    In Overland Park, addiction often looks different from what families expect. It's the parent who coaches Little League and drinks a bottle of wine every night — and then two. It's the executive who manages stress with opioids prescribed after back surgery, and three years later can't function without them. It's the teenager in AP classes who started with Adderall, moved to Xanax, and is now using whatever is available at weekend parties.
                  </p>
                  <p>
                    The defining feature of addiction in Overland Park is how long families wait because "it doesn't look that bad." The house is still nice. The job is still there. The kids are still in school. The problem appears manageable — until it isn't. By the time the crisis becomes undeniable, the addiction is deeply entrenched and the family is exhausted.
                  </p>
                  <p>
                    Seeking help in an affluent community also carries unique social risk. Families fear judgment from neighbors, colleagues, and their social circle. They worry about their loved one's reputation, their career, their future. These fears are real — and they're also exactly what professional, discreet intervention services are designed to address.
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
                  How Freedom Interventions Helps Overland Park Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Matt Brown understands the unique dynamics of addiction in affluent communities. He approaches every Overland Park engagement with complete discretion and a clear understanding that the family's fear of judgment is real and valid — but cannot be the reason they delay getting help.
                  </p>
                  <p>
                    <strong className="text-foreground">Confidential Process:</strong> Everything about the intervention process is private. Matt works directly with family members in preparation, maintains confidentiality throughout, and helps secure treatment placements that fit the family's situation — including high-end residential programs when appropriate.
                  </p>
                  <p>
                    <strong className="text-foreground">High-Functioning Addiction Expertise:</strong> Matt has extensive experience with the specific patterns of high-functioning addiction — the rationalization, the minimization, the "I'm still managing" narrative. He helps families recognize these patterns and know how to respond to them.
                  </p>
                  <p>
                    <strong className="text-foreground">Teen and Young Adult Intervention:</strong> Overland Park's teen drug crisis requires a specialized approach. Matt works with parents to intervene effectively with adolescents while preserving the relationships that will be critical to long-term recovery.
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
              Overland Park Area Addiction Resources
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              These Johnson County resources can provide immediate support. For professional intervention services, call Matt Brown at (541) 668-8084.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: "Shawnee Mission Medical Center Behavioral Health", detail: "Inpatient and outpatient behavioral health and addiction services in the Johnson County area" },
                { name: "ReDiscover", detail: "Comprehensive behavioral health and substance use treatment across the Kansas City metro" },
                { name: "Mirror Inc.", detail: "Substance use treatment services serving Johnson County and surrounding areas" },
                { name: "Johnson County Mental Health Center", detail: "County-funded mental health and co-occurring disorder services for Johnson County residents" },
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
                to="/wichita-kansas"
                className="block bg-background border border-border rounded-xl p-5 hover:border-primary/50 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-1 mb-1">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Sedgwick County</span>
                </div>
                <div className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">Wichita</div>
                <div className="text-sm text-muted-foreground">Kansas's largest city, meth & fentanyl crisis</div>
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
                <div className="text-sm text-muted-foreground">State capital, poverty & addiction challenges</div>
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
                  Hope for Overland Park Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    The hardest part for many Overland Park families is making the first call. There's a fear that asking for help confirms the problem is real. But the problem is already real — the call just begins the process of doing something about it.
                  </p>
                  <p>
                    People with high-functioning addiction recover. Teenagers with drug problems rebuild their lives. Families torn apart by addiction heal. Professional intervention is often the catalyst. Don't let stigma be the reason your family suffers longer than necessary.
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
              Get Help for Your Overland Park Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Confidential, professional intervention services for Johnson County families. Free consultation — no obligation. Call now or schedule online.
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


      <LocationLinks currentLocation="Overland Park" locationType="city" />
      <Footer />
    </div>
  );
};

export default OverlandParkKansas;
