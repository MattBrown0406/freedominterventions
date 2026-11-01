import { useState, useEffect, useRef } from "react";
import { X, ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "leadMagnetDismissedAt";
const DISMISS_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

const isDismissed = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const at = Number(raw);
    if (!Number.isFinite(at)) return true;
    return Date.now() - at < DISMISS_DURATION_MS;
  } catch {
    return false;
  }
};

const REGISTER_URL = "https://soberhelpline.com/monday-zoom-registration";

// Desktop: a modal on exit intent or after 30s. Phones: a small card above the
// sticky call bar instead of a full-screen popup over what a parent is reading.
const LeadMagnetPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile] = useState(() => window.matchMedia("(max-width: 767px)").matches);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isDismissed()) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (isMobile) return;
      if (isDismissed()) return;
      if (e.clientY <= 0) {
        setIsVisible(true);
        document.removeEventListener("mouseout", handleMouseLeave);
      }
    };

    const timer = setTimeout(() => {
      if (!isDismissed()) {
        setIsVisible(true);
      }
    }, 30000);

    if (!isMobile) {
      document.addEventListener("mouseout", handleMouseLeave);
    }

    return () => {
      document.removeEventListener("mouseout", handleMouseLeave);
      clearTimeout(timer);
    };
  }, [isMobile]);

  // Desktop modal: move focus in, close on Escape, restore focus on close.
  useEffect(() => {
    if (!isVisible || isMobile) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, isMobile]);

  const handleClose = () => {
    setIsVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      // ignore storage failures
    }
  };


  if (!isVisible) return null;

  if (isMobile) {
    return (
      <aside
        aria-label="Free weekly family support meeting"
        className="fixed inset-x-3 bottom-[76px] z-40 rounded-xl border border-border bg-card p-3 pr-10 shadow-xl animate-in slide-in-from-bottom-4 fade-in duration-300"
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-1 top-1 flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
        <p className="text-sm font-semibold text-foreground">Free family support on Zoom</p>
        <p className="mt-0.5 text-xs text-muted-foreground">Mondays, 7:00 PM Pacific, led by Matt. Cameras off is fine.</p>
        <a
          href={REGISTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClose}
          className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Register free <ArrowRight className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </aside>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-in fade-in duration-300" onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}>
      <div role="dialog" aria-modal="true" aria-labelledby="lead-magnet-title" className="relative w-full max-w-md bg-card rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">

        {/* Close button */}
        <button
          ref={closeButtonRef}
          type="button"
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
          <h2 id="lead-magnet-title" className="font-serif text-2xl font-bold text-primary-foreground mb-2">
            Join The Family Squares
          </h2>
          <p className="text-primary-foreground/80 text-sm">
            A free weekly Zoom support meeting for families affected by addiction — led by Matt Brown. Every Monday at 7:00 PM Pacific.
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
            href={REGISTER_URL}
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
            type="button"
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
