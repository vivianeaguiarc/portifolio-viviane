import { AnimatedSection } from "@/components/shared/animated-section";
import { PrincipleCard } from "@/components/shared/principle-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { CareerTimeline } from "@/components/sections/career-timeline";
import { CurrentLearning } from "@/components/sections/current-learning";
import {
  getPrinciplesByCategory,
  PRINCIPLE_CATEGORIES,
  SOFTWARE_ENGINEERING_SECTION,
} from "@/data/software-engineering";

export function SoftwareEngineeringSection() {
  return (
    <AnimatedSection id="engenharia" className="py-24">
      <div className="section-container space-y-16">
        <SectionHeading
          eyebrow={SOFTWARE_ENGINEERING_SECTION.eyebrow}
          title={SOFTWARE_ENGINEERING_SECTION.title}
          description={SOFTWARE_ENGINEERING_SECTION.description}
        />

        <div className="space-y-12">
          {PRINCIPLE_CATEGORIES.map((category) => {
            const principles = getPrinciplesByCategory(category);

            if (principles.length === 0) return null;

            return (
              <div key={category}>
                <div className="mb-6 flex items-center gap-3">
                  <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
                    {category}
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
          <CareerTimeline />
          <CurrentLearning />
        </div>
      </div>
    </AnimatedSection>
  );
}
