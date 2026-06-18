import type { Metadata } from "next";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/constants/site";
import type { BlogPost, Project } from "@/types";

const siteUrl = SITE_CONFIG.url;
const ogImage = SITE_CONFIG.ogImage;

export function getOgImageUrl(path?: string): string {
  const image = path ?? ogImage;
  return image.startsWith("http") ? image : `${siteUrl}${image}`;
}

export function createMetadata(): Metadata {
  const title = `${SITE_CONFIG.fullName} | ${SITE_CONFIG.title}`;
  const description = SITE_CONFIG.description;
  const imageUrl = getOgImageUrl();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${SITE_CONFIG.fullName}`,
    },
    description,
    keywords: [...SITE_CONFIG.keywords],
    authors: [{ name: SITE_CONFIG.author }],
    creator: SITE_CONFIG.author,
    openGraph: {
      type: "website",
      locale: SITE_CONFIG.locale,
      url: siteUrl,
      title,
      description,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${SITE_CONFIG.fullName} — Portfólio técnico`,
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
      canonical: siteUrl,
    },
  };
}

export function createPageMetadata({
  title,
  description,
  path,
  type = "website",
  image,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
}): Metadata {
  const url = `${siteUrl}${path}`;
  const imageUrl = getOgImageUrl(image);

  return {
    title,
    description,
    openGraph: {
      type,
      locale: SITE_CONFIG.locale,
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
    alternates: { canonical: url },
  };
}

export function createPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_CONFIG.fullName,
    jobTitle: SITE_CONFIG.title,
    image: `${siteUrl}${SITE_CONFIG.profileImage}`,
    url: siteUrl,
    description: SITE_CONFIG.description,
    knowsAbout: SITE_CONFIG.keywords,
    sameAs: [
      SOCIAL_LINKS.linkedin,
      SOCIAL_LINKS.github,
      SOCIAL_LINKS.instagram,
    ],
  };
}

export function createWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${SITE_CONFIG.fullName} — Portfólio`,
    url: siteUrl,
    description: SITE_CONFIG.description,
    inLanguage: "pt-BR",
    publisher: {
      "@type": "Person",
      name: SITE_CONFIG.fullName,
    },
  };
}

export function createJsonLd() {
  return [createPersonJsonLd(), createWebsiteJsonLd()];
}

export function createBlogPostingJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: SITE_CONFIG.fullName,
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: SITE_CONFIG.fullName,
    },
    url: `${siteUrl}/blog/${post.slug}`,
    keywords: post.tags.join(", "),
    inLanguage: "pt-BR",
    image: getOgImageUrl(),
  };
}

export function createSoftwareApplicationJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.description,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    url: project.deployUrl ?? `${siteUrl}/projetos/${project.slug}`,
    author: {
      "@type": "Person",
      name: SITE_CONFIG.fullName,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "BRL",
    },
  };
}
