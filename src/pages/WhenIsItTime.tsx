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
    question: "What if my loved one isn't at rock bottom yet?",
    answer:
      "Rock bottom is not a medical milestone. It is usually the point where the family stops cushioning the addiction. If the pattern is clear and the damage is growing, you do not need to wait for something worse.",
  },
  {
    question: "Can intervention work if the family isn't united?",
    answer:
      "Yes, but the division has to be addressed honestly. Matt often works with families that are not aligned at the start. Part of the process is getting clear about who is ready and what can realistically be done.",
  },
  {
    question: "What if my loved one doesn't know we're considering this?",
    answer:
      "That is common. Families usually reach out before their loved one knows professional help is being considered. The first call is about understanding the situation and planning well, not making announcements prematurely.",
  },
  {
    question: "Is there a point where it's too late?",
    answer:
      "As long as the person is alive, there is still something to do. The more serious the risk, the more important it is to stop drifting and get clear about the next step.",
  },
];

const breadcrumbItems = [
  { name: "Home", href: "/" },
  { name: "When Is It Time for an Intervention?", href: "/when-is-it-time-for-an-intervention" },
];

const signs = [
  "You've had the conversation multiple times and nothing has changed.",
  "You've set limits and then backed down from them.",
  "The family is organized around managing the addiction, covering for it, making excuses, and absorbing consequences.",
  "There have been medical emergencies, overdoses, blackouts, or close calls.",
  "Employment, finances, relationships, or legal situations are deteriorating.",
  "Children or other dependents are being affected by the chaos.",
  "Your loved one has agreed to get help before and then changed their mind.",
  "You feel like you're waiting for something catastrophic to happen before acting.",
  "Family members are in conflict about what to do.",
  "You're exhausted and you don't know what else to try.",
];

const WhenIsItTime = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="When Is It Time for an Intervention? | Freedom Interventions"
        description="Not sure if your family is at the intervention point? Here are the honest signs that it's time to stop waiting and get outside help."
        canonical="https://freedominterventions.com/when-is-it-time-for-an-intervention"
      />
      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />
      <main className="pt-20 md:pt-24">
        <section className="py-16 md:py-24 bg-primary/5 border-b border-border/50">
          <div className="container px-6 max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">When Is It Time for an Intervention?</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Most families wait too long. Here's how to know if you're already past the point where waiting makes sense.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container px-6 max-w-4xl mx-auto space-y-16">
            <section>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">The Honest Answer</h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  Most families come to intervention after years of trying to handle it on their own. They have talked, pleaded, covered, threatened, backed down, and tried to time the perfect conversation.
                </p>
                <p>
                  The real question is not, is it bad enough yet. The real question is, has anything we've tried actually changed the situation. If the answer is no, waiting for it to get worse is not a strategy.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">Signs It's Time</h2>
              <div className="space-y-4">
                {signs.map((sign) => {
                  const [bold, ...rest] = sign.split(" ");
                  return (
                    <p key={sign} className="rounded-2xl border border-border bg-card p-6 text-muted-foreground leading-relaxed">
                      <span className="font-semibold text-foreground">{bold}</span> {rest.join(" ")}
                    </p>
                  );
                })}
              </div>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">What Waiting for Rock Bottom Actually Means</h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  Rock bottom is not a fixed point. It is whatever the family, over time, keeps agreeing to live with.
                </p>
                <p>
                  In practice, families often define the bottom by what they will and will not accept. If the family keeps absorbing fallout, the bottom keeps dropping.
                </p>
                <p>
                  Waiting for rock bottom can mean waiting for a funeral. That is the part people say quietly, but it is true. The bottom can be raised when the family changes what addiction has access to.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">What If You're Not Sure?</h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>It's okay to call and ask. One consultation does not commit you to anything.</p>
                <p>
                  Matt will tell you honestly whether intervention makes sense, whether the family is ready, and whether another path should come first. If it is not the right move, he should say that.
                </p>
              </div>
            </section>

            <section>
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
                <h2 className="font-serif text-3xl font-bold text-foreground mb-4 text-center">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={item.question} value={`when-time-${index}`}>
                      <AccordionTrigger className="text-left text-base md:text-lg font-medium hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </section>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-muted/30 border-y border-border/50">
          <div className="container px-6 max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">If you're asking this question, it's worth a conversation.</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">Call Matt. You'll get clarity fast, and you won't be pushed into anything that doesn't fit.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <a href="tel:541-668-8084"><Phone className="mr-2 h-5 w-5" />Call Now</a>
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

export default WhenIsItTime;
