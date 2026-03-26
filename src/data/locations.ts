// Centralized location data for SEO and navigation

export interface StateData {
  name: string;
  slug: string;
  abbreviation: string;
  region: string;
}

export interface CityData {
  name: string;
  state: string;
  stateAbbr: string;
  slug: string;
}

export interface ProvinceData {
  name: string;
  slug: string;
  abbreviation: string;
}

export const usRegions = {
  "West Coast": ["Oregon", "Washington", "California", "Alaska", "Hawaii"],
  "Mountain": ["Idaho", "Montana", "Wyoming", "Colorado", "Utah", "Nevada", "Arizona", "New Mexico"],
  "Midwest": ["Minnesota", "Wisconsin", "Michigan", "Ohio", "Indiana", "Illinois", "Iowa", "Missouri", "Kansas", "Nebraska", "North Dakota", "South Dakota"],
  "South": ["Texas", "Oklahoma", "Arkansas", "Louisiana", "Mississippi", "Alabama", "Tennessee", "Kentucky", "Georgia", "Florida", "South Carolina", "North Carolina", "Virginia", "West Virginia"],
  "Northeast": ["New York", "Pennsylvania", "New Jersey", "Delaware", "Maryland", "Connecticut", "Rhode Island", "Massachusetts", "Vermont", "New Hampshire", "Maine"],
};

export const usStates: StateData[] = [
  { name: "Alabama", slug: "alabama", abbreviation: "AL", region: "South" },
  { name: "Alaska", slug: "alaska", abbreviation: "AK", region: "West Coast" },
  { name: "Arizona", slug: "arizona", abbreviation: "AZ", region: "Mountain" },
  { name: "Arkansas", slug: "arkansas", abbreviation: "AR", region: "South" },
  { name: "California", slug: "california", abbreviation: "CA", region: "West Coast" },
  { name: "Colorado", slug: "colorado", abbreviation: "CO", region: "Mountain" },
  { name: "Connecticut", slug: "connecticut", abbreviation: "CT", region: "Northeast" },
  { name: "Delaware", slug: "delaware", abbreviation: "DE", region: "Northeast" },
  { name: "Florida", slug: "florida", abbreviation: "FL", region: "South" },
  { name: "Georgia", slug: "georgia", abbreviation: "GA", region: "South" },
  { name: "Hawaii", slug: "hawaii", abbreviation: "HI", region: "West Coast" },
  { name: "Idaho", slug: "idaho", abbreviation: "ID", region: "Mountain" },
  { name: "Illinois", slug: "illinois", abbreviation: "IL", region: "Midwest" },
  { name: "Indiana", slug: "indiana", abbreviation: "IN", region: "Midwest" },
  { name: "Iowa", slug: "iowa", abbreviation: "IA", region: "Midwest" },
  { name: "Kansas", slug: "kansas", abbreviation: "KS", region: "Midwest" },
  { name: "Kentucky", slug: "kentucky", abbreviation: "KY", region: "South" },
  { name: "Louisiana", slug: "louisiana", abbreviation: "LA", region: "South" },
  { name: "Maine", slug: "maine", abbreviation: "ME", region: "Northeast" },
  { name: "Maryland", slug: "maryland", abbreviation: "MD", region: "Northeast" },
  { name: "Massachusetts", slug: "massachusetts", abbreviation: "MA", region: "Northeast" },
  { name: "Michigan", slug: "michigan", abbreviation: "MI", region: "Midwest" },
  { name: "Minnesota", slug: "minnesota", abbreviation: "MN", region: "Midwest" },
  { name: "Mississippi", slug: "mississippi", abbreviation: "MS", region: "South" },
  { name: "Missouri", slug: "missouri", abbreviation: "MO", region: "Midwest" },
  { name: "Montana", slug: "montana", abbreviation: "MT", region: "Mountain" },
  { name: "Nebraska", slug: "nebraska", abbreviation: "NE", region: "Midwest" },
  { name: "Nevada", slug: "nevada", abbreviation: "NV", region: "Mountain" },
  { name: "New Hampshire", slug: "new-hampshire", abbreviation: "NH", region: "Northeast" },
  { name: "New Jersey", slug: "new-jersey", abbreviation: "NJ", region: "Northeast" },
  { name: "New Mexico", slug: "new-mexico", abbreviation: "NM", region: "Mountain" },
  { name: "New York", slug: "new-york", abbreviation: "NY", region: "Northeast" },
  { name: "North Carolina", slug: "north-carolina", abbreviation: "NC", region: "South" },
  { name: "North Dakota", slug: "north-dakota", abbreviation: "ND", region: "Midwest" },
  { name: "Ohio", slug: "ohio", abbreviation: "OH", region: "Midwest" },
  { name: "Oklahoma", slug: "oklahoma", abbreviation: "OK", region: "South" },
  { name: "Oregon", slug: "oregon", abbreviation: "OR", region: "West Coast" },
  { name: "Pennsylvania", slug: "pennsylvania", abbreviation: "PA", region: "Northeast" },
  { name: "Rhode Island", slug: "rhode-island", abbreviation: "RI", region: "Northeast" },
  { name: "South Carolina", slug: "south-carolina", abbreviation: "SC", region: "South" },
  { name: "South Dakota", slug: "south-dakota", abbreviation: "SD", region: "Midwest" },
  { name: "Tennessee", slug: "tennessee", abbreviation: "TN", region: "South" },
  { name: "Texas", slug: "texas", abbreviation: "TX", region: "South" },
  { name: "Utah", slug: "utah", abbreviation: "UT", region: "Mountain" },
  { name: "Vermont", slug: "vermont", abbreviation: "VT", region: "Northeast" },
  { name: "Virginia", slug: "virginia", abbreviation: "VA", region: "South" },
  { name: "Washington", slug: "washington", abbreviation: "WA", region: "West Coast" },
  { name: "West Virginia", slug: "west-virginia", abbreviation: "WV", region: "South" },
  { name: "Wisconsin", slug: "wisconsin", abbreviation: "WI", region: "Midwest" },
  { name: "Wyoming", slug: "wyoming", abbreviation: "WY", region: "Mountain" },
];

export const usCities: CityData[] = [
  { name: "Portland", state: "Oregon", stateAbbr: "OR", slug: "portland-oregon" },
  { name: "Eugene", state: "Oregon", stateAbbr: "OR", slug: "eugene-oregon" },
  { name: "Bend", state: "Oregon", stateAbbr: "OR", slug: "bend-oregon" },
  { name: "Salem", state: "Oregon", stateAbbr: "OR", slug: "salem-oregon" },
  { name: "Medford", state: "Oregon", stateAbbr: "OR", slug: "medford-oregon" },
  { name: "Hillsboro", state: "Oregon", stateAbbr: "OR", slug: "hillsboro-oregon" },
  { name: "Beaverton", state: "Oregon", stateAbbr: "OR", slug: "beaverton-oregon" },
  { name: "Gresham", state: "Oregon", stateAbbr: "OR", slug: "gresham-oregon" },
  { name: "Corvallis", state: "Oregon", stateAbbr: "OR", slug: "corvallis-oregon" },
  { name: "Seattle", state: "Washington", stateAbbr: "WA", slug: "seattle-washington" },
  { name: "Spokane", state: "Washington", stateAbbr: "WA", slug: "spokane-washington" },
  { name: "Tacoma", state: "Washington", stateAbbr: "WA", slug: "tacoma-washington" },
  { name: "Bellevue", state: "Washington", stateAbbr: "WA", slug: "bellevue-washington" },
  { name: "Everett", state: "Washington", stateAbbr: "WA", slug: "everett-washington" },
  { name: "Olympia", state: "Washington", stateAbbr: "WA", slug: "olympia-washington" },
  { name: "Yakima", state: "Washington", stateAbbr: "WA", slug: "yakima-washington" },
  { name: "Vancouver", state: "Washington", stateAbbr: "WA", slug: "vancouver-washington" },
  { name: "San Francisco", state: "California", stateAbbr: "CA", slug: "san-francisco-california" },
  { name: "Los Angeles", state: "California", stateAbbr: "CA", slug: "los-angeles-california" },
  { name: "Sacramento", state: "California", stateAbbr: "CA", slug: "sacramento-california" },
  { name: "Oakland", state: "California", stateAbbr: "CA", slug: "oakland-california" },
  { name: "San Jose", state: "California", stateAbbr: "CA", slug: "san-jose-california" },
  { name: "Long Beach", state: "California", stateAbbr: "CA", slug: "long-beach-california" },
  { name: "Pasadena", state: "California", stateAbbr: "CA", slug: "pasadena-california" },
  { name: "Orange County", state: "California", stateAbbr: "CA", slug: "orange-county-california" },
  { name: "Anaheim", state: "California", stateAbbr: "CA", slug: "anaheim-california" },
  { name: "Irvine", state: "California", stateAbbr: "CA", slug: "irvine-california" },
  { name: "Anchorage", state: "Alaska", stateAbbr: "AK", slug: "anchorage-alaska" },
  { name: "Phoenix", state: "Arizona", stateAbbr: "AZ", slug: "phoenix-arizona" },
  { name: "Tucson", state: "Arizona", stateAbbr: "AZ", slug: "tucson-arizona" },
  { name: "Scottsdale", state: "Arizona", stateAbbr: "AZ", slug: "scottsdale-arizona" },
  { name: "Mesa", state: "Arizona", stateAbbr: "AZ", slug: "mesa-arizona" },
  { name: "Chandler", state: "Arizona", stateAbbr: "AZ", slug: "chandler-arizona" },
  { name: "Denver", state: "Colorado", stateAbbr: "CO", slug: "denver-colorado" },
  { name: "Salt Lake City", state: "Utah", stateAbbr: "UT", slug: "salt-lake-city-utah" },
  { name: "Provo", state: "Utah", stateAbbr: "UT", slug: "provo-utah" },
  { name: "Ogden", state: "Utah", stateAbbr: "UT", slug: "ogden-utah" },
  { name: "Las Vegas", state: "Nevada", stateAbbr: "NV", slug: "las-vegas-nevada" },
  { name: "Henderson", state: "Nevada", stateAbbr: "NV", slug: "henderson-nevada" },
  { name: "Reno", state: "Nevada", stateAbbr: "NV", slug: "reno-nevada" },
  { name: "Boise", state: "Idaho", stateAbbr: "ID", slug: "boise-idaho" },
  { name: "Nampa", state: "Idaho", stateAbbr: "ID", slug: "nampa-idaho" },
  { name: "Meridian", state: "Idaho", stateAbbr: "ID", slug: "meridian-idaho" },
  { name: "Chicago", state: "Illinois", stateAbbr: "IL", slug: "chicago-illinois" },
  { name: "Minneapolis", state: "Minnesota", stateAbbr: "MN", slug: "minneapolis-minnesota" },
  { name: "Detroit", state: "Michigan", stateAbbr: "MI", slug: "detroit-michigan" },
  { name: "Columbus", state: "Ohio", stateAbbr: "OH", slug: "columbus-ohio" },
  { name: "Indianapolis", state: "Indiana", stateAbbr: "IN", slug: "indianapolis-indiana" },
  { name: "Kansas City", state: "Missouri", stateAbbr: "MO", slug: "kansas-city-missouri" },
  { name: "Omaha", state: "Nebraska", stateAbbr: "NE", slug: "omaha-nebraska" },
  { name: "Austin", state: "Texas", stateAbbr: "TX", slug: "austin-texas" },
  { name: "Dallas", state: "Texas", stateAbbr: "TX", slug: "dallas-texas" },
  { name: "Houston", state: "Texas", stateAbbr: "TX", slug: "houston-texas" },
  { name: "Oklahoma City", state: "Oklahoma", stateAbbr: "OK", slug: "oklahoma-city-oklahoma" },
  { name: "New Orleans", state: "Louisiana", stateAbbr: "LA", slug: "new-orleans-louisiana" },
  { name: "Nashville", state: "Tennessee", stateAbbr: "TN", slug: "nashville-tennessee" },
  { name: "Knoxville", state: "Tennessee", stateAbbr: "TN", slug: "knoxville-tennessee" },
  { name: "Miami", state: "Florida", stateAbbr: "FL", slug: "miami-florida" },
  { name: "Philadelphia", state: "Pennsylvania", stateAbbr: "PA", slug: "philadelphia-pennsylvania" },
  { name: "Baltimore", state: "Maryland", stateAbbr: "MD", slug: "baltimore-maryland" },
];

export const canadianProvinces: ProvinceData[] = [
  { name: "British Columbia", slug: "british-columbia", abbreviation: "BC" },
  { name: "Alberta", slug: "alberta", abbreviation: "AB" },
  { name: "Saskatchewan", slug: "saskatchewan", abbreviation: "SK" },
  { name: "Manitoba", slug: "manitoba", abbreviation: "MB" },
  { name: "Ontario", slug: "ontario", abbreviation: "ON" },
  { name: "Quebec", slug: "quebec", abbreviation: "QC" },
  { name: "New Brunswick", slug: "new-brunswick", abbreviation: "NB" },
  { name: "Nova Scotia", slug: "nova-scotia", abbreviation: "NS" },
  { name: "Prince Edward Island", slug: "prince-edward-island", abbreviation: "PE" },
  { name: "Newfoundland and Labrador", slug: "newfoundland-labrador", abbreviation: "NL" },
];

// Helper functions
export const getStatesByRegion = (region: string): StateData[] => {
  return usStates.filter(state => state.region === region);
};

export const getCitiesByState = (stateName: string): CityData[] => {
  return usCities.filter(city => city.state === stateName);
};

export const getAllLocationsCount = () => {
  return {
    states: usStates.length,
    cities: usCities.length,
    provinces: canadianProvinces.length,
    total: usStates.length + usCities.length + canadianProvinces.length,
  };
};
