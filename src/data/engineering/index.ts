import type { Locale } from "@/i18n/routing";
import { pickLocalized, type Localized } from "@/lib/localized";

const ENGINEERING_APPLICATIONS_SOURCE = [
  {
    id: "solid",
    application: {
      "pt-BR":
        "Services com responsabilidade única no StockFlow e separação de camadas no Finance App.",
      "en-US":
        "Single-responsibility services in StockFlow and layered separation in Finance App.",
    },
  },
  {
    id: "clean-architecture",
    application: {
      "pt-BR":
        "Domínio isolado de controllers e infraestrutura nos cases de backend.",
      "en-US":
        "Domain isolated from controllers and infrastructure in backend case studies.",
    },
  },
  {
    id: "ddd",
    application: {
      "pt-BR":
        "Modelagem por bounded contexts em SaaS multi-tenant e venda de ingressos.",
      "en-US":
        "Modeling by bounded contexts in multi-tenant SaaS and ticket sales.",
    },
  },
  {
    id: "hexagonal",
    application: {
      "pt-BR":
        "Ports & adapters para integrações externas e persistência desacoplada.",
      "en-US":
        "Ports and adapters for external integrations and decoupled persistence.",
    },
  },
  {
    id: "cicd",
    application: {
      "pt-BR":
        "GitHub Actions com lint, type-check e build em cada pull request.",
      "en-US":
        "GitHub Actions with lint, type-check, and build on every pull request.",
    },
  },
  {
    id: "testing",
    application: {
      "pt-BR":
        "Testes automatizados em fluxos críticos do Ticket Sales e APIs do StockFlow.",
      "en-US":
        "Automated tests on critical Ticket Sales flows and StockFlow APIs.",
    },
  },
  {
    id: "owasp",
    application: {
      "pt-BR":
        "RBAC, JWT, validação Zod e headers de segurança aplicados no portfólio.",
      "en-US":
        "RBAC, JWT, Zod validation, and security headers applied in the portfolio.",
    },
  },
] as const satisfies readonly {
  id: string;
  application: Localized<string>;
}[];

export function getEngineeringApplications(locale: Locale) {
  return ENGINEERING_APPLICATIONS_SOURCE.map((item) => ({
    id: item.id,
    application: pickLocalized(item.application, locale),
  }));
}
