import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { getOpenGraphLocale, locales } from "@/i18n/routing";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/constants/site";
import type { BlogPost, Project } from "@/types";
import { getPathname } from "@/i18n/routing";

const siteUrl = SITE_CONFIG.url;
const ogImage = SITE_CONFIG.ogImage;

export function getOgImageUrl(path?: string): string {
  const image = path ?? ogImage;
  return image.startsWith("http") ? image : `${siteUrl}${image}`;
}

export function buildAlternateLanguages(paths: Record<Locale, string>) {
  return Object.fromEntries(
    locales.map((locale) => [locale, `${siteUrl}${paths[locale]}`]),
  );
}

export function createMetadata(
  locale: Locale,
  messages: {
    siteTitle: string;
    siteDescription: string;
    ogImageAlt: string;
    portfolioName: string;
  },
): Metadata {
  const title = `${SITE_CONFIG.fullName} | ${messages.siteTitle}`;
  const description = messages.siteDescription;
  const imageUrl = getOgImageUrl();
  const homePath = `/${locale}`;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${SITE_CONFIG.fullName}`,
    },
    description,
    authors: [{ name: SITE_CONFIG.author }],
    creator: SITE_CONFIG.author,
    openGraph: {
      type: "website",
      locale: getOpenGraphLocale(locale),
      url: `${siteUrl}${homePath}`,
      title,
      description,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: messages.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@vivianezzt",
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `${siteUrl}${homePath}`,
      languages: buildAlternateLanguages({
        "pt-BR": "/pt-BR",
        "en-US": "/en-US",
      }),
    },
  };
}

export function createPageMetadata({
  title,
  description,
  locale,
  canonicalPath,
  alternatePaths,
  type = "website",
  image,
}: {
  title: string;
  description: string;
  locale: Locale;
  canonicalPath: string;
  alternatePaths: Record<Locale, string>;
  type?: "website" | "article";
  image?: string;
}): Metadata {
  const url = `${siteUrl}${canonicalPath}`;
  const imageUrl = getOgImageUrl(image);

  return {
    title,
    description,
    openGraph: {
      type,
      locale: getOpenGraphLocale(locale),
      url,
      title,
      description,
      siteName: SITE_CONFIG.name,
      images: [{ url: imageUrl, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
      languages: buildAlternateLanguages(alternatePaths),
    },
  };
}

export function createPersonJsonLd(locale: Locale, description: string) {
  const homePath = `/${locale}`;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_CONFIG.fullName,
    jobTitle: SITE_CONFIG.title,
    image: `${siteUrl}${SITE_CONFIG.profileImage}`,
    url: `${siteUrl}${homePath}`,
    description,
    knowsAbout: SITE_CONFIG.keywords,
    sameAs: [
      SOCIAL_LINKS.linkedin,
      SOCIAL_LINKS.github,
      SOCIAL_LINKS.instagram,
    ],
  };
}

export function createWebsiteJsonLd(
  locale: Locale,
  description: string,
  portfolioLabel: string,
) {
  const homePath = `/${locale}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${SITE_CONFIG.fullName} — ${portfolioLabel}`,
    url: `${siteUrl}${homePath}`,
    description,
    inLanguage: locale,
    publisher: {
      "@type": "Person",
      name: SITE_CONFIG.fullName,
    },
  };
}

export function createJsonLd(
  locale: Locale,
  description: string,
  portfolioLabel: string,
) {
  return [
    createPersonJsonLd(locale, description),
    createWebsiteJsonLd(locale, description, portfolioLabel),
  ];
}

export function createBlogPostingJsonLd(
  post: BlogPost,
  locale: Locale,
  canonicalPath: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: SITE_CONFIG.fullName,
      url: `${siteUrl}/${locale}`,
    },
    publisher: {
      "@type": "Person",
      name: SITE_CONFIG.fullName,
    },
    url: `${siteUrl}${canonicalPath}`,
    keywords: post.tags.join(", "),
    inLanguage: locale,
    image: getOgImageUrl(),
  };
}

export function createSoftwareApplicationJsonLd(
  project: Project,
  locale: Locale,
  canonicalPath: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.description,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    url: project.deployUrl ?? `${siteUrl}${canonicalPath}`,
    author: {
      "@type": "Person",
      name: SITE_CONFIG.fullName,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: locale === "pt-BR" ? "BRL" : "USD",
    },
  };
}

export function getProjectAlternatePaths(slug: string): Record<Locale, string> {
  return {
    "pt-BR": getPathname({
      locale: "pt-BR",
      href: { pathname: "/projects/[slug]", params: { slug } },
    }),
    "en-US": getPathname({
      locale: "en-US",
      href: { pathname: "/projects/[slug]", params: { slug } },
    }),
  };
}

export function getBlogAlternatePaths(slug: string): Record<Locale, string> {
  return {
    "pt-BR": getPathname({
      locale: "pt-BR",
      href: { pathname: "/blog/[slug]", params: { slug } },
    }),
    "en-US": getPathname({
      locale: "en-US",
      href: { pathname: "/blog/[slug]", params: { slug } },
    }),
  };
}

export function getBlogListAlternatePaths(): Record<Locale, string> {
  return {
    "pt-BR": getPathname({ locale: "pt-BR", href: "/blog" }),
    "en-US": getPathname({ locale: "en-US", href: "/blog" }),
  };
}

export function getRecruiterAlternatePaths(): Record<Locale, string> {
  return {
    "pt-BR": getPathname({ locale: "pt-BR", href: "/recruiter" }),
    "en-US": getPathname({ locale: "en-US", href: "/recruiter" }),
  };
}

export function getStaticPageAlternatePaths(
  href: "/changelog" | "/now" | "/media-kit" | "/press-kit",
): Record<Locale, string> {
  return {
    "pt-BR": getPathname({ locale: "pt-BR", href }),
    "en-US": getPathname({ locale: "en-US", href }),
  };
}
