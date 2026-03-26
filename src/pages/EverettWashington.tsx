import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import cityBanner from "@/assets/washington-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { LocalBusinessSchema, OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

const EverettWashington = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Washington", href: "/washington" },
    { name: "Everett", href: "/everett-washington" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Services in Everett, Washington | Freedom Interventions"
        description="Everett families in Snohomish County facing addiction get expert intervention support from Matt Brown. Free consultation. (541) 838-6009."
        keywords="Everett addiction intervention, Snohomish County drug intervention, Everett opioid crisis, fentanyl intervention Everett, addiction help Everett WA, Snohomish County intervention services"
        canonical="https://freedominterventions.com/everett-washington"
      />
      <LocalBusinessSchema location="Everett" state="Washington" />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={cityBanner}
          alt="Washington State landscape representing hope for Everett families facing addiction"
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
              Everett, Washington
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Everett's Opioid Crisis: Professional Intervention Services for Snohomish County Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Everett and Snohomish County are facing a significant opioid and fentanyl crisis that has devastated working families across the region. As a manufacturing and working-class community north of Seattle, Everett families are dealing with addiction that demands professional support—not judgment. Freedom Interventions brings compassionate, expert intervention services to Snohomish County.
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
                  Understanding Everett's Addiction Challenge
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Snohomish County has seen a dramatic rise in opioid and fentanyl-related deaths over recent years. Everett's blue-collar manufacturing heritage, physical labor industries, and proximity to major drug supply corridors have created conditions where opioid dependency can take root quickly. The shift from prescription opioids to illicit fentanyl has made the situation far more dangerous.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">~115K</div>
                <p className="text-muted-foreground">Everett residents impacted by Snohomish County's addiction crisis</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Rising</div>
                <p className="text-muted-foreground">Fentanyl-related overdose deaths in Snohomish County year over year</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">Critical</div>
                <p className="text-muted-foreground">Treatment capacity gaps leaving many Snohomish families without options</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              From downtown Everett to Marysville, Mukilteo to Monroe, Snohomish County families are grappling with an addiction crisis that has overwhelmed local treatment systems. Physical labor injuries that led to opioid prescriptions have transitioned into dependencies that now rely on street fentanyl—a far deadlier path.
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
                  How Addiction Affects Everett Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    In Everett's working-class community, addiction carries heavy stigma. Families often delay seeking help out of shame or the belief that they should be able to solve the problem themselves. Meanwhile, the addiction progresses—job loss, legal trouble, health emergencies, and fractured relationships become the new normal.
                  </p>
                  <p>
                    Manufacturing workers and aerospace employees who developed opioid dependency after workplace injuries now find themselves trapped in a cycle that prescription monitoring programs have pushed toward the street market. The physical availability of fentanyl makes every use an act of Russian roulette.
                  </p>
                  <p>
                    Families watch their loved ones decline and feel powerless to stop it. Professional intervention changes that dynamic—giving families the tools, structure, and professional support to make a real difference.
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
                  How Freedom Interventions Helps Everett Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Matt Brown brings over 20 years of experience helping working families navigate addiction. We understand the pride, the shame, and the exhaustion that Everett families feel—and we meet you exactly where you are without judgment.
                  </p>
                  <p>
                    <strong className="text-foreground">Snohomish County Resources:</strong> We work with Providence Regional Medical Center Everett, Compass Health, and Snohomish County Human Services to identify the right level of care for your loved one. When local waitlists are a barrier, we access statewide and national options immediately.
                  </p>
                  <p>
                    <strong className="text-foreground">Family Education:</strong> We help families understand addiction as a medical illness, not a moral failure—shifting the dynamic from blame to action and creating the conditions for lasting change.
                  </p>
                  <p>
                    <strong className="text-foreground">Coordinated Care:</strong> We don't just run the intervention—we coordinate the next steps so your loved one goes directly from saying "yes" to treatment, without the delays that allow second-guessing to take over.
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
                  Hope for Snohomish County Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Recovery happens every day in communities like Everett. We've helped Snohomish County families guide their loved ones into treatment and watched them rebuild their lives from the ground up. It takes courage to ask for help—and that courage starts with one phone call.
                  </p>
                  <p>
                    Don't let stigma, fear, or exhaustion delay the conversation that could save your loved one's life. Professional intervention is your most powerful tool.
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
              Get Help for Your Everett Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Don't wait for the next overdose or crisis. Our free, confidential consultation will help you understand your options. We serve all of Snohomish County including Everett, Marysville, Mukilteo, Lynnwood, Monroe, Edmonds, and Mountlake Terrace.
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


      <LocationLinks currentLocation="Everett" locationType="city" parentState="Washington" />
      <Footer />
    </div>
  );
};

export default EverettWashington;
