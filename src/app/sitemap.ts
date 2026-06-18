import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/constants/site";
import { PROJECTS } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages = PROJECTS.map((project) => ({
    url: `${SITE_CONFIG.url}/projetos/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_CONFIG.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectPages,
  ];
}
