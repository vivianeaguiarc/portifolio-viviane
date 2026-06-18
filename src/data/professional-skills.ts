import type { Locale } from "@/i18n/routing";
import { pickLocalized, type Localized } from "@/lib/localized";
import type {
  KnowledgeSection,
  KnowledgeSectionId,
  ProfessionalSkill,
} from "@/types/professional-skills";

export const KNOWLEDGE_SECTION_IDS = [
  "all",
  "technical",
  "professional",
] as const satisfies readonly KnowledgeSectionId[];

export const RECRUITER_FEATURED_SKILL_SLUGS = [
  "technical-communication",
  "problem-solving",
  "continuous-learning",
  "organization",
  "ownership",
] as const;

const KNOWLEDGE_SECTIONS_SOURCE = [
  {
    id: "all",
    label: { "pt-BR": "Todas", "en-US": "All" },
  },
  {
    id: "technical",
    label: {
      "pt-BR": "Conhecimentos Técnicos",
      "en-US": "Technical Knowledge",
    },
  },
  {
    id: "professional",
    label: {
      "pt-BR": "Competências Profissionais",
      "en-US": "Professional Skills",
    },
  },
] as const satisfies readonly {
  id: KnowledgeSectionId;
  label: Localized<string>;
}[];

const EXAMPLE_LABELS_SOURCE = {
  java: { "pt-BR": "Java", "en-US": "Java" },
  "spring-boot": { "pt-BR": "Spring Boot", "en-US": "Spring Boot" },
  "hexagonal-architecture": {
    "pt-BR": "Arquitetura Hexagonal",
    "en-US": "Hexagonal Architecture",
  },
  ddd: { "pt-BR": "DDD", "en-US": "DDD" },
  "software-engineering": {
    "pt-BR": "Engenharia de Software",
    "en-US": "Software Engineering",
  },
  git: { "pt-BR": "Git", "en-US": "Git" },
  github: { "pt-BR": "GitHub", "en-US": "GitHub" },
  documentation: {
    "pt-BR": "Documentação",
    "en-US": "Documentation",
  },
  swagger: { "pt-BR": "Swagger", "en-US": "Swagger" },
  "product-discussions": {
    "pt-BR": "Discussões de produto",
    "en-US": "Product discussions",
  },
  "requirements-gathering": {
    "pt-BR": "Levantamento de requisitos",
    "en-US": "Requirements gathering",
  },
  architecture: { "pt-BR": "Arquitetura", "en-US": "Architecture" },
  nodejs: { "pt-BR": "Node.js", "en-US": "Node.js" },
  typescript: { "pt-BR": "TypeScript", "en-US": "TypeScript" },
  react: { "pt-BR": "React", "en-US": "React" },
  nextjs: { "pt-BR": "Next.js", "en-US": "Next.js" },
  postgresql: { "pt-BR": "PostgreSQL", "en-US": "PostgreSQL" },
  "data-modeling": {
    "pt-BR": "Modelagem de entidades",
    "en-US": "Entity modeling",
  },
  "business-rules": {
    "pt-BR": "Regras de negócio",
    "en-US": "Business rules",
  },
  "system-flows": {
    "pt-BR": "Fluxos de sistema",
    "en-US": "System flows",
  },
} as const satisfies Record<string, Localized<string>>;

type ProfessionalSkillSource = {
  slug: string;
  title: Localized<string>;
  description: Localized<string>;
  meaning: Localized<string>;
  practicalApplication: Localized<string>;
  examples: readonly string[];
};

const PROFESSIONAL_SKILLS_SOURCE = [
  {
    slug: "technical-communication",
    title: {
      "pt-BR": "Comunicação Técnica",
      "en-US": "Technical Communication",
    },
    description: {
      "pt-BR":
        "Capacidade de comunicar conceitos técnicos de forma clara para diferentes públicos.",
      "en-US":
        "Ability to communicate technical concepts clearly to different audiences.",
    },
    meaning: {
      "pt-BR":
        "Para mim, comunicação técnica é traduzir complexidade em clareza — permitindo que outra pessoa entenda o problema, a solução e o impacto sem precisar ler todo o código.",
      "en-US":
        "For me, technical communication means translating complexity into clarity — allowing someone else to understand the problem, solution, and impact without reading all the code.",
    },
    practicalApplication: {
      "pt-BR":
        "Documentação de APIs com exemplos reais, README com setup e decisões técnicas, Swagger para contratos, organização de requisitos e explicação de trade-offs em case studies e no portfólio.",
      "en-US":
        "API documentation with real examples, README files with setup and technical decisions, Swagger for contracts, requirements organization, and trade-off explanations in case studies and the portfolio.",
    },
    examples: ["stockflow", "ticket-sales", "portfolio-viviane", "swagger"],
  },
  {
    slug: "problem-solving",
    title: {
      "pt-BR": "Resolução de Problemas",
      "en-US": "Problem Solving",
    },
    description: {
      "pt-BR":
        "Capacidade de analisar situações complexas e encontrar soluções sustentáveis.",
      "en-US":
        "Ability to analyze complex situations and find sustainable solutions.",
    },
    meaning: {
      "pt-BR":
        "Entendo resolução de problemas como ir além do sintoma: identificar a causa, avaliar alternativas e escolher uma solução que continue fazendo sentido quando o sistema crescer.",
      "en-US":
        "I understand problem solving as going beyond the symptom: identifying the cause, evaluating alternatives, and choosing a solution that still makes sense as the system grows.",
    },
    practicalApplication: {
      "pt-BR":
        "Implementação de regras de negócio em StockFlow e Ticket Sales — como controle de estoque, concorrência na venda de ingressos e validações que protegem a integridade dos dados.",
      "en-US":
        "Implementation of business rules in StockFlow and Ticket Sales — such as inventory control, ticket sale concurrency, and validations that protect data integrity.",
    },
    examples: ["stockflow", "ticket-sales", "business-rules"],
  },
  {
    slug: "analytical-thinking",
    title: {
      "pt-BR": "Pensamento Analítico",
      "en-US": "Analytical Thinking",
    },
    description: {
      "pt-BR":
        "Capacidade de decompor problemas em partes menores para análise e tomada de decisão.",
      "en-US":
        "Ability to break problems into smaller parts for analysis and decision-making.",
    },
    meaning: {
      "pt-BR":
        "Pensamento analítico, para mim, é estruturar o caos antes de codificar: entender entidades, dependências e impactos de cada decisão.",
      "en-US":
        "Analytical thinking, for me, means structuring chaos before coding: understanding entities, dependencies, and the impact of each decision.",
    },
    practicalApplication: {
      "pt-BR":
        "Modelagem de entidades, definição de regras de negócio e desenho de fluxos de sistema antes da implementação em StockFlow, Ticket Sales e Finance App.",
      "en-US":
        "Entity modeling, business rule definition, and system flow design before implementation in StockFlow, Ticket Sales, and Finance App.",
    },
    examples: [
      "stockflow",
      "ticket-sales",
      "finance-app",
      "data-modeling",
      "business-rules",
      "system-flows",
    ],
  },
  {
    slug: "continuous-learning",
    title: {
      "pt-BR": "Aprendizado Contínuo",
      "en-US": "Continuous Learning",
    },
    description: {
      "pt-BR": "Busca constante por evolução técnica.",
      "en-US": "Constant pursuit of technical growth.",
    },
    meaning: {
      "pt-BR":
        "Aprendizado contínuo é transformar estudo em repertório aplicável — não acumular certificados, mas construir base para resolver problemas melhores.",
      "en-US":
        "Continuous learning means turning study into applicable repertoire — not accumulating certificates, but building a foundation to solve better problems.",
    },
    practicalApplication: {
      "pt-BR":
        "Estudos contínuos em Java, Spring Boot, DDD, Arquitetura Hexagonal e Engenharia de Software, aplicados na organização dos projetos e na documentação técnica do portfólio.",
      "en-US":
        "Ongoing studies in Java, Spring Boot, DDD, Hexagonal Architecture, and Software Engineering, applied in project organization and the portfolio's technical documentation.",
    },
    examples: [
      "java",
      "spring-boot",
      "ddd",
      "hexagonal-architecture",
      "software-engineering",
    ],
  },
  {
    slug: "organization",
    title: { "pt-BR": "Organização", "en-US": "Organization" },
    description: {
      "pt-BR": "Planejamento e execução estruturada das atividades.",
      "en-US": "Structured planning and execution of activities.",
    },
    meaning: {
      "pt-BR":
        "Organização é criar previsibilidade no trabalho técnico: saber o que foi feito, por que foi feito e como retomar de onde parou.",
      "en-US":
        "Organization means creating predictability in technical work: knowing what was done, why it was done, and how to pick up where you left off.",
    },
    practicalApplication: {
      "pt-BR":
        "Uso de Git e GitHub com versionamento claro, planejamento de entregas por etapas, documentação de setup e decisões, e manutenção de repositórios organizados em todos os projetos.",
      "en-US":
        "Use of Git and GitHub with clear versioning, staged delivery planning, setup and decision documentation, and organized repositories across all projects.",
    },
    examples: ["git", "github", "documentation", "portfolio-viviane"],
  },
  {
    slug: "teamwork",
    title: {
      "pt-BR": "Trabalho em Equipe",
      "en-US": "Teamwork",
    },
    description: {
      "pt-BR": "Capacidade de colaborar para atingir objetivos comuns.",
      "en-US": "Ability to collaborate to achieve shared goals.",
    },
    meaning: {
      "pt-BR":
        "Trabalho em equipe é alinhar expectativas cedo, dividir responsabilidades com clareza e construir soluções que façam sentido para todos os envolvidos.",
      "en-US":
        "Teamwork means aligning expectations early, dividing responsibilities clearly, and building solutions that make sense for everyone involved.",
    },
    practicalApplication: {
      "pt-BR":
        "Em projetos acadêmicos e colaborativos, participo de discussões de produto, alinho arquitetura com requisitos e contribuo no levantamento de necessidades antes da implementação.",
      "en-US":
        "In academic and collaborative projects, I join product discussions, align architecture with requirements, and contribute to needs gathering before implementation.",
    },
    examples: ["product-discussions", "requirements-gathering", "architecture"],
  },
  {
    slug: "adaptability",
    title: { "pt-BR": "Adaptabilidade", "en-US": "Adaptability" },
    description: {
      "pt-BR": "Capacidade de aprender novas ferramentas e tecnologias.",
      "en-US": "Ability to learn new tools and technologies.",
    },
    meaning: {
      "pt-BR":
        "Adaptabilidade é ajustar método e stack conforme o contexto — sem perder qualidade nem padrões de engenharia.",
      "en-US":
        "Adaptability means adjusting method and stack based on context — without losing quality or engineering standards.",
    },
    practicalApplication: {
      "pt-BR":
        "Experiência com Node.js, TypeScript, React, Next.js, Java, Spring Boot e diferentes bancos de dados, escolhendo a combinação certa para APIs, frontends e persistência em cada projeto.",
      "en-US":
        "Experience with Node.js, TypeScript, React, Next.js, Java, Spring Boot, and different databases, choosing the right combination for APIs, frontends, and persistence in each project.",
    },
    examples: [
      "nodejs",
      "typescript",
      "react",
      "nextjs",
      "java",
      "spring-boot",
      "postgresql",
    ],
  },
  {
    slug: "ownership",
    title: { "pt-BR": "Ownership", "en-US": "Ownership" },
    description: {
      "pt-BR":
        "Responsabilidade pelos resultados e pela qualidade das entregas.",
      "en-US": "Responsibility for outcomes and delivery quality.",
    },
    meaning: {
      "pt-BR":
        "Ownership é tratar cada projeto como algo que precisa funcionar de verdade — da ideia ao deploy, com atenção a manutenção e evolução.",
      "en-US":
        "Ownership means treating each project as something that must actually work — from idea to deploy, with attention to maintenance and evolution.",
    },
    practicalApplication: {
      "pt-BR":
        "Participação desde a concepção até deploy e manutenção dos projetos do portfólio, incluindo testes, documentação e preparação para produção.",
      "en-US":
        "Involvement from conception through deploy and maintenance of portfolio projects, including tests, documentation, and production readiness.",
    },
    examples: ["stockflow", "ticket-sales", "portfolio-viviane"],
  },
] as const satisfies readonly ProfessionalSkillSource[];

function localizeProfessionalSkill(
  skill: (typeof PROFESSIONAL_SKILLS_SOURCE)[number],
  locale: Locale,
): ProfessionalSkill {
  return {
    slug: skill.slug,
    title: pickLocalized(skill.title, locale),
    description: pickLocalized(skill.description, locale),
    meaning: pickLocalized(skill.meaning, locale),
    practicalApplication: pickLocalized(skill.practicalApplication, locale),
    examples: [...skill.examples],
  };
}

export function getKnowledgeSections(locale: Locale): KnowledgeSection[] {
  return KNOWLEDGE_SECTIONS_SOURCE.map((section) => ({
    id: section.id,
    label: pickLocalized(section.label, locale),
  }));
}

export function getProfessionalSkills(locale: Locale): ProfessionalSkill[] {
  return PROFESSIONAL_SKILLS_SOURCE.map((skill) =>
    localizeProfessionalSkill(skill, locale),
  );
}

export function getFeaturedProfessionalSkills(
  locale: Locale,
): ProfessionalSkill[] {
  return RECRUITER_FEATURED_SKILL_SLUGS.map((slug) => {
    const skill = PROFESSIONAL_SKILLS_SOURCE.find(
      (entry) => entry.slug === slug,
    );
    return skill ? localizeProfessionalSkill(skill, locale) : null;
  }).filter((skill): skill is ProfessionalSkill => skill !== null);
}

export function getExampleLabel(
  exampleKey: string,
  locale: Locale,
  projectNames: Record<string, string>,
): string {
  if (projectNames[exampleKey]) {
    return projectNames[exampleKey];
  }

  const label =
    EXAMPLE_LABELS_SOURCE[exampleKey as keyof typeof EXAMPLE_LABELS_SOURCE];
  return label ? pickLocalized(label, locale) : exampleKey;
}

export function isProjectExample(
  exampleKey: string,
  projectNames: Record<string, string>,
): boolean {
  return exampleKey in projectNames;
}

export function getProjectExamples(
  skill: ProfessionalSkill,
  projectNames: Record<string, string>,
): string[] {
  return skill.examples.filter((example) =>
    isProjectExample(example, projectNames),
  );
}

export function filterProfessionalSkills(
  skills: ProfessionalSkill[],
  query?: string,
): ProfessionalSkill[] {
  const normalizedQuery = query?.trim().toLowerCase();

  if (!normalizedQuery) {
    return skills;
  }

  return skills.filter((skill) => {
    const searchableText = [
      skill.title,
      skill.description,
      skill.meaning,
      skill.practicalApplication,
      skill.slug,
      ...skill.examples,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}
