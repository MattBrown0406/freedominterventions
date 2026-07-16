export type CallRoutingSite =
  | "freedom_interventions"
  | "no_more_enabling"
  | "sober_helpline"
  | "party_wreckers"
  | "openclaw";

export const fallbackFreedomPhoneNumber = "+14582988000";

// OpenClaw numbers will be added here as each source-specific number is ready.
export const openClawRoutingNumbers: Partial<Record<CallRoutingSite, string>> = {
  freedom_interventions: fallbackFreedomPhoneNumber,
};

export const openClawSiteKey = (source: string): CallRoutingSite => {
  if (source.includes("no_more_enabling") || source.includes("nme")) return "no_more_enabling";
  if (source.includes("sober_helpline") || source.includes("family_squares")) return "sober_helpline";
  if (source.includes("party_wreckers")) return "party_wreckers";
  if (source.includes("openclaw")) return "openclaw";
  return "freedom_interventions";
};

export const getOpenClawCampaignKey = (site: CallRoutingSite, location: string) => `${site}:${location}`;

export const getOpenClawRoutingNumber = (site: CallRoutingSite) =>
  openClawRoutingNumbers[site] || fallbackFreedomPhoneNumber;

export const getOpenClawRoutingStatus = (site: CallRoutingSite) =>
  openClawRoutingNumbers[site] ? "configured" : "pending_openclaw_number";
