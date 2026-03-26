import { HelpCircle, MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const faqItems = [
  {
    question: '"Won\'t an intervention just make things worse?"',
    answer: `This is one of the most common fears—and one of the most persistent myths.

Poorly planned confrontations can escalate conflict. Well-structured interventions do not. A professional intervention is designed to lower emotional intensity, not increase it. It replaces arguments, pleading, and chaos with clarity and coordination.

When done correctly, interventions often reduce tension by ending the cycle of repeated, unproductive conversations.`
  },
  {
    question: '"If they really wanted to stop, wouldn\'t they already have?"',
    answer: `Addiction changes how the brain processes motivation, risk, and consequence. Wanting to stop and being able to stop are not the same thing.

Many people struggling with addiction feel deep shame and ambivalence. They may want relief from consequences without fully acknowledging the role of substances. This is not a moral failure—it is a predictable feature of addiction.

Intervention addresses this ambivalence by changing the environment around the addiction.`
  },
  {
    question: '"Isn\'t addiction just a choice?"',
    answer: `Initial use may involve choice. Addiction does not.

Over time, substances alter brain circuits involved in decision-making, impulse control, and stress regulation. Continued use persists even when consequences are severe—not because the person doesn't care, but because their capacity to choose differently has been compromised.

Recognizing addiction as a disorder does not remove accountability. It clarifies why structure and boundaries are necessary.`
  },
  {
    question: '"What if they refuse treatment?"',
    answer: `Refusal does not mean failure.

An intervention is not a one-time gamble. It is part of a broader process that includes:
• Clear boundaries
• Consistent follow-through
• Family behavior change
• Reduced access to enabling

Many people enter treatment days or weeks after an intervention—not during the meeting itself—once the reality of changed boundaries sets in.`
  },
  {
    question: '"Aren\'t ultimatums manipulative or cruel?"',
    answer: `Threats are manipulative. Boundaries are not.

An ultimatum demands compliance. A boundary states what the family will and will not participate in going forward. It is about self-protection, not control.

Healthy boundaries are not delivered in anger. They are delivered calmly and held consistently.`
  },
  {
    question: '"Shouldn\'t we wait until they hit rock bottom?"',
    answer: `This is one of the most dangerous myths in addiction care.

Rock bottom is not a clinical milestone. It is an unpredictable outcome that often includes irreversible loss—legal, medical, relational, or fatal.

Interventions work by raising the bottom, not waiting for it. Early action consistently produces better outcomes.`
  },
  {
    question: '"Can\'t we just talk to them ourselves?"',
    answer: `Families often try—many times.

If conversations have already included pleading, arguing, bargaining, or repeated promises without change, the issue is not communication. It is structure.

Professional intervention helps families step out of emotional roles and into coordinated action.`
  },
  {
    question: '"Isn\'t this just codependency talk?"',
    answer: `Codependency is often misunderstood.

At its core, it refers to patterns where family members adapt to addiction in ways that unintentionally sustain it. This is not about blame—it is about recognizing survival strategies that are no longer working.

Intervention is not about labeling families. It is about helping them regain clarity, stability, and agency.`
  },
  {
    question: '"What if they hate us afterward?"',
    answer: `Fear of anger, rejection, or estrangement keeps many families stuck.

In practice, resentment usually comes from continued chaos, broken trust, and unresolved pain—not from boundaries. While anger may surface temporarily, many families report improved honesty and long-term relationship repair after intervention.

Love without limits is not the same as love with integrity.`
  },
  {
    question: '"Is intervention only for extreme cases?"',
    answer: `No.

Intervention is appropriate whenever:
• Substance use is escalating
• Family life is becoming unmanageable
• Boundaries are being ignored or manipulated
• Safety or health risks are increasing

Waiting for visible collapse often means waiting too long.`
  },
  {
    question: '"Isn\'t treatment what really matters?"',
    answer: `Treatment is important—but treatment without family change often fails.

Addiction exists within a system. If the system remains unchanged, the pressure to return to old patterns remains strong.

Effective intervention aligns treatment planning with family boundaries and long-term support.`
  },
  {
    question: '"Does intervention mean we\'ve failed as a family?"',
    answer: `No.

Seeking professional help is not a failure—it is a recognition that the problem has exceeded informal solutions. Families do not cause addiction, but they can influence outcomes when given the right structure.

Intervention is a decision to stop guessing and start acting intentionally.`
  }
];

const InterventionFAQ = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <HelpCircle className="w-4 h-4" />
              Frequently Asked Questions
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Family Intervention FAQ & Myth-Busting
            </h1>
            <p className="text-lg text-muted-foreground">
              Clear Answers to the Family Intervention Questions Families Are Afraid to Ask
            </p>
          </div>

          {/* Introduction */}
          <p className="text-muted-foreground mb-8 text-center">
            When families begin thinking about intervention, they are often overwhelmed by conflicting advice, 
            fear-based myths, and well-intentioned but inaccurate information. This section exists to replace 
            confusion with clarity.
          </p>
          <p className="text-muted-foreground mb-10 text-center italic">
            These answers reflect both clinical best practices and real-world experience working with families.
          </p>

          {/* Accordion FAQ */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-border">
                  <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-5">
                    <span className="text-base md:text-lg font-medium pr-4">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed whitespace-pre-line pb-6">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Final Thought */}
          <div className="mt-12 bg-primary/5 border border-primary/20 rounded-xl p-8">
            <h3 className="text-xl font-serif font-semibold text-foreground mb-4 text-center">
              Final Thought for Families Considering a Family Intervention
            </h3>
            <p className="text-muted-foreground text-center mb-4">
              If you are reading these questions, it likely means:
            </p>
            <ul className="text-muted-foreground text-center space-y-2 mb-6">
              <li>You've tried to help</li>
              <li>You've waited</li>
              <li>You've hoped things would improve on their own</li>
            </ul>
            <p className="text-foreground font-medium text-center text-lg">
              Education brings clarity. Action brings change.
            </p>
          </div>

          {/* Next Step CTA */}
          <div className="mt-10 bg-card border border-border rounded-xl p-8 text-center">
            <div className="inline-flex items-center gap-2 text-primary mb-4">
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">Your Next Step in the Family Intervention Process</span>
            </div>
            <p className="text-muted-foreground mb-6">
              If these answers reflect your situation, a confidential consultation can help you determine 
              whether intervention is appropriate and what level of support is needed.
            </p>
            <p className="text-foreground font-medium mb-6">
              You do not have to decide everything today.<br />
              You only need to stop doing this alone.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link to="/contact">Request a Confidential Consultation</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InterventionFAQ;
