import { Toaster } from "@/components/ui/toaster";
import FloatingContactForm from "@/components/FloatingContactForm";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Reschedule from "./pages/Reschedule";
import Interventionist from "./pages/Interventionist";
import FamilyIntervention from "./pages/FamilyIntervention";
import FamilyReadinessIntensive from "./pages/FamilyReadinessIntensive";
import CrisisSupport from "./pages/CrisisSupport";
import TreatmentPlanning from "./pages/TreatmentPlanning";
import AftercareGuidance from "./pages/AftercareGuidance";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import PartyWreckersPodcast from "./pages/PartyWreckersPodcast";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Assessment from "./pages/Assessment";
import SelfAssessment from "./pages/SelfAssessment";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ScrollToTop from "./components/ScrollToTop";
import SubstanceGuide from "./pages/SubstanceGuide";
import InterventionToolkit from "./pages/InterventionToolkit";
import InterventionFAQPage from "./pages/InterventionFAQPage";
import ServiceAreas from "./pages/ServiceAreas";
import TawkToChat from "./components/TawkToChat";
import DefaultSEO from "./components/DefaultSEO";
import TrailingSlashRedirect from "./components/TrailingSlashRedirect";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import HipaaCompliance from "./pages/HipaaCompliance";
import HowInterventionWorks from "./pages/HowInterventionWorks";
import WhenIsItTime from "./pages/WhenIsItTime";
import WhatIfTheyRefuse from "./pages/WhatIfTheyRefuse";
import WhatMakesMattDifferent from "./pages/WhatMakesMattDifferent";
import InterventionCost from "./pages/InterventionCost";
import BeforeYouCall from "./pages/BeforeYouCall";

// US States
import Alabama from "./pages/Alabama";
import Alaska from "./pages/Alaska";
import Arizona from "./pages/Arizona";
import Arkansas from "./pages/Arkansas";
import California from "./pages/California";
import Colorado from "./pages/Colorado";
import Connecticut from "./pages/Connecticut";
import Delaware from "./pages/Delaware";
import Florida from "./pages/Florida";
import Georgia from "./pages/Georgia";
import Hawaii from "./pages/Hawaii";
import Idaho from "./pages/Idaho";
import Illinois from "./pages/Illinois";
import Indiana from "./pages/Indiana";
import Iowa from "./pages/Iowa";
import Kansas from "./pages/Kansas";
import Kentucky from "./pages/Kentucky";
import Louisiana from "./pages/Louisiana";
import Maine from "./pages/Maine";
import Maryland from "./pages/Maryland";
import Massachusetts from "./pages/Massachusetts";
import Michigan from "./pages/Michigan";
import Minnesota from "./pages/Minnesota";
import Mississippi from "./pages/Mississippi";
import Missouri from "./pages/Missouri";
import Montana from "./pages/Montana";
import Nebraska from "./pages/Nebraska";
import Nevada from "./pages/Nevada";
import NewHampshire from "./pages/NewHampshire";
import NewJersey from "./pages/NewJersey";
import NewMexico from "./pages/NewMexico";
import NewYork from "./pages/NewYork";
import NorthCarolina from "./pages/NorthCarolina";
import NorthDakota from "./pages/NorthDakota";
import Ohio from "./pages/Ohio";
import Oklahoma from "./pages/Oklahoma";
import Oregon from "./pages/Oregon";
import Pennsylvania from "./pages/Pennsylvania";
import RhodeIsland from "./pages/RhodeIsland";
import SouthCarolina from "./pages/SouthCarolina";
import SouthDakota from "./pages/SouthDakota";
import Tennessee from "./pages/Tennessee";
import Texas from "./pages/Texas";
import Utah from "./pages/Utah";
import Vermont from "./pages/Vermont";
import Virginia from "./pages/Virginia";
import Washington from "./pages/Washington";
import WestVirginia from "./pages/WestVirginia";
import Wisconsin from "./pages/Wisconsin";
import Wyoming from "./pages/Wyoming";

// US Cities
import PortlandOregon from "./pages/PortlandOregon";
import SeattleWashington from "./pages/SeattleWashington";
import EugeneOregon from "./pages/EugeneOregon";
import SanFranciscoCalifornia from "./pages/SanFranciscoCalifornia";
import LosAngelesCalifornia from "./pages/LosAngelesCalifornia";
import SacramentoCalifornia from "./pages/SacramentoCalifornia";
import OaklandCalifornia from "./pages/OaklandCalifornia";
import SanJoseCalifornia from "./pages/SanJoseCalifornia";
import LongBeachCalifornia from "./pages/LongBeachCalifornia";
import PasadenaCalifornia from "./pages/PasadenaCalifornia";
import OrangeCountyCalifornia from "./pages/OrangeCountyCalifornia";
import AnaheimCalifornia from "./pages/AnaheimCalifornia";
import IrvineCalifornia from "./pages/IrvineCalifornia";
import PhoenixArizona from "./pages/PhoenixArizona";
import AustinTexas from "./pages/AustinTexas";
import DallasTexas from "./pages/DallasTexas";
import LasVegasNevada from "./pages/LasVegasNevada";
import SaltLakeCityUtah from "./pages/SaltLakeCityUtah";
import BoiseIdaho from "./pages/BoiseIdaho";
import NampaIdaho from "./pages/NampaIdaho";
import MeridianIdaho from "./pages/MeridianIdaho";
import ProvoUtah from "./pages/ProvoUtah";
import OgdenUtah from "./pages/OgdenUtah";
import HendersonNevada from "./pages/HendersonNevada";
import RenoNevada from "./pages/RenoNevada";
import TucsonArizona from "./pages/TucsonArizona";
import ScottsdaleArizona from "./pages/ScottsdaleArizona";
import MesaArizona from "./pages/MesaArizona";
import ChandlerArizona from "./pages/ChandlerArizona";
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
import TacomaWashington from "./pages/TacomaWashington";
import BellevueWashington from "./pages/BellevueWashington";
import EverettWashington from "./pages/EverettWashington";
import OlympiaWashington from "./pages/OlympiaWashington";
import YakimaWashington from "./pages/YakimaWashington";
import VancouverWashington from "./pages/VancouverWashington";
import BendOregon from "./pages/BendOregon";
import SalemOregon from "./pages/SalemOregon";
import MedfordOregon from "./pages/MedfordOregon";
import HillsboroOregon from "./pages/HillsboroOregon";
import BeavertonOregon from "./pages/BeavertonOregon";
import GreshamOregon from "./pages/GreshamOregon";
import CorvallisOregon from "./pages/CorvallisOregon";
import PhiladelphiaPennsylvania from "./pages/PhiladelphiaPennsylvania";
import BaltimoreMaryland from "./pages/BaltimoreMaryland";
import AnchorageAlaska from "./pages/AnchorageAlaska";
import KnoxvilleTennessee from "./pages/KnoxvilleTennessee";
import ColumbusOhio from "./pages/ColumbusOhio";
import OmahaNebraska from "./pages/OmahaNebraska";
import OklahomaCityOklahoma from "./pages/OklahomaCityOklahoma";

// Hawaii Islands
import OahuHawaii from "./pages/OahuHawaii";
import MauiHawaii from "./pages/MauiHawaii";
import BigIslandHawaii from "./pages/BigIslandHawaii";
import KauaiHawaii from "./pages/KauaiHawaii";
import WichitaKansas from "./pages/WichitaKansas";
import OverlandParkKansas from "./pages/OverlandParkKansas";
import TopekaKansas from "./pages/TopekaKansas";

// Canadian Provinces
import BritishColumbia from "./pages/BritishColumbia";
import Alberta from "./pages/Alberta";
import Ontario from "./pages/Ontario";
import Quebec from "./pages/Quebec";
import Manitoba from "./pages/Manitoba";
import Saskatchewan from "./pages/Saskatchewan";
import NovaScotia from "./pages/NovaScotia";
import NewBrunswick from "./pages/NewBrunswick";
import NewfoundlandLabrador from "./pages/NewfoundlandLabrador";
import PrinceEdwardIsland from "./pages/PrinceEdwardIsland";
import ColoradoSpringsColorado from "./pages/ColoradoSpringsColorado";
import AuroraColorado from "./pages/AuroraColorado";
import FortCollinsColorado from "./pages/FortCollinsColorado";
import AlbuquerqueNewMexico from "./pages/AlbuquerqueNewMexico";
import SantaFeNewMexico from "./pages/SantaFeNewMexico";
import LasCrucesNewMexico from "./pages/LasCrucesNewMexico";
import SanAntonioTexas from "./pages/SanAntonioTexas";
import FortWorthTexas from "./pages/FortWorthTexas";
import ElPasoTexas from "./pages/ElPasoTexas";
import PlanoTexas from "./pages/PlanoTexas";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* <TawkToChat /> */}
       <BrowserRouter>
        <TrailingSlashRedirect />
        <ScrollToTop />
        <DefaultSEO />
        <FloatingContactForm />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/interventionist" element={<Interventionist />} />
          <Route path="/family-intervention" element={<FamilyIntervention />} />
          <Route path="/family-readiness-intensive" element={<FamilyReadinessIntensive />} />
          <Route path="/crisis-support" element={<CrisisSupport />} />
          <Route path="/treatment-planning" element={<TreatmentPlanning />} />
          <Route path="/aftercare-guidance" element={<AftercareGuidance />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/party-wreckers-podcast" element={<PartyWreckersPodcast />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/self-assessment" element={<SelfAssessment />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/reschedule" element={<Reschedule />} />
          <Route path="/substance-guide" element={<SubstanceGuide />} />
          <Route path="/intervention-toolkit" element={<InterventionToolkit />} />
          <Route path="/intervention-faq" element={<InterventionFAQPage />} />
          <Route path="/service-areas" element={<ServiceAreas />} />
          <Route path="/how-intervention-works" element={<HowInterventionWorks />} />
          <Route path="/when-is-it-time-for-an-intervention" element={<WhenIsItTime />} />
          <Route path="/what-if-they-refuse-treatment" element={<WhatIfTheyRefuse />} />
          <Route path="/what-makes-matt-different" element={<WhatMakesMattDifferent />} />
          <Route path="/intervention-cost" element={<InterventionCost />} />
          <Route path="/before-you-call" element={<BeforeYouCall />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/hipaa-compliance" element={<HipaaCompliance />} />
          
          {/* US States */}
          <Route path="/alabama" element={<Alabama />} />
          <Route path="/alaska" element={<Alaska />} />
          <Route path="/arizona" element={<Arizona />} />
          <Route path="/arkansas" element={<Arkansas />} />
          <Route path="/california" element={<California />} />
          <Route path="/colorado" element={<Colorado />} />
          <Route path="/connecticut" element={<Connecticut />} />
          <Route path="/delaware" element={<Delaware />} />
          <Route path="/florida" element={<Florida />} />
          <Route path="/georgia" element={<Georgia />} />
          <Route path="/hawaii" element={<Hawaii />} />
          <Route path="/idaho" element={<Idaho />} />
          <Route path="/illinois" element={<Illinois />} />
          <Route path="/indiana" element={<Indiana />} />
          <Route path="/iowa" element={<Iowa />} />
          <Route path="/kansas" element={<Kansas />} />
          <Route path="/kentucky" element={<Kentucky />} />
          <Route path="/louisiana" element={<Louisiana />} />
          <Route path="/maine" element={<Maine />} />
          <Route path="/maryland" element={<Maryland />} />
          <Route path="/massachusetts" element={<Massachusetts />} />
          <Route path="/michigan" element={<Michigan />} />
          <Route path="/minnesota" element={<Minnesota />} />
          <Route path="/mississippi" element={<Mississippi />} />
          <Route path="/missouri" element={<Missouri />} />
          <Route path="/montana" element={<Montana />} />
          <Route path="/nebraska" element={<Nebraska />} />
          <Route path="/nevada" element={<Nevada />} />
          <Route path="/new-hampshire" element={<NewHampshire />} />
          <Route path="/new-jersey" element={<NewJersey />} />
          <Route path="/new-mexico" element={<NewMexico />} />
          <Route path="/new-york" element={<NewYork />} />
          <Route path="/north-carolina" element={<NorthCarolina />} />
          <Route path="/north-dakota" element={<NorthDakota />} />
          <Route path="/ohio" element={<Ohio />} />
          <Route path="/oklahoma" element={<Oklahoma />} />
          <Route path="/oregon" element={<Oregon />} />
          <Route path="/pennsylvania" element={<Pennsylvania />} />
          <Route path="/rhode-island" element={<RhodeIsland />} />
          <Route path="/south-carolina" element={<SouthCarolina />} />
          <Route path="/south-dakota" element={<SouthDakota />} />
          <Route path="/tennessee" element={<Tennessee />} />
          <Route path="/texas" element={<Texas />} />
          <Route path="/utah" element={<Utah />} />
          <Route path="/vermont" element={<Vermont />} />
          <Route path="/virginia" element={<Virginia />} />
          <Route path="/washington" element={<Washington />} />
          <Route path="/west-virginia" element={<WestVirginia />} />
          <Route path="/wisconsin" element={<Wisconsin />} />
          <Route path="/wyoming" element={<Wyoming />} />
          
          {/* US Cities */}
          <Route path="/portland-oregon" element={<PortlandOregon />} />
          <Route path="/seattle-washington" element={<SeattleWashington />} />
          <Route path="/eugene-oregon" element={<EugeneOregon />} />
          <Route path="/san-francisco-california" element={<SanFranciscoCalifornia />} />
          <Route path="/los-angeles-california" element={<LosAngelesCalifornia />} />
          <Route path="/sacramento-california" element={<SacramentoCalifornia />} />
          <Route path="/oakland-california" element={<OaklandCalifornia />} />
          <Route path="/san-jose-california" element={<SanJoseCalifornia />} />
          <Route path="/long-beach-california" element={<LongBeachCalifornia />} />
          <Route path="/pasadena-california" element={<PasadenaCalifornia />} />
          <Route path="/orange-county-california" element={<OrangeCountyCalifornia />} />
          <Route path="/anaheim-california" element={<AnaheimCalifornia />} />
          <Route path="/irvine-california" element={<IrvineCalifornia />} />
          <Route path="/phoenix-arizona" element={<PhoenixArizona />} />
          <Route path="/austin-texas" element={<AustinTexas />} />
          <Route path="/dallas-texas" element={<DallasTexas />} />
          <Route path="/las-vegas-nevada" element={<LasVegasNevada />} />
          <Route path="/salt-lake-city-utah" element={<SaltLakeCityUtah />} />
          <Route path="/boise-idaho" element={<BoiseIdaho />} />
          <Route path="/nampa-idaho" element={<NampaIdaho />} />
          <Route path="/meridian-idaho" element={<MeridianIdaho />} />
          <Route path="/provo-utah" element={<ProvoUtah />} />
          <Route path="/ogden-utah" element={<OgdenUtah />} />
          <Route path="/henderson-nevada" element={<HendersonNevada />} />
          <Route path="/reno-nevada" element={<RenoNevada />} />
          <Route path="/tucson-arizona" element={<TucsonArizona />} />
          <Route path="/scottsdale-arizona" element={<ScottsdaleArizona />} />
          <Route path="/mesa-arizona" element={<MesaArizona />} />
          <Route path="/chandler-arizona" element={<ChandlerArizona />} />
          <Route path="/denver-colorado" element={<DenverColorado />} />
          <Route path="/colorado-springs-colorado" element={<ColoradoSpringsColorado />} />
          <Route path="/aurora-colorado" element={<AuroraColorado />} />
          <Route path="/fort-collins-colorado" element={<FortCollinsColorado />} />
          <Route path="/albuquerque-new-mexico" element={<AlbuquerqueNewMexico />} />
          <Route path="/santa-fe-new-mexico" element={<SantaFeNewMexico />} />
          <Route path="/las-cruces-new-mexico" element={<LasCrucesNewMexico />} />
          <Route path="/san-antonio-texas" element={<SanAntonioTexas />} />
          <Route path="/fort-worth-texas" element={<FortWorthTexas />} />
          <Route path="/el-paso-texas" element={<ElPasoTexas />} />
          <Route path="/plano-texas" element={<PlanoTexas />} />
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
          <Route path="/tacoma-washington" element={<TacomaWashington />} />
          <Route path="/bellevue-washington" element={<BellevueWashington />} />
          <Route path="/everett-washington" element={<EverettWashington />} />
          <Route path="/olympia-washington" element={<OlympiaWashington />} />
          <Route path="/yakima-washington" element={<YakimaWashington />} />
          <Route path="/vancouver-washington" element={<VancouverWashington />} />
          <Route path="/bend-oregon" element={<BendOregon />} />
          <Route path="/salem-oregon" element={<SalemOregon />} />
          <Route path="/medford-oregon" element={<MedfordOregon />} />
          <Route path="/hillsboro-oregon" element={<HillsboroOregon />} />
          <Route path="/beaverton-oregon" element={<BeavertonOregon />} />
          <Route path="/gresham-oregon" element={<GreshamOregon />} />
          <Route path="/corvallis-oregon" element={<CorvallisOregon />} />
          <Route path="/philadelphia-pennsylvania" element={<PhiladelphiaPennsylvania />} />
          <Route path="/baltimore-maryland" element={<BaltimoreMaryland />} />
          <Route path="/anchorage-alaska" element={<AnchorageAlaska />} />
          <Route path="/knoxville-tennessee" element={<KnoxvilleTennessee />} />
          <Route path="/columbus-ohio" element={<ColumbusOhio />} />
          <Route path="/omaha-nebraska" element={<OmahaNebraska />} />
          <Route path="/oklahoma-city-oklahoma" element={<OklahomaCityOklahoma />} />
          
          {/* Hawaii Islands */}
          <Route path="/oahu-hawaii" element={<OahuHawaii />} />
          <Route path="/maui-hawaii" element={<MauiHawaii />} />
          <Route path="/big-island-hawaii" element={<BigIslandHawaii />} />
          <Route path="/kauai-hawaii" element={<KauaiHawaii />} />
          <Route path="/wichita-kansas" element={<WichitaKansas />} />
          <Route path="/overland-park-kansas" element={<OverlandParkKansas />} />
          <Route path="/topeka-kansas" element={<TopekaKansas />} />
          
          {/* Canadian Provinces */}
          <Route path="/british-columbia" element={<BritishColumbia />} />
          <Route path="/alberta" element={<Alberta />} />
          <Route path="/ontario" element={<Ontario />} />
          <Route path="/quebec" element={<Quebec />} />
          <Route path="/manitoba" element={<Manitoba />} />
          <Route path="/saskatchewan" element={<Saskatchewan />} />
          <Route path="/nova-scotia" element={<NovaScotia />} />
          <Route path="/new-brunswick" element={<NewBrunswick />} />
          <Route path="/newfoundland-labrador" element={<NewfoundlandLabrador />} />
          <Route path="/prince-edward-island" element={<PrinceEdwardIsland />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;