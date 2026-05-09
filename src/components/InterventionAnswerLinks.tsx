import { ArrowRight, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { interventionAnswers, interventionAnswerPath } from "@/data/interventionAnswers";
import { trackEvent } from "@/lib/analytics";

interface InterventionAnswerLinksProps {
  title?: string;
  description?: string;
  slugs: string[];
  source: string;
}

export default function InterventionAnswerLinks({
  title = "Questions families ask before calling",
  description = "Short, direct answers for the questions that usually come up right before a family decides whether to call.",
  slugs,
  source,
}: InterventionAnswerLinksProps) {
  const answers = slugs
    .map((slug) => interventionAnswers.find((answer) => answer.slug === slug))
    .filter(Boolean);

  if (!answers.length) return null;

  const trackClick = (answerSlug: string, targetHref: string) => {
    trackEvent("intervention_answer_service_link_click", {
      source,
      answer_slug: answerSlug,
      target_href: targetHref,
      page_path: typeof window !== "undefined" ? window.location.pathname : "",
    });
  };

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container px-6 max-w-5xl mx-auto">
        <div className="mb-8 max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            <HelpCircle className="h-4 w-4" />
            Family decision help
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{description}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {answers.map((answer) => {
            const href = interventionAnswerPath(answer);
            return (
              <Card key={answer.slug} className="border-primary/15 transition-colors hover:border-primary/40">
                <CardContent className="flex h-full flex-col p-6">
                  <p className="text-sm font-semibold text-primary">{answer.category}</p>
                  <h3 className="mt-2 text-lg font-semibold leading-snug text-foreground">{answer.question}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{answer.shortAnswer}</p>
                  <Button asChild variant="ghost" className="mt-5 justify-start px-0">
                    <Link to={href} onClick={() => trackClick(answer.slug, href)}>
                      Read the answer
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
