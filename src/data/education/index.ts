import type { Locale } from "@/i18n/routing";
import { pickLocalized, type Localized } from "@/lib/localized";
import type { Education } from "@/types";

const EDUCATION_SOURCE = [
  {
    id: "engenharia-software",
    degree: {
      "pt-BR": "Engenharia de Software",
      "en-US": "Software Engineering",
    },
    institution: {
      "pt-BR": "Universidade",
      "en-US": "University",
    },
    period: {
      "pt-BR": "2022 — Presente",
      "en-US": "2022 — Present",
    },
    description: {
      "pt-BR":
        "Formação em engenharia de software com ênfase em arquitetura de sistemas, qualidade de software e metodologias ágeis.",
      "en-US":
        "Software engineering degree with emphasis on system architecture, software quality, and agile methodologies.",
    },
  },
  {
    id: "pos-arquitetura-java",
    degree: {
      "pt-BR": "Pós-graduação em Arquitetura de Sistemas e Padrões Java",
      "en-US": "Postgraduate in System Architecture and Java Patterns",
    },
    institution: {
      "pt-BR": "Instituição de Ensino",
      "en-US": "Educational Institution",
    },
    period: {
      "pt-BR": "2023 — 2024",
      "en-US": "2023 — 2024",
    },
    description: {
      "pt-BR":
        "Especialização em padrões de projeto, arquitetura distribuída, microsserviços e boas práticas com ecossistema Java.",
      "en-US":
        "Specialization in design patterns, distributed architecture, microservices, and best practices with the Java ecosystem.",
    },
  },
  {
    id: "ads",
    degree: {
      "pt-BR": "Análise e Desenvolvimento de Sistemas",
      "en-US": "Systems Analysis and Development",
    },
    institution: {
      "pt-BR": "Faculdade",
      "en-US": "College",
    },
    period: {
      "pt-BR": "2019 — 2021",
      "en-US": "2019 — 2021",
    },
    description: {
      "pt-BR":
        "Base sólida em lógica de programação, estruturas de dados, banco de dados e desenvolvimento web e mobile.",
      "en-US":
        "Strong foundation in programming logic, data structures, databases, and web and mobile development.",
    },
  },
] as const satisfies readonly {
  id: string;
  degree: Localized<string>;
  institution: Localized<string>;
  period: Localized<string>;
  description: Localized<string>;
}[];

export function getEducation(locale: Locale): Education[] {
  return EDUCATION_SOURCE.map((item) => ({
    id: item.id,
    degree: pickLocalized(item.degree, locale),
    institution: pickLocalized(item.institution, locale),
    period: pickLocalized(item.period, locale),
    description: pickLocalized(item.description, locale),
  }));
}
