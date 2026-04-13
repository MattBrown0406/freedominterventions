import { useState, useEffect } from "react";
import { X, ArrowRight, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "leadMagnetDismissed";

const LeadMagnetPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    const handleMouseLeave = (e: MouseEvent) => {
      if (isMobile) return;
      if (e.clientY <= 0) {
        setIsVisible(true);
        document.removeEventListener("mouseout", handleMouseLeave);
      }
    };

    const timer = setTimeout(() => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setIsVisible(true);
      }
    }, isMobile ? 30000 : 30000);

    if (!isMobile) {
      document.addEventListener("mouseout", handleMouseLeave);
    }

    return () => {
      document.removeEventListener("mouseout", handleMouseLeave);
      clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-card rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-muted transition-colors z-10"
          aria-label="Close popup"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Header */}
        <div className="bg-primary px-6 py-8 text-center">
          <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <ClipboardList className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-primary-foreground mb-2">
            Not sure what your family needs?
          </h2>
          <p className="text-primary-foreground/80 text-sm">
            Answer 6 quick questions and get a personalized recommendation — free, no commitment.
          </p>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <ul className="space-y-3 mb-6 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <span>Identify enabling patterns that are keeping things stuck</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <span>Understand how serious the situation really is</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <span>Get a clear next step — intervention, support, or resources</span>
            </li>
          </ul>

          <a
            href="https://soberhelpline.com/family-situation-assessment"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
          >
            <Button className="w-full h-11 gap-2" size="lg">
              <ClipboardList className="w-4 h-4" />
              Take the Free 2-Minute Assessment
            </Button>
          </a>

          <button
            onClick={handleClose}
            className="w-full text-xs text-muted-foreground hover:text-foreground mt-3 text-center transition-colors"
          >
            No thanks, I'll figure it out on my own
          </button>
        </div>

      </div>
    </div>
  );
};

export default LeadMagnetPopup;
