import type { Project } from "@/types";

export const PROJECTS_EN: Project[] = [
  {
    slug: "stockflow",
    name: "StockFlow",
    description:
      "Multi-tenant SaaS API for inventory management with authentication, RBAC, and observability.",
    longDescription:
      "StockFlow is a backend platform designed for companies that need centralized inventory control in a multi-tenant environment. The API exposes product, movement, alert, and audit operations, with OpenAPI documentation and a Next.js frontend integrated in production on Vercel.",
    status: "completed",
    image: "/projects/stockflow/cover.png",
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
      "Swagger",
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
      { label: "Architecture", value: "Multi-tenant SaaS API" },
      { label: "Endpoints", value: "45+ documented REST" },
      { label: "Docs", value: "Swagger/OpenAPI" },
      { label: "Pipeline", value: "Active CI/CD" },
    ],
    challenges: ["Security", "Scalability", "Architecture", "Performance"],
    highlights: [
      "JWT + Refresh Token authentication",
      "RBAC by access profile",
      "Operation audit trail",
      "Redis caching",
      "Health checks and rate limiting",
    ],
    problem:
      "Companies with multiple units or branches need a reliable inventory system with data isolation per company, movement traceability, and APIs ready for integration with administrative dashboards.",
    businessRules: [
      "Each company operates in an isolated context (multi-tenant).",
      "Users have roles with distinct permissions via RBAC.",
      "Inventory movements must be auditable.",
      "Access tokens expire and are renewed via refresh token.",
      "Critical endpoints have rate limiting for protection.",
    ],
    architecture: {
      title: "Layered architecture with NestJS",
      description:
        "The API follows NestJS modules with separation between controllers, services, and Prisma repositories. Redis acts as a read cache and PostgreSQL as the source of truth.",
      flow: [
        "Client / Frontend",
        "NestJS API Gateway",
        "Auth + RBAC",
        "Domain services",
        "Prisma + PostgreSQL",
        "Redis Cache",
      ],
    },
    technicalDecisions: [
      {
        title: "NestJS + Prisma",
        description:
          "Chosen to accelerate typed development, with versioned migrations and clear contracts between domain and persistence.",
      },
      {
        title: "Redis for caching",
        description:
          "Reduces repetitive queries on dashboards and high-volume listings without compromising write consistency.",
      },
      {
        title: "Swagger/OpenAPI",
        description:
          "Living API documentation to facilitate frontend integration and technical review in interviews.",
      },
      {
        title: "CI/CD on GitHub Actions",
        description:
          "Automated pipeline ensures lint, tests, and build on every push, reducing production regressions.",
      },
    ],
    learnings: [
      "Modeling multi-tenancy from the start avoids costly refactors.",
      "Audit and RBAC should be treated as first-class requirements.",
      "Health checks and rate limiting increase perceived API reliability.",
    ],
    roadmap: [
      "Real-time notifications for inventory alerts.",
      "Exportable analytical reports.",
      "Expanded e2e tests in the pipeline.",
      "Observability with metrics and distributed tracing.",
    ],
  },
  {
    slug: "ticket-sales",
    name: "Ticket Sales",
    description:
      "Ticket sales API with reservation, batch purchase, and concurrency control.",
    longDescription:
      "Ticket Sales is a backend for events that manages the full ticket lifecycle: temporary reservation, multi-ticket purchase, cancellation, and status history. The focus is on transactional integrity and concurrency control to prevent overselling.",
    status: "completed",
    image: "/projects/ticket-sales/cover.png",
    githubUrl: "https://github.com/vivianeaguiarc/ticket-sales",
    deployUrl: "https://ticket-sales-3su2.onrender.com/docs/",
    technologies: [
      "Node.js",
      "TypeScript",
      "Express",
      "MySQL",
      "Vitest",
      "Swagger",
    ],
    concepts: [
      "Transactions",
      "Concurrency",
      "REST API",
      "Automated Testing",
      "Status History",
    ],
    metrics: [
      { label: "Flows", value: "Reservation and purchase" },
      { label: "Concurrency", value: "Transactional control" },
      { label: "Tests", value: "Automated Vitest" },
      { label: "Docs", value: "Published Swagger" },
    ],
    challenges: [
      "Concurrency",
      "Data integrity",
      "Business rules",
      "Reliability",
    ],
    highlights: [
      "Ticket reservation",
      "Multi-ticket purchase",
      "Cancellation with history",
      "Database transactions",
      "Status history",
    ],
    problem:
      "Online ticket sales require ensuring the same seat or batch is not sold twice, even with simultaneous requests, while tracking every order status change.",
    businessRules: [
      "Reservations have a configurable expiration time.",
      "Purchase confirms only tickets available at transaction time.",
      "Cancellations update inventory and record history.",
      "Every status change is persisted for audit.",
      "Critical operations run within database transactions.",
    ],
    architecture: {
      title: "REST API with transactional control",
      description:
        "Express organizes routes by domain (events, tickets, orders). MySQL guarantees ACID on reservation and purchase operations, with Vitest tests covering critical flows.",
      flow: [
        "HTTP Client",
        "Express Routes",
        "Business rules",
        "MySQL Transaction",
        "Status history",
        "Response + Swagger",
      ],
    },
    technicalDecisions: [
      {
        title: "MySQL transactions",
        description:
          "Ensure atomicity on reservation and purchase, avoiding race conditions in high-concurrency scenarios.",
      },
      {
        title: "Status history",
        description:
          "Enables tracking of each order's lifecycle and facilitates support and debugging in production.",
      },
      {
        title: "Vitest for testing",
        description:
          "Automated coverage of reservation, purchase, and cancellation flows reduces regressions in sensitive rules.",
      },
    ],
    learnings: [
      "Concurrency in ticket sales requires transactional design, not just application-level validation.",
      "Status history simplifies production problem diagnosis.",
      "Swagger documentation accelerates integration and project demonstration.",
    ],
    roadmap: [
      "Processing queue for demand spikes.",
      "Payment gateway integration.",
      "Admin dashboard for event producers.",
      "Automated load testing.",
    ],
  },
  {
    slug: "tirei-de-letra",
    name: "Tirei de Letra",
    description:
      "Educational platform for ENEM with mock exams, AI-powered essays, and marketplace.",
    longDescription:
      "Tirei de Letra is an EdTech product in development focused on ENEM preparation. The proposal combines mock exams, AI-assisted essay correction, a teacher marketplace, and a premium plan, with a monorepo architecture and security and LGPD compliance planned for scale.",
    status: "inDevelopment",
    image: "/projects/tirei-de-letra.svg",
    technologies: [
      "Next.js",
      "TypeScript",
      "Turborepo",
      "PostgreSQL",
      "TailwindCSS",
    ],
    concepts: ["Monorepo", "EdTech", "Generative AI", "Marketplace", "LGPD"],
    metrics: [
      { label: "Scope", value: "ENEM platform" },
      { label: "Architecture", value: "Monorepo" },
      { label: "Product", value: "Premium planned" },
      { label: "Compliance", value: "LGPD on roadmap" },
    ],
    challenges: [
      "Scalability",
      "Security",
      "Student experience",
      "Monetization",
    ],
    highlights: [
      "Mock exams and study tracks",
      "AI-powered essays",
      "Teacher marketplace",
      "Premium model",
      "Security and LGPD planned",
    ],
    problem:
      "ENEM students need an integrated platform that combines practice, personalized essay feedback, and access to teachers, with a smooth experience and a sustainable business model.",
    businessRules: [
      "Mock exams follow structure and timing close to the real exam.",
      "Essay corrections must record the student's progress history.",
      "Marketplace teachers go through registration and evaluation flow.",
      "Premium features unlock advanced content and corrections.",
      "Sensitive data from minors requires LGPD compliance.",
    ],
    architecture: {
      title: "Monorepo with shared apps and packages",
      description:
        "Turborepo organizes frontend, APIs, and shared packages (types, UI, validations). PostgreSQL centralizes academic and subscription data.",
      flow: [
        "Next.js Web App",
        "Mock exam API",
        "AI essay service",
        "Marketplace",
        "PostgreSQL",
        "Authentication + LGPD",
      ],
    },
    technicalDecisions: [
      {
        title: "Monorepo with Turborepo",
        description:
          "Enables sharing types and components across apps without duplicating code, accelerating MVP iterations.",
      },
      {
        title: "AI for essays",
        description:
          "Automated feedback complements human correction, scaling perceived value for students.",
      },
      {
        title: "LGPD by design",
        description:
          "Consent, data minimization, and retention policies planned before launch at scale.",
      },
    ],
    learnings: [
      "EdTech products require balance between engagement and pedagogical rigor.",
      "Monorepo facilitates parallel evolution of multiple product modules.",
      "Compliance cannot be treated as a final project stage.",
    ],
    roadmap: [
      "Public MVP with free mock exams.",
      "Premium plan launch.",
      "Teacher marketplace in beta.",
      "LGPD certifications and compliance formalized.",
    ],
  },
  {
    slug: "finance-app",
    name: "Finance App",
    description:
      "Personal finance control API with authentication, transactions, and dashboard.",
    longDescription:
      "Finance App is a backend API for personal financial management. It enables user registration, income and expense tracking, transaction categorization, and consolidated dashboard views, with PostgreSQL persistence and a containerized Docker environment.",
    status: "completed",
    image: "/projects/finance-app/cover.png",
    githubUrl: "https://github.com/vivianeaguiarc/finance-app",
    deployUrl: "https://finance-app-i600.onrender.com/docs/",
    technologies: ["Node.js", "Express", "PostgreSQL", "Docker", "JavaScript"],
    concepts: ["REST API", "CRUD", "SQL Migrations", "Docker", "Clean Code"],
    metrics: [
      { label: "Domain", value: "Financial management" },
      { label: "Persistence", value: "PostgreSQL" },
      { label: "Environment", value: "Docker Compose" },
      { label: "Docs", value: "Documented API" },
    ],
    challenges: [
      "Data modeling",
      "Rule validation",
      "Code quality",
      "Cloud deployment",
    ],
    highlights: [
      "User authentication",
      "Transaction CRUD",
      "Financial dashboard",
      "Income and expense organization",
      "Automated migrations",
    ],
    problem:
      "Users need a simple and reliable way to record financial transactions, categorize expenses, and track balance without relying on manual spreadsheets.",
    businessRules: [
      "Each transaction belongs to a single authenticated user.",
      "Transaction types: income, expense, or investment.",
      "Amounts and dates are required and validated by the API.",
      "Dashboard consolidates totals by period and category.",
      "Passwords stored with secure hashing.",
    ],
    architecture: {
      title: "Express API with use case layers",
      description:
        "Separation between controllers, use cases, and data access via PostgreSQL helper. Docker Compose standardizes development and deployment environments.",
      flow: [
        "HTTP Client",
        "Express Controllers",
        "Use Cases",
        "PostgreSQL",
        "SQL Migrations",
        "API Documentation",
      ],
    },
    technicalDecisions: [
      {
        title: "Explicit use cases",
        description:
          "Isolates business rules from controllers, facilitating tests and financial domain maintenance.",
      },
      {
        title: "Versioned migrations",
        description:
          "Automated SQL scripts ensure schema reproducibility across environments.",
      },
      {
        title: "Docker for the database",
        description:
          "Eliminates differences between local machines and facilitates onboarding of new developers.",
      },
    ],
    learnings: [
      "Modeling financial transactions with explicit types avoids ambiguity in reports.",
      "Migrations from the start simplify schema evolution.",
      "API documentation is essential even in portfolio projects.",
    ],
    roadmap: [
      "Financial goals and budget alerts.",
      "PDF/CSV report export.",
      "Web frontend with interactive charts.",
      "OAuth authentication for social login.",
    ],
  },
  {
    slug: "portfolio-viviane",
    name: "Portfolio Viviane",
    description:
      "Technical portfolio focused on SEO, performance, and professional presentation.",
    longDescription:
      "This portfolio was built as a professional presentation product: each section communicates technical skills objectively for recruiters and tech leads, with detailed case studies, optimized SEO, dark mode, and an automated quality pipeline.",
    status: "completed",
    image: "/projects/portfolio-viviane/cover.png",
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
      { label: "Quality", value: "ESLint + Prettier" },
      { label: "SEO", value: "JSON-LD + sitemap" },
      { label: "Pipeline", value: "GitHub Actions" },
    ],
    challenges: [
      "Performance",
      "Accessibility",
      "Technical SEO",
      "Maintainability",
    ],
    highlights: [
      "Portfolio as a product",
      "Reusable componentization",
      "Dark mode and responsiveness",
      "Open Graph and Twitter Cards",
      "Optimized static build",
    ],
    problem:
      "Recruiters and tech leads evaluate candidates in minutes. A portfolio was needed that clearly and performantly communicates real projects, technical decisions, and engineering best practices.",
    businessRules: [
      "Content oriented to technical decisions, not just a technology list.",
      "Each project must have a case study accessible via its own URL.",
      "SEO and dynamic metadata on all project pages.",
      "Contact form with client-side validation.",
      "Responsive and accessible layout on mobile and desktop.",
    ],
    architecture: {
      title: "Next.js App Router with decoupled components",
      description:
        "Data in src/data, UI in components/ui and sections, static pages generated via generateStaticParams. Server Components by default, client only where needed.",
      flow: [
        "Visitor",
        "Next.js App Router",
        "Server Components",
        "Data in projects.ts",
        "Dynamic metadata",
        "Vercel deploy + CI",
      ],
    },
    technicalDecisions: [
      {
        title: "App Router + SSG",
        description:
          "Project pages generated statically for performance and SEO, with dynamic routes by slug.",
      },
      {
        title: "Data/UI separation",
        description:
          "Typed case studies in files facilitate maintenance and evolution without coupling content to components.",
      },
      {
        title: "Quality pipeline",
        description:
          "Husky, lint-staged, commitlint, and GitHub Actions ensure corporate standards from development onward.",
      },
    ],
    learnings: [
      "A technical portfolio should tell engineering stories, not just display screenshots.",
      "SEO and performance are part of demonstrating frontend competence.",
      "Componentization reduces evolution cost across product phases.",
    ],
    roadmap: [
      "Technical blog integrated into the portfolio.",
      "Internationalization (pt/en).",
      "Privacy-respecting analytics.",
      "Presentation mode for live interviews.",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS_EN.find((project) => project.slug === slug);
}
