import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { BlogCard } from "@/components/shared/blog-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { getBlogPosts } from "@/data/blog";
import { routing, type Locale } from "@/i18n/routing";
import { createPageMetadata, getBlogListAlternatePaths } from "@/lib/seo";
import { SITE_CONFIG } from "@/constants/site";
import { getPathname } from "@/i18n/routing";

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: "blog" });
  const alternatePaths = getBlogListAlternatePaths();
  const canonicalPath = getPathname({ locale: typedLocale, href: "/blog" });

  return createPageMetadata({
    title: `${t("pageTitle")} | ${SITE_CONFIG.fullName}`,
    description: t("pageDescription"),
    locale: typedLocale,
    canonicalPath,
    alternatePaths,
  });
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  setRequestLocale(locale);

  if (!routing.locales.includes(typedLocale)) {
    return null;
  }

  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = [...getBlogPosts(typedLocale)].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <div className="section-container space-y-12 py-24 pt-28">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("pageTitle")}
        description={t("pageDescription")}
        align="left"
      />

      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" role="list">
        {posts.map((post) => (
          <li key={post.slug}>
            <BlogCard post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
