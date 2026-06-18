"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { scrollToSection } from "@/lib/navigation";

export function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) {
      return;
    }

    const timer = window.setTimeout(() => {
      scrollToSection(hash);
    }, 150);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}
