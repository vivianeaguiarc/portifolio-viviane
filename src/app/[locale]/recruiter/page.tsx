import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { RecruiterContent } from "@/components/sections/recruiter-content";
import { RecruiterJsonLd } from "@/components/shared/recruiter-json-ld";
import { getRecruiterMetadata } from "@/data/recruiter";
import { getPathname, type Locale } from "@/i18n/routing";
import { createPageMetadata, getRecruiterAlternatePaths } from "@/lib/seo";

interface RecruiterPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: RecruiterPageProps): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const recruiterMetadata = getRecruiterMetadata(typedLocale);
  const alternatePaths = getRecruiterAlternatePaths();
  const canonicalPath = getPathname({
    locale: typedLocale,
    href: "/recruiter",
  });

  return {
    ...createPageMetadata({
      title: recruiterMetadata.title,
      description: recruiterMetadata.description,
      locale: typedLocale,
      canonicalPath,
      alternatePaths,
    }),
    title: {
      absolute: recruiterMetadata.title,
    },
  };
}

export default async function RecruiterPage({ params }: RecruiterPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <RecruiterJsonLd locale={locale as Locale} />
      <RecruiterContent locale={locale as Locale} />
    </>
  );
}
