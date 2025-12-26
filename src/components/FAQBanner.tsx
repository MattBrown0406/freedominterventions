import { HelpCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FAQBanner = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-accent/10 via-primary/5 to-accent/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-card border border-border/50 rounded-2xl p-6 md:p-8 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <HelpCircle className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-serif font-semibold text-foreground">
                Intervention FAQ & Myth-Busting
              </h3>
              <p className="text-muted-foreground mt-1">
                Clear answers to the questions families are afraid to ask
              </p>
            </div>
          </div>
          <Button asChild size="lg" className="group whitespace-nowrap">
            <Link to="/intervention-faq">
              Read the FAQ
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQBanner;
