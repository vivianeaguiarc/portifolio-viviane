import { getTranslations } from "next-intl/server";
import { AnimatedSection } from "@/components/shared/animated-section";
import { BlogCard } from "@/components/shared/blog-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { getRecentBlogPosts } from "@/data/blog";
import { Link, type Locale } from "@/i18n/routing";

interface BlogPreviewSectionProps {
  locale: Locale;
}

export async function BlogPreviewSection({ locale }: BlogPreviewSectionProps) {
  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = getRecentBlogPosts(locale, 3);

  return (
    <AnimatedSection id="blog" className="bg-muted/30 py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
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
            <Link href="/blog" aria-label={t("viewAllAria")}>
              {t("viewAll")}
            </Link>
          </Button>
        </div>
      </div>
    </AnimatedSection>
  );
}
