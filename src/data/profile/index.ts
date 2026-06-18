import type { Locale } from "@/i18n/routing";
import { pickLocalized, type Localized } from "@/lib/localized";

export const PROFILE_SOURCE = {
  name: { "pt-BR": "Viviane", "en-US": "Viviane" },
  fullName: { "pt-BR": "Viviane", "en-US": "Viviane" },
  role: {
    "pt-BR": "Desenvolvedora Fullstack",
    "en-US": "Fullstack Developer",
  },
  mainStack: {
    "pt-BR": ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    "en-US": ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
  },
  summary: {
    "pt-BR":
      "Desenvolvedora Fullstack com foco em arquitetura de software, qualidade de código e experiências digitais de alto impacto. Atuo na construção de aplicações escaláveis, performáticas e acessíveis, unindo boas práticas de engenharia com entrega orientada a valor de negócio.",
    "en-US":
      "Fullstack Developer focused on software architecture, code quality, and high-impact digital experiences. I build scalable, performant, and accessible applications by combining engineering best practices with business-driven delivery.",
  },
  specialties: {
    "pt-BR": [
      "Arquitetura Frontend",
      "APIs RESTful",
      "Clean Code",
      "Testes Automatizados",
      "CI/CD",
      "Design Systems",
    ],
    "en-US": [
      "Frontend Architecture",
      "RESTful APIs",
      "Clean Code",
      "Automated Testing",
      "CI/CD",
      "Design Systems",
    ],
  } satisfies Localized<string[]>,
  technologies: {
    "pt-BR": [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "NestJS",
      "PostgreSQL",
      "Docker",
      "AWS",
      "TailwindCSS",
      "Git",
    ],
    "en-US": [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "NestJS",
      "PostgreSQL",
      "Docker",
      "AWS",
      "TailwindCSS",
      "Git",
    ],
  } satisfies Localized<string[]>,
} as const satisfies Record<string, Localized<unknown>>;

export function getProfile(locale: Locale) {
  return {
    name: pickLocalized(PROFILE_SOURCE.name, locale),
    fullName: pickLocalized(PROFILE_SOURCE.fullName, locale),
    role: pickLocalized(PROFILE_SOURCE.role, locale),
    mainStack: pickLocalized(PROFILE_SOURCE.mainStack, locale),
    summary: pickLocalized(PROFILE_SOURCE.summary, locale),
    specialties: pickLocalized(PROFILE_SOURCE.specialties, locale),
    technologies: pickLocalized(PROFILE_SOURCE.technologies, locale),
  };
}
