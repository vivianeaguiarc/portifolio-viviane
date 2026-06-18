export type ProjectStatus = "Concluído" | "Em desenvolvimento" | "Planejado";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectArchitecture {
  title: string;
  description: string;
  flow: string[];
}

export interface ProjectTechnicalDecision {
  title: string;
  description: string;
}

export interface Project {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  status: ProjectStatus;
  image: string;
  githubUrl?: string;
  deployUrl?: string;
  technologies: string[];
  concepts: string[];
  metrics: ProjectMetric[];
  challenges: string[];
  highlights: string[];
  problem: string;
  businessRules: string[];
  architecture: ProjectArchitecture;
  technicalDecisions: ProjectTechnicalDecision[];
  learnings: string[];
  roadmap: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export interface Certification {
  id: string;
  name: string;
  institution: string;
  year: string;
  category: string;
}

export interface TechStackItem {
  name: string;
  icon?: string;
}

export interface TechStackCategory {
  id: string;
  title: string;
  items: TechStackItem[];
}

export interface SocialLink {
  name: string;
  href: string;
  icon: "linkedin" | "github" | "instagram" | "email" | "resume";
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
