import type { BlogPost } from "@/types";
import { createBlogPostingJsonLd } from "@/lib/seo";

interface BlogPostJsonLdProps {
  post: BlogPost;
}

export function BlogPostJsonLd({ post }: BlogPostJsonLdProps) {
  const jsonLd = createBlogPostingJsonLd(post);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
