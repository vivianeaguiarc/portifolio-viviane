export type ProjectStatus = "production" | "development" | "archived";

export interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  technologies: string[];
  concepts: string[];
  githubUrl: string;
  deployUrl: string;
  status: ProjectStatus;
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
