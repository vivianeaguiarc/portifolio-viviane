import type { Metadata } from "next";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/constants/site";

const siteUrl = SITE_CONFIG.url;

export function createMetadata(): Metadata {
  const title = `${SITE_CONFIG.fullName} | ${SITE_CONFIG.title}`;
  const description = SITE_CONFIG.description;

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
          url: SITE_CONFIG.profileImage,
          width: 1200,
          height: 630,
          alt: `Foto profissional de ${SITE_CONFIG.fullName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@vivianezzt",
      images: [SITE_CONFIG.profileImage],
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

export function createJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_CONFIG.fullName,
    jobTitle: SITE_CONFIG.title,
    image: `${SITE_CONFIG.url}${SITE_CONFIG.profileImage}`,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    knowsAbout: SITE_CONFIG.keywords,
    sameAs: [
      SOCIAL_LINKS.linkedin,
      SOCIAL_LINKS.github,
      SOCIAL_LINKS.instagram,
    ],
  };
}
