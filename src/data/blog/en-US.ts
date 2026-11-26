import type { BlogPost } from "@/types";

export const BLOG_POSTS_EN: BlogPost[] = [
  {
    slug: "rbac-stockflow",
    title: "How I implemented RBAC in StockFlow",
    description:
      "How I modeled roles and authorization in the StockFlow multi-company SaaS API with Express middlewares, and how isolation between companies is enforced by companyId.",
    category: "Security",
    publishedAt: "2026-03-10",
    readingTime: "6 min read",
    tags: ["Node.js", "TypeScript", "RBAC", "Security"],
    content: {
      sections: [
        {
          heading: "Context in StockFlow",
          paragraphs: [
            "StockFlow is a multi-company SaaS API for inventory management. Each user belongs to a company and has one of three roles, defined in the UserRole enum of the Prisma schema: ADMIN, MANAGER, and USER.",
            "Access control solves two different problems: preventing a user from performing actions outside their role, and preventing them from accessing another company's data.",
          ],
        },
        {
          heading: "Role modeling",
          paragraphs: [
            "Roles are fixed and there are no per-resource permissions: each route declares which roles can access it.",
          ],
          list: [
            "ADMIN: full access, including creating, listing, and deleting users; creating, editing, and deleting companies; deleting categories; viewing audit logs.",
            "MANAGER: create, edit, and delete products; create and edit categories; record stock movements; view and edit users; view companies.",
            "USER: read-only access to products, categories, low-stock products, and stock movements.",
          ],
        },
        {
          heading: "Implementation with Express middlewares",
          paragraphs: [
            "Authorization is done by middlewares chained on the route itself. authenticate validates the JWT and populates req.user. Then authorizeRoles(...allowedRoles: UserRole[]) responds 401 if there is no req.user and 403 if req.user.role is not among the allowed roles.",
            "After that, validateRequest validates the request body with a Zod schema, and only then is the controller executed.",
          ],
          code: {
            language: "typescript",
            content: `router.post(
  '/',
  authenticate,
  authorizeRoles('ADMIN', 'MANAGER'),
  validateRequest(createProductSchema),
  (req, res, next) => productsController.create(req, res, next),
)`,
          },
        },
        {
          heading: "Isolation between companies",
          paragraphs: [
            "The JWT carries the user's companyId, and the authenticate middleware checks against the database that this companyId matches the user's.",
            "Controllers pass req.user.companyId to services, and repositories filter queries by that field — for example, findActiveInCompany(companyId, productId). A resource from another company is not found.",
            "The role defines which actions the user can perform; the companyId defines which data they can perform them on.",
          ],
        },
        {
          heading: "Business rules beyond the role",
          paragraphs: [
            "Some rules cannot be expressed by the role check alone and live in UsersService:",
          ],
          list: [
            "A user cannot delete themselves.",
            "The last ADMIN of a company cannot be removed or demoted.",
            "User editing only accepts the MANAGER or USER roles.",
          ],
        },
        {
          heading: "Lessons learned",
          paragraphs: [
            "Separating role-based authorization from company isolation keeps each responsibility in one place: the role check on the route, the companyId filter in the repository.",
            "Rules that depend on data state, such as protecting the last ADMIN, don't fit in a role middleware and must live in the service layer.",
          ],
        },
      ],
    },
  },
  {
    slug: "jwt-apis-pratica",
    title: "JWT in practice: secure authentication in APIs",
    description:
      "JWT access token, opaque refresh token with rotation, and revocation on logout, as implemented in StockFlow.",
    category: "Backend",
    publishedAt: "2026-02-18",
    readingTime: "6 min read",
    tags: ["JWT", "Backend", "Security", "REST API"],
    content: {
      sections: [
        {
          heading: "Overview",
          paragraphs: [
            "StockFlow authentication uses two tokens with different purposes: a short-lived JWT access token, sent on every request, and an opaque refresh token, used only to obtain a new access token.",
            "The challenge is not issuing the token — it is managing expiration, renewal, and revocation.",
          ],
        },
        {
          heading: "Access token: JWT with HS256",
          paragraphs: [
            "The access token is a JWT signed with HS256. The default expiration is 15 minutes, configured by the JWT_EXPIRES_IN environment variable.",
            "The payload carries the data used to identify the user and authorize the request:",
          ],
          code: {
            language: "json",
            content: `{
  "userId": "user-uuid",
  "email": "user@company.com",
  "companyId": "company-uuid",
  "role": "MANAGER"
}`,
          },
        },
        {
          heading: "Validation in the authenticate middleware",
          paragraphs: [
            "The authenticate middleware does not rely on the signature alone. On every request, it:",
          ],
          list: [
            "verifies the token accepting only the HS256 algorithm;",
            "validates the payload structure with a Zod schema;",
            "checks against the database that the user and the company are active;",
            "checks that the token's companyId, role, and email match the database.",
          ],
        },
        {
          heading: "Refresh token: opaque value, not a JWT",
          paragraphs: [
            "The refresh token is not a JWT. It is a random 48-byte value, encoded in base64url.",
          ],
          list: [
            "The database stores only the SHA-256 hash of the refresh token, never the original value.",
            "The default expiration is 7 days, configured by REFRESH_TOKEN_EXPIRES_IN_DAYS.",
            "On renewal, the refresh token is rotated by the rotate method.",
            "An expired or revoked refresh token returns 401.",
          ],
        },
        {
          heading: "Logout",
          paragraphs: [
            "Logout revokes the refresh token and records an audit log.",
          ],
        },
      ],
    },
  },
  {
    slug: "multi-tenant-saas",
    title: "Multi-Tenant explained with a real project",
    description:
      "How StockFlow isolates each company's data with the companyId column, repository filters, and composite unique constraints in Prisma.",
    category: "Architecture",
    publishedAt: "2026-01-25",
    readingTime: "5 min read",
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
          heading: "Strategy: shared database, shared schema",
          paragraphs: [
            "All companies share the same PostgreSQL database and the same schema. Isolation is done by the companyId column (company_id in the database).",
          ],
          list: [
            "Tables with companyId: User, Category, Supplier, Product, StockMovement, and AuditLog.",
            "Company is the table for the company itself.",
            "RefreshToken links to the user (userId), not directly to the company.",
          ],
        },
        {
          heading: "Filtering by companyId in repositories",
          paragraphs: [
            "The companyId comes from the JWT and is checked against the database by the authenticate middleware. Controllers pass req.user.companyId to services, and repositories receive it as a parameter and filter queries by it — for example, findActiveInCompany(companyId, productId).",
            "Since companyId is part of the query, a resource from another company is not found.",
          ],
        },
        {
          heading: "Indexes and unique constraints with companyId",
          paragraphs: [
            "In the Prisma schema, unique constraints include companyId. Values are therefore unique within each company, not across the whole database: two companies can have a product with the same SKU, but the same company cannot repeat it.",
          ],
          code: {
            language: "prisma",
            content: `// User
@@index([companyId, deletedAt])

// Category
@@unique([companyId, name])

// Supplier
@@unique([companyId, document])
@@unique([companyId, email])

// Product
@@unique([companyId, sku])
@@unique([companyId, barcode])`,
          },
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
