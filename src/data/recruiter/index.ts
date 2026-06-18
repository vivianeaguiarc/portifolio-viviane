import { getBlogPosts } from "@/data/blog";
import { getCurrentLearningTopics } from "@/data/current-learning";
import { getEducation } from "@/data/education";
import { getProfile } from "@/data/profile";
import { getProjects } from "@/data/projects";
import type { Locale } from "@/i18n/routing";
import { pickLocalized, type Localized } from "@/lib/localized";
import type { Education, Project } from "@/types";

const RECRUITER_PROFILE_SOURCE = {
  fullName: {
    "pt-BR": "Viviane Aguiar",
    "en-US": "Viviane Aguiar",
  },
  role: {
    "pt-BR": "Desenvolvedora Fullstack Júnior",
    "en-US": "Junior Fullstack Developer",
  },
  location: {
    "pt-BR": "Juiz de Fora, MG — Brasil",
    "en-US": "Juiz de Fora, MG — Brazil",
  },
} as const satisfies Record<string, Localized<string>>;

const RECRUITER_METADATA_SOURCE = {
  title: {
    "pt-BR": "Viviane Aguiar | Desenvolvedora Fullstack Júnior",
    "en-US": "Viviane Aguiar | Junior Fullstack Developer",
  },
  description: {
    "pt-BR":
      "Portfólio de Viviane Aguiar — Desenvolvedora Fullstack Júnior com foco em backend, TypeScript, Node.js, Java, Spring Boot, APIs REST e arquitetura de software.",
    "en-US":
      "Portfolio of Viviane Aguiar — Junior Fullstack Developer focused on backend, TypeScript, Node.js, Java, Spring Boot, REST APIs, and software architecture.",
  },
} as const satisfies Record<string, Localized<string>>;

const RECRUITER_SKILL_CATEGORIES_SOURCE = [
  {
    id: "frontend",
    title: {
      "pt-BR": "Frontend",
      "en-US": "Frontend",
    },
    skills: ["Next.js", "React", "TypeScript", "TailwindCSS", "shadcn/ui"],
  },
  {
    id: "backend",
    title: {
      "pt-BR": "Backend",
      "en-US": "Backend",
    },
    skills: [
      "Node.js",
      "NestJS",
      "Express",
      "Java",
      "Spring Boot",
      "REST APIs",
    ],
  },
  {
    id: "database",
    title: {
      "pt-BR": "Banco de Dados",
      "en-US": "Database",
    },
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma"],
  },
  {
    id: "devops",
    title: {
      "pt-BR": "DevOps",
      "en-US": "DevOps",
    },
    skills: ["Docker", "GitHub Actions", "CI/CD", "Linux"],
  },
  {
    id: "cloud",
    title: {
      "pt-BR": "Cloud",
      "en-US": "Cloud",
    },
    skills: ["AWS", "Vercel", "Render", "Firebase"],
  },
  {
    id: "architecture",
    title: {
      "pt-BR": "Arquitetura",
      "en-US": "Architecture",
    },
    skills: [
      "Clean Architecture",
      "DDD",
      "SOLID",
      "RBAC",
      "Multi-Tenant",
      "Microsserviços",
    ],
  },
] as const satisfies readonly {
  id: string;
  title: Localized<string>;
  skills: readonly string[];
}[];

export const FEATURED_PROJECT_SLUGS = [
  "stockflow",
  "ticket-sales",
  "portfolio-viviane",
] as const;

const AVAILABILITY_TITLE: Localized<string> = {
  "pt-BR": "Disponível para oportunidades",
  "en-US": "Open to opportunities",
};

const AVAILABILITY_ROLES: Localized<string[]> = {
  "pt-BR": [
    "Desenvolvedora Backend Júnior",
    "Desenvolvedora Fullstack Júnior",
    "Estágio em Desenvolvimento",
    "Analista de Sistemas Júnior",
  ],
  "en-US": [
    "Junior Backend Developer",
    "Junior Fullstack Developer",
    "Development Internship",
    "Junior Systems Analyst",
  ],
};

const RECRUITER_EDUCATION_ORDER = [
  "ads",
  "pos-padroes-projetos",
  "engenharia-software",
] as const;

export function getRecruiterProfile(locale: Locale) {
  const profile = getProfile(locale);

  return {
    fullName: pickLocalized(RECRUITER_PROFILE_SOURCE.fullName, locale),
    role: pickLocalized(RECRUITER_PROFILE_SOURCE.role, locale),
    location: pickLocalized(RECRUITER_PROFILE_SOURCE.location, locale),
    summary: profile.summary,
  };
}

export function getRecruiterMetadata(locale: Locale) {
  return {
    title: pickLocalized(RECRUITER_METADATA_SOURCE.title, locale),
    description: pickLocalized(RECRUITER_METADATA_SOURCE.description, locale),
  };
}

export function getRecruiterSkillCategories(locale: Locale) {
  return RECRUITER_SKILL_CATEGORIES_SOURCE.map((category) => ({
    id: category.id,
    title: pickLocalized(category.title, locale),
    skills: [...category.skills],
  }));
}

export function getAvailability(locale: Locale) {
  return {
    title: pickLocalized(AVAILABILITY_TITLE, locale),
    roles: pickLocalized(AVAILABILITY_ROLES, locale),
  };
}

export function getPortfolioMetrics(locale: Locale) {
  const projects = getProjects(locale);

  return {
    projectsPublished: projects.length,
    projectsWithDeploy: projects.filter((project) => project.deployUrl).length,
    technicalArticles: getBlogPosts(locale).length,
    studyAreas: getCurrentLearningTopics(locale).length,
  };
}

export function getFeaturedProjects(locale: Locale): Project[] {
  return getProjects(locale).filter((project) =>
    (FEATURED_PROJECT_SLUGS as readonly string[]).includes(project.slug),
  );
}

export function getRecruiterEducation(locale: Locale): Education[] {
  const education = getEducation(locale);

  return RECRUITER_EDUCATION_ORDER.map((id) =>
    education.find((item) => item.id === id),
  ).filter((item): item is Education => Boolean(item));
}
