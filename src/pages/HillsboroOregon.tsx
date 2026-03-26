import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import cityBanner from "@/assets/oregon-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const HillsboroOregon = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Oregon", href: "/oregon" },
    { name: "Hillsboro", href: "/hillsboro-oregon" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Hillsboro, Oregon | Freedom Interventions"
        description="Hillsboro families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Washington County. Free consultation. (541) 838-6009."
        keywords="Hillsboro Oregon addiction intervention, drug intervention Hillsboro OR, alcohol intervention Hillsboro, family intervention Hillsboro Oregon, Washington County interventionist, Silicon Forest addiction help, Portland metro west intervention, professional intervention Hillsboro"
        canonical="https://freedominterventions.com/hillsboro-oregon"
      />
      <LocalBusinessSchema location="Hillsboro" state="Oregon" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={cityBanner}
          alt="Hillsboro Oregon Washington County landscape"
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
              Hillsboro, Oregon
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Hillsboro Addiction Intervention Specialist: Washington County Families Get Expert Help
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Beneath Hillsboro's tech-industry prosperity—home to Intel's campus and Oregon's Silicon Forest—lies a substance abuse crisis that crosses all economic lines. Washington County's rapid growth has brought new residents, new pressures, and new addiction challenges to this Portland metro community. Freedom Interventions provides expert, compassionate help for Hillsboro and Washington County families.
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
                  Washington County's Growing Addiction Challenge
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Hillsboro, with approximately 110,000 residents and growing, serves as the seat of Washington County—Oregon's second most populous county. The rapid population growth driven by the tech sector has created income disparities, housing pressure, and stress-related substance use that the county's social services have struggled to keep pace with.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">110K+</div>
                <p className="text-muted-foreground">Hillsboro residents in one of Oregon's fastest-growing cities</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">250%</div>
                <p className="text-muted-foreground">Rise in fentanyl seizures in Washington County over 3 years</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">All Demographics</div>
                <p className="text-muted-foreground">Addiction impacts tech workers, farm laborers, and everyone in between</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Washington County's diverse population—including a large Latino community in agricultural areas west of Hillsboro, tech industry workers in the city core, and suburban families throughout—all face addiction challenges that vary by community but share the same need: professional, compassionate intervention.
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
                  How Addiction Affects Hillsboro Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    The Silicon Forest's high-pressure work culture creates conditions where substance use can develop quietly. High-achieving professionals use alcohol or stimulants to manage stress, while the socioeconomic gap between tech workers and service employees creates additional vulnerabilities in the broader community.
                  </p>
                  <p>
                    Hillsboro's proximity to Portland means that urban drug markets are easily accessible. Fentanyl has spread from Portland's crisis zones into Washington County's suburban communities, with devastating consequences for families who thought their suburban setting protected them.
                  </p>
                  <p>
                    The stigma of addiction is particularly pronounced in affluent communities. Families in Hillsboro, Orenco Station, South Hillsboro, and Tanasbourne often delay seeking help for months or years, fearing damage to their professional reputations or social standing.
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
                  How Freedom Interventions Helps Hillsboro Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Matt Brown brings certified expertise and 20+ years of experience to Hillsboro and Washington County families. We understand the unique dynamics of suburban Portland communities and know how to navigate available treatment resources effectively.
                  </p>
                  <p>
                    <strong className="text-foreground">Regional Treatment Knowledge:</strong> We coordinate with Washington County treatment providers including <strong className="text-foreground">LifeWorks NW</strong>, a comprehensive behavioral health organization with multiple Washington County locations offering mental health and substance use treatment, and <strong className="text-foreground">Tualatin Valley Health</strong>, providing integrated primary care and behavioral health services throughout the county.
                  </p>
                  <p>
                    <strong className="text-foreground">Confidential and Discreet:</strong> We understand that privacy is paramount for professional families. Every consultation and intervention is handled with complete confidentiality.
                  </p>
                  <p>
                    <strong className="text-foreground">Culturally Responsive:</strong> With Hillsboro's diverse community, we approach each family with cultural sensitivity and personalized care.
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
                  Hope for Hillsboro and Washington County Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery is possible at every stage of addiction. We've helped families throughout the Portland metro west side guide their loved ones into treatment—from Hillsboro to Beaverton, Forest Grove to Cornelius—and witnessed remarkable transformations.
                  </p>
                  <p>
                    You don't have to navigate this alone. A free, confidential consultation is the first step—and it costs you nothing except the courage to pick up the phone.
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
              Get Help for Your Hillsboro Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Don't let addiction continue to destroy your family. Our free, confidential consultation will help you understand your options and create a plan. We serve all of Washington County including Hillsboro, Beaverton, Forest Grove, Cornelius, Banks, North Plains, and Tualatin.
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

      <LocationLinks currentLocation="Hillsboro" locationType="city" parentState="Oregon" />
      <Footer />
    </div>
  );
};

export default HillsboroOregon;
