export interface ArchitectureShowcaseItem {
  slug: string;
  name: string;
  overview: string;
  objective: string;
  architectureTitle: string;
  architectureDescription: string;
  diagramNodes: string[];
  dataFlowNodes: string[];
  features: string[];
  technologies: string[];
  technicalDecisions: { title: string; description: string }[];
}
