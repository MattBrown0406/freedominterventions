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

const BeavertonOregon = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Oregon", href: "/oregon" },
    { name: "Beaverton", href: "/beaverton-oregon" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Beaverton, Oregon | Freedom Interventions"
        description="Beaverton families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Washington County. Free consultation. (541) 838-6009."
        keywords="Beaverton Oregon addiction intervention, drug intervention Beaverton OR, alcohol intervention Beaverton, family intervention Beaverton Oregon, Washington County interventionist, fentanyl Beaverton Oregon, suburban addiction help Portland metro, professional intervention Beaverton"
        canonical="https://freedominterventions.com/beaverton-oregon"
      />
      <LocalBusinessSchema location="Beaverton" state="Oregon" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={cityBanner}
          alt="Beaverton Oregon suburban community landscape"
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
              Beaverton, Oregon
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Beaverton Addiction Intervention Specialist: Suburban Families Need Help Now
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Beaverton's reputation as a safe, family-friendly suburb belies a growing fentanyl crisis spilling over from Portland. Washington County's most populous city—home to Nike's world headquarters and nearly 100,000 residents—is experiencing alarming rates of suburban opioid addiction that defy the comfortable image. Freedom Interventions provides expert help for Beaverton families ready to act.
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
                  Fentanyl Spillover: Beaverton's Suburban Crisis
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Beaverton, home to approximately 100,000 residents, occupies the eastern edge of Washington County adjacent to Portland. The fentanyl crisis that has devastated Portland's urban core doesn't stop at city limits—it has followed residents, supply chains, and drug networks into Beaverton's neighborhoods, schools, and workplaces.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">100K</div>
                <p className="text-muted-foreground">Beaverton residents affected by Washington County's growing addiction epidemic</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Suburbs Hit</div>
                <p className="text-muted-foreground">Fentanyl now reaching Beaverton high schools and neighborhoods at unprecedented rates</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Delayed Help</div>
                <p className="text-muted-foreground">Suburban families average 2-3 years before seeking professional intervention</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              The suburban setting can actually make addiction worse—families have more resources to enable (financial support, housing), more privacy to hide the problem, and stronger social pressure to maintain appearances. Professional intervention breaks through these enabling systems.
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
                  How Addiction Affects Beaverton Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    In Beaverton's comfortable neighborhoods—Cedar Mill, Raleigh Hills, Cooper Mountain, Murrayhill—addiction often starts quietly. A sports injury leads to opioid prescriptions. Social drinking becomes alcohol dependency. Recreational drug use at college or parties transitions to daily need.
                  </p>
                  <p>
                    Nike's corporate campus and Beaverton's business community create high-pressure environments where performance-enhancing substance use is normalized before it becomes dependency. Families notice the signs but don't want to disrupt careers or create family conflict.
                  </p>
                  <p>
                    Young adults returning to Beaverton after college or early adulthood bring addiction patterns that families may minimize as "phase" behavior. By the time fentanyl enters the picture, the situation can become life-threatening without warning.
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
                  How Freedom Interventions Helps Beaverton Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Matt Brown provides comprehensive, evidence-based intervention services for Beaverton and Washington County families. With 20+ years of certified experience, we understand the unique dynamics of suburban addiction and how to address enabling systems effectively.
                  </p>
                  <p>
                    <strong className="text-foreground">Local Treatment Connections:</strong> We work with Washington County treatment providers including <strong className="text-foreground">LifeWorks NW Beaverton</strong>, offering outpatient and intensive outpatient substance use treatment with multiple Washington County locations, and <strong className="text-foreground">Washington County SUD</strong> services providing assessment, treatment referrals, and recovery support coordinated through the county's behavioral health system.
                  </p>
                  <p>
                    <strong className="text-foreground">Ending Enabling Cycles:</strong> We specialize in helping suburban families identify and change enabling patterns that have kept their loved ones comfortable in addiction—cutting off the financial and emotional support systems that prevent accountability.
                  </p>
                  <p>
                    <strong className="text-foreground">Immediate Action Plans:</strong> When a family is ready, we move quickly. Treatment placement is arranged before the intervention so there is no gap between agreement and admission.
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
                  Hope for Beaverton Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Addiction doesn't care about zip codes, income levels, or how nice the neighborhood is. But neither does recovery. We've helped families across Washington County's most affluent communities break through denial and change the trajectory of their loved one's life.
                  </p>
                  <p>
                    The earlier you act, the better the outcomes. Don't wait for the bottom to fall out. A confidential consultation costs nothing and could save everything.
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
              Get Help for Your Beaverton Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Don't let the suburban comfort zone delay life-saving action. Our free, confidential consultation will help you create a plan. We serve all of Washington County including Beaverton, Cedar Mill, Raleigh Hills, Cooper Mountain, Murrayhill, Aloha, and surrounding communities.
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

      <LocationLinks currentLocation="Beaverton" locationType="city" parentState="Oregon" />
      <Footer />
    </div>
  );
};

export default BeavertonOregon;
