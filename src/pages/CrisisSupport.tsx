import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, AlertTriangle, Shield, CheckCircle2, ArrowRight, ChevronDown, Siren, Users, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import crisisBanner from "@/assets/crisis-support-banner.jpg";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema, BreadcrumbSchema, ServiceSchema, FAQSchema, WebPageSchema } from "@/components/StructuredData";
import OptimizedImage from "@/components/OptimizedImage";

const faqs = [
  {
    question: "When is this a crisis situation?",
    answer:
      "If there is overdose risk, suicidal behavior, psychosis, violence, repeated ER visits, repeated arrests, or your loved one is so impaired that the situation is clearly escalating fast, treat it like a crisis. If someone is in immediate medical danger, call 911 first. Once the immediate emergency is addressed, Matt helps the family decide what happens next.",
  },
  {
    question: "What does Matt do during an addiction crisis?",
    answer:
      "Matt helps the family slow down, assess the real level of risk, stop reactive decisions, and create a clear plan. That may include deciding who should be involved, what boundaries start now, what treatment options are realistic, and how to use the current crisis as the moment to move toward treatment instead of repeating the same cycle.",
  },
  {
    question: "Should we bail them out, bring them home, or rescue them again?",
    answer:
      "Not automatically. Families often make expensive, emotional decisions in the middle of panic. Matt helps you separate immediate safety from enabling. Sometimes support is necessary. Sometimes rescue just resets the cycle. The key is making decisions that move the person toward treatment, not back into denial.",
  },
  {
    question: "Can treatment be arranged quickly in a crisis?",
    answer:
      "Often, yes. If detox, residential treatment, psychiatric stabilization, or another level of care is needed, Matt helps identify realistic options quickly and prepares the family for admission, transportation, cost questions, and what to expect once the person says yes.",
  },
  {
    question: "What if they calm down and say the crisis is over?",
    answer:
      "That is one of the biggest traps. A temporary calm period does not mean the problem is solved. Families often lose their leverage the moment the visible emergency passes. Matt helps you act while the reality is still clear, instead of waiting for the next overdose, arrest, or breakdown.",
  },
  {
    question: "What happens after the immediate crisis?",
    answer:
      "The goal is not just surviving the incident. The goal is stabilization, treatment entry when appropriate, and a family plan that does not collapse the moment pressure eases. Matt stays focused on what comes next, including treatment placement, family communication, and boundaries after discharge or refusal.",
  },
];

const jumpLinks = [
  { label: "Overview", href: "#overview" },
  { label: "How It Works", href: "#process" },
  { label: "What to Expect", href: "#what-to-expect" },
  { label: "FAQ", href: "#faq" },
  { label: "Get Help", href: "#cta" },
];

const steps = [
  {
    icon: <Phone className="w-5 h-5 text-primary" aria-hidden="true" />,
    title: "Matt gets the full picture fast",
    description:
      "He asks direct questions about overdose risk, mental health symptoms, violence, access to substances, recent hospitalizations, legal issues, and what the family has already been doing. The point is clarity, not comfort.",
  },
  {
    icon: <Shield className="w-5 h-5 text-primary" aria-hidden="true" />,
    title: "He helps stabilize the family first",
    description:
      "Panic makes families reactive. Matt helps you stop arguing, stop negotiating in circles, and stop making decisions just to get through the next few hours. That stability is what allows a real plan to take shape.",
  },
  {
    icon: <ClipboardList className="w-5 h-5 text-primary" aria-hidden="true" />,
    title: "He builds the immediate action plan",
    description:
      "That may mean preparing for detox or psychiatric evaluation, deciding what support will and will not continue, identifying who needs to be involved, and organizing the next conversation so the crisis turns into treatment leverage instead of another reset.",
  },
  {
    icon: <Users className="w-5 h-5 text-primary" aria-hidden="true" />,
    title: "He guides the family through follow-through",
    description:
      "If your loved one accepts help, Matt helps the family move quickly. If they refuse, he helps the family hold boundaries so the crisis still becomes a turning point instead of wasted pain.",
  },
];

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      <button
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-accent/20 transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
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

const CrisisSupport = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Crisis Support | Freedom Interventions"
        description="Professional interventionists help families navigate addiction crises including jail, hospital visits, overdoses, and self-harm. Get expert crisis support now."
        canonical="https://freedominterventions.com/crisis-support"
        keywords="addiction crisis support, intervention crisis help, overdose family support, addiction emergency help"
      />
      <OrganizationSchema />
      <ServiceSchema
        name="Addiction Crisis Support"
        description="Professional interventionists help families navigate addiction crises including jail stays, hospital visits, overdoses, and self-harm risks."
        url="https://freedominterventions.com/crisis-support"
        serviceType="Crisis Intervention"
      />
      <WebPageSchema
        name="Addiction Crisis Support | Freedom Interventions"
        description="Professional interventionists help families navigate addiction crises including jail, hospital visits, overdoses, and self-harm. Get expert crisis support now."
        url="https://freedominterventions.com/crisis-support"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Crisis Support", url: "https://freedominterventions.com/crisis-support" },
        ]}
      />
      <FAQSchema faqs={faqs} />
      <Navbar />

      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <OptimizedImage
          src={crisisBanner}
          alt="Crisis support for families facing overdose risk, psychiatric instability, or an escalating addiction emergency"
          className="w-full h-full"
          width={1920}
          height={800}
          priority={true}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
      </div>

      <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">Crisis Support</span>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground leading-tight">
              When Your Family Is in Active Crisis, You Need a Clear Plan, Not More Panic
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              This service is for families dealing with immediate danger: overdose risk, self-harm threats, acute mental health breaks, repeated hospital visits, jail, or a situation that is getting worse fast. Matt works directly with families to slow the chaos down, assess what is real, and move the situation toward stabilization and treatment.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+15418386009">
                <Button variant="default" size="lg" className="w-full sm:w-auto">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: (541) 838-6009
                </Button>
              </a>
              <Link to="/#booking">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Schedule a Consultation
                </Button>
              </Link>
            </div>
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

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-16">
            <section id="overview" className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Siren className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">What This Is</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Families usually call at this stage when they are terrified, exhausted, and no longer sure what is an emergency versus what is manipulation. They are asking questions like, "Do we bring him home?" "Do we pay for this again?" "Is she actually safe right now?" "What do we do tonight?"
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Matt helps families separate panic from strategy. This is not therapy for the family. It is a direct, structured response to an unstable situation with one goal: protect safety, stop the cycle from resetting, and move the person toward appropriate help.
              </p>
              <div className="bg-card rounded-2xl border border-border/60 p-6 md:p-8">
                <p className="text-foreground leading-relaxed font-medium">
                  Addiction is a medical illness with a spiritual dimension. It requires clinical treatment and meaningful change in purpose, connection, and how the person lives. In a crisis, both parts matter. Families need a medically sound next step and a plan that stops feeding the addiction.
                </p>
              </div>
            </section>

            <section id="process" className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">How It Works</h2>
              <div className="grid gap-6">
                {steps.map((step) => (
                  <div key={step.title} className="bg-card rounded-2xl border border-border/50 p-6 md:p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        {step.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="what-to-expect" className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">What to Expect</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "A calm, direct assessment of what is actually happening right now",
                  "Guidance on whether the family should step in, step back, or hold a line",
                  "Specific treatment planning if detox, residential care, or psychiatric stabilization is needed",
                  "Preparation for what happens if your loved one agrees to help",
                  "A boundary plan if your loved one refuses help",
                  "Less chaos, less arguing, and more clarity about what the family will do next",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 p-5 rounded-xl border border-border/50 bg-background">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <p className="text-muted-foreground leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed">
                The best outcome is not just that everyone gets through the night. The best outcome is that the crisis becomes the point where the family stops managing addiction and starts moving toward treatment, accountability, and a different way forward.
              </p>
            </section>

            <section id="faq" className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">Frequently Asked Questions</h2>
              {faqs.map((faq) => (
                <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </section>

            <section id="cta" className="bg-card rounded-2xl p-8 md:p-12 text-center border border-border/50">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-4">If Things Are Escalating, Get Clarity Before the Next Crisis Hits</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                You do not need a dramatic speech. You need a plan. If your family is dealing with overdose risk, psychiatric instability, legal chaos, or a situation that is spinning faster than you can manage, call Matt. He will help you sort out what matters now and what the next move should be.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+15418386009">
                  <Button variant="default" size="lg" className="w-full sm:w-auto">
                    <Phone className="w-5 h-5 mr-2" />
                    Call (541) 838-6009
                  </Button>
                </a>
                <Link to="/#booking">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Schedule a Consultation
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CrisisSupport;
