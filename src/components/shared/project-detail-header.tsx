import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { GithubIcon } from "@/components/shared/brand-icons";
import { NavigationLink } from "@/components/shared/navigation-link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";
import type { Project, ProjectStatus } from "@/types";

const statusConfig: Record<
  ProjectStatus,
  { variant: "success" | "warning" | "muted" }
> = {
  completed: { variant: "success" },
  inDevelopment: { variant: "warning" },
  planned: { variant: "muted" },
};

interface ProjectDetailHeaderProps {
  project: Project;
  locale: Locale;
}

export async function ProjectDetailHeader({
  project,
  locale,
}: ProjectDetailHeaderProps) {
  const t = await getTranslations({ locale, namespace: "projectDetail" });
  const tProjects = await getTranslations({ locale, namespace: "projects" });
  const status = statusConfig[project.status];

  return (
    <header className="space-y-6">
      <Button variant="ghost" size="sm" asChild className="-ml-2 w-fit">
        <NavigationLink href="/#projetos" aria-label={t("backAria")}>
          <ArrowLeft className="h-4 w-4" />
          {t("back")}
        </NavigationLink>
      </Button>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <Badge variant={status.variant}>
            {tProjects(`status.${project.status}`)}
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {project.name}
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 lg:justify-end">
          {project.githubUrl && (
            <Button variant="outline" asChild>
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon className="h-4 w-4" />
                {tProjects("github")}
              </Link>
            </Button>
          )}
          {project.deployUrl && (
            <Button asChild>
              <Link
                href={project.deployUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
                {tProjects("deploy")}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
