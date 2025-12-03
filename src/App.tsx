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
import Arizona from "./pages/Arizona";
import Nevada from "./pages/Nevada";
import Contact from "./pages/Contact";
import PartyWreckersPodcast from "./pages/PartyWreckersPodcast";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Assessment from "./pages/Assessment";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ScrollToTop from "./components/ScrollToTop";
import TawkToChat from "./components/TawkToChat";
import PortlandOregon from "./pages/PortlandOregon";
import SeattleWashington from "./pages/SeattleWashington";
import EugeneOregon from "./pages/EugeneOregon";
import SanFranciscoCalifornia from "./pages/SanFranciscoCalifornia";
import LosAngelesCalifornia from "./pages/LosAngelesCalifornia";
import PhoenixArizona from "./pages/PhoenixArizona";
import AustinTexas from "./pages/AustinTexas";
import DallasTexas from "./pages/DallasTexas";
import LasVegasNevada from "./pages/LasVegasNevada";
import SaltLakeCityUtah from "./pages/SaltLakeCityUtah";
import BoiseIdaho from "./pages/BoiseIdaho";
import DenverColorado from "./pages/DenverColorado";
import ChicagoIllinois from "./pages/ChicagoIllinois";
import MinneapolisMinnesota from "./pages/MinneapolisMinnesota";
import KansasCityMissouri from "./pages/KansasCityMissouri";
import HoustonTexas from "./pages/HoustonTexas";
import NewOrleansLouisiana from "./pages/NewOrleansLouisiana";
import DetroitMichigan from "./pages/DetroitMichigan";
import MiamiFlorida from "./pages/MiamiFlorida";
import NashvilleTennessee from "./pages/NashvilleTennessee";
import IndianapolisIndiana from "./pages/IndianapolisIndiana";
import SpokaneWashington from "./pages/SpokaneWashington";
import BendOregon from "./pages/BendOregon";
import PhiladelphiaPennsylvania from "./pages/PhiladelphiaPennsylvania";
import BaltimoreMaryland from "./pages/BaltimoreMaryland";
import AnchorageAlaska from "./pages/AnchorageAlaska";
import KnoxvilleTennessee from "./pages/KnoxvilleTennessee";
import ColumbusOhio from "./pages/ColumbusOhio";

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
          <Route path="/arizona" element={<Arizona />} />
          <Route path="/nevada" element={<Nevada />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/party-wreckers-podcast" element={<PartyWreckersPodcast />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/reschedule" element={<Reschedule />} />
          <Route path="/portland-oregon" element={<PortlandOregon />} />
          <Route path="/seattle-washington" element={<SeattleWashington />} />
          <Route path="/eugene-oregon" element={<EugeneOregon />} />
          <Route path="/san-francisco-california" element={<SanFranciscoCalifornia />} />
          <Route path="/los-angeles-california" element={<LosAngelesCalifornia />} />
          <Route path="/phoenix-arizona" element={<PhoenixArizona />} />
          <Route path="/austin-texas" element={<AustinTexas />} />
          <Route path="/dallas-texas" element={<DallasTexas />} />
          <Route path="/las-vegas-nevada" element={<LasVegasNevada />} />
          <Route path="/salt-lake-city-utah" element={<SaltLakeCityUtah />} />
          <Route path="/boise-idaho" element={<BoiseIdaho />} />
          <Route path="/denver-colorado" element={<DenverColorado />} />
          <Route path="/chicago-illinois" element={<ChicagoIllinois />} />
          <Route path="/minneapolis-minnesota" element={<MinneapolisMinnesota />} />
          <Route path="/kansas-city-missouri" element={<KansasCityMissouri />} />
          <Route path="/houston-texas" element={<HoustonTexas />} />
          <Route path="/new-orleans-louisiana" element={<NewOrleansLouisiana />} />
          <Route path="/detroit-michigan" element={<DetroitMichigan />} />
          <Route path="/miami-florida" element={<MiamiFlorida />} />
          <Route path="/nashville-tennessee" element={<NashvilleTennessee />} />
          <Route path="/indianapolis-indiana" element={<IndianapolisIndiana />} />
          <Route path="/spokane-washington" element={<SpokaneWashington />} />
          <Route path="/bend-oregon" element={<BendOregon />} />
          <Route path="/philadelphia-pennsylvania" element={<PhiladelphiaPennsylvania />} />
          <Route path="/baltimore-maryland" element={<BaltimoreMaryland />} />
          <Route path="/anchorage-alaska" element={<AnchorageAlaska />} />
          <Route path="/knoxville-tennessee" element={<KnoxvilleTennessee />} />
          <Route path="/columbus-ohio" element={<ColumbusOhio />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
