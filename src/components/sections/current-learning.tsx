import { LearningBadge } from "@/components/shared/learning-badge";
import {
  CURRENT_LEARNING_SECTION,
  CURRENT_LEARNING_TOPICS,
} from "@/data/current-learning";

export function CurrentLearning() {
  return (
    <div>
      <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
        {CURRENT_LEARNING_SECTION.title}
      </h3>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
        {CURRENT_LEARNING_SECTION.description}
      </p>
      <ul
        className="mt-6 flex flex-wrap gap-2"
        role="list"
        aria-label="Tópicos em estudo"
      >
        {CURRENT_LEARNING_TOPICS.map((topic) => (
          <li key={topic.id}>
            <LearningBadge topic={topic} />
          </li>
        ))}
      </ul>
    </div>
  );
}
