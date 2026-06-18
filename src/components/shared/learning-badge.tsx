import { BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { LearningTopic } from "@/types";

interface LearningBadgeProps {
  topic: LearningTopic;
}

export function LearningBadge({ topic }: LearningBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className="gap-1.5 px-3 py-1.5 text-sm font-medium"
    >
      <BookOpen className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
      {topic.name}
    </Badge>
  );
}
