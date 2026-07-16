import Navbar from "@/components/Navbar";
import TestimonialStrip from "@/components/TestimonialStrip";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import InterventionAnswerLinks from "@/components/InterventionAnswerLinks";
import MoneyPathCTA from "@/components/MoneyPathCTA";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calendar, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const faqItems = [
  {
    question: "Do you offer payment plans?",
    answer:
      "That depends on the case. The best move is to ask directly. If there is flexibility, Matt can tell you. If there is not, he should say that clearly too.",
  },
  {
    question: "Does insurance cover intervention services?",
    answer:
      "Usually not. Insurance may help with treatment itself depending on the plan, but intervention services are commonly private pay.",
  },
  {
    question: "How does your fee compare to other interventionists?",
    answer:
      "Fees vary by geography, complexity, and how much support is involved. The important comparison is not just price. It is experience, direct access, fit, and whether the process is built well enough to hold under pressure.",
  },
  {
    question: "What if we can't afford a professional intervention?",
    answer:
      "That is a hard reality for some families. A consultation can still help clarify what to do next, what mistakes to avoid, and whether a smaller-scope plan is possible.",
  },
  {
    question: "Do you charge for the initial consultation?",
    answer:
      "The first consultation is free.",
  },
];

const breadcrumbItems = [
  { name: "Home", href: "/" },
  { name: "Intervention Cost & Investment", href: "/intervention-cost" },
];

const InterventionCost = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Intervention Cost & Investment | Freedom Interventions"
        description="Families often ask about the cost of intervention. Here's honest framing on what's involved, what affects pricing, and how to think about this investment."
        canonical="https://freedominterventions.com/intervention-cost"
      />
      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />
      <main className="pt-20 md:pt-24">
        <section className="py-16 md:py-24 bg-primary/5 border-b border-border/50">
          <div className="container px-6 max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">What Does an Intervention Cost?</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">An honest answer to the question most families are afraid to ask.</p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container px-6 max-w-4xl mx-auto space-y-16">
            <section>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">Why This Question Matters</h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>It is a fair question, and it deserves a straight answer.</p>
                <p>
                  Cost should never be the reason a family pretends the situation is less serious than it is, but it should be understood clearly. The harder question is usually this, what is the cost of not acting.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">What Affects the Cost</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  "Geographic location and travel requirements.",
                  "Complexity of the case, including participant count, family dynamics, and history.",
                  "Length of the preparation process.",
                  "Whether post-intervention support is needed.",
                  "The intervention model and level of coordination required.",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-border bg-card p-6 text-muted-foreground leading-relaxed">{item}</div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">What's Included</h2>
              <div className="grid gap-4">
                {[
                  "Direct access to Matt throughout the process.",
                  "Family consultation and assessment.",
                  "Participant preparation and letter coaching.",
                  "Intervention facilitation.",
                  "Treatment coordination and placement support.",
                  "Post-intervention follow-up.",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-border bg-card p-6 text-muted-foreground leading-relaxed">{item}</div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">How to Think About This Investment</h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>Treatment usually costs far more than intervention. Medical crises, legal fallout, lost income, and extended chaos often cost more than either.</p>
                <p>
                  This is not the place to comparison shop on price alone. The real question is whether this is the right person, the right approach, and the right time to stop drifting.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">A Note on Treatment Costs</h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>Matt does not receive referral fees from treatment programs.</p>
                <p>
                  Treatment recommendations are based on clinical fit, not financial arrangement. Families should ask that question of any interventionist or consultant they speak with.
                </p>
              </div>
            </section>

            <section>
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
                <h2 className="font-serif text-3xl font-bold text-foreground mb-4 text-center">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={item.question} value={`cost-${index}`}>
                      <AccordionTrigger className="text-left text-base md:text-lg font-medium hover:no-underline">{item.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </section>
          </div>
        </section>


        <section className="py-16 md:py-20">
          <div className="container px-6">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">What each level of help costs</h2>
              <p className="text-lg text-muted-foreground">Transparent pricing, so you can start at the lowest level that safely answers your question. Matt will redirect you if a different level fits.</p>
            </div>
            <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 xl:grid-cols-4">
              <div className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm">
                <p className="text-sm font-semibold text-primary">Step 1</p>
                <h3 className="mt-1 font-serif text-xl font-bold text-foreground">Free Consultation</h3>
                <p className="mt-2 text-3xl font-bold text-foreground">Free</p>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">A 15-minute call to sort what level of help your family actually needs. No obligation, no pitch.</p>
                <Button asChild className="mt-5">
                  <Link to="/?type=consultation#booking">Book Free Consult</Link>
                </Button>
              </div>
              <div className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm">
                <p className="text-sm font-semibold text-primary">Step 2</p>
                <h3 className="mt-1 font-serif text-xl font-bold text-foreground">Crisis Coaching Session</h3>
                <p className="mt-2 text-3xl font-bold text-foreground">$150</p>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">A 60-minute session that turns mixed messages and uncertainty into a working plan for the next hard conversation.</p>
                <Button asChild className="mt-5">
                  <Link to="/?type=crisis-coaching#booking">Book Crisis Coaching</Link>
                </Button>
              </div>
              <div className="flex flex-col rounded-xl border-2 border-primary/40 bg-primary/5 p-6 shadow-sm">
                <p className="text-sm font-semibold text-primary">Step 3</p>
                <h3 className="mt-1 font-serif text-xl font-bold text-foreground">Family Readiness Intensive</h3>
                <p className="mt-2 text-3xl font-bold text-foreground">$2,500</p>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">A 90-minute intensive plus 7 days of follow-up support. Pre-intervention strategy, treatment planning, and family alignment.</p>
                <Button asChild className="mt-5">
                  <Link to="/?type=readiness-intensive#booking">Book the Intensive</Link>
                </Button>
              </div>
              <div className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm">
                <p className="text-sm font-semibold text-primary">Step 4</p>
                <h3 className="mt-1 font-serif text-xl font-bold text-foreground">Full Intervention</h3>
                <p className="mt-2 text-3xl font-bold text-foreground">Custom</p>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">Full intervention planning, on-site facilitation, treatment coordination, and family support. Priced to the situation — travel, timeline, and complexity all factor in.</p>
                <Button asChild variant="outline" className="mt-5">
                  <a href="tel:458-298-8000">Call for Pricing</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <TestimonialStrip className="bg-muted/20 border-y border-border/50" heading="Families who made this investment" />

        <InterventionAnswerLinks
          source="intervention_cost"
          slugs={[
            "how-much-does-intervention-cost",
            "is-consultation-confidential",
            "can-you-do-intervention-without-rock-bottom",
          ]}
        />

        <MoneyPathCTA
          source="intervention_cost"
          title="Before comparing intervention cost, make sure you are pricing the right level of help."
          description="Some families need a free consult, some need coaching, some need readiness work, and some need full intervention planning. This path helps sort that before money becomes the only question."
          className="bg-muted/20 border-y border-border"
        />

        <section className="py-16 md:py-20 bg-muted/30 border-y border-border/50">
          <div className="container px-6 max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">To discuss pricing directly, call Matt.</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">There's no obligation and no pitch, just a straight conversation about the situation and what the work would involve.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <a href="tel:458-298-8000"><Phone className="mr-2 h-5 w-5" />Call Now</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/?type=consultation#booking"><Calendar className="mr-2 h-5 w-5" />Schedule Free Consultation</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default InterventionCost;
