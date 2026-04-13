import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import britishColumbiaBanner from "@/assets/british-columbia-banner.jpg";
import SEOHead from "@/components/SEOHead";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const BritishColumbia = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="British Columbia Addiction Intervention Services | Freedom Interventions"
        description="British Columbia continues to face Canada's deadliest toxic drug crisis with over 2,500 lives lost annually. Professional interventionists help BC families find recovery."
        canonical="https://freedominterventions.com/british-columbia"
        keywords="British Columbia addiction intervention, Vancouver intervention services, BC drug crisis, fentanyl crisis BC, addiction help Vancouver"
        geoRegion="CA-BC"
        geoPlacename="British Columbia"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="Vancouver" state="BC" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
          { name: "British Columbia", url: "https://freedominterventions.com/british-columbia" },
        ]}
      />
      <Navbar />
      
      <BreadcrumbNav items={[
        { name: "Service Areas", href: "/service-areas" },
        { name: "British Columbia", href: "/british-columbia" },
      ]} />
      
      {/* Banner Image */}
      <section className="pt-20">
        <div className="w-full h-[300px] md:h-[400px] overflow-hidden">
          <img 
            src={britishColumbiaBanner} 
            alt="British Columbia mountains and forests symbolizing hope and recovery" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              British Columbia Addiction Crisis
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              British Columbia's Addiction Crisis: How Professional Interventionists Offer Families a Lifeline
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              British Columbia continues to face Canada's deadliest toxic drug crisis, with over 2,500 lives lost annually to overdoses. The province has declared a public health emergency since 2016, as fentanyl and other toxic substances devastate communities from Vancouver to remote regions.
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

      {/* Key Statistics */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">2,500+</div>
              <div className="text-sm text-muted-foreground">Annual Overdose Deaths</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">90%</div>
              <div className="text-sm text-muted-foreground">Prepared Families, Better Outcomes</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">225K</div>
              <div className="text-sm text-muted-foreground">British Columbians Affected</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">85%</div>
              <div className="text-sm text-muted-foreground">Deaths Involve Fentanyl</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Scope of BC's Addiction Challenges */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  The Scope of British Columbia's Addiction Challenges
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                British Columbia has been at the epicenter of Canada's opioid crisis since declaring a public health emergency in April 2016. The toxic drug supply—primarily fentanyl and its analogues—has claimed over 14,000 lives since then. In 2023 alone, more than 2,500 British Columbians died from toxic drug poisoning, making it the leading cause of unnatural death in the province.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The crisis affects all demographics and regions. While the Downtown Eastside of Vancouver remains heavily impacted, overdose deaths have spread throughout the province—to suburban communities, northern regions, and Vancouver Island. Approximately 85% of deaths involve fentanyl, often mixed with other substances like benzodiazepines, making the drug supply increasingly unpredictable and deadly.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Despite innovative harm reduction measures like safe injection sites and naloxone distribution, treatment access remains challenging. Wait times for publicly funded treatment can extend weeks or months, and many families struggle to navigate the complex healthcare system while watching their loved ones suffer.
              </p>
            </div>

            {/* Why Families Need Intervention Support Now */}
            <div className="space-y-6 bg-muted/30 p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Why Families Need Intervention Support Now
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Addiction tears apart BC families daily. Parents watch children disappear into Vancouver's streets; spouses hide their partner's drug use from employers; siblings deplete savings trying to help. The toxic drug supply means every use could be fatal—families live in constant fear of the phone call that never comes.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Professional interventionists bring structure and expertise to this chaos. Unlike family confrontations that often backfire, trained interventionists use evidence-based methods like ARISE and CRAFT that achieve significantly higher treatment entry rates. They understand BC's treatment landscape—from private facilities in the Okanagan to publicly funded programs in the Lower Mainland—and can navigate the system quickly when lives hang in the balance.
              </p>
            </div>

            {/* How Interventionists Tailor Solutions */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  How Interventionists Tailor Solutions for BC Families
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Every BC family's situation is unique. An interventionist begins with comprehensive assessment—understanding the person's substance use history, mental health conditions, previous treatment attempts, and family dynamics. This allows for a customized approach that addresses root causes, not just symptoms.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                In British Columbia, interventionists leverage the province's treatment continuum: medical detox at facilities like Creekside Withdrawal Management, residential treatment at centres like Together We Can or Last Door, and robust aftercare through community programs. They also understand the unique challenges of BC's geography—connecting remote families with virtual support or arranging travel to appropriate facilities.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The intervention itself is carefully planned and rehearsed. Families learn to communicate love while establishing firm boundaries. The person struggling with addiction is given a clear path to treatment, often with transportation arranged and a bed waiting. This removes barriers that often prevent people from accepting help in their moment of clarity.
              </p>
            </div>

            {/* Proven Benefits and Real Impact */}
            <div className="space-y-6 bg-primary/5 p-8 rounded-lg border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Proven Benefits and Real Impact
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                When families are prepared, united, and a treatment plan is in place, professional interventions have a significantly higher chance of success. Studies show significantly higher of intervention participants agree to treatment, compared to less than 30% without professional guidance. More importantly, the structured approach helps maintain recovery—families learn to support without enabling, and individuals enter treatment with a clear plan.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                In BC's deadly drug environment, speed matters. Interventionists can mobilize within 24-48 hours, arranging assessments, securing treatment beds, and coordinating travel. This rapid response can mean the difference between life and death when every day increases overdose risk.
              </p>
            </div>

            {/* Barriers and Why Earlier Planning Helps */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Barriers and Why Earlier Planning Helps
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                BC families face unique challenges: long public treatment waitlists, limited options in rural communities, and a drug supply that grows more toxic each year. Many families hesitate, hoping their loved one will choose recovery on their own—but with fentanyl contaminating virtually all street drugs, waiting can be fatal.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The financial investment in professional intervention pales compared to the costs of continued addiction—not just the potential loss of life, but healthcare expenses, legal fees, lost employment, and family trauma. Intervention is an investment in your family's future.
              </p>
            </div>

            {/* Why Seek Help */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Why Seek Professional Intervention in British Columbia
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Expert Assessment</h3>
                    <p className="text-muted-foreground">Comprehensive evaluation using clinical criteria to determine appropriate level of care.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-foreground">BC Treatment Navigation</h3>
                    <p className="text-muted-foreground">Deep knowledge of BC's treatment landscape, from Vancouver to the Interior to Vancouver Island.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Rapid Response</h3>
                    <p className="text-muted-foreground">24-48 hour mobilization when the toxic drug supply makes every day dangerous.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Family Healing</h3>
                    <p className="text-muted-foreground">Guidance for the whole family to break enabling patterns and rebuild healthy relationships.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">5</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Aftercare Planning</h3>
                    <p className="text-muted-foreground">Long-term recovery support including AA/NA, counselling, and sober living arrangements.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            A Path Forward for British Columbia Families
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-3xl mx-auto">
            BC's toxic drug crisis has claimed more than 14,000 lives since 2016. Professional intervention offers a structured, compassionate path to treatment. If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you.
          </p>
          <p className="text-xl font-semibold mb-8">
            Hope starts with one structured step—yours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/#booking">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Free Consultation
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <a href="tel:541-838-6009">
                <Phone className="mr-2 h-5 w-5" />
                Call (541) 838-6009
              </a>
            </Button>
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


      <LocationLinks currentLocation="British Columbia" locationType="province" />

      <Footer />
    </div>
  );
};

export default BritishColumbia;