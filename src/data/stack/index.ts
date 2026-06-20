import type { Locale } from "@/i18n/routing";
import { pickLocalized, type Localized } from "@/lib/localized";
import type { TechStackCategory, TechStackItem } from "@/types";

const STACK_ITEMS = {
  frontend: [
    { name: "React" },
    { name: "Next.js" },
    { name: "TypeScript" },
    { name: "Tailwind CSS" },
  ],
  backend: [
    { name: "Node.js" },
    { name: "TypeScript" },
    { name: "Express" },
    { name: "NestJS" },
  ],
  database: [{ name: "PostgreSQL" }, { name: "MySQL" }, { name: "Prisma" }],
  devops: [
    { name: "Docker" },
    { name: "GitHub Actions" },
    { name: "Vercel" },
    { name: "Render" },
    { name: "ESLint" },
    { name: "Prettier" },
    { name: "Vitest" },
  ],
} as const satisfies Record<string, readonly TechStackItem[]>;

const STACK_TITLES: Localized<Record<keyof typeof STACK_ITEMS, string>> = {
  "pt-BR": {
    frontend: "Frontend",
    backend: "Backend",
    database: "Banco de Dados",
    devops: "DevOps & Qualidade",
  },
  "en-US": {
    frontend: "Frontend",
    backend: "Backend",
    database: "Database",
    devops: "DevOps & Quality",
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
