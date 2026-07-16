import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import InterventionAnswerLinks from "@/components/InterventionAnswerLinks";
import MoneyPathCTA from "@/components/MoneyPathCTA";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calendar, CheckCircle2, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const faqItems = [
  {
    question: "How long does the preparation process take?",
    answer:
      "Most families move through preparation over a few days to a week, depending on schedules, family readiness, and how quickly treatment logistics can be confirmed. In high-risk situations, it can move faster.",
  },
  {
    question: "Who should be in the room?",
    answer:
      "The right participants are the people whose voice matters and who can stay grounded enough to follow the plan. That usually means close family or a small number of key people, not everyone with an opinion.",
  },
  {
    question: "What if someone in the family doesn't want to participate?",
    answer:
      "That happens often. Matt works with the family that is ready. Sometimes a hesitant person comes around during preparation. Sometimes they do not. The process can still move forward.",
  },
  {
    question: "Do you travel for interventions?",
    answer:
      "Yes. Matt works with families across the country and can travel when the case calls for it.",
  },
  {
    question: "What's the difference between ARISE, CRAFT, and a traditional intervention?",
    answer:
      "They are different frameworks for engaging addiction and family systems. Some are more invitational, some more structured and direct. Matt uses his training and experience to recommend the right fit for the family in front of him, not a one-size-fits-all script.",
  },
];

const breadcrumbItems = [
  { name: "Home", href: "/" },
  { name: "How Intervention Works", href: "/how-intervention-works" },
];

const HowInterventionWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="How Intervention Works | Freedom Interventions"
        description="A plain-English walkthrough of the intervention process, what happens before, during, and after. Written for families who want to understand what they're committing to."
        canonical="https://freedominterventions.com/how-intervention-works"
      />
      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />
      <main className="pt-20 md:pt-24">
        <section className="py-16 md:py-24 bg-primary/5 border-b border-border/50">
          <div className="container px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
                How Intervention Works
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Not an ambush. Not a confrontation. Here's what a professionally guided intervention actually looks like.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container px-6 max-w-4xl mx-auto space-y-16">
            <section>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">What Intervention Is, and Isn't</h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  A professional intervention is a structured, prepared conversation. It is not a surprise attack, not a chaotic family pile-on, and not an attempt to shame someone into treatment.
                </p>
                <p>
                  The family comes together with a unified message that has been written, coached, and rehearsed ahead of time. Everyone knows why they are there, what they are going to say, and what happens next.
                </p>
                <p>
                  Before the conversation ever happens, a treatment plan needs to be in place. That means identifying the right level of care, confirming availability, and making sure there is a real path ready if your loved one says yes.
                </p>
                <p>
                  The goal is not to convince someone with a clever argument. The goal is to present reality clearly, stop the mixed messages, and offer a prepared path forward. Matt's role is to prepare the family, facilitate the conversation, and manage what happens in the room so it stays focused and effective.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">Before the Intervention, the Preparation Phase</h2>
              <div className="grid gap-4">
                {[
                  ["1. Initial family consultation", "Matt learns the history, the current risks, and whether the family is actually ready to do this well."],
                  ["2. Participant selection", "Not everyone should be in the room. Part of the process is choosing the people who help the message land, and leaving out the people who would derail it."],
                  ["3. Letter writing", "Each participant prepares a statement that describes what they have seen, how it has affected them, and what will change if treatment is refused."],
                  ["4. Treatment selection", "A program is identified and a bed is confirmed before intervention day. Families should not be scrambling after the conversation."],
                  ["5. Logistics", "Time, location, transportation, and immediate next steps are arranged in advance so there is no confusion if your loved one accepts help."],
                  ["6. Rehearsal", "The family walks through the conversation with Matt, tightens the message, and prepares for manipulation, anger, delay tactics, or a quick yes."],
                ].map(([title, body]) => (
                  <div key={title} className="rounded-2xl border border-border bg-card p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">The Intervention Day</h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  The meeting begins calmly. The point is not drama. The point is clarity. One by one, each participant delivers the message they prepared.
                </p>
                <p>
                  The treatment plan is then presented clearly. If your loved one says yes, transportation is ready and the next step happens immediately. If they say no, the family does not argue in circles. The conversation still matters, and the next phase begins. You can read more about that on the <Link to="/what-if-they-refuse-treatment" className="text-primary underline underline-offset-4">What If They Refuse</Link> page.
                </p>
                <p>
                  Matt's job in the room is to facilitate, not prosecute. He keeps the meeting grounded, cuts through manipulation, protects the structure of the process, and helps the family stay aligned when emotions rise.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">After the Intervention</h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  If your loved one accepts treatment, the family's role shifts immediately. Treatment entry is only the beginning. Families need to understand communication expectations, support the treatment process, and avoid slipping back into old patterns.
                </p>
                <p>
                  If your loved one refuses, the family still has work to do. Follow-through on commitments matters either way. Boundaries are not temporary language for intervention day. They are the start of a different way of operating.
                </p>
                <p>
                  Matt remains available after the intervention to help the family stay steady, navigate next steps, and think through aftercare planning once treatment begins.
                </p>
              </div>
            </section>

            <section>
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
                <h2 className="font-serif text-3xl font-bold text-foreground mb-4 text-center">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={item.question} value={`how-it-works-${index}`}>
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

        <InterventionAnswerLinks
          source="how_intervention_works"
          slugs={[
            "what-does-interventionist-do-first",
            "what-happens-before-intervention",
            "does-intervention-still-work-if-they-are-angry",
          ]}
        />

        <MoneyPathCTA
          source="how_intervention_works"
          title="If the process sounds like what your family needs, choose the next step now."
          description="The decision path helps route you to consultation, coaching, readiness work, or formal intervention planning without guessing."
          className="bg-muted/20 border-y border-border"
        />

        <section className="py-16 md:py-20 bg-muted/30 border-y border-border/50">
          <div className="container px-6">
            <div className="max-w-3xl mx-auto text-center">
              <CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-4" />
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to talk about whether intervention makes sense for your family?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Call Matt. You'll get a straight answer about what makes sense, what doesn't, and what the next step should be.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <a href="tel:458-298-8000"><Phone className="mr-2 h-5 w-5" />Call Now</a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/?type=consultation#booking"><Calendar className="mr-2 h-5 w-5" />Schedule Free Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowInterventionWorks;
