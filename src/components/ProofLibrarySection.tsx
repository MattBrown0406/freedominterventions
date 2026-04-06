import { testimonials } from "@/data/testimonials";
import { CheckCircle2, Video, Sparkles, Star } from "lucide-react";

const videoUrl = "https://www.youtube.com/embed/NzUTnHvzFQs";

const valueDrivers = [
  "Families leave with a written boundary plan",
  "Treatment placement and travel handled start-to-finish",
  "30–60 day engagements with post-intervention accountability",
];

const ProofLibrarySection = () => {
  const featured = testimonials.slice(0, 3);

  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <div className="space-y-6">
            <div className="space-y-3 max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Proof Library</p>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground">
                The outcomes families talk about the most
              </h2>
              <p className="text-muted-foreground text-lg">
                Every quote on this page came from families who lived through the chaos, set new boundaries, and followed
                a structured plan together. Here is what they emphasize when they check back in.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {featured.map((item) => (
                <article key={item.author} className="rounded-2xl border border-border bg-card/80 p-5 shadow-sm">
                  <Star className="w-5 h-5 text-yellow-400" aria-hidden="true" />
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">“{item.quote}”</p>
                  <p className="mt-4 text-sm font-semibold text-foreground">{item.author}</p>
                  <p className="text-xs text-muted-foreground">{item.location}</p>
                </article>
              ))}
            </div>

            <div className="space-y-3">
              {valueDrivers.map((driver) => (
                <div key={driver} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                  <span className="text-base text-foreground">{driver}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl overflow-hidden border border-border shadow-2xl">
              <div className="relative w-full aspect-video bg-black">
                <iframe
                  src={videoUrl}
                  title="Freedom Interventions - Media Spotlight"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <div className="p-5 bg-card border-t border-border flex items-center gap-3">
                <Video className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Media spotlight</p>
                  <p className="text-xs text-muted-foreground">
                    The walkthrough families mention when they reach out.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-primary" />
              <div>
                <p className="text-sm font-semibold text-foreground">Average engagement</p>
                <p className="text-3xl font-serif text-primary leading-tight">45 days</p>
                <p className="text-sm text-muted-foreground">
                  Families stay with the process from prep through early recovery, not just the intervention day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProofLibrarySection;
