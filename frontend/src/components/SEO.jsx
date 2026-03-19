import { Helmet } from 'react-helmet-async';

const OG_IMAGE = 'https://brixtonstudiox.vercel.app/og-image.jpg';
const SITE_NAME = 'Brixton Studio';
const SITE_URL = 'https://brixtonstudiox.vercel.app';

/**
 * Reusable SEO component using react-helmet-async.
 * Adds title, meta description, Open Graph, and Twitter Cards.
 */
export default function SEO({
  title,
  description = 'Brixton Studio — Cinematic Video Production, Social Media Management, and Web & App Development for brands that demand excellence.',
  image = OG_IMAGE,
  url,
  type = 'website',
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Cinematic Branding & Digital Agency`;
  const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@brixtonstudiox" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
