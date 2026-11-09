import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    // BookingCalendar owns its mounted scroll/focus target across lazy routes.
    if (hash === '#booking') return;
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    let frame = 0;
    // Route content may be lazy-mounted. Observe readiness, not an arbitrary delay.
    const reveal = () => {
      const target = document.getElementById(hash.slice(1));
      if (!target) return false;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: 'instant', block: 'start' });
        const heading = target.querySelector<HTMLElement>('h1, h2, h3') || target;
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
      });
      return true;
    };
    const observer = new MutationObserver(() => {
      if (reveal()) observer.disconnect();
    });
    if (!reveal()) observer.observe(document.body, { childList: true, subtree: true });
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [pathname, hash, key]);

  return null;
};

export default ScrollToTop;
