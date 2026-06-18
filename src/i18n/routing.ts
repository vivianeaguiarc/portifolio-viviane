import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const locales = ["pt-BR", "en-US"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt-BR";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/recruiter": "/recruiter",
    "/changelog": "/changelog",
    "/now": "/now",
    "/media-kit": "/media-kit",
    "/press-kit": "/press-kit",
    "/github": "/github",
    "/projects/[slug]": {
      "pt-BR": "/projetos/[slug]",
      "en-US": "/projects/[slug]",
    },
  },
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getOpenGraphLocale(locale: Locale): string {
  return locale === "pt-BR" ? "pt_BR" : "en_US";
}

export function getHtmlLang(locale: Locale): string {
  return locale;
}

export function getProjectPath(slug: string, locale: Locale): string {
  return locale === "pt-BR"
    ? `/pt-BR/projetos/${slug}`
    : `/en-US/projects/${slug}`;
}

export function getLocalizedPath(path: string, locale: Locale): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized.startsWith(`/${locale}`)) {
    return normalized;
  }
  return `/${locale}${normalized === "/" ? "" : normalized}`;
}
