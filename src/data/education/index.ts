import type { Locale } from "@/i18n/routing";
import { pickLocalized, type Localized } from "@/lib/localized";
import type { Education } from "@/types";

const EDUCATION_SOURCE = [
  {
    id: "ads",
    degree: {
      "pt-BR": "Análise e Desenvolvimento de Sistemas",
      "en-US": "Systems Analysis and Development",
    },
    institution: {
      "pt-BR": "UNIASSELVI",
      "en-US": "UNIASSELVI",
    },
    period: {
      "pt-BR": "02/2019 — 12/2023",
      "en-US": "02/2019 — 12/2023",
    },
    description: {
      "pt-BR":
        "Concluído. Base em lógica de programação, estruturas de dados, banco de dados e desenvolvimento web.",
      "en-US":
        "Completed. Foundation in programming logic, data structures, databases, and web development.",
    },
  },
  {
    id: "pos-padroes-projetos",
    degree: {
      "pt-BR":
        "Pós-graduação em Arquitetura e Desenvolvimento de Sistemas com Ênfase em Padrões de Projetos",
      "en-US":
        "Postgraduate in Systems Architecture and Development with Design Patterns Emphasis",
    },
    institution: {
      "pt-BR": "GRAN Faculdade",
      "en-US": "GRAN Faculdade",
    },
    period: {
      "pt-BR": "12/2023 — 04/2025",
      "en-US": "12/2023 — 04/2025",
    },
    description: {
      "pt-BR":
        "Concluído. Padrões de projeto, arquitetura de software e boas práticas de engenharia.",
      "en-US":
        "Completed. Design patterns, software architecture, and engineering best practices.",
    },
  },
  {
    id: "engenharia-software",
    degree: {
      "pt-BR": "Engenharia de Software",
      "en-US": "Software Engineering",
    },
    institution: {
      "pt-BR": "UNIASSELVI",
      "en-US": "UNIASSELVI",
    },
    period: {
      "pt-BR": "08/2025 — 12/2027",
      "en-US": "08/2025 — 12/2027",
    },
    description: {
      "pt-BR":
        "Em andamento. Aprofundamento em arquitetura, qualidade de software e engenharia de sistemas.",
      "en-US":
        "In progress. Deepening knowledge in architecture, software quality, and systems engineering.",
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
