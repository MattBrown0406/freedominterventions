import { Quote, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

type TestimonialStripProps = {
  count?: number;
  maxQuoteLength?: number;
  className?: string;
  heading?: string;
};

/**
 * Compact social-proof strip for high-intent pages (pricing, booking,
 * readiness intensive). Pulls from the static testimonial data so it
 * renders instantly with no network dependency.
 */
export default function TestimonialStrip({
  count = 2,
  maxQuoteLength = 320,
  className = "",
  heading = "What families say",
}: TestimonialStripProps) {
  const picks = testimonials
    .filter((t) => t.quote.length <= maxQuoteLength && t.rating === 5)
    .slice(0, count);

  if (picks.length === 0) return null;

  return (
    <section className={`py-12 ${className}`}>
      <div className="container px-6">
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 text-center text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {heading}
          </p>
          <div className={`grid gap-4 ${picks.length > 1 ? "md:grid-cols-2" : ""}`}>
            {picks.map((t) => (
              <figure
                key={t.author}
                className="flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <Quote className="mb-3 h-5 w-5 text-primary/60" aria-hidden="true" />
                <blockquote className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-foreground">
                    {t.author}
                    <span className="ml-2 font-normal text-muted-foreground">{t.location}</span>
                  </span>
                  <span className="flex" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
