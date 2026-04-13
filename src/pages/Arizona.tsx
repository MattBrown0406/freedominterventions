import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import arizonaBanner from "@/assets/arizona-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema, BreadcrumbSchema, ServiceAreaSchema } from "@/components/StructuredData";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const Arizona = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Specialist in Arizona | Freedom Interventions"
        description="Arizona families facing addiction need expert help. Matt Brown, certified intervention specialist with 20+ years experience, serves all of Arizona. Free consultation. Call (541) 838-6009."
        canonical="https://freedominterventions.com/arizona"
        keywords="Arizona addiction intervention, Phoenix intervention services, Tucson drug intervention, Arizona fentanyl crisis"
        geoRegion="US-AZ"
        geoPlacename="Arizona"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Arizona"
        url="https://freedominterventions.com/arizona"
        description="Arizona families facing addiction need expert help. Matt Brown, certified intervention specialist with 20+ years experience, serves all of Arizona. Free consultation. Call (541) 838-6009."
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
          { name: "Arizona", url: "https://freedominterventions.com/arizona" },
        ]}
      />
      <Navbar />
      
      <BreadcrumbNav items={[
        { name: "Service Areas", href: "/service-areas" },
        { name: "Arizona", href: "/arizona" },
      ]} />
      
      {/* Banner Image */}
      <section className="pt-20">
        <div className="w-full h-[300px] md:h-[400px] overflow-hidden">
          <img 
            src={arizonaBanner} 
            alt="Arizona desert landscape symbolizing hope and recovery" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 max-w-4xl">
            Arizona's Addiction Crisis: How Professional Interventionists Support Families
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-8">
            Arizona faces a serious substance use crisis with rising overdose rates and a 14% higher drug overdose death rate than the national average. Professional interventionists provide families with structured, compassionate strategies to guide loved ones toward recovery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="text-lg">
              <Link to="/#contact">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Free Consultation
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg">
              <a href="tel:+15418386009">
                <Phone className="mr-2 h-5 w-5" />
                Call (541) 838-6009
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-lg bg-destructive/10 border border-destructive/20">
              <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">1,927</div>
              <div className="text-sm text-muted-foreground">Opioid Deaths (2022)</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-primary/10 border border-primary/20">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">60%</div>
              <div className="text-sm text-muted-foreground">Fentanyl-Related Deaths</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-secondary/50 border border-border">
              <Users className="h-8 w-8 text-secondary-foreground mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">944K</div>
              <div className="text-sm text-muted-foreground">Treatment Gap</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-accent/50 border border-accent">
              <Heart className="h-8 w-8 text-accent-foreground mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">50%</div>
              <div className="text-sm text-muted-foreground">Higher Alcohol Death Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Scope of Crisis */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                The Scope of Arizona's Addiction Crisis
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Arizona faces a serious substance use crisis marked by rising overdose and addiction rates. In 2022, the state recorded 1,927 opioid overdose deaths, slightly down from 2,019 in 2021, yet fentanyl remains the deadliest contributor, implicated in 60% of all drug-related deaths in 2024.
                </p>
                <p>
                  The state grapples with a 14% higher drug overdose death rate than the national average, standing at 36 deaths per 100,000 residents, and nearly doubling since 2013. Arizona's major urban areas, such as Maricopa County (including Phoenix), show particularly high overdose rates—42 deaths per 100,000 residents—compared to the U.S. average.
                </p>
                <p>
                  Youth substance use is also a growing concern. Over 7% of teenagers meet criteria for drug use disorder, though overall youth drug use is slightly below the national averages. Alcohol remains a significant factor, with Arizona showing 50% higher alcohol-attributable death rates than the U.S., driven by widespread binge drinking among adults (16.7%) and sustained concerns over DUI collisions.
                </p>
              </div>
            </div>

            {/* Treatment Gap */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                The Treatment Gap in Arizona
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Despite operating nearly 500 treatment facilities that serve more than 79,000 patients annually, Arizona suffers from a massive treatment gap: nearly 944,000 individuals in need of substance use treatment cannot access services. This gap exacerbates the strain on families struggling to guide their loved ones toward recovery.
                </p>
              </div>
            </div>

            {/* Family Impact */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                How Addiction Impacts Arizona Families
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Families often face overwhelming challenges when a loved one battles addiction, including repeated legal troubles such as DUIs, overdoses, and deteriorating relationships. Left to confront these issues alone, family efforts frequently fall short, with unplanned or unstructured interventions succeeding only 20-30% of the time.
                </p>
                <p>
                  Professional interventionists provide critical expertise to bridge this gap. They offer structured, evidence-based guidance tailored to the individual and family, significantly improving the likelihood that the loved one will enter treatment and commit to recovery.
                </p>
              </div>
            </div>

            {/* Role of Interventionists */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                The Critical Role of Professional Interventionists
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Interventionists assess severity, coordinate with local treatment resources, and craft personalized intervention plans that consider Arizona's diverse population and geographic challenges. They conduct detailed assessments using medical criteria to identify the most appropriate level of care—detox, inpatient, outpatient, or sober living placement.
                </p>
                <p>
                  They prepare families for intervention meetings with rehearsed communication strategies and clear boundary-setting, such as linking financial or housing support to treatment adherence. The interventionist often arranges immediate transport to treatment and coordinates post-intervention support including therapy and support group involvement like Alcoholics Anonymous or Narcotics Anonymous.
                </p>
                <p>
                  Given Arizona's high rates of fentanyl and methamphetamine use plus the prevalence of alcohol-related DUIs, interventionists customize plans to handle these complex issues effectively. They also help families navigate insurance and healthcare system barriers, advocate with treatment centers, and maintain aftercare continuity to reduce relapse risk.
                </p>
              </div>
            </div>

            {/* Impact and Outcomes */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Impact and Outcomes
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Research shows that professional interventionists increase treatment entry rates to significantly higher, with appropriately supported individuals enjoying significantly better recovery outcomes. Social support and structured follow-up, which interventionists help establish, are vital to sustained sobriety.
                </p>
                <p>
                  Families report improvements in communication, decreased enabling, and restored hope following professional-led interventions. Interventionists' tailored approaches also help reduce hospitalizations, legal issues, and other costs related to untreated addiction.
                </p>
              </div>
            </div>

            {/* Why Seek Help */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Why Seek Professional Intervention in Arizona
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Expert Assessment</h3>
                    <p className="text-muted-foreground">Comprehensive evaluation using proven clinical criteria to identify the most appropriate level of care.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Tailored Strategies</h3>
                    <p className="text-muted-foreground">Customized approaches that account for Arizona's diverse population, geography, and unique challenges.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Treatment Coordination</h3>
                    <p className="text-muted-foreground">Connections to detox centers, inpatient rehabs, outpatient programs, and sober living facilities statewide.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Insurance Navigation</h3>
                    <p className="text-muted-foreground">Help navigating insurance barriers, healthcare systems, and identifying suitable local or out-of-state programs.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">5</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Aftercare Planning</h3>
                    <p className="text-muted-foreground">Coordination with treatment teams for ongoing therapy, AA/NA participation, and long-term recovery support.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Path Forward */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                A Path Toward Hope and Recovery
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Arizona's escalating drug and alcohol crisis requires informed family action. Professional interventionists provide the skill, knowledge, and compassionate support to navigate this challenge successfully. By facilitating treatment entry and sustained recovery, interventionists help families save lives and rebuild futures.
                </p>
                <p>
                  If you're facing these difficulties, reach out to a qualified interventionist today to begin the journey toward healing and hope.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            Schedule Free Consultation for Your Arizona Family
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Professional intervention increases treatment entry rates to significantly higher. Reach out today for a confidential consultation tailored to Arizona's resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg">
              <Link to="/#contact">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Consultation
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <a href="tel:+15418386009">
                <Phone className="mr-2 h-5 w-5" />
                Call Now
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


      <LocationLinks currentLocation="Arizona" locationType="state" />

      <Footer />
    </div>
  );
};

export default Arizona;
