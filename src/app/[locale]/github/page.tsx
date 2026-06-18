import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { GithubContent } from "@/components/sections/github-content";
import { getPathname, type Locale } from "@/i18n/routing";
import { createPageMetadata, getStaticPageAlternatePaths } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: "github" });

  return createPageMetadata({
    title: t("metaTitle"),
    description: t("description"),
    locale: typedLocale,
    canonicalPath: getPathname({ locale: typedLocale, href: "/github" }),
    alternatePaths: getStaticPageAlternatePaths("/github"),
  });
}

export default async function GithubPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <GithubContent locale={locale as Locale} />;
}
