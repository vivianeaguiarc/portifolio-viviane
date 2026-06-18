import type { Locale } from "@/i18n/routing";
import type { Project } from "@/types";
import { PROJECTS as PROJECTS_PT, getProjectBySlug as getPt } from "./pt-BR";
import { PROJECTS_EN, getProjectBySlug as getEn } from "./en-US";

export function getProjects(locale: Locale): Project[] {
  return locale === "en-US" ? PROJECTS_EN : PROJECTS_PT;
}

export function getProjectBySlug(
  slug: string,
  locale: Locale,
): Project | undefined {
  return locale === "en-US" ? getEn(slug) : getPt(slug);
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS_PT.map((p) => p.slug);
}
