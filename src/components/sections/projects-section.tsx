"use client";

import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GithubIcon } from "@/components/shared/brand-icons";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
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
import { PROJECTS } from "@/data/projects";
import type { ProjectStatus } from "@/types";

const statusConfig: Record<
  ProjectStatus,
  { label: string; variant: "success" | "warning" | "muted" }
> = {
  production: { label: "Em Produção", variant: "success" },
  development: { label: "Em Desenvolvimento", variant: "warning" },
  archived: { label: "Arquivado", variant: "muted" },
};

export function ProjectsSection() {
  return (
    <AnimatedSection id="projetos" className="bg-muted/30 py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow="Projetos"
          title="Soluções que desenvolvi"
          description="Projetos reais que demonstram minhas habilidades técnicas e capacidade de entrega."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, index) => {
            const status = statusConfig[project.status];

            return (
              <Card
                key={project.id}
                className="group flex flex-col overflow-hidden transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <Image
                    src={project.image}
                    alt={`Screenshot do projeto ${project.name}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                  <Badge
                    variant={status.variant}
                    className="absolute right-3 top-3"
                  >
                    {status.label}
                  </Badge>
                </div>

                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col gap-4">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Tecnologias
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Conceitos
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.concepts.map((concept) => (
                        <Badge
                          key={concept}
                          variant="outline"
                          className="text-xs"
                        >
                          {concept}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex-1"
                  >
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`GitHub do projeto ${project.name}`}
                    >
                      <GithubIcon className="h-4 w-4" />
                      GitHub
                    </Link>
                  </Button>
                  <Button size="sm" asChild className="flex-1">
                    <Link
                      href={project.deployUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Deploy do projeto ${project.name}`}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Deploy
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
