import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { StatusContent } from "@/components/sections/status-content";
import { getPathname, type Locale } from "@/i18n/routing";
import { createPageMetadata, getStaticPageAlternatePaths } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const revalidate = 60;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: "status" });

  return createPageMetadata({
    title: t("metaTitle"),
    description: t("description"),
    locale: typedLocale,
    canonicalPath: getPathname({ locale: typedLocale, href: "/status" }),
    alternatePaths: getStaticPageAlternatePaths("/status"),
  });
}

export default async function StatusPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <StatusContent locale={locale as Locale} />;
}
