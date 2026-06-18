"use client";

import { ProfessionalSkillCard } from "@/components/knowledge/professional-skill-card";
import type { ProfessionalSkill } from "@/types/professional-skills";

interface ProfessionalSkillGridProps {
  skills: ProfessionalSkill[];
  categoryLabel: string;
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
  projectNames: Record<string, string>;
  practicalApplicationLabel: string;
  relatedProjectsLabel: string;
}

export function ProfessionalSkillGrid({
  skills,
  categoryLabel,
  selectedSlug,
  onSelect,
  projectNames,
  practicalApplicationLabel,
  relatedProjectsLabel,
}: ProfessionalSkillGridProps) {
  return (
    <>
      {skills.map((skill) => (
        <div key={`professional-${skill.slug}`} role="listitem">
          <ProfessionalSkillCard
            skill={skill}
            categoryLabel={categoryLabel}
            isSelected={selectedSlug === skill.slug}
            onSelect={onSelect}
            projectNames={projectNames}
            practicalApplicationLabel={practicalApplicationLabel}
            relatedProjectsLabel={relatedProjectsLabel}
          />
        </div>
      ))}
    </>
  );
}
