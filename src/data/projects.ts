import type { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    slug: "stockflow",
    name: "StockFlow",
    description:
      "API SaaS multiempresa para gestão de estoque com autenticação, RBAC e observabilidade.",
    longDescription:
      "Plataforma backend para controle de estoque em ambiente multi-tenant, com autenticação JWT, refresh token, auditoria de operações, cache Redis, health checks, rate limiting e documentação OpenAPI para integração com o frontend Next.js.",
    status: "Concluído",
    image: "/projects/stockflow.svg",
    githubUrl: "https://github.com/vivianeaguiarc/StockFlow-api",
    deployUrl: "https://stock-flow-web-six.vercel.app/pt-BR/login",
    technologies: [
      "Node.js",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "Docker",
    ],
    concepts: [
      "JWT",
      "RBAC",
      "Multi-Tenant",
      "Redis Cache",
      "OpenAPI",
      "CI/CD",
    ],
    metrics: [
      { label: "Arquitetura", value: "API SaaS multiempresa" },
      { label: "Endpoints", value: "45+ REST documentados" },
      { label: "Docs", value: "Swagger/OpenAPI" },
      { label: "Pipeline", value: "CI/CD ativo" },
    ],
    challenges: ["Segurança", "Escalabilidade", "Arquitetura", "Performance"],
    highlights: [
      "Autenticação JWT + Refresh Token",
      "RBAC por perfil de acesso",
      "Auditoria de operações",
      "Cache com Redis",
      "Health Checks e Rate Limiting",
    ],
  },
  {
    slug: "ticket-sales",
    name: "Ticket Sales",
    description:
      "API de venda de ingressos com reserva, compra em lote e controle de concorrência.",
    longDescription:
      "Backend para gestão de eventos e ingressos com fluxo de reserva, compra de múltiplos tickets, cancelamento, transações no banco de dados, histórico de status e cobertura de testes automatizados com Vitest.",
    status: "Concluído",
    image: "/projects/ticket-sales.svg",
    githubUrl: "https://github.com/vivianeaguiarc/ticket-sales",
    deployUrl: "https://ticket-sales-3su2.onrender.com/docs/",
    technologies: [
      "Node.js",
      "TypeScript",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Vitest",
    ],
    concepts: [
      "Transações",
      "Concorrência",
      "REST API",
      "Testes Automatizados",
      "Swagger",
    ],
    metrics: [
      { label: "Fluxos", value: "Reserva e compra" },
      { label: "Concorrência", value: "Controle transacional" },
      { label: "Testes", value: "Vitest automatizado" },
      { label: "Docs", value: "Swagger publicado" },
    ],
    challenges: [
      "Concorrência",
      "Integridade de dados",
      "Regras de negócio",
      "Confiabilidade",
    ],
    highlights: [
      "Reserva de ingressos",
      "Compra de múltiplos tickets",
      "Cancelamento com histórico",
      "Transações no banco de dados",
      "Histórico de status",
    ],
  },
  // {
  //   slug: "tirei-de-letra",
  //   name: "Tirei de Letra",
  //   description:
  //     "Plataforma educacional para ENEM com simulados, redação com IA e marketplace.",
  //   longDescription:
  //     "Produto em evolução para preparação ao ENEM com simulados, correção de redação assistida por IA, marketplace de professores, plano premium e arquitetura em monorepo, com segurança e LGPD planejadas para produção.",
  //   status: "Em desenvolvimento",
  //   image: "/projects/tirei-de-letra.svg",
  //   technologies: [
  //     "Next.js",
  //     "TypeScript",
  //     "Turborepo",
  //     "PostgreSQL",
  //     "TailwindCSS",
  //   ],
  //   concepts: [
  //     "Monorepo",
  //     "EdTech",
  //     "IA Generativa",
  //     "Marketplace",
  //     "LGPD",
  //   ],
  //   metrics: [
  //     { label: "Escopo", value: "Plataforma ENEM" },
  //     { label: "Arquitetura", value: "Monorepo" },
  //     { label: "Produto", value: "Premium planejado" },
  //     { label: "Compliance", value: "LGPD em roadmap" },
  //   ],
  //   challenges: [
  //     "Escalabilidade",
  //     "Segurança",
  //     "Experiência do aluno",
  //     "Monetização",
  //   ],
  //   highlights: [
  //     "Simulados e trilhas de estudo",
  //     "Redação com IA",
  //     "Marketplace de professores",
  //     "Modelo premium",
  //     "Segurança e LGPD planejadas",
  //   ],
  // },
  {
    slug: "finance-app",
    name: "Finance App",
    description:
      "API de controle financeiro pessoal com autenticação, transações e dashboard.",
    longDescription:
      "Aplicação backend para gestão financeira com cadastro de usuários, CRUD de transações categorizadas, persistência em PostgreSQL via Docker e documentação da API para consumo por clientes web ou mobile.",
    status: "Concluído",
    image: "/projects/finance-app.svg",
    githubUrl: "https://github.com/vivianeaguiarc/finance-app",
    deployUrl: "https://finance-app-i600.onrender.com/docs/",
    technologies: ["Node.js", "Express", "PostgreSQL", "Docker", "JavaScript"],
    concepts: ["REST API", "CRUD", "Migrações SQL", "Docker", "Clean Code"],
    metrics: [
      { label: "Domínio", value: "Gestão financeira" },
      { label: "Persistência", value: "PostgreSQL" },
      { label: "Ambiente", value: "Docker Compose" },
      { label: "Docs", value: "API documentada" },
    ],
    challenges: [
      "Modelagem de dados",
      "Validação de regras",
      "Qualidade de código",
      "Deploy em cloud",
    ],
    highlights: [
      "Autenticação de usuários",
      "CRUD de transações",
      "Dashboard financeiro",
      "Integração com banco relacional",
      "Migrações automatizadas",
    ],
  },
  {
    slug: "portfolio-viviane",
    name: "Portfolio Viviane",
    description:
      "Portfólio técnico com foco em SEO, performance e apresentação profissional.",
    longDescription:
      "Site institucional construído com Next.js App Router, componentização reutilizável, dark mode, formulário validado, structured data e pipeline de qualidade com ESLint, TypeScript strict e GitHub Actions.",
    status: "Concluído",
    image: "/projects/portfolio-viviane.svg",
    githubUrl: "https://github.com/vivianeaguiarc/portifolio-viviane",
    deployUrl: "https://portfolio-viviane.vercel.app",
    technologies: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "shadcn/ui",
      "Framer Motion",
    ],
    concepts: [
      "App Router",
      "SEO",
      "Design System",
      "Server Components",
      "CI/CD",
    ],
    metrics: [
      { label: "Framework", value: "Next.js App Router" },
      { label: "Qualidade", value: "ESLint + Prettier" },
      { label: "SEO", value: "JSON-LD + sitemap" },
      { label: "Pipeline", value: "GitHub Actions" },
    ],
    challenges: [
      "Performance",
      "Acessibilidade",
      "SEO técnico",
      "Manutenibilidade",
    ],
    highlights: [
      "Componentização reutilizável",
      "Dark Mode e responsividade",
      "Open Graph e Twitter Cards",
      "Husky + Commitlint",
      "Build estático otimizado",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
