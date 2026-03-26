import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, CheckCircle, AlertTriangle, Users, Heart, Shield, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import nevadaBanner from "@/assets/nevada-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const Nevada = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Specialist in Nevada | Freedom Interventions"
        description="Nevada families facing addiction need expert help. Matt Brown, certified intervention specialist with 20+ years experience, serves all of Nevada. Free consultation. Call (541) 838-6009."
        canonical="https://freedominterventions.com/nevada"
        keywords="Nevada addiction intervention, Las Vegas intervention services, Reno drug intervention, Nevada fentanyl crisis"
        geoRegion="US-NV"
        geoPlacename="Nevada"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="Las Vegas" state="NV" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
          { name: "Nevada", url: "https://freedominterventions.com/nevada" },
        ]}
      />
      
      <Navbar />
      
      <BreadcrumbNav items={[
        { name: "Service Areas", href: "/service-areas" },
        { name: "Nevada", href: "/nevada" },
      ]} />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={nevadaBanner} 
            alt="Nevada desert landscape representing hope and recovery" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background"></div>
        </div>
        
        <div className="container relative z-10 px-6 py-24 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 max-w-4xl mx-auto">
            Nevada's Addiction Epidemic: Professional Interventionists as Strategic Allies for Families
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Expert intervention services helping Nevada families navigate addiction crisis with compassion and proven strategies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <a href="tel:+15418386009">
                <Phone className="w-5 h-5 mr-2" />
                Call Now: (541) 838-6009
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <Link to="/#contact">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Consultation
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Crisis Statistics Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-8 h-8 text-destructive" />
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Understanding Nevada's Substance Use Crisis
              </h2>
            </div>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                Nevada contends with an acute substance use crisis, evidenced by <strong className="text-foreground">1,352 drug overdose deaths in 2023</strong>—a 19% escalation from 2022—yielding a mortality rate of 30.3 per 100,000 residents, markedly exceeding national benchmarks. Fentanyl and psychostimulants predominate, with opioid overdoses surging 28% to 904 and methamphetamine-related fatalities climbing 74% since 2020.
              </p>
              
              <p>
                Provisional data through March 2025 registers 1,600 deaths, an 8% uptick amid a national 24-25% decline, positioning Nevada among outlier states alongside Arizona and Hawaii. Alcohol amplifies vulnerabilities, with 47.8% past-month use but binge rates at 23.4% surpassing averages, alongside 54,385 hospital admissions in 2021 and alcohol use disorder prevalence rising from 6.0% in 2019 to 10.2% in 2020.
              </p>

              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="bg-background p-6 rounded-xl border border-border text-center">
                  <div className="text-4xl font-bold text-primary mb-2">1,352</div>
                  <div className="text-sm text-muted-foreground">Overdose Deaths in 2023</div>
                </div>
                <div className="bg-background p-6 rounded-xl border border-border text-center">
                  <div className="text-4xl font-bold text-primary mb-2">23.6%</div>
                  <div className="text-sm text-muted-foreground">Adult Illicit Drug Use</div>
                </div>
                <div className="bg-background p-6 rounded-xl border border-border text-center">
                  <div className="text-4xl font-bold text-primary mb-2">90%+</div>
                  <div className="text-sm text-muted-foreground">Unmet Treatment Need</div>
                </div>
              </div>

              <p>
                Amid 21.6% substance use disorder rates (vs. 17.8% U.S.)—including 12.7% drug use disorder—over 90% unmet need burdens families, where interventionists achieve 80-90% treatment initiation efficacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dimensions Section */}
      <section className="py-16 md:py-24">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-8 h-8 text-primary" />
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Dimensions of Nevada's Substance Use Burden
              </h2>
            </div>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                Nevada's 23.6% adult illicit drug use (2022)—eclipsing the 16.3% national figure—encompasses elevated marijuana (28.3%), hallucinogens (4.4%), methamphetamine (2.2%), and cocaine (1.8%), with youth illicit use at 9.1% (15.9% marijuana) and adolescent SUD at 14.1% (11.6% drug-specific).
              </p>
              
              <p>
                Overdose trajectories reflect fentanyl's entrenchment (93% Southern Nevada rise 2020-2023) and psychostimulant surges, compounded by socioeconomic stressors like housing instability fueling coping mechanisms. Alcohol's toll manifests in binge disparities and hospital overloads, while demographic inequities underscore targeted needs.
              </p>

              <p>
                Statewide SUD impacts 7.5 million past-year cases, with opioid use disorder at 2.1%; treatment infrastructure lags, exacerbating familial distress amid urban-rural divides from Las Vegas corridors to Reno enclaves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Family Impact Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-8 h-8 text-primary" />
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Familial Ramifications and Intervention Imperative
              </h2>
            </div>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                Addiction destabilizes Nevada households, precipitating DUIs, overdoses (1,352 in 2023), and relational erosion, where enabling—financial rescues, denial—perpetuates cycles as unstructured interventions yield mere 20-30% success. With pervasive untreated prevalence, families endure compounded trauma.
              </p>
              
              <p>
                <strong className="text-foreground">Interventionists furnish calibrated, empathetic frameworks</strong>, coalescing relatives for 80-90% acceptance via ASAM-aligned evaluations attuned to Nevada's fentanyl-meth-alcohol nexus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How Interventionists Help Section */}
      <section className="py-16 md:py-24">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-8 h-8 text-primary" />
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Interventionists' Multifaceted Engagement in Nevada
              </h2>
            </div>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                Professionals initiate comprehensive assessments, delineating care spectra: detoxification, inpatient stabilization, IOP/outpatient regimens, and sober living conduits amid geographic sprawl.
              </p>
              
              <p>
                Facilitated assemblies deploy impact testimonials, boundary delineation (e.g., conditional aid post-DUI), and instantaneous facility conveyance. Continuum stewardship enforces aftercare—12-step immersion (AA/NA), psychotherapy, kin reconciliation—harnessing state surveillance like NV Opioid Response dashboards.
              </p>

              <p>
                Nevada specialists preempt escalations via trafficking intelligence, navigating waitlists in high-overdose loci.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Evidence Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-8 h-8 text-primary" />
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Evidentiary Substantiation and Familial Reconstitution
              </h2>
            </div>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                Interventions elevate entry to 80-90%, curtailing relapse in resource-scarce milieus; social scaffolding halves recidivism. Nevada's context—opioid 123% ascent 2020-2023—magnifies import: experts sever enabling, spanning deficits with 83-95% engagement.
              </p>
              
              <p>
                Systemic gains manifest in amplified referrals, aligning with recovery foundations amid socioeconomic catalysts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Barriers Section */}
      <section className="py-16 md:py-24">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-primary" />
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Countervailing Nevada's Systemic Constraints
              </h2>
            </div>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                Tourism influxes, transience, adolescent surges (14.1% SUD), and binge/DUI surfeits confound access; interventions yield ROI via averted ED burdens (adolescent 14% Q1 2025 rise). 2025 surveillance signals sustained fentanyl vigilance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Seek Professional Help */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              Why Seek Professional Intervention in Nevada
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-1">Expert Assessment</h3>
                  <p className="text-muted-foreground">Professional evaluation using ASAM criteria to determine the appropriate level of care for Nevada's unique fentanyl-meth-alcohol challenges.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-1">Tailored Strategies</h3>
                  <p className="text-muted-foreground">Customized intervention plans addressing Nevada-specific factors including tourism industry pressures and urban-rural treatment disparities.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-1">Treatment Coordination</h3>
                  <p className="text-muted-foreground">Seamless arrangement of appropriate treatment facilities across Las Vegas, Reno, and throughout the Silver State.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-1">Crisis Navigation</h3>
                  <p className="text-muted-foreground">Expert guidance through Nevada's complex healthcare landscape and waitlist challenges in high-overdose areas.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">5</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-1">Aftercare Planning</h3>
                  <p className="text-muted-foreground">Comprehensive post-treatment support including 12-step programs, therapy coordination, and family reconciliation services.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion/CTA Section */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
              Renewal Horizons in the Silver State
            </h2>
            
            <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
              <p>
                Nevada's 1,352 overdoses, 23.6% illicit use, and outlier ascents compel proactive kinship. Interventionists engineer 90% recovery vectors, traversing chasms with extant apparatuses. Forestall inexorable loss: summon credentialed proficiency—appraise, orchestrate, repatriate prospects. <strong className="text-foreground">Metamorphosis activates instantaneously.</strong>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" asChild>
                <a href="tel:+15418386009">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: (541) 838-6009
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <Link to="/#contact">
                  <Calendar className="w-5 h-5 mr-2" />
                  Free Consultation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <LocationLinks currentLocation="Nevada" locationType="state" />

      <Footer />
    </div>
  );
};

export default Nevada;
