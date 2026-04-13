import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, AlertTriangle, Users, Heart, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import oregonBanner from "@/assets/oregon-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LocationLinks from "@/components/LocationLinks";
import { OrganizationSchema, BreadcrumbSchema, FAQSchema, ServiceAreaSchema } from "@/components/StructuredData";

const Kansas = () => {
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/service-areas" },
    { name: "Kansas", href: "/kansas" }
  ];

  const kansasFAQs = [
    {
      question: "Does Freedom Interventions serve all of Kansas, including rural areas?",
      answer: "Yes. Matt Brown travels throughout all of Kansas — from Wichita and Overland Park to Topeka, Garden City, Dodge City, and the most rural farming communities. Distance is never a barrier when a family needs help. Call (541) 838-6009 for a free consultation."
    },
    {
      question: "What drugs are driving Kansas's addiction crisis?",
      answer: "Kansas faces a two-front drug crisis. Methamphetamine has been deeply embedded in agricultural and rural communities for decades, fueled by its relatively low cost and availability. Fentanyl has now surpassed meth as the leading driver of overdose deaths, largely trafficked through the I-70 corridor connecting Denver to Kansas City. Many people now encounter fentanyl unknowingly through counterfeit pills."
    },
    {
      question: "How does intervention work in Kansas?",
      answer: "Matt Brown works directly with the family before the intervention, helping everyone understand addiction as a chronic medical illness, identify enabling behaviors, and set firm boundaries with consequences. On the day of the intervention, Matt facilitates a structured, compassionate conversation designed to move your loved one toward accepting treatment. He handles the logistics of getting them into a treatment facility that day."
    },
    {
      question: "How much does an intervention in Kansas cost?",
      answer: "The cost of an intervention varies based on location, travel requirements, and the complexity of the situation. Freedom Interventions offers a free initial consultation so you can understand what's involved and make an informed decision. Many families find that the cost of a professional intervention is far less than the ongoing cost — financial, emotional, and physical — of untreated addiction. Call (541) 838-6009 to talk."
    },
    {
      question: "What if my loved one refuses to go to treatment after the intervention?",
      answer: "Not every intervention results in immediate acceptance, but even a 'failed' intervention plants a seed and establishes critical family boundaries. Matt prepares families for all outcomes, including how to hold firm on consequences if the person refuses. He continues to support the family after the intervention day regardless of outcome. Studies consistently show that professional interventions significantly increase treatment entry rates compared to families acting alone."
    }
  ];

  const kansasCities = [
    {
      name: "Wichita",
      slug: "wichita-kansas",
      desc: "Kansas's largest city. Aerospace/manufacturing community hit hard by meth and fentanyl.",
      county: "Sedgwick County"
    },
    {
      name: "Overland Park",
      slug: "overland-park-kansas",
      desc: "Affluent KC suburb where high-functioning addiction and stigma create unique barriers.",
      county: "Johnson County"
    },
    {
      name: "Topeka",
      slug: "topeka-kansas",
      desc: "State capital with deep poverty, meth/fentanyl crisis, and limited treatment options.",
      county: "Shawnee County"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Specialist in Kansas | Freedom Interventions"
        description="Kansas families facing addiction need expert help. Matt Brown, certified intervention specialist with 20+ years experience, serves all of Kansas. Free consultation. Call (541) 838-6009."
        keywords="intervention specialist Kansas, addiction intervention Kansas, drug intervention Kansas, Kansas interventionist, Wichita intervention, Kansas City intervention, fentanyl Kansas, meth Kansas"
        canonical="https://freedominterventions.com/kansas"
      />
      <ServiceAreaSchema
        areaName="Kansas"
        url="https://freedominterventions.com/kansas"
        description="Kansas families facing addiction need expert help. Matt Brown, certified intervention specialist with 20+ years experience, serves all of Kansas. Free consultation. Call (541) 838-6009."
      />
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbItems.map(item => ({ name: item.name, url: `https://freedominterventions.com${item.href}` }))} />
      <FAQSchema faqs={kansasFAQs} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <img
          src={oregonBanner}
          alt="Kansas plains — addiction intervention services for Kansas families"
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
              Serving All of Kansas
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Addiction Intervention Services in Kansas: Expert Help for Families
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Kansas families are navigating one of the most dangerous drug landscapes in the Midwest — meth entrenched in rural communities, fentanyl flooding in along the I-70 corridor, and treatment resources stretched thin. Matt Brown, a certified intervention specialist with 20+ years of experience, works directly with Kansas families to get loved ones into treatment before the next crisis.
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

      {/* Crisis Stats */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Kansas's Drug Crisis: What Families Need to Know
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Kansas loses more than 600 people to drug overdoses every year — and the numbers are rising. Fentanyl has overtaken methamphetamine as the leading cause of overdose death, driven largely by trafficking along Interstate 70, one of the primary drug corridors connecting Denver's supply chain to Kansas City's distribution networks. Rural Kansas communities face a compounding crisis: meth deeply embedded over generations in agricultural communities, now layered with fentanyl, and almost no accessible treatment options.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">600+</div>
                <p className="text-muted-foreground">Drug overdose deaths in Kansas per year</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">#1</div>
                <p className="text-muted-foreground">Fentanyl now Kansas's leading overdose killer, surpassing meth</p>
              </div>
              <div className="bg-background p-6 rounded-xl border border-border">
                <div className="text-3xl font-bold text-primary mb-2">I-70</div>
                <p className="text-muted-foreground">Major drug trafficking corridor running Denver to Kansas City through the state</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Rural Kansas is especially hard hit. Farming and ranching communities that have struggled with meth for two decades now face fentanyl — and families have fewer resources than ever. Many areas have no detox facilities, no inpatient treatment, and no behavioral health providers within driving distance. An experienced intervention specialist who can navigate this landscape is not a luxury. For many Kansas families, it's the difference between life and death.
            </p>
          </div>
        </div>
      </section>

      {/* How Addiction Affects Kansas Families */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  How Addiction Affects Kansas Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Addiction in Kansas doesn't look the same across the state. In Wichita, it's the aerospace worker hiding a meth habit from his family. In Overland Park, it's the high-functioning executive whose prescription opioid dependence has escalated to heroin. In Topeka, it's a young person cycling through homelessness and the criminal justice system with untreated addiction and mental health issues. In western Kansas farm towns, it's generational — grandparents who watched meth take their children now watching it take their grandchildren.
                  </p>
                  <p>
                    What's consistent across every part of Kansas is this: families wait too long. They rationalize, enable, bargain, and beg — hoping something will change. Meanwhile, tolerance increases, consequences mount, and the window for intervention narrows. The right moment for a professional intervention is now, not after the next overdose, arrest, or hospitalization.
                  </p>
                  <p>
                    Many Kansas families also struggle with the cultural reality of self-reliance. Asking for outside help feels like failure. It isn't. Professional intervention is one of the most powerful tools available to get a loved one into treatment — and it works.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Freedom Interventions Helps */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  How Freedom Interventions Helps Kansas Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Matt Brown brings 20+ years of intervention experience and deep knowledge of the national treatment landscape to every Kansas family he works with. He prepares the family, facilitates the intervention, and coordinates placement into treatment — all in one process.
                  </p>
                  <p>
                    <strong className="text-foreground">Family Preparation:</strong> Before the intervention day, Matt works extensively with family members to help them understand addiction as a chronic medical illness, identify their enabling behaviors, and prepare statements that are loving, firm, and free of blame. This preparation is what separates a professional intervention from a confrontation.
                  </p>
                  <p>
                    <strong className="text-foreground">Treatment Navigation:</strong> Kansas's treatment options are limited, especially in rural areas. Matt knows which facilities provide genuine care versus which ones are chasing insurance dollars. He connects Kansas families with quality treatment programs throughout the state and nationally when necessary.
                  </p>
                  <p>
                    <strong className="text-foreground">Boundary Setting:</strong> Intervention isn't just about getting someone into treatment on one day. Matt helps the whole family establish the boundaries and consequences that protect them — and ultimately protect the person struggling — for the long term.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kansas Cities */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Cities We Serve in Kansas
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Freedom Interventions serves all of Kansas. Below are dedicated pages for major cities with local resources and context. Don't see your city? Call — we go anywhere in the state.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {kansasCities.map((city) => (
                <Link
                  key={city.slug}
                  to={`/${city.slug}`}
                  className="block bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-xs text-muted-foreground">{city.county}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {city.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{city.desc}</p>
                  <div className="mt-4 text-primary text-sm font-medium">
                    View {city.name} page →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Local Resources */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Kansas Addiction Resources
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              These Kansas resources can provide immediate help. For professional intervention services, call Matt Brown at (541) 838-6009.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: "Kansas Crisis Line", detail: "1-888-363-2287 — 24/7 statewide crisis support" },
                { name: "Kansas HOPE Network", detail: "Peer recovery support and community connections across Kansas" },
                { name: "Heartland RADAC", detail: "Regional substance use assessment, referral, and care coordination" },
                { name: "KU Medical Center Behavioral Health", detail: "University-based behavioral health and addiction services" },
                { name: "ReDiscover", detail: "Behavioral health services in the Kansas City metro area" }
              ].map((resource) => (
                <div key={resource.name} className="bg-background p-4 rounded-lg border border-border">
                  <div className="font-semibold text-foreground mb-1">{resource.name}</div>
                  <div className="text-sm text-muted-foreground">{resource.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
              Frequently Asked Questions: Intervention in Kansas
            </h2>
            <div className="space-y-6">
              {kansasFAQs.map((faq, index) => (
                <div key={index} className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-bold text-foreground mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hope Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-accent/50 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Recovery Is Possible for Kansas Families
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Addiction is a chronic medical illness — not a moral failure, not a choice, not something that resolves on its own. But it does respond to treatment. Families across Kansas, from Wichita to the western plains, have watched loved ones find lasting recovery after a professional intervention opened the door.
                  </p>
                  <p>
                    The sooner families have a clear plan, the more options they have. A free consultation with Matt Brown costs nothing and can help your family understand what to do next.
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
              Get Help for Your Kansas Family Today
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              If the situation is escalating, it makes sense to get clarity before the next crisis makes the decision for you. A free, confidential consultation will help you understand your options and create a plan. Freedom Interventions serves all of Kansas — Wichita, Overland Park, Topeka, Kansas City metro, Garden City, Dodge City, Lawrence, Manhattan, Salina, and every community in between.
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


      <LocationLinks currentLocation="Kansas" locationType="state" />
      <Footer />
    </div>
  );
};

export default Kansas;
