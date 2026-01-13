import { Helmet } from "react-helmet";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  type?: string;
  image?: string;
  noindex?: boolean;
  geoRegion?: string;
  geoPlacename?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const SEOHead = ({
  title,
  description,
  canonical,
  keywords,
  type = "website",
  image = "https://freedominterventions.com/favicon.jpeg",
  noindex = false,
  geoRegion = "US-OR",
  geoPlacename = "Oregon",
  publishedTime,
  modifiedTime,
}: SEOHeadProps) => {
  const fullTitle = title.includes("Freedom Interventions")
    ? title
    : `${title} | Freedom Interventions`;
  
  // Ensure description is under 160 characters
  const truncatedDescription = description.length > 160 
    ? description.substring(0, 157) + "..."
    : description;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={truncatedDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {!noindex && <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={truncatedDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:site_name" content="Freedom Interventions" />
      <meta property="og:locale" content="en_US" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={truncatedDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@freedominterventions" />

      {/* Additional SEO */}
      <meta name="author" content="Freedom Interventions" />
      <meta name="publisher" content="Freedom Interventions" />
      <meta name="geo.region" content={geoRegion} />
      <meta name="geo.placename" content={geoPlacename} />
      
      {/* Mobile & App */}
      <meta name="format-detection" content="telephone=yes" />
      <meta name="theme-color" content="#1a365d" />
    </Helmet>
  );
};

export default SEOHead;
