import { Calendar, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import TrackedPhoneLink from "./TrackedPhoneLink";
import { trackEvent } from "@/lib/analytics";

const MobileStickyCTA = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-3 py-2 shadow-2xl backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <TrackedPhoneLink phoneNumber="+15416688084" metadata={{ location: "mobile_sticky_cta" }}>
          <span className="flex h-12 items-center justify-center gap-2 rounded-md bg-primary text-sm font-semibold text-primary-foreground">
            <Phone className="h-4 w-4" />
            Call Matt
          </span>
        </TrackedPhoneLink>
        <Link
          to="/?type=consultation#booking"
          onClick={() => trackEvent("mobile_free_consult_click", { location: "mobile_sticky_cta" })}
          className="flex h-12 items-center justify-center gap-2 rounded-md border border-primary/30 bg-background text-sm font-semibold text-primary"
        >
          <Calendar className="h-4 w-4" />
          Free Consult
        </Link>
      </div>
    </div>
  );
};

export default MobileStickyCTA;
