import type { BlogPost } from "@/types";

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "rbac-stockflow",
    title: "Como implementei RBAC no StockFlow",
    description:
      "Como modelei papéis e autorização na API SaaS multiempresa do StockFlow com middlewares Express, e como o isolamento entre empresas é feito por companyId.",
    category: "Segurança",
    publishedAt: "2026-03-10",
    readingTime: "6 min",
    tags: ["Node.js", "TypeScript", "RBAC", "Segurança"],
    content: {
      sections: [
        {
          heading: "Contexto no StockFlow",
          paragraphs: [
            "O StockFlow é uma API SaaS multiempresa para gestão de estoque. Cada usuário pertence a uma empresa e tem um de três papéis, definidos no enum UserRole do schema Prisma: ADMIN, MANAGER e USER.",
            "O controle de acesso resolve dois problemas diferentes: impedir que um usuário execute ações fora do seu papel e impedir que ele acesse dados de outra empresa.",
          ],
        },
        {
          heading: "Modelagem de papéis",
          paragraphs: [
            "Os papéis são fixos e não há permissões por recurso: cada rota declara quais papéis podem acessá-la.",
          ],
          list: [
            "ADMIN: acesso total, incluindo criar, listar e excluir usuários; criar, editar e excluir empresas; excluir categorias; consultar os logs de auditoria.",
            "MANAGER: criar, editar e excluir produtos; criar e editar categorias; registrar movimentações de estoque; consultar e editar usuários; consultar empresas.",
            "USER: somente leitura de produtos, categorias, produtos com estoque baixo e movimentações de estoque.",
          ],
        },
        {
          heading: "Implementação com middlewares Express",
          paragraphs: [
            "A autorização é feita por middlewares encadeados na própria rota. O authenticate valida o JWT e preenche req.user. Em seguida, authorizeRoles(...allowedRoles: UserRole[]) responde 401 se não houver req.user e 403 se req.user.role não estiver entre os papéis permitidos.",
            "Depois disso, validateRequest valida o corpo da requisição com um schema Zod, e só então o controller é executado.",
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
          heading: "Isolamento entre empresas",
          paragraphs: [
            "O JWT carrega o companyId do usuário, e o middleware authenticate confere no banco se esse companyId é igual ao do usuário.",
            "Os controllers repassam req.user.companyId para os services, e os repositories filtram as consultas por esse campo — por exemplo, findActiveInCompany(companyId, productId). Um recurso de outra empresa não é encontrado.",
            "O papel define quais ações o usuário pode executar; o companyId define sobre quais dados ele pode executá-las.",
          ],
        },
        {
          heading: "Regras de negócio além do papel",
          paragraphs: [
            "Algumas regras não podem ser expressas só pela checagem de papel e ficam no UsersService:",
          ],
          list: [
            "Um usuário não pode excluir a si mesmo.",
            "Não é possível remover ou rebaixar o último ADMIN da empresa.",
            "A edição de usuário só aceita os papéis MANAGER ou USER.",
          ],
        },
        {
          heading: "Lições aprendidas",
          paragraphs: [
            "Separar autorização por papel e isolamento por empresa deixa cada responsabilidade em um lugar: a checagem de papel na rota, o filtro por companyId no repository.",
            "Regras que dependem do estado dos dados, como proteger o último ADMIN, não cabem em um middleware de papel e precisam ficar na camada de serviço.",
          ],
        },
      ],
    },
  },
  {
    slug: "jwt-apis-pratica",
    title: "JWT na prática: autenticação segura em APIs",
    description:
      "Access token JWT, refresh token opaco com rotação e revogação no logout, como implementados no StockFlow.",
    category: "Backend",
    publishedAt: "2026-02-18",
    readingTime: "6 min",
    tags: ["JWT", "Backend", "Segurança", "API REST"],
    content: {
      sections: [
        {
          heading: "Visão geral",
          paragraphs: [
            "A autenticação do StockFlow usa dois tokens com funções diferentes: um access token JWT de curta duração, enviado em cada requisição, e um refresh token opaco, usado apenas para obter um novo access token.",
            "O desafio não é emitir o token — é gerenciar expiração, renovação e revogação.",
          ],
        },
        {
          heading: "Access token: JWT com HS256",
          paragraphs: [
            "O access token é um JWT assinado com HS256. A expiração padrão é de 15 minutos, configurada pela variável de ambiente JWT_EXPIRES_IN.",
            "O payload carrega os dados usados para identificar o usuário e autorizar a requisição:",
          ],
          code: {
            language: "json",
            content: `{
  "userId": "user-uuid",
  "email": "user@empresa.com",
  "companyId": "company-uuid",
  "role": "MANAGER"
}`,
          },
        },
        {
          heading: "Validação no middleware authenticate",
          paragraphs: [
            "O middleware authenticate não confia apenas na assinatura. A cada requisição, ele:",
          ],
          list: [
            "verifica o token aceitando somente o algoritmo HS256;",
            "valida a estrutura do payload com um schema Zod;",
            "confere no banco se o usuário e a empresa estão ativos;",
            "confere se companyId, role e email do token são iguais aos do banco.",
          ],
        },
        {
          heading: "Refresh token: valor opaco, não JWT",
          paragraphs: [
            "O refresh token não é um JWT. É um valor aleatório de 48 bytes, codificado em base64url.",
          ],
          list: [
            "O banco guarda apenas o hash SHA-256 do refresh token, nunca o valor original.",
            "A expiração padrão é de 7 dias, configurada por REFRESH_TOKEN_EXPIRES_IN_DAYS.",
            "Na renovação, o refresh token é rotacionado pelo método rotate.",
            "Um refresh token expirado ou revogado retorna 401.",
          ],
        },
        {
          heading: "Logout",
          paragraphs: [
            "O logout revoga o refresh token e registra um log de auditoria.",
          ],
        },
      ],
    },
  },
  {
    slug: "multi-tenant-saas",
    title: "Multi-Tenant explicado com um projeto real",
    description:
      "Como o StockFlow isola os dados de cada empresa com a coluna companyId, filtros nos repositories e restrições únicas compostas no Prisma.",
    category: "Arquitetura",
    publishedAt: "2026-01-25",
    readingTime: "5 min",
    tags: ["SaaS", "Multi-Tenant", "Arquitetura", "PostgreSQL"],
    content: {
      sections: [
        {
          heading: "O problema do SaaS multiempresa",
          paragraphs: [
            "No StockFlow, cada cliente (empresa) precisa ver apenas seus produtos, movimentações e usuários. Errar o isolamento significa vazamento de dados — inaceitável em produção.",
          ],
        },
        {
          heading: "Estratégia: banco e schema compartilhados",
          paragraphs: [
            "Todas as empresas compartilham o mesmo banco PostgreSQL e o mesmo schema. O isolamento é feito pela coluna companyId (company_id no banco).",
          ],
          list: [
            "Tabelas com companyId: User, Category, Supplier, Product, StockMovement e AuditLog.",
            "Company é a tabela da própria empresa.",
            "RefreshToken se liga ao usuário (userId), não diretamente à empresa.",
          ],
        },
        {
          heading: "Filtro por companyId nos repositories",
          paragraphs: [
            "O companyId vem do JWT e é conferido com o banco pelo middleware authenticate. Os controllers repassam req.user.companyId para os services, e os repositories recebem esse valor como parâmetro e filtram as consultas por ele — por exemplo, findActiveInCompany(companyId, productId).",
            "Como o companyId faz parte da consulta, um recurso de outra empresa não é encontrado.",
          ],
        },
        {
          heading: "Índices e restrições únicas com companyId",
          paragraphs: [
            "No schema Prisma, as restrições únicas incluem companyId. Assim, os valores são únicos dentro de cada empresa, e não no banco inteiro: duas empresas podem ter um produto com o mesmo SKU, mas a mesma empresa não pode repeti-lo.",
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
    title: "Controle de concorrência em venda de ingressos",
    description:
      "Como o Ticket Sales evita overselling com transações MySQL e histórico de status.",
    category: "Backend",
    publishedAt: "2025-12-12",
    readingTime: "8 min",
    tags: ["Node.js", "MySQL", "Transações", "Concorrência"],
    content: {
      sections: [
        {
          heading: "O desafio do Ticket Sales",
          paragraphs: [
            "Vender ingressos online é um problema clássico de concorrência: duas pessoas podem tentar comprar o último assento ao mesmo tempo.",
            "No Ticket Sales, implementei reserva temporária, compra em lote e cancelamento com histórico completo de status.",
          ],
        },
        {
          heading: "Reserva com expiração",
          paragraphs: [
            "Ao reservar, o sistema bloqueia o ingresso por alguns minutos. Se o pagamento não confirmar, a reserva expira e o assento volta ao estoque disponível.",
          ],
        },
        {
          heading: "Transações no MySQL",
          paragraphs: [
            "A compra executa dentro de uma transação com SELECT ... FOR UPDATE na linha do ingresso, garantindo que apenas uma sessão consiga confirmar a venda.",
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
          heading: "Histórico de status",
          paragraphs: [
            "Cada mudança — RESERVED, PAID, CANCELLED — é registrada em tabela de auditoria. Isso facilitou debug e testes com Vitest cobrindo cenários de corrida.",
          ],
          list: [
            "Testes de concorrência com Vitest",
            "Swagger documentando fluxos de reserva e compra",
            "Deploy na Render com health check",
          ],
        },
      ],
    },
  },
  {
    slug: "qualidade-fullstack",
    title: "Como estruturo projetos Fullstack com qualidade de código",
    description:
      "ESLint, Prettier, Husky, CI/CD e convenções aplicadas no Portfolio Viviane e nos demais projetos.",
    category: "Qualidade",
    publishedAt: "2025-11-05",
    readingTime: "6 min",
    tags: ["TypeScript", "ESLint", "Prettier", "CI/CD"],
    content: {
      sections: [
        {
          heading: "Qualidade como produto",
          paragraphs: [
            "No Portfolio Viviane, tratei qualidade de código como requisito de negócio: recrutadores e tech leads avaliam não só o visual, mas também a engenharia por trás.",
            "A mesma disciplina se aplica ao StockFlow, Ticket Sales e Finance App.",
          ],
        },
        {
          heading: "Stack de qualidade",
          paragraphs: [
            "Padronizei ferramentas em todos os repositórios para reduzir atrito cognitivo entre projetos.",
          ],
          list: [
            "TypeScript strict mode",
            "ESLint flat config + Prettier",
            "Husky + lint-staged + Commitlint",
            "GitHub Actions: lint, type-check e build",
          ],
        },
        {
          heading: "Estrutura de pastas",
          paragraphs: [
            "No portfólio, separei dados (src/data), UI (components) e rotas (app). Case studies e artigos do blog vivem em arquivos tipados — sem conteúdo hardcoded em componentes.",
          ],
          code: {
            language: "text",
            content: `src/
├── app/           # Rotas Next.js
├── components/    # UI reutilizável
├── data/          # Conteúdo tipado
├── lib/           # SEO, utils
└── types/         # Contratos TypeScript`,
          },
        },
        {
          heading: "CI que bloqueia regressão",
          paragraphs: [
            "O pipeline falha se package-lock estiver dessincronizado, se lint quebrar ou se o build não passar. Isso já evitou deploys quebrados no GitHub.",
            "Dependabot mantém dependências atualizadas semanalmente.",
          ],
        },
        {
          heading: "Próximos passos",
          paragraphs: [
            "Expandir cobertura de testes e2e no StockFlow e documentar ADRs (Architecture Decision Records) no blog — este artigo é o primeiro passo dessa estratégia de autoridade técnica.",
          ],
        },
      ],
    },
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getRecentBlogPosts(limit = 3): BlogPost[] {
  return [...BLOG_POSTS]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, limit);
}

export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map((post) => post.slug);
}
