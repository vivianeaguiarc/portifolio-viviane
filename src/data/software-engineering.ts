import type { SoftwarePrinciple, PrincipleCategory } from "@/types";

export const SOFTWARE_ENGINEERING_SECTION = {
  eyebrow: "Engenharia de Software",
  title: "Como eu desenvolvo software",
  description:
    "Mais do que tecnologias, foco em princípios de engenharia, arquitetura e qualidade para construir aplicações escaláveis e sustentáveis.",
} as const;

export const PRINCIPLE_CATEGORIES: PrincipleCategory[] = [
  "Arquitetura",
  "Qualidade",
  "Segurança",
  "Operação",
];

export const SOFTWARE_PRINCIPLES: SoftwarePrinciple[] = [
  {
    id: "solid",
    name: "SOLID",
    description:
      "Princípios para construção de código flexível, extensível e de fácil manutenção.",
    category: "Qualidade",
    icon: "layers",
  },
  {
    id: "clean-architecture",
    name: "Clean Architecture",
    description:
      "Separação clara de responsabilidades entre domínio, aplicação e infraestrutura.",
    category: "Arquitetura",
    icon: "building",
  },
  {
    id: "ddd",
    name: "DDD",
    description:
      "Modelagem orientada ao domínio e alinhamento entre negócio e software.",
    category: "Arquitetura",
    icon: "boxes",
  },
  {
    id: "hexagonal",
    name: "Arquitetura Hexagonal",
    description: "Isolamento das regras de negócio das dependências externas.",
    category: "Arquitetura",
    icon: "component",
  },
  {
    id: "design-patterns",
    name: "Design Patterns",
    description:
      "Uso consciente de padrões para resolver problemas recorrentes.",
    category: "Arquitetura",
    icon: "puzzle",
  },
  {
    id: "testing",
    name: "Testes Automatizados",
    description: "Validação contínua de regras de negócio através de testes.",
    category: "Qualidade",
    icon: "flask",
  },
  {
    id: "cicd",
    name: "CI/CD",
    description: "Automação de qualidade e entrega contínua.",
    category: "Qualidade",
    icon: "git-branch",
  },
  {
    id: "observability",
    name: "Observabilidade",
    description: "Monitoramento, logs e saúde da aplicação.",
    category: "Operação",
    icon: "activity",
  },
  {
    id: "owasp",
    name: "OWASP",
    description: "Aplicação de práticas de segurança em APIs e aplicações web.",
    category: "Segurança",
    icon: "shield",
  },
  {
    id: "lgpd",
    name: "LGPD",
    description:
      "Proteção de dados e privacidade desde a concepção do sistema.",
    category: "Segurança",
    icon: "lock",
  },
];

export function getPrinciplesByCategory(
  category: PrincipleCategory,
): SoftwarePrinciple[] {
  return SOFTWARE_PRINCIPLES.filter(
    (principle) => principle.category === category,
  );
}
