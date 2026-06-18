import type { Locale } from "@/i18n/routing";
import { pickLocalized, type Localized } from "@/lib/localized";
import type { TimelineEvent } from "@/types";

const CAREER_TIMELINE_SOURCE = [
  {
    id: "ads-start-2019",
    year: "2019",
    title: {
      "pt-BR": "Início em Análise e Desenvolvimento de Sistemas",
      "en-US": "Systems Analysis and Development begins",
    },
  },
  {
    id: "ads-conclusion-2023",
    year: "2023",
    title: {
      "pt-BR": "Conclusão do ADS — UNIASSELVI",
      "en-US": "ADS completed — UNIASSELVI",
    },
  },
  {
    id: "postgrad-2025",
    year: "2025",
    title: {
      "pt-BR": "Pós-graduação em Arquitetura e Padrões de Projetos — GRAN",
      "en-US": "Postgraduate in Architecture and Design Patterns — GRAN",
    },
  },
  {
    id: "software-engineering-2025",
    year: "2025",
    title: {
      "pt-BR": "Início em Engenharia de Software — UNIASSELVI",
      "en-US": "Software Engineering studies begin — UNIASSELVI",
    },
  },
  {
    id: "fullstack-projects-2025",
    year: "2025",
    title: {
      "pt-BR": "Projetos publicados",
      "en-US": "Published projects",
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
    id: "portfolio-2026",
    year: "2026",
    title: {
      "pt-BR": "Portfolio Viviane",
      "en-US": "Portfolio Viviane",
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
