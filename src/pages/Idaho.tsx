import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import idahoBanner from "@/assets/idaho-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema, BreadcrumbSchema, ServiceAreaSchema } from "@/components/StructuredData";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const Idaho = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Specialist in Idaho | Freedom Interventions"
        description="Idaho families facing addiction need expert help. Matt Brown, certified intervention specialist with 20+ years experience, serves all of Idaho. Free consultation. Call (541) 838-6009."
        canonical="https://freedominterventions.com/idaho"
        keywords="Idaho addiction intervention, Boise intervention services, Idaho fentanyl crisis, Coeur d'Alene drug intervention"
        geoRegion="US-ID"
        geoPlacename="Idaho"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="Idaho"
        url="https://freedominterventions.com/idaho"
        description="Idaho families facing addiction need expert help. Matt Brown, certified intervention specialist with 20+ years experience, serves all of Idaho. Free consultation. Call (541) 838-6009."
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
          { name: "Idaho", url: "https://freedominterventions.com/idaho" },
        ]}
      />
      <Navbar />
      
      <BreadcrumbNav items={[
        { name: "Service Areas", href: "/service-areas" },
        { name: "Idaho", href: "/idaho" },
      ]} />
      
      {/* Banner Image */}
      <section className="pt-20">
        <div className="w-full h-[300px] md:h-[400px] overflow-hidden">
          <img 
            src={idahoBanner} 
            alt="Idaho landscape with mountains and river symbolizing hope and recovery" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 max-w-4xl">
            Idaho's Drug Crisis: How Interventionists Help Families Get Treatment
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-8">
            Idaho has a growing drug and alcohol problem. In 2023, there were 386 overdose deaths—20.5 deaths for every 100,000 people, up 53% since 2013. Professional interventionists achieve significantly higher success in securing treatment entry for families in crisis.
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
              <div className="text-3xl font-bold text-foreground mb-2">386</div>
              <div className="text-sm text-muted-foreground">Overdose Deaths in 2023</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-primary/10 border border-primary/20">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">978%</div>
              <div className="text-sm text-muted-foreground">Fentanyl Death Increase</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-secondary/50 border border-border">
              <Users className="h-8 w-8 text-secondary-foreground mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">170,000</div>
              <div className="text-sm text-muted-foreground">Idahoans Need Treatment</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-accent/50 border border-accent">
              <Heart className="h-8 w-8 text-accent-foreground mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">significantly higher</div>
              <div className="text-sm text-muted-foreground">Prepared Families, Better Outcomes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* How Bad Is It */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                How Bad Is It in Idaho?
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Overdoses are up 40% since 2018. Opioids killed 265 people in 2023 (67% of deaths). Meth seizures rose 222% to 143 kg. Fentanyl is #1 in lab tests, with meth and marijuana next. It's found in over 60% of juvenile cases and 90% of adult DUIs. Among kids 12-17, 7.2% use drugs monthly (mostly marijuana) and 7% have a disorder.
                </p>
                <p>
                  Alcohol hits hard too. 23% of Idahoans binge drink. Users average 5.8 drinks per session. 18.9% of young adults have alcohol problems—higher than the national average. Alcohol is a factor in 40% of fatal crashes. There are 10,000+ DUIs yearly, many repeat offenders with mixed drug use. Women's opioid use has tripled. Native Americans face higher cocaine treatment rates. Drug crimes are up 31%.
                </p>
                <p>
                  There are 147 rehab facilities in Idaho, but only 6.93% of those needing help receive it (vs. 7.2% nationally). The state tracks trends with HIDTA reports. 2025 data shows 313 deaths so far, with fentanyl and alcohol-related DUIs continuing to rise.
                </p>
              </div>
            </div>

            {/* Families Hurt */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Families Hurt by Addiction in Rural Idaho
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Drugs tear families apart—from Boise's fentanyl crisis to rural meth epidemics. DUIs are up 12% in tests (90% involve alcohol), alongside overdoses and teen suicides (5.1%). Families often enable unwittingly—like paying bail repeatedly. Home intervention efforts fail 70-more often when families are prepared due to denial and manipulation.
                </p>
                <p>
                  90% of those needing treatment don't receive it. Homes break apart. 1.86% of all deaths are drug-related. Alcohol crashes claim many lives. Trained interventionists unite families for high outcomes, with plans that address meth-fentanyl combinations, teen marijuana use, alcohol binge patterns, and repeat DUI offenders.
                </p>
              </div>
            </div>

            {/* How Interventionists Help */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                How Interventionists Help Idaho Families
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Interventionists begin with comprehensive assessments using ASAM criteria. They analyze 2025 lab data (marijuana, meth, fentanyl spikes, 90% DUI alcohol involvement) and local needs like teen DUIs in eastern Idaho. They outline the full care continuum: detox, inpatient treatment, outpatient/IOP at 147 facilities, and sober living homes for rural residents.
                </p>
                <p>
                  Structured intervention meetings use impact letters, clear boundaries (no financial support without treatment commitment, such as DUI proof), and immediate transportation to treatment facilities. Plans address co-occurring mental health issues, plus specific populations like women with opioid dependence, youth, and DUI alcohol cases.
                </p>
                <p>
                  Aftercare includes ongoing AA/NA attendance, therapy, and family sessions, leveraging state resources to fill gaps. Idaho specialists navigate HIDTA information to book treatment spots quickly, preventing further tragedies from the 978% fentanyl increase and recurring DUIs.
                </p>
              </div>
            </div>

            {/* Why It Works */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Why Professional Intervention Works
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  When families are prepared, united, and a treatment plan is in place, professional interventions have a significantly higher chance of success. Idaho especially needs this expertise: mixed substance tests (alcohol plus meth being most common) require professionals who can dismantle enabling patterns effectively.
                </p>
                <p>
                  Interventionists help bridge the 170,000-person treatment gap with high acceptance rates. Families repair relationships and end codependency cycles. Research shows social support networks cut relapse risk in half. Local treatment centers see 3x more referrals with properly structured intervention plans.
                </p>
              </div>
            </div>

            {/* Idaho's Tough Spots */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Idaho's Unique Challenges
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Remote communities, stigma, teen use (6.76% monthly), and DUIs (10,000+ annually) create barriers to treatment access. Overdoses have increased 54% since 2013. Professional intervention saves both money and families by preventing the devastating costs of continued addiction.
                </p>
                <p>
                  2025 lab testing numbers remain high, but law enforcement collaboration is increasing. Families who move toward a clear plan early often have more options before the next crisis occurs.
                </p>
              </div>
            </div>

            {/* Action Steps */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                What Idaho Families Can Do
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Assess the Situation</h3>
                    <p className="text-muted-foreground">Watch for DUI arrests, overdose incidents, or behavioral changes. Schedule a free consultation to evaluate your options.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Contact Freedom Interventions</h3>
                    <p className="text-muted-foreground">We serve families throughout Idaho, from Boise to Coeur d'Alene, with personalized intervention plans.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Prepare Collaboratively</h3>
                    <p className="text-muted-foreground">Gather medical records, DUI documentation, and other relevant information. Practice boundaries with professional guidance.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Commit to Aftercare</h3>
                    <p className="text-muted-foreground">Establish AA/NA attendance and monitor progress for 6-12 months using available state resources.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hope Section */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Hope for Idaho Families
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  386 overdoses, 10,000 DUIs, and record lab test numbers—fentanyl, meth, and alcohol are devastating Idaho families. Professional interventionists create recovery pathways that work. They can help fill the 170,000-person treatment gap using state and local resources.
                </p>
                <p>
                  If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. Talk with an expert, assess your situation, and build a clear plan for your loved one.
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
            Schedule Free Consultation for Your Idaho Family
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            When families are prepared, united, and a treatment plan is in place, professional interventions have a significantly higher chance of success. If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you.
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


      <LocationLinks currentLocation="Idaho" locationType="state" />

      <Footer />
    </div>
  );
};

export default Idaho;
