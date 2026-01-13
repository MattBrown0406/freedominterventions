import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, Target, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import washingtonBanner from "@/assets/washington-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";
import LocationLinks from "@/components/LocationLinks";

const Washington = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Washington State Addiction Intervention Services | Freedom Interventions"
        description="Washington State grapples with a severe addiction epidemic, recording 3,600 drug overdose deaths. Professional interventionists help families navigate fentanyl and meth addiction."
        canonical="https://freedominterventions.com/washington"
        keywords="Washington addiction intervention, Seattle intervention services, Washington fentanyl crisis, Spokane drug intervention"
        geoRegion="US-WA"
        geoPlacename="Washington"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="Seattle" state="WA" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
          { name: "Washington", url: "https://freedominterventions.com/washington" },
        ]}
      />
      <Navbar />
      
      {/* Banner Image */}
      <section className="pt-20">
        <div className="w-full h-[300px] md:h-[400px] overflow-hidden">
          <img 
            src={washingtonBanner} 
            alt="Washington State landscape with Mount Rainier and evergreen forests symbolizing hope" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              Washington Addiction Crisis
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Washington's Addiction Crisis: How Professional Interventionists Empower Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Washington State grapples with a severe addiction epidemic, recording 3,600 drug overdose deaths from May 2023 to April 2024—a 14% increase year-over-year despite a national 10% decline—fueled by fentanyl (58% of cases in 2023), methamphetamine, and polysubstance use.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/#booking">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Free Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:503-836-2136">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (503) 836-2136
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
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">3,600</div>
              <div className="text-sm text-muted-foreground">Overdose Deaths (2023-24)</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">90%</div>
              <div className="text-sm text-muted-foreground">Intervention Success Rate</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">$2.54B</div>
              <div className="text-sm text-muted-foreground">Annual Crisis Cost</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">90%</div>
              <div className="text-sm text-muted-foreground">Needing Help Go Unserved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Scale of Washington's Substance Use Challenges */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  The Scale of Washington's Substance Use Challenges
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Washington ranks high in illicit drug use, with 22.72% of those 12+ reporting past-month use (1.49 million people), led by marijuana (33.72% among 18-25-year-olds) and surging fentanyl—from 9% of crime lab cases in 2020 to 58% in 2023, while heroin dropped to 5%. Opioid death rates climbed from 9.6 per 100,000 in 2020 to 20.5 in 2021, with meth deaths rising from 83 (2008) to 364 (2016). Substance use disorders affect 22.44% of young adults, far above national averages, hitting rural counties like Spokane (52% primary meth users) hardest.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Youth trends alarm: 9.60% of 12-17-year-olds use illicit drugs monthly, with alcohol-attributable deaths averaging 1,127 yearly (2015-2019), including 289 suicides. Racial disparities persist—Native Americans face top overdose rates—while economic fallout burdens workplaces with absenteeism and safety risks. State responses include community outreach expansions and rehab investments, but access lags, with only 38,086 treatment admissions in 2010 despite poly-substance dominance (e.g., 51% female amphetamine cases).
              </p>
            </div>

            {/* Family Struggles in Washington's Overdose Hotspots */}
            <div className="space-y-6 bg-muted/30 p-8 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Family Struggles in Washington's Overdose Hotspots
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Addiction fractures Washington families, from Seattle's urban fentanyl waves to Eastern Washington's meth strongholds, leading to ER overloads, jail cycles, and eroded trust. Families often enable through bailouts or denial, delaying help as DIY efforts fail 70-80% amid resistance. With 90% untreated despite need, relatives face isolation without structured support.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Professional interventionists—certified via models like ARISE or CRAFT—change this, unifying families for 64-90% acceptance rates by customizing plans to Washington's realities: fentanyl risks, meth co-use, and youth vulnerabilities.
              </p>
            </div>

            {/* Interventionists' Tailored Approach */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Target className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Interventionists' Tailored Approach for Washington Families
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Interventionists initiate with discreet assessments using ASAM criteria, pinpointing needs amid state trends like fentanyl-meth mixes (under 50% meth lab cases in 2022 but persistent). They educate on Washington's continuum: detox at centers like Crestview Recovery, inpatient statewide, IOP/outpatient via DOH resources, and sober living bridges.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Rehearsed interventions feature impact letters, firm boundaries (e.g., no housing sans treatment), and instant transport to vetted programs like Northpoint Washington. Personalization addresses dual-diagnosis (common in high illicit use states) and regional issues—urban outreach for King County, rural transport for Spokane. Post-event, they coordinate aftercare: AA/NA, therapy, family sessions, leveraging state dashboards for monitoring.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                In Washington, experts navigate policy shifts like expanded community campaigns and $2.54B crisis costs, pre-arranging amid waitlists to avert tragedies.
              </p>
            </div>

            {/* Evidence of Impact and Success Stories */}
            <div className="space-y-6 bg-primary/5 p-8 rounded-lg border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Evidence of Impact and Success Stories
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Interventions elevate uptake 80-90%, with follow-up curbing relapse in resource-scarce settings. Washington's context amplifies value: where poly-substance admissions dominate (e.g., 10,960 alcohol+drug in 2010), pros dismantle enabling, boosting completion. Families regain stability—ending codependency—while data shows social support halves risks.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Local wins: Crestview's community ties triple referrals; statewide, interventions adapt CRAFT for 64% superiority over confrontation.
              </p>
            </div>

            {/* Overcoming Barriers */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Overcoming Barriers in the Evergreen State
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Stigma, rural gaps, and youth highs (3.46% illicit disorders 12-17) hinder access, yet interventions cut delays fueling 14% overdose spikes. Costs offset via prevented $929M mortality, with ROI in lives restored.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                2025 trends: fentanyl persists, but public involvement grows via education boards.
              </p>
            </div>

            {/* Why Seek Help */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Why Seek Professional Intervention in Washington
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
                    <p className="text-muted-foreground">Customized approaches that account for Washington's unique resources, regional factors, and fentanyl-meth challenges.</p>
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
                    <p className="text-muted-foreground">Guidance through Washington's healthcare and legal systems, including DOH resources and community programs.</p>
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

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Hope Through Intervention in Washington
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-3xl mx-auto">
            Washington's 3,600 recent overdose deaths signal urgency beyond stats—fentanyl, meth, and youth use demand family action. Professional interventionists deliver 90% pathways to treatment, turning despair into recovery amid state resources.
          </p>
          <p className="text-xl font-semibold mb-8">
            Don't delay another ER visit or loss. One call ignites change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/#booking">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Free Consultation
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <a href="tel:503-836-2136">
                <Phone className="mr-2 h-5 w-5" />
                Call (503) 836-2136
              </a>
            </Button>
          </div>
        </div>
      </section>

      <LocationLinks currentLocation="Washington" locationType="state" />

      <Footer />
    </div>
  );
};

export default Washington;
