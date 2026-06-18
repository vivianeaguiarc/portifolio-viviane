export const PROJECT_COVER_FALLBACK = "/projects/default-cover.svg";

export function getProjectCoverPath(slug: string): string {
  return `/projects/${slug}/cover.png`;
}
