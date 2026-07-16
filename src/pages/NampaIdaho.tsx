import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import idahoBanner from "@/assets/idaho-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const NampaIdaho = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Idaho", href: "/idaho" },
    { name: "Nampa", href: "/nampa-idaho" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Nampa, Idaho | Freedom Interventions"
        description="Nampa families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Canyon County. Free consultation. (541) 668-8084."
        keywords="Nampa addiction intervention, Canyon County drug intervention, Nampa family intervention, meth addiction Nampa, addiction help Nampa ID"
        canonical="https://freedominterventions.com/nampa-idaho"
      />
      <LocalBusinessSchema location="Nampa" state="Idaho" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={idahoBanner}
          alt="Idaho landscape representing Nampa and Canyon County"
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
              Nampa, Idaho
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Nampa's Meth Crisis: Professional Intervention Services for Canyon County Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Nampa and Canyon County sit at the heart of Idaho's meth corridor, where rural poverty and limited treatment resources combine to fuel a devastating addiction crisis. Freedom Interventions provides compassionate, expert intervention services to help Nampa families break the cycle of addiction.
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
                  Understanding Canyon County's Addiction Challenge
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Canyon County, home to Nampa's 105,000 residents, has been disproportionately impacted by Idaho's drug crisis. Methamphetamine remains the dominant substance of abuse, driven by proximity to trafficking routes and widespread rural poverty. Limited treatment infrastructure leaves families with few local options when addiction strikes.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">#1</div>
                <p className="text-muted-foreground">Meth trafficking corridor in the Treasure Valley region</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">2x</div>
                <p className="text-muted-foreground">Higher overdose rate than the Idaho state average</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Low</div>
                <p className="text-muted-foreground">Treatment resource availability relative to county population</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Nampa's working-class communities bear the brunt of Canyon County's drug crisis. From industrial neighborhoods near downtown to outlying rural areas, methamphetamine and opioid addiction are tearing families apart. Without professional intervention, many families spiral into enabling patterns that accelerate their loved one's decline.
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
                  How Addiction Affects Nampa Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Canyon County's economic pressures create a perfect storm for addiction. Working families struggling with financial stress turn to substances for relief. Young people with limited opportunities find themselves swept into drug culture. Parents watch helplessly as their children disappear into meth addiction.
                  </p>
                  <p>
                    The shame surrounding addiction in tight-knit Nampa communities often prevents families from reaching out. Many try to handle the crisis alone, unknowingly enabling their loved one's continued use through financial support, housing, and emotional rescue.
                  </p>
                  <p>
                    Whether dealing with meth, prescription opioids, or alcohol, Nampa families need professional guidance to break enabling patterns and create the conditions for their loved one to accept help.
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
                  How Freedom Interventions Helps Nampa Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    With over 20 years of experience, Matt Brown provides expert intervention services for Canyon County families. We understand the economic realities of Nampa and the specific treatment resources available in the Treasure Valley region.
                  </p>
                  <p>
                    <strong className="text-foreground">Local Resource Network:</strong> We work with Port of Hope, El-Ada Community Action, Canyon County Behavioral Health, and treatment facilities throughout Idaho to connect your loved one with appropriate care.
                  </p>
                  <p>
                    <strong className="text-foreground">Compassionate Approach:</strong> We meet families where they are, without judgment. Whether this is your first crisis or you've tried to help before, we provide a structured path forward.
                  </p>
                  <p>
                    <strong className="text-foreground">Family Healing:</strong> We help the entire family establish healthy boundaries, end enabling behaviors, and begin their own recovery journey alongside their loved one.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Resources Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-accent/50 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Hope for Nampa and Canyon County Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery is possible, even in Canyon County's difficult environment. We've helped families throughout the Treasure Valley guide their loved ones into treatment and witnessed remarkable transformations.
                  </p>
                  <p>
                    Key local resources in Canyon County include Port of Hope (residential treatment), El-Ada Community Action (supportive services), and Canyon County Behavioral Health (crisis and outpatient services). When local capacity is limited, we connect families with treatment throughout Idaho and the Pacific Northwest.
                  </p>
                  <p>
                    If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. Professional intervention can be the turning point your family needs to break the cycle of addiction.
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
              Get Help for Your Canyon County Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve all of Canyon County including Nampa, Caldwell, Middleton, Wilder, and surrounding communities.
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


      <LocationLinks currentLocation="Nampa" locationType="city" />
      <Footer />
    </div>
  );
};

export default NampaIdaho;
