"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import {
  getHashFromHref,
  getPathFromHref,
  scrollToSection,
} from "@/lib/navigation";

type NavigationLinkProps = ComponentProps<typeof Link>;

export function NavigationLink({
  href,
  onClick,
  scroll,
  ...props
}: NavigationLinkProps) {
  const pathname = usePathname();
  const hrefString = href.toString();
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
      window.history.pushState(null, "", `/#${hash}`);
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      scroll={scroll ?? !hash}
      {...props}
    />
  );
}
