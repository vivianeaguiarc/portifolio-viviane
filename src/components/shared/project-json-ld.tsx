import type { Project } from "@/types";
import { createSoftwareApplicationJsonLd } from "@/lib/seo";

interface ProjectJsonLdProps {
  project: Project;
}

export function ProjectJsonLd({ project }: ProjectJsonLdProps) {
  const jsonLd = createSoftwareApplicationJsonLd(project);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
