import { getTranslations } from "next-intl/server";
import { AnimatedSection } from "@/components/shared/animated-section";
import { ProjectCard } from "@/components/shared/project-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { getProjects } from "@/data/projects";
import type { Locale } from "@/i18n/routing";

interface ProjectsSectionProps {
  locale: Locale;
}

export async function ProjectsSection({ locale }: ProjectsSectionProps) {
  const t = await getTranslations({ locale, namespace: "projects" });

  return (
    <AnimatedSection id="projetos" className="bg-muted/30 py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {getProjects(locale).map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              priority={index < 2}
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
