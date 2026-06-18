import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailContent } from "@/components/sections/project-detail-content";
import { SITE_CONFIG } from "@/constants/site";
import { PROJECTS, getProjectBySlug } from "@/data/projects";

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
  const description = project.description;
  const imageUrl = `${SITE_CONFIG.url}${project.image}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `${SITE_CONFIG.url}/projetos/${project.slug}`,
      images: [{ url: imageUrl, alt: `Screenshot do projeto ${project.name}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/projetos/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailContent project={project} />;
}
