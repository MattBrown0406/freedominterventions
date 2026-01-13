import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import oregonBanner from "@/assets/oregon-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const Oregon = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Oregon Addiction Intervention Services"
        description="Oregon faces a persistent addiction epidemic. Professional interventionists help families navigate fentanyl, methamphetamine, and alcohol addiction treatment."
        canonical="https://freedominterventions.com/oregon"
        keywords="Oregon addiction intervention, Portland intervention services, Oregon fentanyl crisis, Oregon drug treatment"
        geoRegion="US-OR"
        geoPlacename="Oregon"
      />
      <OrganizationSchema />
      <LocalBusinessSchema location="Portland" state="OR" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
          { name: "Oregon", url: "https://freedominterventions.com/oregon" },
        ]}
      />
      <Navbar />
      
      <BreadcrumbNav items={[
        { name: "Service Areas", href: "/service-areas" },
        { name: "Oregon", href: "/oregon" },
      ]} />
      
      {/* Banner Image */}
      <section className="pt-20">
        <div className="w-full h-[300px] md:h-[400px] overflow-hidden">
          <img 
            src={oregonBanner} 
            alt="Oregon landscape with mountains and forest path symbolizing hope and recovery" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              Oregon Addiction Crisis
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Oregon's Addiction Crisis: How Professional Interventionists Offer Families a Lifeline
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Oregon faces a persistent addiction epidemic, with overdose deaths reaching 1,833 in 2023—a 33% surge from the prior year—driven by fentanyl, methamphetamine, and polysubstance use. While preliminary 2024 data shows a promising 22% drop to 1,480 deaths, rates remain far above pre-pandemic levels.
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
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1,833</div>
              <div className="text-sm text-muted-foreground">Overdose Deaths in 2023</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">90%</div>
              <div className="text-sm text-muted-foreground">Intervention Success Rate</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">330K</div>
              <div className="text-sm text-muted-foreground">Oregonians Affected</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10%</div>
              <div className="text-sm text-muted-foreground">Currently Receiving Help</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Scope of Oregon's Addiction Challenges */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  The Scope of Oregon's Addiction Challenges
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Oregon's addiction rates have long outpaced national averages. In 2020, the state held the second-highest substance use disorder prevalence, leading in methamphetamine and prescription opioid misuse while ranking low in treatment availability. Fentanyl has intensified the crisis: from 223 overdose deaths in 2020 to 843 in 2022, comprising 65.5% of all fatalities that year. Communities of color and rural areas bear disproportionate burdens, with 53% of 2023 deaths involving opioids and stimulants combined.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Measure 110, passed in 2020 to decriminalize small drug amounts and fund treatment, faced implementation hurdles. By 2025, recriminalization efforts yielded 9,893 possession-related arrests from September 2024 to August 2025, but only 48% program completion among 1,727 deflected individuals. Overdose trends mirror national declines due to naloxone distribution and supply shifts, yet Oregon lost three lives daily on average in recent years. WalletHub ranks the state third for drug use and addiction, highlighting gaps in prevention and access.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Treatment infrastructure lags: a 49% statewide gap in substance use disorder services persists despite $400 million in Behavioral Health Recovery Network (BHRN) investments funding detox, housing, and outreach for 300,000 encounters. Public providers show varied success—engagement rates near 90-100%, but completion often 40-70%—exacerbating family desperation as only 10% of those needing help receive it.
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
                Addiction devastates Oregon families, turning homes into emotional battlegrounds amid jail stints, overdoses, and financial ruin. Without guidance, relatives enable unwittingly—covering arrests, bailing out, or delaying confrontation—prolonging suffering as seen in post-Measure 110 chaos. DIY interventions fail 70-80% of the time due to denial, manipulation, and lack of aftercare planning.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Enter professional interventionists: certified experts who customize compassionate, evidence-based processes. Unlike ad-hoc family talks, they use models like ARISE or CRAFT, yielding 64-90% treatment entry rates by unifying family messages, dismantling enabling, and pre-arranging placements. In Oregon's resource-strapped landscape, they bridge gaps to vetted providers like Serenity Lane or BestCare.
              </p>
            </div>

            {/* How Interventionists Tailor Solutions */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-8 w-8 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  How Interventionists Tailor Solutions for Oregon Families
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Interventionists start with confidential family consultations, assessing addiction severity via ASAM criteria and mapping local crises like Portland's fentanyl emergency or rural meth surges. They educate on Oregon's continuum—detox at facilities like Recovery Works NW, inpatient at CODA, outpatient/IOP statewide, and sober living via BHRN-funded homes—ensuring seamless transitions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Planning involves rehearsed interventions: families share impacts lovingly, backed by consequences (e.g., no funds without treatment) and immediate transport to programs. Success hinges on personalization—addressing co-occurring mental health, common in Oregon's high dual-diagnosis rates. Post-intervention, they oversee aftercare: AA/NA attendance, therapy, and family sessions, slashing relapse by aligning with state resources like deflection programs.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Oregon-specific expertise shines: navigating Measure 110 fallout, leveraging $1.1 billion funding requests amid shortages, and targeting hotspots like Multnomah County's 533% fentanyl death rise (2018-2022). Providers like Teras Intervention report 83-95% engagement, proving viability amid 330,000 affected residents.
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
                Data underscores efficacy: interventions boost treatment uptake 80-90%, with sustained sobriety via follow-up. In Oregon, where only 35,000 of 330,000 needing help access it, professionals cut delays that worsen outcomes. Families report restored unity—ending codependency, rebuilding trust—while individuals gain tools against fentanyl's grip.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Case in point: Central Oregon's BestCare tripled opioid referrals via BHRN, but interventions ensure entry before crises escalate. Nationally, CRAFT outperforms confrontation by 64%, adaptable to Oregon's meth-fentanyl mix.
              </p>
            </div>

            {/* Barriers and Why Act Now */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Barriers and Why Act Now
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Challenges persist: waitlists, stigma, and uneven rural access hinder progress despite naloxone gains. Families delay, fearing resistance or costs—yet interventions avert costlier ER visits, jails, and losses, with ROI via lives saved.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Oregon's 2025 outlook: declining deaths signal hope, but sustained effort needed. Interventionists demystify options, from Coos County's outreach expansions to statewide peer supports.
              </p>
            </div>

            {/* Why Seek Help */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Why Seek Professional Intervention in Oregon
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
                    <p className="text-muted-foreground">Customized approaches that account for Oregon's unique resources, Measure 110 landscape, and regional factors.</p>
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
                    <p className="text-muted-foreground">Guidance through Oregon's healthcare and legal systems, including deflection programs and OHA resources.</p>
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
            A Path Forward for Oregon Families
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-3xl mx-auto">
            Oregon's addiction toll—1,833 lives lost in 2023 alone—demands action beyond policy fixes. Professional interventionists empower families, transforming despair into decisive treatment entry with 90% efficacy. Don't wait for the next overdose or arrest.
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
              <a href="tel:503-836-2136">
                <Phone className="mr-2 h-5 w-5" />
                Call (503) 836-2136
              </a>
            </Button>
          </div>
        </div>
      </section>

      <LocationLinks currentLocation="Oregon" locationType="state" />

      <Footer />
    </div>
  );
};

export default Oregon;
