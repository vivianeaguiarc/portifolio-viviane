import type { Locale } from "@/i18n/routing";
import { pickLocalized, type Localized } from "@/lib/localized";

export const PROFILE_SOURCE = {
  name: { "pt-BR": "Viviane", "en-US": "Viviane" },
  fullName: {
    "pt-BR": "Viviane Aguiar Silva Simões",
    "en-US": "Viviane Aguiar Silva Simões",
  },
  role: {
    "pt-BR": "Desenvolvedora Fullstack Júnior",
    "en-US": "Junior Fullstack Developer",
  },
  mainStack: {
    "pt-BR": ["TypeScript", "Node.js", "Next.js", "PostgreSQL"],
    "en-US": ["TypeScript", "Node.js", "Next.js", "PostgreSQL"],
  },
  summary: {
    "pt-BR":
      "Desenvolvedora Fullstack em evolução, com foco em backend, TypeScript, Node.js, APIs REST, arquitetura de software e boas práticas de engenharia.",
    "en-US":
      "Fullstack Developer in growth, focused on backend, TypeScript, Node.js, REST APIs, software architecture, and engineering best practices.",
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
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "Docker",
      "TailwindCSS",
      "Git",
    ],
    "en-US": [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Java",
      "Spring Boot",
      "PostgreSQL",
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
