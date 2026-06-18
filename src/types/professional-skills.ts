export type KnowledgeSectionId = "all" | "technical" | "professional";

export interface ProfessionalSkill {
  slug: string;
  title: string;
  description: string;
  meaning: string;
  practicalApplication: string;
  examples: string[];
}

export interface KnowledgeSection {
  id: KnowledgeSectionId;
  label: string;
}
