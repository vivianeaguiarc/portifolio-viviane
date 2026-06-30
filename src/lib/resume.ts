import type { Locale } from "@/i18n/routing";

export const RESUME_PATHS = {
  "pt-BR": "/resume/Curriculo_Viviane_Aguiar_Silva_Simoes_portugues.pdf",
  "en-US": "/resume/Resume_Viviane_Aguiar_Silva_Simoes_ingles.pdf",
} as const satisfies Record<Locale, string>;

export function getResumeUrl(locale: Locale): string {
  return RESUME_PATHS[locale];
}

export function isPdfHref(href: string): boolean {
  return href.endsWith(".pdf") || href.includes("/resume/");
}
