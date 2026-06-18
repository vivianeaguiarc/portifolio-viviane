import type { Locale } from "@/i18n/routing";
import { pickLocalized, type Localized } from "@/lib/localized";
import type {
  KnowledgeCategory,
  KnowledgeCategoryId,
  KnowledgeItem,
} from "@/types/technical-knowledge";

export const KNOWLEDGE_CATEGORY_IDS = [
  "backend",
  "database",
  "architecture",
  "frontend",
  "devops",
  "security",
] as const satisfies readonly KnowledgeCategoryId[];

const KNOWLEDGE_CATEGORIES_SOURCE = [
  {
    id: "backend",
    label: { "pt-BR": "Backend", "en-US": "Backend" },
  },
  {
    id: "database",
    label: { "pt-BR": "Banco de Dados", "en-US": "Database" },
  },
  {
    id: "architecture",
    label: { "pt-BR": "Arquitetura", "en-US": "Architecture" },
  },
  {
    id: "frontend",
    label: { "pt-BR": "Frontend", "en-US": "Frontend" },
  },
  {
    id: "devops",
    label: { "pt-BR": "DevOps", "en-US": "DevOps" },
  },
  {
    id: "security",
    label: { "pt-BR": "Segurança", "en-US": "Security" },
  },
] as const satisfies readonly {
  id: KnowledgeCategoryId;
  label: Localized<string>;
}[];

type KnowledgeItemSource = {
  slug: string;
  category: KnowledgeCategoryId;
  title: Localized<string>;
  definition: Localized<string>;
  howItWorks: Localized<string>;
  practicalApplication: Localized<string>;
  relatedProjects: string[];
};

const KNOWLEDGE_ITEMS_SOURCE = [
  // ── Backend (9) ──────────────────────────────────────────────────────────
  {
    slug: "nodejs",
    category: "backend",
    title: { "pt-BR": "Node.js", "en-US": "Node.js" },
    definition: {
      "pt-BR":
        "Runtime JavaScript assíncrono baseado no V8, usado para construir APIs, serviços e ferramentas de backend com um único ecossistema de linguagem.",
      "en-US":
        "An asynchronous JavaScript runtime built on V8, used to build APIs, services, and backend tooling within a single language ecosystem.",
    },
    howItWorks: {
      "pt-BR":
        "Executa código em uma única thread com event loop non-blocking: I/O e operações de rede são delegadas e retornam via callbacks ou Promises, permitindo alto throughput com baixo overhead.",
      "en-US":
        "Runs code on a single thread with a non-blocking event loop: I/O and network operations are delegated and resolved via callbacks or Promises, enabling high throughput with low overhead.",
    },
    practicalApplication: {
      "pt-BR":
        "Todas as APIs do portfólio rodam em Node.js: NestJS no StockFlow, Express no Ticket Sales e Finance App. Escolhi Node.js pela produtividade com TypeScript, ecossistema maduro e facilidade de deploy em plataformas como Render e Vercel.",
      "en-US":
        "All portfolio APIs run on Node.js: NestJS in StockFlow, Express in Ticket Sales and Finance App. I chose Node.js for TypeScript productivity, a mature ecosystem, and straightforward deployment on platforms like Render and Vercel.",
    },
    relatedProjects: ["stockflow", "ticket-sales", "finance-app"],
  },
  {
    slug: "rest-api",
    category: "backend",
    title: { "pt-BR": "REST API", "en-US": "REST API" },
    definition: {
      "pt-BR":
        "Estilo arquitetural para expor recursos via HTTP, usando verbos padronizados (GET, POST, PUT, DELETE) e URLs semânticas para comunicação entre cliente e servidor.",
      "en-US":
        "An architectural style for exposing resources over HTTP, using standard verbs (GET, POST, PUT, DELETE) and semantic URLs for client-server communication.",
    },
    howItWorks: {
      "pt-BR":
        "Cada endpoint representa um recurso ou coleção. O cliente envia requisições stateless; o servidor responde com status HTTP e payload JSON. Convenções de nomenclatura e códigos de status padronizam contratos previsíveis.",
      "en-US":
        "Each endpoint represents a resource or collection. The client sends stateless requests; the server responds with HTTP status codes and JSON payloads. Naming conventions and status codes standardize predictable contracts.",
    },
    practicalApplication: {
      "pt-BR":
        "StockFlow expõe 45+ endpoints REST documentados com Swagger. Ticket Sales modela reserva e compra de ingressos via rotas de domínio. Finance App organiza CRUD de transações e dashboard com contratos claros para integração frontend.",
      "en-US":
        "StockFlow exposes 45+ REST endpoints documented with Swagger. Ticket Sales models ticket reservation and purchase through domain routes. Finance App organizes transaction CRUD and dashboard with clear contracts for frontend integration.",
    },
    relatedProjects: ["stockflow", "ticket-sales", "finance-app"],
  },
  {
    slug: "middleware",
    category: "backend",
    title: { "pt-BR": "Middleware", "en-US": "Middleware" },
    definition: {
      "pt-BR":
        "Funções intermediárias que interceptam requisições antes de chegarem ao handler final, permitindo aplicar lógica transversal como autenticação, logging ou validação.",
      "en-US":
        "Intermediate functions that intercept requests before they reach the final handler, enabling cross-cutting logic such as authentication, logging, or validation.",
    },
    howItWorks: {
      "pt-BR":
        "Formam uma cadeia: cada middleware recebe req, res e next. Pode modificar o contexto, encerrar a resposta ou chamar next() para passar ao próximo. A ordem de registro define a sequência de execução.",
      "en-US":
        "They form a chain: each middleware receives req, res, and next. It can modify context, end the response, or call next() to pass control forward. Registration order defines the execution sequence.",
    },
    practicalApplication: {
      "pt-BR":
        "No StockFlow, guards NestJS e middlewares validam JWT e RBAC antes de acessar controllers. No Finance App, middleware de autenticação protege rotas de transações. No portfólio, o middleware Next.js aplica headers de segurança e roteamento i18n.",
      "en-US":
        "In StockFlow, NestJS guards and middlewares validate JWT and RBAC before reaching controllers. In Finance App, auth middleware protects transaction routes. In the portfolio, Next.js middleware applies security headers and i18n routing.",
    },
    relatedProjects: ["stockflow", "finance-app", "portfolio-viviane"],
  },
  {
    slug: "jwt",
    category: "backend",
    title: { "pt-BR": "JWT", "en-US": "JWT" },
    definition: {
      "pt-BR":
        "Padrão aberto (JSON Web Token) para transmitir claims de forma compacta e assinada entre cliente e servidor, sem exigir sessão persistida no backend.",
      "en-US":
        "An open standard (JSON Web Token) for transmitting signed claims compactly between client and server, without requiring a persisted session on the backend.",
    },
    howItWorks: {
      "pt-BR":
        "O token tem três partes: header, payload e assinatura. O servidor gera e assina com chave secreta; o cliente envia no header Authorization. A assinatura garante integridade — alterações invalidam o token.",
      "en-US":
        "The token has three parts: header, payload, and signature. The server generates and signs it with a secret key; the client sends it in the Authorization header. The signature ensures integrity — any tampering invalidates the token.",
    },
    practicalApplication: {
      "pt-BR":
        "Implementei JWT no StockFlow para autenticação multi-tenant com access tokens de curta duração. No Finance App, tokens identificam o usuário em cada requisição de transação, mantendo a API stateless e pronta para escalar horizontalmente.",
      "en-US":
        "I implemented JWT in StockFlow for multi-tenant authentication with short-lived access tokens. In Finance App, tokens identify the user on every transaction request, keeping the API stateless and ready for horizontal scaling.",
    },
    relatedProjects: ["stockflow", "finance-app"],
  },
  {
    slug: "refresh-token",
    category: "backend",
    title: { "pt-BR": "Refresh Token", "en-US": "Refresh Token" },
    definition: {
      "pt-BR":
        "Token de longa duração usado exclusivamente para obter novos access tokens, reduzindo a janela de exposição do JWT principal sem forçar novo login.",
      "en-US":
        "A long-lived token used exclusively to obtain new access tokens, reducing the exposure window of the primary JWT without forcing a new login.",
    },
    howItWorks: {
      "pt-BR":
        "Após login, o cliente recebe access token (curto) e refresh token (longo). Quando o access expira, o cliente chama /refresh com o refresh token; o servidor valida, revoga se comprometido e emite novo par.",
      "en-US":
        "After login, the client receives an access token (short) and refresh token (long). When access expires, the client calls /refresh with the refresh token; the server validates, revokes if compromised, and issues a new pair.",
    },
    practicalApplication: {
      "pt-BR":
        "No StockFlow, refresh tokens são persistidos e rotacionados a cada uso, com revogação explícita no logout. Isso equilibra segurança (access de 15 min) com UX fluida no painel administrativo conectado ao frontend Next.js.",
      "en-US":
        "In StockFlow, refresh tokens are persisted and rotated on each use, with explicit revocation on logout. This balances security (15-min access) with smooth UX in the admin panel connected to the Next.js frontend.",
    },
    relatedProjects: ["stockflow"],
  },
  {
    slug: "authentication",
    category: "backend",
    title: { "pt-BR": "Autenticação", "en-US": "Authentication" },
    definition: {
      "pt-BR":
        "Processo de verificar a identidade de quem faz a requisição — responder 'quem é você?' antes de permitir acesso a recursos protegidos.",
      "en-US":
        "The process of verifying the identity of whoever makes a request — answering 'who are you?' before granting access to protected resources.",
    },
    howItWorks: {
      "pt-BR":
        "O usuário prova identidade via credenciais (email/senha, token). O servidor valida, gera prova de sessão (JWT ou cookie) e exige essa prova em rotas subsequentes. Falha retorna 401 Unauthorized.",
      "en-US":
        "The user proves identity via credentials (email/password, token). The server validates, generates proof of session (JWT or cookie), and requires it on subsequent routes. Failure returns 401 Unauthorized.",
    },
    practicalApplication: {
      "pt-BR":
        "StockFlow autentica usuários multi-tenant com JWT e refresh token. Finance App valida login antes de expor transações pessoais. Ticket Sales prepara endpoints protegidos para operações sensíveis de pedidos.",
      "en-US":
        "StockFlow authenticates multi-tenant users with JWT and refresh tokens. Finance App validates login before exposing personal transactions. Ticket Sales prepares protected endpoints for sensitive order operations.",
    },
    relatedProjects: ["stockflow", "finance-app", "ticket-sales"],
  },
  {
    slug: "authorization",
    category: "backend",
    title: { "pt-BR": "Autorização", "en-US": "Authorization" },
    definition: {
      "pt-BR":
        "Controle do que um usuário autenticado pode fazer — responder 'o que você tem permissão?' com base em papéis, escopos ou políticas de acesso.",
      "en-US":
        "Control over what an authenticated user can do — answering 'what are you allowed to do?' based on roles, scopes, or access policies.",
    },
    howItWorks: {
      "pt-BR":
        "Após autenticação, o sistema consulta permissões do usuário (RBAC, ABAC ou claims no token). Guards ou decorators bloqueiam ações não permitidas e retornam 403 Forbidden sem expor dados alheios.",
      "en-US":
        "After authentication, the system checks user permissions (RBAC, ABAC, or token claims). Guards or decorators block unauthorized actions and return 403 Forbidden without exposing others' data.",
    },
    practicalApplication: {
      "pt-BR":
        "StockFlow implementa RBAC com perfis distintos (admin, operador, viewer) por empresa. Guards NestJS verificam papel antes de permitir movimentações de estoque ou gestão de usuários, garantindo isolamento multi-tenant.",
      "en-US":
        "StockFlow implements RBAC with distinct roles (admin, operator, viewer) per company. NestJS guards verify role before allowing stock movements or user management, ensuring multi-tenant isolation.",
    },
    relatedProjects: ["stockflow"],
  },
  {
    slug: "stateful",
    category: "backend",
    title: { "pt-BR": "Stateful", "en-US": "Stateful" },
    definition: {
      "pt-BR":
        "Arquitetura em que o servidor mantém estado da sessão do cliente entre requisições, geralmente em memória ou banco dedicado.",
      "en-US":
        "An architecture where the server maintains client session state between requests, typically in memory or a dedicated store.",
    },
    howItWorks: {
      "pt-BR":
        "Após login, o servidor cria sessão com ID único (cookie). Requisições subsequentes enviam esse ID; o servidor recupera contexto (usuário, carrinho) do store. Escalar exige sticky sessions ou store compartilhado como Redis.",
      "en-US":
        "After login, the server creates a session with a unique ID (cookie). Subsequent requests send that ID; the server retrieves context (user, cart) from the store. Scaling requires sticky sessions or a shared store like Redis.",
    },
    practicalApplication: {
      "pt-BR":
        "Finance App pode evoluir para sessões server-side em fluxos que exigem estado temporário (ex.: wizard de cadastro). Entendo o trade-off: simplicidade de implementação versus complexidade de escala horizontal.",
      "en-US":
        "Finance App could evolve to server-side sessions for flows requiring temporary state (e.g., registration wizard). I understand the trade-off: implementation simplicity versus horizontal scaling complexity.",
    },
    relatedProjects: ["finance-app"],
  },
  {
    slug: "stateless",
    category: "backend",
    title: { "pt-BR": "Stateless", "en-US": "Stateless" },
    definition: {
      "pt-BR":
        "Arquitetura em que cada requisição carrega toda informação necessária para processamento, sem o servidor guardar contexto de sessão entre chamadas.",
      "en-US":
        "An architecture where each request carries all information needed for processing, without the server storing session context between calls.",
    },
    howItWorks: {
      "pt-BR":
        "O cliente envia token ou credenciais a cada requisição. Qualquer instância do servidor pode atender sem consultar estado compartilhado de sessão. Escala horizontalmente com load balancer round-robin.",
      "en-US":
        "The client sends a token or credentials on every request. Any server instance can handle it without consulting shared session state. It scales horizontally with round-robin load balancing.",
    },
    practicalApplication: {
      "pt-BR":
        "StockFlow e Ticket Sales são APIs stateless com JWT: qualquer réplica processa requisições independentemente. Isso simplifica deploy no Render e prepara a arquitetura para auto-scaling sem sticky sessions.",
      "en-US":
        "StockFlow and Ticket Sales are stateless APIs with JWT: any replica processes requests independently. This simplifies deployment on Render and prepares the architecture for auto-scaling without sticky sessions.",
    },
    relatedProjects: ["stockflow", "ticket-sales"],
  },

  // ── Database (6) ─────────────────────────────────────────────────────────
  {
    slug: "primary-key",
    category: "database",
    title: { "pt-BR": "Chave Primária", "en-US": "Primary Key" },
    definition: {
      "pt-BR":
        "Coluna ou conjunto de colunas que identifica unicamente cada registro em uma tabela, garantindo que não existam duplicatas na entidade.",
      "en-US":
        "A column or set of columns that uniquely identifies each row in a table, ensuring no duplicate records exist for the entity.",
    },
    howItWorks: {
      "pt-BR":
        "O banco impõe constraint UNIQUE e NOT NULL na PK. Outras tabelas referenciam essa chave via foreign keys. IDs auto-incrementais, UUIDs ou chaves naturais (CPF, SKU) são estratégias comuns de escolha.",
      "en-US":
        "The database enforces UNIQUE and NOT NULL on the PK. Other tables reference it via foreign keys. Auto-increment IDs, UUIDs, or natural keys (CPF, SKU) are common selection strategies.",
    },
    practicalApplication: {
      "pt-BR":
        "Ticket Sales usa PKs em eventos, tickets e pedidos para rastrear cada ingresso individualmente. Finance App identifica transações por UUID. StockFlow usa IDs numéricos com índices otimizados para joins em dashboards multi-tenant.",
      "en-US":
        "Ticket Sales uses PKs on events, tickets, and orders to track each ticket individually. Finance App identifies transactions by UUID. StockFlow uses numeric IDs with optimized indexes for multi-tenant dashboard joins.",
    },
    relatedProjects: ["ticket-sales", "finance-app", "stockflow"],
  },
  {
    slug: "foreign-key",
    category: "database",
    title: { "pt-BR": "Chave Estrangeira", "en-US": "Foreign Key" },
    definition: {
      "pt-BR":
        "Coluna que referencia a chave primária de outra tabela, estabelecendo integridade referencial entre entidades relacionadas.",
      "en-US":
        "A column referencing another table's primary key, establishing referential integrity between related entities.",
    },
    howItWorks: {
      "pt-BR":
        "O banco valida que o valor FK existe na tabela pai antes de inserir ou atualizar. ON DELETE CASCADE, SET NULL ou RESTRICT definem comportamento ao remover o registro referenciado.",
      "en-US":
        "The database validates that the FK value exists in the parent table before insert or update. ON DELETE CASCADE, SET NULL, or RESTRICT define behavior when the referenced record is removed.",
    },
    practicalApplication: {
      "pt-BR":
        "StockFlow relaciona movimentações a produtos e empresas via FKs, impedindo registros órfãos. Finance App vincula transações ao user_id autenticado. Ticket Sales conecta pedidos a tickets com constraints que protegem integridade em cancelamentos.",
      "en-US":
        "StockFlow links movements to products and companies via FKs, preventing orphan records. Finance App ties transactions to the authenticated user_id. Ticket Sales connects orders to tickets with constraints protecting integrity on cancellations.",
    },
    relatedProjects: ["stockflow", "finance-app", "ticket-sales"],
  },
  {
    slug: "relationships",
    category: "database",
    title: { "pt-BR": "Relacionamentos", "en-US": "Relationships" },
    definition: {
      "pt-BR":
        "Associações entre tabelas que modelam como entidades se conectam: one-to-one, one-to-many ou many-to-many, refletindo regras de negócio no schema.",
      "en-US":
        "Associations between tables modeling how entities connect: one-to-one, one-to-many, or many-to-many, reflecting business rules in the schema.",
    },
    howItWorks: {
      "pt-BR":
        "1:1 usa FK única em uma das tabelas. 1:N coloca FK na tabela 'many'. N:N exige tabela intermediária (join table) com FKs para ambos os lados. ORMs como Prisma mapeiam esses padrões em models tipados.",
      "en-US":
        "1:1 uses a unique FK on one table. 1:N places FK on the 'many' side. N:N requires a join table with FKs to both sides. ORMs like Prisma map these patterns into typed models.",
    },
    practicalApplication: {
      "pt-BR":
        "StockFlow modela empresa → usuários (1:N), produto → movimentações (1:N) e usuário ↔ papéis (N:N via join). Finance App relaciona usuário → transações → categorias, estrutura que sustenta o dashboard consolidado.",
      "en-US":
        "StockFlow models company → users (1:N), product → movements (1:N), and user ↔ roles (N:N via join). Finance App relates user → transactions → categories, a structure supporting the consolidated dashboard.",
    },
    relatedProjects: ["stockflow", "finance-app"],
  },
  {
    slug: "transactions",
    category: "database",
    title: { "pt-BR": "Transações", "en-US": "Transactions" },
    definition: {
      "pt-BR":
        "Unidade atômica de operações no banco: ou todas as queries executam com sucesso, ou nenhuma alteração persiste — essencial para consistência em fluxos críticos.",
      "en-US":
        "An atomic unit of database operations: either all queries succeed or no changes persist — essential for consistency in critical flows.",
    },
    howItWorks: {
      "pt-BR":
        "BEGIN inicia, COMMIT confirma ou ROLLBACK desfaz. Locks de linha ou tabela previnem leituras sujas durante a operação. Isolation levels (READ COMMITTED, SERIALIZABLE) controlam visibilidade entre transações concorrentes.",
      "en-US":
        "BEGIN starts, COMMIT confirms, or ROLLBACK undoes. Row or table locks prevent dirty reads during the operation. Isolation levels (READ COMMITTED, SERIALIZABLE) control visibility between concurrent transactions.",
    },
    practicalApplication: {
      "pt-BR":
        "Ticket Sales envolve reserva e compra dentro de transações MySQL para evitar overselling: verifico disponibilidade, decremento estoque e registro pedido atomicamente. StockFlow usa transações Prisma em movimentações que afetam saldo e auditoria.",
      "en-US":
        "Ticket Sales wraps reservation and purchase in MySQL transactions to prevent overselling: I check availability, decrement stock, and record the order atomically. StockFlow uses Prisma transactions for movements affecting balance and audit.",
    },
    relatedProjects: ["ticket-sales", "stockflow"],
  },
  {
    slug: "acid",
    category: "database",
    title: { "pt-BR": "ACID", "en-US": "ACID" },
    definition: {
      "pt-BR":
        "Conjunto de garantias — Atomicity, Consistency, Isolation, Durability — que bancos relacionais oferecem para operações confiáveis mesmo sob falhas ou concorrência.",
      "en-US":
        "A set of guarantees — Atomicity, Consistency, Isolation, Durability — that relational databases provide for reliable operations even under failure or concurrency.",
    },
    howItWorks: {
      "pt-BR":
        "Atomicity: tudo ou nada. Consistency: regras de integridade mantidas. Isolation: transações não interferem indevidamente. Durability: dados commitados sobrevivem a crash. Journals e WAL garantem recuperação.",
      "en-US":
        "Atomicity: all or nothing. Consistency: integrity rules maintained. Isolation: transactions don't improperly interfere. Durability: committed data survives crashes. Journals and WAL ensure recovery.",
    },
    practicalApplication: {
      "pt-BR":
        "Escolhi PostgreSQL e MySQL justamente por ACID: no Ticket Sales, ACID impede vender o mesmo ingresso duas vezes. No StockFlow, garante que movimentação de estoque e log de auditoria persistam juntos ou falhem juntos.",
      "en-US":
        "I chose PostgreSQL and MySQL precisely for ACID: in Ticket Sales, ACID prevents selling the same ticket twice. In StockFlow, it ensures stock movement and audit log persist together or fail together.",
    },
    relatedProjects: ["ticket-sales", "stockflow"],
  },
  {
    slug: "indexes",
    category: "database",
    title: { "pt-BR": "Índices", "en-US": "Indexes" },
    definition: {
      "pt-BR":
        "Estruturas auxiliares (B-tree, hash) que aceleram buscas e joins ao evitar full table scan, trocando espaço em disco e custo de escrita por leitura mais rápida.",
      "en-US":
        "Auxiliary structures (B-tree, hash) that speed up searches and joins by avoiding full table scans, trading disk space and write cost for faster reads.",
    },
    howItWorks: {
      "pt-BR":
        "O banco mantém árvore ordenada dos valores indexados. Queries com WHERE, JOIN ou ORDER BY nas colunas indexadas usam seek em vez de scan completo. Índices compostos cobrem múltiplas colunas; EXPLAIN ANALYZE revela se são usados.",
      "en-US":
        "The database maintains an ordered tree of indexed values. Queries with WHERE, JOIN, or ORDER BY on indexed columns use seek instead of full scan. Composite indexes cover multiple columns; EXPLAIN ANALYZE reveals usage.",
    },
    practicalApplication: {
      "pt-BR":
        "StockFlow indexa company_id e product_id para listagens multi-tenant performáticas. Ticket Sales indexa status e event_id nas consultas de disponibilidade sob concorrência. Analiso planos de execução antes de otimizar queries críticas.",
      "en-US":
        "StockFlow indexes company_id and product_id for performant multi-tenant listings. Ticket Sales indexes status and event_id in availability queries under concurrency. I analyze execution plans before optimizing critical queries.",
    },
    relatedProjects: ["stockflow", "ticket-sales"],
  },

  // ── Architecture (6) ─────────────────────────────────────────────────────
  {
    slug: "solid",
    category: "architecture",
    title: { "pt-BR": "SOLID", "en-US": "SOLID" },
    definition: {
      "pt-BR":
        "Cinco princípios de design orientado a objetos que orientam código modular, testável e resiliente a mudanças: SRP, OCP, LSP, ISP e DIP.",
      "en-US":
        "Five object-oriented design principles guiding modular, testable code resilient to change: SRP, OCP, LSP, ISP, and DIP.",
    },
    howItWorks: {
      "pt-BR":
        "SRP: uma classe, uma responsabilidade. OCP: aberto para extensão, fechado para modificação. LSP: substituibilidade. ISP: interfaces específicas. DIP: dependa de abstrações, não de implementações concretas.",
      "en-US":
        "SRP: one class, one responsibility. OCP: open for extension, closed for modification. LSP: substitutability. ISP: specific interfaces. DIP: depend on abstractions, not concrete implementations.",
    },
    practicalApplication: {
      "pt-BR":
        "No StockFlow, services de domínio têm responsabilidade única (ex.: ProductService vs AuditService). No Finance App, separei controllers, services e repositories para facilitar testes unitários e evolução sem quebrar contratos.",
      "en-US":
        "In StockFlow, domain services have single responsibility (e.g., ProductService vs AuditService). In Finance App, I separated controllers, services, and repositories to ease unit testing and evolution without breaking contracts.",
    },
    relatedProjects: ["stockflow", "finance-app"],
  },
  {
    slug: "clean-architecture",
    category: "architecture",
    title: { "pt-BR": "Clean Architecture", "en-US": "Clean Architecture" },
    definition: {
      "pt-BR":
        "Organização em camadas concêntricas onde regras de negócio ficam no centro, isoladas de frameworks, UI e banco — dependências apontam sempre para dentro.",
      "en-US":
        "Concentric layer organization where business rules sit at the center, isolated from frameworks, UI, and database — dependencies always point inward.",
    },
    howItWorks: {
      "pt-BR":
        "Entities e use cases no núcleo. Adapters traduzem entre mundo externo e domínio. Frameworks e DB ficam na borda, substituíveis. Inversão de dependência via interfaces mantém o domínio agnóstico de infra.",
      "en-US":
        "Entities and use cases at the core. Adapters translate between the external world and domain. Frameworks and DB sit at the edge, replaceable. Dependency inversion via interfaces keeps domain infrastructure-agnostic.",
    },
    practicalApplication: {
      "pt-BR":
        "StockFlow separa controllers (entrada), services (casos de uso), repositories Prisma (saída) e entities de domínio. Isso permitiu trocar detalhes de persistência e adicionar cache Redis sem contaminar regras de estoque.",
      "en-US":
        "StockFlow separates controllers (input), services (use cases), Prisma repositories (output), and domain entities. This allowed swapping persistence details and adding Redis cache without contaminating stock rules.",
    },
    relatedProjects: ["stockflow"],
  },
  {
    slug: "ddd",
    category: "architecture",
    title: {
      "pt-BR": "DDD (Domain-Driven Design)",
      "en-US": "DDD (Domain-Driven Design)",
    },
    definition: {
      "pt-BR":
        "Abordagem que coloca o domínio de negócio no centro do design de software, usando linguagem ubíqua, bounded contexts e modelagem rica para refletir regras reais.",
      "en-US":
        "An approach placing business domain at the center of software design, using ubiquitous language, bounded contexts, and rich modeling to reflect real rules.",
    },
    howItWorks: {
      "pt-BR":
        "Identifique bounded contexts (ex.: estoque vs autenticação). Defina entities, value objects e aggregates. Services de domínio encapsulam lógica que não pertence a uma entity. Eventos de domínio comunicam mudanças entre contextos.",
      "en-US":
        "Identify bounded contexts (e.g., inventory vs authentication). Define entities, value objects, and aggregates. Domain services encapsulate logic not belonging to one entity. Domain events communicate changes across contexts.",
    },
    practicalApplication: {
      "pt-BR":
        "StockFlow modela aggregates como Product (com movimentações) e Company (com usuários e papéis). Termos do domínio — reserva, movimentação, alerta de estoque mínimo — aparecem no código e na documentação Swagger de forma consistente.",
      "en-US":
        "StockFlow models aggregates like Product (with movements) and Company (with users and roles). Domain terms — reservation, movement, minimum stock alert — appear consistently in code and Swagger documentation.",
    },
    relatedProjects: ["stockflow"],
  },
  {
    slug: "hexagonal-architecture",
    category: "architecture",
    title: {
      "pt-BR": "Arquitetura Hexagonal",
      "en-US": "Hexagonal Architecture",
    },
    definition: {
      "pt-BR":
        "Padrão (Ports and Adapters) que isola lógica de negócio no centro, conectando infraestrutura externa via portas (interfaces) e adaptadores (implementações).",
      "en-US":
        "A pattern (Ports and Adapters) isolating business logic at the center, connecting external infrastructure via ports (interfaces) and adapters (implementations).",
    },
    howItWorks: {
      "pt-BR":
        "Portas de entrada (driving) recebem requisições HTTP ou CLI. Portas de saída (driven) abstraem banco, filas e APIs externas. Adaptadores concretos implementam cada porta, permitindo trocar PostgreSQL por outro DB sem alterar domínio.",
      "en-US":
        "Driving ports receive HTTP or CLI requests. Driven ports abstract database, queues, and external APIs. Concrete adapters implement each port, allowing PostgreSQL swap without changing domain logic.",
    },
    practicalApplication: {
      "pt-BR":
        "No StockFlow, Prisma é um adapter de saída para persistência; controllers NestJS são adapters de entrada. Redis entra como adapter de cache plugável — o service de produtos depende de interface, não de implementação concreta.",
      "en-US":
        "In StockFlow, Prisma is an output adapter for persistence; NestJS controllers are input adapters. Redis plugs in as a cache adapter — the product service depends on an interface, not a concrete implementation.",
    },
    relatedProjects: ["stockflow"],
  },
  {
    slug: "repository-pattern",
    category: "architecture",
    title: { "pt-BR": "Repository Pattern", "en-US": "Repository Pattern" },
    definition: {
      "pt-BR":
        "Abstração que encapsula acesso a dados atrás de uma interface orientada a coleções de domínio, ocultando detalhes de SQL ou ORM dos services.",
      "en-US":
        "An abstraction encapsulating data access behind a domain-oriented collection interface, hiding SQL or ORM details from services.",
    },
    howItWorks: {
      "pt-BR":
        "O service chama repository.findById() ou save() sem conhecer Prisma ou SQL. A implementação concreta traduz para queries. Facilita mocks em testes e centraliza queries complexas em um único lugar.",
      "en-US":
        "The service calls repository.findById() or save() without knowing Prisma or SQL. The concrete implementation translates to queries. It eases mocks in tests and centralizes complex queries in one place.",
    },
    practicalApplication: {
      "pt-BR":
        "StockFlow usa repositories Prisma por módulo (ProductRepository, MovementRepository). Finance App concentra queries de transações em camada de acesso, mantendo controllers enxutos e services focados em regras de negócio.",
      "en-US":
        "StockFlow uses Prisma repositories per module (ProductRepository, MovementRepository). Finance App concentrates transaction queries in an access layer, keeping controllers lean and services focused on business rules.",
    },
    relatedProjects: ["stockflow", "finance-app"],
  },
  {
    slug: "service-layer",
    category: "architecture",
    title: { "pt-BR": "Service Layer", "en-US": "Service Layer" },
    definition: {
      "pt-BR":
        "Camada que orquestra regras de negócio, coordenando repositories, validações e efeitos colaterais — o coração da aplicação entre controllers e persistência.",
      "en-US":
        "A layer orchestrating business rules, coordinating repositories, validations, and side effects — the application heart between controllers and persistence.",
    },
    howItWorks: {
      "pt-BR":
        "Controllers delegam para services; services aplicam regras, chamam repositories e disparam eventos. Transações e validações de domínio ficam aqui, não espalhadas em controllers ou queries ad hoc.",
      "en-US":
        "Controllers delegate to services; services apply rules, call repositories, and emit events. Transactions and domain validations live here, not scattered across controllers or ad hoc queries.",
    },
    practicalApplication: {
      "pt-BR":
        "Ticket Sales concentra lógica de reserva/compra em OrderService com transações MySQL. StockFlow tem services por bounded context (estoque, auth, auditoria). Finance App valida saldo e categorias no service antes de persistir.",
      "en-US":
        "Ticket Sales concentrates reservation/purchase logic in OrderService with MySQL transactions. StockFlow has services per bounded context (inventory, auth, audit). Finance App validates balance and categories in the service before persisting.",
    },
    relatedProjects: ["stockflow", "ticket-sales", "finance-app"],
  },

  // ── Frontend (8) ─────────────────────────────────────────────────────────
  {
    slug: "react",
    category: "frontend",
    title: { "pt-BR": "React", "en-US": "React" },
    definition: {
      "pt-BR":
        "Biblioteca JavaScript para construir interfaces declarativas baseadas em componentes reutilizáveis, com virtual DOM para atualizações eficientes da UI.",
      "en-US":
        "A JavaScript library for building declarative interfaces based on reusable components, with a virtual DOM for efficient UI updates.",
    },
    howItWorks: {
      "pt-BR":
        "Estado e props determinam o que renderizar. Mudanças de estado disparam re-render do componente e diff no virtual DOM; apenas diferenças são aplicadas ao DOM real. Hooks gerenciam estado, efeitos e memoização funcional.",
      "en-US":
        "State and props determine what to render. State changes trigger component re-render and virtual DOM diff; only differences apply to the real DOM. Hooks manage state, effects, and functional memoization.",
    },
    practicalApplication: {
      "pt-BR":
        "O portfólio é construído com React 19 via Next.js: componentes como ProjectCard, KnowledgeCard e seções da home são modulares e reutilizáveis. StockFlow frontend também usa React para painel administrativo conectado à API.",
      "en-US":
        "The portfolio is built with React 19 via Next.js: components like ProjectCard, KnowledgeCard, and home sections are modular and reusable. StockFlow frontend also uses React for the admin panel connected to the API.",
    },
    relatedProjects: ["portfolio-viviane", "stockflow"],
  },
  {
    slug: "nextjs",
    category: "frontend",
    title: { "pt-BR": "Next.js", "en-US": "Next.js" },
    definition: {
      "pt-BR":
        "Framework React full-stack com App Router, renderização híbrida (SSR/SSG/CSR), roteamento file-based e otimizações de produção integradas.",
      "en-US":
        "A full-stack React framework with App Router, hybrid rendering (SSR/SSG/CSR), file-based routing, and built-in production optimizations.",
    },
    howItWorks: {
      "pt-BR":
        "Rotas mapeiam diretórios em app/. Server e Client Components coexistem. next-intl adiciona i18n; middleware intercepta locale. Build gera páginas estáticas ou server-rendered conforme configuração por rota.",
      "en-US":
        "Routes map directories in app/. Server and Client Components coexist. next-intl adds i18n; middleware intercepts locale. Build generates static or server-rendered pages per route configuration.",
    },
    practicalApplication: {
      "pt-BR":
        "Este portfólio usa Next.js App Router com next-intl (pt-BR/en-US), metadata dinâmica para SEO, JSON-LD e deploy na Vercel. StockFlow web usa Next.js para login e dashboard consumindo a API NestJS em produção.",
      "en-US":
        "This portfolio uses Next.js App Router with next-intl (pt-BR/en-US), dynamic metadata for SEO, JSON-LD, and Vercel deployment. StockFlow web uses Next.js for login and dashboard consuming the NestJS API in production.",
    },
    relatedProjects: ["portfolio-viviane", "stockflow"],
  },
  {
    slug: "ssr",
    category: "frontend",
    title: { "pt-BR": "SSR", "en-US": "SSR" },
    definition: {
      "pt-BR":
        "Server-Side Rendering: HTML gerado no servidor a cada requisição (ou com revalidação), entregando conteúdo indexável e first paint rápido ao cliente.",
      "en-US":
        "Server-Side Rendering: HTML generated on the server per request (or with revalidation), delivering indexable content and fast first paint to the client.",
    },
    howItWorks: {
      "pt-BR":
        "O servidor executa React, busca dados e retorna HTML completo. O browser hidrata o JS para interatividade. ISR revalida páginas em intervalo, combinando freshness com performance de cache.",
      "en-US":
        "The server runs React, fetches data, and returns complete HTML. The browser hydrates JS for interactivity. ISR revalidates pages on interval, combining freshness with cache performance.",
    },
    practicalApplication: {
      "pt-BR":
        "Páginas de projetos e blog do portfólio usam SSR/SSG para SEO: recrutadores e Google recebem conteúdo completo sem depender de JavaScript. Metadata e Open Graph são gerados server-side por locale.",
      "en-US":
        "Portfolio project and blog pages use SSR/SSG for SEO: recruiters and Google receive full content without relying on JavaScript. Metadata and Open Graph are generated server-side per locale.",
    },
    relatedProjects: ["portfolio-viviane"],
  },
  {
    slug: "csr",
    category: "frontend",
    title: { "pt-BR": "CSR", "en-US": "CSR" },
    definition: {
      "pt-BR":
        "Client-Side Rendering: a UI é montada no browser após carregar JavaScript, com dados buscados via fetch no cliente após o first paint inicial.",
      "en-US":
        "Client-Side Rendering: the UI is assembled in the browser after loading JavaScript, with data fetched client-side after initial first paint.",
    },
    howItWorks: {
      "pt-BR":
        "O servidor envia shell HTML mínimo + bundle JS. React monta a árvore no cliente, dispara useEffect para APIs e atualiza DOM. Ideal para dashboards interativos e áreas autenticadas com dados dinâmicos.",
      "en-US":
        "The server sends minimal HTML shell + JS bundle. React mounts the tree on the client, triggers useEffect for APIs, and updates DOM. Ideal for interactive dashboards and authenticated areas with dynamic data.",
    },
    practicalApplication: {
      "pt-BR":
        "Componentes interativos do portfólio — busca de conhecimentos, filtros de projetos, toggle de tema — são Client Components com CSR. StockFlow dashboard carrega dados de estoque client-side após autenticação JWT.",
      "en-US":
        "Interactive portfolio components — knowledge search, project filters, theme toggle — are Client Components with CSR. StockFlow dashboard loads inventory data client-side after JWT authentication.",
    },
    relatedProjects: ["portfolio-viviane", "stockflow"],
  },
  {
    slug: "server-components",
    category: "frontend",
    title: {
      "pt-BR": "Server Components",
      "en-US": "Server Components",
    },
    definition: {
      "pt-BR":
        "Componentes React que executam exclusivamente no servidor, permitindo acesso direto a dados e zero JavaScript enviado ao cliente para aquela parte da UI.",
      "en-US":
        "React components that run exclusively on the server, enabling direct data access and zero JavaScript sent to the client for that UI portion.",
    },
    howItWorks: {
      "pt-BR":
        "Por padrão no App Router, componentes são Server Components. Podem importar módulos Node, ler arquivos e consultar DB. 'use client' marca boundary para componentes que precisam de hooks ou event handlers.",
      "en-US":
        "By default in App Router, components are Server Components. They can import Node modules, read files, and query DB. 'use client' marks the boundary for components needing hooks or event handlers.",
    },
    practicalApplication: {
      "pt-BR":
        "Páginas de case study e technical knowledge renderizam conteúdo estático server-side, reduzindo bundle JS. Layout, metadata e listagens de projetos rodam no servidor; apenas busca e interações usam Client Components.",
      "en-US":
        "Case study and technical knowledge pages render static content server-side, reducing JS bundle. Layout, metadata, and project listings run on the server; only search and interactions use Client Components.",
    },
    relatedProjects: ["portfolio-viviane"],
  },
  {
    slug: "use-effect",
    category: "frontend",
    title: { "pt-BR": "useEffect", "en-US": "useEffect" },
    definition: {
      "pt-BR":
        "Hook React para executar efeitos colaterais após render — fetch de dados, subscriptions, manipulação de DOM ou sincronização com sistemas externos.",
      "en-US":
        "A React hook for running side effects after render — data fetching, subscriptions, DOM manipulation, or synchronization with external systems.",
    },
    howItWorks: {
      "pt-BR":
        "Recebe callback e array de dependências. Roda após paint quando deps mudam. Retorna cleanup executado antes do próximo efeito ou unmount. deps vazias [] rodam uma vez (mount); omitir deps roda a cada render.",
      "en-US":
        "Receives callback and dependency array. Runs after paint when deps change. Returns cleanup executed before next effect or unmount. Empty deps [] run once (mount); omitting deps runs every render.",
    },
    practicalApplication: {
      "pt-BR":
        "No portfólio, useEffect sincroniza tema dark/light com localStorage e aplica preferência do sistema. Busca de conhecimentos técnicos debounce query params. Evito useEffect para data fetching que Server Components resolvem melhor.",
      "en-US":
        "In the portfolio, useEffect syncs dark/light theme with localStorage and applies system preference. Technical knowledge search debounces query params. I avoid useEffect for data fetching that Server Components handle better.",
    },
    relatedProjects: ["portfolio-viviane"],
  },
  {
    slug: "use-memo",
    category: "frontend",
    title: { "pt-BR": "useMemo", "en-US": "useMemo" },
    definition: {
      "pt-BR":
        "Hook que memoriza resultado de cálculo pesado entre renders, recalculando apenas quando dependências mudam — evita trabalho redundante na UI.",
      "en-US":
        "A hook memoizing expensive calculation results between renders, recalculating only when dependencies change — avoiding redundant UI work.",
    },
    howItWorks: {
      "pt-BR":
        "useMemo(() => computeExpensive(a, b), [a, b]) cacheia o retorno. Próximos renders com mesmas deps reutilizam valor. Diferente de useCallback, que memoriza funções; useMemo memoriza valores computados.",
      "en-US":
        "useMemo(() => computeExpensive(a, b), [a, b]) caches the return. Next renders with same deps reuse value. Unlike useCallback, which memoizes functions; useMemo memoizes computed values.",
    },
    practicalApplication: {
      "pt-BR":
        "Filtro de conhecimentos técnicos usa useMemo para derivar lista filtrada por categoria e query sem recalcular a cada keystroke desnecessariamente. Listagens de projetos memorizam ordenação e agrupamento por status.",
      "en-US":
        "Technical knowledge filter uses useMemo to derive list filtered by category and query without recalculating on every unnecessary keystroke. Project listings memoize sorting and grouping by status.",
    },
    relatedProjects: ["portfolio-viviane"],
  },
  {
    slug: "use-callback",
    category: "frontend",
    title: { "pt-BR": "useCallback", "en-US": "useCallback" },
    definition: {
      "pt-BR":
        "Hook que memoriza referência de função entre renders, útil quando a mesma callback é passada a componentes filhos memoizados (React.memo).",
      "en-US":
        "A hook memoizing function reference between renders, useful when the same callback is passed to memoized child components (React.memo).",
    },
    howItWorks: {
      "pt-BR":
        "useCallback(fn, deps) retorna a mesma referência de fn enquanto deps não mudam. Evita re-render de filhos que comparam props por referência. Complementa useMemo: um para funções, outro para valores.",
      "en-US":
        "useCallback(fn, deps) returns the same fn reference while deps unchanged. Prevents re-render of children comparing props by reference. Complements useMemo: one for functions, one for values.",
    },
    practicalApplication: {
      "pt-BR":
        "Handlers de busca e seleção de categoria em KnowledgeSearch são estabilizados com useCallback para não invalidar memoização de KnowledgeCard. Padrão aplicado também em filtros da listagem de projetos.",
      "en-US":
        "Search and category selection handlers in KnowledgeSearch are stabilized with useCallback to avoid invalidating KnowledgeCard memoization. Same pattern applied in project listing filters.",
    },
    relatedProjects: ["portfolio-viviane"],
  },

  // ── DevOps (5) ───────────────────────────────────────────────────────────
  {
    slug: "docker",
    category: "devops",
    title: { "pt-BR": "Docker", "en-US": "Docker" },
    definition: {
      "pt-BR":
        "Plataforma de containerização que empacota aplicação com dependências em imagens imutáveis, garantindo ambiente consistente do dev ao produção.",
      "en-US":
        "A containerization platform packaging applications with dependencies into immutable images, ensuring consistent environments from dev to production.",
    },
    howItWorks: {
      "pt-BR":
        "Dockerfile define camadas da imagem (base, deps, build, runtime). docker build cria imagem; docker run inicia container isolado com namespace e cgroups. Volumes persistem dados; networks conectam serviços.",
      "en-US":
        "Dockerfile defines image layers (base, deps, build, runtime). docker build creates image; docker run starts isolated container with namespaces and cgroups. Volumes persist data; networks connect services.",
    },
    practicalApplication: {
      "pt-BR":
        "StockFlow usa Docker Compose para PostgreSQL, Redis e API local. Finance App containeriza Express + PostgreSQL para deploy reproduzível no Render. Dockerfile multi-stage reduz tamanho da imagem final.",
      "en-US":
        "StockFlow uses Docker Compose for PostgreSQL, Redis, and local API. Finance App containerizes Express + PostgreSQL for reproducible Render deployment. Multi-stage Dockerfile reduces final image size.",
    },
    relatedProjects: ["stockflow", "finance-app"],
  },
  {
    slug: "container",
    category: "devops",
    title: { "pt-BR": "Container", "en-US": "Container" },
    definition: {
      "pt-BR":
        "Unidade leve e isolada de execução que compartilha kernel do host, encapsulando processo, filesystem e rede — mais enxuta que máquinas virtuais.",
      "en-US":
        "A lightweight isolated execution unit sharing the host kernel, encapsulating process, filesystem, and network — leaner than virtual machines.",
    },
    howItWorks: {
      "pt-BR":
        "Containers rodam a partir de imagens read-only com camada writable overlay. Isolamento via namespaces (PID, network, mount). Orquestradores (Docker Compose, Kubernetes) gerenciam múltiplos containers, scaling e health checks.",
      "en-US":
        "Containers run from read-only images with writable overlay layer. Isolation via namespaces (PID, network, mount). Orchestrators (Docker Compose, Kubernetes) manage multiple containers, scaling, and health checks.",
    },
    practicalApplication: {
      "pt-BR":
        "Ambiente local do StockFlow sobe três containers (API, Postgres, Redis) com um comando. Finance App roda como container único no Render. Entendo containers como contrato de deploy: mesma imagem, mesmo comportamento em qualquer host.",
      "en-US":
        "StockFlow local environment starts three containers (API, Postgres, Redis) with one command. Finance App runs as a single container on Render. I see containers as a deploy contract: same image, same behavior on any host.",
    },
    relatedProjects: ["stockflow", "finance-app"],
  },
  {
    slug: "cicd",
    category: "devops",
    title: { "pt-BR": "CI/CD", "en-US": "CI/CD" },
    definition: {
      "pt-BR":
        "Integração e entrega contínuas: pipeline automatizado que valida, testa e deploya código a cada mudança, reduzindo risco e tempo entre commit e produção.",
      "en-US":
        "Continuous Integration and Delivery: an automated pipeline validating, testing, and deploying code on every change, reducing risk and time between commit and production.",
    },
    howItWorks: {
      "pt-BR":
        "CI roda lint, typecheck e testes em cada push/PR. CD publica artefato aprovado em staging ou produção. Falhas bloqueiam merge. Ambientes imutáveis recebem nova versão, não patches manuais.",
      "en-US":
        "CI runs lint, typecheck, and tests on every push/PR. CD publishes approved artifact to staging or production. Failures block merge. Immutable environments receive new version, not manual patches.",
    },
    practicalApplication: {
      "pt-BR":
        "StockFlow e portfólio têm pipelines CI/CD: lint, typecheck, build e testes a cada push. Merge só após checks verdes. Deploy automático na Vercel (frontend) e validação antes de produção no Render (APIs).",
      "en-US":
        "StockFlow and portfolio have CI/CD pipelines: lint, typecheck, build, and tests on every push. Merge only after green checks. Automatic deploy on Vercel (frontend) and validation before production on Render (APIs).",
    },
    relatedProjects: ["stockflow", "portfolio-viviane"],
  },
  {
    slug: "github-actions",
    category: "devops",
    title: { "pt-BR": "GitHub Actions", "en-US": "GitHub Actions" },
    definition: {
      "pt-BR":
        "Plataforma de automação integrada ao GitHub para executar workflows declarativos (YAML) em eventos como push, pull request ou schedule.",
      "en-US":
        "GitHub-integrated automation platform running declarative workflows (YAML) on events like push, pull request, or schedule.",
    },
    howItWorks: {
      "pt-BR":
        "Workflow define triggers, jobs e steps. Runners executam em VMs Ubuntu/Windows. Actions reutilizáveis encapsulam setup (Node, pnpm), cache e deploy. Secrets gerenciam tokens de forma segura.",
      "en-US":
        "Workflow defines triggers, jobs, and steps. Runners execute on Ubuntu/Windows VMs. Reusable actions encapsulate setup (Node, pnpm), cache, and deploy. Secrets manage tokens securely.",
    },
    practicalApplication: {
      "pt-BR":
        "Portfólio e StockFlow usam GitHub Actions para rodar pnpm lint, typecheck e build em cada PR. Cache de node_modules acelera execução. Workflow falha cedo se TypeScript ou ESLint quebram, protegendo main.",
      "en-US":
        "Portfolio and StockFlow use GitHub Actions to run pnpm lint, typecheck, and build on every PR. node_modules cache speeds execution. Workflow fails early if TypeScript or ESLint break, protecting main.",
    },
    relatedProjects: ["stockflow", "portfolio-viviane"],
  },
  {
    slug: "deploy",
    category: "devops",
    title: { "pt-BR": "Deploy", "en-US": "Deploy" },
    definition: {
      "pt-BR":
        "Processo de publicar versão da aplicação em ambiente acessível (produção/staging), incluindo build, configuração de variáveis e verificação pós-release.",
      "en-US":
        "The process of publishing an application version to an accessible environment (production/staging), including build, environment configuration, and post-release verification.",
    },
    howItWorks: {
      "pt-BR":
        "Build gera artefato otimizado. Variáveis de ambiente configuram DB, secrets e URLs. Plataforma (Vercel, Render) provisiona runtime, roteia tráfego e oferece logs. Health checks confirmam disponibilidade pós-deploy.",
      "en-US":
        "Build generates optimized artifact. Environment variables configure DB, secrets, and URLs. Platform (Vercel, Render) provisions runtime, routes traffic, and offers logs. Health checks confirm post-deploy availability.",
    },
    practicalApplication: {
      "pt-BR":
        "Portfólio na Vercel com preview por PR. StockFlow API + web em produção (Render/Vercel). Ticket Sales e Finance App no Render com Swagger público. Cada deploy inclui verificação de health check e documentação acessível.",
      "en-US":
        "Portfolio on Vercel with PR previews. StockFlow API + web in production (Render/Vercel). Ticket Sales and Finance App on Render with public Swagger. Each deploy includes health check verification and accessible documentation.",
    },
    relatedProjects: [
      "stockflow",
      "ticket-sales",
      "finance-app",
      "portfolio-viviane",
    ],
  },

  // ── Security (6) ─────────────────────────────────────────────────────────
  {
    slug: "jwt-security",
    category: "security",
    title: { "pt-BR": "JWT (Segurança)", "en-US": "JWT (Security)" },
    definition: {
      "pt-BR":
        "Práticas para usar JWT de forma segura: tokens curtos, assinatura forte, armazenamento adequado no cliente e nunca tratar payload como confiável sem validar assinatura.",
      "en-US":
        "Practices for using JWT securely: short tokens, strong signing, proper client storage, and never trusting payload without signature validation.",
    },
    howItWorks: {
      "pt-BR":
        "Use algoritmos seguros (HS256/RS256), secrets robustos e expiração curta. Valide iss, aud e exp no servidor. Armazene em httpOnly cookie ou memory — evite localStorage para tokens sensíveis. Rotacione refresh tokens.",
      "en-US":
        "Use secure algorithms (HS256/RS256), robust secrets, and short expiry. Validate iss, aud, and exp on server. Store in httpOnly cookie or memory — avoid localStorage for sensitive tokens. Rotate refresh tokens.",
    },
    practicalApplication: {
      "pt-BR":
        "StockFlow usa access tokens de 15 min, refresh rotacionado e revogação no logout. Guards validam assinatura antes de confiar em claims de tenant e role. Secrets ficam em variáveis de ambiente, nunca no código.",
      "en-US":
        "StockFlow uses 15-min access tokens, rotated refresh, and logout revocation. Guards validate signature before trusting tenant and role claims. Secrets live in environment variables, never in code.",
    },
    relatedProjects: ["stockflow"],
  },
  {
    slug: "owasp",
    category: "security",
    title: { "pt-BR": "OWASP", "en-US": "OWASP" },
    definition: {
      "pt-BR":
        "Open Web Application Security Project — referência global de vulnerabilidades e boas práticas, incluindo o Top 10 de riscos em aplicações web.",
      "en-US":
        "Open Web Application Security Project — global reference for vulnerabilities and best practices, including the Top 10 web application risks.",
    },
    howItWorks: {
      "pt-BR":
        "Top 10 cobre injection, broken auth, sensitive data exposure, XXE, broken access control, misconfiguration, XSS, insecure deserialization, vulnerable components e logging insuficiente. Checklists OWASP guiam revisão sistemática.",
      "en-US":
        "Top 10 covers injection, broken auth, sensitive data exposure, XXE, broken access control, misconfiguration, XSS, insecure deserialization, vulnerable components, and insufficient logging. OWASP checklists guide systematic review.",
    },
    practicalApplication: {
      "pt-BR":
        "Aplico OWASP Top 10 nos projetos: validação de entrada (StockFlow, Finance App), RBAC (StockFlow), headers de segurança no middleware do portfólio, e dependências atualizadas via npm audit no CI.",
      "en-US":
        "I apply OWASP Top 10 across projects: input validation (StockFlow, Finance App), RBAC (StockFlow), security headers in portfolio middleware, and updated dependencies via npm audit in CI.",
    },
    relatedProjects: ["stockflow", "portfolio-viviane", "finance-app"],
  },
  {
    slug: "rate-limiting",
    category: "security",
    title: { "pt-BR": "Rate Limiting", "en-US": "Rate Limiting" },
    definition: {
      "pt-BR":
        "Controle de quantidade de requisições por IP ou usuário em janela de tempo, protegendo APIs contra abuso, brute force e denial of service.",
      "en-US":
        "Control of request count per IP or user within a time window, protecting APIs against abuse, brute force, and denial of service.",
    },
    howItWorks: {
      "pt-BR":
        "Algoritmos fixed window, sliding window ou token bucket contam requisições. Acima do limite, retorna 429 Too Many Requests. Redis centraliza contadores em arquiteturas distribuídas.",
      "en-US":
        "Fixed window, sliding window, or token bucket algorithms count requests. Above limit, returns 429 Too Many Requests. Redis centralizes counters in distributed architectures.",
    },
    practicalApplication: {
      "pt-BR":
        "StockFlow aplica rate limiting em endpoints de login e operações críticas de estoque. No portfólio, rate limiting está planejado no middleware para formulário de contato e APIs futuras, alinhado às práticas de production readiness.",
      "en-US":
        "StockFlow applies rate limiting on login and critical stock endpoints. In the portfolio, rate limiting is planned in middleware for contact form and future APIs, aligned with production readiness practices.",
    },
    relatedProjects: ["stockflow", "portfolio-viviane"],
  },
  {
    slug: "password-hash",
    category: "security",
    title: { "pt-BR": "Hash de Senhas", "en-US": "Password Hashing" },
    definition: {
      "pt-BR":
        "Armazenamento irreversível de senhas via função hash com salt, de forma que vazamento do banco não revele credenciais em texto plano.",
      "en-US":
        "Irreversible password storage via salted hash function, so database leaks don't reveal plaintext credentials.",
    },
    howItWorks: {
      "pt-BR":
        "bcrypt, argon2 ou scrypt aplicam salt aleatório e rounds de custo computacional. Login compara hash(stored) com hash(input) — nunca descriptografa. Work factor ajustável acompanha evolução de hardware.",
      "en-US":
        "bcrypt, argon2, or scrypt apply random salt and computational cost rounds. Login compares hash(stored) with hash(input) — never decrypts. Adjustable work factor tracks hardware evolution.",
    },
    practicalApplication: {
      "pt-BR":
        "Finance App e StockFlow armazenam senhas com bcrypt antes de persistir. Registro faz hash no service layer; login compara de forma timing-safe. Nunca retorno senha ou hash em responses de API.",
      "en-US":
        "Finance App and StockFlow store passwords with bcrypt before persisting. Registration hashes in the service layer; login compares timing-safe. I never return password or hash in API responses.",
    },
    relatedProjects: ["finance-app", "stockflow"],
  },
  {
    slug: "refresh-token-security",
    category: "security",
    title: {
      "pt-BR": "Refresh Token (Segurança)",
      "en-US": "Refresh Token (Security)",
    },
    definition: {
      "pt-BR":
        "Práticas de segurança para refresh tokens: rotação, revogação, detecção de reuso e armazenamento seguro para mitigar roubo de sessão.",
      "en-US":
        "Security practices for refresh tokens: rotation, revocation, reuse detection, and secure storage to mitigate session theft.",
    },
    howItWorks: {
      "pt-BR":
        "Cada refresh uso gera novo par e invalida o anterior. Reuso de token revogado indica possível comprometimento — revogue toda a família. Persista hash do token, não valor plain. Vincule a device/fingerprint quando possível.",
      "en-US":
        "Each refresh use generates a new pair and invalidates the previous. Reuse of revoked token indicates possible compromise — revoke entire family. Persist token hash, not plain value. Bind to device/fingerprint when possible.",
    },
    practicalApplication: {
      "pt-BR":
        "StockFlow implementa rotação de refresh token a cada renovação e blacklist no logout. Tokens comprometidos disparam revogação em cascata. Access token curto limita danos se interceptado.",
      "en-US":
        "StockFlow implements refresh token rotation on each renewal and blacklist on logout. Compromised tokens trigger cascade revocation. Short access token limits damage if intercepted.",
    },
    relatedProjects: ["stockflow"],
  },
  {
    slug: "data-validation",
    category: "security",
    title: { "pt-BR": "Validação de Dados", "en-US": "Data Validation" },
    definition: {
      "pt-BR":
        "Verificação rigorosa de entrada no servidor (e complementar no cliente) para garantir tipo, formato e regras de negócio antes de processar ou persistir dados.",
      "en-US":
        "Rigorous server-side input verification (with complementary client-side) ensuring type, format, and business rules before processing or persisting data.",
    },
    howItWorks: {
      "pt-BR":
        "Schemas (Zod, class-validator) definem contrato esperado. Validação falha retorna 400 com erros estruturados. Whitelist campos permitidos; rejeite desconhecidos. Sanitize strings para prevenir injection.",
      "en-US":
        "Schemas (Zod, class-validator) define expected contract. Validation failure returns 400 with structured errors. Whitelist allowed fields; reject unknowns. Sanitize strings to prevent injection.",
    },
    practicalApplication: {
      "pt-BR":
        "StockFlow valida DTOs com class-validator no NestJS. Finance App rejeita transações com valores ou datas inválidas. Portfólio usa Zod no formulário de contato — validação server-side é a linha de defesa que nunca pode faltar.",
      "en-US":
        "StockFlow validates DTOs with class-validator in NestJS. Finance App rejects transactions with invalid values or dates. Portfolio uses Zod on contact form — server-side validation is the defense line that must never be missing.",
    },
    relatedProjects: ["stockflow", "finance-app", "portfolio-viviane"],
  },
] as const satisfies readonly KnowledgeItemSource[];

function localizeKnowledgeItem(
  item: (typeof KNOWLEDGE_ITEMS_SOURCE)[number],
  locale: Locale,
): KnowledgeItem {
  return {
    slug: item.slug,
    category: item.category,
    title: pickLocalized(item.title, locale),
    definition: pickLocalized(item.definition, locale),
    howItWorks: pickLocalized(item.howItWorks, locale),
    practicalApplication: pickLocalized(item.practicalApplication, locale),
    relatedProjects: [...item.relatedProjects],
  };
}

export function getKnowledgeCategories(locale: Locale): KnowledgeCategory[] {
  return KNOWLEDGE_CATEGORIES_SOURCE.map((category) => ({
    id: category.id,
    label: pickLocalized(category.label, locale),
  }));
}

export function getKnowledgeItems(locale: Locale): KnowledgeItem[] {
  return KNOWLEDGE_ITEMS_SOURCE.map((item) =>
    localizeKnowledgeItem(item, locale),
  );
}

export function getKnowledgeItemBySlug(
  slug: string,
  locale: Locale,
): KnowledgeItem | undefined {
  const item = KNOWLEDGE_ITEMS_SOURCE.find((entry) => entry.slug === slug);
  return item ? localizeKnowledgeItem(item, locale) : undefined;
}

export function filterKnowledgeItems(
  items: KnowledgeItem[],
  filters: { category?: KnowledgeCategoryId; query?: string },
): KnowledgeItem[] {
  const normalizedQuery = filters.query?.trim().toLowerCase();

  return items.filter((item) => {
    if (filters.category && item.category !== filters.category) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const searchableText = [
      item.title,
      item.definition,
      item.howItWorks,
      item.practicalApplication,
      item.slug,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}
