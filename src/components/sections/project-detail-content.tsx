import { getTranslations } from "next-intl/server";
import { ProjectCoverImage } from "@/components/shared/project-cover-image";
import { ProjectArchitectureFlow } from "@/components/shared/project-architecture-flow";
import { ProjectDetailHeader } from "@/components/shared/project-detail-header";
import { ProjectMetricGrid } from "@/components/shared/project-metric";
import { ProjectSection } from "@/components/shared/project-section";
import { TechBadgeGroup } from "@/components/shared/tech-badge";
import type { Locale } from "@/i18n/routing";
import type { Project } from "@/types";

interface ProjectDetailContentProps {
  project: Project;
  locale: Locale;
}

export async function ProjectDetailContent({
  project,
  locale,
}: ProjectDetailContentProps) {
  const t = await getTranslations({ locale, namespace: "projectDetail" });
  const tProjects = await getTranslations({ locale, namespace: "projects" });

  return (
    <article className="section-container space-y-10 py-24 pt-28">
      <ProjectDetailHeader project={project} locale={locale} />

      <div className="relative aspect-video overflow-hidden rounded-2xl border bg-muted shadow-lg">
        <ProjectCoverImage
          src={project.image}
          alt={tProjects("screenshotAlt", { name: project.name })}
          priority
          sizes="(max-width: 1280px) 100vw, 1152px"
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <ProjectSection title={t("overview")} id="visao-geral">
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

          <ProjectSection title={t("problem")} id="problema">
            <p className="leading-relaxed text-muted-foreground">
              {project.problem}
            </p>
          </ProjectSection>

          <ProjectSection title={t("businessRules")} id="regras">
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

          <ProjectSection title={t("architecture")} id="arquitetura">
            <h3 className="mb-2 font-medium">{project.architecture.title}</h3>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              {project.architecture.description}
            </p>
            <ProjectArchitectureFlow steps={project.architecture.flow} />
          </ProjectSection>

          <ProjectSection title={t("challenges")} id="desafios">
            <TechBadgeGroup
              title=""
              items={project.challenges}
              variant="outline"
            />
          </ProjectSection>

          <ProjectSection title={t("decisions")} id="decisoes">
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
          <ProjectSection title={t("metrics")} id="metricas">
            <ProjectMetricGrid metrics={project.metrics} />
          </ProjectSection>

          <ProjectSection title={t("technologies")} id="tecnologias">
            <TechBadgeGroup
              title=""
              items={project.technologies}
              variant="secondary"
            />
          </ProjectSection>

          <ProjectSection title={t("concepts")} id="conceitos">
            <TechBadgeGroup
              title=""
              items={project.concepts}
              variant="outline"
            />
          </ProjectSection>

          <ProjectSection title={t("learnings")} id="aprendizados">
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

          <ProjectSection title={t("roadmap")} id="roadmap">
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
