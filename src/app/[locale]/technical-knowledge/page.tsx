import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { TechnicalKnowledgeContent } from "@/components/sections/technical-knowledge-content";
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
    namespace: "technicalKnowledgePage",
  });

  return createPageMetadata({
    title: t("metaTitle"),
    description: t("description"),
    locale: typedLocale,
    canonicalPath: getPathname({
      locale: typedLocale,
      href: "/technical-knowledge",
    }),
    alternatePaths: getStaticPageAlternatePaths("/technical-knowledge"),
  });
}

export default async function TechnicalKnowledgePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TechnicalKnowledgeContent locale={locale as Locale} />;
}
