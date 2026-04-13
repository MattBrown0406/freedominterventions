import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import oregonBanner from "@/assets/oregon-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { OrganizationSchema, BreadcrumbSchema, FAQSchema, ServiceAreaSchema } from "@/components/StructuredData";

const Hawaii = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Hawaii", href: "/hawaii" },
  ];

  const hawaiiFAQs = [
    {
      question: "Can a professional interventionist travel to Hawaii?",
      answer: "Yes. Matt Brown travels to all Hawaiian islands — Oahu, Maui, the Big Island, and Kauai — to conduct in-person interventions. Geographic isolation is never a reason to delay getting help. Remote pre-intervention family coaching is also available. Call (541) 838-6009 for a free confidential consultation.",
    },
    {
      question: "What is the biggest drug problem in Hawaii?",
      answer: "Methamphetamine, locally known as 'ice,' is Hawaii's #1 drug problem and has been for decades. However, fentanyl contamination in the drug supply is rising rapidly and dramatically increasing overdose deaths. Hawaii sees approximately 400 overdose deaths per year, and the crisis is worsening. Alcohol use disorder also remains a persistent problem across all islands.",
    },
    {
      question: "Does geographic isolation make addiction treatment harder in Hawaii?",
      answer: "Absolutely. Hawaii's island geography creates real barriers: limited local treatment options, high cost of mainland travel, and family separation during residential treatment. A professional interventionist helps Hawaii families navigate these barriers — identifying appropriate local resources and, when needed, connecting families with high-quality mainland treatment programs that accommodate the distance.",
    },
    {
      question: "Are Native Hawaiian communities more affected by addiction?",
      answer: "Research consistently shows Native Hawaiians and Pacific Islanders face disproportionately high rates of substance use disorders and overdose deaths, often driven by systemic inequities in healthcare access, historical trauma, and socioeconomic factors. Culturally sensitive intervention approaches that honor Hawaiian values and family structures (ohana) are critical for this community.",
    },
    {
      question: "How quickly can an intervention be arranged on a Hawaiian island?",
      answer: "Urgent situations can be addressed within 24-72 hours. Standard preparation takes 1-2 weeks for optimal results. Freedom Interventions will coordinate travel to your island and help secure a treatment placement before the intervention takes place, so your loved one can go directly to care the same day.",
    },
  ];

  const islandCards = [
    {
      name: "Oahu",
      description: "Home to Honolulu and ~1 million residents. Urban addiction crisis with meth and rising fentanyl. Military community PTSD/substance use co-occurrence.",
      href: "/oahu-hawaii",
      population: "~1M",
    },
    {
      name: "Maui",
      description: "Tourism economy where alcohol is heavily normalized. Lahaina wildfire trauma driving substance use surge. Affluent culture that masks addiction.",
      href: "/maui-hawaii",
      population: "~165K",
    },
    {
      name: "Big Island",
      description: "Most rural island. Meth deeply entrenched. Limited treatment infrastructure. Native Hawaiian communities and agricultural/working-class families.",
      href: "/big-island-hawaii",
      population: "~200K",
    },
    {
      name: "Kauai",
      description: "Smallest populated island. Extreme geographic isolation. Limited treatment resources. Tight-knit community where stigma prevents families from seeking help.",
      href: "/kauai-hawaii",
      population: "~73K",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Specialist in Hawaii | Freedom Interventions"
        description="Hawaii families facing addiction need expert help. Matt Brown, certified intervention specialist with 20+ years experience, serves all of Hawaii including Oahu, Maui, Big Island & Kauai. Free consultation. Call (541) 838-6009."
        keywords="intervention specialist Hawaii, addiction intervention Hawaii, drug intervention Hawaii, Hawaii interventionist, Oahu intervention, Maui intervention, Big Island addiction help, family intervention Hawaii"
        canonical="https://freedominterventions.com/hawaii"
      />
      <ServiceAreaSchema
        areaName="Hawaii"
        url="https://freedominterventions.com/hawaii"
        description="Hawaii families facing addiction need expert help. Matt Brown, certified intervention specialist with 20+ years experience, serves all of Hawaii including Oahu, Maui, Big Island & Kauai. Free consultation. Call (541) 838-6009."
      />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />
      <FAQSchema faqs={hawaiiFAQs} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={oregonBanner}
          alt="Hawaii addiction intervention services"
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
              Hawaii — All Islands
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Addiction Intervention Services in Hawaii: Island Families Deserve Expert Help
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Hawaii's paradise image conceals a devastating addiction crisis. Methamphetamine — known locally as "ice" — has ravaged island communities for decades. Now fentanyl is arriving rapidly, driving overdose deaths higher. Geographic isolation creates unique barriers to treatment. Matt Brown, a certified intervention specialist with 20+ years of experience, travels to all Hawaiian islands to help families break through.
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

      {/* Stats Section */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Hawaii's Addiction Crisis by the Numbers
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Hawaii's addiction crisis doesn't match its postcard image. Beneath the beaches and aloha spirit, families are losing people they love — and geographic isolation makes every barrier harder to overcome.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border text-center">
                <div className="text-3xl font-bold text-primary mb-2">~400</div>
                <p className="text-muted-foreground text-sm">Overdose deaths per year in Hawaii</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border text-center">
                <div className="text-3xl font-bold text-primary mb-2">#1</div>
                <p className="text-muted-foreground text-sm">Meth ("ice") — Hawaii's dominant drug crisis</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border text-center">
                <div className="text-3xl font-bold text-primary mb-2">↑ Fast</div>
                <p className="text-muted-foreground text-sm">Fentanyl entering the drug supply rapidly</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border text-center">
                <div className="text-3xl font-bold text-primary mb-2">High</div>
                <p className="text-muted-foreground text-sm">Native Hawaiian community disproportionately impacted</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Geographic isolation compounds every aspect of Hawaii's addiction crisis. Families face limited local treatment options, expensive inter-island and mainland travel, and the painful reality of sending loved ones far from home for residential care. A professional interventionist who understands these realities isn't a luxury — it's the most direct path forward.
            </p>
          </div>
        </div>
      </section>

      {/* Island Cards Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">
              Intervention Services Across All Hawaiian Islands
            </h2>
            <p className="text-muted-foreground text-center mb-10 leading-relaxed">
              Each island has a distinct addiction landscape. Click below to learn about the specific challenges facing families on each island.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {islandCards.map((island) => (
                <Link
                  key={island.name}
                  to={island.href}
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {island.name}
                      </h3>
                    </div>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      {island.population}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {island.description}
                  </p>
                  <span className="text-primary text-sm font-medium group-hover:underline">
                    Learn about {island.name} →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  How Freedom Interventions Helps Hawaii Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Matt Brown has conducted interventions across the country for over 20 years. He travels to all Hawaiian islands and understands the unique intersection of island culture, ohana (family) values, and the addiction crisis gripping Hawaii's communities.
                  </p>
                  <p>
                    <strong className="text-foreground">Culturally Informed Approach:</strong> Hawaii's rich cultural traditions — especially the concept of ohana and collective family responsibility — shape how intervention conversations need to happen. Matt's approach honors these values rather than overriding them.
                  </p>
                  <p>
                    <strong className="text-foreground">Treatment Navigation:</strong> When local resources are limited or appropriate treatment doesn't exist on your island, Matt helps families evaluate mainland options and navigate the logistics of distance treatment — reducing the fear and confusion that delays action.
                  </p>
                  <p>
                    <strong className="text-foreground">Military Community Expertise:</strong> Oahu's significant military population (Pearl Harbor, Schofield Barracks, Kaneohe Bay) creates a distinct dynamic where PTSD and substance use disorders frequently co-occur. Matt has experience working with veterans and active-duty families.
                  </p>
                  <p>
                    <strong className="text-foreground">Family Healing:</strong> The intervention is the beginning, not the end. Matt helps the entire family establish healthy boundaries, stop enabling behaviors, and begin their own healing alongside their loved one.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ice/Meth Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Understanding "Ice" — Hawaii's Methamphetamine Crisis
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Hawaii has struggled with methamphetamine — locally called "ice" — longer and more severely than almost any other state. Ice is cheaper, more potent, and more widely available in Hawaii than traditional mainland meth. Its prevalence spans economic classes, neighborhoods, and generations.
                  </p>
                  <p>
                    Families dealing with a loved one addicted to ice often describe years of watching someone deteriorate — paranoia, psychosis, weight loss, lost employment, disappearing relationships — before realizing the severity. Ice addiction is one of the most challenging to treat, which is exactly why professional intervention and immediate treatment placement is critical.
                  </p>
                  <p>
                    Now fentanyl is entering Hawaii's drug supply — often mixed into methamphetamine or other substances without the user's knowledge. This dramatically increases overdose risk for people who believe they're only using meth. The window to act is closing faster than families realize.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="w-full">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Hawaii Addiction Resources
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-background p-5 rounded-xl border border-border">
                    <h3 className="font-semibold text-foreground mb-1">Hawaii CARES Crisis Line</h3>
                    <p className="text-sm text-muted-foreground mb-2">24/7 mental health and substance abuse crisis support statewide</p>
                    <a href="tel:1-800-753-6879" className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
                      <Phone className="h-3.5 w-3.5" /> 1-800-753-6879
                    </a>
                  </div>
                  <div className="bg-background p-5 rounded-xl border border-border">
                    <h3 className="font-semibold text-foreground mb-1">Aloha House (Maui)</h3>
                    <p className="text-sm text-muted-foreground mb-2">Residential and outpatient substance abuse treatment in Maui County</p>
                    <span className="text-muted-foreground text-sm flex items-center gap-1">
                      <ExternalLink className="h-3.5 w-3.5" /> alohahouse.us
                    </span>
                  </div>
                  <div className="bg-background p-5 rounded-xl border border-border">
                    <h3 className="font-semibold text-foreground mb-1">Hawaii Island Recovery (Big Island)</h3>
                    <p className="text-sm text-muted-foreground mb-2">Residential addiction treatment on the Big Island with nature-based programming</p>
                    <span className="text-muted-foreground text-sm flex items-center gap-1">
                      <ExternalLink className="h-3.5 w-3.5" /> hawaiiislandrecovery.com
                    </span>
                  </div>
                  <div className="bg-background p-5 rounded-xl border border-border">
                    <h3 className="font-semibold text-foreground mb-1">Hina Mauka (Oahu)</h3>
                    <p className="text-sm text-muted-foreground mb-2">Oahu's leading nonprofit substance use disorder treatment provider</p>
                    <span className="text-muted-foreground text-sm flex items-center gap-1">
                      <ExternalLink className="h-3.5 w-3.5" /> hinamauka.org
                    </span>
                  </div>
                  <div className="bg-background p-5 rounded-xl border border-border md:col-span-2">
                    <h3 className="font-semibold text-foreground mb-1">Kahi Mohala (Oahu)</h3>
                    <p className="text-sm text-muted-foreground mb-2">Behavioral health hospital offering psychiatric and substance use treatment on Oahu</p>
                    <span className="text-muted-foreground text-sm flex items-center gap-1">
                      <ExternalLink className="h-3.5 w-3.5" /> kahimohala.org
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4 italic">
                  Note: Resource listings are for informational purposes. Always verify current availability and services directly. Freedom Interventions does not receive referral fees from any treatment provider.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div className="w-full">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Frequently Asked Questions — Hawaii
                </h2>
                <div className="space-y-6">
                  {hawaiiFAQs.map((faq, i) => (
                    <div key={i} className="bg-card p-6 rounded-xl border border-border">
                      <h3 className="font-semibold text-foreground mb-3">{faq.question}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">{faq.answer}</p>
                    </div>
                  ))}
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
            Hawaii Families: Don't Let Geography Be the Reason You Wait
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-3xl mx-auto">
            Distance is a logistical problem. Addiction is a medical emergency. Matt Brown travels to all Hawaiian islands and will help your family develop a plan — starting with a free, confidential consultation.
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


      <Footer />
    </div>
  );
};

export default Hawaii;
