import { Calendar, Clock } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/i18n/routing";
import type { BlogPost } from "@/types";

interface BlogPostHeaderProps {
  post: BlogPost;
  locale: Locale;
}

export async function BlogPostHeader({ post, locale }: BlogPostHeaderProps) {
  const t = await getTranslations({ locale, namespace: "blog" });
  const formattedDate = new Date(post.publishedAt).toLocaleDateString(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="space-y-4 border-b pb-8">
      <Badge variant="secondary">{post.category}</Badge>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        {post.title}
      </h1>
      <p className="max-w-3xl text-lg text-muted-foreground">
        {post.description}
      </p>
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <time dateTime={post.publishedAt} className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" aria-hidden />
          {formattedDate}
        </time>
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" aria-hidden />
          {t("readingTime", { time: post.readingTime })}
        </span>
      </div>
      <ul className="flex flex-wrap gap-2" role="list" aria-label="Tags">
        {post.tags.map((tag) => (
          <li key={tag}>
            <Badge variant="outline">{tag}</Badge>
          </li>
        ))}
      </ul>
    </header>
  );
}
