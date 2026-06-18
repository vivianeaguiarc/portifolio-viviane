import type { Locale } from "@/i18n/routing";
import { pickLocalized, type Localized } from "@/lib/localized";
import type {
  PrincipleCategory,
  PrincipleIcon,
  SoftwarePrinciple,
} from "@/types";

const SOFTWARE_ENGINEERING_SECTION_SOURCE = {
  eyebrow: {
    "pt-BR": "Engenharia de Software",
    "en-US": "Software Engineering",
  },
  title: {
    "pt-BR": "Como eu desenvolvo software",
    "en-US": "How I build software",
  },
  description: {
    "pt-BR":
      "Mais do que tecnologias, foco em princípios de engenharia, arquitetura e qualidade para construir aplicações escaláveis e sustentáveis.",
    "en-US":
      "Beyond technologies, I focus on engineering principles, architecture, and quality to build scalable and sustainable applications.",
  },
} as const satisfies Record<string, Localized<string>>;

export const PRINCIPLE_CATEGORY_KEYS = [
  "architecture",
  "quality",
  "security",
  "operations",
] as const satisfies readonly PrincipleCategory[];

const PRINCIPLE_CATEGORY_LABELS: Localized<Record<PrincipleCategory, string>> =
  {
    "pt-BR": {
      architecture: "Arquitetura",
      quality: "Qualidade",
      security: "Segurança",
      operations: "Operação",
    },
    "en-US": {
      architecture: "Architecture",
      quality: "Quality",
      security: "Security",
      operations: "Operations",
    },
  };

const SOFTWARE_PRINCIPLES_SOURCE = [
  {
    id: "solid",
    name: {
      "pt-BR": "SOLID",
      "en-US": "SOLID",
    },
    description: {
      "pt-BR":
        "Princípios para construção de código flexível, extensível e de fácil manutenção.",
      "en-US":
        "Principles for building flexible, extensible, and maintainable code.",
    },
    category: "quality",
    icon: "layers",
  },
  {
    id: "clean-architecture",
    name: {
      "pt-BR": "Clean Architecture",
      "en-US": "Clean Architecture",
    },
    description: {
      "pt-BR":
        "Separação clara de responsabilidades entre domínio, aplicação e infraestrutura.",
      "en-US":
        "Clear separation of responsibilities between domain, application, and infrastructure.",
    },
    category: "architecture",
    icon: "building",
  },
  {
    id: "ddd",
    name: {
      "pt-BR": "DDD",
      "en-US": "DDD",
    },
    description: {
      "pt-BR":
        "Modelagem orientada ao domínio e alinhamento entre negócio e software.",
      "en-US":
        "Domain-driven modeling and alignment between business and software.",
    },
    category: "architecture",
    icon: "boxes",
  },
  {
    id: "hexagonal",
    name: {
      "pt-BR": "Arquitetura Hexagonal",
      "en-US": "Hexagonal Architecture",
    },
    description: {
      "pt-BR": "Isolamento das regras de negócio das dependências externas.",
      "en-US": "Isolation of business rules from external dependencies.",
    },
    category: "architecture",
    icon: "component",
  },
  {
    id: "design-patterns",
    name: {
      "pt-BR": "Design Patterns",
      "en-US": "Design Patterns",
    },
    description: {
      "pt-BR": "Uso consciente de padrões para resolver problemas recorrentes.",
      "en-US": "Conscious use of patterns to solve recurring problems.",
    },
    category: "architecture",
    icon: "puzzle",
  },
  {
    id: "testing",
    name: {
      "pt-BR": "Testes Automatizados",
      "en-US": "Automated Testing",
    },
    description: {
      "pt-BR": "Validação contínua de regras de negócio através de testes.",
      "en-US": "Continuous validation of business rules through tests.",
    },
    category: "quality",
    icon: "flask",
  },
  {
    id: "cicd",
    name: {
      "pt-BR": "CI/CD",
      "en-US": "CI/CD",
    },
    description: {
      "pt-BR": "Automação de qualidade e entrega contínua.",
      "en-US": "Quality automation and continuous delivery.",
    },
    category: "quality",
    icon: "git-branch",
  },
  {
    id: "observability",
    name: {
      "pt-BR": "Observabilidade",
      "en-US": "Observability",
    },
    description: {
      "pt-BR": "Monitoramento, logs e saúde da aplicação.",
      "en-US": "Monitoring, logs, and application health.",
    },
    category: "operations",
    icon: "activity",
  },
  {
    id: "owasp",
    name: {
      "pt-BR": "OWASP",
      "en-US": "OWASP",
    },
    description: {
      "pt-BR": "Aplicação de práticas de segurança em APIs e aplicações web.",
      "en-US":
        "Application of security practices in APIs and web applications.",
    },
    category: "security",
    icon: "shield",
  },
  {
    id: "lgpd",
    name: {
      "pt-BR": "LGPD",
      "en-US": "LGPD",
    },
    description: {
      "pt-BR": "Proteção de dados e privacidade desde a concepção do sistema.",
      "en-US": "Data protection and privacy from system design onward.",
    },
    category: "security",
    icon: "lock",
  },
] as const satisfies readonly {
  id: string;
  name: Localized<string>;
  description: Localized<string>;
  category: PrincipleCategory;
  icon: PrincipleIcon;
}[];

export interface PrincipleCategoryItem {
  key: PrincipleCategory;
  label: string;
}

export function getSoftwareEngineeringSection(locale: Locale) {
  return {
    eyebrow: pickLocalized(SOFTWARE_ENGINEERING_SECTION_SOURCE.eyebrow, locale),
    title: pickLocalized(SOFTWARE_ENGINEERING_SECTION_SOURCE.title, locale),
    description: pickLocalized(
      SOFTWARE_ENGINEERING_SECTION_SOURCE.description,
      locale,
    ),
  };
}

export function getSoftwarePrinciples(locale: Locale): SoftwarePrinciple[] {
  return SOFTWARE_PRINCIPLES_SOURCE.map((principle) => ({
    id: principle.id,
    name: pickLocalized(principle.name, locale),
    description: pickLocalized(principle.description, locale),
    category: principle.category,
    icon: principle.icon,
  }));
}

export function getPrincipleCategories(
  locale: Locale,
): PrincipleCategoryItem[] {
  const labels = pickLocalized(PRINCIPLE_CATEGORY_LABELS, locale);

  return PRINCIPLE_CATEGORY_KEYS.map((key) => ({
    key,
    label: labels[key],
  }));
}

export function getPrinciplesByCategory(
  category: PrincipleCategory,
  locale: Locale,
): SoftwarePrinciple[] {
  return getSoftwarePrinciples(locale).filter(
    (principle) => principle.category === category,
  );
}
