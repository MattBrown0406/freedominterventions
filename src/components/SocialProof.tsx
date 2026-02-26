import { Button } from "@/components/ui/button";
import { Quote, Mic, PlayCircle, Sparkles } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const storyHighlights = [
  {
    quote:
      "Matt educated us, aligned our family, and guided an intervention that got our daughter into long-term care the same day.",
    family: "Cheryl, Oregon",
    outcome: "She has stayed engaged in treatment and we have a united boundary plan for when she comes home.",
  },
  {
    quote:
      "We were walking on eggshells for years. The process Matt led gave us a calm script, consequences, and the courage to follow through.",
    family: "John & Emily, Utah",
    outcome: "Their loved one accepted help and the home is finally stable and honest again.",
  },
  {
    quote:
      "Our son kept manipulating every family member. Matt neutralized the chaos and made sure we moved as one voice.",
    family: "Angie, Washington",
    outcome: "He is now in sober living while the family works a parallel recovery plan.",
  },
];

const proofMetrics = [
  { label: "Families guided", value: "1,000+" },
  { label: "Years sober", value: "22" },
  { label: "Average engagement", value: "45 days" },
];

const resourceLinks = [
  {
    icon: <PlayCircle className="w-4 h-4 text-primary" />,
    title: "Party Wreckers Podcast",
    description: "65+ episodes that families binge before they call.",
    href: "/party-wreckers-podcast",
    cta: "Listen",
  },
  {
    icon: <Mic className="w-4 h-4 text-primary" />,
    title: "Intervention Toolkit",
    description: "Step-by-step planning guide you can download today.",
    href: "/intervention-toolkit",
    cta: "Open Toolkit",
  },
  {
    icon: <Sparkles className="w-4 h-4 text-primary" />,
    title: "Testimonials Library",
    description: "Families, clinicians, and treatment partners share their wins.",
    href: "/testimonials",
    cta: "See Proof",
  },
];

const SocialProof = () => {
  return (
    <section className="py-16 bg-muted/40">
      <div className="container mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <div className="space-y-8">
            <div className="space-y-3 max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Receipts that families ask for
              </p>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground">
                Proof that the plan works beyond day one
              </h2>
              <p className="text-muted-foreground text-lg">
                Freedom Interventions engagements typically run 30–60 days. We stay with your family through prep,
                intervention day, travel, placement, and early recovery so the system—not just the loved one—changes.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {proofMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-border bg-background/70 p-5 shadow-sm"
                >
                  <p className="text-3xl font-semibold text-primary">{metric.value}</p>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {storyHighlights.map((story) => (
                <article
                  key={story.family}
                  className="rounded-3xl border border-border bg-card/80 p-6 shadow-sm"
                >
                  <Quote className="w-6 h-6 text-primary/50 mb-3" aria-hidden="true" />
                  <p className="text-base text-foreground font-medium leading-relaxed">“{story.quote}”</p>
                  <p className="text-sm font-semibold text-foreground mt-4">{story.family}</p>
                  <p className="text-sm text-muted-foreground">{story.outcome}</p>
                </article>
              ))}
            </div>

            <Button
              size="lg"
              className="gap-2"
              variant="outline"
              asChild
              onClick={() => trackEvent("cta_view_testimonials", { location: "social_proof" })}
            >
              <a href="/testimonials">Read more family wins</a>
            </Button>
          </div>

          <div className="space-y-6 w-full">
            <div className="rounded-3xl border border-primary/30 bg-primary/5 p-6">
              <p className="text-sm font-semibold text-primary uppercase tracking-[0.2em]">Resources on deck</p>
              <ul className="mt-4 space-y-4">
                {resourceLinks.map((resource) => (
                  <li key={resource.title} className="flex items-start gap-4">
                    <div className="mt-1">{resource.icon}</div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{resource.title}</p>
                      <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                      <a
                        href={resource.href}
                        className="text-sm font-semibold text-primary hover:underline"
                        onClick={() =>
                          trackEvent("resource_click", { location: "social_proof", label: resource.title })
                        }
                      >
                        {resource.cta} →
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
