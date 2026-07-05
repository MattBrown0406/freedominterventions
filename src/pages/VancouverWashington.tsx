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

const VancouverWashington = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Washington", href: "/washington" },
    { name: "Vancouver", href: "/vancouver-washington" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Vancouver, Washington | Freedom Interventions"
        description="Vancouver WA families facing addiction get expert intervention support from Matt Brown. Serving Clark County. Free consultation. (541) 668-8084."
        keywords="Vancouver WA addiction intervention, Clark County drug intervention, Vancouver Washington intervention services, Portland fentanyl spillover Vancouver, addiction help Vancouver WA, Clark County intervention"
        canonical="https://freedominterventions.com/vancouver-washington"
      />
      <LocalBusinessSchema location="Vancouver" state="Washington" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={cityBanner}
          alt="Washington State landscape representing hope for Vancouver WA families facing addiction"
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
              Vancouver, Washington
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Vancouver WA's Fentanyl Crisis: Professional Intervention for Clark County Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Vancouver, Washington sits directly across the Columbia River from Portland, Oregon—one of the nation's most visible fentanyl crisis epicenters. Clark County families are experiencing significant spillover from the Portland metro addiction crisis, with opioid rates among the highest in Washington state. Freedom Interventions brings expert, compassionate intervention services to Vancouver and Clark County families who need help now.
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
                  Understanding Vancouver's Addiction Challenge
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Clark County's geographic position as Washington's southern gateway—and Portland's northern suburb—has made it uniquely vulnerable to the Portland metro fentanyl crisis. Drug supply chains that flow through Portland cross the river into Vancouver with ease, while Clark County families often lack the same level of treatment infrastructure found in King County or the Portland metro area itself. The result is a community severely impacted by opioid addiction and struggling to meet demand for services.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">~190K</div>
                <p className="text-muted-foreground">Vancouver residents impacted by Clark County's growing fentanyl crisis</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">High</div>
                <p className="text-muted-foreground">Opioid death rates amplified by Portland metro fentanyl spillover across the Columbia</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Growing</div>
                <p className="text-muted-foreground">Clark County's addiction crisis accelerating faster than local treatment capacity</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              From downtown Vancouver to Camas, Washougal to Battle Ground, Clark County families are living with addiction that crosses state lines as easily as commuters cross the bridge. The proximity to Portland creates both risk—easy access to drugs—and opportunity, as the combined Portland-Vancouver metro has treatment resources on both sides of the river.
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
                  How Addiction Affects Vancouver WA Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Vancouver families often navigate addiction with one foot in Washington and one in Oregon—commuting to Portland for work while dealing with the same fentanyl crisis that has made Portland's streets internationally notorious. The cross-border reality means drug supply is abundant and easily accessible, while state-specific treatment systems can create bureaucratic barriers for families seeking help.
                  </p>
                  <p>
                    Clark County's rapid growth over the past decade—driven by Portland transplants seeking lower taxes and housing costs—has brought new demographics and new addiction patterns to Vancouver. From established working-class families to new arrivals, opioid addiction is touching every corner of the community.
                  </p>
                  <p>
                    Families often feel caught between two states, two systems, and overwhelming uncertainty about where to turn. Professional intervention cuts through that confusion with clarity, structure, and immediate action.
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
                  How Freedom Interventions Helps Vancouver WA Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    With over 20 years of experience across the Pacific Northwest—including extensive work in the Portland-Vancouver metro area—Matt Brown understands the unique cross-border dynamics facing Clark County families. We know both Washington and Oregon treatment systems, giving Vancouver families access to the full range of bi-state resources.
                  </p>
                  <p>
                    <strong className="text-foreground">Clark County Resources:</strong> We connect families with PeaceHealth Southwest Medical Center, LifeLine Connections, and Clark County Behavioral Health. We also leverage the broader Portland metro treatment network for families whose needs exceed local capacity.
                  </p>
                  <p>
                    <strong className="text-foreground">Bi-State Expertise:</strong> We navigate both Washington and Oregon treatment systems, giving Vancouver families twice the options for finding the right care at the right level.
                  </p>
                  <p>
                    <strong className="text-foreground">Immediate Response:</strong> In a community where fentanyl makes every use potentially fatal, speed matters. We work quickly to assess, plan, and execute intervention so your loved one gets help before the next crisis.
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
                  Hope for Clark County Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery is possible even in the shadow of one of the nation's most visible fentanyl crises. We've helped Clark County families guide their loved ones out of addiction and into treatment that changes everything. The Portland metro's proximity isn't just a source of risk—it also means a rich network of treatment resources available to Vancouver families.
                  </p>
                  <p>
                    Don't let the scale of the regional crisis make you feel helpless. The sooner families have a clear plan, the more options they have, and professional intervention can help create that plan.
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
              Get Help for Your Vancouver WA Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. Our free, confidential consultation will help you understand your options. We serve all of Clark County including Vancouver, Camas, Washougal, Battle Ground, Ridgefield, and La Center.
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


      <LocationLinks currentLocation="Vancouver" locationType="city" parentState="Washington" />
      <Footer />
    </div>
  );
};

export default VancouverWashington;
