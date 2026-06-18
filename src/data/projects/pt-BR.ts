import type { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    slug: "stockflow",
    name: "StockFlow",
    description:
      "API SaaS multiempresa para gestão de estoque com autenticação, RBAC e observabilidade.",
    longDescription:
      "StockFlow é uma plataforma backend pensada para empresas que precisam controlar estoque de forma centralizada em ambiente multi-tenant. A API expõe operações de produtos, movimentações, alertas e auditoria, com documentação OpenAPI e integração ao frontend Next.js em produção na Vercel.",
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
    problem:
      "Empresas com múltiplas unidades ou filiais precisam de um sistema de estoque confiável, com isolamento de dados por empresa, rastreabilidade de movimentações e APIs prontas para integração com painéis administrativos.",
    businessRules: [
      "Cada empresa opera em contexto isolado (multi-tenant).",
      "Usuários possuem papéis com permissões distintas via RBAC.",
      "Movimentações de estoque devem ser auditáveis.",
      "Tokens de acesso expiram e são renovados via refresh token.",
      "Endpoints críticos possuem rate limiting para proteção.",
    ],
    architecture: {
      title: "Arquitetura em camadas com NestJS",
      description:
        "A API segue módulos NestJS com separação entre controllers, services e repositórios Prisma. Redis atua como cache de leitura e PostgreSQL como fonte de verdade.",
      flow: [
        "Cliente / Frontend",
        "API Gateway NestJS",
        "Auth + RBAC",
        "Services de domínio",
        "Prisma + PostgreSQL",
        "Redis Cache",
      ],
    },
    technicalDecisions: [
      {
        title: "NestJS + Prisma",
        description:
          "Escolhidos para acelerar desenvolvimento tipado, com migrations versionadas e contratos claros entre domínio e persistência.",
      },
      {
        title: "Redis para cache",
        description:
          "Reduz consultas repetitivas em dashboards e listagens de alto volume sem comprometer consistência nas escritas.",
      },
      {
        title: "Swagger/OpenAPI",
        description:
          "Documentação viva da API para facilitar integração do frontend e revisão técnica em entrevistas.",
      },
      {
        title: "CI/CD no GitHub Actions",
        description:
          "Pipeline automatizado garante lint, testes e build a cada push, reduzindo regressões em produção.",
      },
    ],
    learnings: [
      "Modelar multi-tenancy desde o início evita refatorações custosas.",
      "Auditoria e RBAC devem ser tratados como requisitos de primeira classe.",
      "Health checks e rate limiting aumentam a confiabilidade percebida da API.",
    ],
    roadmap: [
      "Notificações em tempo real para alertas de estoque.",
      "Relatórios analíticos exportáveis.",
      "Testes e2e ampliados no pipeline.",
      "Observabilidade com métricas e tracing distribuído.",
    ],
  },
  {
    slug: "ticket-sales",
    name: "Ticket Sales",
    description:
      "API de venda de ingressos com reserva, compra em lote e controle de concorrência.",
    longDescription:
      "Ticket Sales é um backend para eventos que gerencia o ciclo completo de ingressos: reserva temporária, compra de múltiplos tickets, cancelamento e histórico de status. O foco está em integridade transacional e controle de concorrência para evitar overselling.",
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
      "Transações",
      "Concorrência",
      "REST API",
      "Testes Automatizados",
      "Histórico de Status",
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
    problem:
      "Venda de ingressos online exige garantir que o mesmo assento ou lote não seja vendido duas vezes, mesmo com múltiplas requisições simultâneas, além de rastrear cada mudança de status do pedido.",
    businessRules: [
      "Reservas possuem tempo de expiração configurável.",
      "Compra confirma apenas tickets disponíveis no momento da transação.",
      "Cancelamentos atualizam estoque e registram histórico.",
      "Cada mudança de status é persistida para auditoria.",
      "Operações críticas executam dentro de transações no banco.",
    ],
    architecture: {
      title: "API REST com controle transacional",
      description:
        "Express organiza rotas por domínio (eventos, tickets, pedidos). MySQL garante ACID nas operações de reserva e compra, com testes Vitest cobrindo fluxos críticos.",
      flow: [
        "Cliente HTTP",
        "Express Routes",
        "Regras de negócio",
        "Transação MySQL",
        "Histórico de status",
        "Resposta + Swagger",
      ],
    },
    technicalDecisions: [
      {
        title: "Transações no MySQL",
        description:
          "Garantem atomicidade na reserva e compra, evitando condições de corrida em cenários de alta concorrência.",
      },
      {
        title: "Histórico de status",
        description:
          "Permite rastrear o ciclo de vida de cada pedido e facilita suporte e debugging em produção.",
      },
      {
        title: "Vitest para testes",
        description:
          "Cobertura automatizada dos fluxos de reserva, compra e cancelamento reduz regressões em regras sensíveis.",
      },
    ],
    learnings: [
      "Concorrência em vendas de ingressos exige design transacional, não apenas validação na aplicação.",
      "Histórico de status simplifica diagnóstico de problemas em produção.",
      "Documentação Swagger acelera integração e demonstração do projeto.",
    ],
    roadmap: [
      "Fila de processamento para picos de demanda.",
      "Integração com gateway de pagamento.",
      "Painel administrativo para produtores de eventos.",
      "Testes de carga automatizados.",
    ],
  },
  {
    slug: "tirei-de-letra",
    name: "Tirei de Letra",
    description:
      "Plataforma educacional para ENEM com simulados, redação com IA e marketplace.",
    longDescription:
      "Tirei de Letra é um produto EdTech em desenvolvimento voltado à preparação para o ENEM. A proposta combina simulados, correção de redação assistida por IA, marketplace de professores e plano premium, com arquitetura em monorepo e preocupações de segurança e LGPD planejadas para escala.",
    status: "inDevelopment",
    image: "/projects/tirei-de-letra.svg",
    technologies: [
      "Next.js",
      "TypeScript",
      "Turborepo",
      "PostgreSQL",
      "TailwindCSS",
    ],
    concepts: ["Monorepo", "EdTech", "IA Generativa", "Marketplace", "LGPD"],
    metrics: [
      { label: "Escopo", value: "Plataforma ENEM" },
      { label: "Arquitetura", value: "Monorepo" },
      { label: "Produto", value: "Premium planejado" },
      { label: "Compliance", value: "LGPD em roadmap" },
    ],
    challenges: [
      "Escalabilidade",
      "Segurança",
      "Experiência do aluno",
      "Monetização",
    ],
    highlights: [
      "Simulados e trilhas de estudo",
      "Redação com IA",
      "Marketplace de professores",
      "Modelo premium",
      "Segurança e LGPD planejadas",
    ],
    problem:
      "Estudantes do ENEM precisam de uma plataforma integrada que una prática, feedback personalizado em redação e acesso a professores, com experiência fluida e modelo de negócio sustentável.",
    businessRules: [
      "Simulados seguem estrutura e cronometragem próximas ao exame real.",
      "Correções de redação devem registrar histórico de evolução do aluno.",
      "Professores do marketplace passam por fluxo de cadastro e avaliação.",
      "Recursos premium liberam conteúdos e correções avançadas.",
      "Dados sensíveis de menores exigem conformidade com LGPD.",
    ],
    architecture: {
      title: "Monorepo com apps e packages compartilhados",
      description:
        "Turborepo organiza frontend, APIs e pacotes compartilhados (tipos, UI, validações). PostgreSQL centraliza dados acadêmicos e de assinatura.",
      flow: [
        "App Web Next.js",
        "API de simulados",
        "Serviço de redação IA",
        "Marketplace",
        "PostgreSQL",
        "Autenticação + LGPD",
      ],
    },
    technicalDecisions: [
      {
        title: "Monorepo com Turborepo",
        description:
          "Permite compartilhar tipos e componentes entre apps sem duplicar código, acelerando iterações do MVP.",
      },
      {
        title: "IA para redação",
        description:
          "Feedback automatizado complementa correção humana, escalando o valor percebido pelo aluno.",
      },
      {
        title: "LGPD desde o design",
        description:
          "Consentimento, minimização de dados e políticas de retenção planejadas antes do lançamento em escala.",
      },
    ],
    learnings: [
      "Produtos EdTech exigem equilíbrio entre engajamento e rigor pedagógico.",
      "Monorepo facilita evolução paralela de múltiplos módulos do produto.",
      "Compliance não pode ser tratado como etapa final do projeto.",
    ],
    roadmap: [
      "MVP público com simulados gratuitos.",
      "Lançamento do plano premium.",
      "Marketplace de professores em beta.",
      "Certificações e conformidade LGPD formalizadas.",
    ],
  },
  {
    slug: "finance-app",
    name: "Finance App",
    description:
      "API de controle financeiro pessoal com autenticação, transações e dashboard.",
    longDescription:
      "Finance App é uma API backend para gestão financeira pessoal. Permite cadastro de usuários, registro de receitas e despesas, categorização de transações e visualização consolidada via dashboard, com persistência em PostgreSQL e ambiente containerizado com Docker.",
    status: "completed",
    image: "/projects/finance-app/cover.png",
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
      "Organização de receitas e despesas",
      "Migrações automatizadas",
    ],
    problem:
      "Usuários precisam de uma forma simples e confiável de registrar movimentações financeiras, categorizar gastos e acompanhar saldo sem depender de planilhas manuais.",
    businessRules: [
      "Cada transação pertence a um único usuário autenticado.",
      "Tipos de transação: ganho, despesa ou investimento.",
      "Valores e datas são obrigatórios e validados na API.",
      "Dashboard consolida totais por período e categoria.",
      "Senhas armazenadas com hash seguro.",
    ],
    architecture: {
      title: "API Express com camadas de use cases",
      description:
        "Separação entre controllers, use cases e acesso a dados via helper PostgreSQL. Docker Compose padroniza o ambiente de desenvolvimento e deploy.",
      flow: [
        "Cliente HTTP",
        "Express Controllers",
        "Use Cases",
        "PostgreSQL",
        "Migrações SQL",
        "Documentação API",
      ],
    },
    technicalDecisions: [
      {
        title: "Use cases explícitos",
        description:
          "Isola regras de negócio dos controllers, facilitando testes e manutenção do domínio financeiro.",
      },
      {
        title: "Migrações versionadas",
        description:
          "Scripts SQL automatizados garantem reprodutibilidade do schema entre ambientes.",
      },
      {
        title: "Docker para o banco",
        description:
          "Elimina diferenças entre máquinas locais e facilita onboarding de novos desenvolvedores.",
      },
    ],
    learnings: [
      "Modelar transações financeiras com tipos explícitos evita ambiguidade nos relatórios.",
      "Migrações desde o início simplificam evolução do schema.",
      "Documentação da API é essencial mesmo em projetos de portfólio.",
    ],
    roadmap: [
      "Metas financeiras e alertas de orçamento.",
      "Exportação de relatórios em PDF/CSV.",
      "Frontend web com gráficos interativos.",
      "Autenticação OAuth para login social.",
    ],
  },
  {
    slug: "portfolio-viviane",
    name: "Portfolio Viviane",
    description:
      "Portfólio técnico com foco em SEO, performance e apresentação profissional.",
    longDescription:
      "Este portfólio foi construído como produto de apresentação profissional: cada seção comunica competências técnicas de forma objetiva para recrutadores e tech leads, com cases detalhados, SEO otimizado, dark mode e pipeline de qualidade automatizado.",
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
      "Portfólio como produto",
      "Componentização reutilizável",
      "Dark Mode e responsividade",
      "Open Graph e Twitter Cards",
      "Build estático otimizado",
    ],
    problem:
      "Recrutadores e tech leads avaliam candidatos em poucos minutos. Era necessário um portfólio que comunicasse projetos reais, decisões técnicas e boas práticas de engenharia de forma clara e performática.",
    businessRules: [
      "Conteúdo orientado a decisões técnicas, não apenas lista de tecnologias.",
      "Cada projeto deve ter case study acessível por URL própria.",
      "SEO e metadata dinâmica em todas as páginas de projeto.",
      "Formulário de contato com validação client-side.",
      "Layout responsivo e acessível em mobile e desktop.",
    ],
    architecture: {
      title: "Next.js App Router com componentes desacoplados",
      description:
        "Dados em src/data, UI em components/ui e sections, páginas estáticas geradas via generateStaticParams. Server Components por padrão, client apenas onde necessário.",
      flow: [
        "Visitante",
        "Next.js App Router",
        "Server Components",
        "Dados em projects.ts",
        "Metadata dinâmica",
        "Deploy Vercel + CI",
      ],
    },
    technicalDecisions: [
      {
        title: "App Router + SSG",
        description:
          "Páginas de projeto geradas estaticamente para performance e SEO, com rotas dinâmicas por slug.",
      },
      {
        title: "Separação dados/UI",
        description:
          "Case studies em arquivo tipado facilitam manutenção e evolução sem acoplar conteúdo aos componentes.",
      },
      {
        title: "Pipeline de qualidade",
        description:
          "Husky, lint-staged, commitlint e GitHub Actions garantem padrão corporativo desde o desenvolvimento.",
      },
    ],
    learnings: [
      "Portfólio técnico deve contar histórias de engenharia, não só exibir screenshots.",
      "SEO e performance são parte da demonstração de competência frontend.",
      "Componentização reduz custo de evolução entre fases do produto.",
    ],
    roadmap: [
      "Blog técnico integrado ao portfólio.",
      "Internacionalização (pt/en).",
      "Analytics com respeito à privacidade.",
      "Modo de apresentação para entrevistas ao vivo.",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
