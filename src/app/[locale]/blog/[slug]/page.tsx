import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { BlogPostHeader } from "@/components/shared/blog-post-header";
import { BlogPostJsonLd } from "@/components/shared/blog-post-json-ld";
import { BlogSection } from "@/components/shared/blog-section";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/constants/site";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/data/blog";
import { Link, getPathname, routing, type Locale } from "@/i18n/routing";
import { createPageMetadata, getBlogAlternatePaths } from "@/lib/seo";

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllBlogSlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;
  const post = getBlogPostBySlug(slug, typedLocale);
  const t = await getTranslations({ locale, namespace: "metadata" });
  const tBlog = await getTranslations({ locale, namespace: "blog" });

  if (!post) {
    return { title: t("postNotFound") };
  }

  const alternatePaths = getBlogAlternatePaths(slug);
  const canonicalPath = getPathname({
    locale: typedLocale,
    href: { pathname: "/blog/[slug]", params: { slug } },
  });

  return createPageMetadata({
    title: `${post.title} | ${tBlog("pageTitle")} | ${SITE_CONFIG.fullName}`,
    description: post.description,
    locale: typedLocale,
    canonicalPath,
    alternatePaths,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;
  setRequestLocale(locale);

  const post = getBlogPostBySlug(slug, typedLocale);
  const t = await getTranslations({ locale, namespace: "metadata" });

  if (!post) {
    notFound();
  }

  const canonicalPath = getPathname({
    locale: typedLocale,
    href: { pathname: "/blog/[slug]", params: { slug } },
  });

  return (
    <>
      <BlogPostJsonLd
        post={post}
        locale={typedLocale}
        canonicalPath={canonicalPath}
      />
      <article className="section-container max-w-3xl space-y-10 py-24 pt-28">
        <Button variant="ghost" size="sm" asChild className="-ml-2 w-fit">
          <Link href="/blog" aria-label={t("backToBlog")}>
            <ArrowLeft className="h-4 w-4" />
            {t("backToBlog")}
          </Link>
        </Button>

        <BlogPostHeader post={post} locale={typedLocale} />

        <div className="space-y-10">
          {post.content.sections.map((section) => (
            <BlogSection key={section.heading} section={section} />
          ))}
        </div>
      </article>
    </>
  );
}
