import type { Locale } from "@/i18n/routing";

export const NOW_PAGE_SOURCE = {
  studying: {
    "pt-BR": [
      "Java",
      "Spring Boot",
      "Arquitetura Hexagonal",
      "DDD",
      "Segurança de APIs",
      "Docker",
      "Cloud Computing",
      "Engenharia de Software",
    ],
    "en-US": [
      "Java",
      "Spring Boot",
      "Hexagonal Architecture",
      "DDD",
      "API Security",
      "Docker",
      "Cloud Computing",
      "Software Engineering",
    ],
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
      "Desenvolvedora Backend Júnior",
      "Desenvolvedora Fullstack Júnior",
      "Estágio em Desenvolvimento",
      "Analista de Sistemas Júnior",
    ],
    "en-US": [
      "Junior Backend Developer",
      "Junior Fullstack Developer",
      "Development Internship",
      "Junior Systems Analyst",
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
