import type { BlogPost } from "@/types";

export const BLOG_POSTS_EN: BlogPost[] = [
  {
    slug: "rbac-stockflow",
    title: "How I implemented RBAC in StockFlow",
    description:
      "How I modeled roles, permissions, and resource-based authorization in the StockFlow multi-tenant SaaS inventory API with NestJS.",
    category: "Security",
    publishedAt: "2026-03-10",
    readingTime: "8 min read",
    tags: ["Node.js", "TypeScript", "RBAC", "Security"],
    content: {
      sections: [
        {
          heading: "Context in StockFlow",
          paragraphs: [
            "StockFlow is a multi-tenant SaaS API for inventory management. Each company has users with different responsibilities: administrators, inventory operators, and report viewers.",
            "RBAC (Role-Based Access Control) was necessary to ensure an operator could not change company settings or access another tenant's data.",
          ],
        },
        {
          heading: "Role modeling",
          paragraphs: [
            "I defined fixed roles in the domain and associated granular permissions per resource: products, movements, users, and audit.",
          ],
          list: [
            "ADMIN: full tenant management",
            "MANAGER: movements and reports",
            "VIEWER: read-only access",
          ],
        },
        {
          heading: "Implementation with NestJS guards",
          paragraphs: [
            "I used custom guards combined with decorators to declare permissions on controllers, keeping authorization rules close to the route without polluting business logic.",
          ],
          code: {
            language: "typescript",
            content: `@Roles('ADMIN', 'MANAGER')
@UseGuards(JwtAuthGuard, RolesGuard, TenantGuard)
@Post('movements')
createMovement(@Body() dto: CreateMovementDto) {
  return this.movementService.create(dto);
}`,
          },
        },
        {
          heading: "Multi-tenant isolation",
          paragraphs: [
            "Each request carries the tenantId from the JWT token. The TenantGuard validates whether the resource belongs to the user's company before executing the service.",
            "This RBAC + tenant combination prevents horizontal data leakage between companies — a critical requirement in any B2B SaaS.",
          ],
        },
        {
          heading: "Lessons learned",
          paragraphs: [
            "Documenting the role × permission matrix in the API README helped with security review and integration with the StockFlow Next.js frontend.",
            "Well-modeled RBAC reduces scattered if statements and makes it easier to evolve new profiles without rewriting business rules.",
          ],
        },
      ],
    },
  },
  {
    slug: "jwt-apis-pratica",
    title: "JWT in practice: secure authentication in APIs",
    description:
      "Access token, refresh token, and secure rotation applied in StockFlow and Finance App.",
    category: "Backend",
    publishedAt: "2026-02-18",
    readingTime: "7 min read",
    tags: ["JWT", "Backend", "Security", "REST API"],
    content: {
      sections: [
        {
          heading: "Why JWT in my projects",
          paragraphs: [
            "In StockFlow and Finance App, I chose JWT for being stateless and facilitating integration with frontends and Swagger documentation.",
            "The challenge is not issuing the token — it is managing expiration, renewal, and revocation without compromising user experience.",
          ],
        },
        {
          heading: "Short access token + refresh token",
          paragraphs: [
            "Access tokens with a short lifespan (15 minutes) limit the exposure window. Refresh tokens with a longer lifespan are persisted with a hash in PostgreSQL.",
          ],
          code: {
            language: "typescript",
            content: `// Minimal payload — no sensitive data
{
  "sub": "user-uuid",
  "tenantId": "company-uuid",
  "role": "MANAGER",
  "exp": 1710000000
}`,
          },
        },
        {
          heading: "Renewal flow",
          paragraphs: [
            "The StockFlow frontend intercepts 401, calls /auth/refresh with the refresh token in an HttpOnly cookie, and retries the original request.",
            "In Finance App, the flow is similar, with device fingerprint validation to reduce session theft.",
          ],
          list: [
            "Refresh token stored with bcrypt hash",
            "Rotation on every renewal",
            "Invalidation on logout",
          ],
        },
        {
          heading: "Applied best practices",
          paragraphs: [
            "I never store passwords in plain text. Secrets live in environment variables. HS256 algorithm with a strong key and planned rotation.",
            "Health checks and rate limiting on the login route protect against brute force — a pattern I also use in Ticket Sales.",
          ],
        },
      ],
    },
  },
  {
    slug: "multi-tenant-saas",
    title: "Multi-Tenant explained with a real project",
    description:
      "Data isolation strategies and schema design used in StockFlow with PostgreSQL and Prisma.",
    category: "Architecture",
    publishedAt: "2026-01-25",
    readingTime: "9 min read",
    tags: ["SaaS", "Multi-Tenant", "Architecture", "PostgreSQL"],
    content: {
      sections: [
        {
          heading: "The multi-company SaaS problem",
          paragraphs: [
            "In StockFlow, each client (company) needs to see only its products, movements, and users. Getting isolation wrong means data leakage — unacceptable in production.",
          ],
        },
        {
          heading: "Chosen strategy: shared database, shared schema",
          paragraphs: [
            "I opted for a shared database with a tenant_id column on all domain tables. It is the ideal balance for the product's current stage: controlled cost and simple migrations with Prisma.",
          ],
          list: [
            "tenant_id on all queries",
            "Composite indexes (tenant_id, id)",
            "Prisma middleware for automatic filtering",
          ],
        },
        {
          heading: "Implementation with Prisma",
          paragraphs: [
            "I created middleware that injects where: { tenantId } in findMany and validates ownership on update/delete. This reduces the risk of forgetting the filter in a query.",
          ],
          code: {
            language: "typescript",
            content: `prisma.$use(async (params, next) => {
  if (params.model && TENANT_MODELS.includes(params.model)) {
    if (params.action === 'findMany') {
      params.args.where = { ...params.args.where, tenantId };
    }
  }
  return next(params);
});`,
          },
        },
        {
          heading: "Connection to Tirei de Letra",
          paragraphs: [
            "In Tirei de Letra, the premium model and teacher marketplace will also require isolation by institution and LGPD by design — StockFlow lessons will be reused in the EdTech monorepo.",
          ],
        },
      ],
    },
  },
  {
    slug: "concorrencia-ticket-sales",
    title: "Concurrency control in ticket sales",
    description:
      "How Ticket Sales prevents overselling with MySQL transactions and status history.",
    category: "Backend",
    publishedAt: "2025-12-12",
    readingTime: "8 min read",
    tags: ["Node.js", "MySQL", "Transactions", "Concurrency"],
    content: {
      sections: [
        {
          heading: "The Ticket Sales challenge",
          paragraphs: [
            "Selling tickets online is a classic concurrency problem: two people may try to buy the last seat at the same time.",
            "In Ticket Sales, I implemented temporary reservation, batch purchase, and cancellation with complete status history.",
          ],
        },
        {
          heading: "Reservation with expiration",
          paragraphs: [
            "When reserving, the system blocks the ticket for a few minutes. If payment is not confirmed, the reservation expires and the seat returns to available inventory.",
          ],
        },
        {
          heading: "MySQL transactions",
          paragraphs: [
            "Purchase runs inside a transaction with SELECT ... FOR UPDATE on the ticket row, ensuring only one session can confirm the sale.",
          ],
          code: {
            language: "sql",
            content: `START TRANSACTION;
SELECT available FROM tickets WHERE id = ? FOR UPDATE;
UPDATE tickets SET status = 'SOLD' WHERE id = ? AND available > 0;
INSERT INTO orders (...);
COMMIT;`,
          },
        },
        {
          heading: "Status history",
          paragraphs: [
            "Every change — RESERVED, PAID, CANCELLED — is recorded in an audit table. This facilitated debugging and tests with Vitest covering race scenarios.",
          ],
          list: [
            "Concurrency tests with Vitest",
            "Swagger documenting reservation and purchase flows",
            "Deploy on Render with health check",
          ],
        },
      ],
    },
  },
  {
    slug: "qualidade-fullstack",
    title: "How I structure Fullstack projects with code quality",
    description:
      "ESLint, Prettier, Husky, CI/CD, and conventions applied in Portfolio Viviane and other projects.",
    category: "Quality",
    publishedAt: "2025-11-05",
    readingTime: "6 min read",
    tags: ["TypeScript", "ESLint", "Prettier", "CI/CD"],
    content: {
      sections: [
        {
          heading: "Quality as a product",
          paragraphs: [
            "In Portfolio Viviane, I treated code quality as a business requirement: recruiters and tech leads evaluate not just the visual design, but also the engineering behind it.",
            "The same discipline applies to StockFlow, Ticket Sales, and Finance App.",
          ],
        },
        {
          heading: "Quality stack",
          paragraphs: [
            "I standardized tools across all repositories to reduce cognitive friction between projects.",
          ],
          list: [
            "TypeScript strict mode",
            "ESLint flat config + Prettier",
            "Husky + lint-staged + Commitlint",
            "GitHub Actions: lint, type-check, and build",
          ],
        },
        {
          heading: "Folder structure",
          paragraphs: [
            "In the portfolio, I separated data (src/data), UI (components), and routes (app). Case studies and blog articles live in typed files — no hardcoded content in components.",
          ],
          code: {
            language: "text",
            content: `src/
├── app/           # Next.js routes
├── components/    # Reusable UI
├── data/          # Typed content
├── lib/           # SEO, utils
└── types/         # TypeScript contracts`,
          },
        },
        {
          heading: "CI that blocks regression",
          paragraphs: [
            "The pipeline fails if package-lock is out of sync, if lint breaks, or if the build does not pass. This has already prevented broken deploys on GitHub.",
            "Dependabot keeps dependencies updated weekly.",
          ],
        },
        {
          heading: "Next steps",
          paragraphs: [
            "Expand e2e test coverage in StockFlow and document ADRs (Architecture Decision Records) on the blog — this article is the first step in that technical authority strategy.",
          ],
        },
      ],
    },
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS_EN.find((post) => post.slug === slug);
}

export function getRecentBlogPosts(limit = 3): BlogPost[] {
  return [...BLOG_POSTS_EN]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, limit);
}

export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS_EN.map((post) => post.slug);
}
