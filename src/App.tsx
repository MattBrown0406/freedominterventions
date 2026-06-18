import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import FloatingContactForm from "@/components/FloatingContactForm";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import FromSoberHelpline from "./pages/FromSoberHelpline";
import FromNoMoreEnabling from "./pages/FromNoMoreEnabling";
import InterventionReadiness from "./pages/InterventionReadiness";
import PartyWreckersPodcast from "./pages/PartyWreckersPodcast";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Assessment from "./pages/Assessment";
import SelfAssessment from "./pages/SelfAssessment";
import ScrollToTop from "./components/ScrollToTop";
import SubstanceGuide from "./pages/SubstanceGuide";
import InterventionToolkit from "./pages/InterventionToolkit";
import InterventionFAQPage from "./pages/InterventionFAQPage";
import ServiceAreas from "./pages/ServiceAreas";
import TawkToChat from "./components/TawkToChat";
import DefaultSEO from "./components/DefaultSEO";
import RouteAnalytics from "./components/RouteAnalytics";
import TrailingSlashRedirect from "./components/TrailingSlashRedirect";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import TermsOfService from "./pages/TermsOfService";
import HipaaCompliance from "./pages/HipaaCompliance";
import HowInterventionWorks from "./pages/HowInterventionWorks";
import WhenIsItTime from "./pages/WhenIsItTime";
import WhatIfTheyRefuse from "./pages/WhatIfTheyRefuse";
import WhatMakesMattDifferent from "./pages/WhatMakesMattDifferent";
import InterventionCost from "./pages/InterventionCost";
import BookInterventionConsultation from "./pages/BookInterventionConsultation";
import BeforeYouCall from "./pages/BeforeYouCall";
import AfterConsultation from "./pages/AfterConsultation";
import MobileStickyCTA from "./components/MobileStickyCTA";
import InterventionAnswers from "./pages/InterventionAnswers";
import InterventionAnswerDetail from "./pages/InterventionAnswerDetail";
import WhichHelpDoWeNeed from "./pages/WhichHelpDoWeNeed";

const Alabama = lazy(() => import("./pages/Alabama"));
const Alaska = lazy(() => import("./pages/Alaska"));
const Arizona = lazy(() => import("./pages/Arizona"));
const Arkansas = lazy(() => import("./pages/Arkansas"));
const California = lazy(() => import("./pages/California"));
const Colorado = lazy(() => import("./pages/Colorado"));
const Connecticut = lazy(() => import("./pages/Connecticut"));
const Delaware = lazy(() => import("./pages/Delaware"));
const Florida = lazy(() => import("./pages/Florida"));
const Georgia = lazy(() => import("./pages/Georgia"));
const Hawaii = lazy(() => import("./pages/Hawaii"));
const Idaho = lazy(() => import("./pages/Idaho"));
const Illinois = lazy(() => import("./pages/Illinois"));
const Indiana = lazy(() => import("./pages/Indiana"));
const Iowa = lazy(() => import("./pages/Iowa"));
const Kansas = lazy(() => import("./pages/Kansas"));
const Kentucky = lazy(() => import("./pages/Kentucky"));
const Louisiana = lazy(() => import("./pages/Louisiana"));
const Maine = lazy(() => import("./pages/Maine"));
const Maryland = lazy(() => import("./pages/Maryland"));
const Massachusetts = lazy(() => import("./pages/Massachusetts"));
const Michigan = lazy(() => import("./pages/Michigan"));
const Minnesota = lazy(() => import("./pages/Minnesota"));
const Mississippi = lazy(() => import("./pages/Mississippi"));
const Missouri = lazy(() => import("./pages/Missouri"));
const Montana = lazy(() => import("./pages/Montana"));
const Nebraska = lazy(() => import("./pages/Nebraska"));
const Nevada = lazy(() => import("./pages/Nevada"));
const NewHampshire = lazy(() => import("./pages/NewHampshire"));
const NewJersey = lazy(() => import("./pages/NewJersey"));
const NewMexico = lazy(() => import("./pages/NewMexico"));
const NewYork = lazy(() => import("./pages/NewYork"));
const NorthCarolina = lazy(() => import("./pages/NorthCarolina"));
const NorthDakota = lazy(() => import("./pages/NorthDakota"));
const Ohio = lazy(() => import("./pages/Ohio"));
const Oklahoma = lazy(() => import("./pages/Oklahoma"));
const Oregon = lazy(() => import("./pages/Oregon"));
const Pennsylvania = lazy(() => import("./pages/Pennsylvania"));
const RhodeIsland = lazy(() => import("./pages/RhodeIsland"));
const SouthCarolina = lazy(() => import("./pages/SouthCarolina"));
const SouthDakota = lazy(() => import("./pages/SouthDakota"));
const Tennessee = lazy(() => import("./pages/Tennessee"));
const Texas = lazy(() => import("./pages/Texas"));
const Utah = lazy(() => import("./pages/Utah"));
const Vermont = lazy(() => import("./pages/Vermont"));
const Virginia = lazy(() => import("./pages/Virginia"));
const Washington = lazy(() => import("./pages/Washington"));
const WestVirginia = lazy(() => import("./pages/WestVirginia"));
const Wisconsin = lazy(() => import("./pages/Wisconsin"));
const Wyoming = lazy(() => import("./pages/Wyoming"));
const PortlandOregon = lazy(() => import("./pages/PortlandOregon"));
const SeattleWashington = lazy(() => import("./pages/SeattleWashington"));
const EugeneOregon = lazy(() => import("./pages/EugeneOregon"));
const SanFranciscoCalifornia = lazy(
  () => import("./pages/SanFranciscoCalifornia"),
);
const LosAngelesCalifornia = lazy(() => import("./pages/LosAngelesCalifornia"));
const SacramentoCalifornia = lazy(() => import("./pages/SacramentoCalifornia"));
const OaklandCalifornia = lazy(() => import("./pages/OaklandCalifornia"));
const SanJoseCalifornia = lazy(() => import("./pages/SanJoseCalifornia"));
const LongBeachCalifornia = lazy(() => import("./pages/LongBeachCalifornia"));
const PasadenaCalifornia = lazy(() => import("./pages/PasadenaCalifornia"));
const OrangeCountyCalifornia = lazy(
  () => import("./pages/OrangeCountyCalifornia"),
);
const AnaheimCalifornia = lazy(() => import("./pages/AnaheimCalifornia"));
const IrvineCalifornia = lazy(() => import("./pages/IrvineCalifornia"));
const PhoenixArizona = lazy(() => import("./pages/PhoenixArizona"));
const AustinTexas = lazy(() => import("./pages/AustinTexas"));
const DallasTexas = lazy(() => import("./pages/DallasTexas"));
const LasVegasNevada = lazy(() => import("./pages/LasVegasNevada"));
const SaltLakeCityUtah = lazy(() => import("./pages/SaltLakeCityUtah"));
const BoiseIdaho = lazy(() => import("./pages/BoiseIdaho"));
const NampaIdaho = lazy(() => import("./pages/NampaIdaho"));
const MeridianIdaho = lazy(() => import("./pages/MeridianIdaho"));
const ProvoUtah = lazy(() => import("./pages/ProvoUtah"));
const OgdenUtah = lazy(() => import("./pages/OgdenUtah"));
const HendersonNevada = lazy(() => import("./pages/HendersonNevada"));
const RenoNevada = lazy(() => import("./pages/RenoNevada"));
const TucsonArizona = lazy(() => import("./pages/TucsonArizona"));
const ScottsdaleArizona = lazy(() => import("./pages/ScottsdaleArizona"));
const MesaArizona = lazy(() => import("./pages/MesaArizona"));
const ChandlerArizona = lazy(() => import("./pages/ChandlerArizona"));
const DenverColorado = lazy(() => import("./pages/DenverColorado"));
const ChicagoIllinois = lazy(() => import("./pages/ChicagoIllinois"));
const MinneapolisMinnesota = lazy(() => import("./pages/MinneapolisMinnesota"));
const KansasCityMissouri = lazy(() => import("./pages/KansasCityMissouri"));
const HoustonTexas = lazy(() => import("./pages/HoustonTexas"));
const NewOrleansLouisiana = lazy(() => import("./pages/NewOrleansLouisiana"));
const DetroitMichigan = lazy(() => import("./pages/DetroitMichigan"));
const MiamiFlorida = lazy(() => import("./pages/MiamiFlorida"));
const NashvilleTennessee = lazy(() => import("./pages/NashvilleTennessee"));
const IndianapolisIndiana = lazy(() => import("./pages/IndianapolisIndiana"));
const SpokaneWashington = lazy(() => import("./pages/SpokaneWashington"));
const TacomaWashington = lazy(() => import("./pages/TacomaWashington"));
const BellevueWashington = lazy(() => import("./pages/BellevueWashington"));
const EverettWashington = lazy(() => import("./pages/EverettWashington"));
const OlympiaWashington = lazy(() => import("./pages/OlympiaWashington"));
const YakimaWashington = lazy(() => import("./pages/YakimaWashington"));
const VancouverWashington = lazy(() => import("./pages/VancouverWashington"));
const BendOregon = lazy(() => import("./pages/BendOregon"));
const SalemOregon = lazy(() => import("./pages/SalemOregon"));
const MedfordOregon = lazy(() => import("./pages/MedfordOregon"));
const HillsboroOregon = lazy(() => import("./pages/HillsboroOregon"));
const BeavertonOregon = lazy(() => import("./pages/BeavertonOregon"));
const GreshamOregon = lazy(() => import("./pages/GreshamOregon"));
const CorvallisOregon = lazy(() => import("./pages/CorvallisOregon"));
const PhiladelphiaPennsylvania = lazy(
  () => import("./pages/PhiladelphiaPennsylvania"),
);
const BaltimoreMaryland = lazy(() => import("./pages/BaltimoreMaryland"));
const AnchorageAlaska = lazy(() => import("./pages/AnchorageAlaska"));
const KnoxvilleTennessee = lazy(() => import("./pages/KnoxvilleTennessee"));
const ColumbusOhio = lazy(() => import("./pages/ColumbusOhio"));
const OmahaNebraska = lazy(() => import("./pages/OmahaNebraska"));
const OklahomaCityOklahoma = lazy(() => import("./pages/OklahomaCityOklahoma"));
const OahuHawaii = lazy(() => import("./pages/OahuHawaii"));
const MauiHawaii = lazy(() => import("./pages/MauiHawaii"));
const BigIslandHawaii = lazy(() => import("./pages/BigIslandHawaii"));
const KauaiHawaii = lazy(() => import("./pages/KauaiHawaii"));
const WichitaKansas = lazy(() => import("./pages/WichitaKansas"));
const OverlandParkKansas = lazy(() => import("./pages/OverlandParkKansas"));
const TopekaKansas = lazy(() => import("./pages/TopekaKansas"));
const BritishColumbia = lazy(() => import("./pages/BritishColumbia"));
const Alberta = lazy(() => import("./pages/Alberta"));
const Ontario = lazy(() => import("./pages/Ontario"));
const Quebec = lazy(() => import("./pages/Quebec"));
const Manitoba = lazy(() => import("./pages/Manitoba"));
const Saskatchewan = lazy(() => import("./pages/Saskatchewan"));
const NovaScotia = lazy(() => import("./pages/NovaScotia"));
const NewBrunswick = lazy(() => import("./pages/NewBrunswick"));
const NewfoundlandLabrador = lazy(() => import("./pages/NewfoundlandLabrador"));
const PrinceEdwardIsland = lazy(() => import("./pages/PrinceEdwardIsland"));
const ColoradoSpringsColorado = lazy(
  () => import("./pages/ColoradoSpringsColorado"),
);
const AuroraColorado = lazy(() => import("./pages/AuroraColorado"));
const FortCollinsColorado = lazy(() => import("./pages/FortCollinsColorado"));
const AlbuquerqueNewMexico = lazy(() => import("./pages/AlbuquerqueNewMexico"));
const SantaFeNewMexico = lazy(() => import("./pages/SantaFeNewMexico"));
const LasCrucesNewMexico = lazy(() => import("./pages/LasCrucesNewMexico"));
const SanAntonioTexas = lazy(() => import("./pages/SanAntonioTexas"));
const FortWorthTexas = lazy(() => import("./pages/FortWorthTexas"));
const ElPasoTexas = lazy(() => import("./pages/ElPasoTexas"));
const PlanoTexas = lazy(() => import("./pages/PlanoTexas"));

const queryClient = new QueryClient();

const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const FamilyPortal = lazy(() => import("./pages/FamilyPortal"));
const StartContract = lazy(() => import("./pages/StartContract"));
const StartHere = lazy(() => import("./pages/StartHere"));
const Unsubscribe = lazy(() => import("./pages/Unsubscribe"));

const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center px-6">
    <p className="text-sm text-muted-foreground">Loading...</p>
  </div>
);

const PublicConversionChrome = () => {
  const { pathname } = useLocation();
  const isPrivateRoute =
    pathname.startsWith("/admin") || pathname.startsWith("/family-portal");
  if (isPrivateRoute) return null;
  return (
    <>
      <FloatingContactForm />
      <MobileStickyCTA />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* <TawkToChat /> */}
      <BrowserRouter>
        <TrailingSlashRedirect />
        <RouteAnalytics />
        <ScrollToTop />
        <DefaultSEO />
        <PublicConversionChrome />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/booking" element={<Index />} />
            <Route path="/interventionist" element={<Interventionist />} />
            <Route
              path="/family-intervention"
              element={<FamilyIntervention />}
            />
            <Route
              path="/family-readiness-intensive"
              element={<FamilyReadinessIntensive />}
            />
            <Route path="/crisis-support" element={<CrisisSupport />} />
            <Route path="/treatment-planning" element={<TreatmentPlanning />} />
            <Route path="/aftercare-guidance" element={<AftercareGuidance />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/from-sober-helpline"
              element={<FromSoberHelpline />}
            />
            <Route
              path="/from-no-more-enabling"
              element={<FromNoMoreEnabling />}
            />
            <Route
              path="/intervention-readiness"
              element={<InterventionReadiness />}
            />
            <Route
              path="/party-wreckers-podcast"
              element={<PartyWreckersPodcast />}
            />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/self-assessment" element={<SelfAssessment />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/family-portal" element={<FamilyPortal />} />
            <Route path="/reschedule" element={<Reschedule />} />
            <Route path="/substance-guide" element={<SubstanceGuide />} />
            <Route
              path="/intervention-toolkit"
              element={<InterventionToolkit />}
            />
            <Route path="/intervention-faq" element={<InterventionFAQPage />} />
            <Route path="/service-areas" element={<ServiceAreas />} />
            <Route
              path="/how-intervention-works"
              element={<HowInterventionWorks />}
            />
            <Route
              path="/intervention-answers"
              element={<InterventionAnswers />}
            />
            <Route
              path="/intervention-answers/:answerSlug"
              element={<InterventionAnswerDetail />}
            />
            <Route
              path="/which-help-do-we-need"
              element={<WhichHelpDoWeNeed />}
            />
            <Route
              path="/when-is-it-time-for-an-intervention"
              element={<WhenIsItTime />}
            />
            <Route
              path="/what-if-they-refuse-treatment"
              element={<WhatIfTheyRefuse />}
            />
            <Route
              path="/what-makes-matt-different"
              element={<WhatMakesMattDifferent />}
            />
            <Route path="/intervention-cost" element={<InterventionCost />} />
            <Route
              path="/book-intervention-consultation"
              element={<BookInterventionConsultation />}
            />
            <Route path="/before-you-call" element={<BeforeYouCall />} />
            <Route path="/after-consultation" element={<AfterConsultation />} />
            <Route path="/start-here" element={<StartHere />} />
            <Route path="/start-contract" element={<StartContract />} />
            <Route path="/intervention-agreement" element={<StartContract />} />
            <Route path="/unsubscribe" element={<Unsubscribe />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
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
            <Route
              path="/san-francisco-california"
              element={<SanFranciscoCalifornia />}
            />
            <Route
              path="/los-angeles-california"
              element={<LosAngelesCalifornia />}
            />
            <Route
              path="/sacramento-california"
              element={<SacramentoCalifornia />}
            />
            <Route path="/oakland-california" element={<OaklandCalifornia />} />
            <Route
              path="/san-jose-california"
              element={<SanJoseCalifornia />}
            />
            <Route
              path="/long-beach-california"
              element={<LongBeachCalifornia />}
            />
            <Route
              path="/pasadena-california"
              element={<PasadenaCalifornia />}
            />
            <Route
              path="/orange-county-california"
              element={<OrangeCountyCalifornia />}
            />
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
            <Route
              path="/colorado-springs-colorado"
              element={<ColoradoSpringsColorado />}
            />
            <Route path="/aurora-colorado" element={<AuroraColorado />} />
            <Route
              path="/fort-collins-colorado"
              element={<FortCollinsColorado />}
            />
            <Route
              path="/albuquerque-new-mexico"
              element={<AlbuquerqueNewMexico />}
            />
            <Route path="/santa-fe-new-mexico" element={<SantaFeNewMexico />} />
            <Route
              path="/las-cruces-new-mexico"
              element={<LasCrucesNewMexico />}
            />
            <Route path="/san-antonio-texas" element={<SanAntonioTexas />} />
            <Route path="/fort-worth-texas" element={<FortWorthTexas />} />
            <Route path="/el-paso-texas" element={<ElPasoTexas />} />
            <Route path="/plano-texas" element={<PlanoTexas />} />
            <Route path="/chicago-illinois" element={<ChicagoIllinois />} />
            <Route
              path="/minneapolis-minnesota"
              element={<MinneapolisMinnesota />}
            />
            <Route
              path="/kansas-city-missouri"
              element={<KansasCityMissouri />}
            />
            <Route path="/houston-texas" element={<HoustonTexas />} />
            <Route
              path="/new-orleans-louisiana"
              element={<NewOrleansLouisiana />}
            />
            <Route path="/detroit-michigan" element={<DetroitMichigan />} />
            <Route path="/miami-florida" element={<MiamiFlorida />} />
            <Route
              path="/nashville-tennessee"
              element={<NashvilleTennessee />}
            />
            <Route
              path="/indianapolis-indiana"
              element={<IndianapolisIndiana />}
            />
            <Route path="/spokane-washington" element={<SpokaneWashington />} />
            <Route path="/tacoma-washington" element={<TacomaWashington />} />
            <Route
              path="/bellevue-washington"
              element={<BellevueWashington />}
            />
            <Route path="/everett-washington" element={<EverettWashington />} />
            <Route path="/olympia-washington" element={<OlympiaWashington />} />
            <Route path="/yakima-washington" element={<YakimaWashington />} />
            <Route
              path="/vancouver-washington"
              element={<VancouverWashington />}
            />
            <Route path="/bend-oregon" element={<BendOregon />} />
            <Route path="/salem-oregon" element={<SalemOregon />} />
            <Route path="/medford-oregon" element={<MedfordOregon />} />
            <Route path="/hillsboro-oregon" element={<HillsboroOregon />} />
            <Route path="/beaverton-oregon" element={<BeavertonOregon />} />
            <Route path="/gresham-oregon" element={<GreshamOregon />} />
            <Route path="/corvallis-oregon" element={<CorvallisOregon />} />
            <Route
              path="/philadelphia-pennsylvania"
              element={<PhiladelphiaPennsylvania />}
            />
            <Route path="/baltimore-maryland" element={<BaltimoreMaryland />} />
            <Route path="/anchorage-alaska" element={<AnchorageAlaska />} />
            <Route
              path="/knoxville-tennessee"
              element={<KnoxvilleTennessee />}
            />
            <Route path="/columbus-ohio" element={<ColumbusOhio />} />
            <Route path="/omaha-nebraska" element={<OmahaNebraska />} />
            <Route
              path="/oklahoma-city-oklahoma"
              element={<OklahomaCityOklahoma />}
            />

            {/* Hawaii Islands */}
            <Route path="/oahu-hawaii" element={<OahuHawaii />} />
            <Route path="/maui-hawaii" element={<MauiHawaii />} />
            <Route path="/big-island-hawaii" element={<BigIslandHawaii />} />
            <Route path="/kauai-hawaii" element={<KauaiHawaii />} />
            <Route path="/wichita-kansas" element={<WichitaKansas />} />
            <Route
              path="/overland-park-kansas"
              element={<OverlandParkKansas />}
            />
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
            <Route
              path="/newfoundland-labrador"
              element={<NewfoundlandLabrador />}
            />
            <Route
              path="/prince-edward-island"
              element={<PrinceEdwardIsland />}
            />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
