import { ArrowUpRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GithubIcon } from "@/components/shared/brand-icons";
import { ProjectMetricGrid } from "@/components/shared/project-metric";
import { TechBadgeGroup } from "@/components/shared/tech-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Project, ProjectStatus } from "@/types";

const statusConfig: Record<
  ProjectStatus,
  { variant: "success" | "warning" | "muted" }
> = {
  Concluído: { variant: "success" },
  "Em desenvolvimento": { variant: "warning" },
  Planejado: { variant: "muted" },
};

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const status = statusConfig[project.status];
  const hasExternalLinks = Boolean(project.githubUrl || project.deployUrl);

  return (
    <Card className="group flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative aspect-video overflow-hidden bg-muted">
        <Image
          src={project.image}
          alt={`Screenshot do projeto ${project.name}`}
          fill
          priority={priority}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        <Badge variant={status.variant} className="absolute right-3 top-3">
          {project.status}
        </Badge>
      </div>

      <CardHeader className="pb-4">
        <CardTitle className="text-xl">{project.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4">
        <TechBadgeGroup
          title="Tecnologias"
          items={project.technologies}
          variant="secondary"
        />

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Métricas
          </p>
          <ProjectMetricGrid metrics={project.metrics} />
        </div>

        <TechBadgeGroup
          title="Conceitos"
          items={project.concepts}
          variant="outline"
        />

        <TechBadgeGroup
          title="Desafios"
          items={project.challenges}
          variant="outline"
        />
      </CardContent>

      <CardFooter className="flex flex-col gap-2 border-t bg-muted/20 p-4 sm:p-6">
        {hasExternalLinks && (
          <div
            className={cn(
              "grid w-full gap-2",
              project.githubUrl && project.deployUrl
                ? "grid-cols-2"
                : "grid-cols-1",
            )}
          >
            {project.githubUrl && (
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`GitHub do projeto ${project.name}`}
                >
                  <GithubIcon className="h-4 w-4 shrink-0" />
                  <span className="truncate">GitHub</span>
                </Link>
              </Button>
            )}

            {project.deployUrl && (
              <Button size="sm" asChild className="w-full">
                <Link
                  href={project.deployUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Deploy do projeto ${project.name}`}
                >
                  <ExternalLink className="h-4 w-4 shrink-0" />
                  <span className="truncate">Deploy</span>
                </Link>
              </Button>
            )}
          </div>
        )}

        <Button variant="secondary" size="sm" asChild className="w-full">
          <Link
            href={`/projetos/${project.slug}`}
            aria-label={`Ver detalhes do projeto ${project.name}`}
          >
            <span>Ver detalhes</span>
            <ArrowUpRight className="h-4 w-4 shrink-0" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
