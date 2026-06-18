import type { Locale } from "@/i18n/routing";
import { pickLocalized, type Localized } from "@/lib/localized";
import type { Certification } from "@/types";

const CERTIFICATIONS_SOURCE = [
  {
    id: "aws-cloud-practitioner",
    name: {
      "pt-BR": "AWS Certified Cloud Practitioner",
      "en-US": "AWS Certified Cloud Practitioner",
    },
    institution: {
      "pt-BR": "Amazon Web Services",
      "en-US": "Amazon Web Services",
    },
    year: "2024",
    category: {
      "pt-BR": "Cloud",
      "en-US": "Cloud",
    },
  },
  {
    id: "scrum-fundamentals",
    name: {
      "pt-BR": "Scrum Fundamentals Certified",
      "en-US": "Scrum Fundamentals Certified",
    },
    institution: {
      "pt-BR": "SCRUMstudy",
      "en-US": "SCRUMstudy",
    },
    year: "2023",
    category: {
      "pt-BR": "Metodologias Ágeis",
      "en-US": "Agile Methodologies",
    },
  },
  {
    id: "typescript-advanced",
    name: {
      "pt-BR": "TypeScript Avançado",
      "en-US": "Advanced TypeScript",
    },
    institution: {
      "pt-BR": "Alura",
      "en-US": "Alura",
    },
    year: "2023",
    category: {
      "pt-BR": "Frontend",
      "en-US": "Frontend",
    },
  },
  {
    id: "nodejs-microservices",
    name: {
      "pt-BR": "Node.js e Microsserviços",
      "en-US": "Node.js and Microservices",
    },
    institution: {
      "pt-BR": "Rocketseat",
      "en-US": "Rocketseat",
    },
    year: "2022",
    category: {
      "pt-BR": "Backend",
      "en-US": "Backend",
    },
  },
  {
    id: "clean-code",
    name: {
      "pt-BR": "Clean Code e Boas Práticas",
      "en-US": "Clean Code and Best Practices",
    },
    institution: {
      "pt-BR": "Udemy",
      "en-US": "Udemy",
    },
    year: "2022",
    category: {
      "pt-BR": "Qualidade de Software",
      "en-US": "Software Quality",
    },
  },
  {
    id: "docker-kubernetes",
    name: {
      "pt-BR": "Docker e Kubernetes Essencial",
      "en-US": "Essential Docker and Kubernetes",
    },
    institution: {
      "pt-BR": "LinuxTips",
      "en-US": "LinuxTips",
    },
    year: "2024",
    category: {
      "pt-BR": "DevOps",
      "en-US": "DevOps",
    },
  },
] as const satisfies readonly {
  id: string;
  name: Localized<string>;
  institution: Localized<string>;
  year: string;
  category: Localized<string>;
}[];

export function getCertifications(locale: Locale): Certification[] {
  return CERTIFICATIONS_SOURCE.map((item) => ({
    id: item.id,
    name: pickLocalized(item.name, locale),
    institution: pickLocalized(item.institution, locale),
    year: item.year,
    category: pickLocalized(item.category, locale),
  }));
}
