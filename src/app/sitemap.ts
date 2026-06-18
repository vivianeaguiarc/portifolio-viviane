import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/constants/site";
import { getAllBlogSlugs } from "@/data/blog";
import { getAllProjectSlugs } from "@/data/projects";
import { getPathname, locales, type Locale } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const homePath = getPathname({ locale, href: "/" });

    const alternateLanguages = Object.fromEntries(
      locales.map((altLocale) => [
        altLocale,
        `${SITE_CONFIG.url}${getPathname({ locale: altLocale, href: "/" })}`,
      ]),
    );

    entries.push({
      url: `${SITE_CONFIG.url}${homePath}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: alternateLanguages },
    });

    const staticPages = [
      "/blog",
      "/recruiter",
      "/changelog",
      "/now",
      "/media-kit",
      "/press-kit",
    ] as const;

    for (const page of staticPages) {
      entries.push({
        url: `${SITE_CONFIG.url}${getPathname({ locale, href: page })}`,
        lastModified: new Date(),
        changeFrequency: page === "/blog" ? "weekly" : "monthly",
        priority: page === "/recruiter" ? 0.95 : page === "/blog" ? 0.9 : 0.85,
        alternates: {
          languages: Object.fromEntries(
            locales.map((altLocale) => [
              altLocale,
              `${SITE_CONFIG.url}${getPathname({ locale: altLocale as Locale, href: page })}`,
            ]),
          ),
        },
      });
    }

    for (const slug of getAllProjectSlugs()) {
      const projectPath = getPathname({
        locale,
        href: { pathname: "/projects/[slug]", params: { slug } },
      });

      entries.push({
        url: `${SITE_CONFIG.url}${projectPath}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((altLocale) => [
              altLocale,
              `${SITE_CONFIG.url}${getPathname({
                locale: altLocale as Locale,
                href: { pathname: "/projects/[slug]", params: { slug } },
              })}`,
            ]),
          ),
        },
      });
    }

    for (const slug of getAllBlogSlugs()) {
      const postPath = getPathname({
        locale,
        href: { pathname: "/blog/[slug]", params: { slug } },
      });

      entries.push({
        url: `${SITE_CONFIG.url}${postPath}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((altLocale) => [
              altLocale,
              `${SITE_CONFIG.url}${getPathname({
                locale: altLocale as Locale,
                href: { pathname: "/blog/[slug]", params: { slug } },
              })}`,
            ]),
          ),
        },
      });
    }
  }

  return entries;
}
