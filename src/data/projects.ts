import type { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "stockflow",
    name: "StockFlow",
    description:
      "Sistema de gestão de estoque com controle de entradas, saídas e alertas de reposição em tempo real.",
    image: "/projects/stockflow.svg",
    technologies: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "TailwindCSS",
    ],
    concepts: [
      "Clean Architecture",
      "REST API",
      "Autenticação JWT",
      "Dashboard Analytics",
    ],
    githubUrl: "https://github.com/vivianeaguiarc/StockFlow-api",
    deployUrl: "https://stock-flow-web-six.vercel.app/pt-BR/login",
    status: "production",
  },
  {
    id: "ticket-sales",
    name: "Ticket Sales",
    description:
      "Plataforma de venda de ingressos com checkout seguro, gestão de eventos e painel administrativo.",
    image: "/projects/ticket-sales.svg",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
    concepts: ["Pagamentos", "Filas de Processamento", "RBAC", "Microserviços"],
    githubUrl: "https://github.com/vivianeaguiarc/ticket-sales",
    deployUrl: "https://ticket-sales-3su2.onrender.com/docs/",
    status: "production",
  },
  {
    id: "finance-app",
    name: "Finance App",
    description:
      "Aplicativo de controle financeiro pessoal com categorização automática, metas e relatórios visuais.",
    image: "/projects/finance-app.svg",
    technologies: ["React Native", "TypeScript", "Firebase", "Recharts"],
    concepts: ["Mobile First", "Offline First", "State Management", "Charts"],
    githubUrl: "https://github.com/vivianeaguiarc/finance-app",
    deployUrl: "https://finance-app-i600.onrender.com/docs/",
    status: "production",
  },
  {
    id: "portfolio-viviane",
    name: "Portfolio Viviane",
    description:
      "Portfólio profissional com foco em performance, SEO e experiência do usuário para recrutadores e empresas.",
    image: "/projects/portfolio-viviane.svg",
    technologies: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "shadcn/ui",
      "Framer Motion",
    ],
    concepts: ["SEO", "Dark Mode", "Server Components", "Design System"],
    githubUrl: "https://github.com/viviane-dev/portfolio-viviane",
    deployUrl: "https://portfolio-viviane.vercel.app",
    status: "production",
  },
];
