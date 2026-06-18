export const FEATURED_GITHUB_REPOS = [
  "StockFlow-api",
  "ticket-sales",
  "portifolio-viviane",
  "finance-app",
] as const;

export const GITHUB_LANGUAGE_GROUPS = {
  TypeScript: ["TypeScript"],
  JavaScript: ["JavaScript"],
  Java: ["Java"],
  SQL: ["SQL", "PLpgSQL", "TSQL", "MySQL"],
  "HTML/CSS": ["HTML", "CSS", "SCSS", "Sass"],
} as const;

export const GITHUB_LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Java: "#b07219",
  SQL: "#e38c00",
  "HTML/CSS": "#e34c26",
};

export const GITHUB_REVALIDATE_SECONDS = 60 * 60 * 24;
