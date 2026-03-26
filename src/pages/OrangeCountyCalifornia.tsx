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

const OrangeCountyCalifornia = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "California", href: "/california" },
    { name: "Orange County", href: "/orange-county-california" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Orange County, California | Freedom Interventions"
        description="Orange County families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Orange County, CA. Free consultation. (541) 838-6009."
        keywords="Orange County addiction intervention, Orange County drug intervention, OC family intervention, intervention specialist Orange County CA, Orange County interventionist, prescription opioid intervention OC, high-functioning addiction Orange County"
        canonical="https://freedominterventions.com/orange-county-california"
      />
      <LocalBusinessSchema location="Orange County" state="California" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={californiaBanner}
          alt="Orange County California addiction intervention services"
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
              Orange County, California
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Orange County's Prescription Opioid Crisis: Expert Intervention Services for Southern California Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Orange County's affluent coastal image masks one of Southern California's most serious addiction crises. With a prescription opioid epidemic that has evolved into heroin and fentanyl dependency, and high-functioning addiction thriving behind professional success in communities from Newport Beach to Anaheim, OC families need expert intervention support. Freedom Interventions provides compassionate, structured intervention services throughout Orange County.
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
                  Understanding Orange County's Addiction Challenge
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Orange County has long been known as ground zero for the prescription opioid epidemic in Southern California. The county's wealthy communities, abundant pain management clinics, and culture of affluence created an environment where opioid prescribing was normalized for years. Today, as those prescriptions have dried up, many OC residents have transitioned to heroin and fentanyl—with deadly consequences across every zip code.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">3.2M</div>
                <p className="text-muted-foreground">Orange County population—California's third-most populous county</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <p className="text-muted-foreground">Overdose deaths in Orange County annually</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Rx→</div>
                <p className="text-muted-foreground">Prescription opioid epidemic transitioned to fentanyl/heroin crisis</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              From Huntington Beach to Mission Viejo, from Newport Beach to Santa Ana, no Orange County community is untouched. The county is home to numerous treatment centers—sometimes called the "Treatment Capital of California"—yet many families don't know how to access quality care or motivate their loved one to accept help.
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
                  How Addiction Affects Orange County Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Orange County families face a specific set of addiction dynamics. Affluent communities in Newport Beach, Laguna Beach, and San Clemente deal with high-functioning addiction sustained by wealth and social acceptance of heavy drinking. Working-class communities in Santa Ana, Anaheim, and Garden Grove face meth and fentanyl crises with fewer resources to fight back.
                  </p>
                  <p>
                    Orange County also has a large treatment industry that can sometimes do more harm than good—predatory sober living homes, insurance fraud, and low-quality treatment facilities have victimized OC families. Families need a trusted guide to navigate this landscape and find genuinely effective treatment.
                  </p>
                  <p>
                    Freedom Interventions provides that guidance. We help OC families cut through the noise, identify quality treatment options, and create interventions that motivate lasting change—not just temporary compliance.
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
                  How Freedom Interventions Helps Orange County Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    With over 20 years of experience, Matt Brown navigates the complex Southern California treatment landscape with families, helping them avoid pitfalls and connect with genuinely effective care options.
                  </p>
                  <p>
                    <strong className="text-foreground">Trusted Treatment Navigation:</strong> Orange County has exceptional resources including CHOC (Children's Hospital of Orange County), Hoag Hospital's behavioral health programs, MFI Recovery Center, and Western Pacific Med Corp. We identify the right fit for each person's specific situation.
                  </p>
                  <p>
                    <strong className="text-foreground">Fraud Protection:</strong> We help families navigate Orange County's treatment industry carefully, avoiding predatory programs and connecting only with vetted, ethical providers with proven outcomes.
                  </p>
                  <p>
                    <strong className="text-foreground">Family Systems Work:</strong> Orange County's family dynamics—often involving wealth, privilege, and multi-generational enabling—require specialized intervention approaches we've spent decades developing.
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
                  Hope for Orange County Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery is achievable for Orange County families. Despite the complexity of the OC treatment landscape, we've helped families throughout the region guide their loved ones into quality treatment and witnessed genuine, lasting recoveries.
                  </p>
                  <p>
                    Don't navigate this alone—and don't wait. A free consultation with Matt Brown can help you understand exactly what you're dealing with, what options exist, and what your family can do right now to change the trajectory.
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
              Get Help for Your Orange County Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Don't wait for another crisis. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve all of Orange County including Anaheim, Irvine, Santa Ana, Huntington Beach, Newport Beach, Fullerton, Costa Mesa, and surrounding communities.
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

      <LocationLinks currentLocation="Orange County" locationType="city" parentState="California" />
      <Footer />
    </div>
  );
};

export default OrangeCountyCalifornia;
