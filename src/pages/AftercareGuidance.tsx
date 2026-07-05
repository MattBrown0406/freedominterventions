import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, ChevronDown, Home, Repeat, Users, ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import aftercareBanner from "@/assets/aftercare-guidance-banner.jpg";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema, BreadcrumbSchema, ServiceSchema, FAQSchema, WebPageSchema } from "@/components/StructuredData";
import OptimizedImage from "@/components/OptimizedImage";

const faqs = [
  {
    question: "Why does aftercare matter so much if they already went to treatment?",
    answer:
      "Because treatment is the beginning, not the end. People leave treatment and go right back to the same stress, same people, same habits, and the same family system unless something changes. Aftercare is what helps recovery hold once the structure of treatment is gone.",
  },
  {
    question: "What is the family's role while our loved one is in treatment?",
    answer:
      "The family's job is not to manage their emotions from afar or negotiate every discomfort away. The family's job is to learn, change its own patterns, stop rescuing, and get ready for what discharge will require. Matt helps families focus on their side of the street while treatment does its work.",
  },
  {
    question: "What if they relapse after treatment?",
    answer:
      "Relapse is serious, but it does not mean all progress is lost. It does mean the family needs a plan instead of panic. Matt helps families prepare contingency steps in advance so they are not improvising if a relapse happens.",
  },
  {
    question: "What do we do when they come home?",
    answer:
      "That depends on what home looks like and what level of accountability is needed. Sometimes coming home immediately is appropriate. Sometimes sober living, step-down care, curfews, drug testing, meeting attendance, or financial boundaries are necessary. Discharge should be planned, not assumed.",
  },
  {
    question: "Can the family make recovery harder without meaning to?",
    answer:
      "Absolutely. Over-monitoring, rescuing, financial support without accountability, emotional reactivity, and pretending everything is fine can all undermine recovery. Families do not cause addiction, but they can either support recovery or keep old patterns alive.",
  },
  {
    question: "What does Matt actually help with after treatment starts?",
    answer:
      "He helps the family stay grounded, prepare for discharge, identify what boundaries need to continue, think through relapse contingencies, and stay focused on long-term change instead of just celebrating that treatment began.",
  },
];

const jumpLinks = [
  { label: "Overview", href: "#overview" },
  { label: "How It Works", href: "#process" },
  { label: "What to Expect", href: "#what-to-expect" },
  { label: "FAQ", href: "#faq" },
  { label: "Get Help", href: "#cta" },
];

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      <button className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-accent/20 transition-colors" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="font-semibold text-foreground pr-4">{question}</span>
        <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-6 py-5 border-t border-border bg-background">
          <p className="text-muted-foreground leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

const AftercareGuidance = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Aftercare Guidance for Lasting Recovery | Freedom Interventions"
        description="Following aftercare recommendations prevents relapse after addiction treatment. Learn how AA meetings, therapy, and social support drive long-term recovery."
        canonical="https://freedominterventions.com/aftercare-guidance"
        keywords="addiction aftercare, relapse prevention, AA meetings, recovery support, sober living aftercare"
      />
      <OrganizationSchema />
      <ServiceSchema
        name="Aftercare Guidance"
        description="Comprehensive aftercare planning including AA meetings, therapy, and social support to prevent relapse and drive long-term recovery."
        url="https://freedominterventions.com/aftercare-guidance"
        serviceType="Aftercare Support"
      />
      <WebPageSchema
        name="Aftercare Guidance for Lasting Recovery | Freedom Interventions"
        description="Following aftercare recommendations prevents relapse after addiction treatment. Learn how AA meetings, therapy, and social support drive long-term recovery."
        url="https://freedominterventions.com/aftercare-guidance"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Aftercare Guidance", url: "https://freedominterventions.com/aftercare-guidance" },
        ]}
      />
      <FAQSchema faqs={faqs} />
      <Navbar />

      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <OptimizedImage src={aftercareBanner} alt="Aftercare planning for life after treatment" className="w-full h-full" width={1920} height={1080} priority={true} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
      </div>

      <main>
        <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <span className="text-accent font-medium text-sm uppercase tracking-wider">Aftercare Guidance</span>
              <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground leading-tight">
                Treatment Is the Beginning. What Happens After Discharge Matters Just as Much.
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Families often focus so hard on getting their loved one into treatment that they do not think seriously enough about what comes next. Matt helps families prepare for the part that happens after admission: family roles during treatment, discharge planning, relapse contingencies, and the family changes that have to happen if recovery is going to last.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-border/60 bg-muted/20">
          <div className="container mx-auto px-6 py-4">
            <div className="max-w-5xl mx-auto flex gap-3 overflow-x-auto whitespace-nowrap [scrollbar-width:none]">
              <span className="text-sm font-medium text-foreground shrink-0 py-2">Jump to section:</span>
              {jumpLinks.map((link) => (
                <a key={link.href} href={link.href} className="shrink-0 px-4 py-2 rounded-full border border-border bg-background text-sm text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-6">
            <article className="max-w-4xl mx-auto space-y-16">
              <section id="overview" className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">What This Is</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Aftercare guidance is Matt helping the family think beyond the relief of treatment entry. The crisis may have slowed down, but the real work is now in front of everyone. If the family goes back to old patterns and the loved one walks back into the same environment without a plan, treatment progress can unravel fast.
                </p>
                <div className="bg-card rounded-2xl border border-border/60 p-6 md:p-8">
                  <p className="text-foreground leading-relaxed font-medium">
                    Addiction is a medical illness with a spiritual dimension. It requires clinical treatment and meaningful change in purpose, connection, and how the person lives. That includes the family system too. The addicted person is not the only one who has to change.
                  </p>
                </div>
              </section>

              <section id="process" className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">How It Works</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: <Users className="w-5 h-5 text-primary" />,
                      title: "Family role during treatment",
                      body: "Matt helps families stop reacting to every call, every complaint, and every emotional swing. The family needs structure while treatment is doing its work.",
                    },
                    {
                      icon: <Home className="w-5 h-5 text-primary" />,
                      title: "Discharge planning",
                      body: "Before anyone comes home, there should be a plan for housing, meetings, outpatient care, sober living if needed, transportation, money, and accountability.",
                    },
                    {
                      icon: <Repeat className="w-5 h-5 text-primary" />,
                      title: "Relapse contingency planning",
                      body: "Families do better when they decide in advance what happens if recovery starts to slip. That removes panic and guesswork later.",
                    },
                    {
                      icon: <ShieldCheck className="w-5 h-5 text-primary" />,
                      title: "Ongoing family change",
                      body: "Matt helps families look at enabling, rescuing, fear-driven decisions, and the patterns that made the old system unsustainable in the first place.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="bg-card rounded-2xl border border-border/50 p-6 md:p-8">
                      <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center mb-4">{item.icon}</div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="what-to-expect" className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">What to Expect</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    "Direct guidance on what the family should and should not be doing while their loved one is in treatment",
                    "Preparation for the hard questions, including what if they relapse and what happens when they come home",
                    "Clarity around discharge instead of vague optimism",
                    "Support for creating boundaries that continue after treatment, not just during the crisis",
                    "A stronger family system that is less reactive and less likely to slide back into enabling",
                    "A real plan for the next 30, 60, and 90 days after discharge",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 p-5 rounded-xl border border-border/50 bg-background">
                      <ShieldCheck className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <p className="text-muted-foreground leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Most families underestimate this phase. The relief of treatment entry is real, but it can create false confidence. Sustainable recovery usually depends on what the family does during treatment and how well discharge is handled when the structure comes off.
                </p>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">The Hard Truth Families Need to Hear</h2>
                <div className="bg-primary/5 rounded-2xl p-6 md:p-8 border border-primary/10">
                  <p className="text-foreground leading-relaxed mb-4">
                    Treatment can save a life. It does not automatically rebuild one.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    If the family wants a different outcome, the family has to stop doing what kept the old system running. That might mean changing financial support, living arrangements, communication patterns, expectations, and how consequences are handled. Matt helps families do that with structure instead of shame.
                  </p>
                </div>
              </section>

              <section id="faq" className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">Frequently Asked Questions</h2>
                {faqs.map((faq) => (
                  <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
                ))}
              </section>

              <section id="aftercare-support" className="bg-card rounded-2xl border-2 border-primary/30 p-8 md:p-10">
                <p className="mb-2 w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Ongoing support</p>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">Family Aftercare Support with Matt</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The intervention or treatment admission is the beginning, not the end. Families who stay structured through the first months of recovery — boundaries held, communication planned, relapse warning signs watched — get dramatically better outcomes.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Matt works with a limited number of families on ongoing aftercare support: scheduled family check-ins, boundary and communication coaching, discharge planning, and relapse-response preparation. Support is tailored — and priced — to what your family actually needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="gap-2">
                    <a href="tel:+15416688084">Call Matt to Enroll — (541) 668-8084</a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="gap-2">
                    <Link to="/?type=aftercare-planning#booking">Book a Free Aftercare Planning Call</Link>
                  </Button>
                </div>
              </section>

              <section id="cta" className="bg-primary/5 rounded-2xl border border-primary/20 p-8 md:p-12 text-center">
                <h3 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-4">Plan for What Happens After Treatment, Not Just How to Get There</h3>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                  If your loved one is in treatment now, about to discharge, or already starting to wobble, Matt can help your family build the next plan. This is where long-term recovery either gets stronger or starts slipping. Handle it on purpose.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="gap-2">
                    <Link to="/#contact">
                      <Calendar className="w-5 h-5" />
                      Schedule a Consultation
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="gap-2">
                    <a href="tel:+15416688084">
                      <Phone className="w-5 h-5" />
                      Call (541) 668-8084
                    </a>
                  </Button>
                </div>
              </section>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AftercareGuidance;
