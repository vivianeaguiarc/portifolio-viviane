"use client";

import { useLocale } from "next-intl";
import type { ComponentProps } from "react";
import { Link, usePathname } from "@/i18n/routing";
import {
  getHashFromHref,
  getPathFromHref,
  scrollToSection,
} from "@/lib/navigation";

type HashHref = `/#${string}`;

type NavigationLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: ComponentProps<typeof Link>["href"] | HashHref;
};

function hrefToString(href: NavigationLinkProps["href"]): string {
  if (typeof href === "string") {
    return href;
  }

  return String(href);
}

export function NavigationLink({
  href,
  onClick,
  scroll,
  ...props
}: NavigationLinkProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const hrefString = hrefToString(href);
  const hash = getHashFromHref(hrefString);
  const targetPath = getPathFromHref(hrefString);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || !hash) {
      return;
    }

    const isSamePage =
      targetPath === pathname || (targetPath === "/" && pathname === "/");

    if (isSamePage) {
      event.preventDefault();
      scrollToSection(hash);
      const localizedPath =
        targetPath === "/" ? `/${locale}` : `/${locale}${targetPath}`;
      window.history.pushState(null, "", `${localizedPath}#${hash}`);
    }
  };

  return (
    <Link
      href={href as ComponentProps<typeof Link>["href"]}
      onClick={handleClick}
      scroll={scroll ?? !hash}
      {...props}
    />
  );
}
