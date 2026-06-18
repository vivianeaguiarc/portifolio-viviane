import { getTranslations } from "next-intl/server";
import { ArchitectureCard } from "@/components/architecture/architecture-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { getArchitectureShowcases } from "@/data/architecture-showcase";
import type { Locale } from "@/i18n/routing";

interface ArchitectureShowcaseContentProps {
  locale: Locale;
}

export async function ArchitectureShowcaseContent({
  locale,
}: ArchitectureShowcaseContentProps) {
  const t = await getTranslations({
    locale,
    namespace: "architectureShowcasePage",
  });
  const showcases = getArchitectureShowcases(locale);

  const labels = {
    overview: t("overview"),
    objective: t("objective"),
    architecture: t("architecture"),
    dataFlow: t("dataFlow"),
    technologies: t("technologies"),
    decisions: t("decisions"),
    diagramAria: t("diagramAria"),
    dataFlowAria: t("dataFlowAria"),
    features: t("features"),
    caseStudy: t("caseStudy"),
    caseStudyAria: t("caseStudyAria"),
  };

  return (
    <div className="section-container space-y-12 py-24 pt-28">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        align="left"
      />

      <section aria-labelledby="architecture-showcase-projects-heading">
        <h2
          id="architecture-showcase-projects-heading"
          className="mb-8 text-xl font-semibold"
        >
          {t("projectsTitle")}
        </h2>
        <div className="space-y-10">
          {showcases.map((item) => (
            <ArchitectureCard key={item.slug} item={item} labels={labels} />
          ))}
        </div>
      </section>
    </div>
  );
}
