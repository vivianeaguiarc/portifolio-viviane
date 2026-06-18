import { createSoftwareApplicationJsonLd } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import type { Project } from "@/types";

interface ProjectJsonLdProps {
  project: Project;
  locale: Locale;
  canonicalPath: string;
}

export function ProjectJsonLd({
  project,
  locale,
  canonicalPath,
}: ProjectJsonLdProps) {
  const jsonLd = createSoftwareApplicationJsonLd(
    project,
    locale,
    canonicalPath,
  );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
