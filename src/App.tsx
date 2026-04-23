import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy, type ComponentType } from "react";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const pageModules: Record<string, () => Promise<ComponentType>> = import.meta.glob(
  ["./pages/*.tsx", "!./pages/Index.tsx", "!./pages/NotFound.tsx"],
  { import: "default" }
);

const lazyPage = (name: string) => {
  const importer = pageModules[`./pages/${name}.tsx`];
  if (!importer) {
    throw new Error(`Page component ./pages/${name}.tsx not found`);
  }
  return lazy(async () => {
    const component = (await importer()) as ComponentType;
    return { default: component };
  });
};

const camelToPath = (name: string) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();

const createRouteConfig = (names: string[]) =>
  names.map((name) => ({
    path: `/${camelToPath(name)}`,
    Component: lazyPage(name),
  }));

const queryClient = new QueryClient();

const Reschedule = lazyPage("Reschedule");
const Interventionist = lazyPage("Interventionist");
const FamilyIntervention = lazyPage("FamilyIntervention");
const CrisisSupport = lazyPage("CrisisSupport");
const TreatmentPlanning = lazyPage("TreatmentPlanning");
const AftercareGuidance = lazyPage("AftercareGuidance");
const Testimonials = lazyPage("Testimonials");
const Contact = lazyPage("Contact");
const PartyWreckersPodcast = lazyPage("PartyWreckersPodcast");
const Blog = lazyPage("Blog");
const BlogPost = lazyPage("BlogPost");
const Assessment = lazyPage("Assessment");
const SelfAssessment = lazyPage("SelfAssessment");
const AdminLogin = lazyPage("AdminLogin");
const AdminDashboard = lazyPage("AdminDashboard");
const SubstanceGuide = lazyPage("SubstanceGuide");
const InterventionToolkit = lazyPage("InterventionToolkit");
const InterventionFAQPage = lazyPage("InterventionFAQPage");
const ServiceAreas = lazyPage("ServiceAreas");
const FamilyReadinessIntensive = lazyPage("FamilyReadinessIntensive");
const StartContract = lazyPage("StartContract");

const usStates = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "NewHampshire",
  "NewJersey",
  "NewMexico",
  "NewYork",
  "NorthCarolina",
  "NorthDakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "RhodeIsland",
  "SouthCarolina",
  "SouthDakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "WestVirginia",
  "Wisconsin",
  "Wyoming",
];

const usCities = [
  "PortlandOregon",
  "SeattleWashington",
  "EugeneOregon",
  "SanFranciscoCalifornia",
  "LosAngelesCalifornia",
  "PhoenixArizona",
  "AustinTexas",
  "DallasTexas",
  "LasVegasNevada",
  "SaltLakeCityUtah",
  "BoiseIdaho",
  "DenverColorado",
  "ChicagoIllinois",
  "MinneapolisMinnesota",
  "KansasCityMissouri",
  "HoustonTexas",
  "NewOrleansLouisiana",
  "DetroitMichigan",
  "MiamiFlorida",
  "NashvilleTennessee",
  "IndianapolisIndiana",
  "SpokaneWashington",
  "BendOregon",
  "PhiladelphiaPennsylvania",
  "BaltimoreMaryland",
  "AnchorageAlaska",
  "KnoxvilleTennessee",
  "ColumbusOhio",
  "OmahaNebraska",
  "OklahomaCityOklahoma",
];

const canadianProvinces = [
  "BritishColumbia",
  "Alberta",
  "Ontario",
  "Quebec",
  "Manitoba",
  "Saskatchewan",
  "NovaScotia",
  "NewBrunswick",
  "NewfoundlandLabrador",
  "PrinceEdwardIsland",
];

const stateRoutes = createRouteConfig(usStates);
const cityRoutes = createRouteConfig(usCities);
const provinceRoutes = createRouteConfig(canadianProvinces);

const LoadingScreen = () => (
  <div className="py-32 text-center text-muted-foreground">Loading…</div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* <TawkToChat /> */}
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/interventionist" element={<Interventionist />} />
            <Route path="/family-intervention" element={<FamilyIntervention />} />
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
            <Route path="/family-readiness-intensive" element={<FamilyReadinessIntensive />} />
            <Route path="/start-contract" element={<StartContract />} />

            {stateRoutes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
            {cityRoutes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
            {provinceRoutes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}

            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
