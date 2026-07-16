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
    question: "Can we do a second intervention?",
    answer:
      "Yes, in some cases. A second intervention makes sense when the first process changed the family system, the treatment option is still viable, and there is a clear reason to re-engage rather than simply repeat the same conversation.",
  },
  {
    question: "What if the family can't hold their commitments?",
    answer:
      "Then that has to be addressed directly. If the family says one thing and does another, addiction learns that nothing really changed. Matt's work after a refusal often focuses on helping the family stay aligned and realistic.",
  },
  {
    question: "What if my loved one gets angry and cuts off contact?",
    answer:
      "That risk is real, but so is the risk of continuing the status quo. Families can keep the door open for respectful contact while still refusing to fund, rescue, or participate in the addiction.",
  },
  {
    question: "Should we call law enforcement or pursue involuntary commitment?",
    answer:
      "That depends on the facts, the immediate danger, and the laws where you live. If there is an active emergency, call 911. Outside of that, those options should be discussed carefully rather than used as panic moves.",
  },
];

const breadcrumbItems = [
  { name: "Home", href: "/" },
  { name: "What If They Refuse Treatment?", href: "/what-if-they-refuse-treatment" },
];

const WhatIfTheyRefuse = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="What If They Refuse Treatment? | Freedom Interventions"
        description="A loved one refusing treatment doesn't mean the intervention failed. Here's what actually happens when someone says no, and what families should do next."
        canonical="https://freedominterventions.com/what-if-they-refuse-treatment"
      />
      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />
      <main className="pt-20 md:pt-24">
        <section className="py-16 md:py-24 bg-primary/5 border-b border-border/50">
          <div className="container px-6 max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">What If They Refuse Treatment?</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              A refusal is not a failure. Here's what it actually means, and what happens next.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container px-6 max-w-4xl mx-auto space-y-16">
            <section>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">Refusals Are More Common Than Families Think</h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>Not everyone says yes on intervention day. Families should know that before the conversation happens.</p>
                <p>
                  The goal was never just to get a yes in the room. A well-run intervention changes the family system. That matters whether the person accepts treatment immediately or not.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">What Refusal Usually Looks Like</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  "A flat no.",
                  "I'll think about it, which usually means no decision yet.",
                  "Agreeing in the room and backing out later.",
                  "Leaving the room.",
                  "Getting angry, blaming the family, or shutting down completely.",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-border bg-card p-6 text-muted-foreground leading-relaxed">
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">What the Family Does When They Say No</h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  This is the part that matters most. Each family member has to follow through on the commitments they stated in their letters. This is where enabling ends, or it doesn't.
                </p>
                <p>
                  The addiction has been subsidized by the family system. If nothing changes in the family, nothing changes for the person. Boundaries aren't boundaries without consequences attached.
                </p>
                <p>
                  In practice, follow-through may mean no more rent money, no more covering missed work, no more lying to other family members, no more paying legal bills created by the addiction, and no more allowing active substance use in the home. The exact boundaries depend on the case, but they need to be real.
                </p>
                <p>
                  Matt does not disappear after a refusal. His role becomes helping the family stay steady, keep the door open for treatment, and stop collapsing back into old patterns the first time pressure rises.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">What Usually Happens Over Time</h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>Many people who refuse on intervention day enter treatment within weeks or months. Not all, but many.</p>
                <p>
                  The family's sustained position changes the equation. The door should stay open, but the enabling should stay closed. In some cases, a second intervention later makes sense. In other cases, firm, consistent follow-through is what gets the person to move.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">What the Family Should Not Do After a Refusal</h2>
              <div className="grid gap-4">
                {[
                  "Do not go back to old patterns because the room got uncomfortable.",
                  "Do not rescind stated consequences without a real reason.",
                  "Do not assume the process failed because the answer was not immediate.",
                  "Do not give up on the treatment plan that was identified unless there is a genuine clinical or logistical reason to change it.",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-border bg-card p-6 text-muted-foreground leading-relaxed">{item}</div>
                ))}
              </div>
            </section>

            <section>
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
                <h2 className="font-serif text-3xl font-bold text-foreground mb-4 text-center">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={item.question} value={`refuse-${index}`}>
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
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">If your loved one said no, the process isn't over.</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">Let's talk about what comes next, and how the family holds the line without turning cold.</p>
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

export default WhatIfTheyRefuse;
