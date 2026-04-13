import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import oklahomaCityBanner from "@/assets/oklahoma-city-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const OklahomaCityOklahoma = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Oklahoma", href: "/oklahoma" },
    { name: "Oklahoma City", href: "/oklahoma-city-oklahoma" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Oklahoma City Addiction Intervention Services | Freedom Interventions"
        description="Professional addiction intervention services in Oklahoma City, Oklahoma. Help your loved one find recovery from methamphetamine, fentanyl, and prescription drug addiction. Free consultations available."
        keywords="Oklahoma City addiction intervention, Oklahoma drug intervention, OKC family intervention, meth crisis Oklahoma, addiction help Oklahoma City OK"
        canonical="https://freedominterventions.com/oklahoma-city-oklahoma"
      />
      <LocalBusinessSchema location="Oklahoma City" state="Oklahoma" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />
      
      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />
      
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img 
          src={oklahomaCityBanner} 
          alt="Oklahoma City downtown skyline at sunset" 
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
              Oklahoma City, Oklahoma
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Oklahoma City's Addiction Crisis: Professional Intervention Services for Oklahoma Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Oklahoma City and the surrounding metro area face a severe addiction crisis fueled by methamphetamine, fentanyl, and prescription opioids. From Edmond to Norman, addiction is tearing apart families across central Oklahoma. Freedom Interventions provides compassionate, professional intervention services to help your loved one find recovery.
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
                  Understanding Oklahoma's Addiction Emergency
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Oklahoma has consistently ranked among the highest states for drug overdose deaths and prescription opioid abuse. The state's history with prescription pain pills combined with the influx of fentanyl and methamphetamine has created a devastating public health crisis.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">1,200+</div>
                <p className="text-muted-foreground">Overdose deaths in Oklahoma in 2023</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Top 15</div>
                <p className="text-muted-foreground">Highest overdose death rate in the U.S.</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">70%</div>
                <p className="text-muted-foreground">Of overdose deaths involve fentanyl</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              The convergence of prescription opioid addiction, methamphetamine from drug trafficking routes, and deadly fentanyl has overwhelmed Oklahoma communities. Families throughout Oklahoma County, Cleveland County, and the greater OKC metro are losing loved ones at alarming rates.
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
                  How Addiction Affects Oklahoma City Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Oklahoma's strong family values and faith-based communities make watching a loved one struggle with addiction particularly painful. Parents in neighborhoods from Nichols Hills to Moore watch their children transform from promising students to unrecognizable addicts. Working families in the oil and gas industry lose colleagues to overdoses.
                  </p>
                  <p>
                    The stigma of addiction in tight-knit Oklahoma communities often prevents families from seeking help. Many believe their loved one simply lacks faith or willpower, not understanding that addiction is a medical illness with a spiritual dimension that requires clinical treatment and real change in how a person lives.
                  </p>
                  <p>
                    Whether your loved one started with prescription pills after an oil field injury or discovered meth in rural Oklahoma communities, Freedom Interventions understands the unique challenges facing Oklahoma families.
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
                  How Freedom Interventions Helps Oklahoma City Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    With over 20 years of experience helping families nationwide, Freedom Interventions provides comprehensive intervention services for Oklahoma City-area families. We approach each family with compassion and respect for your values while providing the professional expertise needed to break through addiction.
                  </p>
                  <p>
                    <strong className="text-foreground">Experienced Guidance:</strong> We've helped families in every stage of addiction crisis, from early intervention to emergency situations. Our approach is tailored to your family's specific circumstances and your loved one's unique needs.
                  </p>
                  <p>
                    <strong className="text-foreground">Treatment Placement:</strong> We connect Oklahoma City families with appropriate treatment facilities throughout Oklahoma and nationwide—programs equipped to handle fentanyl and meth addiction with high outcomes.
                  </p>
                  <p>
                    <strong className="text-foreground">Family Healing:</strong> We help the whole family recover, ending enabling patterns, establishing healthy boundaries, and supporting everyone through the recovery journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-accent/50 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Hope for Oklahoma Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Despite the devastating statistics, recovery happens every day in Oklahoma. We've helped families throughout the OKC metro guide their loved ones from the depths of addiction into treatment and lasting recovery. Your family's story can change too.
                  </p>
                  <p>
                    Fentanyl has made every day without intervention a gamble with your loved one's life. The sooner families have a clear plan, the more options they have. If someone you love in Oklahoma City is struggling with addiction, If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you.
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
              Get Help for Your Oklahoma City Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. Our free, confidential consultation will help you understand your options and create a plan to help your loved one. We serve all of Oklahoma City and central Oklahoma including Edmond, Norman, Moore, Midwest City, Yukon, Tulsa, and surrounding communities.
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


      <LocationLinks currentLocation="Oklahoma City" locationType="city" />
      <Footer />
    </div>
  );
};

export default OklahomaCityOklahoma;