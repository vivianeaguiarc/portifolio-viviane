"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { GithubIcon } from "@/components/shared/brand-icons";
import { Link as I18nLink } from "@/i18n/routing";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/constants/site";

const ROADMAP_ITEMS = [
  "aws",
  "kubernetes",
  "springBoot",
  "distributedArchitecture",
  "microservices",
] as const;

const UTILITY_LINKS = [
  { key: "changelog", href: "/changelog" as const },
  { key: "now", href: "/now" as const },
  { key: "mediaKit", href: "/media-kit" as const },
  { key: "pressKit", href: "/press-kit" as const },
  { key: "recruiter", href: "/recruiter" as const },
  { key: "github", href: "/github" as const },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-card/50">
      <div className="section-container space-y-10 py-12">
        <section aria-labelledby="footer-roadmap-heading">
          <h2
            id="footer-roadmap-heading"
            className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary"
          >
            {t("roadmapTitle")}
          </h2>
          <ul className="flex flex-wrap gap-2" role="list">
            {ROADMAP_ITEMS.map((item) => (
              <li
                key={item}
                className="rounded-full border bg-background/50 px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {t(`roadmap.${item}`)}
              </li>
            ))}
          </ul>
        </section>

        <nav aria-label={t("utilityNav")}>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm" role="list">
            {UTILITY_LINKS.map((link) => (
              <li key={link.key}>
                <I18nLink
                  href={link.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t(`links.${link.key}`)}
                </I18nLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
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
      </div>
    </footer>
  );
}
