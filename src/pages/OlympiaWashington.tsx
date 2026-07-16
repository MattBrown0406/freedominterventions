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

const OlympiaWashington = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Washington", href: "/washington" },
    { name: "Olympia", href: "/olympia-washington" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Olympia, Washington | Freedom Interventions"
        description="Olympia families in Thurston County facing addiction get expert intervention support from Matt Brown. Free consultation. (541) 668-8084."
        keywords="Olympia addiction intervention, Thurston County drug intervention, Olympia WA intervention services, addiction help Olympia Washington, state capital addiction intervention"
        canonical="https://freedominterventions.com/olympia-washington"
      />
      <LocalBusinessSchema location="Olympia" state="Washington" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={cityBanner}
          alt="Washington State landscape representing hope for Olympia families facing addiction"
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
              Olympia, Washington
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Olympia's Addiction Crisis: Professional Intervention for Thurston County Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Washington's state capital is home to a visible and growing addiction crisis that affects families across all walks of life. From government workers to rural Thurston County residents, Olympia families are facing substance use disorders that demand professional support. Freedom Interventions brings expert, compassionate intervention services to Olympia and the surrounding region.
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
                  Understanding Olympia's Addiction Challenge
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Olympia presents a stark contradiction: as the seat of state government and home to policy makers who craft Washington's addiction response, the capital city itself struggles with a visible homelessness and drug crisis downtown. Thurston County faces challenges that span from urban substance use in the city center to rural access barriers that leave families in surrounding communities without adequate treatment options.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">~55K</div>
                <p className="text-muted-foreground">Olympia residents in a county with growing addiction and homelessness challenges</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Visible</div>
                <p className="text-muted-foreground">Downtown drug crisis straining Thurston County resources and families</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Rural</div>
                <p className="text-muted-foreground">Thurston County's rural areas face treatment access barriers that delay recovery</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              From the downtown corridor to Lacey, Tumwater to Yelm, Thurston County families are grappling with addiction that affects government workers, service industry employees, rural residents, and college students at The Evergreen State College alike. The irony that policy is made here while the crisis grows is not lost on families living it.
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
                  How Addiction Affects Olympia Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    In Olympia, addiction affects government employees and contractors who can't risk their security clearances, rural families hours from adequate treatment, young adults in a progressive college town where substance use is normalized, and families watching a loved one spiral into the downtown homeless crisis.
                  </p>
                  <p>
                    Thurston County's mix of urban and rural communities creates a complex landscape where treatment resources are uneven. A family in rural Rochester or Tenino may have far fewer options than those in Olympia proper—and even in the capital city, treatment waitlists can stretch for weeks.
                  </p>
                  <p>
                    Families often wait, hoping the situation will resolve itself. It rarely does. Professional intervention breaks that cycle with structure, expertise, and immediate action.
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
                  How Freedom Interventions Helps Olympia Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    With over 20 years of experience working across diverse communities, Matt Brown understands the unique dynamics facing Thurston County families. We bring a structured, professional approach that works whether your loved one is a state employee, a rural resident, or a young adult in crisis.
                  </p>
                  <p>
                    <strong className="text-foreground">Thurston County Resources:</strong> We work with Capital Medical Center, Behavioral Health Resources (BHR), and Thurston County Behavioral Health to identify appropriate care. When local capacity is limited, we immediately access statewide and national options.
                  </p>
                  <p>
                    <strong className="text-foreground">Rural Access Solutions:</strong> We understand the transportation and access barriers facing rural Thurston County families and help navigate options that bridge geographic gaps in care.
                  </p>
                  <p>
                    <strong className="text-foreground">Confidential Process:</strong> We protect the privacy of government employees and professionals whose careers may be at risk, while still getting them the help they urgently need.
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
                  Hope for Thurston County Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery is possible—even in the most entrenched addiction situations. We've helped Thurston County families from Olympia to the most rural corners of the county guide their loved ones into treatment and witnessed remarkable transformations. The state capital may struggle with its addiction crisis at a policy level, but your family doesn't have to wait for systemic change. You can The sooner families have a clear plan, the more options they have.
                  </p>
                  <p>
                    One call to Freedom Interventions starts a process that can change your family's trajectory entirely.
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
              Get Help for Your Olympia Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. Our free, confidential consultation will help you understand your options and create a plan. We serve all of Thurston County including Olympia, Lacey, Tumwater, Yelm, Tenino, and rural communities throughout the region.
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


      <LocationLinks currentLocation="Olympia" locationType="city" parentState="Washington" />
      <Footer />
    </div>
  );
};

export default OlympiaWashington;
