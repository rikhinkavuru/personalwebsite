import type { MetadataRoute } from "next";
import { colors, siteDescription, siteName } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: "Rikhin",
    description: siteDescription,
    start_url: "/",
    display: "standalone",
    background_color: colors.bg,
    theme_color: colors.bg,
  };
}
