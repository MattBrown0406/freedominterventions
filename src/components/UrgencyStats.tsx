import { TrendingUp, Clock, Award } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    stat: "Prepared Families",
    label: "Better Outcomes",
    description: "Significantly higher success when families are prepared.",
  },
  {
    icon: Clock,
    stat: "Earlier = Better",
    label: "Timing Matters",
    description: "Recovery outcomes improve significantly with earlier intervention.",
  },
  {
    icon: Award,
    stat: "20+ Years",
    label: "Experience",
    description: "Over two decades helping families navigate a way forward.",
  },
];

const UrgencyStats = () => {
  return (
    <section className="py-16 md:py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
            Why Earlier Planning Helps
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Waiting rarely makes things easier. Here's what the evidence shows about professional intervention.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="text-center p-6 bg-background rounded-xl shadow-sm border border-border"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                  <IconComponent className="h-7 w-7 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  {item.stat}
                </div>
                <div className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">
                  {item.label}
                </div>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Closing Message */}
        <p className="text-center text-muted-foreground mt-10 max-w-xl mx-auto">
          Most families we work with say the same thing: <span className="text-foreground font-medium">"We wish we had done this sooner."</span>
        </p>
      </div>
    </section>
  );
};

export default UrgencyStats;
