import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { ProjectDetailContent } from "@/components/sections/project-detail-content";
import { ProjectJsonLd } from "@/components/shared/project-json-ld";
import { SITE_CONFIG } from "@/constants/site";
import { getAllProjectSlugs, getProjectBySlug } from "@/data/projects";
import { getPathname, routing, type Locale } from "@/i18n/routing";
import { createPageMetadata, getProjectAlternatePaths } from "@/lib/seo";

interface ProjectPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllProjectSlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;
  const project = getProjectBySlug(slug, typedLocale);
  const t = await getTranslations({ locale, namespace: "metadata" });

  if (!project) {
    return { title: t("projectNotFound") };
  }

  const alternatePaths = getProjectAlternatePaths(slug);
  const canonicalPath = getPathname({
    locale: typedLocale,
    href: { pathname: "/projects/[slug]", params: { slug } },
  });

  return createPageMetadata({
    title: `${project.name} | ${t("caseStudy")} | ${SITE_CONFIG.fullName}`,
    description: project.description,
    locale: typedLocale,
    canonicalPath,
    alternatePaths,
    type: "article",
    image: project.image,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;
  setRequestLocale(locale);

  const project = getProjectBySlug(slug, typedLocale);

  if (!project) {
    notFound();
  }

  const canonicalPath = getPathname({
    locale: typedLocale,
    href: { pathname: "/projects/[slug]", params: { slug } },
  });

  return (
    <>
      <ProjectJsonLd
        project={project}
        locale={typedLocale}
        canonicalPath={canonicalPath}
      />
      <ProjectDetailContent project={project} locale={typedLocale} />
    </>
  );
}
