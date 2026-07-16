import { Link } from "react-router-dom";
import { ArrowRight, Calendar, ClipboardCheck, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import { trackEvent } from "@/lib/analytics";

type MoneyPathCTAProps = {
  source: string;
  title?: string;
  description?: string;
  className?: string;
};

export default function MoneyPathCTA({
  source,
  title = "Need the right level of help before the next crisis?",
  description = "Choose the decision path if you are unsure, book the consultation if you need Matt to triage the case, or call directly if timing or safety is active.",
  className = "",
}: MoneyPathCTAProps) {
  const trackClick = (clickType: string, targetHref: string) => {
    trackEvent("cta_money_path_click", {
      source,
      click_type: clickType,
      target_href: targetHref,
      page_path: typeof window !== "undefined" ? window.location.pathname : "",
    });
  };

  return (
    <section className={`py-12 md:py-16 ${className}`}>
      <div className="container px-6">
        <div className="mx-auto max-w-5xl rounded-2xl border border-primary/20 bg-primary/5 p-6 shadow-sm md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background px-4 py-2 text-sm font-semibold text-primary">
                <ClipboardCheck className="h-4 w-4" />
                Revenue path clarity
              </p>
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">{title}</h2>
              <p className="mt-3 text-muted-foreground md:text-lg">{description}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[520px]">
              <Button asChild size="lg" variant="hero" onClick={() => trackClick("decision_path", "/which-help-do-we-need")}>
                <Link to="/which-help-do-we-need">
                  Which help fits?
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" onClick={() => trackClick("consultation", "/book-intervention-consultation#booking")}>
                <Link to="/book-intervention-consultation#booking">
                  <Calendar className="h-4 w-4" />
                  Free consult
                </Link>
              </Button>
              <TrackedPhoneLink phoneNumber="+14582988000" metadata={{ location: `${source}_money_path_cta` }}>
                <Button size="lg" variant="outline" className="w-full" onClick={() => trackClick("phone", "tel:+14582988000")}>
                  <Phone className="h-4 w-4" />
                  Call now
                </Button>
              </TrackedPhoneLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
