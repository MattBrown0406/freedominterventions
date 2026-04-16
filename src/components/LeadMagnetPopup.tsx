import { useState, useEffect } from "react";
import { X, ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "leadMagnetDismissed";

const LeadMagnetPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
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
      if (!sessionStorage.getItem(STORAGE_KEY)) {
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
    sessionStorage.setItem(STORAGE_KEY, "true");
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
            <Users className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-primary-foreground mb-2">
            Join The Family Squares
          </h2>
          <p className="text-primary-foreground/80 text-sm">
            A free weekly Zoom support meeting for families affected by addiction — led by Matt Brown.
          </p>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <ul className="space-y-3 mb-6 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <span>No obligation to speak or participate</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <span>Many families just listen with their cameras off — that's completely fine</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <span>Connect with others who truly understand what you're going through</span>
            </li>
          </ul>

          <a
            href="https://soberhelpline.com/monday-zoom-registration"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
          >
            <Button className="w-full h-11 gap-2" size="lg">
              <Users className="w-4 h-4" />
              Register for the Free Meeting
            </Button>
          </a>

          <button
            onClick={handleClose}
            className="w-full text-xs text-muted-foreground hover:text-foreground mt-3 text-center transition-colors"
          >
            No thanks, maybe another time
          </button>
        </div>

      </div>
    </div>
  );
};

export default LeadMagnetPopup;
