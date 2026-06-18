import type { Locale } from "@/i18n/routing";
import { pickLocalized, type Localized } from "@/lib/localized";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/constants/site";

const MEDIA_KIT_SOURCE = {
  shortBio: {
    "pt-BR":
      "Desenvolvedora Fullstack focada em arquitetura de software, APIs escaláveis e entrega de valor com Next.js, TypeScript e Node.js.",
    "en-US":
      "Fullstack Developer focused on software architecture, scalable APIs, and value-driven delivery with Next.js, TypeScript, and Node.js.",
  },
  mediumBio: {
    "pt-BR":
      "Viviane é Desenvolvedora Fullstack com experiência em construção de aplicações web modernas, APIs RESTful e arquitetura de software. Atua com Next.js, TypeScript, Node.js, PostgreSQL e boas práticas de engenharia como Clean Code, testes automatizados e CI/CD. Seu portfólio reúne cases reais como StockFlow, Ticket Sales e Finance App.",
    "en-US":
      "Viviane is a Fullstack Developer with experience building modern web applications, RESTful APIs, and software architecture. She works with Next.js, TypeScript, Node.js, PostgreSQL, and engineering best practices such as Clean Code, automated testing, and CI/CD. Her portfolio includes real cases such as StockFlow, Ticket Sales, and Finance App.",
  },
  longBio: {
    "pt-BR":
      "Viviane Aguiar Silva Simões é Desenvolvedora Fullstack em formação contínua em Engenharia de Software. Combina base acadêmica sólida com projetos práticos que demonstram domínio de backend, frontend, segurança e arquitetura. Já desenvolveu plataformas SaaS multi-tenant, APIs de alta concorrência e portfólio técnico com SEO avançado, internacionalização e modo dedicado para recrutadores. Busca sua primeira oportunidade como Desenvolvedora Fullstack ou Backend para contribuir em times que valorizam qualidade, aprendizado e impacto.",
    "en-US":
      "Viviane Aguiar Silva Simões is a Fullstack Developer continuously studying Software Engineering. She combines a strong academic foundation with hands-on projects demonstrating backend, frontend, security, and architecture skills. She has built multi-tenant SaaS platforms, high-concurrency APIs, and a technical portfolio with advanced SEO, internationalization, and a dedicated recruiter mode. She is seeking her first opportunity as a Fullstack or Backend Developer to contribute to teams that value quality, learning, and impact.",
  },
  tagline: {
    "pt-BR": "Desenvolvedora Fullstack · Arquitetura · APIs",
    "en-US": "Fullstack Developer · Architecture · APIs",
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

  const featuredSlugs = ["stockflow", "ticket-sales"] as const;

  return {
    ...media,
    resume: SOCIAL_LINKS.resume,
    recruiterPath: "/recruiter" as const,
    stack: pickLocalized(stackLabels, locale),
    featuredSlugs: [...featuredSlugs],
  };
}
