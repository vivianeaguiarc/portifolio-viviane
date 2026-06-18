import type { Locale } from "@/i18n/routing";
import { pickLocalized, type Localized } from "@/lib/localized";

export interface ChangelogEntry {
  version: string;
  title: Localized<string>;
  items: Localized<string[]>;
}

export const CHANGELOG_ENTRIES: ChangelogEntry[] = [
  {
    version: "1.0.0",
    title: {
      "pt-BR": "Landing page inicial",
      "en-US": "Initial landing page",
    },
    items: {
      "pt-BR": [
        "Landing page profissional",
        "Seção de projetos",
        "Formulário de contato",
        "Dark/Light mode",
      ],
      "en-US": [
        "Professional landing page",
        "Projects section",
        "Contact form",
        "Dark/Light mode",
      ],
    },
  },
  {
    version: "2.0.0",
    title: {
      "pt-BR": "Case Studies",
      "en-US": "Case Studies",
    },
    items: {
      "pt-BR": [
        "Páginas individuais por projeto",
        "Arquitetura e decisões técnicas",
        "Métricas e desafios documentados",
      ],
      "en-US": [
        "Individual project pages",
        "Architecture and technical decisions",
        "Documented metrics and challenges",
      ],
    },
  },
  {
    version: "3.0.0",
    title: {
      "pt-BR": "Blog Técnico",
      "en-US": "Technical Blog",
    },
    items: {
      "pt-BR": [
        "Artigos baseados em projetos reais",
        "SEO avançado com JSON-LD BlogPosting",
        "Preview na home",
      ],
      "en-US": [
        "Articles based on real projects",
        "Advanced SEO with BlogPosting JSON-LD",
        "Home preview section",
      ],
    },
  },
  {
    version: "4.0.0",
    title: {
      "pt-BR": "Recruiter Mode",
      "en-US": "Recruiter Mode",
    },
    items: {
      "pt-BR": [
        "Página dedicada para recrutadores",
        "Métricas do portfólio",
        "Analytics e Speed Insights",
      ],
      "en-US": [
        "Dedicated recruiter page",
        "Portfolio metrics",
        "Analytics and Speed Insights",
      ],
    },
  },
  {
    version: "5.0.0",
    title: {
      "pt-BR": "Internacionalização",
      "en-US": "Internationalization",
    },
    items: {
      "pt-BR": [
        "Suporte pt-BR e en-US",
        "SEO multilíngue e sitemap localizado",
        "Language switcher no header",
      ],
      "en-US": [
        "pt-BR and en-US support",
        "Multilingual SEO and localized sitemap",
        "Language switcher in header",
      ],
    },
  },
  {
    version: "6.0.0",
    title: {
      "pt-BR": "Lançamento público",
      "en-US": "Public launch",
    },
    items: {
      "pt-BR": [
        "Changelog, Now, Media Kit e Press Kit",
        "Social proof e recruiter refinado",
        "Documentação e checklist de lançamento",
      ],
      "en-US": [
        "Changelog, Now, Media Kit and Press Kit",
        "Social proof and refined recruiter page",
        "Documentation and launch checklist",
      ],
    },
  },
];

export function getChangelogEntries(locale: Locale) {
  return CHANGELOG_ENTRIES.map((entry) => ({
    version: entry.version,
    title: pickLocalized(entry.title, locale),
    items: pickLocalized(entry.items, locale),
  }));
}
