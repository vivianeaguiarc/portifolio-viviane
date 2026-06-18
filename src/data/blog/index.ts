import type { Locale } from "@/i18n/routing";
import type { BlogPost } from "@/types";
import {
  BLOG_POSTS as BLOG_POSTS_PT,
  getBlogPostBySlug as getPt,
  getRecentBlogPosts as getRecentPt,
} from "./pt-BR";
import {
  BLOG_POSTS_EN,
  getBlogPostBySlug as getEn,
  getRecentBlogPosts as getRecentEn,
} from "./en-US";

export function getBlogPosts(locale: Locale): BlogPost[] {
  return locale === "en-US" ? BLOG_POSTS_EN : BLOG_POSTS_PT;
}

export function getBlogPostBySlug(
  slug: string,
  locale: Locale,
): BlogPost | undefined {
  return locale === "en-US" ? getEn(slug) : getPt(slug);
}

export function getRecentBlogPosts(locale: Locale, limit = 3): BlogPost[] {
  return locale === "en-US" ? getRecentEn(limit) : getRecentPt(limit);
}

export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS_PT.map((post) => post.slug);
}
