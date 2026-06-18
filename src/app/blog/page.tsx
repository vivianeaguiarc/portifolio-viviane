import type { Metadata } from "next";
import { BlogCard } from "@/components/shared/blog-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { SITE_CONFIG } from "@/constants/site";
import { BLOG_POSTS } from "@/data/blog-posts";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: `Blog Técnico | ${SITE_CONFIG.fullName}`,
  description:
    "Artigos sobre arquitetura, segurança, backend e qualidade de código baseados em projetos reais.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = [...BLOG_POSTS].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <div className="section-container space-y-12 py-24 pt-28">
      <SectionHeading
        eyebrow="Blog Técnico"
        title="Artigos e estudos de caso"
        description="Conteúdo técnico sobre RBAC, JWT, multi-tenant, concorrência e qualidade de código — sempre conectado aos projetos do portfólio."
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
