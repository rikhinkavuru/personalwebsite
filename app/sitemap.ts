import type { MetadataRoute } from "next";
import { projects } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/projects`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/research`, changeFrequency: "monthly", priority: 0.8 },
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
