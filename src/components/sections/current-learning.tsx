import { LearningBadge } from "@/components/shared/learning-badge";
import {
  getCurrentLearningSection,
  getCurrentLearningTopics,
} from "@/data/current-learning";
import type { Locale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

interface CurrentLearningProps {
  locale: Locale;
}

export async function CurrentLearning({ locale }: CurrentLearningProps) {
  const t = await getTranslations({ locale, namespace: "engineering" });
  const section = getCurrentLearningSection(locale);
  const topics = getCurrentLearningTopics(locale);

  return (
    <div>
      <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
        {section.title}
      </h3>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
        {section.description}
      </p>
      <ul
        className="mt-6 flex flex-wrap gap-2"
        role="list"
        aria-label={t("learningAria")}
      >
        {topics.map((topic) => (
          <li key={topic.id}>
            <LearningBadge topic={topic} />
          </li>
        ))}
      </ul>
    </div>
  );
}
