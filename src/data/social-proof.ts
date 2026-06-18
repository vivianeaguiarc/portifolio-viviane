export const SOCIAL_PROOF_PROJECT_SLUGS = [
  "stockflow",
  "ticket-sales",
] as const;

export function getSocialProofSlugs() {
  return [...SOCIAL_PROOF_PROJECT_SLUGS];
}
