import { BookOpen } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { TechnicalKnowledgeExplorer } from "@/components/knowledge/technical-knowledge-explorer";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  getKnowledgeSections,
  getProfessionalSkills,
} from "@/data/professional-skills";
import {
  getKnowledgeCategories,
  getKnowledgeItems,
  KNOWLEDGE_CATEGORY_IDS,
} from "@/data/technical-knowledge";
import { getProjects } from "@/data/projects";
import type { Locale } from "@/i18n/routing";
import type { KnowledgeCategoryId } from "@/types/technical-knowledge";

interface TechnicalKnowledgeContentProps {
  locale: Locale;
}

export async function TechnicalKnowledgeContent({
  locale,
}: TechnicalKnowledgeContentProps) {
  const t = await getTranslations({
    locale,
    namespace: "technicalKnowledgePage",
  });
  const items = getKnowledgeItems(locale);
  const professionalSkills = getProfessionalSkills(locale);
  const sections = getKnowledgeSections(locale);
  const categories = getKnowledgeCategories(locale);
  const projects = getProjects(locale);

  const categoryLabels = Object.fromEntries(
    categories.map((category) => [category.id, category.label]),
  ) as Record<KnowledgeCategoryId, string>;

  const projectNames = Object.fromEntries(
    projects.map((project) => [project.slug, project.name]),
  );

  return (
    <div className="section-container space-y-12 py-24 pt-28">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        align="left"
      />

      <section aria-labelledby="technical-knowledge-explorer-heading">
        <h2 id="technical-knowledge-explorer-heading" className="sr-only">
          {t("explorerTitle")}
        </h2>
        <p className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <BookOpen className="h-4 w-4 shrink-0" aria-hidden />
          {t("itemsCount", {
            technical: items.length,
            professional: professionalSkills.length,
            categories: KNOWLEDGE_CATEGORY_IDS.length,
          })}
        </p>
        <TechnicalKnowledgeExplorer
          items={items}
          professionalSkills={professionalSkills}
          sections={sections}
          categories={categories}
          categoryLabels={categoryLabels}
          projectNames={projectNames}
          locale={locale}
          labels={{
            searchLabel: t("searchLabel"),
            searchPlaceholder: t("searchPlaceholder"),
            sectionFilterAria: t("sectionFilterAria"),
            filterAria: t("filterAria"),
            allCategories: t("allCategories"),
            noResults: t("noResults"),
            whatIs: t("whatIs"),
            howItWorks: t("howItWorks"),
            practicalApplication: t("practicalApplication"),
            meaning: t("meaning"),
            examples: t("examples"),
            cardPracticalApplication: t("cardPracticalApplication"),
            relatedProjects: t("relatedProjects"),
            viewProject: t("viewProject"),
            professionalCategoryLabel: t("professionalCategoryLabel"),
          }}
        />
      </section>
    </div>
  );
}
