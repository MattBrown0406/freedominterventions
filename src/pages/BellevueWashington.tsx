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

const BellevueWashington = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Washington", href: "/washington" },
    { name: "Bellevue", href: "/bellevue-washington" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Bellevue, Washington | Freedom Interventions"
        description="Bellevue families facing addiction get expert intervention support. Matt Brown serves King County and the Eastside. Free consultation. (541) 838-6009."
        keywords="Bellevue addiction intervention, King County drug intervention, Eastside Washington intervention, high-functioning addiction Bellevue, prescription opioid intervention Bellevue, tech culture addiction help"
        canonical="https://freedominterventions.com/bellevue-washington"
      />
      <LocalBusinessSchema location="Bellevue" state="Washington" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={cityBanner}
          alt="Washington State landscape representing hope for Bellevue families facing addiction"
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
              Bellevue, Washington
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Bellevue's Hidden Addiction Crisis: Professional Intervention for Eastside King County Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Behind Bellevue's gleaming skyline and tech-industry success lies a growing crisis that wealth and status can't fix: high-functioning addiction. Prescription opioids, alcohol dependency, and hidden substance abuse are devastating Eastside families who believe this only happens to "other people." Freedom Interventions brings expert, discreet intervention services to Bellevue and King County's Eastside communities.
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
                  Understanding Bellevue's Addiction Challenge
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Addiction doesn't discriminate by zip code or salary. In Bellevue and across the Eastside, high-functioning addiction thrives because success masks the problem. Tech industry pressure, high-stress careers, and a culture that glorifies productivity can fuel alcohol and prescription drug dependency for years before a family recognizes what's happening. King County as a whole remains deeply affected by Washington's addiction crisis.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">~150K</div>
                <p className="text-muted-foreground">Bellevue residents in one of WA's most affected metro regions</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">High</div>
                <p className="text-muted-foreground">Rates of prescription opioid and alcohol misuse in affluent communities</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Years</div>
                <p className="text-muted-foreground">Average delay before high-functioning addiction is addressed by families</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              From Medina to Mercer Island, Kirkland to Redmond, Eastside families are dealing with addiction that hides behind professional achievement. The same drive and intensity that makes someone successful in tech can fuel compulsive substance use that eventually becomes impossible to hide.
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
                  How Addiction Affects Bellevue Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    In Bellevue, addiction often shows up in sophisticated packaging. The executive who drinks a bottle of wine every night. The software engineer self-medicating anxiety with prescription pills. The parent whose weekend drinking has quietly become a daily habit. Success and high income create a buffer that allows addiction to go unaddressed far longer than it should.
                  </p>
                  <p>
                    Families in affluent communities often face unique barriers: fear of social stigma, concern about professional reputation, and the belief that they should be able to "handle this ourselves." These barriers cost precious time—and sometimes lives.
                  </p>
                  <p>
                    High-functioning addiction is still addiction. The consequences—broken relationships, health deterioration, career collapse, and fatal overdose—are equally devastating whether they happen in a Bellevue mansion or a studio apartment.
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
                  How Freedom Interventions Helps Bellevue Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    With over 20 years of experience including work with high-functioning professionals and their families, Matt Brown understands the specific dynamics at play on the Eastside. We approach intervention with the discretion, sophistication, and clinical precision that Bellevue families expect.
                  </p>
                  <p>
                    <strong className="text-foreground">Eastside Resources:</strong> We connect families with King County's top-tier treatment resources including Overlake Medical Center, Fairfax Hospital Behavioral Health, and Eastside Recovery. We identify programs that match both clinical needs and lifestyle considerations.
                  </p>
                  <p>
                    <strong className="text-foreground">Absolute Discretion:</strong> We understand that privacy is paramount. Our process is completely confidential, protecting your family's personal and professional reputation throughout.
                  </p>
                  <p>
                    <strong className="text-foreground">Executive-Level Planning:</strong> We navigate the logistics that high-functioning individuals often use as objections—work schedules, travel commitments, family obligations—to ensure treatment happens without further delay.
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
                  Hope for Eastside Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery transforms lives regardless of income or status. We've helped Eastside families break through years of high-functioning addiction and guide their loved ones into treatment that actually works. The intelligence and drive that fuel success in tech can be redirected into one of the most powerful recoveries you'll ever witness.
                  </p>
                  <p>
                    The earlier you act, the more you preserve. Don't wait for a DUI, a health crisis, or a career collapse to force the issue. Professional intervention creates the structured opportunity your family needs now.
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
              Get Help for Your Bellevue Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Don't wait for the next crisis. Our free, confidential consultation helps you understand your options and build a plan. We serve all of King County's Eastside including Bellevue, Kirkland, Redmond, Mercer Island, Issaquah, Sammamish, and Medina.
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


      <LocationLinks currentLocation="Bellevue" locationType="city" parentState="Washington" />
      <Footer />
    </div>
  );
};

export default BellevueWashington;
