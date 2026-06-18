import type { Locale } from "@/i18n/routing";
import { pickLocalized, type Localized } from "@/lib/localized";
import type { LearningTopic } from "@/types";

const CURRENT_LEARNING_SECTION_SOURCE = {
  title: {
    "pt-BR": "Atualmente estudando",
    "en-US": "Currently studying",
  },
  description: {
    "pt-BR":
      "Evolução contínua em arquitetura, backend e práticas de engenharia de software.",
    "en-US":
      "Continuous growth in architecture, backend, and software engineering practices.",
  },
} as const satisfies Record<string, Localized<string>>;

const CURRENT_LEARNING_TOPICS_SOURCE = [
  {
    id: "java-spring",
    name: {
      "pt-BR": "Java + Spring Boot",
      "en-US": "Java + Spring Boot",
    },
  },
  {
    id: "hexagonal",
    name: {
      "pt-BR": "Arquitetura Hexagonal",
      "en-US": "Hexagonal Architecture",
    },
  },
  {
    id: "ddd",
    name: {
      "pt-BR": "Domain Driven Design",
      "en-US": "Domain Driven Design",
    },
  },
  {
    id: "api-security",
    name: {
      "pt-BR": "Segurança de APIs",
      "en-US": "API Security",
    },
  },
  {
    id: "cloud",
    name: {
      "pt-BR": "Cloud Computing",
      "en-US": "Cloud Computing",
    },
  },
  {
    id: "docker",
    name: {
      "pt-BR": "Docker",
      "en-US": "Docker",
    },
  },
  {
    id: "kubernetes",
    name: {
      "pt-BR": "Kubernetes",
      "en-US": "Kubernetes",
    },
  },
  {
    id: "software-engineering",
    name: {
      "pt-BR": "Engenharia de Software",
      "en-US": "Software Engineering",
    },
  },
] as const satisfies readonly {
  id: string;
  name: Localized<string>;
}[];

export function getCurrentLearningSection(locale: Locale) {
  return {
    title: pickLocalized(CURRENT_LEARNING_SECTION_SOURCE.title, locale),
    description: pickLocalized(
      CURRENT_LEARNING_SECTION_SOURCE.description,
      locale,
    ),
  };
}

export function getCurrentLearningTopics(locale: Locale): LearningTopic[] {
  return CURRENT_LEARNING_TOPICS_SOURCE.map((topic) => ({
    id: topic.id,
    name: pickLocalized(topic.name, locale),
  }));
}
