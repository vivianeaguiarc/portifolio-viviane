"use client";

import { ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { GithubIcon } from "@/components/shared/brand-icons";
import { ProjectCoverImage } from "@/components/shared/project-cover-image";
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
import { Link as I18nLink } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import type { Project, ProjectStatus } from "@/types";

const statusConfig: Record<
  ProjectStatus,
  { variant: "success" | "warning" | "muted" }
> = {
  completed: { variant: "success" },
  inDevelopment: { variant: "warning" },
  planned: { variant: "muted" },
};

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const t = useTranslations("projects");
  const status = statusConfig[project.status];
  const hasExternalLinks = Boolean(project.githubUrl || project.deployUrl);

  return (
    <Card className="group flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative aspect-video overflow-hidden bg-muted">
        <ProjectCoverImage
          src={project.image}
          alt={t("screenshotAlt", { name: project.name })}
          priority={priority}
          className="transition-transform duration-300 group-hover:scale-105"
        />
        <Badge variant={status.variant} className="absolute right-3 top-3">
          {t(`status.${project.status}`)}
        </Badge>
      </div>

      <CardHeader className="pb-4">
        <CardTitle className="text-xl">{project.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col pb-2">
        <TechBadgeGroup
          title={t("technologies")}
          items={project.technologies}
          variant="secondary"
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
                  aria-label={t("githubAria", { name: project.name })}
                >
                  <GithubIcon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{t("github")}</span>
                </Link>
              </Button>
            )}

            {project.deployUrl && (
              <Button size="sm" asChild className="w-full">
                <Link
                  href={project.deployUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("deployAria", { name: project.name })}
                >
                  <ExternalLink className="h-4 w-4 shrink-0" />
                  <span className="truncate">{t("deploy")}</span>
                </Link>
              </Button>
            )}
          </div>
        )}

        <Button variant="secondary" size="sm" asChild className="w-full">
          <I18nLink
            href={{
              pathname: "/projects/[slug]",
              params: { slug: project.slug },
            }}
            aria-label={t("viewDetailsAria", { name: project.name })}
          >
            <span>{t("viewDetails")}</span>
            <ArrowUpRight className="h-4 w-4 shrink-0" />
          </I18nLink>
        </Button>
      </CardFooter>
    </Card>
  );
}
