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

const SalemOregon = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Oregon", href: "/oregon" },
    { name: "Salem", href: "/salem-oregon" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Salem, Oregon | Freedom Interventions"
        description="Salem families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Marion County. Free consultation. (541) 838-6009."
        keywords="Salem Oregon addiction intervention, drug intervention Salem OR, alcohol intervention Salem, family intervention Salem Oregon, Marion County interventionist, meth intervention Salem, fentanyl crisis Salem Oregon, professional intervention Salem"
        canonical="https://freedominterventions.com/salem-oregon"
      />
      <LocalBusinessSchema location="Salem" state="Oregon" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={cityBanner}
          alt="Salem Oregon state capitol and Willamette Valley landscape"
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
              Salem, Oregon
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Salem Addiction Intervention Specialist: Expert Help for Marion County Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Oregon's state capital faces a severe addiction crisis hidden behind its political corridors and Willamette Valley communities. With meth and fentanyl devastating Marion County families at alarming rates, Salem residents need immediate, professional intervention support. Freedom Interventions brings 20+ years of certified expertise directly to your family.
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
                  Salem's Hidden Addiction Crisis
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  As Oregon's capital city with approximately 175,000 residents, Salem's addiction crisis cuts across all demographics—from government workers to agricultural laborers in the surrounding Willamette Valley. Marion County has seen dramatic spikes in methamphetamine and fentanyl-related overdoses, with many families struggling in silence while the crisis escalates.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">175K</div>
                <p className="text-muted-foreground">Salem residents affected by the region's addiction epidemic</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Top 5</div>
                <p className="text-muted-foreground">Marion County ranks among Oregon's highest meth use rates</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">300%</div>
                <p className="text-muted-foreground">Increase in fentanyl-related incidents in Marion County since 2019</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Salem's diverse population—spanning affluent neighborhoods near the Capitol to working-class communities in east Salem and rural Marion County—faces addiction challenges that often go unaddressed due to stigma, lack of insurance, and limited treatment access. Professional intervention breaks through these barriers.
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
                  How Addiction Affects Salem Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Salem's agricultural economy and seasonal workforce create conditions where substance use disorders can develop rapidly. Farm laborers, state government employees, healthcare workers, and students at Chemeketa Community College all face unique pressures that fuel addiction.
                  </p>
                  <p>
                    The methamphetamine pipeline flowing through the I-5 corridor has made Salem one of Oregon's most heavily impacted cities. Fentanyl has compounded the crisis, turning what may have started as prescription painkiller use into potentially fatal dependency.
                  </p>
                  <p>
                    Families in North Salem, South Salem, West Salem, and surrounding communities like Keizer, Silverton, and Woodburn are all affected. Without professional intervention, loved ones cycle through emergency rooms, jail stints, and broken relationships without accessing real treatment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Resources Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  How Freedom Interventions Helps Salem Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Matt Brown, certified intervention specialist with 20+ years of experience, provides comprehensive intervention services for Salem and Marion County families. We understand the local resources available and how to navigate treatment pathways effectively.
                  </p>
                  <p>
                    <strong className="text-foreground">Local Treatment Knowledge:</strong> We work in partnership with Salem-area treatment resources including <strong className="text-foreground">Bridgeway Recovery Services</strong>, a comprehensive behavioral health provider offering detox, residential, and outpatient programs in Marion County, and <strong className="text-foreground">Northwest Human Services</strong>, which provides integrated mental health and substance use treatment for underserved Salem residents.
                  </p>
                  <p>
                    <strong className="text-foreground">Pre-Arranged Treatment Entry:</strong> We coordinate placement before the intervention takes place, so when your loved one says yes, there is no waiting—they go directly into care.
                  </p>
                  <p>
                    <strong className="text-foreground">Family Healing:</strong> We help the entire family understand enabling behaviors, establish healthy boundaries, and begin their own recovery journey alongside their loved one.
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
                  Hope for Salem and Marion County Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery is possible, even in the most severe cases. We've helped families throughout the Willamette Valley guide their loved ones into treatment—and witnessed life-changing transformations that restored families, careers, and futures.
                  </p>
                  <p>
                    Professional intervention isn't about forcing someone into treatment. It's about creating the right conditions, with the right people, at the right moment—giving your loved one the clearest possible opportunity to choose recovery. When families are prepared and unified, the success rate exceeds 90%.
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
              Get Help for Your Salem Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Don't wait for another crisis. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve all of Marion County including Salem, Keizer, Silverton, Woodburn, Stayton, and surrounding communities.
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


      <LocationLinks currentLocation="Salem" locationType="city" parentState="Oregon" />
      <Footer />
    </div>
  );
};

export default SalemOregon;
