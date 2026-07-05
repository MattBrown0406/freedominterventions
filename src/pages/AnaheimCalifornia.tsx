import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import californiaBanner from "@/assets/california-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const AnaheimCalifornia = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "California", href: "/california" },
    { name: "Anaheim", href: "/anaheim-california" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Anaheim, California | Freedom Interventions"
        description="Anaheim families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Orange County. Free consultation. (541) 668-8084."
        keywords="Anaheim addiction intervention, Anaheim drug intervention, Anaheim family intervention, intervention specialist Anaheim CA, Orange County interventionist, fentanyl intervention Anaheim, working class addiction Anaheim"
        canonical="https://freedominterventions.com/anaheim-california"
      />
      <LocalBusinessSchema location="Anaheim" state="California" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={californiaBanner}
          alt="Anaheim California addiction intervention services"
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
              Anaheim, California
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Behind Disneyland's Magic: Anaheim's Real Addiction Crisis and Expert Intervention Services
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Anaheim is known worldwide for Disneyland and the Angels, but Orange County's largest city faces a serious addiction crisis that affects its working-class and immigrant communities. High fentanyl rates, methamphetamine, and the pressures of economic hardship create devastating conditions for Anaheim families. Freedom Interventions provides compassionate, effective intervention services for families throughout Anaheim and Orange County.
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
                  Understanding Anaheim's Addiction Crisis
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Anaheim's diverse, working-class communities face significant addiction challenges. Fentanyl has infiltrated neighborhoods throughout the city, taking lives at an alarming rate. Methamphetamine remains a persistent problem, particularly in areas with economic hardship. The city's large hospitality and service sector workforce—often working multiple jobs without adequate healthcare—faces enormous stress that contributes to substance use.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">~350K</div>
                <p className="text-muted-foreground">Anaheim population—Orange County's largest city</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">↑</div>
                <p className="text-muted-foreground">Fentanyl overdose rates rising sharply in working-class OC neighborhoods</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Tourism</div>
                <p className="text-muted-foreground">Tourism corridor creates unique drug availability and accessibility challenges</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              From the resort corridor near Disneyland to the diverse neighborhoods of West Anaheim and Central Anaheim, the addiction crisis affects families across all backgrounds. Many Anaheim families face language barriers, immigration concerns, and lack of insurance that make accessing help feel impossible—but it isn't.
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
                  How Addiction Affects Anaheim Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Anaheim's working families carry heavy burdens. When a family member develops an addiction, it can threaten housing, immigration status, employment, and the stability of entire households. The fear of consequences—legal, financial, immigration-related—often prevents families from seeking help until the situation is severe.
                  </p>
                  <p>
                    Young people in Anaheim face particular risks. The accessibility of fentanyl in counterfeit pill form—pills that look identical to legitimate prescriptions—means that experimentation can be immediately fatal. Parents and families need to act quickly when they see warning signs, not wait for things to get worse.
                  </p>
                  <p>
                    Freedom Interventions meets Anaheim families where they are—without judgment, with compassion, and with practical guidance for navigating the path to treatment regardless of their circumstances.
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
                  How Freedom Interventions Helps Anaheim Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    With over 20 years of experience, Matt Brown provides specialized intervention services for Anaheim and Orange County families. We work with families from all backgrounds, cultures, and circumstances to create intervention plans that actually work.
                  </p>
                  <p>
                    <strong className="text-foreground">Local Treatment Resources:</strong> Anaheim has access to UCI Health, Anaheim Regional Medical Center, and Restored Life Recovery, as well as numerous treatment programs throughout Orange County. We connect families with the right fit for their loved one's specific needs and circumstances.
                  </p>
                  <p>
                    <strong className="text-foreground">Accessibility:</strong> We work with families regardless of insurance status, helping navigate Medi-Cal, sliding scale, and other funding options to access quality treatment.
                  </p>
                  <p>
                    <strong className="text-foreground">Urgency:</strong> Fentanyl doesn't wait. When the situation demands quick action, we're ready to move rapidly to create an intervention plan and mobilize treatment resources.
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
                  Hope for Anaheim Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery is real for Anaheim families. We've helped families throughout Orange County—from diverse working-class communities to more affluent neighborhoods—guide their loved ones into treatment and build new lives in recovery.
                  </p>
                  <p>
                    No barrier is too great. No situation is too far gone. A free, confidential conversation with Matt Brown is the first step toward getting your loved one the help they need.
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
              Get Help for Your Anaheim Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve Anaheim and all of Orange County including Garden Grove, Fullerton, Orange, Santa Ana, and surrounding communities.
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


      <LocationLinks currentLocation="Anaheim" locationType="city" parentState="California" />
      <Footer />
    </div>
  );
};

export default AnaheimCalifornia;
