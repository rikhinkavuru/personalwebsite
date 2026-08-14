/**
 * Canonical origin for metadata, OG tags, sitemap, and robots.
 * Override with NEXT_PUBLIC_SITE_URL if the site ever moves.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rikhin.virahacks.com";

export const siteName = "Rikhin Kavuru";

export const siteDescription =
  "Machine learning and computational biology. Currently at Convexia and the Broad Institute of MIT and Harvard.";

export const colors = {
  bg: "#f5f4f0",
  ink: "#1a1a1a",
  muted: "#6b6b6b",
  accent: "#e85d04",
  rule: "#d4d4d4",
};
