import React from "react";
import { Helmet } from "react-helmet";

const SEO = ({
  title,
  description,
  keywords = "",
  image = "https://befrank.vsmthane.org/og-image.jpg",
  url = "https://befrank.vsmthane.org/",
  type = "website",
}) => {
  const siteName = "Be Frank | Vidyadaan Sahayyak Mandal, Thane";
  const fullTitle = title ? `${title} | Be Frank` : siteName;

  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Vidyadaan Sahayyak Mandal, Thane" />
      <meta name="robots" content="index, follow" />

      {/* Canonical */}
      <link rel="canonical" href={url} />

      {/* Open Graph (Facebook, LinkedIn) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#2692d1" />
    </Helmet>
  );
};

export default SEO;
