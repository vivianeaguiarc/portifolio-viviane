import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { MediaKitContent } from "@/components/sections/media-kit-content";
import { SITE_CONFIG } from "@/constants/site";
import { getPathname, type Locale } from "@/i18n/routing";
import { createPageMetadata, getStaticPageAlternatePaths } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: "mediaKit" });

  return createPageMetadata({
    title: `${t("title")} | ${SITE_CONFIG.fullName}`,
    description: t("description"),
    locale: typedLocale,
    canonicalPath: getPathname({ locale: typedLocale, href: "/media-kit" }),
    alternatePaths: getStaticPageAlternatePaths("/media-kit"),
  });
}

export default async function MediaKitPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <MediaKitContent locale={locale as Locale} />;
}
