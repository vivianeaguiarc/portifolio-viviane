import { getTranslations } from "next-intl/server";
import { AnimatedSection } from "@/components/shared/animated-section";
import { ProjectCard } from "@/components/shared/project-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { getLearningProjects, getPrimaryProjects } from "@/data/projects";
import type { Locale } from "@/i18n/routing";

interface ProjectsSectionProps {
  locale: Locale;
}

export async function ProjectsSection({ locale }: ProjectsSectionProps) {
  const t = await getTranslations({ locale, namespace: "projects" });
  const primaryProjects = getPrimaryProjects(locale);
  const learningProjects = getLearningProjects(locale);

  return (
    <AnimatedSection id="projetos" className="bg-muted/30 py-24">
      <div className="section-container space-y-16">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <section aria-labelledby="primary-projects-heading">
          <h3
            id="primary-projects-heading"
            className="mb-6 text-lg font-semibold tracking-tight"
          >
            {t("primaryTitle")}
          </h3>
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {primaryProjects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                priority={index < 2}
              />
            ))}
          </div>
        </section>

        {learningProjects.length > 0 && (
          <section aria-labelledby="learning-projects-heading">
            <h3
              id="learning-projects-heading"
              className="mb-6 text-lg font-semibold tracking-tight text-muted-foreground"
            >
              {t("learningTitle")}
            </h3>
            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {learningProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </section>
        )}
      </div>
    </AnimatedSection>
  );
}
