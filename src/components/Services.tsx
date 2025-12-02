import { Leaf, Heart, Sparkles, Recycle } from "lucide-react";

const services = [
  {
    icon: Leaf,
    title: "Pure Ingredients",
    description: "Every product is crafted from 100% natural, ethically sourced ingredients that nourish your body and soul.",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "Each item is handmade by our artisan team, ensuring quality and care in every detail.",
  },
  {
    icon: Sparkles,
    title: "Wellness Focused",
    description: "Our formulations are designed to enhance your well-being, bringing balance to your daily routine.",
  },
  {
    icon: Recycle,
    title: "Eco-Friendly",
    description: "Sustainable packaging and practices that minimize environmental impact and give back to nature.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Our Promise
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground">
            Why Choose Bloom & Flourish
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            We're committed to creating products that are good for you and good for the planet.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group p-6 md:p-8 bg-background rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 bg-secondary/60 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors duration-300">
                <service.icon className="w-7 h-7 text-accent group-hover:text-primary transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
