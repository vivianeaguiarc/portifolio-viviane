"use client";

import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const t = useTranslations("blog");
  const locale = useLocale() as Locale;
  const formattedDate = new Date(post.publishedAt).toLocaleDateString(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Card className="glass flex h-full flex-col transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{post.category}</Badge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {post.readingTime}
          </span>
        </div>
        <CardTitle className="text-lg leading-snug">{post.title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {post.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" aria-hidden />
          <time dateTime={post.publishedAt}>{formattedDate}</time>
        </div>
        <ul className="mt-3 flex flex-wrap gap-1.5" role="list">
          {post.tags.map((tag) => (
            <li key={tag}>
              <Badge variant="outline" className="text-xs">
                {tag}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="secondary" size="sm" asChild className="w-full">
          <Link
            href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
            aria-label={t("readArticleAria", { title: post.title })}
          >
            {t("readArticle")}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
