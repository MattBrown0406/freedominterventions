import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, CheckCircle, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema, BreadcrumbSchema, ServiceAreaSchema } from "@/components/StructuredData";
import LocationLinks from "@/components/LocationLinks";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const NewJersey = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="New Jersey Addiction Intervention Services | Freedom Interventions"
        description="New Jersey faces one of the nation's highest overdose death rates with over 3,000 annual fatalities. Professional interventionists help families navigate the fentanyl crisis."
        canonical="https://freedominterventions.com/new-jersey"
        keywords="New Jersey addiction intervention, Newark intervention services, Jersey City drug intervention, New Jersey fentanyl crisis, opioid intervention NJ"
        geoRegion="US-NJ"
        geoPlacename="New Jersey"
      />
      <OrganizationSchema />
      <ServiceAreaSchema
        areaName="New Jersey"
        url="https://freedominterventions.com/new-jersey"
        description="New Jersey faces one of the nation's highest overdose death rates with over 3,000 annual fatalities. Professional interventionists help families navigate the fentanyl crisis."
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Service Areas", url: "https://freedominterventions.com/service-areas" },
          { name: "New Jersey", url: "https://freedominterventions.com/new-jersey" },
        ]}
      />
      
      <Navbar />
      
      <BreadcrumbNav items={[
        { name: "Service Areas", href: "/service-areas" },
        { name: "New Jersey", href: "/new-jersey" },
      ]} />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 max-w-4xl">
            New Jersey's Addiction Crisis: Professional Interventionists as Strategic Allies for Families
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-8">
            With over 3,000 overdose deaths annually and one of the nation's highest per capita rates, New Jersey families face an urgent crisis. Professional interventionists provide the expertise needed to guide loved ones toward recovery.
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
              <div className="text-3xl font-bold text-foreground mb-2">3,046</div>
              <div className="text-sm text-muted-foreground">Overdose Deaths (2022)</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-primary/10 border border-primary/20">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">33.1</div>
              <div className="text-sm text-muted-foreground">Deaths per 100K (vs 21.4 US)</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-secondary/50 border border-border">
              <Users className="h-8 w-8 text-secondary-foreground mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">700K+</div>
              <div className="text-sm text-muted-foreground">Residents with SUD</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-accent/50 border border-accent">
              <Heart className="h-8 w-8 text-accent-foreground mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-2">85%</div>
              <div className="text-sm text-muted-foreground">Fentanyl-Involved Deaths</div>
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
                The Scope of New Jersey's Addiction Crisis
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  New Jersey confronts one of America's most severe addiction crises, with an overdose death rate exceeding the national average by 55%. In 2022 alone, 3,046 New Jersey residents died from drug overdoses, representing a mortality rate of 33.1 per 100,000—compared to the U.S. average of 21.4.
                </p>
                <p>
                  Fentanyl has transformed the landscape, now involved in approximately 85% of all overdose deaths. The synthetic opioid has infiltrated the heroin supply and increasingly appears in counterfeit prescription pills, making every use potentially lethal. Cocaine and methamphetamine deaths have also surged, often involving fentanyl contamination.
                </p>
                <p>
                  Urban centers like Newark, Camden, Paterson, and Trenton face concentrated impacts, though suburban and rural communities have not been spared. The crisis touches every demographic, from teenagers experimenting with pills to professionals hiding functional addiction.
                </p>
              </div>
            </div>

            {/* Treatment Gap */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                New Jersey's Treatment Landscape
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Despite significant state investments in addiction treatment, a substantial treatment gap persists. Approximately 700,000 New Jersey residents struggle with substance use disorder, yet only a fraction receive adequate care. Wait times for detox beds can extend weeks, and many insurance barriers remain.
                </p>
                <p>
                  New Jersey has implemented progressive policies including expanded Medicaid coverage for addiction treatment, naloxone distribution programs, and recovery high schools. However, these resources often go underutilized because families don't know how to access them or their loved ones refuse help.
                </p>
              </div>
            </div>

            {/* Family Impact */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                How Addiction Impacts New Jersey Families
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Families across New Jersey endure the secondary trauma of watching loved ones descend into addiction. DUI arrests, job losses, broken relationships, and the constant fear of overdose create overwhelming stress. Many families exhaust themselves through repeated rescue attempts that only enable continued use.
                </p>
                <p>
                  Without professional guidance, family-led interventions often break down into arguments, mixed messages, or delayed follow-through. Well-meaning attempts often devolve into arguments, driving the addicted person further into isolation. Professional interventionists help families avoid these pitfalls while dramatically improving treatment acceptance rates to significantly higher.
                </p>
              </div>
            </div>

            {/* Role of Interventionists */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                How Professional Interventionists Help New Jersey Families
              </h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Interventionists bring specialized training and experience to what families often approach with emotion alone. They conduct comprehensive assessments using ASAM criteria to determine the appropriate level of care—whether medical detox, residential treatment, intensive outpatient, or medication-assisted treatment.
                </p>
                <p>
                  For New Jersey families, interventionists navigate the complex treatment landscape, identifying programs that accept specific insurance plans and have immediate availability. They coordinate with facilities throughout the state and beyond, arranging transport and ensuring seamless admission.
                </p>
                <p>
                  The intervention itself is carefully structured. Family members prepare impact statements expressing love and concern without blame. Clear boundaries are established, and the interventionist facilitates the conversation to prevent derailment. When the loved one agrees to treatment—as they do significantly higher of the time with professional guidance—the transition happens immediately.
                </p>
              </div>
            </div>

            {/* Why Seek Help */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Why Seek Professional Intervention in New Jersey
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Expert Assessment</h3>
                    <p className="text-muted-foreground">Comprehensive evaluation to determine the most appropriate level of care based on medical criteria and individual circumstances.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Treatment Navigation</h3>
                    <p className="text-muted-foreground">Expert guidance through New Jersey's treatment system, including facilities in Newark, Princeton, Bergen County, and beyond.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Fentanyl Crisis Expertise</h3>
                    <p className="text-muted-foreground">Specialized understanding of the dangers posed by fentanyl and appropriate medical interventions for safe detoxification.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Insurance Coordination</h3>
                    <p className="text-muted-foreground">Help navigating insurance coverage, including New Jersey Medicaid and private plans, to maximize treatment options.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">5</div>
                  <div>
                    <h3 className="font-semibold text-foreground">Aftercare Planning</h3>
                    <p className="text-muted-foreground">Coordination of ongoing support including therapy, medication-assisted treatment, sober living, and family counseling.</p>
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
                  New Jersey's addiction crisis demands professional response. The state's high overdose rate means every day without treatment carries serious risk. Professional interventionists offer families the expertise, structure, and compassion needed to break through denial and facilitate treatment acceptance.
                </p>
                <p>
                  Recovery is possible. Thousands of New Jersey residents have found sobriety through proper treatment, and families can be restored. The first step is reaching out for professional guidance. Contact us today for a confidential consultation about how intervention can help your family.
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
            Schedule Free Consultation for Your New Jersey Family
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Professional intervention increases treatment entry rates to significantly higher. Reach out today for a confidential consultation.
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


      <LocationLinks currentLocation="New Jersey" locationType="state" />

      <Footer />
    </div>
  );
};

export default NewJersey;
