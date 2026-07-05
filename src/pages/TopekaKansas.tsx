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

const TopekaKansas = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Kansas", href: "/kansas" },
    { name: "Topeka", href: "/topeka-kansas" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Topeka, Kansas | Freedom Interventions"
        description="Professional addiction intervention services in Topeka, KS. Matt Brown helps Shawnee County families navigate meth, fentanyl, and co-occurring addiction crises. Free consultation. Call (541) 668-8084."
        keywords="Topeka addiction intervention, Topeka Kansas interventionist, Shawnee County drug intervention, meth intervention Topeka, fentanyl Topeka Kansas, co-occurring disorder intervention Topeka"
        canonical="https://freedominterventions.com/topeka-kansas"
      />
      <LocalBusinessSchema location="Topeka" state="Kansas" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={oregonBanner}
          alt="Topeka Kansas — addiction intervention services for Shawnee County families"
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
              Topeka, Kansas — Shawnee County
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Addiction Intervention Services in Topeka, Kansas
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Topeka's addiction crisis is compounded by poverty, a large homeless population, co-occurring mental health disorders, and severely limited private treatment options. As Kansas's state capital, Topeka has state government resources nearby — but those resources rarely reach the families who need them most. Matt Brown provides professional intervention services to Shawnee County families navigating one of the most challenging addiction environments in Kansas.
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
                  Topeka's Addiction Crisis
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Topeka faces a convergence of challenges that make addiction particularly severe and recovery particularly difficult. Significant poverty, a large homeless population, high rates of untreated mental illness, and co-occurring substance use disorders create a complex landscape. Meth has long been a primary driver of overdose deaths, and fentanyl has now entered the supply chain across Shawnee County. The city's private treatment options are limited, leaving many families without obvious pathways to care.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-background p-6 rounded-xl border border-border">
                    <div className="text-3xl font-bold text-primary mb-2">~125K</div>
                    <p className="text-muted-foreground">Topeka population — Kansas's state capital</p>
                  </div>
                  <div className="bg-background p-6 rounded-xl border border-border">
                    <div className="text-3xl font-bold text-primary mb-2">Co-Occurring</div>
                    <p className="text-muted-foreground">High rates of addiction paired with untreated mental health disorders</p>
                  </div>
                  <div className="bg-background p-6 rounded-xl border border-border">
                    <div className="text-3xl font-bold text-primary mb-2">Limited</div>
                    <p className="text-muted-foreground">Private treatment options make navigation essential for families</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Addiction Affects Topeka Families */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  How Addiction Affects Topeka Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    In Topeka, addiction and poverty are deeply intertwined. Families who want to help a loved one often lack the financial resources for private treatment. The person struggling may already be in the criminal justice cycle, cycling through jail, probation, and back to the streets. The presence of a large homeless population means some families have already lost track of where their loved one is. The situation can feel completely hopeless.
                  </p>
                  <p>
                    Co-occurring mental health disorders are especially prevalent in Topeka's addiction population. Untreated depression, PTSD, bipolar disorder, and schizophrenia intersect with substance use to create crises that ordinary family intervention can't address alone. Professional intervention that accounts for co-occurring conditions is essential.
                  </p>
                  <p>
                    Even in the most difficult circumstances — even when a loved one appears completely unreachable — professional intervention can make a difference. Matt Brown has worked with families in crisis situations across the country. He understands the complexity of Topeka's reality and knows how to find pathways when families can't see them.
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
                  How Freedom Interventions Helps Topeka Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Matt Brown approaches Topeka engagements with clear-eyed realism about the challenges families face — and equally clear knowledge of what's possible. Poverty and limited local resources don't eliminate options; they require a more skilled navigator.
                  </p>
                  <p>
                    <strong className="text-foreground">Treatment Navigation:</strong> Matt knows how to work within limited resources. Whether that means identifying state-funded treatment programs, negotiating scholarship beds at private facilities, or connecting families with national resources, he finds pathways that families can't find on their own.
                  </p>
                  <p>
                    <strong className="text-foreground">Co-Occurring Disorder Awareness:</strong> Interventions involving co-occurring mental health and addiction require specialized knowledge. Matt identifies when dual diagnosis treatment is needed and connects families with programs equipped to handle it.
                  </p>
                  <p>
                    <strong className="text-foreground">Family Stabilization:</strong> In Topeka's most difficult situations, the goal isn't always immediate treatment entry. Sometimes it's helping the family establish clear boundaries, stop enabling behaviors that are accelerating harm, and create conditions where treatment becomes more likely. Matt works with families on whatever timeline is realistic.
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
              Topeka Addiction Resources
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              These Topeka-area resources can provide immediate support. For professional intervention services, call Matt Brown at (541) 668-8084.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: "Valeo Behavioral Health Care", detail: "Comprehensive mental health and substance use treatment for Shawnee County residents" },
                { name: "Stormont Vail Behavioral Health", detail: "Hospital-based behavioral health services including addiction treatment" },
                { name: "Shawnee County Health Department", detail: "Public health programs including substance use prevention and referral services" },
                { name: "Doorstep Inc.", detail: "Community support services including recovery housing and assistance for individuals in crisis" },
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
                  Hope for Topeka Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Even in Topeka's most difficult circumstances, recovery happens. People who have cycled through the criminal justice system, lived on the streets, and been written off by everyone find their way to lasting sobriety. It's not easy. It requires the right professional support and a family willing to change its own behavior alongside the person struggling.
                  </p>
                  <p>
                    If you're a Topeka family who has tried everything and feels out of options — that's exactly the situation where a professional interventionist can make the biggest difference. Call for a free consultation. There is a next step.
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
              Get Help for Your Topeka Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Free, confidential consultation. Matt Brown serves Topeka, Shawnee County, and all of Kansas. No situation is too complex. Call now or schedule online.
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


      <LocationLinks currentLocation="Topeka" locationType="city" />
      <Footer />
    </div>
  );
};

export default TopekaKansas;
