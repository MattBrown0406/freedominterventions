import { ExternalLink, HeartHandshake, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

type Resource = {
  name: string;
  description: string;
  href: string;
  linkLabel: string;
  external: boolean;
};

// Free help for the family members themselves. For visitors who aren't ready
// to call anyone yet, this builds trust and gives them somewhere to start.
const resources: Resource[] = [
  {
    name: "The Family Squares (free, weekly)",
    description: "Matt's free Zoom support meeting for families, Mondays at 7:00 PM Pacific. No need to speak; many families just listen with cameras off.",
    href: "https://soberhelpline.com/monday-zoom-registration",
    linkLabel: "Register for Monday's meeting",
    external: true,
  },
  {
    name: "Al-Anon Family Groups",
    description: "Free peer support meetings, in person and online, for families and friends of someone who drinks.",
    href: "https://al-anon.org",
    linkLabel: "al-anon.org",
    external: true,
  },
  {
    name: "Nar-Anon Family Groups",
    description: "Free peer support meetings for families and friends of someone struggling with drugs.",
    href: "https://www.nar-anon.org",
    linkLabel: "nar-anon.org",
    external: true,
  },
  {
    name: "SMART Recovery Family & Friends",
    description: "Science-based meetings that teach families practical tools for staying connected without enabling.",
    href: "https://smartrecovery.org",
    linkLabel: "smartrecovery.org",
    external: true,
  },
  {
    name: "SAMHSA National Helpline",
    description: "Free, confidential treatment referral and information, 24/7, in English and Spanish.",
    href: "tel:+18006624357",
    linkLabel: "1-800-662-4357",
    external: false,
  },
  {
    name: "Sober Helpline",
    description: "Free family support from a separate service, if you want to talk something through first.",
    href: "https://soberhelpline.com",
    linkLabel: "soberhelpline.com",
    external: true,
  },
];

const FamilySupportResources = ({ className }: { className?: string }) => (
  <section aria-labelledby="family-support-heading" className={cn("py-14 md:py-20", className)}>
    <div className="container px-6">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-3xl">
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
            <HeartHandshake className="h-4 w-4" aria-hidden="true" />
            Support for you while you decide
          </p>
          <h2 id="family-support-heading" className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">
            Not ready to call anyone yet? Start by taking care of yourself.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Living with a loved one's addiction is exhausting, and you deserve support whether or not they are ready for help.
            These free resources are for <em>you</em>, the parent, spouse, sibling, or friend. When you are ready to make a
            plan, Matt is here.
          </p>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <li key={resource.name} className="flex flex-col rounded-2xl border border-border bg-card p-5">
              <h3 className="font-semibold text-foreground">{resource.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{resource.description}</p>
              <a
                href={resource.href}
                {...(resource.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                {resource.external ? (
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Phone className="h-4 w-4" aria-hidden="true" />
                )}
                {resource.linkLabel}
                {resource.external && <span className="sr-only"> (opens in a new tab)</span>}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted-foreground">
          If anyone is in immediate danger, call 911. For a suicidal crisis, call or text{" "}
          <a href="tel:988" className="font-medium text-primary hover:underline">988</a>.
        </p>
      </div>
    </div>
  </section>
);

export default FamilySupportResources;
