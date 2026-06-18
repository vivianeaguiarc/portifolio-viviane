"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type {
  KnowledgeSection,
  KnowledgeSectionId,
} from "@/types/professional-skills";

interface ProfessionalSkillCategoryProps {
  sections: KnowledgeSection[];
  activeSection: KnowledgeSectionId;
  onSectionChange: (section: KnowledgeSectionId) => void;
  filterAria: string;
}

export function ProfessionalSkillCategory({
  sections,
  activeSection,
  onSectionChange,
  filterAria,
}: ProfessionalSkillCategoryProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label={filterAria}>
      {sections.map((section) => (
        <button
          key={section.id}
          type="button"
          onClick={() => onSectionChange(section.id)}
        >
          <Badge
            variant={activeSection === section.id ? "default" : "outline"}
            className={cn(
              "cursor-pointer px-3 py-1.5 text-sm",
              activeSection === section.id && "hover:bg-primary/90",
            )}
          >
            {section.label}
          </Badge>
        </button>
      ))}
    </div>
  );
}
