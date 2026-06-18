"use client";

import { useMemo, useState } from "react";
import { KnowledgeCard } from "@/components/knowledge/knowledge-card";
import { KnowledgeCategoryFilter } from "@/components/knowledge/knowledge-category";
import { KnowledgeDetails } from "@/components/knowledge/knowledge-details";
import { KnowledgeSearch } from "@/components/knowledge/knowledge-search";
import { ProfessionalSkillCategory } from "@/components/knowledge/professional-skill-category";
import { ProfessionalSkillDetails } from "@/components/knowledge/professional-skill-details";
import { ProfessionalSkillGrid } from "@/components/knowledge/professional-skill-grid";
import { filterProfessionalSkills } from "@/data/professional-skills";
import { filterKnowledgeItems } from "@/data/technical-knowledge";
import type {
  KnowledgeSection,
  KnowledgeSectionId,
  ProfessionalSkill,
} from "@/types/professional-skills";
import type {
  KnowledgeCategory,
  KnowledgeCategoryId,
  KnowledgeItem,
} from "@/types/technical-knowledge";

type SelectedEntry =
  | { type: "technical"; slug: string }
  | { type: "professional"; slug: string };

interface TechnicalKnowledgeExplorerLabels {
  searchLabel: string;
  searchPlaceholder: string;
  sectionFilterAria: string;
  filterAria: string;
  allCategories: string;
  noResults: string;
  whatIs: string;
  howItWorks: string;
  practicalApplication: string;
  meaning: string;
  examples: string;
  cardPracticalApplication: string;
  relatedProjects: string;
  viewProject: string;
  professionalCategoryLabel: string;
}

interface TechnicalKnowledgeExplorerProps {
  items: KnowledgeItem[];
  professionalSkills: ProfessionalSkill[];
  sections: KnowledgeSection[];
  categories: KnowledgeCategory[];
  categoryLabels: Record<KnowledgeCategoryId, string>;
  projectNames: Record<string, string>;
  locale: "pt-BR" | "en-US";
  labels: TechnicalKnowledgeExplorerLabels;
}

function getInitialSelection(
  section: KnowledgeSectionId,
  technicalItems: KnowledgeItem[],
  professionalItems: ProfessionalSkill[],
): SelectedEntry | null {
  if (section === "professional") {
    const first = professionalItems[0];
    return first ? { type: "professional", slug: first.slug } : null;
  }

  const first = technicalItems[0];
  return first ? { type: "technical", slug: first.slug } : null;
}

export function TechnicalKnowledgeExplorer({
  items,
  professionalSkills,
  sections,
  categories,
  categoryLabels,
  projectNames,
  locale,
  labels,
}: TechnicalKnowledgeExplorerProps) {
  const [query, setQuery] = useState("");
  const [activeSection, setActiveSection] = useState<KnowledgeSectionId>("all");
  const [activeCategory, setActiveCategory] = useState<
    KnowledgeCategoryId | "all"
  >("all");
  const [selected, setSelected] = useState<SelectedEntry | null>(null);

  const filteredTechnicalItems = useMemo(
    () =>
      filterKnowledgeItems(items, {
        category:
          activeSection === "professional"
            ? undefined
            : activeCategory === "all"
              ? undefined
              : activeCategory,
        query,
      }),
    [items, activeCategory, activeSection, query],
  );

  const filteredProfessionalSkills = useMemo(
    () =>
      activeSection === "technical"
        ? []
        : filterProfessionalSkills(professionalSkills, query),
    [professionalSkills, activeSection, query],
  );

  const showTechnicalItems =
    activeSection === "all" || activeSection === "technical";
  const showProfessionalSkills =
    activeSection === "all" || activeSection === "professional";

  const visibleTechnicalItems = useMemo(
    () => (showTechnicalItems ? filteredTechnicalItems : []),
    [showTechnicalItems, filteredTechnicalItems],
  );

  const visibleProfessionalSkills = useMemo(
    () => (showProfessionalSkills ? filteredProfessionalSkills : []),
    [showProfessionalSkills, filteredProfessionalSkills],
  );

  const hasResults =
    visibleTechnicalItems.length > 0 || visibleProfessionalSkills.length > 0;

  const effectiveSelection = useMemo((): SelectedEntry | null => {
    if (selected?.type === "technical") {
      const isVisible = visibleTechnicalItems.some(
        (item) => item.slug === selected.slug,
      );
      if (isVisible) {
        return selected;
      }
    }

    if (selected?.type === "professional") {
      const isVisible = visibleProfessionalSkills.some(
        (skill) => skill.slug === selected.slug,
      );
      if (isVisible) {
        return selected;
      }
    }

    return getInitialSelection(
      activeSection,
      visibleTechnicalItems,
      visibleProfessionalSkills,
    );
  }, [
    selected,
    activeSection,
    visibleTechnicalItems,
    visibleProfessionalSkills,
  ]);

  const selectedTechnicalItem = useMemo(
    () =>
      effectiveSelection?.type === "technical"
        ? (visibleTechnicalItems.find(
            (item) => item.slug === effectiveSelection.slug,
          ) ?? null)
        : null,
    [effectiveSelection, visibleTechnicalItems],
  );

  const selectedProfessionalSkill = useMemo(
    () =>
      effectiveSelection?.type === "professional"
        ? (visibleProfessionalSkills.find(
            (skill) => skill.slug === effectiveSelection.slug,
          ) ?? null)
        : null,
    [effectiveSelection, visibleProfessionalSkills],
  );

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <KnowledgeSearch
          value={query}
          onChange={setQuery}
          placeholder={labels.searchPlaceholder}
          label={labels.searchLabel}
        />
        <ProfessionalSkillCategory
          sections={sections}
          activeSection={activeSection}
          onSectionChange={(section) => {
            setActiveSection(section);
            if (section === "professional") {
              setActiveCategory("all");
            }
          }}
          filterAria={labels.sectionFilterAria}
        />
        {(activeSection === "all" || activeSection === "technical") && (
          <KnowledgeCategoryFilter
            categories={categories}
            allLabel={labels.allCategories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            filterAria={labels.filterAria}
          />
        )}
      </div>

      {!hasResults ? (
        <p className="rounded-xl border border-dashed bg-muted/30 px-6 py-12 text-center text-sm text-muted-foreground">
          {labels.noResults}
        </p>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
          <div
            className="grid gap-3 sm:grid-cols-2 lg:max-h-[70vh] lg:grid-cols-1 lg:overflow-y-auto lg:pr-2"
            role="list"
          >
            {visibleTechnicalItems.map((item) => (
              <div key={`technical-${item.slug}`} role="listitem">
                <KnowledgeCard
                  item={item}
                  categoryLabel={categoryLabels[item.category]}
                  isSelected={
                    effectiveSelection?.type === "technical" &&
                    effectiveSelection.slug === item.slug
                  }
                  onSelect={(slug) => setSelected({ type: "technical", slug })}
                />
              </div>
            ))}
            {visibleProfessionalSkills.length > 0 && (
              <ProfessionalSkillGrid
                skills={visibleProfessionalSkills}
                categoryLabel={labels.professionalCategoryLabel}
                selectedSlug={
                  effectiveSelection?.type === "professional"
                    ? effectiveSelection.slug
                    : null
                }
                onSelect={(slug) => setSelected({ type: "professional", slug })}
                projectNames={projectNames}
                practicalApplicationLabel={labels.cardPracticalApplication}
                relatedProjectsLabel={labels.relatedProjects}
              />
            )}
          </div>

          <div className="lg:sticky lg:top-24">
            {selectedTechnicalItem && (
              <KnowledgeDetails
                item={selectedTechnicalItem}
                categoryLabel={categoryLabels[selectedTechnicalItem.category]}
                labels={{
                  whatIs: labels.whatIs,
                  howItWorks: labels.howItWorks,
                  practicalApplication: labels.practicalApplication,
                  relatedProjects: labels.relatedProjects,
                  viewProject: labels.viewProject,
                }}
                projectNames={projectNames}
              />
            )}
            {selectedProfessionalSkill && (
              <ProfessionalSkillDetails
                skill={selectedProfessionalSkill}
                categoryLabel={labels.professionalCategoryLabel}
                labels={{
                  meaning: labels.meaning,
                  practicalApplication: labels.practicalApplication,
                  examples: labels.examples,
                }}
                projectNames={projectNames}
                locale={locale}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
