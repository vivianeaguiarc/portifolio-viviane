import type { Locale } from "@/i18n/routing";
import { pickLocalized, type Localized } from "@/lib/localized";

export const PROFILE_SOURCE = {
  name: { "pt-BR": "Viviane", "en-US": "Viviane" },
  fullName: {
    "pt-BR": "Viviane Aguiar",
    "en-US": "Viviane Aguiar",
  },
  role: {
    "pt-BR": "Desenvolvedora Backend",
    "en-US": "Backend Developer",
  },
  mainStack: {
    "pt-BR": ["Node.js", "TypeScript", "NestJS", "PostgreSQL"],
    "en-US": ["Node.js", "TypeScript", "NestJS", "PostgreSQL"],
  },
  summary: {
    "pt-BR":
      "Desenvolvo APIs REST, aplicações web e projetos fullstack com foco em arquitetura, segurança, qualidade de código e experiência de uso.",
    "en-US":
      "I build REST APIs, web applications, and fullstack projects with a focus on architecture, security, code quality, and user experience.",
  },
  specialties: {
    "pt-BR": [
      "APIs REST",
      "Arquitetura de Software",
      "Clean Code",
      "TypeScript",
      "Node.js",
      "Testes Automatizados",
    ],
    "en-US": [
      "REST APIs",
      "Software Architecture",
      "Clean Code",
      "TypeScript",
      "Node.js",
      "Automated Testing",
    ],
  } satisfies Localized<string[]>,
  technologies: {
    "pt-BR": [
      "Node.js",
      "TypeScript",
      "NestJS",
      "Express",
      "PostgreSQL",
      "React",
      "Next.js",
      "Docker",
      "TailwindCSS",
      "Git",
    ],
    "en-US": [
      "Node.js",
      "TypeScript",
      "NestJS",
      "Express",
      "PostgreSQL",
      "React",
      "Next.js",
      "Docker",
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
