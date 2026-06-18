import { createBlogPostingJsonLd } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import type { BlogPost } from "@/types";

interface BlogPostJsonLdProps {
  post: BlogPost;
  locale: Locale;
  canonicalPath: string;
}

export function BlogPostJsonLd({
  post,
  locale,
  canonicalPath,
}: BlogPostJsonLdProps) {
  const jsonLd = createBlogPostingJsonLd(post, locale, canonicalPath);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
