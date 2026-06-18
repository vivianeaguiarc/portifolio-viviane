import type { Locale } from "@/i18n/routing";
import { pickLocalized, type Localized } from "@/lib/localized";

const SECURITY_PRACTICES_SOURCE = [
  {
    id: "csp",
    title: {
      "pt-BR": "Content Security Policy",
      "en-US": "Content Security Policy",
    },
    description: {
      "pt-BR":
        "Política de conteúdo preparada para restringir scripts e recursos não confiáveis em produção.",
      "en-US":
        "Content policy prepared to restrict untrusted scripts and resources in production.",
    },
  },
  {
    id: "security-headers",
    title: {
      "pt-BR": "Headers de Segurança",
      "en-US": "Security Headers",
    },
    description: {
      "pt-BR":
        "X-Frame-Options, X-Content-Type-Options, Referrer-Policy e Permissions-Policy aplicados no middleware.",
      "en-US":
        "X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy applied in middleware.",
    },
  },
  {
    id: "zod-validation",
    title: { "pt-BR": "Validação Zod", "en-US": "Zod Validation" },
    description: {
      "pt-BR":
        "Formulário de contato e inputs validados com schemas tipados antes do processamento.",
      "en-US":
        "Contact form and inputs validated with typed schemas before processing.",
    },
  },
  {
    id: "sanitization",
    title: { "pt-BR": "Sanitização", "en-US": "Sanitization" },
    description: {
      "pt-BR":
        "Dados de entrada tratados no servidor; links externos com rel noopener noreferrer.",
      "en-US":
        "Input data handled on the server; external links use rel noopener noreferrer.",
    },
  },
  {
    id: "authjs",
    title: { "pt-BR": "Auth.js", "en-US": "Auth.js" },
    description: {
      "pt-BR":
        "Autenticação preparada para área admin com sessões e proteção de rotas sensíveis.",
      "en-US":
        "Authentication prepared for admin area with sessions and protected sensitive routes.",
    },
  },
  {
    id: "owasp",
    title: { "pt-BR": "OWASP", "en-US": "OWASP" },
    description: {
      "pt-BR":
        "Práticas alinhadas ao Top 10: validação de entrada, controle de acesso e configuração segura.",
      "en-US":
        "Practices aligned with the Top 10: input validation, access control, and secure configuration.",
    },
  },
  {
    id: "rate-limiting",
    title: { "pt-BR": "Rate Limiting", "en-US": "Rate Limiting" },
    description: {
      "pt-BR":
        "Limitação de requisições planejada para APIs e formulários via edge middleware.",
      "en-US":
        "Request limiting planned for APIs and forms via edge middleware.",
    },
  },
] as const satisfies readonly {
  id: string;
  title: Localized<string>;
  description: Localized<string>;
}[];

export function getSecurityPractices(locale: Locale) {
  return SECURITY_PRACTICES_SOURCE.map((item) => ({
    id: item.id,
    title: pickLocalized(item.title, locale),
    description: pickLocalized(item.description, locale),
  }));
}
