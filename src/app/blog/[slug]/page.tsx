import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogPostHeader } from "@/components/shared/blog-post-header";
import { BlogPostJsonLd } from "@/components/shared/blog-post-json-ld";
import { BlogSection } from "@/components/shared/blog-section";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/constants/site";
import { BLOG_POSTS, getBlogPostBySlug } from "@/data/blog-posts";
import { createPageMetadata } from "@/lib/seo";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Artigo não encontrado" };
  }

  return createPageMetadata({
    title: `${post.title} | Blog Técnico | ${SITE_CONFIG.fullName}`,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <BlogPostJsonLd post={post} />
      <article className="section-container max-w-3xl space-y-10 py-24 pt-28">
        <Button variant="ghost" size="sm" asChild className="-ml-2 w-fit">
          <Link href="/blog" aria-label="Voltar para o blog">
            <ArrowLeft className="h-4 w-4" />
            Voltar para o blog
          </Link>
        </Button>

        <BlogPostHeader post={post} />

        <div className="space-y-10">
          {post.content.sections.map((section) => (
            <BlogSection key={section.heading} section={section} />
          ))}
        </div>
      </article>
    </>
  );
}
