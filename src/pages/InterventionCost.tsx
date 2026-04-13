import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
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

        <section className="py-16 md:py-20 bg-muted/30 border-y border-border/50">
          <div className="container px-6 max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">To discuss pricing directly, call Matt.</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">There's no obligation and no pitch, just a straight conversation about the situation and what the work would involve.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <a href="tel:541-838-6009"><Phone className="mr-2 h-5 w-5" />Call Now</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/#booking"><Calendar className="mr-2 h-5 w-5" />Schedule Free Consultation</Link>
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
