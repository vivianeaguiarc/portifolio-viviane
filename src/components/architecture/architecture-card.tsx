import { ArrowUpRight } from "lucide-react";
import { ArchitectureDiagram } from "@/components/architecture/architecture-diagram";
import { TechBadgeGroup } from "@/components/shared/tech-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import type { ArchitectureShowcaseItem } from "@/types/architecture-showcase";

interface ArchitectureCardLabels {
  overview: string;
  objective: string;
  architecture: string;
  dataFlow: string;
  technologies: string;
  decisions: string;
  diagramAria: string;
  dataFlowAria: string;
  features: string;
  caseStudy: string;
  caseStudyAria: string;
}

interface ArchitectureCardProps {
  item: ArchitectureShowcaseItem;
  labels: ArchitectureCardLabels;
}

export function ArchitectureCard({ item, labels }: ArchitectureCardProps) {
  return (
    <article
      id={item.slug}
      className="scroll-mt-28 space-y-6 rounded-2xl border bg-card/40 p-6 shadow-sm lg:p-8"
      aria-labelledby={`${item.slug}-title`}
    >
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <h2
            id={`${item.slug}-title`}
            className="text-2xl font-bold tracking-tight"
          >
            {item.name}
          </h2>
          <p className="max-w-3xl text-muted-foreground leading-relaxed">
            {item.overview}
          </p>
        </div>
        <Button variant="outline" size="sm" asChild className="shrink-0">
          <Link
            href={{
              pathname: "/projects/[slug]",
              params: { slug: item.slug },
            }}
            aria-label={labels.caseStudyAria.replace("{name}", item.name)}
          >
            {labels.caseStudy}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="glass h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{labels.objective}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {item.objective}
            </p>
          </CardContent>
        </Card>

        <Card className="glass h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{labels.architecture}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm font-medium">{item.architectureTitle}</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {item.architectureDescription}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ArchitectureDiagram
          title={labels.architecture}
          nodes={item.diagramNodes}
          features={item.features}
          featuresLabel={labels.features}
          ariaLabel={labels.diagramAria.replace("{name}", item.name)}
        />
        <ArchitectureDiagram
          title={labels.dataFlow}
          nodes={item.dataFlowNodes}
          ariaLabel={labels.dataFlowAria.replace("{name}", item.name)}
        />
      </div>

      <div className="space-y-4">
        <TechBadgeGroup
          title={labels.technologies}
          items={item.technologies}
          variant="secondary"
        />

        <section aria-labelledby={`${item.slug}-decisions`}>
          <h3
            id={`${item.slug}-decisions`}
            className="mb-4 text-base font-semibold"
          >
            {labels.decisions}
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            {item.technicalDecisions.map((decision) => (
              <Card key={decision.title} className="glass h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{decision.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {decision.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
