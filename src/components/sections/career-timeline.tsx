import { getTranslations } from "next-intl/server";
import { TimelineItem } from "@/components/shared/timeline-item";
import { getCareerTimeline } from "@/data/timeline";
import type { Locale } from "@/i18n/routing";

interface CareerTimelineProps {
  locale: Locale;
}

export async function CareerTimeline({ locale }: CareerTimelineProps) {
  const t = await getTranslations({ locale, namespace: "engineering" });
  const careerTimeline = getCareerTimeline(locale);

  return (
    <div>
      <h3 className="mb-6 text-lg font-semibold tracking-tight sm:text-xl">
        {t("timelineTitle")}
      </h3>
      <ol className="max-w-xl" aria-label={t("timelineAria")}>
        {careerTimeline.map((event, index) => (
          <TimelineItem
            key={event.id}
            event={event}
            isLast={index === careerTimeline.length - 1}
          />
        ))}
      </ol>
    </div>
  );
}
