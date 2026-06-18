import type { Locale } from "@/i18n/routing";
import { pickLocalized, type Localized } from "@/lib/localized";

const READINESS_ITEMS_SOURCE = [
  {
    id: "seo",
    title: { "pt-BR": "SEO", "en-US": "SEO" },
    description: {
      "pt-BR":
        "Metadata, Open Graph, sitemap, robots, JSON-LD e hreflang bilíngue.",
      "en-US":
        "Metadata, Open Graph, sitemap, robots, JSON-LD, and bilingual hreflang.",
    },
  },
  {
    id: "performance",
    title: { "pt-BR": "Performance", "en-US": "Performance" },
    description: {
      "pt-BR":
        "Next/Image, Server Components, Vercel Speed Insights e build otimizado.",
      "en-US":
        "Next/Image, Server Components, Vercel Speed Insights, and optimized build.",
    },
  },
  {
    id: "accessibility",
    title: { "pt-BR": "Acessibilidade", "en-US": "Accessibility" },
    description: {
      "pt-BR":
        "HTML semântico, aria-labels, contraste de tema e navegação por teclado.",
      "en-US":
        "Semantic HTML, aria-labels, theme contrast, and keyboard navigation.",
    },
  },
  {
    id: "responsiveness",
    title: { "pt-BR": "Responsividade", "en-US": "Responsiveness" },
    description: {
      "pt-BR":
        "Layouts adaptativos para mobile, tablet, desktop e wide screen.",
      "en-US": "Adaptive layouts for mobile, tablet, desktop, and wide screen.",
    },
  },
  {
    id: "security",
    title: { "pt-BR": "Segurança", "en-US": "Security" },
    description: {
      "pt-BR":
        "Security headers, validação Zod, OWASP e página dedicada de práticas.",
      "en-US":
        "Security headers, Zod validation, OWASP, and a dedicated practices page.",
    },
  },
  {
    id: "i18n",
    title: {
      "pt-BR": "Internacionalização",
      "en-US": "Internationalization",
    },
    description: {
      "pt-BR":
        "pt-BR e en-US com next-intl, rotas localizadas e language switcher.",
      "en-US":
        "pt-BR and en-US with next-intl, localized routes, and language switcher.",
    },
  },
  {
    id: "observability",
    title: { "pt-BR": "Observabilidade", "en-US": "Observability" },
    description: {
      "pt-BR":
        "Health check, status page, logger estruturado e audit log preparado.",
      "en-US":
        "Health check, status page, structured logger, and prepared audit log.",
    },
  },
  {
    id: "analytics",
    title: { "pt-BR": "Analytics", "en-US": "Analytics" },
    description: {
      "pt-BR": "Vercel Analytics e Speed Insights para métricas em produção.",
      "en-US": "Vercel Analytics and Speed Insights for production metrics.",
    },
  },
  {
    id: "cicd",
    title: { "pt-BR": "CI/CD", "en-US": "CI/CD" },
    description: {
      "pt-BR":
        "GitHub Actions com lint, type-check e build; deploy automático na Vercel.",
      "en-US":
        "GitHub Actions with lint, type-check, and build; automatic Vercel deploy.",
    },
  },
] as const satisfies readonly {
  id: string;
  title: Localized<string>;
  description: Localized<string>;
}[];

export function getProductionReadinessItems(locale: Locale) {
  return READINESS_ITEMS_SOURCE.map((item) => ({
    id: item.id,
    title: pickLocalized(item.title, locale),
    description: pickLocalized(item.description, locale),
    status: "ready" as const,
  }));
}
