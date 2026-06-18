import Image from "next/image";
import { ProjectArchitectureFlow } from "@/components/shared/project-architecture-flow";
import { ProjectDetailHeader } from "@/components/shared/project-detail-header";
import { ProjectMetricGrid } from "@/components/shared/project-metric";
import { ProjectSection } from "@/components/shared/project-section";
import { TechBadgeGroup } from "@/components/shared/tech-badge";
import type { Project } from "@/types";

interface ProjectDetailContentProps {
  project: Project;
}

export function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  return (
    <article className="section-container space-y-10 py-24 pt-28">
      <ProjectDetailHeader project={project} />

      <div className="relative aspect-video overflow-hidden rounded-2xl border bg-muted shadow-lg">
        <Image
          src={project.image}
          alt={`Screenshot do projeto ${project.name}`}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1280px) 100vw, 1152px"
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <ProjectSection title="Visão geral" id="visao-geral">
            <p className="leading-relaxed text-muted-foreground">
              {project.longDescription}
            </p>
            <ul className="mt-4 space-y-2" role="list">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-2 text-sm text-muted-foreground"
                >
                  <span className="text-primary" aria-hidden>
                    •
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>
          </ProjectSection>

          <ProjectSection title="Problema resolvido" id="problema">
            <p className="leading-relaxed text-muted-foreground">
              {project.problem}
            </p>
          </ProjectSection>

          <ProjectSection title="Regras de negócio" id="regras">
            <ul className="space-y-2" role="list">
              {project.businessRules.map((rule) => (
                <li
                  key={rule}
                  className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="text-primary" aria-hidden>
                    •
                  </span>
                  {rule}
                </li>
              ))}
            </ul>
          </ProjectSection>

          <ProjectSection title="Arquitetura" id="arquitetura">
            <h3 className="mb-2 font-medium">{project.architecture.title}</h3>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              {project.architecture.description}
            </p>
            <ProjectArchitectureFlow steps={project.architecture.flow} />
          </ProjectSection>

          <ProjectSection title="Desafios técnicos" id="desafios">
            <TechBadgeGroup
              title=""
              items={project.challenges}
              variant="outline"
            />
          </ProjectSection>

          <ProjectSection title="Decisões técnicas" id="decisoes">
            <div className="space-y-4">
              {project.technicalDecisions.map((decision) => (
                <div
                  key={decision.title}
                  className="rounded-lg border border-border/60 bg-background/40 p-4"
                >
                  <h3 className="font-medium">{decision.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {decision.description}
                  </p>
                </div>
              ))}
            </div>
          </ProjectSection>
        </div>

        <aside className="space-y-8">
          <ProjectSection title="Métricas técnicas" id="metricas">
            <ProjectMetricGrid metrics={project.metrics} />
          </ProjectSection>

          <ProjectSection title="Tecnologias" id="tecnologias">
            <TechBadgeGroup
              title=""
              items={project.technologies}
              variant="secondary"
            />
          </ProjectSection>

          <ProjectSection title="Conceitos aplicados" id="conceitos">
            <TechBadgeGroup
              title=""
              items={project.concepts}
              variant="outline"
            />
          </ProjectSection>

          <ProjectSection title="Aprendizados" id="aprendizados">
            <ul className="space-y-2" role="list">
              {project.learnings.map((learning) => (
                <li
                  key={learning}
                  className="text-sm leading-relaxed text-muted-foreground"
                >
                  {learning}
                </li>
              ))}
            </ul>
          </ProjectSection>

          <ProjectSection title="Roadmap" id="roadmap">
            <ol className="space-y-2" role="list">
              {project.roadmap.map((item, index) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="font-semibold text-primary">
                    {index + 1}.
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </ProjectSection>
        </aside>
      </div>
    </article>
  );
}
