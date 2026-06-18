import { AnimatedSection } from "@/components/shared/animated-section";
import { ProjectCard } from "@/components/shared/project-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { PROJECTS } from "@/data/projects";

export function ProjectsSection() {
  return (
    <AnimatedSection id="projetos" className="bg-muted/30 py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow="Projetos"
          title="Cases técnicos de engenharia"
          description="Projetos reais com foco em arquitetura, decisões técnicas, métricas e desafios resolvidos em produção."
        />

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {PROJECTS.map((project, index) => (
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
