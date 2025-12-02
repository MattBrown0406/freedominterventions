import { Users, Heart, BookOpen, HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Users,
    title: "Family Intervention",
    description: "We guide families through the intervention process with compassion, helping loved ones take the first step toward recovery while defining and implementing important boundaries.",
    link: "/family-intervention",
  },
  {
    icon: Heart,
    title: "Crisis Support",
    description: "You're never alone. Our team is ready to support you when you need us most.",
    link: "/crisis-support",
  },
  {
    icon: BookOpen,
    title: "Treatment Planning",
    description: "We help identify the right treatment program and coordinate admissions to ensure a smooth transition to care.",
    link: "/treatment-planning",
  },
  {
    icon: HeartHandshake,
    title: "Aftercare Guidance",
    description: "Recovery doesn't end at treatment. We work with the treatment provider to identify and implement post-treatment resources and services for lasting sobriety.",
  },
];

interface Service {
  icon: typeof Users;
  title: string;
  description: string;
  link?: string;
}

const Services = () => {
  return (
    <section id="services" className="py-20 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-medium text-sm uppercase tracking-wider">
            How We Help
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground">
            Our Services
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Comprehensive intervention services designed to help your loved one find their path to recovery.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service: Service, index) => {
            const CardContent = (
              <>
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
                {service.link && (
                  <span className="mt-4 inline-block text-primary text-sm font-medium group-hover:underline">
                    Learn more →
                  </span>
                )}
              </>
            );

            return service.link ? (
              <Link
                to={service.link}
                key={service.title}
                className="group p-6 md:p-8 bg-background rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {CardContent}
              </Link>
            ) : (
              <div
                key={service.title}
                className="group p-6 md:p-8 bg-background rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {CardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
