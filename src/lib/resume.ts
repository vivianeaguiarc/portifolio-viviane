import type { Locale } from "@/i18n/routing";

export const RESUME_PATHS = {
  "pt-BR": "/resume/viviane-aguiar-cv-ptbr.pdf",
  "en-US": "/resume/viviane-aguiar-cv-en.pdf",
} as const satisfies Record<Locale, string>;

export function getResumeUrl(locale: Locale): string {
  return RESUME_PATHS[locale];
}

export function isPdfHref(href: string): boolean {
  return href.endsWith(".pdf") || href.includes("/resume/");
}
