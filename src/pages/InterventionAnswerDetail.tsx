import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, CheckCircle2, ClipboardCheck, HelpCircle, Phone, ShieldAlert } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BreadcrumbSchema, OrganizationSchema, QAPageSchema, WebPageSchema } from "@/components/StructuredData";
import {
  getInterventionAnswer,
  getRelatedInterventionAnswers,
  interventionAnswerPath,
} from "@/data/interventionAnswers";
import { trackEvent } from "@/lib/analytics";

const defaultSignals = [
  "The same conversation has happened more than once without meaningful change.",
  "The family is making decisions from fear, exhaustion, or crisis pressure.",
  "Treatment, safety, or family alignment needs to be planned before the next confrontation.",
];

export default function InterventionAnswerDetail() {
  const { answerSlug } = useParams<{ answerSlug: string }>();
  const answer = getInterventionAnswer(answerSlug);

  useEffect(() => {
    if (!answer) return;
    trackEvent("intervention_answer_view", {
      answer_slug: answer.slug,
      answer_category: answer.category,
      page_path: interventionAnswerPath(answer),
    });
  }, [answer]);

  if (!answer) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container px-6 py-32 text-center">
          <h1 className="font-serif text-4xl font-bold text-foreground">Answer not found</h1>
          <Button asChild className="mt-6" variant="outline">
            <Link to="/intervention-answers">
              <ArrowLeft className="h-4 w-4" />
              Back to intervention answers
            </Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const canonicalPath = interventionAnswerPath(answer);
  const canonicalUrl = `https://freedominterventions.com${canonicalPath}`;
  const relatedAnswers = getRelatedInterventionAnswers(answer);
  const signals = answer.signs ?? defaultSignals;
  const consultHref = `/book-intervention-consultation?utm_source=freedom_interventions&utm_medium=answer_page&utm_campaign=answer_revenue_path&utm_content=${answer.slug}#booking`;

  const trackAnswerClick = (clickType: string, targetHref: string) => {
    trackEvent("intervention_answer_click", {
      answer_slug: answer.slug,
      answer_category: answer.category,
      click_type: clickType,
      target_href: targetHref,
      page_path: canonicalPath,
    });
  };

  const pathFitLinks = [
    {
      label: "Book an intervention consultation",
      description: "Use this when the family needs a direct revenue-path conversation with Matt.",
      href: consultHref,
      action: "book_consult",
    },
    {
      label: "Call Matt now",
      description: "Use this if safety, overdose risk, treatment refusal, or family conflict cannot wait.",
      href: "tel:+14582988000",
      action: "phone",
    },
    {
      label: "Which help fits?",
      description: "Use this if you need to choose between a call, consult, coaching, readiness, or full intervention.",
      href: "/which-help-do-we-need",
      action: "decision_path",
    },
    {
      label: "Start Here",
      description: "Use this if you need help choosing between coaching, readiness work, crisis support, or intervention.",
      href: "/start-here",
      action: "start_here",
    },
    {
      label: "Check Intervention Readiness",
      description: "Use this if the family is close to action but unsure whether intervention-level help fits.",
      href: "/intervention-readiness",
      action: "readiness",
    },
    {
      label: "What to Know Before Calling",
      description: "Use this if you need to organize facts and avoid making a rushed move tonight.",
      href: "/before-you-call",
      action: "before_call",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={answer.question}
        description={answer.shortAnswer}
        canonical={canonicalUrl}
        keywords={answer.keywords.join(", ")}
        aiDescription={`${answer.question} ${answer.shortAnswer} Freedom Interventions helps families decide whether intervention, readiness work, treatment planning, crisis support, or a confidential first call is the right next step.`}
      />
      <OrganizationSchema />
      <WebPageSchema name={answer.question} description={answer.shortAnswer} url={canonicalUrl} />
      <QAPageSchema question={answer.question} answer={answer.shortAnswer} url={canonicalUrl} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://freedominterventions.com" },
          { name: "Intervention Answers", url: "https://freedominterventions.com/intervention-answers" },
          { name: answer.question, url: canonicalUrl },
        ]}
      />
      <Navbar />

      <main>
        <section className="border-b border-border bg-card pt-32 pb-14 md:pt-40 md:pb-20">
          <div className="container px-6">
            <div className="mx-auto max-w-5xl">
              <Link to="/intervention-answers" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                <ArrowLeft className="h-4 w-4" />
                Back to intervention answers
              </Link>
              <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                    <HelpCircle className="h-4 w-4" />
                    {answer.category}
                  </div>
                  <h1 className="font-serif text-4xl font-bold leading-tight text-foreground md:text-6xl">
                    {answer.question}
                  </h1>
                  <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6">
                    <p className="text-sm font-semibold uppercase tracking-wide text-primary">Direct answer</p>
                    <p className="mt-3 text-xl leading-relaxed text-foreground">{answer.shortAnswer}</p>
                  </div>
                </div>

                <Card className="border-primary/20">
                  <CardContent className="p-6">
                    <p className="text-sm font-semibold uppercase tracking-wide text-primary">Best next step</p>
                    <h2 className="mt-2 font-serif text-2xl font-bold text-foreground">{answer.nextStepLabel}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      Get clear before the next family conversation turns into another argument, promise, or crisis loop.
                    </p>
                    <Button asChild className="mt-5 w-full" variant="hero">
                      <Link to={answer.nextStepHref} onClick={() => trackAnswerClick("primary_next_step", answer.nextStepHref)}>
                        Start here
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild className="mt-3 w-full" variant="outline">
                      <Link to={consultHref} onClick={() => trackAnswerClick("book_consultation", consultHref)}>
                        Book consultation
                        <Calendar className="h-4 w-4" />
                      </Link>
                    </Button>
                    <TrackedPhoneLink phoneNumber="+14582988000" metadata={{ location: "intervention_answer_detail", answer: answer.slug }}>
                      <Button className="mt-3 w-full" variant="outline" onClick={() => trackAnswerClick("phone", "tel:+14582988000")}>
                        <Phone className="h-4 w-4" />
                        Call Matt now
                      </Button>
                    </TrackedPhoneLink>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container px-6">
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_360px]">
              <div className="space-y-8">
                <article className="rounded-2xl border border-border bg-card p-6 md:p-8">
                  <p className="text-sm font-semibold uppercase tracking-wide text-primary">What this means</p>
                  <div className="mt-4 space-y-5 text-lg leading-relaxed text-muted-foreground">
                    {answer.deeperAnswer.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>

                <article className="rounded-2xl border border-border bg-card p-6 md:p-8">
                  <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
                    <ShieldAlert className="h-4 w-4" />
                    Signals to notice
                  </p>
                  <div className="mt-5 grid gap-3">
                    {signals.map((signal) => (
                      <div key={signal} className="flex gap-3 rounded-xl bg-secondary/40 p-4">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                        <p className="text-muted-foreground">{signal}</p>
                      </div>
                    ))}
                  </div>
                </article>
              </div>

              <aside className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="font-serif text-2xl font-bold text-foreground">Related answers</h2>
                    <div className="mt-4 space-y-3">
                      {relatedAnswers.map((related) => (
                        <Link
                          key={related.slug}
                          to={interventionAnswerPath(related)}
                          onClick={() => trackAnswerClick("related_answer", interventionAnswerPath(related))}
                          className="block rounded-xl border border-border bg-background p-4 hover:border-primary/40"
                        >
                          <p className="text-sm font-semibold text-primary">{related.category}</p>
                          <p className="mt-1 font-medium text-foreground">{related.question}</p>
                          <p className="mt-2 text-sm text-muted-foreground">{related.shortAnswer}</p>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-6">
                    <h2 className="font-serif text-2xl font-bold text-foreground">Not sure yet?</h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      Use the Start Here page if your family needs to choose between a call, readiness work, crisis support, treatment planning, or a full intervention.
                    </p>
                    <Button asChild className="mt-5 w-full" variant="outline">
                      <Link to="/start-here" onClick={() => trackAnswerClick("start_here", "/start-here")}>
                        Choose the next step
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-amber-300/50 bg-amber-50/70 dark:border-amber-800/50 dark:bg-amber-950/20">
                  <CardContent className="p-6">
                    <h2 className="font-serif text-2xl font-bold text-foreground">When this becomes intervention work</h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      If the family already has refusal, safety concern, repeated relapse, or deep disagreement, the next useful move is not more reading. It is a confidential first call that sorts whether readiness work or a full intervention plan is appropriate.
                    </p>
                    <TrackedPhoneLink phoneNumber="+14582988000" metadata={{ location: "intervention_answer_high_intent", answer: answer.slug }}>
                      <Button className="mt-5 w-full" variant="hero" onClick={() => trackAnswerClick("high_intent_phone", "tel:+14582988000")}>
                        <Phone className="h-4 w-4" />
                        Call about this situation
                      </Button>
                    </TrackedPhoneLink>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h2 className="flex items-center gap-2 font-serif text-2xl font-bold text-foreground">
                      <ClipboardCheck className="h-5 w-5 text-primary" />
                      Which path fits?
                    </h2>
                    <div className="mt-4 space-y-3">
                      {pathFitLinks.map((item) => (
                        <Button
                          key={item.action}
                          asChild
                          variant={item.action === "phone" ? "hero" : "outline"}
                          className="h-auto w-full justify-start whitespace-normal p-4 text-left"
                        >
                          {item.href.startsWith("tel:") ? (
                            <a href={item.href} onClick={() => trackAnswerClick(item.action, item.href)}>
                              <span>
                                <span className="block font-semibold">{item.label}</span>
                                <span className="mt-1 block text-xs font-normal opacity-80">{item.description}</span>
                              </span>
                            </a>
                          ) : (
                            <Link to={item.href} onClick={() => trackAnswerClick(item.action, item.href)}>
                              <span>
                                <span className="block font-semibold">{item.label}</span>
                                <span className="mt-1 block text-xs font-normal opacity-80">{item.description}</span>
                              </span>
                              <ArrowRight className="ml-auto h-4 w-4 shrink-0" />
                            </Link>
                          )}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
