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
      "Evolução contínua em backend com Java e Spring Boot e em práticas de engenharia de software.",
    "en-US":
      "Continuous growth in backend with Java and Spring Boot and in software engineering practices.",
  },
} as const satisfies Record<string, Localized<string>>;

const CURRENT_LEARNING_TOPICS_SOURCE = [
  {
    id: "java",
    name: {
      "pt-BR": "Java",
      "en-US": "Java",
    },
  },
  {
    id: "spring-boot",
    name: {
      "pt-BR": "Spring Boot",
      "en-US": "Spring Boot",
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
