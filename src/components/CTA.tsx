import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const CTA = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Welcome to our community!",
        description: "You'll receive our latest updates and exclusive offers.",
      });
      setEmail("");
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-primary/5" />
      <div className="absolute top-10 left-10 w-64 h-64 bg-secondary/30 organic-blob opacity-50" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-primary/10 organic-blob-2 opacity-40" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Join Our Community
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground leading-tight">
            Start Your Natural 
            <span className="text-primary"> Living Journey</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Subscribe to receive exclusive offers, wellness tips, and be the first to know about new product launches.
          </p>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full h-14 pl-12 pr-4 rounded-full border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                required
              />
            </div>
            <Button variant="hero" size="xl" type="submit">
              Subscribe
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>

          <p className="text-sm text-muted-foreground">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
