import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import CallbackRequestDialog from "./CallbackRequestDialog";
import TrackedPhoneLink from "./TrackedPhoneLink";

const CTA = () => {
  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden bg-primary">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-background/5 organic-blob opacity-50" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-background/5 organic-blob-2 opacity-40" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-primary-foreground leading-tight">
            Call Now or Schedule
            <span className="block">a Free Consultation</span>
          </h2>
          
          <p className="text-primary-foreground/80 text-base md:text-lg max-w-xl mx-auto">
            The sooner families have a clear plan, the more options they have. Matt is ready to help you get clarity and a real plan. Confidential consultations are always free.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <TrackedPhoneLink phoneNumber="+15418386009" metadata={{ location: 'cta_section' }}>
              <Button 
                variant="secondary" 
                size="xl" 
                className="bg-background text-primary hover:bg-background/90"
              >
                <Phone className="w-5 h-5" />
                Call Now: (541) 838-6009
              </Button>
            </TrackedPhoneLink>
            <CallbackRequestDialog>
              <Button 
                variant="outline" 
                size="xl"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Schedule Free Consultation
              </Button>
            </CallbackRequestDialog>
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
