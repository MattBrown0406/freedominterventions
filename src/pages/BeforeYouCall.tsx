import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import InterventionAnswerLinks from "@/components/InterventionAnswerLinks";
import InterventionReadinessChecklist from "@/components/InterventionReadinessChecklist";
import MoneyPathCTA from "@/components/MoneyPathCTA";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, Calendar, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const faqItems = [
  {
    question: "What if I'm not ready to commit to an intervention yet?",
    answer:
      "Then don't commit yet. Start with the call. The point of the first conversation is to get clarity, not to force a decision before you understand the options.",
  },
  {
    question: "What if my family isn't on the same page?",
    answer:
      "That is common. The first call can help sort out who knows what, where the resistance is, and whether the family has enough alignment to move forward.",
  },
  {
    question: "Is the first call really free?",
    answer:
      "Yes. The initial conversation is free.",
  },
];

const breadcrumbItems = [
  { name: "Home", href: "/" },
  { name: "Before You Call", href: "/before-you-call" },
];

const BeforeYouCall = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Before You Call, What To Do Right Now | Freedom Interventions"
        description="If your family is in crisis and you're not sure what to do first, start here. A clear, honest guide to the next 24 hours before you reach out for help."
        canonical="https://freedominterventions.com/before-you-call"
      />
      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />
      <main className="pt-20 md:pt-24">
        <section className="py-16 md:py-24 bg-primary/5 border-b border-border/50">
          <div className="container px-6 max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">Before You Call, What To Do in the Next 24 Hours</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">If you're not sure where to start, start here.</p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container px-6 max-w-4xl mx-auto space-y-16">
            <section>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">You Don't Have to Have Everything Figured Out</h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>Families often think they need the whole story organized before they call. They do not.</p>
                <p>
                  Matt's job is to help make sense of a confusing situation. That is what the first call is for. Right now, what you need is a little clarity and one next step, not a perfect summary.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">What to Do Right Now, Before Calling</h2>
              <div className="grid gap-4">
                {[
                  ["Write down what's been happening", "Not a formal document, just a timeline. When did this start. What have you tried. What happened most recently."],
                  ["Note who else in the family knows", "Who is aware of the situation, who is in denial, who may participate, and who may resist."],
                  ["Think about what you've already tried", "Conversations, ultimatums, treatment attempts, therapy, promises, rescues. What helped briefly. What made things worse."],
                  ["Note any immediate safety concerns", "Active overdose risk, children in the home, violence, major psychiatric instability, or a legal situation developing all matter."],
                  ["Don't make any major moves yet", "Do not issue ultimatums, confront your loved one, or pull support impulsively before you have talked through a plan."],
                ].map(([title, body], index) => (
                  <div key={title} className="rounded-2xl border border-border bg-card p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{index + 1}. {title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">What the First Call With Matt Is Like</h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>It is a conversation, not an intake form.</p>
                <p>
                  Matt will ask questions about the situation, give you a straight read on what he is hearing, and tell you what makes sense as a next step, whether that is intervention or something else. It usually takes 20 to 30 minutes, and you should leave with more clarity than you had when you started.
                </p>
                <p>
                  If you want to understand the paths that can come after that call, read <Link to="/after-consultation" className="text-primary underline underline-offset-4">What Happens After the Free Consultation</Link>.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">What Not to Do</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  "Do not confront your loved one tonight out of desperation.",
                  "Do not call a random treatment center and ask them to send someone.",
                  "Do not issue an ultimatum you are not prepared to follow through on.",
                  "Do not wait for the next crisis before calling.",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-border bg-card p-6 text-muted-foreground leading-relaxed">{item}</div>
                ))}
              </div>
            </section>

            <section>
              <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-6 w-6 text-destructive mt-1" />
                  <div>
                    <h2 className="font-serif text-3xl font-bold text-foreground mb-4">If There Is an Immediate Emergency</h2>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>If your loved one is in immediate danger, call 911 first.</p>
                      <p>If they have overdosed, call 911 immediately, then call Matt.</p>
                      <p>For non-emergency crisis situations, call Matt directly.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
                <h2 className="font-serif text-3xl font-bold text-foreground mb-4 text-center">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={item.question} value={`before-call-${index}`}>
                      <AccordionTrigger className="text-left text-base md:text-lg font-medium hover:no-underline">{item.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </section>
          </div>
        </section>

        <InterventionAnswerLinks
          source="before_you_call"
          slugs={[
            "is-consultation-confidential",
            "how-fast-can-intervention-happen",
            "when-to-call-interventionist",
          ]}
        />

        <InterventionReadinessChecklist source="before_you_call" className="bg-muted/20 border-y border-border" />
        <MoneyPathCTA
          source="before_you_call"
          title="Before you call, choose the cleanest next step."
          description="If the family is scared, divided, or about to confront, use the decision path or book a consultation so the next move is structured."
        />

        <section className="py-16 md:py-20 bg-muted/30 border-y border-border/50">
          <div className="container px-6 max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">The first step is just a conversation.</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">Call Matt now if you need clarity fast. You do not need the whole plan before you reach out.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <a href="tel:541-668-8084"><Phone className="mr-2 h-5 w-5" />Call Now</a>
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

export default BeforeYouCall;
