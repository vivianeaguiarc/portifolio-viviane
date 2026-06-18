import type { TimelineEvent } from "@/types";

interface TimelineItemProps {
  event: TimelineEvent;
  isLast?: boolean;
}

export function TimelineItem({ event, isLast = false }: TimelineItemProps) {
  return (
    <li className="relative flex gap-4 pb-8 last:pb-0">
      {!isLast && (
        <span
          className="absolute left-[11px] top-6 h-full w-px bg-border"
          aria-hidden
        />
      )}
      <div
        className="relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background"
        aria-hidden
      >
        <span className="h-2 w-2 rounded-full bg-primary" />
      </div>
      <article className="min-w-0 flex-1">
        <time
          dateTime={event.year}
          className="text-sm font-semibold text-primary"
        >
          {event.year}
        </time>
        <p className="mt-1 text-sm font-medium leading-snug sm:text-base">
          {event.title}
        </p>
      </article>
    </li>
  );
}
