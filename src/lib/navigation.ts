export const HEADER_SCROLL_OFFSET = 80;

export function getHashFromHref(href: string): string | null {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) {
    return null;
  }

  return href.slice(hashIndex + 1) || null;
}

export function getPathFromHref(href: string): string {
  const hashIndex = href.indexOf("#");
  const path = hashIndex === -1 ? href : href.slice(0, hashIndex);
  return path || "/";
}

export function scrollToSection(
  id: string,
  behavior: ScrollBehavior = "smooth",
) {
  const element = document.getElementById(id);
  if (!element) {
    return;
  }

  const top =
    element.getBoundingClientRect().top + window.scrollY - HEADER_SCROLL_OFFSET;

  window.scrollTo({ top, behavior });
}
