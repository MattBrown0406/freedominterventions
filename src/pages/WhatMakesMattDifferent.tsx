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
    question: "Do you work alone or with a team?",
    answer:
      "Families work directly with Matt. There are no handoffs to a sales person, coordinator, or junior staff member after the first call.",
  },
  {
    question: "Do you travel for interventions?",
    answer:
      "Yes. Matt works with families across the United States and internationally when the case requires it.",
  },
  {
    question: "How do I know if you're the right fit for our family?",
    answer:
      "Have the conversation. Matt will give you a direct read on the situation, answer your questions clearly, and tell you if the case is ready. Fit becomes obvious quickly when the conversation is honest.",
  },
];

const testimonials = [
  {
    quote: "Matt brought structure to a situation that had been running our family for years. For the first time, we knew exactly what to do.",
    author: "Family member, Portland",
  },
  {
    quote: "He was direct, calm, and honest. That made it easier for our whole family to get on the same page and move forward.",
    author: "Family member, Phoenix",
  },
  {
    quote: "He understood both the addict and the family. That changed the entire tone of the process.",
    author: "Family member, Seattle",
  },
];

const breadcrumbItems = [
  { name: "Home", href: "/" },
  { name: "What Makes Matt Different", href: "/what-makes-matt-different" },
];

const WhatMakesMattDifferent = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="What Makes Matt Brown Different | Freedom Interventions"
        description="Why families choose Matt Brown for intervention. Not credentials alone, lived experience, 20+ years in the field, and a direct approach that doesn't waste your family's time."
        canonical="https://freedominterventions.com/what-makes-matt-different"
      />
      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />
      <main className="pt-20 md:pt-24">
        <section className="py-16 md:py-24 bg-primary/5 border-b border-border/50">
          <div className="container px-6 max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">What Makes Matt Different</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              There are intervention professionals. And then there's someone who has lived this from both sides.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container px-6 max-w-4xl mx-auto space-y-16">
            <section>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">He's Been Where Your Loved One Is</h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>Matt has more than 22 years of personal sobriety. He knows what it is like to be the person everyone is worried about.</p>
                <p>
                  That is not just a line in a bio. It changes how he reads denial, fear, manipulation, and resistance in the room. It also changes what he says when the moment gets real. He brings empathy without enabling, and understanding without excuses.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">20 Plus Years of Real Cases</h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>For over two decades, Matt has worked with families in crisis across the United States and internationally.</p>
                <p>
                  He has seen what works, what falls apart, and what makes the difference between a family talking in circles and a family moving with clarity. He is not reading from a script. He adapts to what is actually happening.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">He Works Directly With Your Family, Not a Team</h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>Families hire Matt, not an agency brand. He is the person you talk to from the first call through post-intervention follow-through.</p>
                <p>
                  There are no handoffs, no intake coordinator, and no getting passed around once you have already told the story. When you call, Matt answers or calls back himself.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">His Approach Is Honest, Not Sales Driven</h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>Matt will tell families if intervention is not the right move. He does not take cases that are not ready just to book a case.</p>
                <p>
                  That is better for the family and better for the outcome. The goal is simple, get your loved one into treatment in a way the family can actually sustain.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">Credentials</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  "Certified Intervention Professional, CIP.",
                  "Certified family intervention specialist since 2004.",
                  "Trained in ARISE, CRAFT, and traditional intervention models.",
                  "More than 22 years of personal sobriety and more than 20 years working with families.",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-border bg-card p-6 text-muted-foreground leading-relaxed">{item}</div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">What Families Say</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {testimonials.map((item) => (
                  <blockquote key={item.author} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <p className="text-foreground leading-relaxed mb-4">“{item.quote}”</p>
                    <footer className="text-sm text-muted-foreground">{item.author}</footer>
                  </blockquote>
                ))}
              </div>
            </section>

            <section>
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
                <h2 className="font-serif text-3xl font-bold text-foreground mb-4 text-center">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={item.question} value={`matt-different-${index}`}>
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
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">The best way to know if Matt is the right fit is to have a conversation.</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">If the fit is there, you'll know. If it isn't, that should be clear too.</p>
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

export default WhatMakesMattDifferent;
