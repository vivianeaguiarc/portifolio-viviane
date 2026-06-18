import type { Locale } from "@/i18n/routing";
import type { Project } from "@/types";
import { PROJECTS as PROJECTS_PT, getProjectBySlug as getPt } from "./pt-BR";
import { PROJECTS_EN, getProjectBySlug as getEn } from "./en-US";

export const HIDDEN_PROJECT_SLUGS = ["tirei-de-letra"] as const;

function isVisibleProject(project: Project): boolean {
  return !(HIDDEN_PROJECT_SLUGS as readonly string[]).includes(project.slug);
}

function filterVisibleProjects(projects: Project[]): Project[] {
  return projects.filter(isVisibleProject);
}

export function getProjects(locale: Locale): Project[] {
  const projects = locale === "en-US" ? PROJECTS_EN : PROJECTS_PT;
  return filterVisibleProjects(projects);
}

export function getProjectBySlug(
  slug: string,
  locale: Locale,
): Project | undefined {
  if ((HIDDEN_PROJECT_SLUGS as readonly string[]).includes(slug)) {
    return undefined;
  }

  return locale === "en-US" ? getEn(slug) : getPt(slug);
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS_PT.map((project) => project.slug).filter(
    (slug) => !(HIDDEN_PROJECT_SLUGS as readonly string[]).includes(slug),
  );
}
