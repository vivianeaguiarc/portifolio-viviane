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
    "pt-BR": ["Node.js", "TypeScript", "React", "Next.js"],
    "en-US": ["Node.js", "TypeScript", "React", "Next.js"],
  },
  summary: {
    "pt-BR":
      "Desenvolvedora Fullstack Júnior com foco em Node.js, TypeScript, React, Next.js, APIs REST, Java, Spring Boot e arquitetura de software.",
    "en-US":
      "Junior Fullstack Developer focused on Node.js, TypeScript, React, Next.js, REST APIs, Java, Spring Boot, and software architecture.",
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
