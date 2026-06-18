import type { Locale } from "@/i18n/routing";
import { pickLocalized, type Localized } from "@/lib/localized";

const ARCHITECTURE_FLOW = [
  "Portfolio",
  "Next.js",
  "PostgreSQL",
  "Prisma",
  "Auth.js",
  "Vercel",
  "GitHub",
] as const;

const ARCHITECTURE_DECISIONS_SOURCE = [
  {
    id: "nextjs-app-router",
    title: {
      "pt-BR": "Next.js App Router",
      "en-US": "Next.js App Router",
    },
    description: {
      "pt-BR":
        "Server Components por padrão, SSG para blog e projetos, i18n com next-intl e deploy otimizado na Vercel.",
      "en-US":
        "Server Components by default, SSG for blog and projects, i18n with next-intl, and optimized Vercel deployment.",
    },
  },
  {
    id: "postgresql-prisma",
    title: {
      "pt-BR": "PostgreSQL + Prisma",
      "en-US": "PostgreSQL + Prisma",
    },
    description: {
      "pt-BR":
        "Camada de persistência preparada para auditoria administrativa, conteúdo dinâmico e evolução do dashboard.",
      "en-US":
        "Persistence layer prepared for admin audit logs, dynamic content, and dashboard evolution.",
    },
  },
  {
    id: "authjs",
    title: {
      "pt-BR": "Auth.js",
      "en-US": "Auth.js",
    },
    description: {
      "pt-BR":
        "Autenticação planejada para área administrativa com sessões seguras e controle de acesso.",
      "en-US":
        "Authentication planned for the admin area with secure sessions and access control.",
    },
  },
  {
    id: "vercel-edge",
    title: {
      "pt-BR": "Vercel + Edge",
      "en-US": "Vercel + Edge",
    },
    description: {
      "pt-BR":
        "Hospedagem global, analytics, speed insights, CI/CD integrado e health check exposto em /api/health.",
      "en-US":
        "Global hosting, analytics, speed insights, integrated CI/CD, and health check exposed at /api/health.",
    },
  },
  {
    id: "github-integration",
    title: {
      "pt-BR": "Integração GitHub",
      "en-US": "GitHub Integration",
    },
    description: {
      "pt-BR":
        "Dados reais de repositórios e atividade via GitHub API com cache de 24 horas.",
      "en-US":
        "Real repository and activity data via GitHub API with 24-hour cache.",
    },
  },
] as const satisfies readonly {
  id: string;
  title: Localized<string>;
  description: Localized<string>;
}[];

export function getArchitectureFlow() {
  return [...ARCHITECTURE_FLOW];
}

export function getArchitectureDecisions(locale: Locale) {
  return ARCHITECTURE_DECISIONS_SOURCE.map((item) => ({
    id: item.id,
    title: pickLocalized(item.title, locale),
    description: pickLocalized(item.description, locale),
  }));
}
