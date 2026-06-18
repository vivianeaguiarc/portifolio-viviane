import type { Locale } from "@/i18n/routing";
import { pickLocalized, type Localized } from "@/lib/localized";
import type { TechStackCategory, TechStackItem } from "@/types";

const STACK_ITEMS = {
  frontend: [
    { name: "Next.js" },
    { name: "React" },
    { name: "TypeScript" },
    { name: "TailwindCSS" },
    { name: "shadcn/ui" },
    { name: "Framer Motion" },
  ],
  backend: [
    { name: "Node.js" },
    { name: "NestJS" },
    { name: "Express" },
    { name: "Java" },
    { name: "Spring Boot" },
    { name: "REST APIs" },
  ],
  database: [
    { name: "PostgreSQL" },
    { name: "MongoDB" },
    { name: "Redis" },
    { name: "Prisma" },
    { name: "Supabase" },
  ],
  devops: [
    { name: "Docker" },
    { name: "GitHub Actions" },
    { name: "CI/CD" },
    { name: "Nginx" },
    { name: "Linux" },
  ],
  cloud: [
    { name: "AWS" },
    { name: "Vercel" },
    { name: "Firebase" },
    { name: "Cloudflare" },
  ],
  tools: [
    { name: "Git" },
    { name: "Figma" },
    { name: "Postman" },
    { name: "Jest" },
    { name: "ESLint" },
    { name: "Prettier" },
  ],
} as const satisfies Record<string, readonly TechStackItem[]>;

const STACK_TITLES: Localized<Record<keyof typeof STACK_ITEMS, string>> = {
  "pt-BR": {
    frontend: "Frontend",
    backend: "Backend",
    database: "Banco de Dados",
    devops: "DevOps",
    cloud: "Cloud",
    tools: "Ferramentas",
  },
  "en-US": {
    frontend: "Frontend",
    backend: "Backend",
    database: "Database",
    devops: "DevOps",
    cloud: "Cloud",
    tools: "Tools",
  },
};

export function getTechStack(locale: Locale): TechStackCategory[] {
  const titles = pickLocalized(STACK_TITLES, locale);

  return (Object.keys(STACK_ITEMS) as Array<keyof typeof STACK_ITEMS>).map(
    (id) => ({
      id,
      title: titles[id],
      items: [...STACK_ITEMS[id]],
    }),
  );
}
