import type { Locale } from "@/i18n/routing";
import { pickLocalized, type Localized } from "@/lib/localized";

const QUALITY_TOOLS_SOURCE = [
  {
    id: "typescript",
    name: { "pt-BR": "TypeScript", "en-US": "TypeScript" },
    description: {
      "pt-BR":
        "Tipagem estática em modo strict para reduzir erros em tempo de compilação e melhorar a manutenibilidade.",
      "en-US":
        "Static typing in strict mode to catch errors at compile time and improve maintainability.",
    },
    purpose: {
      "pt-BR": "Garantir contratos claros entre componentes, dados e serviços.",
      "en-US": "Ensure clear contracts between components, data, and services.",
    },
  },
  {
    id: "eslint",
    name: { "pt-BR": "ESLint", "en-US": "ESLint" },
    description: {
      "pt-BR":
        "Análise estática com eslint-config-next e regras de hooks do React.",
      "en-US": "Static analysis with eslint-config-next and React hooks rules.",
    },
    purpose: {
      "pt-BR": "Padronizar código e prevenir anti-patterns antes do merge.",
      "en-US": "Standardize code and prevent anti-patterns before merge.",
    },
  },
  {
    id: "prettier",
    name: { "pt-BR": "Prettier", "en-US": "Prettier" },
    description: {
      "pt-BR": "Formatação automática integrada ao lint-staged e ao editor.",
      "en-US":
        "Automatic formatting integrated with lint-staged and the editor.",
    },
    purpose: {
      "pt-BR": "Eliminar debates de estilo e manter diffs legíveis.",
      "en-US": "Eliminate style debates and keep diffs readable.",
    },
  },
  {
    id: "husky",
    name: { "pt-BR": "Husky", "en-US": "Husky" },
    description: {
      "pt-BR": "Git hooks que executam validações antes de cada commit.",
      "en-US": "Git hooks that run validations before every commit.",
    },
    purpose: {
      "pt-BR": "Impedir que código quebrado entre no histórico local.",
      "en-US": "Prevent broken code from entering the local history.",
    },
  },
  {
    id: "commitlint",
    name: { "pt-BR": "Commitlint", "en-US": "Commitlint" },
    description: {
      "pt-BR":
        "Validação de mensagens de commit no padrão Conventional Commits.",
      "en-US": "Commit message validation using Conventional Commits.",
    },
    purpose: {
      "pt-BR": "Manter changelog e histórico de mudanças compreensíveis.",
      "en-US": "Keep changelog and change history understandable.",
    },
  },
  {
    id: "lint-staged",
    name: { "pt-BR": "lint-staged", "en-US": "lint-staged" },
    description: {
      "pt-BR": "Executa ESLint e Prettier apenas nos arquivos staged.",
      "en-US": "Runs ESLint and Prettier only on staged files.",
    },
    purpose: {
      "pt-BR": "Acelerar o pre-commit sem sacrificar qualidade.",
      "en-US": "Speed up pre-commit without sacrificing quality.",
    },
  },
  {
    id: "github-actions",
    name: { "pt-BR": "GitHub Actions", "en-US": "GitHub Actions" },
    description: {
      "pt-BR": "Pipeline CI em cada push e pull request na branch principal.",
      "en-US": "CI pipeline on every push and pull request to main.",
    },
    purpose: {
      "pt-BR": "Validar lint, types e build antes do deploy na Vercel.",
      "en-US": "Validate lint, types, and build before Vercel deploy.",
    },
  },
  {
    id: "vitest",
    name: { "pt-BR": "Vitest", "en-US": "Vitest" },
    description: {
      "pt-BR":
        "Runner de testes rápido e compatível com Vite, definido na estratégia para funções puras e hooks.",
      "en-US":
        "Fast Vite-compatible test runner, defined in the strategy for pure functions and hooks.",
    },
    purpose: {
      "pt-BR": "Cobrir regras de negócio e utilitários com testes unitários.",
      "en-US": "Cover business rules and utilities with unit tests.",
    },
  },
  {
    id: "testing-library",
    name: { "pt-BR": "Testing Library", "en-US": "Testing Library" },
    description: {
      "pt-BR":
        "Testes orientados ao comportamento do usuário em componentes React.",
      "en-US": "User-behavior-oriented tests for React components.",
    },
    purpose: {
      "pt-BR":
        "Validar interações críticas sem acoplar aos detalhes de implementação.",
      "en-US":
        "Validate critical interactions without coupling to implementation details.",
    },
  },
] as const satisfies readonly {
  id: string;
  name: Localized<string>;
  description: Localized<string>;
  purpose: Localized<string>;
}[];

const TESTING_STRATEGY_SOURCE = [
  {
    id: "unit",
    title: { "pt-BR": "Unit Tests", "en-US": "Unit Tests" },
    description: {
      "pt-BR":
        "Funções puras em lib/, validadores Zod, helpers de SEO e i18n testados de forma isolada com Vitest.",
      "en-US":
        "Pure functions in lib/, Zod validators, SEO and i18n helpers tested in isolation with Vitest.",
    },
  },
  {
    id: "integration",
    title: { "pt-BR": "Integration Tests", "en-US": "Integration Tests" },
    description: {
      "pt-BR":
        "Componentes e fluxos compostos validados com Testing Library, simulando interações reais de UI.",
      "en-US":
        "Composite components and flows validated with Testing Library, simulating real UI interactions.",
    },
  },
  {
    id: "e2e",
    title: {
      "pt-BR": "E2E Tests (planejado)",
      "en-US": "E2E Tests (planned)",
    },
    description: {
      "pt-BR":
        "Cenários ponta a ponta com Playwright para rotas críticas: home, recruiter, blog e case studies.",
      "en-US":
        "End-to-end scenarios with Playwright for critical routes: home, recruiter, blog, and case studies.",
    },
  },
] as const satisfies readonly {
  id: string;
  title: Localized<string>;
  description: Localized<string>;
}[];

const PIPELINE_STEPS_SOURCE = [
  { id: "commit", label: { "pt-BR": "Commit", "en-US": "Commit" } },
  { id: "lint", label: { "pt-BR": "Lint", "en-US": "Lint" } },
  {
    id: "typeCheck",
    label: { "pt-BR": "Type Check", "en-US": "Type Check" },
  },
  { id: "build", label: { "pt-BR": "Build", "en-US": "Build" } },
  { id: "deploy", label: { "pt-BR": "Deploy", "en-US": "Deploy" } },
] as const satisfies readonly {
  id: string;
  label: Localized<string>;
}[];

const ADOPTED_PATTERNS_SOURCE = [
  {
    id: "solid",
    name: { "pt-BR": "SOLID", "en-US": "SOLID" },
    description: {
      "pt-BR": "Módulos com responsabilidade única e extensão sem modificação.",
      "en-US":
        "Modules with single responsibility and extension without modification.",
    },
  },
  {
    id: "clean-code",
    name: { "pt-BR": "Clean Code", "en-US": "Clean Code" },
    description: {
      "pt-BR":
        "Nomes expressivos, funções curtas e código legível para revisão.",
      "en-US":
        "Expressive names, short functions, and readable code for review.",
    },
  },
  {
    id: "clean-architecture",
    name: { "pt-BR": "Clean Architecture", "en-US": "Clean Architecture" },
    description: {
      "pt-BR": "Separação entre UI, dados, serviços e domínio no App Router.",
      "en-US":
        "Separation between UI, data, services, and domain in the App Router.",
    },
  },
  {
    id: "conventional-commits",
    name: {
      "pt-BR": "Conventional Commits",
      "en-US": "Conventional Commits",
    },
    description: {
      "pt-BR":
        "feat, fix, docs, refactor — mensagens padronizadas e rastreáveis.",
      "en-US":
        "feat, fix, docs, refactor — standardized and traceable messages.",
    },
  },
  {
    id: "code-review",
    name: { "pt-BR": "Code Review", "en-US": "Code Review" },
    description: {
      "pt-BR": "Pull requests revisados antes do merge na branch principal.",
      "en-US": "Pull requests reviewed before merging into main.",
    },
  },
  {
    id: "git-flow",
    name: { "pt-BR": "Git Flow", "en-US": "Git Flow" },
    description: {
      "pt-BR":
        "Branches por feature, main protegida e deploy contínuo via Vercel.",
      "en-US":
        "Feature branches, protected main, and continuous deploy via Vercel.",
    },
  },
] as const satisfies readonly {
  id: string;
  name: Localized<string>;
  description: Localized<string>;
}[];

export function getQualityTools(locale: Locale) {
  return QUALITY_TOOLS_SOURCE.map((item) => ({
    id: item.id,
    name: pickLocalized(item.name, locale),
    description: pickLocalized(item.description, locale),
    purpose: pickLocalized(item.purpose, locale),
  }));
}

export function getTestingStrategy(locale: Locale) {
  return TESTING_STRATEGY_SOURCE.map((item) => ({
    id: item.id,
    title: pickLocalized(item.title, locale),
    description: pickLocalized(item.description, locale),
  }));
}

export function getPipelineSteps(locale: Locale) {
  return PIPELINE_STEPS_SOURCE.map((item) => ({
    id: item.id,
    label: pickLocalized(item.label, locale),
  }));
}

export function getAdoptedPatterns(locale: Locale) {
  return ADOPTED_PATTERNS_SOURCE.map((item) => ({
    id: item.id,
    name: pickLocalized(item.name, locale),
    description: pickLocalized(item.description, locale),
  }));
}
