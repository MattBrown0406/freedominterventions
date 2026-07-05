import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import losAngelesBanner from "@/assets/los-angeles-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const PasadenaCalifornia = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "California", href: "/california" },
    { name: "Pasadena", href: "/pasadena-california" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Pasadena, California | Freedom Interventions"
        description="Pasadena families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Los Angeles County. Free consultation. (541) 668-8084."
        keywords="Pasadena addiction intervention, Pasadena drug intervention, Pasadena family intervention, intervention specialist Pasadena CA, Los Angeles County interventionist, high-functioning addiction Pasadena, prescription opioid intervention Pasadena"
        canonical="https://freedominterventions.com/pasadena-california"
      />
      <LocalBusinessSchema location="Pasadena" state="California" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={losAngelesBanner}
          alt="Pasadena California addiction intervention services"
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
              Pasadena, California
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Behind Pasadena's Prestige: Expert Intervention Services for High-Functioning Addiction in LA County
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Pasadena's elegant neighborhoods and prestigious institutions conceal a serious addiction crisis. In this affluent Los Angeles County suburb, prescription opioid abuse, alcohol dependency, and high-functioning addiction hide behind professional success and comfortable lifestyles. Freedom Interventions provides discreet, effective intervention services for Pasadena families who need help navigating this hidden crisis.
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
                  Understanding Pasadena's Hidden Addiction Crisis
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Pasadena's wealth and prestige create a perfect environment for addiction to go unaddressed. Prescription opioids and alcohol are the most common culprits in Pasadena's affluent communities—substances that can be rationalized, concealed, and sustained for years. The city's proximity to Los Angeles also means access to a full spectrum of illicit substances for those whose addiction escalates.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">~140K</div>
                <p className="text-muted-foreground">Pasadena population with some of LA County's highest income levels</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Hidden</div>
                <p className="text-muted-foreground">High-functioning addiction often masked for years behind professional success</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Rx</div>
                <p className="text-muted-foreground">Prescription opioid and alcohol abuse primary addiction types in affluent suburbs</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              From the historic neighborhoods of Old Pasadena to the academic communities around Caltech and PCC, from San Marino-adjacent estates to working-class neighborhoods in northwest Pasadena, addiction touches every corner of this city. Wealth doesn't protect families from addiction—it often enables it longer.
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
                  How Addiction Affects Pasadena Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Pasadena's affluent families often fall into familiar patterns: the executive whose evening wine has become a bottle a night; the professional who can't function without prescription painkillers; the college student at Caltech whose recreational drug use has crossed into dependency. The comfort of wealth and the pressure to maintain appearances keeps families silent far too long.
                  </p>
                  <p>
                    Enabling is particularly common in high-income families. When money is available, it's easy to rationalize paying for consequences, covering for a loved one, or hiring solutions that temporarily paper over the crisis. But these actions—however loving—prolong addiction and delay the help your loved one truly needs.
                  </p>
                  <p>
                    Freedom Interventions helps Pasadena families break out of this cycle with compassion, clarity, and expert guidance. We help families understand enabling, set firm boundaries, and create a structured path to treatment.
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
                  How Freedom Interventions Helps Pasadena Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    With over 20 years of experience, Matt Brown provides specialized intervention services for Pasadena and the greater Los Angeles area. We have deep experience working with high-functioning individuals and affluent families who face unique dynamics around addiction.
                  </p>
                  <p>
                    <strong className="text-foreground">Premium Treatment Access:</strong> Pasadena's proximity to some of California's best treatment facilities is an asset. We connect families with Huntington Hospital's behavioral health services, Las Encinas Behavioral Health, and Didi Hirsch Mental Health Services, as well as top residential treatment programs throughout California.
                  </p>
                  <p>
                    <strong className="text-foreground">Enabling Pattern Work:</strong> We specialize in helping high-income families recognize and change enabling behaviors that have allowed addiction to persist. This work is essential before any intervention can succeed.
                  </p>
                  <p>
                    <strong className="text-foreground">Complete Discretion:</strong> Your family's privacy is paramount. Everything we do is strictly confidential.
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
                  Hope for Pasadena Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery is possible for Pasadena families, and the resources to support it are exceptional. We've helped families across the San Gabriel Valley guide their loved ones into treatment and witnessed extraordinary recoveries.
                  </p>
                  <p>
                    The hardest step is the first one. A free, confidential consultation with Matt Brown can help you understand what's happening, what your options are, and how to move forward with love and resolve.
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
              Get Help for Your Pasadena Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve Pasadena and surrounding communities including Arcadia, Monrovia, San Marino, Alhambra, and the greater San Gabriel Valley.
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


      <LocationLinks currentLocation="Pasadena" locationType="city" parentState="California" />
      <Footer />
    </div>
  );
};

export default PasadenaCalifornia;
