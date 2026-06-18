import type { BlogPost } from "@/types";

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "rbac-stockflow",
    title: "Como implementei RBAC no StockFlow",
    description:
      "Como modelei papéis, permissões e autorização por recurso na API SaaS multiempresa do StockFlow com NestJS.",
    category: "Segurança",
    publishedAt: "2026-03-10",
    readingTime: "8 min",
    tags: ["Node.js", "TypeScript", "RBAC", "Segurança"],
    content: {
      sections: [
        {
          heading: "Contexto no StockFlow",
          paragraphs: [
            "O StockFlow é uma API SaaS multiempresa para gestão de estoque. Cada empresa possui usuários com responsabilidades diferentes: administradores, operadores de estoque e visualizadores de relatórios.",
            "RBAC (Role-Based Access Control) foi necessário para garantir que um operador não pudesse alterar configurações da empresa nem acessar dados de outro tenant.",
          ],
        },
        {
          heading: "Modelagem de papéis",
          paragraphs: [
            "Defini papéis fixos no domínio e associei permissões granulares por recurso: produtos, movimentações, usuários e auditoria.",
          ],
          list: [
            "ADMIN: gestão completa do tenant",
            "MANAGER: movimentações e relatórios",
            "VIEWER: somente leitura",
          ],
        },
        {
          heading: "Implementação com guards no NestJS",
          paragraphs: [
            "Usei guards customizados combinados com decorators para declarar permissões nos controllers, mantendo a regra de autorização próxima da rota sem poluir a lógica de negócio.",
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
          heading: "Isolamento multi-tenant",
          paragraphs: [
            "Cada request carrega o tenantId do token JWT. O TenantGuard valida se o recurso pertence à empresa do usuário antes de executar o service.",
            "Essa combinação RBAC + tenant evita vazamento horizontal de dados entre empresas — requisito crítico em qualquer SaaS B2B.",
          ],
        },
        {
          heading: "Lições aprendidas",
          paragraphs: [
            "Documentar a matriz papel × permissão no README da API ajudou na revisão de segurança e na integração com o frontend Next.js do StockFlow.",
            "RBAC bem modelado reduz ifs espalhados e facilita evoluir novos perfis sem reescrever regras de negócio.",
          ],
        },
      ],
    },
  },
  {
    slug: "jwt-apis-pratica",
    title: "JWT na prática: autenticação segura em APIs",
    description:
      "Access token, refresh token e rotação segura aplicados no StockFlow e no Finance App.",
    category: "Backend",
    publishedAt: "2026-02-18",
    readingTime: "7 min",
    tags: ["JWT", "Backend", "Segurança", "API REST"],
    content: {
      sections: [
        {
          heading: "Por que JWT nos meus projetos",
          paragraphs: [
            "No StockFlow e no Finance App, escolhi JWT por ser stateless e facilitar integração com frontends e documentação Swagger.",
            "O desafio não é emitir o token — é gerenciar expiração, renovação e revogação sem comprometer a experiência do usuário.",
          ],
        },
        {
          heading: "Access token curto + refresh token",
          paragraphs: [
            "Access tokens com vida curta (15 minutos) limitam a janela de exposição. Refresh tokens com vida maior ficam persistidos com hash no PostgreSQL.",
          ],
          code: {
            language: "typescript",
            content: `// Payload mínimo — sem dados sensíveis
{
  "sub": "user-uuid",
  "tenantId": "company-uuid",
  "role": "MANAGER",
  "exp": 1710000000
}`,
          },
        },
        {
          heading: "Fluxo de renovação",
          paragraphs: [
            "O frontend do StockFlow intercepta 401, chama /auth/refresh com o refresh token em cookie HttpOnly e repete a requisição original.",
            "No Finance App, o fluxo é similar, com validação de fingerprint do dispositivo para reduzir roubo de sessão.",
          ],
          list: [
            "Refresh token armazenado com hash bcrypt",
            "Rotação a cada renovação",
            "Invalidação em logout",
          ],
        },
        {
          heading: "Boas práticas aplicadas",
          paragraphs: [
            "Nunca armazeno senha em texto puro. Secrets ficam em variáveis de ambiente. Algoritmo HS256 com chave forte e rotação planejada.",
            "Health checks e rate limiting na rota de login protegem contra brute force — padrão que também uso no Ticket Sales.",
          ],
        },
      ],
    },
  },
  {
    slug: "multi-tenant-saas",
    title: "Multi-Tenant explicado com um projeto real",
    description:
      "Estratégias de isolamento de dados e schema usadas no StockFlow com PostgreSQL e Prisma.",
    category: "Arquitetura",
    publishedAt: "2026-01-25",
    readingTime: "9 min",
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
          heading: "Estratégia escolhida: shared database, shared schema",
          paragraphs: [
            "Optei por banco compartilhado com coluna tenant_id em todas as tabelas de domínio. É o equilíbrio ideal para o estágio atual do produto: custo controlado e migrations simples com Prisma.",
          ],
          list: [
            "tenant_id em todas as queries",
            "Índices compostos (tenant_id, id)",
            "Middleware Prisma para filtro automático",
          ],
        },
        {
          heading: "Implementação com Prisma",
          paragraphs: [
            "Criei um middleware que injeta where: { tenantId } em findMany e valida ownership em update/delete. Isso reduz o risco de esquecer o filtro em uma query.",
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
          heading: "Relação com Tirei de Letra",
          paragraphs: [
            "No Tirei de Letra, o modelo premium e marketplace de professores também exigirão isolamento por instituição e LGPD desde o design — lições do StockFlow serão reaproveitadas no monorepo EdTech.",
          ],
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
