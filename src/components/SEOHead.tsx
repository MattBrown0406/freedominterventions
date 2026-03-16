import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  type?: string;
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
  geoRegion?: string;
  geoPlacename?: string;
  geoPosition?: string;
  publishedTime?: string;
  modifiedTime?: string;
  twitterCreator?: string;
  section?: string;
  aiDescription?: string;
}

const BASE_URL = "https://freedominterventions.com";

const SEOHead = ({
  title,
  description,
  canonical,
  keywords,
  type = "website",
  image = `${BASE_URL}/favicon.jpeg`,
  imageAlt,
  noindex = false,
  geoRegion = "US-OR",
  geoPlacename = "Oregon",
  geoPosition,
  publishedTime,
  modifiedTime,
  twitterCreator = "@freedominterventions",
  section,
  aiDescription,
}: SEOHeadProps) => {
  const location = useLocation();
  
  // Auto-generate canonical from current pathname if not provided
  // Normalize: strip trailing slashes and ensure lowercase
  const rawPath = location.pathname === "/" ? "" : location.pathname.replace(/\/+$/, "");
  const normalizedPath = rawPath.toLowerCase();
  const resolvedCanonical = canonical || `${BASE_URL}${normalizedPath}`;
  
  const fullTitle = title.includes("Freedom Interventions")
    ? title
    : `${title} | Freedom Interventions`;
  
  const truncatedDescription = description.length > 160 
    ? description.substring(0, 157) + "..."
    : description;

  const extendedAiDescription = aiDescription || `${description} Freedom Interventions provides professional addiction intervention services with over 20 years of experience. Call (541) 838-6009 for a free consultation. Serving all 50 US states and Canadian provinces 24/7.`;

  const ogImageAlt = imageAlt || `${title} - Freedom Interventions addiction intervention services`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={truncatedDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={resolvedCanonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {!noindex && <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />}

      <meta name="ai:description" content={extendedAiDescription} />
      <meta name="llm:description" content={extendedAiDescription} />
      <link rel="ai-context" href={`${BASE_URL}/llms.txt`} />
      <link rel="ai-context-full" href={`${BASE_URL}/llms-full.txt`} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={truncatedDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:url" content={resolvedCanonical} />
      <meta property="og:site_name" content="Freedom Interventions" />
      <meta property="og:locale" content="en_US" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {section && <meta property="article:section" content={section} />}
      {type === "article" && <meta property="article:author" content="Freedom Interventions" />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={truncatedDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={ogImageAlt} />
      <meta name="twitter:site" content="@freedominterventions" />
      <meta name="twitter:creator" content={twitterCreator} />

      <meta name="author" content="Freedom Interventions" />
      <meta name="publisher" content="Freedom Interventions" />
      <meta name="geo.region" content={geoRegion} />
      <meta name="geo.placename" content={geoPlacename} />
      {geoPosition && <meta name="geo.position" content={geoPosition} />}
      {geoPosition && <meta name="ICBM" content={geoPosition} />}
      
      <meta name="format-detection" content="telephone=yes" />
      <meta name="theme-color" content="#1a365d" />
      <meta name="apple-mobile-web-app-title" content="Freedom Interventions" />
      <meta name="application-name" content="Freedom Interventions" />
    </Helmet>
  );
};

export default SEOHead;
