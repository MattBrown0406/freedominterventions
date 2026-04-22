import { Button } from "@/components/ui/button";
import { Quote, Mic, PlayCircle, Sparkles } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { testimonials } from "@/data/testimonials";
import { useEffect, useState } from "react";

const storyHighlights = testimonials.slice(0, 6).map((testimonial) => ({
  quote: testimonial.quote,
  family: `${testimonial.author}, ${testimonial.location}`,
  outcome: "Families emphasized aligned boundaries, honest communication, and relief after stepping into a plan.",
}));

const proofMetrics = [
  { label: "Families guided", value: "1,000+" },
  { label: "Enter treatment on intervention day", value: "90%" },
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
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % storyHighlights.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, []);

  const activeStory = storyHighlights[activeIndex];

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

            <article className="rounded-3xl border border-border bg-card/80 p-6 shadow-sm min-h-[250px] flex flex-col justify-between">
              <div>
                <Quote className="w-6 h-6 text-primary/50 mb-3" aria-hidden="true" />
                <p className="text-base text-foreground font-medium leading-relaxed">“{activeStory.quote}”</p>
              </div>
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">{activeStory.family}</p>
                  <p className="text-sm text-muted-foreground">{activeStory.outcome}</p>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2" aria-label="Testimonial navigation dots">
                    {storyHighlights.map((story, index) => (
                      <button
                        key={story.family}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={`h-2.5 rounded-full transition-all ${
                          index === activeIndex ? "w-8 bg-primary" : "w-2.5 bg-border hover:bg-primary/40"
                        }`}
                        aria-label={`Show testimonial ${index + 1}`}
                        aria-pressed={index === activeIndex}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveIndex((current) => (current - 1 + storyHighlights.length) % storyHighlights.length)}
                    >
                      Previous
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveIndex((current) => (current + 1) % storyHighlights.length)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </article>

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
