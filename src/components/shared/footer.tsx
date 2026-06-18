"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { GithubIcon } from "@/components/shared/brand-icons";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/constants/site";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-card/50">
      <div className="section-container flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {year} {SITE_CONFIG.fullName}. {t("rights")}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            {t("madeWith")}{" "}
            <Heart className="h-4 w-4 text-primary" aria-hidden /> {t("and")}{" "}
            Next.js
          </span>
          <Link
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
            aria-label={t("githubAria")}
          >
            <GithubIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
