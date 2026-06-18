import { AnimatedSection } from "@/components/shared/animated-section";
import { PrincipleCard } from "@/components/shared/principle-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { CareerTimeline } from "@/components/sections/career-timeline";
import { CurrentLearning } from "@/components/sections/current-learning";
import {
  getPrincipleCategories,
  getPrinciplesByCategory,
  getSoftwareEngineeringSection,
} from "@/data/software-engineering";
import type { Locale } from "@/i18n/routing";

interface SoftwareEngineeringSectionProps {
  locale: Locale;
}

export async function SoftwareEngineeringSection({
  locale,
}: SoftwareEngineeringSectionProps) {
  const section = getSoftwareEngineeringSection(locale);
  const categories = getPrincipleCategories(locale);

  return (
    <AnimatedSection id="engenharia" className="py-24">
      <div className="section-container space-y-16">
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
        />

        <div className="space-y-12">
          {categories.map(({ key, label }) => {
            const principles = getPrinciplesByCategory(key, locale);

            if (principles.length === 0) return null;

            return (
              <div key={key}>
                <div className="mb-6 flex items-center gap-3">
                  <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
                    {label}
                  </h3>
                  <Badge variant="outline">{principles.length}</Badge>
                </div>
                <ul
                  className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  role="list"
                >
                  {principles.map((principle) => (
                    <li key={principle.id}>
                      <PrincipleCard principle={principle} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <CareerTimeline locale={locale} />
          <CurrentLearning locale={locale} />
        </div>
      </div>
    </AnimatedSection>
  );
}
