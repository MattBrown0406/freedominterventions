import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone, Calendar, AlertTriangle, Users, TrendingUp, Shield } from "lucide-react";
import utahBanner from "@/assets/utah-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const Utah = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Utah Addiction Intervention Services | Freedom Interventions"
        description="Utah confronts a persistent substance use crisis with 606 drug overdose deaths in 2023. Professional interventionists help families navigate fentanyl and opioid addiction."
        canonical="https://freedominterventions.com/utah"
        keywords="Utah addiction intervention, Salt Lake City intervention services, Utah fentanyl crisis, Provo drug intervention"
        geoRegion="US-UT"
        geoPlacename="Utah"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="Salt Lake City" state="UT" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
          { name: "Utah", url: "https://freedominterventions.com/utah" },
        ]}
      />
      <Navbar />
      
      <BreadcrumbNav items={[
        { name: "Service Areas", href: "/service-areas" },
        { name: "Utah", href: "/utah" },
      ]} />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${utahBanner})` }}
        >
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Utah's Addiction Epidemic
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            Professional Interventionists as Catalysts for Familial Recovery
          </p>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-12 bg-primary/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-card p-6 rounded-xl shadow-sm border border-border text-center">
              <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-3" />
              <div className="text-3xl font-bold text-primary mb-1">606</div>
              <div className="text-sm text-muted-foreground">Overdose Deaths in 2023</div>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-sm border border-border text-center">
              <TrendingUp className="w-8 h-8 text-destructive mx-auto mb-3" />
              <div className="text-3xl font-bold text-primary mb-1">4.7M</div>
              <div className="text-sm text-muted-foreground">Fentanyl Units Seized (2024)</div>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-sm border border-border text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-primary mb-1">170,000</div>
              <div className="text-sm text-muted-foreground">Affected by SUDs</div>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-sm border border-border text-center">
              <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-primary mb-1">80-90%</div>
              <div className="text-sm text-muted-foreground">Intervention Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto prose prose-lg">
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Utah confronts a persistent and intensifying substance use crisis, registering 606 drug overdose deaths in 2023—the highest annual total on record and a 14.3% increase from 2022—yielding an age-adjusted rate of 21.4 per 100,000 residents, bucking a national 4% decline. Fentanyl dominates, implicated in nearly half of fatalities and 33% of unintentional/undetermined poisonings, with seizures skyrocketing from 49,000 dosage units in 2020 to 4.7 million in 2024 (95-fold escalation), half destined for local markets.
            </p>

            <h2 className="font-serif text-3xl font-bold text-foreground mt-12 mb-6">
              Scope of Utah's Substance Use Challenges
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Overdose rates have plateaued at elevated levels post-2015 apex, with 2023's record eclipsed by provisional 2024 upticks (Utah among five states rising amid national 24% drop), driven by fentanyl's 116% decade-long fatality ascent outpacing prescription opioid declines. Illicit opioids fuel 33% of poisonings; women face heightened prescription risks and addiction propensity, while men predominate in deaths.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Regional disparities burden urban hubs like Salt Lake County alongside rural vulnerabilities, with law enforcement noting fentanyl's potency (50x heroin) and affordability entrenching supply chains. Alcohol exacerbates: binge rates and DUI arrests strain systems, intertwining with polysubstance toxicology in crashes and suicides.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Youth trends alarm, with state initiatives like the Utah Fentanyl Task Force targeting 25% reduction by 2029 via data enhancement, recovery bolstering, outreach, and enforcement—yielding early price hikes ($1 to $10/pill) and 3% Q4 2024 dips. Yet, 90% unmet need persists amid resource constraints.
            </p>

            <h2 className="font-serif text-3xl font-bold text-foreground mt-12 mb-6">
              Familial Disruption in the Beehive State
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Addiction erodes Utah families, from Salt Lake's fentanyl corridors to rural meth enclaves, precipitating DUIs, overdoses (606 in 2023), and relational fractures. Enabling behaviors—bailouts, denial—prolong cycles, as ad hoc interventions falter 70-80% against resistance. Households endure chaos, with 90% untreated amplifying intergenerational impacts.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Interventionists, leveraging evidence-based protocols, coalesce families for superior outcomes (64-90% acceptance), attuned to Utah's epidemiological fentanyl-meth fusion and sociocultural fabric.
            </p>

            <h2 className="font-serif text-3xl font-bold text-foreground mt-12 mb-6">
              Interventionists' Tailored Methodologies for Utah
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Employing ASAM criteria, specialists assess severity, countering 2025 fentanyl trafficking surges and regional DUI/meth patterns. Continuum orchestration spans detox, inpatient immersion, IOP/outpatient transitions, and sober living for remote access.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Rehearsed convenings deploy impact narratives, boundary codification (e.g., conditional support post-DUI), and expedited placements. Post-intervention oversight enforces aftercare—12-step engagement (AA/NA), psychotherapy, familial reconciliation—integrating state resources like task force outreach.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Utah-centric practitioners preempt crises via HIDTA-aligned intelligence, circumventing waitlists amid escalating seizures.
            </p>

            <h2 className="font-serif text-3xl font-bold text-foreground mt-12 mb-6">
              Empirical Validation and Systemic Leverage
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Interventions amplify initiation 80-90%, attenuating relapse in underserved terrains. Utah's context—fentanyl outpacing opioid reductions—amplifies utility: professionals disrupt enabling, bridging 170,000 voids with 83-95% engagement; social networks halve recidivism.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Targeted efforts triple referrals, aligning with gubernatorial mandates for data-driven prevention.
            </p>

            <h2 className="font-serif text-3xl font-bold text-foreground mt-12 mb-6">
              Mitigating Utah's Endemic Barriers
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Rural isolation, stigma, youth vulnerabilities, and DUI surfeits impede equity, sustaining elevated rates despite naloxone gains. Interventions confer ROI via forestalled fatalities, incarcerations. 2025 portends vigilance amid trafficking persistence.
            </p>

            {/* Why Seek Help */}
            <div className="bg-card border border-border rounded-xl p-8 mt-12">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Why Seek Professional Intervention in Utah
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Expert Assessment</h3>
                    <p className="text-muted-foreground">Comprehensive evaluation of your loved one's specific circumstances using proven clinical criteria.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Tailored Strategies</h3>
                    <p className="text-muted-foreground">Customized approaches that account for Utah's unique geography, resources, and cultural factors.</p>
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
                    <h3 className="font-semibold text-foreground">Legal Navigation</h3>
                    <p className="text-muted-foreground">Guidance through complex healthcare and legal systems, including state-specific commitment options.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">5</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Aftercare Planning</h3>
                    <p className="text-muted-foreground">Collaboration with treatment teams for ongoing therapy, AA/NA participation, and long-term recovery support.</p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="font-serif text-3xl font-bold text-foreground mt-12 mb-6">
              Restoration Prospects in Zion's Realm
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Utah's 606 overdoses, fentanyl deluge, and entrenched rates compel familial agency beyond metrics. Interventionists architect 90% recovery conduits, spanning pervasive deficits with state apparatuses. Avert ensuing tragedy: engage certified expertise—evaluate, strategize, reclaim trajectories. Renewal inaugurates immediately.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Get Help for Your Utah Family Today
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Don't wait for another crisis. Our intervention specialists serve families throughout Utah, from Salt Lake City to St. George.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg" asChild>
              <Link to="/#contact">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule a Consultation
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg" asChild>
              <a href="tel:+15418386009">
                <Phone className="w-5 h-5 mr-2" />
                Call (541) 838-6009
              </a>
            </Button>
          </div>
        </div>
      </section>

      <LocationLinks currentLocation="Utah" locationType="state" />

      <Footer />
    </div>
  );
};

export default Utah;
