import type { Locale } from "@/i18n/routing";
import { pickLocalized, type Localized } from "@/lib/localized";
import type { TimelineEvent } from "@/types";

const CAREER_TIMELINE_SOURCE = [
  {
    id: "ads-2020",
    year: "2020",
    title: {
      "pt-BR": "Análise e Desenvolvimento de Sistemas",
      "en-US": "Systems Analysis and Development",
    },
  },
  {
    id: "ads-conclusion-2023",
    year: "2023",
    title: {
      "pt-BR": "Conclusão ADS",
      "en-US": "ADS Graduation",
    },
  },
  {
    id: "software-engineering-2024",
    year: "2024",
    title: {
      "pt-BR": "Início Engenharia de Software",
      "en-US": "Software Engineering Studies Begin",
    },
  },
  {
    id: "postgrad-2025",
    year: "2025",
    title: {
      "pt-BR": "Pós-graduação em Arquitetura de Sistemas Java",
      "en-US": "Postgraduate in Java System Architecture",
    },
  },
  {
    id: "fullstack-2025",
    year: "2025",
    title: {
      "pt-BR": "Primeiros projetos Fullstack",
      "en-US": "First Fullstack Projects",
    },
  },
  {
    id: "stockflow-2026",
    year: "2026",
    title: {
      "pt-BR": "StockFlow",
      "en-US": "StockFlow",
    },
  },
  {
    id: "ticket-sales-2026",
    year: "2026",
    title: {
      "pt-BR": "Ticket Sales",
      "en-US": "Ticket Sales",
    },
  },
  {
    id: "tirei-de-letra-2026",
    year: "2026",
    title: {
      "pt-BR": "Tirei de Letra",
      "en-US": "Tirei de Letra",
    },
  },
  {
    id: "portfolio-2026",
    year: "2026",
    title: {
      "pt-BR": "Portfolio Profissional",
      "en-US": "Professional Portfolio",
    },
  },
] as const satisfies readonly {
  id: string;
  year: string;
  title: Localized<string>;
}[];

export function getCareerTimeline(locale: Locale): TimelineEvent[] {
  return CAREER_TIMELINE_SOURCE.map((event) => ({
    id: event.id,
    year: event.year,
    title: pickLocalized(event.title, locale),
  }));
}
