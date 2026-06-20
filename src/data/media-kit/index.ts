import type { Locale } from "@/i18n/routing";
import { pickLocalized, type Localized } from "@/lib/localized";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/constants/site";
import { getResumeUrl } from "@/lib/resume";

const MEDIA_KIT_SOURCE = {
  shortBio: {
    "pt-BR":
      "Desenvolvedora Backend com foco em Node.js, TypeScript, APIs REST e arquitetura de software.",
    "en-US":
      "Backend Developer focused on Node.js, TypeScript, REST APIs, and software architecture.",
  },
  mediumBio: {
    "pt-BR":
      "Viviane Aguiar é Desenvolvedora Backend que constrói APIs e aplicações web com Node.js, TypeScript, NestJS e PostgreSQL. Seu portfólio reúne cases como StockFlow, Ticket Sales e este portfólio técnico com SEO, i18n e modo recrutador.",
    "en-US":
      "Viviane Aguiar is a Backend Developer building APIs and web applications with Node.js, TypeScript, NestJS, and PostgreSQL. Her portfolio includes cases such as StockFlow, Ticket Sales, and this technical portfolio with SEO, i18n, and recruiter mode.",
  },
  longBio: {
    "pt-BR":
      "Viviane Aguiar é Desenvolvedora Backend em formação em Engenharia de Software na UNIASSELVI, com graduação em ADS e pós-graduação em Arquitetura e Padrões de Projetos pela GRAN Faculdade. Desenvolve projetos práticos que demonstram backend, arquitetura e segurança — incluindo plataforma SaaS multi-tenant, API de venda de ingressos com concorrência e portfólio técnico bilíngue. Busca oportunidade como Desenvolvedora Backend, Fullstack, estágio ou Analista de Sistemas.",
    "en-US":
      "Viviane Aguiar is a Backend Developer studying Software Engineering at UNIASSELVI, with a degree in Systems Analysis and Development and a postgraduate degree in Architecture and Design Patterns from GRAN Faculdade. She builds hands-on projects demonstrating backend, architecture, and security — including a multi-tenant SaaS platform, a high-concurrency ticket sales API, and a bilingual technical portfolio. She is seeking opportunities as a Backend or Fullstack Developer, internship, or Systems Analyst.",
  },
  tagline: {
    "pt-BR": "Desenvolvedora Backend · Node.js · APIs REST",
    "en-US": "Backend Developer · Node.js · REST APIs",
  },
} as const;

export function getMediaKitContent(locale: Locale) {
  return {
    name: "Viviane Aguiar",
    tagline: pickLocalized(MEDIA_KIT_SOURCE.tagline, locale),
    shortBio: pickLocalized(MEDIA_KIT_SOURCE.shortBio, locale),
    mediumBio: pickLocalized(MEDIA_KIT_SOURCE.mediumBio, locale),
    longBio: pickLocalized(MEDIA_KIT_SOURCE.longBio, locale),
    photo: SITE_CONFIG.profileImage,
    links: {
      website: SITE_CONFIG.url,
      linkedin: SOCIAL_LINKS.linkedin,
      github: SOCIAL_LINKS.github,
      instagram: SOCIAL_LINKS.instagram,
      email: SOCIAL_LINKS.email,
    },
  };
}

export function getPressKitContent(locale: Locale) {
  const media = getMediaKitContent(locale);
  const stackLabels: Localized<string[]> = {
    "pt-BR": [
      "Next.js",
      "TypeScript",
      "Node.js",
      "NestJS",
      "PostgreSQL",
      "Docker",
      "Vercel",
      "Render",
      "RBAC",
      "CI/CD",
    ],
    "en-US": [
      "Next.js",
      "TypeScript",
      "Node.js",
      "NestJS",
      "PostgreSQL",
      "Docker",
      "Vercel",
      "Render",
      "RBAC",
      "CI/CD",
    ],
  };

  const featuredSlugs = [
    "stockflow",
    "ticket-sales",
    "portfolio-viviane",
  ] as const;

  return {
    ...media,
    resume: getResumeUrl(locale),
    recruiterPath: "/recruiter" as const,
    stack: pickLocalized(stackLabels, locale),
    featuredSlugs: [...featuredSlugs],
  };
}
