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

const IrvineCalifornia = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "California", href: "/california" },
    { name: "Irvine", href: "/irvine-california" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Irvine, California | Freedom Interventions"
        description="Irvine families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Orange County. Free consultation. (541) 838-6009."
        keywords="Irvine addiction intervention, Irvine drug intervention, Irvine family intervention, intervention specialist Irvine CA, Orange County interventionist, UCI addiction, college addiction Irvine, high-functioning addiction Irvine"
        canonical="https://freedominterventions.com/irvine-california"
      />
      <LocalBusinessSchema location="Irvine" state="California" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={californiaBanner}
          alt="Irvine California planned city addiction intervention services"
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
              Irvine, California
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Irvine's Perfect City, Imperfect Reality: Expert Intervention Services for Orange County's Planned Community
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Irvine consistently ranks among America's safest and most desirable cities—yet its manicured neighborhoods and prestigious university conceal a serious addiction problem. High-functioning addiction among professionals and executives, prescription drug and alcohol abuse, and the pressures facing UC Irvine's large student population create hidden crises that devastate Irvine families. Freedom Interventions provides discreet, expert intervention services throughout Irvine and Orange County.
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
                  Understanding Irvine's Hidden Addiction Problem
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Irvine's image of planned perfection creates ideal conditions for addiction to hide. In this affluent, high-achieving community, the pressure to appear successful is immense—and the financial resources to sustain addiction are available. Alcohol and prescription drugs are the most common substances of abuse, but illicit drug use is far more prevalent than Irvine's reputation suggests.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">~310K</div>
                <p className="text-muted-foreground">Irvine population, one of Orange County's fastest-growing cities</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">36K+</div>
                <p className="text-muted-foreground">UC Irvine students navigating academic pressure, social drinking, and drug use</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Hidden</div>
                <p className="text-muted-foreground">High-functioning addiction masked for years by professional success and affluence</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              From Turtle Rock to Woodbridge, from the Irvine Spectrum area to the UC Irvine campus, addiction affects families in every Irvine village. The high concentration of tech companies, medical professionals, and academia creates unique high-functioning addiction patterns that families often don't recognize until a crisis forces the issue.
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
                  How Addiction Affects Irvine Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Irvine families face the same patterns seen across affluent Southern California: the professional who has transitioned from social drinking to daily necessity, the college student whose anxiety medication has become a dependency, the executive whose cocaine use is enabling longer work hours until it controls everything.
                  </p>
                  <p>
                    The multicultural fabric of Irvine's community—with significant Korean, Chinese, and South Asian populations—adds cultural stigma around addiction that prevents many families from seeking help. Mental health and substance abuse are still taboo in many communities, making professional intervention even more valuable as a structured, respectful way to approach the problem.
                  </p>
                  <p>
                    When high income meets high-functioning addiction, families often enable for years before recognizing the pattern. An intervention specialist can help families see clearly and act decisively.
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
                  How Freedom Interventions Helps Irvine Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    With over 20 years of experience, Matt Brown provides specialized intervention services for Irvine and Orange County families. We have deep expertise working with high-functioning individuals, college students, and families navigating cultural barriers around addiction.
                  </p>
                  <p>
                    <strong className="text-foreground">Local Treatment Access:</strong> Irvine has excellent treatment resources including Hoag Hospital Irvine, UCI Medical Center, and the Turning Point Center. We match each person with the right level of care and treatment approach for their unique situation.
                  </p>
                  <p>
                    <strong className="text-foreground">Cultural Sensitivity:</strong> We work respectfully with Irvine's diverse families, understanding that cultural context shapes how addiction is perceived and how intervention must be approached.
                  </p>
                  <p>
                    <strong className="text-foreground">Student Support:</strong> We have experience working with college students and their families, understanding the unique dynamics of academic addiction and the path to treatment that preserves educational opportunities where possible.
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
                  Hope for Irvine Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery is attainable for Irvine families. We've helped professionals, students, and families throughout Orange County break through denial, access quality treatment, and rebuild their lives. The planning and structure that defines Irvine as a city can also define a family's path to recovery—with the right professional guidance.
                  </p>
                  <p>
                    The free consultation is the first step. It costs nothing, it's completely confidential, and it could be the most important call your family makes. Reach out today.
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
              Get Help for Your Irvine Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Don't wait for another crisis. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve Irvine and all of Orange County including Newport Beach, Tustin, Lake Forest, Mission Viejo, and surrounding communities.
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

      <LocationLinks currentLocation="Irvine" locationType="city" parentState="California" />
      <Footer />
    </div>
  );
};

export default IrvineCalifornia;
