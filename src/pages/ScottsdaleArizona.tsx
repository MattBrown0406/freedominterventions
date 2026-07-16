import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import arizonaBanner from "@/assets/arizona-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const ScottsdaleArizona = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Arizona", href: "/arizona" },
    { name: "Scottsdale", href: "/scottsdale-arizona" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Scottsdale, Arizona | Freedom Interventions"
        description="Scottsdale families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Maricopa County. Free consultation. (541) 668-8084."
        keywords="Scottsdale addiction intervention, Maricopa County drug intervention, Scottsdale family intervention, high-functioning addiction Scottsdale AZ, luxury rehab Scottsdale intervention"
        canonical="https://freedominterventions.com/scottsdale-arizona"
      />
      <LocalBusinessSchema location="Scottsdale" state="Arizona" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={arizonaBanner}
          alt="Arizona landscape representing Scottsdale and Maricopa County"
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
              Scottsdale, Arizona
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Scottsdale's High-Functioning Addiction Crisis: Expert Intervention for Maricopa County Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Scottsdale's affluent lifestyle and luxury reputation create a uniquely dangerous addiction environment where high-functioning dependency hides behind success and wealth. Prescription opioids and alcohol devastate Scottsdale's 260,000 residents in ways that rarely make headlines but destroy families daily. Freedom Interventions provides the specialized expertise required for high-functioning addiction intervention in Maricopa County.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/?type=consultation#booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Free Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:458-298-8000">
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
                  Understanding High-Functioning Addiction in Scottsdale
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Scottsdale is one of the nation's premier luxury rehabilitation destinations—which reflects the severity of addiction among its affluent population. High-functioning addiction thrives behind gated communities, country club memberships, and executive careers. The resources available locally are extensive, but families still need professional intervention to break through denial.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Prevalent</div>
                <p className="text-muted-foreground">High-functioning prescription opioid and alcohol dependency in Scottsdale</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Delayed</div>
                <p className="text-muted-foreground">Treatment-seeking due to wealth insulating consequences of addiction</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Hidden</div>
                <p className="text-muted-foreground">Addiction masked by successful careers, luxury lifestyle appearances</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              In Scottsdale, wealth delays the natural consequences of addiction. Expensive cars get replaced after DUIs. Lawyers manage legal problems. Executives maintain performance through increasingly desperate means. The luxury rehab market exists because Scottsdale's addiction crisis is real—but families still need professional intervention to break through the denial that money enables.
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
                  How Addiction Affects Scottsdale Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    In Scottsdale, addiction often begins with legitimate medical treatment—a sports injury leads to opioid dependency, or chronic stress leads to escalating alcohol use. The affluent lifestyle provides both the means to sustain addiction and the cushion that prevents natural consequences from forcing change.
                  </p>
                  <p>
                    Families in Scottsdale frequently find themselves enabling a loved one's addiction while maintaining the family's public image. Financial enabling is often extreme—paying for rehab stints that don't work because the intervention wasn't done professionally first.
                  </p>
                  <p>
                    High-functioning addicts are the most challenging cases precisely because they can point to their career, their home, and their family as evidence they "don't really have a problem." Professional intervention cuts through this narrative.
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
                  How Freedom Interventions Helps Scottsdale Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Matt Brown specializes in high-functioning addiction intervention—the most common and most challenging type in affluent communities like Scottsdale. With over 20 years of experience, we know how to break through the denial that success and wealth enable.
                  </p>
                  <p>
                    <strong className="text-foreground">Local Resource Network:</strong> We work with HonorHealth, Banner Behavioral Health Hospital, La Frontera Center, and Scottsdale's extensive luxury and standard residential treatment facilities to match your loved one with appropriate care.
                  </p>
                  <p>
                    <strong className="text-foreground">High-Functioning Specialty:</strong> We know how to address the "but look at everything I have" defense and guide families through the specific challenges of intervening on a high-functioning addict.
                  </p>
                  <p>
                    <strong className="text-foreground">Family Healing:</strong> We help Scottsdale families identify enabling patterns, set effective boundaries, and stop using financial resources to sustain addiction rather than support recovery.
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
                  Hope for Scottsdale and Maricopa County Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery is possible, and Scottsdale families have access to some of the country's finest treatment resources. The key is getting your loved one into the right treatment—which requires professional intervention first.
                  </p>
                  <p>
                    Key local resources include HonorHealth (medical), Banner Behavioral Health Hospital, La Frontera Center, and Scottsdale's numerous residential and luxury treatment facilities. We help families choose the right level of care for their specific situation.
                  </p>
                  <p>
                    Don't keep funding treatment that isn't working. Professional intervention changes the equation. Call us today.
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
              Get Help for Your Maricopa County Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve all of Scottsdale and greater Maricopa County including Paradise Valley, Fountain Hills, Cave Creek, and surrounding communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/?type=consultation#booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Free Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:458-298-8000">
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


      <LocationLinks currentLocation="Scottsdale" locationType="city" />
      <Footer />
    </div>
  );
};

export default ScottsdaleArizona;
