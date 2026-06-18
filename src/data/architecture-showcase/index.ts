import type { Locale } from "@/i18n/routing";
import { pickLocalized, type Localized } from "@/lib/localized";
import type { ArchitectureShowcaseItem } from "@/types/architecture-showcase";

const SHOWCASE_SOURCE = [
  {
    slug: "stockflow",
    name: { "pt-BR": "StockFlow", "en-US": "StockFlow" },
    overview: {
      "pt-BR":
        "API SaaS multiempresa para gestão de estoque com autenticação, RBAC, cache Redis e observabilidade.",
      "en-US":
        "Multi-company SaaS API for inventory management with authentication, RBAC, Redis cache, and observability.",
    },
    objective: {
      "pt-BR":
        "Centralizar controle de estoque em ambiente multi-tenant com isolamento de dados, auditoria e APIs documentadas.",
      "en-US":
        "Centralize inventory control in a multi-tenant environment with data isolation, auditing, and documented APIs.",
    },
    architectureTitle: {
      "pt-BR": "Arquitetura em camadas com NestJS",
      "en-US": "Layered architecture with NestJS",
    },
    architectureDescription: {
      "pt-BR":
        "Separação clara entre controllers, services e repositórios Prisma, com Redis para cache de leitura e PostgreSQL como fonte de verdade.",
      "en-US":
        "Clear separation between controllers, services, and Prisma repositories, with Redis for read cache and PostgreSQL as the source of truth.",
    },
    diagramNodes: {
      "pt-BR": [
        "Client",
        "API",
        "Controller",
        "Service",
        "Repository",
        "Prisma",
        "PostgreSQL",
      ],
      "en-US": [
        "Client",
        "API",
        "Controller",
        "Service",
        "Repository",
        "Prisma",
        "PostgreSQL",
      ],
    },
    dataFlowNodes: {
      "pt-BR": [
        "Frontend Next.js",
        "REST API NestJS",
        "Auth JWT + RBAC",
        "Domínio de estoque",
        "Prisma ORM",
        "PostgreSQL + Redis",
      ],
      "en-US": [
        "Next.js Frontend",
        "NestJS REST API",
        "JWT Auth + RBAC",
        "Inventory domain",
        "Prisma ORM",
        "PostgreSQL + Redis",
      ],
    },
    features: {
      "pt-BR": ["JWT", "RBAC", "Multi-Tenant", "Redis", "Auditoria"],
      "en-US": ["JWT", "RBAC", "Multi-Tenant", "Redis", "Audit"],
    },
    technologies: {
      "pt-BR": [
        "Node.js",
        "TypeScript",
        "NestJS",
        "Prisma",
        "PostgreSQL",
        "Redis",
        "Docker",
        "Swagger",
      ],
      "en-US": [
        "Node.js",
        "TypeScript",
        "NestJS",
        "Prisma",
        "PostgreSQL",
        "Redis",
        "Docker",
        "Swagger",
      ],
    },
    technicalDecisions: [
      {
        title: {
          "pt-BR": "NestJS + Prisma",
          "en-US": "NestJS + Prisma",
        },
        description: {
          "pt-BR":
            "Módulos tipados com migrations versionadas e contratos claros entre domínio e persistência.",
          "en-US":
            "Typed modules with versioned migrations and clear contracts between domain and persistence.",
        },
      },
      {
        title: {
          "pt-BR": "Multi-tenant desde o design",
          "en-US": "Multi-tenant from design",
        },
        description: {
          "pt-BR":
            "Isolamento por empresa no modelo de dados evita refatorações custosas em escala.",
          "en-US":
            "Per-company isolation in the data model avoids costly refactors at scale.",
        },
      },
      {
        title: {
          "pt-BR": "Redis para cache",
          "en-US": "Redis for caching",
        },
        description: {
          "pt-BR":
            "Reduz consultas repetitivas em dashboards sem comprometer consistência nas escritas.",
          "en-US":
            "Reduces repetitive dashboard queries without compromising write consistency.",
        },
      },
    ],
  },
  {
    slug: "ticket-sales",
    name: { "pt-BR": "Ticket Sales", "en-US": "Ticket Sales" },
    overview: {
      "pt-BR":
        "API de venda de ingressos com reserva temporária, compra em lote e controle de concorrência transacional.",
      "en-US":
        "Ticket sales API with temporary reservation, batch purchase, and transactional concurrency control.",
    },
    objective: {
      "pt-BR":
        "Garantir integridade na venda de ingressos, evitando overselling mesmo com requisições simultâneas.",
      "en-US":
        "Ensure integrity in ticket sales, preventing overselling even with simultaneous requests.",
    },
    architectureTitle: {
      "pt-BR": "API REST com controle transacional",
      "en-US": "REST API with transactional control",
    },
    architectureDescription: {
      "pt-BR":
        "Express organiza rotas por domínio. MySQL garante ACID nas operações de reserva e compra, com histórico de status.",
      "en-US":
        "Express organizes routes by domain. MySQL ensures ACID on reservation and purchase operations, with status history.",
    },
    diagramNodes: {
      "pt-BR": ["Client", "Reservation", "Purchase", "Transaction", "Database"],
      "en-US": ["Client", "Reservation", "Purchase", "Transaction", "Database"],
    },
    dataFlowNodes: {
      "pt-BR": [
        "Cliente HTTP",
        "Reserva temporária",
        "Confirmação de compra",
        "Transação MySQL",
        "Histórico de status",
      ],
      "en-US": [
        "HTTP Client",
        "Temporary reservation",
        "Purchase confirmation",
        "MySQL transaction",
        "Status history",
      ],
    },
    features: {
      "pt-BR": [
        "Concorrência",
        "Reserva temporária",
        "Cancelamento",
        "Histórico",
      ],
      "en-US": [
        "Concurrency",
        "Temporary reservation",
        "Cancellation",
        "History",
      ],
    },
    technologies: {
      "pt-BR": [
        "Node.js",
        "TypeScript",
        "Express",
        "MySQL",
        "Vitest",
        "Swagger",
      ],
      "en-US": [
        "Node.js",
        "TypeScript",
        "Express",
        "MySQL",
        "Vitest",
        "Swagger",
      ],
    },
    technicalDecisions: [
      {
        title: {
          "pt-BR": "Transações no MySQL",
          "en-US": "MySQL transactions",
        },
        description: {
          "pt-BR":
            "Atomicidade na reserva e compra evita condições de corrida em alta concorrência.",
          "en-US":
            "Atomicity in reservation and purchase prevents race conditions under high concurrency.",
        },
      },
      {
        title: {
          "pt-BR": "Histórico de status",
          "en-US": "Status history",
        },
        description: {
          "pt-BR":
            "Rastreia o ciclo de vida de cada pedido para suporte e debugging.",
          "en-US": "Tracks each order lifecycle for support and debugging.",
        },
      },
      {
        title: {
          "pt-BR": "Vitest automatizado",
          "en-US": "Automated Vitest",
        },
        description: {
          "pt-BR":
            "Cobertura dos fluxos críticos de reserva, compra e cancelamento.",
          "en-US":
            "Coverage of critical reservation, purchase, and cancellation flows.",
        },
      },
    ],
  },
  {
    slug: "finance-app",
    name: { "pt-BR": "Finance App", "en-US": "Finance App" },
    overview: {
      "pt-BR":
        "API de controle financeiro pessoal com autenticação, transações categorizadas e dashboard consolidado.",
      "en-US":
        "Personal finance control API with authentication, categorized transactions, and consolidated dashboard.",
    },
    objective: {
      "pt-BR":
        "Oferecer registro confiável de receitas e despesas com categorização e visão consolidada do saldo.",
      "en-US":
        "Provide reliable income and expense tracking with categorization and consolidated balance view.",
    },
    architectureTitle: {
      "pt-BR": "API REST com use cases explícitos",
      "en-US": "REST API with explicit use cases",
    },
    architectureDescription: {
      "pt-BR":
        "Controllers delegam regras a use cases isolados. PostgreSQL com migrações versionadas e ambiente Docker.",
      "en-US":
        "Controllers delegate rules to isolated use cases. PostgreSQL with versioned migrations and Docker environment.",
    },
    diagramNodes: {
      "pt-BR": ["Frontend", "API", "Database"],
      "en-US": ["Frontend", "API", "Database"],
    },
    dataFlowNodes: {
      "pt-BR": [
        "Cliente HTTP",
        "Express Controllers",
        "Use Cases financeiros",
        "PostgreSQL",
      ],
      "en-US": [
        "HTTP Client",
        "Express Controllers",
        "Finance use cases",
        "PostgreSQL",
      ],
    },
    features: {
      "pt-BR": ["Autenticação", "Dashboard", "CRUD Financeiro"],
      "en-US": ["Authentication", "Dashboard", "Finance CRUD"],
    },
    technologies: {
      "pt-BR": ["Node.js", "Express", "PostgreSQL", "Docker", "JavaScript"],
      "en-US": ["Node.js", "Express", "PostgreSQL", "Docker", "JavaScript"],
    },
    technicalDecisions: [
      {
        title: {
          "pt-BR": "Use cases explícitos",
          "en-US": "Explicit use cases",
        },
        description: {
          "pt-BR":
            "Isola regras de negócio dos controllers, facilitando testes e manutenção.",
          "en-US":
            "Isolates business rules from controllers, easing tests and maintenance.",
        },
      },
      {
        title: {
          "pt-BR": "Migrações versionadas",
          "en-US": "Versioned migrations",
        },
        description: {
          "pt-BR":
            "Scripts SQL automatizados garantem reprodutibilidade do schema entre ambientes.",
          "en-US":
            "Automated SQL scripts ensure schema reproducibility across environments.",
        },
      },
      {
        title: {
          "pt-BR": "Docker Compose",
          "en-US": "Docker Compose",
        },
        description: {
          "pt-BR":
            "Padroniza ambiente de desenvolvimento e simplifica onboarding.",
          "en-US":
            "Standardizes the development environment and simplifies onboarding.",
        },
      },
    ],
  },
  {
    slug: "portfolio-viviane",
    name: { "pt-BR": "Portfolio Viviane", "en-US": "Portfolio Viviane" },
    overview: {
      "pt-BR":
        "Portfólio técnico bilíngue com SEO avançado, modo recrutador, blog e pipeline de qualidade automatizado.",
      "en-US":
        "Bilingual technical portfolio with advanced SEO, recruiter mode, blog, and automated quality pipeline.",
    },
    objective: {
      "pt-BR":
        "Comunicar projetos reais, decisões técnicas e boas práticas de engenharia para recrutadores em poucos minutos.",
      "en-US":
        "Communicate real projects, technical decisions, and engineering best practices to recruiters in minutes.",
    },
    architectureTitle: {
      "pt-BR": "Next.js App Router com Server Components",
      "en-US": "Next.js App Router with Server Components",
    },
    architectureDescription: {
      "pt-BR":
        "Dados em src/data, UI em components, páginas estáticas via generateStaticParams e client components apenas onde necessário.",
      "en-US":
        "Data in src/data, UI in components, static pages via generateStaticParams, and client components only where needed.",
    },
    diagramNodes: {
      "pt-BR": ["Next.js", "App Router", "SEO", "Analytics", "Deploy"],
      "en-US": ["Next.js", "App Router", "SEO", "Analytics", "Deploy"],
    },
    dataFlowNodes: {
      "pt-BR": [
        "Visitante",
        "App Router",
        "Server Components",
        "Dados localizados",
        "Metadata + JSON-LD",
        "Vercel Deploy",
      ],
      "en-US": [
        "Visitor",
        "App Router",
        "Server Components",
        "Localized data",
        "Metadata + JSON-LD",
        "Vercel Deploy",
      ],
    },
    features: {
      "pt-BR": ["i18n", "SEO", "Recruiter Mode", "Quality", "Observabilidade"],
      "en-US": ["i18n", "SEO", "Recruiter Mode", "Quality", "Observability"],
    },
    technologies: {
      "pt-BR": [
        "Next.js",
        "TypeScript",
        "TailwindCSS",
        "next-intl",
        "shadcn/ui",
        "Vercel",
      ],
      "en-US": [
        "Next.js",
        "TypeScript",
        "TailwindCSS",
        "next-intl",
        "shadcn/ui",
        "Vercel",
      ],
    },
    technicalDecisions: [
      {
        title: {
          "pt-BR": "App Router + SSG",
          "en-US": "App Router + SSG",
        },
        description: {
          "pt-BR":
            "Páginas geradas estaticamente para performance e SEO com rotas dinâmicas por slug.",
          "en-US":
            "Statically generated pages for performance and SEO with dynamic slug routes.",
        },
      },
      {
        title: {
          "pt-BR": "Separação dados/UI",
          "en-US": "Data/UI separation",
        },
        description: {
          "pt-BR":
            "Conteúdo tipado em src/data facilita manutenção sem acoplar aos componentes.",
          "en-US":
            "Typed content in src/data eases maintenance without coupling to components.",
        },
      },
      {
        title: {
          "pt-BR": "Pipeline de qualidade",
          "en-US": "Quality pipeline",
        },
        description: {
          "pt-BR":
            "Husky, lint-staged, commitlint e GitHub Actions garantem padrão desde o desenvolvimento.",
          "en-US":
            "Husky, lint-staged, commitlint, and GitHub Actions ensure standards from development.",
        },
      },
    ],
  },
] as const satisfies readonly {
  slug: string;
  name: Localized<string>;
  overview: Localized<string>;
  objective: Localized<string>;
  architectureTitle: Localized<string>;
  architectureDescription: Localized<string>;
  diagramNodes: Localized<string[]>;
  dataFlowNodes: Localized<string[]>;
  features: Localized<string[]>;
  technologies: Localized<string[]>;
  technicalDecisions: readonly {
    title: Localized<string>;
    description: Localized<string>;
  }[];
}[];

export function getArchitectureShowcases(
  locale: Locale,
): ArchitectureShowcaseItem[] {
  return SHOWCASE_SOURCE.map((item) => ({
    slug: item.slug,
    name: pickLocalized(item.name, locale),
    overview: pickLocalized(item.overview, locale),
    objective: pickLocalized(item.objective, locale),
    architectureTitle: pickLocalized(item.architectureTitle, locale),
    architectureDescription: pickLocalized(
      item.architectureDescription,
      locale,
    ),
    diagramNodes: pickLocalized(
      item.diagramNodes as Localized<string[]>,
      locale,
    ),
    dataFlowNodes: pickLocalized(
      item.dataFlowNodes as Localized<string[]>,
      locale,
    ),
    features: pickLocalized(item.features as Localized<string[]>, locale),
    technologies: pickLocalized(
      item.technologies as Localized<string[]>,
      locale,
    ),
    technicalDecisions: item.technicalDecisions.map((decision) => ({
      title: pickLocalized(decision.title, locale),
      description: pickLocalized(decision.description, locale),
    })),
  }));
}
