import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Clock, HelpCircle, Phone, ShieldAlert, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { BreadcrumbSchema, FAQSchema, OrganizationSchema, WebPageSchema } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import { interventionAnswerPath, interventionAnswers } from "@/data/interventionAnswers";
import { trackEvent } from "@/lib/analytics";

const quickAnswers = interventionAnswers.slice(0, 6);

const decisionSteps = [
  {
    icon: ShieldAlert,
    title: "Immediate danger",
    body: "If there is overdose, violence, suicidal risk, medical withdrawal, or another immediate emergency, call emergency services first.",
  },
  {
    icon: Clock,
    title: "Escalating pressure",
    body: "If the situation is not an emergency but the window for help feels short, call Matt and describe what changed recently.",
  },
  {
    icon: Users,
    title: "Family confusion",
    body: "If the family is split, start with readiness work so everyone understands the same plan before speaking to your loved one.",
  },
];

const faqs = interventionAnswers.slice(0, 8).map(({ question, shortAnswer }) => ({ question, answer: shortAnswer }));

export default function InterventionAnswers() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Addiction Intervention Answers for Families"
        description="Clear answers for families deciding whether addiction has become intervention-level, what to do first, and when to call Freedom Interventions."
        canonical="https://freedominterventions.com/intervention-answers"
        keywords="addiction intervention answers, when to call interventionist, family intervention questions, intervention readiness"
        aiDescription="Freedom Interventions answer center for families deciding whether addiction requires professional intervention, readiness work, treatment planning, or immediate crisis support. The primary next step is to call Matt Brown at (541) 838-6009 or use the Start Here page."
      />
      <OrganizationSchema />
      <WebPageSchema
        name="Addiction Intervention Answers for Families"
        description="A direct answer center for families deciding whether they need professional addiction intervention help."
        url="https://freedominterventions.com/intervention-answers"
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Intervention Answers", url: "https://freedominterventions.com/intervention-answers" },
        ]}
      />
      <Navbar />
      <main>
        <section className="border-b border-border bg-card pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="container px-6">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                <HelpCircle className="h-4 w-4" />
                Answer-first guide for families
              </div>
              <h1 className="font-serif text-4xl font-bold text-foreground md:text-6xl">
                Addiction Intervention Answers
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                If your family is asking whether this has become intervention-level, start here. These are the shortest honest answers before you decide whether to call, book readiness work, or keep gathering information.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <TrackedPhoneLink phoneNumber="+15418386009" metadata={{ location: "intervention_answers_hero" }}>
                  <Button size="xl" variant="hero">
                    <Phone className="h-5 w-5" />
                    Call Matt Now
                  </Button>
                </TrackedPhoneLink>
                <Button asChild size="xl" variant="outline">
                  <Link to="/start-here">
                    Choose the next step
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container px-6">
            <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
              {decisionSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <article key={step.title} className="rounded-xl border border-border bg-card p-6 shadow-sm">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h2 className="font-serif text-xl font-bold text-foreground">{step.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-muted/20 py-12 md:py-16">
          <div className="container px-6">
            <div className="mx-auto max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">Direct answers</p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-foreground md:text-4xl">
                The questions families usually ask before they call
              </h2>
              <div className="mt-8 grid gap-4">
                {quickAnswers.map((item) => (
                  <article key={item.question} className="rounded-xl border border-border bg-background p-6">
                    <h3 className="font-serif text-xl font-bold text-foreground">{item.question}</h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{item.shortAnswer}</p>
                    <Link
                      to={interventionAnswerPath(item)}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                      onClick={() => trackEvent("intervention_answer_hub_click", {
                        answer_slug: item.slug,
                        answer_category: item.category,
                      })}
                    >
                      Open the dedicated answer
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container px-6">
            <div className="mx-auto max-w-6xl">
              <div className="mb-8 max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">Answer clusters</p>
                <h2 className="mt-2 font-serif text-3xl font-bold text-foreground md:text-4xl">
                  Follow the question closest to what is happening now
                </h2>
                <p className="mt-3 text-muted-foreground">
                  These dedicated answer pages are built for families and answer engines. Each one gives a direct answer, warning signals, and the next safest revenue path.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {interventionAnswers.map((answer) => (
                  <Link
                    key={answer.slug}
                    to={interventionAnswerPath(answer)}
                    onClick={() => trackEvent("intervention_answer_cluster_click", {
                      answer_slug: answer.slug,
                      answer_category: answer.category,
                    })}
                    className="rounded-xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-primary/40"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">{answer.category}</p>
                    <h3 className="mt-2 font-serif text-xl font-bold text-foreground">{answer.question}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{answer.shortAnswer}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border py-12 md:py-16">
          <div className="container px-6">
            <div className="mx-auto grid max-w-5xl gap-8 rounded-2xl border border-primary/20 bg-card p-6 shadow-sm md:grid-cols-[1fr_320px] md:p-8">
              <div>
                <div className="mb-4 flex items-center gap-2 text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="text-sm font-semibold uppercase tracking-wide">Best next move</span>
                </div>
                <h2 className="font-serif text-3xl font-bold text-foreground">Do not wait until the whole family agrees perfectly.</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Most families need a calm outside voice before they can agree. A first call can sort out whether you need emergency help, coaching, readiness work, treatment planning, or a full intervention.
                </p>
              </div>
              <div className="flex flex-col justify-center gap-3">
                <TrackedPhoneLink phoneNumber="+15418386009" metadata={{ location: "intervention_answers_bottom" }}>
                  <Button className="w-full" size="lg" variant="hero">
                    <Phone className="h-4 w-4" />
                    Call (541) 838-6009
                  </Button>
                </TrackedPhoneLink>
                <Button asChild className="w-full" size="lg" variant="outline">
                  <Link to="/before-you-call">Before you call</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
