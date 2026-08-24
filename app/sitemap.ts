import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/experience`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/projects`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/research`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
