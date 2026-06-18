import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { EngineeringContent } from "@/components/sections/engineering-content";
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
  const t = await getTranslations({ locale, namespace: "engineeringPage" });

  return createPageMetadata({
    title: t("metaTitle"),
    description: t("description"),
    locale: typedLocale,
    canonicalPath: getPathname({ locale: typedLocale, href: "/engineering" }),
    alternatePaths: getStaticPageAlternatePaths("/engineering"),
  });
}

export default async function EngineeringPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <EngineeringContent locale={locale as Locale} />;
}
