import type { Locale } from "@/i18n/routing";
import { pickLocalized, type Localized } from "@/lib/localized";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/constants/site";
import { getResumeUrl } from "@/lib/resume";

const MEDIA_KIT_SOURCE = {
  shortBio: {
    "pt-BR":
      "Desenvolvedora Fullstack Júnior em evolução, com foco em backend, TypeScript, Node.js, APIs REST e arquitetura de software.",
    "en-US":
      "Junior Fullstack Developer in growth, focused on backend, TypeScript, Node.js, REST APIs, and software architecture.",
  },
  mediumBio: {
    "pt-BR":
      "Viviane Aguiar Silva Simões é Desenvolvedora Fullstack Júnior que constrói aplicações web e APIs com Next.js, TypeScript, Node.js e PostgreSQL. Seu portfólio reúne cases reais como StockFlow, Ticket Sales, Finance App e este portfolio técnico com SEO, i18n e modo recrutador.",
    "en-US":
      "Viviane Aguiar Silva Simões is a Junior Fullstack Developer building web applications and APIs with Next.js, TypeScript, Node.js, and PostgreSQL. Her portfolio includes real cases such as StockFlow, Ticket Sales, Finance App, and this technical portfolio with SEO, i18n, and recruiter mode.",
  },
  longBio: {
    "pt-BR":
      "Viviane Aguiar Silva Simões é Desenvolvedora Fullstack Júnior em formação em Engenharia de Software na UNIASSELVI, com graduação em ADS e pós-graduação em Arquitetura e Padrões de Projetos pela GRAN Faculdade. Desenvolve projetos práticos que demonstram backend, frontend, segurança e arquitetura — incluindo plataforma SaaS multi-tenant, API de venda de ingressos com concorrência e portfólio técnico bilíngue. Busca oportunidade como Desenvolvedora Backend ou Fullstack Júnior, estágio ou Analista de Sistemas Júnior.",
    "en-US":
      "Viviane Aguiar Silva Simões is a Junior Fullstack Developer studying Software Engineering at UNIASSELVI, with a degree in Systems Analysis and Development and a postgraduate degree in Architecture and Design Patterns from GRAN Faculdade. She builds hands-on projects demonstrating backend, frontend, security, and architecture — including a multi-tenant SaaS platform, a high-concurrency ticket sales API, and a bilingual technical portfolio. She is seeking opportunities as a Junior Backend or Fullstack Developer, internship, or Junior Systems Analyst.",
  },
  tagline: {
    "pt-BR": "Desenvolvedora Fullstack Júnior · Backend · APIs REST",
    "en-US": "Junior Fullstack Developer · Backend · REST APIs",
  },
} as const;

export function getMediaKitContent(locale: Locale) {
  return {
    name: "Viviane Aguiar Silva Simões",
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
      "AWS",
      "Clean Architecture",
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
      "AWS",
      "Clean Architecture",
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
