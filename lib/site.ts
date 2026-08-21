/**
 * Canonical origin for metadata, OG tags, sitemap, and robots.
 * Override with NEXT_PUBLIC_SITE_URL if the site ever moves.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rikhin.virahacks.com";

export const siteName = "Rikhin Kavuru";

export const siteDescription =
  "Machine learning for biology. Currently at Convexia and the Broad Institute of MIT and Harvard.";

export const colors = {
  bg: "#ffffff",
  ink: "#2d2d2d",
  muted: "#79716b",
  faint: "#c7c2bc",
  border: "#ececec",
  darkBg: "#101010",
  darkInk: "#f5f5f4",
};
