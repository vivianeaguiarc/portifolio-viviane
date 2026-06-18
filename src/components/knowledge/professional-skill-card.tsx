"use client";

import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProjectExamples } from "@/data/professional-skills";
import { cn } from "@/lib/utils";
import type { ProfessionalSkill } from "@/types/professional-skills";

interface ProfessionalSkillCardProps {
  skill: ProfessionalSkill;
  categoryLabel: string;
  isSelected: boolean;
  onSelect: (slug: string) => void;
  projectNames: Record<string, string>;
  practicalApplicationLabel: string;
  relatedProjectsLabel: string;
}

export function ProfessionalSkillCard({
  skill,
  categoryLabel,
  isSelected,
  onSelect,
  projectNames,
  practicalApplicationLabel,
  relatedProjectsLabel,
}: ProfessionalSkillCardProps) {
  const t = useTranslations("technicalKnowledgePage");
  const projectExamples = getProjectExamples(skill, projectNames);

  return (
    <button
      type="button"
      onClick={() => onSelect(skill.slug)}
      aria-label={t("selectCardAria", { title: skill.title })}
      aria-pressed={isSelected}
      className="w-full text-left"
    >
      <Card
        className={cn(
          "glass h-full transition-colors hover:border-primary/40",
          isSelected && "border-primary ring-1 ring-primary/30",
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base leading-snug">
              {skill.title}
            </CardTitle>
            <ChevronRight
              className={cn(
                "mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                isSelected && "rotate-90 text-primary",
              )}
              aria-hidden
            />
          </div>
          <Badge variant="secondary" className="w-fit">
            {categoryLabel}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {skill.description}
          </p>
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
              {practicalApplicationLabel}
            </p>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {skill.practicalApplication}
            </p>
          </div>
          {projectExamples.length > 0 && (
            <div>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                {relatedProjectsLabel}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {projectExamples.map((slug) => (
                  <Badge key={slug} variant="outline" className="text-xs">
                    {projectNames[slug]}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </button>
  );
}
