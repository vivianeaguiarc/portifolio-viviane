import type { LearningTopic } from "@/types";

export const CURRENT_LEARNING_SECTION = {
  title: "Atualmente estudando",
  description:
    "Evolução contínua em arquitetura, backend e práticas de engenharia de software.",
} as const;

export const CURRENT_LEARNING_TOPICS: LearningTopic[] = [
  { id: "java-spring", name: "Java + Spring Boot" },
  { id: "hexagonal", name: "Arquitetura Hexagonal" },
  { id: "ddd", name: "Domain Driven Design" },
  { id: "api-security", name: "Segurança de APIs" },
  { id: "cloud", name: "Cloud Computing" },
  { id: "docker", name: "Docker" },
  { id: "kubernetes", name: "Kubernetes" },
  { id: "software-engineering", name: "Engenharia de Software" },
];
