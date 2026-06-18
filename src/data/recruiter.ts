import { BLOG_POSTS } from "@/data/blog-posts";
import { CERTIFICATIONS } from "@/data/certifications";
import { EDUCATION } from "@/data/education";
import { PROJECTS } from "@/data/projects";
import { PROFILE } from "@/data/profile";

export const RECRUITER_PROFILE = {
  fullName: "Viviane Aguiar Silva Simões",
  role: "Desenvolvedora Fullstack",
  location: "Juiz de Fora, MG — Brasil",
  summary: PROFILE.summary,
} as const;

export const RECRUITER_METADATA = {
  title: "Viviane Aguiar Silva Simões | Desenvolvedora Fullstack",
  description:
    "Portfólio profissional com projetos Fullstack, backend Node.js, TypeScript, arquitetura de software e engenharia de software.",
} as const;

export const RECRUITER_SKILL_CATEGORIES = [
  {
    id: "frontend",
    title: "Frontend",
    skills: ["Next.js", "React", "TypeScript", "TailwindCSS", "shadcn/ui"],
  },
  {
    id: "backend",
    title: "Backend",
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
    title: "Banco de Dados",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma"],
  },
  {
    id: "devops",
    title: "DevOps",
    skills: ["Docker", "GitHub Actions", "CI/CD", "Linux"],
  },
  {
    id: "cloud",
    title: "Cloud",
    skills: ["AWS", "Vercel", "Render", "Firebase"],
  },
  {
    id: "architecture",
    title: "Arquitetura",
    skills: [
      "Clean Architecture",
      "DDD",
      "SOLID",
      "RBAC",
      "Multi-Tenant",
      "Microsserviços",
    ],
  },
] as const;

export const FEATURED_PROJECT_SLUGS = [
  "stockflow",
  "ticket-sales",
  "tirei-de-letra",
] as const;

export const RECRUITER_CERTIFICATION_IDS = [
  "aws-cloud-practitioner",
  "docker-kubernetes",
  "typescript-advanced",
  "nodejs-microservices",
] as const;

export const AVAILABILITY = {
  title: "Disponível para oportunidades",
  roles: [
    "Backend Júnior",
    "Fullstack Júnior",
    "Estágio em Desenvolvimento",
    "Analista de Sistemas Júnior",
  ],
} as const;

export const PORTFOLIO_METRICS = {
  projectsPublished: PROJECTS.length,
  technicalArticles: BLOG_POSTS.length,
  certifications: CERTIFICATIONS.length,
  yearsInTech: new Date().getFullYear() - 2020,
} as const;

export function getFeaturedProjects() {
  return PROJECTS.filter((project) =>
    (FEATURED_PROJECT_SLUGS as readonly string[]).includes(project.slug),
  );
}

export function getRecruiterCertifications() {
  return CERTIFICATIONS.filter((cert) =>
    (RECRUITER_CERTIFICATION_IDS as readonly string[]).includes(cert.id),
  );
}

export function getRecruiterEducation() {
  const order = ["ads", "pos-arquitetura-java", "engenharia-software"];
  return order
    .map((id) => EDUCATION.find((item) => item.id === id))
    .filter((item): item is (typeof EDUCATION)[number] => Boolean(item));
}
