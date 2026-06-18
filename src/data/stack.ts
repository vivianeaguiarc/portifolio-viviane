import type { TechStackCategory } from "@/types";

export const TECH_STACK: TechStackCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    items: [
      { name: "Next.js" },
      { name: "React" },
      { name: "TypeScript" },
      { name: "TailwindCSS" },
      { name: "shadcn/ui" },
      { name: "Framer Motion" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    items: [
      { name: "Node.js" },
      { name: "NestJS" },
      { name: "Express" },
      { name: "Java" },
      { name: "Spring Boot" },
      { name: "REST APIs" },
    ],
  },
  {
    id: "database",
    title: "Banco de Dados",
    items: [
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "Redis" },
      { name: "Prisma" },
      { name: "Supabase" },
    ],
  },
  {
    id: "devops",
    title: "DevOps",
    items: [
      { name: "Docker" },
      { name: "GitHub Actions" },
      { name: "CI/CD" },
      { name: "Nginx" },
      { name: "Linux" },
    ],
  },
  {
    id: "cloud",
    title: "Cloud",
    items: [
      { name: "AWS" },
      { name: "Vercel" },
      { name: "Firebase" },
      { name: "Cloudflare" },
    ],
  },
  {
    id: "tools",
    title: "Ferramentas",
    items: [
      { name: "Git" },
      { name: "Figma" },
      { name: "Postman" },
      { name: "Jest" },
      { name: "ESLint" },
      { name: "Prettier" },
    ],
  },
];
