export type KnowledgeCategoryId =
  | "backend"
  | "database"
  | "architecture"
  | "frontend"
  | "devops"
  | "security";

export interface KnowledgeItem {
  slug: string;
  title: string;
  category: KnowledgeCategoryId;
  definition: string;
  howItWorks: string;
  practicalApplication: string;
  relatedProjects: string[];
}

export interface KnowledgeCategory {
  id: KnowledgeCategoryId;
  label: string;
}
