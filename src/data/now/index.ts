import type { Locale } from "@/i18n/routing";

export const NOW_PAGE_SOURCE = {
  studying: {
    "pt-BR": ["Java", "Spring Boot", "Arquitetura Hexagonal", "DDD", "Cloud"],
    "en-US": ["Java", "Spring Boot", "Hexagonal Architecture", "DDD", "Cloud"],
  },
  currentProjects: {
    "pt-BR": [
      {
        name: "Finance App",
        description:
          "Evolução da API de gestão financeira com foco em qualidade e documentação.",
      },
      {
        name: "StockFlow",
        description:
          "Melhorias contínuas na plataforma SaaS multiempresa de estoque.",
      },
    ],
    "en-US": [
      {
        name: "Finance App",
        description:
          "Evolving the personal finance API with a focus on quality and documentation.",
      },
      {
        name: "StockFlow",
        description:
          "Continuous improvements to the multi-tenant inventory SaaS platform.",
      },
    ],
  },
  goals: {
    "pt-BR": [
      "Primeira oportunidade como Desenvolvedora Fullstack",
      "Primeira oportunidade como Desenvolvedora Backend",
    ],
    "en-US": [
      "First opportunity as a Fullstack Developer",
      "First opportunity as a Backend Developer",
    ],
  },
  updatedAt: {
    "pt-BR": "Junho de 2026",
    "en-US": "June 2026",
  },
} as const;

type StudyingList = (typeof NOW_PAGE_SOURCE.studying)["pt-BR"];
type CurrentProjectList = (typeof NOW_PAGE_SOURCE.currentProjects)["pt-BR"];
type GoalsList = (typeof NOW_PAGE_SOURCE.goals)["pt-BR"];

export function getNowPageContent(locale: Locale) {
  return {
    studying: (NOW_PAGE_SOURCE.studying[locale] ??
      NOW_PAGE_SOURCE.studying["pt-BR"]) as StudyingList,
    currentProjects: (NOW_PAGE_SOURCE.currentProjects[locale] ??
      NOW_PAGE_SOURCE.currentProjects["pt-BR"]) as CurrentProjectList,
    goals: (NOW_PAGE_SOURCE.goals[locale] ??
      NOW_PAGE_SOURCE.goals["pt-BR"]) as GoalsList,
    updatedAt:
      NOW_PAGE_SOURCE.updatedAt[locale] ?? NOW_PAGE_SOURCE.updatedAt["pt-BR"],
  };
}
