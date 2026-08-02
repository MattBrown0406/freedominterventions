import { Calendar, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import TrackedPhoneLink from "./TrackedPhoneLink";
import { trackEvent } from "@/lib/analytics";

const WHATSAPP_NUMBER = "5038362136";

const MobileStickyCTA = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-3 py-2 shadow-2xl backdrop-blur md:hidden">
      <div className="grid grid-cols-3 gap-2">
        <TrackedPhoneLink phoneNumber="+14582988000" metadata={{ location: "mobile_sticky_cta" }}>
          <span className="flex h-12 items-center justify-center gap-1 rounded-md bg-primary text-xs font-semibold text-primary-foreground">
            <Phone className="h-4 w-4" />
            Call
          </span>
        </TrackedPhoneLink>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click", { location: "mobile_sticky_cta" })}
          className="flex h-12 items-center justify-center gap-1 rounded-md bg-[#25D366] text-xs font-semibold text-white"
          aria-label="Chat with us on WhatsApp"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
        <Link
          to="/?type=consultation#booking"
          onClick={() => trackEvent("mobile_free_consult_click", { location: "mobile_sticky_cta" })}
          className="flex h-12 items-center justify-center gap-1 rounded-md border border-primary/30 bg-background text-xs font-semibold text-primary"
        >
          <Calendar className="h-4 w-4" />
          Consult
        </Link>
      </div>
    </div>
  );
};

export default MobileStickyCTA;
