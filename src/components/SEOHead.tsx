import { Helmet } from "react-helmet";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  type?: string;
  image?: string;
  noindex?: boolean;
}

const SEOHead = ({
  title,
  description,
  canonical,
  keywords,
  type = "website",
  image = "https://freedominterventions.com/favicon.jpeg",
  noindex = false,
}: SEOHeadProps) => {
  const fullTitle = title.includes("Freedom Interventions")
    ? title
    : `${title} | Freedom Interventions`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:site_name" content="Freedom Interventions" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO */}
      <meta name="author" content="Freedom Interventions" />
      <meta name="geo.region" content="US-OR" />
      <meta name="geo.placename" content="Oregon" />
    </Helmet>
  );
};

export default SEOHead;
