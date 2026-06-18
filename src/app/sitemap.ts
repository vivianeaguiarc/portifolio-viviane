import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/constants/site";
import { BLOG_POSTS } from "@/data/blog-posts";
import { PROJECTS } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages = PROJECTS.map((project) => ({
    url: `${SITE_CONFIG.url}/projetos/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogPages = BLOG_POSTS.map((post) => ({
    url: `${SITE_CONFIG.url}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE_CONFIG.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_CONFIG.url}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_CONFIG.url}/recruiter`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.95,
    },
    ...blogPages,
    ...projectPages,
  ];
}
