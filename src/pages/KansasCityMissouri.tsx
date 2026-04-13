import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import kansasCityBanner from "@/assets/kansas-city-missouri-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const KansasCityMissouri = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Missouri", href: "/missouri" },
    { name: "Kansas City", href: "/kansas-city-missouri" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Kansas City Missouri Addiction Intervention Services | Freedom Interventions"
        description="Professional addiction intervention services in Kansas City, Missouri. Help your loved one recover from fentanyl, methamphetamine, and alcohol addiction. Serving the KC metro area."
        keywords="Kansas City addiction intervention, Missouri drug intervention, KC family intervention, fentanyl crisis Kansas City, methamphetamine addiction Missouri"
        canonical="https://freedominterventions.com/kansas-city-missouri"
      />
      <LocalBusinessSchema location="Kansas City" state="Missouri" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />
      
      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />
      
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img 
          src={kansasCityBanner} 
          alt="Kansas City skyline at sunset with Union Station" 
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
              Kansas City, Missouri
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Kansas City's Drug Crisis: Professional Intervention for Missouri Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Kansas City sits at the crossroads of America—and drug trafficking routes. The metro area has seen dramatic increases in fentanyl deaths while methamphetamine remains entrenched. From the Plaza to Independence, families across the KC metro are struggling. Freedom Interventions offers professional, compassionate help.
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
                  The Heart of America's Drug Crisis
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Jackson County recorded over 400 overdose deaths in 2023, with fentanyl driving the surge. Kansas City's position as a major transportation hub makes it a distribution point for drugs heading across the country. The same infrastructure that moves legitimate commerce moves deadly narcotics into local communities.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">400+</div>
                <p className="text-muted-foreground">Overdose deaths in Jackson County in 2023</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">80%</div>
                <p className="text-muted-foreground">Of overdoses involve synthetic opioids</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">#2</div>
                <p className="text-muted-foreground">Missouri ranks for meth lab seizures</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Kansas City spans two states, complicating access to treatment and services. Families often don't know where to turn, and the fragmented metro area means resources vary dramatically from one jurisdiction to another.
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
                  How Addiction Impacts Kansas City Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Kansas City families reflect the heartland's values—hard work, family loyalty, and self-reliance. These same values can become barriers to seeking help for addiction. Families may view intervention as airing dirty laundry or giving up on a loved one.
                  </p>
                  <p>
                    The metro area's affordability attracts young families, but economic pressures in some neighborhoods contribute to drug use. Meanwhile, suburban communities often deny that addiction affects them—until it does.
                  </p>
                  <p>
                    From Westport's nightlife scene to Blue Springs' family neighborhoods, from North Kansas City's industrial areas to Overland Park's professional communities, addiction doesn't respect boundaries. The two-state metro means families may face additional confusion about treatment options and resources.
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
                  How Freedom Interventions Serves Kansas City Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Freedom Interventions brings over 20 years of experience to Kansas City families in crisis. We understand Midwest culture and help families overcome the pride and privacy that can delay getting help.
                  </p>
                  <p>
                    <strong className="text-foreground">Two-State Navigation:</strong> We understand the complexities of the KC metro and can help families navigate treatment options regardless of which side of the state line they live on.
                  </p>
                  <p>
                    <strong className="text-foreground">Treatment Expertise:</strong> We have relationships with quality treatment programs throughout the region and nationwide, helping families find the right fit for their loved one's specific needs.
                  </p>
                  <p>
                    <strong className="text-foreground">Family-Centered Approach:</strong> We work with the whole family, helping everyone understand their role in both the intervention and the recovery process that follows.
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
                  Recovery Is Possible in Kansas City
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Kansas City has a growing recovery community with meetings throughout the metro. The city's strong sense of community and Midwest values of mutual support translate well into recovery. Many find that the same family bonds that complicated their addiction become sources of strength in sobriety.
                  </p>
                  <p>
                    The fentanyl crisis has made intervention more urgent than ever. Every day of active addiction carries extreme risk. Professional intervention can help your family create a real opening for treatment.
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
              Get Help for Your Kansas City Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our free, confidential consultation helps you understand your options and create an action plan. We serve the entire KC metro including Independence, Overland Park, Lee's Summit, and surrounding communities on both sides of the state line.
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


      <LocationLinks currentLocation="Kansas City" locationType="city" />
      <Footer />
    </div>
  );
};

export default KansasCityMissouri;