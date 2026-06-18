import Link from "next/link";
import { AnimatedSection } from "@/components/shared/animated-section";
import { BlogCard } from "@/components/shared/blog-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { getRecentBlogPosts } from "@/data/blog-posts";

export function BlogPreviewSection() {
  const posts = getRecentBlogPosts(3);

  return (
    <AnimatedSection id="blog" className="bg-muted/30 py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow="Blog Técnico"
          title="Artigos Técnicos"
          description="Conteúdo sobre arquitetura, segurança e engenharia baseado em projetos reais do meu portfólio."
        />

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" role="list">
          {posts.map((post) => (
            <li key={post.slug}>
              <BlogCard post={post} />
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center">
          <Button asChild size="lg">
            <Link href="/blog" aria-label="Ver todos os artigos do blog">
              Ver todos os artigos
            </Link>
          </Button>
        </div>
      </div>
    </AnimatedSection>
  );
}
