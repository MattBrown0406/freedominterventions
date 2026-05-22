import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BookOpen, Stethoscope, MapPinned, ShieldCheck, ArrowRight, ChevronDown, Phone, ClipboardList, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import treatmentBanner from "@/assets/treatment-planning-banner.jpg";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema, BreadcrumbSchema, ServiceSchema, FAQSchema, WebPageSchema } from "@/components/StructuredData";
import OptimizedImage from "@/components/OptimizedImage";

const faqs = [
  {
    question: "How do we know which treatment is right?",
    answer:
      "You look at the whole picture, not just the sales pitch from a program. Matt helps families evaluate substance use severity, withdrawal risk, mental health issues, past treatment history, geography, insurance, motivation level, and what setting gives the person the best chance of actually staying in treatment.",
  },
  {
    question: "Does the most expensive program mean the best fit?",
    answer:
      "No. Some families overspend on the wrong level of care, and others under-treat because they hope a lighter option will be enough. The right question is not what sounds impressive. The right question is what this person clinically needs and what the family can realistically support.",
  },
  {
    question: "What is Matt's role versus the family's role?",
    answer:
      "Matt evaluates the situation, helps narrow the options, vets programs, and prepares the family for the practical realities of admission. The family provides the history, insurance information, financial boundaries, and decision-making authority. It works best when everyone is clear on their part.",
  },
  {
    question: "Can treatment planning happen before an intervention?",
    answer:
      "It should. Treatment planning is part of intervention preparation. If your loved one says yes and the family has no bed, no travel plan, and no next step ready, momentum is lost. Matt helps families plan first so action can happen immediately.",
  },
  {
    question: "What if the recommended program is out of state?",
    answer:
      "Sometimes treatment close to home makes sense. Sometimes getting away from dealers, drinking buddies, enabling, or daily chaos is the smarter move. Matt helps families weigh geography honestly instead of assuming local is always better.",
  },
  {
    question: "What if they refuse the level of care we recommend?",
    answer:
      "That happens. Matt helps families stay grounded in what is clinically appropriate and what boundaries support that plan. The family does not need to negotiate itself into a weak plan just because the loved one prefers something easier.",
  },
];

const jumpLinks = [
  { label: "Overview", href: "#overview" },
  { label: "How It Works", href: "#process" },
  { label: "What to Expect", href: "#what-to-expect" },
  { label: "FAQ", href: "#faq" },
  { label: "Get Help", href: "#cta" },
];

const processSteps = [
  {
    icon: <ClipboardList className="w-5 h-5 text-primary" />,
    title: "Matt evaluates the actual clinical picture",
    description:
      "He looks at substance use, withdrawal risk, psychiatric concerns, trauma, prior treatment history, relapse pattern, family dynamics, and the level of structure the person is likely to need.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-primary" />,
    title: "He filters out bad-fit programs",
    description:
      "Not every program is right for every person. Matt helps families avoid programs that are too light, too generic, poorly structured, or simply wrong for the real situation in front of them.",
  },
  {
    icon: <MapPinned className="w-5 h-5 text-primary" />,
    title: "He weighs fit, geography, and logistics",
    description:
      "Insurance, travel, available beds, family resources, discharge planning, and the practical reality of admission all matter. A plan only works if it can actually be executed.",
  },
  {
    icon: <Users className="w-5 h-5 text-primary" />,
    title: "He prepares the family for what happens next",
    description:
      "Families need to know what admission day looks like, what communication with the program may involve, what boundaries matter, and what not to do once treatment begins.",
  },
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

const TreatmentPlanning = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Treatment Planning Services | Freedom Interventions"
        description="Interventionists create comprehensive treatment plans covering detox, inpatient, outpatient, IOP, and sober living for lasting addiction recovery."
        canonical="https://freedominterventions.com/treatment-planning"
        keywords="addiction treatment planning, detox programs, inpatient rehab, outpatient treatment, IOP, sober living"
      />
      <OrganizationSchema />
      <ServiceSchema
        name="Treatment Planning Services"
        description="Comprehensive treatment plans covering detox, inpatient, outpatient, IOP, and sober living for lasting addiction recovery."
        url="https://freedominterventions.com/treatment-planning"
        serviceType="Treatment Planning"
      />
      <WebPageSchema
        name="Treatment Planning Services | Freedom Interventions"
        description="Interventionists create comprehensive treatment plans covering detox, inpatient, outpatient, IOP, and sober living for lasting addiction recovery."
        url="https://freedominterventions.com/treatment-planning"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Treatment Planning", url: "https://freedominterventions.com/treatment-planning" },
        ]}
      />
      <FAQSchema faqs={faqs} />
      <Navbar />

      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mt-28 md:mt-32">
        <OptimizedImage src={treatmentBanner} alt="Treatment planning and placement for addiction care" className="w-full h-full" width={1920} height={1088} priority={true} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
      </div>

      <main>
        <section className="py-12 md:py-16 bg-card">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4" />
                Treatment Planning
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground leading-tight">
                Treatment Planning Is Not Guesswork. It Is Choosing the Right Level of Care for the Actual Problem.
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Families ask this constantly: "How do we know which treatment is right?" The answer is not to pick the nicest website or the program someone recommends in a panic. Matt helps families look at the real clinical picture, narrow the right options, and prepare for admission so treatment is ready when the person says yes.
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
            <div className="max-w-4xl mx-auto space-y-16">
              <section id="overview" className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Stethoscope className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">What This Is</h2>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Treatment planning is part of Matt's intervention process. It means figuring out what kind of treatment actually fits the person, then getting the family ready to act on that plan. It is not generic placement help. It is structured decision-making before the window closes.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Addiction is a medical illness with a spiritual dimension. It requires clinical treatment and meaningful change in purpose, connection, and how the person lives. That means the plan has to address both medical reality and the life pattern the person keeps returning to.
                </p>
              </section>

              <section id="process" className="space-y-8">
                <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">How It Works</h2>
                <div className="grid gap-6">
                  {processSteps.map((step) => (
                    <div key={step.title} className="bg-card rounded-2xl border border-border/50 p-6 md:p-8">
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">{step.icon}</div>
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
                    "Direct guidance on detox, residential, outpatient, IOP, sober living, or dual-diagnosis needs",
                    "Clear discussion of what matters most: clinical fit, geography, insurance, structure, and admission timing",
                    "Honest input on whether staying local helps or hurts",
                    "Preparation for the common family mistake of choosing what feels easiest instead of what is most appropriate",
                    "A practical plan for how treatment entry actually happens once the person agrees",
                    "A family that understands what its role is before, during, and after admission",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 p-5 rounded-xl border border-border/50 bg-card">
                      <ShieldCheck className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <p className="text-muted-foreground leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-primary/5 rounded-2xl p-6 md:p-8 border border-primary/10">
                  <p className="text-foreground font-medium leading-relaxed">
                    Matt's role is to evaluate, vet, guide, and prepare. The family's role is to provide history, make decisions, hold boundaries, and be ready to move when the moment comes.
                  </p>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">What Criteria Matter Most</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { title: "Clinical fit", body: "Withdrawal risk, mental health complexity, trauma, relapse history, and the level of structure required." },
                    { title: "Geography", body: "Whether home is stabilizing or part of the problem, and whether distance increases or reduces treatment success." },
                    { title: "Insurance and cost", body: "What is covered, what is realistic, and where paying more does or does not change the quality of care." },
                    { title: "Level of care", body: "Detox, residential, PHP, IOP, outpatient, sober living, and how those pieces should connect." },
                  ].map((item) => (
                    <div key={item.title} className="rounded-2xl border border-border/50 bg-background p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="faq" className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">Frequently Asked Questions</h2>
                {faqs.map((faq) => (
                  <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
                ))}
              </section>

              <section id="cta" className="bg-card rounded-2xl p-8 md:p-12 text-center border border-border/50">
                <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-4">Get the Treatment Decision Right Before the Window Closes</h2>
                <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                  If your family is trying to figure out detox, residential care, insurance, location, or what level of treatment makes sense, call Matt. He will help you sort through the noise and build a plan you can actually use.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/#contact">
                    <Button size="lg" className="gap-2">
                      Schedule a Consultation
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <a href="tel:+15416688084">
                    <Button size="lg" variant="outline" className="gap-2">
                      <Phone className="w-4 h-4" />
                      Call (541) 668-8084
                    </Button>
                  </a>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TreatmentPlanning;
