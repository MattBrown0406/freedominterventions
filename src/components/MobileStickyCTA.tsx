import { Calendar, Phone, MessageCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import TrackedPhoneLink from "./TrackedPhoneLink";
import { trackEvent } from "@/lib/analytics";
import { SPANISH_LINE_E164 } from "@/config/spanishLine";

const WHATSAPP_NUMBER = "5038362136";

const MobileStickyCTA = () => {
  // On the Spanish page, call the Spanish-language line (AyudaSobria.com) and use Spanish labels.
  const isSpanish = /^\/es\/?$/i.test(useLocation().pathname);
  return (
    <nav aria-label={isSpanish ? "Contacto rápido" : "Quick contact"} className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-3 py-2 shadow-2xl backdrop-blur md:hidden">
      <div className="grid grid-cols-3 gap-2">
        <TrackedPhoneLink
          phoneNumber={isSpanish ? SPANISH_LINE_E164 : "+14582988000"}
          metadata={{ location: isSpanish ? "mobile_sticky_cta_es" : "mobile_sticky_cta" }}
        >
          <span className="flex h-12 items-center justify-center gap-1 rounded-md bg-primary text-xs font-semibold text-primary-foreground">
            <Phone className="h-4 w-4" />
            {isSpanish ? "Llamar" : "Call"}
          </span>
        </TrackedPhoneLink>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click", { location: "mobile_sticky_cta" })}
          className="flex h-12 items-center justify-center gap-1 rounded-md bg-[#15803d] text-xs font-semibold text-white"
          aria-label={isSpanish ? "Escríbanos por WhatsApp" : "Chat with us on WhatsApp"}
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
        <Link
          to="/book-intervention-consultation?type=consultation#booking"
          onClick={() => trackEvent("mobile_free_consult_click", { location: "mobile_sticky_cta" })}
          className="flex h-12 items-center justify-center gap-1 rounded-md border border-primary/30 bg-background text-xs font-semibold text-primary"
        >
          <Calendar className="h-4 w-4" />
          {isSpanish ? "Consulta" : "Consult"}
        </Link>
      </div>
    </nav>
  );
};

export default MobileStickyCTA;
