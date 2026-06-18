import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { ArchitectureContent } from "@/components/sections/architecture-content";
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
  const t = await getTranslations({ locale, namespace: "architecture" });

  return createPageMetadata({
    title: t("metaTitle"),
    description: t("description"),
    locale: typedLocale,
    canonicalPath: getPathname({ locale: typedLocale, href: "/architecture" }),
    alternatePaths: getStaticPageAlternatePaths("/architecture"),
  });
}

export default async function ArchitecturePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ArchitectureContent locale={locale as Locale} />;
}
