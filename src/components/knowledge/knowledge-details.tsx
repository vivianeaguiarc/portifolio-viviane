"use client";

import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import type { KnowledgeItem } from "@/types/technical-knowledge";

interface KnowledgeDetailsLabels {
  whatIs: string;
  howItWorks: string;
  practicalApplication: string;
  relatedProjects: string;
  viewProject: string;
}

interface KnowledgeDetailsProps {
  item: KnowledgeItem;
  categoryLabel: string;
  labels: KnowledgeDetailsLabels;
  projectNames: Record<string, string>;
}

export function KnowledgeDetails({
  item,
  categoryLabel,
  labels,
  projectNames,
}: KnowledgeDetailsProps) {
  const t = useTranslations("technicalKnowledgePage");

  return (
    <Card className="glass border-primary/20" id={`knowledge-${item.slug}`}>
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle className="text-xl">{item.title}</CardTitle>
          <Badge variant="secondary">{categoryLabel}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <section>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
            {labels.whatIs}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {item.definition}
          </p>
        </section>

        <section>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
            {labels.howItWorks}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {item.howItWorks}
          </p>
        </section>

        <section>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
            {labels.practicalApplication}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {item.practicalApplication}
          </p>
        </section>

        {item.relatedProjects.length > 0 && (
          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              {labels.relatedProjects}
            </h3>
            <div className="flex flex-wrap gap-2">
              {item.relatedProjects.map((slug) => (
                <Button key={slug} variant="outline" size="sm" asChild>
                  <Link
                    href={{
                      pathname: "/projects/[slug]",
                      params: { slug },
                    }}
                    aria-label={t("viewProjectAria", {
                      name: projectNames[slug] ?? slug,
                    })}
                  >
                    {projectNames[slug] ?? slug}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </Button>
              ))}
            </div>
          </section>
        )}
      </CardContent>
    </Card>
  );
}
