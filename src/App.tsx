import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Reschedule from "./pages/Reschedule";
import Interventionist from "./pages/Interventionist";
import FamilyIntervention from "./pages/FamilyIntervention";
import CrisisSupport from "./pages/CrisisSupport";
import TreatmentPlanning from "./pages/TreatmentPlanning";
import AftercareGuidance from "./pages/AftercareGuidance";
import Testimonials from "./pages/Testimonials";
import Oregon from "./pages/Oregon";
import Washington from "./pages/Washington";
import Idaho from "./pages/Idaho";
import Florida from "./pages/Florida";
import California from "./pages/California";
import Utah from "./pages/Utah";
import ScrollToTop from "./components/ScrollToTop";
import TawkToChat from "./components/TawkToChat";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <TawkToChat />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/interventionist" element={<Interventionist />} />
          <Route path="/family-intervention" element={<FamilyIntervention />} />
          <Route path="/crisis-support" element={<CrisisSupport />} />
          <Route path="/treatment-planning" element={<TreatmentPlanning />} />
          <Route path="/aftercare-guidance" element={<AftercareGuidance />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/oregon" element={<Oregon />} />
          <Route path="/washington" element={<Washington />} />
          <Route path="/idaho" element={<Idaho />} />
          <Route path="/florida" element={<Florida />} />
          <Route path="/california" element={<California />} />
          <Route path="/utah" element={<Utah />} />
          <Route path="/reschedule" element={<Reschedule />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
