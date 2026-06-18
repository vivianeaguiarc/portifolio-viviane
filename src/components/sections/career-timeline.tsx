import { TimelineItem } from "@/components/shared/timeline-item";
import { CAREER_TIMELINE } from "@/data/timeline";

export function CareerTimeline() {
  return (
    <div>
      <h3 className="mb-6 text-lg font-semibold tracking-tight sm:text-xl">
        Evolução profissional
      </h3>
      <ol className="max-w-xl" aria-label="Linha do tempo profissional">
        {CAREER_TIMELINE.map((event, index) => (
          <TimelineItem
            key={event.id}
            event={event}
            isLast={index === CAREER_TIMELINE.length - 1}
          />
        ))}
      </ol>
    </div>
  );
}
