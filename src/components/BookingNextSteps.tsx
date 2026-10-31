import { CalendarCheck, ClipboardList, MessageCircle } from "lucide-react";

// What families can have nearby for the call. Everything is optional, and the
// list is worded that way so nobody delays booking to "get ready".
export const PREP_ITEMS = [
  "Who is involved: your loved one's name and age, and the family members who should be part of the plan.",
  "What you're seeing: substances or behaviors, how long it has been going on, and anything that has changed recently.",
  "What has been tried: past treatment, detox, or rehab (where, when, and how it ended).",
  "Their insurance card, if they have one, so treatment options can be checked.",
  "Your biggest question or fear right now, even if it's just \"What do we do tonight?\"",
];

export const PrepChecklist = ({ className }: { className?: string }) => (
  <ul className={`space-y-2 text-sm text-muted-foreground list-disc pl-5 ${className ?? ""}`}>
    {PREP_ITEMS.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

const steps = [
  {
    icon: CalendarCheck,
    title: "You get a confirmation right away",
    body: "A confirmation email arrives with your date, time, and Zoom link. If video isn't easy for you, a phone call works too.",
  },
  {
    icon: ClipboardList,
    title: "Gather what you can (optional)",
    body: "You don't need to have everything figured out. If it's handy, the list below helps Matt understand the situation faster.",
  },
  {
    icon: MessageCircle,
    title: "You talk with Matt directly",
    body: "He'll ask direct questions, give you an honest read on what is happening, and you'll leave with a clear next step.",
  },
];

/** "What happens after you book" section for scheduling pages. */
const BookingNextSteps = () => (
  <section aria-labelledby="after-booking-heading" className="py-12 md:py-16 bg-muted/30 border-y border-border/50">
    <div className="container px-6">
      <div className="mx-auto max-w-5xl">
        <h2 id="after-booking-heading" className="text-center font-serif text-3xl font-bold text-foreground md:text-4xl">
          What happens after you book
        </h2>
        <ol className="mt-8 grid gap-5 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, body }, index) => (
            <li key={title} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {index + 1}
                </span>
                <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="mt-3 font-semibold text-foreground">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-6 rounded-2xl border border-primary/20 bg-background p-5 md:p-6">
          <h3 className="font-semibold text-foreground">Helpful to have nearby (all optional)</h3>
          <PrepChecklist className="mt-3" />
          <p className="mt-4 text-sm text-muted-foreground">
            If things get worse before your call, don't wait for the appointment: call Matt at{" "}
            <a href="tel:+14582988000" className="font-medium text-primary hover:underline">(458) 298-8000</a>. If anyone is
            in immediate danger, call 911, or call or text 988.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default BookingNextSteps;
