"use client";

import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getExampleLabel, isProjectExample } from "@/data/professional-skills";
import { Link } from "@/i18n/routing";
import type { ProfessionalSkill } from "@/types/professional-skills";

interface ProfessionalSkillDetailsLabels {
  meaning: string;
  practicalApplication: string;
  examples: string;
}

interface ProfessionalSkillDetailsProps {
  skill: ProfessionalSkill;
  categoryLabel: string;
  labels: ProfessionalSkillDetailsLabels;
  projectNames: Record<string, string>;
  locale: "pt-BR" | "en-US";
}

export function ProfessionalSkillDetails({
  skill,
  categoryLabel,
  labels,
  projectNames,
  locale,
}: ProfessionalSkillDetailsProps) {
  const t = useTranslations("technicalKnowledgePage");

  return (
    <Card className="glass border-primary/20" id={`skill-${skill.slug}`}>
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle className="text-xl">{skill.title}</CardTitle>
          <Badge variant="secondary">{categoryLabel}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{skill.description}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <section>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
            {labels.meaning}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {skill.meaning}
          </p>
        </section>

        <section>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
            {labels.practicalApplication}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {skill.practicalApplication}
          </p>
        </section>

        {skill.examples.length > 0 && (
          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              {labels.examples}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skill.examples.map((exampleKey) => {
                const label = getExampleLabel(exampleKey, locale, projectNames);

                if (isProjectExample(exampleKey, projectNames)) {
                  return (
                    <Button
                      key={exampleKey}
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <Link
                        href={{
                          pathname: "/projects/[slug]",
                          params: { slug: exampleKey },
                        }}
                        aria-label={t("viewProjectAria", { name: label })}
                      >
                        {label}
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                      </Link>
                    </Button>
                  );
                }

                return (
                  <Badge key={exampleKey} variant="outline">
                    {label}
                  </Badge>
                );
              })}
            </div>
          </section>
        )}
      </CardContent>
    </Card>
  );
}
