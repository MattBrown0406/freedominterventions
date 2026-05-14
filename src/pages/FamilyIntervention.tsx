import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Calendar,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Users,
  Heart,
  ClipboardList,
  PhoneCall,
  ChevronDown,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { usStates, usRegions } from "@/data/locations";
import oregonCrisisBanner from "@/assets/oregon-crisis-banner.jpg";
import SEOHead from "@/components/SEOHead";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import InterventionAnswerLinks from "@/components/InterventionAnswerLinks";
import MoneyPathCTA from "@/components/MoneyPathCTA";
import {
  OrganizationSchema,
  BreadcrumbSchema,
  ServiceSchema,
  FAQSchema,
  WebPageSchema,
} from "@/components/StructuredData";

const faqs = [
  {
    question: "What is a family intervention?",
    answer:
      "A family intervention is a carefully planned, structured conversation where loved ones come together — guided by a professional interventionist — to confront a person's substance use, describe the real impact it's had on everyone, and present a clear path to treatment. It is not an ambush. Done right, it is an act of love with a plan attached.",
  },
  {
    question: "How much does a family intervention cost?",
    answer:
      "A professionally led family intervention typically costs between $7,500 and $9,500, plus travel expenses depending on your location. However, Matt believes every family deserves to be educated before making that investment. Before recommending a full intervention, Matt offers one-on-one coaching sessions at $150 per hour to walk your family through the intervention process — including how to set boundaries, structure the conversation, and present a treatment plan. Many families find they are equipped to lead the intervention themselves after coaching. If your family determines that a professionally facilitated intervention is the right next step, that decision is always yours to make — fully informed and without pressure.",
  },
  {
    question: "Should I attempt an intervention without a professional?",
    answer:
      "Sometimes, yes — absolutely. Whether a family-led intervention is appropriate depends on several factors, including family dynamics, the quality of relationships involved, any previous attempts to intervene, the severity of substance use, and financial considerations. The best first step is to book a coaching session with Matt, where he will guide you through the complete intervention process — from preparation and boundary-setting to scripting the conversation and arranging treatment options. After the session, you can evaluate your family's readiness with honest eyes and decide whether you feel confident facilitating the intervention yourselves or whether professional guidance would improve the outcome.",
  },
  {
    question: "What happens if they refuse treatment?",
    answer:
      "Refusal is not the end. Matt prepares families for this possibility. The boundaries you set during the intervention don't disappear if they say no — they remain in place. That ongoing pressure, combined with the removal of enabling, often moves someone to accept help days or weeks later. The intervention plants a seed. The boundaries water it.",
  },
  {
    question: "What's the difference between an intervention and an ultimatum?",
    answer:
      "An ultimatum is a threat. An intervention is a structured offer. The difference is preparation, tone, and follow-through. A well-executed intervention presents consequences as logical outcomes of choices — not punishments — and pairs them with a concrete treatment offer ready to act on immediately. The goal is to open a door, not slam one.",
  },
  {
    question: "How long does the intervention process take?",
    answer:
      "The initial consultation is typically 30–60 minutes. Family preparation usually takes one or two sessions over a few days. The intervention itself often lasts 1–3 hours. Matt stays involved through the treatment entry process and beyond to ensure follow-through. This isn't a one-call fix — it's a supported process.",
  },
  {
    question: "Can an intervention work if the family is divided?",
    answer:
      "A divided family is the most common situation Matt works with. Part of the preparation process is aligning the family around a common goal and message — even when members disagree on approach, history, or blame. You don't need a perfect family. You need a clear plan and someone to facilitate it.",
  },
  {
    question: "What substances or behaviors can be addressed?",
    answer:
      "Matt works with all substance use disorders: alcohol, opioids, methamphetamine, cocaine, benzodiazepines, marijuana, and poly-drug use. He also addresses process addictions like gambling and prescription drug misuse. If someone you love is destroying their life and your family because of a substance or compulsive behavior, an intervention can help.",
  },
];

const signs = [
  {
    icon: <AlertTriangle className="h-5 w-5 text-destructive" aria-hidden="true" />,
    text: "Missed work, lost jobs, or declining performance that gets explained away repeatedly",
  },
  {
    icon: <AlertTriangle className="h-5 w-5 text-destructive" aria-hidden="true" />,
    text: "Hidden bottles, pills, or paraphernalia discovered in the home or car",
  },
  {
    icon: <AlertTriangle className="h-5 w-5 text-destructive" aria-hidden="true" />,
    text: "Chronic lying, broken promises, and manipulation around substance use",
  },
  {
    icon: <AlertTriangle className="h-5 w-5 text-destructive" aria-hidden="true" />,
    text: "Financial problems: borrowed money, unexplained withdrawals, unpaid bills",
  },
  {
    icon: <AlertTriangle className="h-5 w-5 text-destructive" aria-hidden="true" />,
    text: "Visible health decline: weight loss, skin changes, erratic sleep, neglected hygiene",
  },
  {
    icon: <AlertTriangle className="h-5 w-5 text-destructive" aria-hidden="true" />,
    text: "Withdrawal from family, friends, and activities they used to love",
  },
  {
    icon: <AlertTriangle className="h-5 w-5 text-destructive" aria-hidden="true" />,
    text: "Prior treatment attempts that ended in relapse or early departure",
  },
  {
    icon: <AlertTriangle className="h-5 w-5 text-destructive" aria-hidden="true" />,
    text: "Legal problems, DUIs, domestic incidents, or close calls that get minimized",
  },
];

const steps = [
  {
    number: "01",
    icon: <PhoneCall className="h-6 w-6 text-primary" aria-hidden="true" />,
    title: "Free Consultation",
    description:
      "You call or schedule online. Matt listens. No scripts, no sales pitch. He asks questions, gets honest about what he's hearing, and tells you exactly what's realistic. This call alone changes how most families see their situation.",
  },
  {
    number: "02",
    icon: <Users className="h-6 w-6 text-primary" aria-hidden="true" />,
    title: "Family Preparation",
    description:
      "Matt works with the family in advance — not to rehearse a script, but to align everyone around a clear message, establish firm boundaries, and prepare for every possible response. The family that walks into the intervention is not the same family that called for help.",
  },
  {
    number: "03",
    icon: <Heart className="h-6 w-6 text-primary" aria-hidden="true" />,
    title: "The Intervention",
    description:
      "A structured, facilitated conversation. Each family member speaks directly, honestly, and without blame. Matt guides the room, keeps it on track, neutralizes manipulation, and presents the treatment option. The goal is a yes — and a bed ready that day.",
  },
  {
    number: "04",
    icon: <ClipboardList className="h-6 w-6 text-primary" aria-hidden="true" />,
    title: "Aftercare & Follow-Through",
    description:
      "Matt doesn't disappear when the person says yes. He stays involved through treatment entry, communicates with the family, and supports the follow-through on boundaries. Recovery is a process — the intervention is the beginning, not the finish line.",
  },
];

const differentiators = [
  {
    type: "not",
    icon: <XCircle className="h-7 w-7 text-destructive" aria-hidden="true" />,
    title: "Not a Surprise Ambush",
    description:
      "The TV-style intervention where a dozen people are hiding in the living room is not what Matt does. That approach triggers defensiveness, destroys trust, and rarely works. Matt's method is structured and dignified — your loved one walks into a conversation, not a trap.",
  },
  {
    type: "not",
    icon: <XCircle className="h-7 w-7 text-destructive" aria-hidden="true" />,
    title: "Not About Judgment or Shame",
    description:
      "Addiction is a medical illness with a spiritual dimension — not a moral failure, not a choice, not something to be humiliated out of someone. If shame worked, they'd already be sober. Matt's process is built on honesty and love, not punishment.",
  },
  {
    type: "not",
    icon: <XCircle className="h-7 w-7 text-destructive" aria-hidden="true" />,
    title: "Not a Pitch for One Treatment Center",
    description:
      "Matt is not a referral agent. He doesn't get paid by treatment centers to steer your family anywhere. He helps you identify the right fit based on the person's needs, your family's situation, and what's actually available — then he helps execute the plan.",
  },
  {
    type: "is",
    icon: <CheckCircle className="h-7 w-7 text-primary" aria-hidden="true" />,
    title: "Family-Led, Professionally Guided",
    description:
      "You know your loved one. Matt knows the process. Together, the family delivers the message — Matt makes sure it lands. The intervention belongs to your family; he's there to make it work.",
  },
  {
    type: "is",
    icon: <CheckCircle className="h-7 w-7 text-primary" aria-hidden="true" />,
    title: "Dignity-Preserving",
    description:
      "The goal is treatment acceptance, not emotional destruction. Even when delivering hard truths and firm consequences, Matt maintains an environment of respect. People are more likely to say yes when they feel heard, not cornered.",
  },
  {
    type: "is",
    icon: <CheckCircle className="h-7 w-7 text-primary" aria-hidden="true" />,
    title: "Outcome-Focused",
    description:
      "This isn't therapy for the family. It's a strategic process with one primary outcome: getting your loved one into treatment. Every preparation session, every word choice, every boundary set — it all points toward that goal.",
  },
];

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-6 py-5 text-left bg-card hover:bg-accent/30 transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-semibold text-foreground pr-4">{question}</span>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div className="px-6 py-5 bg-background border-t border-border">
          <p className="text-muted-foreground leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

const breadcrumbItems = [
  { name: "Home", href: "/" },
  { name: "Family Intervention Services", href: "/family-intervention" },
];

const jumpLinks = [
  { label: "Overview", href: "#overview" },
  { label: "Engagement", href: "#full-engagement" },
  { label: "How It Works", href: "#process" },
  { label: "What to Expect", href: "#what-to-expect" },
  { label: "FAQ", href: "#faq" },
  { label: "Get Help", href: "#cta" },
];

const priorityLocationLinks = [
  {
    label: "Minneapolis professional interventionist",
    href: "/minneapolis-minnesota",
    detail: "Drug, alcohol, and fentanyl intervention help for Twin Cities families.",
  },
  {
    label: "Drug intervention in Boise",
    href: "/boise-idaho",
    detail: "Treasure Valley intervention planning, treatment entry, and family boundaries.",
  },
  {
    label: "Oregon interventionist",
    href: "/oregon",
    detail: "Statewide drug, alcohol, and fentanyl intervention support.",
  },
  {
    label: "Drug interventionist in Washington",
    href: "/washington",
    detail: "Washington family intervention help when the crisis keeps escalating.",
  },
  {
    label: "Professional interventionist in North Carolina",
    href: "/north-carolina",
    detail: "Intervention planning for families in Charlotte, Raleigh, and statewide.",
  },
  {
    label: "Fentanyl intervention help in Fort Worth",
    href: "/fort-worth-texas",
    detail: "Tarrant County treatment-entry planning when fentanyl risk is urgent.",
  },
];

const FamilyIntervention = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Family Intervention Services | Help a Loved One Accept Treatment"
        description="Family intervention services led by Matt Brown. Plan a drug or alcohol intervention, treatment entry, and family boundaries. Call (541) 838-6009."
        keywords="family intervention, family intervention services, hire an interventionist, drug intervention, alcohol intervention, how to stage an intervention, intervention specialist, certified interventionist, family intervention cost, what happens during an intervention"
        canonical="https://freedominterventions.com/family-intervention"
      />
      <OrganizationSchema />
      <ServiceSchema
        name="Family Intervention Services"
        description="Matt Brown helps families plan drug and alcohol interventions, treatment entry, and boundaries nationwide. 20+ years experience. Confidential consultation available."
        url="https://freedominterventions.com/family-intervention"
        serviceType="Family Intervention"
      />
      <WebPageSchema
        name="Family Intervention Services | Help a Loved One Accept Treatment"
        description="Family intervention services led by Matt Brown. Plan a drug or alcohol intervention, treatment entry, and family boundaries. Call (541) 838-6009."
        url="https://freedominterventions.com/family-intervention"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com/" },
          { name: "Family Intervention Services", url: "https://freedominterventions.com/family-intervention" },
        ]}
      />
      <FAQSchema faqs={faqs} />

      <Navbar />
      <BreadcrumbNav items={breadcrumbItems} />

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[420px] overflow-hidden mt-28 md:mt-32">
        <img
          src={oregonCrisisBanner}
          alt="Family seeking addiction intervention help — Freedom Interventions"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              <Users className="h-4 w-4" aria-hidden="true" />
              Certified Interventionist — 20+ Years Experience
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Family Intervention Services to Help a Loved One Accept Treatment
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
              If your family needs intervention help, Matt Brown helps you plan the conversation, line up treatment, and set boundaries before addiction gets another chance to negotiate. These family intervention services are built for drug, alcohol, fentanyl, and mixed-substance situations where waiting has become dangerous.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/book-intervention-consultation#booking">
                  <Calendar className="mr-2 h-5 w-5" aria-hidden="true" />
                  Book Confidential Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:541-838-6009">
                  <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
                  Call Matt Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-muted/20">
        <div className="container mx-auto px-4 py-4">
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

      <section className="py-16 md:py-24 bg-background" id="full-engagement">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-5">
                <ClipboardList className="h-4 w-4" aria-hidden="true" />
                Full intervention engagement
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-5">
                When the free consultation points to intervention, the work becomes practical fast.
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  A full engagement is for families where the loved one is refusing help, the family is divided, safety or relapse risk is rising, and someone needs to coordinate the moving parts.
                </p>
                <p>
                  Matt helps the family line up treatment, align decision makers, prepare boundaries, plan logistics, facilitate the intervention, and support follow-through after the conversation ends.
                </p>
                <p>
                  If the situation is not intervention-level, Matt will tell you that. If it is, the family should understand the process before the next crisis takes away options.
                </p>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link to="/after-consultation">
                    What Happens After the Consult
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/intervention-readiness">
                    Check Intervention Readiness
                  </Link>
                </Button>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-bold text-foreground mb-5">The paid intervention path is built around four outcomes</h3>
              <div className="grid gap-4">
                {[
                  ["A unified family", "The family knows what it is asking for, what it will stop doing, and who is responsible for each next step."],
                  ["A real treatment plan", "The recommendation is matched to clinical need, budget, geography, insurance reality, and urgency."],
                  ["A prepared intervention", "The conversation is structured before it happens, including resistance, refusal, transport, and safety planning."],
                  ["Follow-through after the yes or no", "The family does not collapse back into rescuing, arguing, or negotiating once the intervention is over."],
                ].map(([title, body]) => (
                  <div key={title} className="rounded-md border border-border bg-background p-4">
                    <h4 className="font-semibold text-foreground mb-1">{title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
                Professional interventions are typically discussed after the consultation because travel, urgency, treatment options, and family complexity affect the final plan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Is a Family Intervention */}
      <section className="py-16 md:py-24 bg-card" id="overview">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
              What Is a Family Intervention?
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                A family intervention is a planned, structured conversation — not a confrontation — in which the people who love someone struggling with addiction come together to deliver a clear, unified message: <em>we see what's happening, we refuse to keep enabling it, and we have a path forward ready right now.</em>
              </p>
              <p>
                Forget what you've seen on television. The surprise ambush with people hiding behind furniture, tearful meltdowns, and dramatic ultimatums — that model is not what professional intervention looks like. What actually works is preparation. Every participant knows what they're going to say. The treatment option is lined up in advance. The boundaries are real. And a trained interventionist is there to keep the conversation on track. If you want the plain-English version, read <Link to="/how-intervention-works" className="text-primary underline underline-offset-4">How Intervention Works</Link>.
              </p>
              <p>
                The purpose of an intervention is not to punish, humiliate, or manipulate someone into compliance. It's to close the gap between the life a person is living and the life they know, somewhere underneath the addiction, they want. Addiction is a chronic medical illness — but people do recover. Most people who enter treatment don't go because they suddenly wanted to. They go because the people in their lives finally stopped making addiction comfortable and started making recovery possible.
              </p>
              <p>
                Matt Brown's approach is grounded in 20+ years of field experience, clinical training, and a personal history in recovery. He has guided hundreds of families through this process. He doesn't sell false hope — he gives you an honest assessment and a real plan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Signs It's Time */}
      <section className="py-16 md:py-24 bg-background" id="signs-its-time">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-destructive" aria-hidden="true" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-1">
                Signs It's Time for an Intervention
              </h2>
            </div>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Most families wait too long. They tell themselves it's a phase, that their loved one will hit bottom on their own, that they don't want to make things worse. Meanwhile the problem grows. If you're seeing multiple signs below, you're not imagining things — and waiting is not a strategy.
            </p>
            <ul className="space-y-4">
              {signs.map((sign, idx) => (
                <li key={idx} className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border/50">
                  <span className="flex-shrink-0 mt-0.5">{sign.icon}</span>
                  <span className="text-muted-foreground leading-relaxed">{sign.text}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-muted-foreground leading-relaxed">
              You don't need to check every box. If you're reading this page, something is wrong — and that's enough reason to make one phone call. If you're still trying to decide whether your family is there yet, start with <Link to="/when-is-it-time-for-an-intervention" className="text-primary underline underline-offset-4">When Is It Time for an Intervention?</Link>
            </p>
          </div>
        </div>
      </section>

      {/* How the Process Works */}
      <section className="py-16 md:py-24 bg-card" id="process">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">
              How the Process Works
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto leading-relaxed">
              A professional intervention isn't a single event. It's a process with four distinct phases — each one designed to increase the chances your loved one says yes and follows through on treatment. Families who want more detail can also read <Link to="/how-intervention-works" className="text-primary underline underline-offset-4">How Intervention Works</Link> and <Link to="/what-if-they-refuse-treatment" className="text-primary underline underline-offset-4">What If They Refuse Treatment?</Link>.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="bg-background rounded-2xl border border-border p-7 flex flex-col gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold text-primary/20 font-mono leading-none">
                      {step.number}
                    </div>
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Matt's Approach Different */}
      <section className="py-16 md:py-24 bg-background" id="what-to-expect">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">
              What Makes Matt's Approach Different
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto leading-relaxed">
              Not all intervention services are built the same. Here's what Matt's process is — and what it isn't.
            </p>

            <div className="mb-8">
              <h3 className="text-sm font-semibold text-destructive uppercase tracking-wider mb-4 px-1">
                What This Is NOT
              </h3>
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                {differentiators
                  .filter((d) => d.type === "not")
                  .map((d, idx) => (
                    <div key={idx} className="bg-destructive/5 border border-destructive/20 rounded-2xl p-6">
                      <div className="mb-3">{d.icon}</div>
                      <h4 className="font-bold text-foreground mb-2">{d.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{d.description}</p>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 px-1">
                What This IS
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {differentiators
                  .filter((d) => d.type === "is")
                  .map((d, idx) => (
                    <div key={idx} className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
                      <div className="mb-3">{d.icon}</div>
                      <h4 className="font-bold text-foreground mb-2">{d.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{d.description}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <InterventionAnswerLinks
        source="family_intervention"
        slugs={[
          "when-to-call-interventionist",
          "does-family-need-to-agree",
          "what-if-they-refuse-treatment",
        ]}
      />

      <MoneyPathCTA
        source="family_intervention"
        title="Not sure whether this is coaching, readiness work, or a full intervention?"
        description="Use the decision path before your family spends money or makes another confrontation. It routes you to the lowest safe next step."
        className="bg-muted/20 border-y border-border"
      />

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-card" id="faq">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-center mb-10 leading-relaxed">
              Families come to Matt with a lot of questions — and he gives them straight answers. Here are the ones he hears most often. If cost is part of your decision, read the <Link to="/intervention-cost" className="text-primary underline underline-offset-4">Intervention Cost and Investment FAQ</Link>.
            </p>
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <FAQItem key={idx} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background" id="high-intent-locations">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <MapPin className="w-4 h-4" />
                Intervention Help by Location
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Families Looking for Intervention Help in These Areas Often Start Here
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Matt works nationwide. These location pages give families a clearer first step when they are searching for a professional interventionist, drug intervention, alcohol intervention, or fentanyl treatment-entry help.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {priorityLocationLinks.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="rounded-lg border border-border bg-card p-5 hover:border-primary/40 hover:bg-accent/30 transition-colors"
                >
                  <h3 className="font-semibold text-foreground mb-2">{item.label}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* State Internal Links — All 50 States by Region */}
      <section className="py-16 bg-background" id="service-areas">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <MapPin className="w-4 h-4" />
                Nationwide Coverage
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Addiction Intervention Services in All 50 States
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Matt travels nationwide to help families in crisis. Select your state below for location-specific intervention resources, local treatment options, and state addiction statistics.
              </p>
            </div>

            {Object.entries(usRegions).map(([region, stateNames]) => (
              <div key={region} className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-3 border-b border-border pb-2">
                  {region}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {usStates
                    .filter((s) => stateNames.includes(s.name))
                    .map((state) => (
                      <Link
                        key={state.slug}
                        to={`/${state.slug}`}
                        className="flex items-center justify-center gap-1.5 px-4 py-3 bg-card border border-border rounded-lg hover:bg-accent/40 hover:border-primary/40 transition-colors text-sm font-medium text-foreground"
                      >
                        <span className="text-muted-foreground text-xs">{state.abbreviation}</span>
                        {state.name}
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-primary/5" id="cta">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Your Family Has Waited Long Enough
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
              The free consultation costs you nothing. It takes 30 minutes. And it will give you more clarity on your situation than most families get in years of managing on their own. Call now or schedule online — Matt picks up the phone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/book-intervention-consultation#booking">
                  <Calendar className="mr-2 h-5 w-5" aria-hidden="true" />
                  Book Confidential Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:541-838-6009">
                  <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
                  Call Matt Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FamilyIntervention;
