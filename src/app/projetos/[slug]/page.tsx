import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailContent } from "@/components/sections/project-detail-content";
import { ProjectJsonLd } from "@/components/shared/project-json-ld";
import { SITE_CONFIG } from "@/constants/site";
import { PROJECTS, getProjectBySlug } from "@/data/projects";
import { createPageMetadata } from "@/lib/seo";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Projeto não encontrado" };
  }

  const title = `${project.name} | Case Técnico | ${SITE_CONFIG.fullName}`;

  return createPageMetadata({
    title,
    description: project.description,
    path: `/projetos/${project.slug}`,
    type: "article",
    image: project.image,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <ProjectJsonLd project={project} />
      <ProjectDetailContent project={project} />
    </>
  );
}
