import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import utahBanner from "@/assets/utah-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const ProvoUtah = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Utah", href: "/utah" },
    { name: "Provo", href: "/provo-utah" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Provo, Utah | Freedom Interventions"
        description="Provo families facing addiction get expert intervention support from Matt Brown, certified professional with 20+ years experience. Serving Utah County. Free consultation. (541) 838-6009."
        keywords="Provo addiction intervention, Utah County drug intervention, Provo family intervention, BYU student addiction, prescription opioid addiction Provo UT"
        canonical="https://freedominterventions.com/provo-utah"
      />
      <LocalBusinessSchema location="Provo" state="Utah" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={utahBanner}
          alt="Utah landscape representing Provo and Utah County"
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
              Provo, Utah
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Provo's Hidden Addiction Crisis: Professional Intervention for Utah County Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Provo's image as a wholesome college town masks a serious addiction crisis. The unique LDS community dynamics, cultural stigma, and the pressures faced by BYU students create an environment where addiction often goes unaddressed until crisis strikes. Freedom Interventions provides culturally sensitive, expert intervention services for Utah County families.
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
                  Understanding Utah County's Addiction Challenge
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Utah County, home to over 115,000 Provo residents, confronts a substance use crisis that defies the area's reputation. Utah consistently ranks among states with highest prescription opioid misuse rates. Cultural stigma and religious community dynamics often delay families from seeking professional help, allowing addiction to deepen before intervention.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Top 5</div>
                <p className="text-muted-foreground">Utah ranks among states with highest prescription opioid misuse</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Delayed</div>
                <p className="text-muted-foreground">Treatment-seeking due to cultural stigma in LDS communities</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Rising</div>
                <p className="text-muted-foreground">Fentanyl-related deaths among young adults in Utah County</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Provo's unique cultural landscape creates specific addiction dynamics. Prescription opioid dependency often begins with legitimate medical treatment. College students face social isolation, academic pressure, and easy access to substances. The strong community expectation to maintain appearances can prevent families from acknowledging addiction until crisis forces the issue.
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
                  How Addiction Affects Provo Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    In Provo's faith-centered community, addiction carries profound shame for both the individual and their family. Parents may hide a child's addiction from their congregation. Young adults struggle with the collision between their faith identity and substance dependency. Spouses suffer in silence to protect family reputation.
                  </p>
                  <p>
                    BYU students facing academic and social pressure may experiment with prescription stimulants, opioids, or other substances, developing dependency before their families realize there's a problem. The absence of alcohol culture doesn't mean the absence of addiction—prescription drugs and other substances fill the gap.
                  </p>
                  <p>
                    Without culturally informed professional guidance, Provo families often compound the problem through well-intentioned but enabling responses driven by shame and a desire to protect family reputation.
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
                  How Freedom Interventions Helps Provo Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Matt Brown brings over 20 years of experience and cultural sensitivity to every intervention. We understand that Provo families navigate addiction within a complex framework of faith, family, and community—and we approach each situation with respect for those values.
                  </p>
                  <p>
                    <strong className="text-foreground">Cultural Sensitivity:</strong> We work within the family's value framework, not against it. Our approach honors spiritual beliefs while providing evidence-based intervention strategies.
                  </p>
                  <p>
                    <strong className="text-foreground">Local Resource Network:</strong> We connect families with Utah Valley Hospital, Valley Behavioral Health, Utah County Crisis Line, and treatment programs throughout Utah that understand the community's unique needs.
                  </p>
                  <p>
                    <strong className="text-foreground">Family Healing:</strong> We help the entire family establish healthy boundaries, end enabling behaviors, and begin healing together—while maintaining the family connections that are central to LDS community life.
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
                  Hope for Provo and Utah County Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery is possible, and seeking help is an act of strength, not weakness or shame. We've helped many Utah County families guide their loved ones into treatment and witnessed life-changing transformations.
                  </p>
                  <p>
                    Key local resources include Utah Valley Hospital (medical detox), Valley Behavioral Health (outpatient and residential), and the Utah County Crisis Line for immediate support. When specialized care is needed, we connect families with top treatment centers throughout the region.
                  </p>
                  <p>
                    Don't let cultural stigma prevent your family from getting the help you need. Professional intervention can be the turning point your Provo family deserves.
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
              Get Help for Your Utah County Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Don't wait for another crisis. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve all of Utah County including Provo, Orem, Springville, American Fork, Payson, and surrounding communities.
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

      <LocationLinks currentLocation="Provo" locationType="city" />
      <Footer />
    </div>
  );
};

export default ProvoUtah;
