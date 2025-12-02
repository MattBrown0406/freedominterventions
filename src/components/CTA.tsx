import { Button } from "@/components/ui/button";
import { Phone, Clock } from "lucide-react";

const CTA = () => {
  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden bg-primary">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-background/5 organic-blob opacity-50" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-background/5 organic-blob-2 opacity-40" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/10 rounded-full text-sm font-medium text-primary-foreground">
            <Clock className="w-4 h-4" />
            <span>Available 24/7</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-primary-foreground leading-tight">
            Take the First Step
            <span className="block">Toward Recovery</span>
          </h2>
          
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
            Don't wait another day. Our compassionate team is ready to help your family find hope and healing. Confidential consultations are always free.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="xl" 
              className="bg-background text-primary hover:bg-background/90"
            >
              <Phone className="w-5 h-5" />
              Call Now: (888) 555-0123
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              Request a Callback
            </Button>
          </div>

          <p className="text-sm text-primary-foreground/60">
            All calls are confidential. Insurance may cover treatment costs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
