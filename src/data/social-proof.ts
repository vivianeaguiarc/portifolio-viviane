export const SOCIAL_PROOF_PROJECT_SLUGS = [
  "stockflow",
  "ticket-sales",
  "portfolio-viviane",
] as const;

export function getSocialProofSlugs() {
  return [...SOCIAL_PROOF_PROJECT_SLUGS];
}
