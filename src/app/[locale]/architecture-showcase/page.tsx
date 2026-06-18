import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { ArchitectureShowcaseContent } from "@/components/sections/architecture-showcase-content";
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
  const t = await getTranslations({
    locale,
    namespace: "architectureShowcasePage",
  });

  return createPageMetadata({
    title: t("metaTitle"),
    description: t("description"),
    locale: typedLocale,
    canonicalPath: getPathname({
      locale: typedLocale,
      href: "/architecture-showcase",
    }),
    alternatePaths: getStaticPageAlternatePaths("/architecture-showcase"),
  });
}

export default async function ArchitectureShowcasePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ArchitectureShowcaseContent locale={locale as Locale} />;
}
