"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/shared/brand-icons";
import { NavigationLink } from "@/components/shared/navigation-link";
import { Link as I18nLink } from "@/i18n/routing";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/constants/site";
import type { Locale } from "@/i18n/routing";
import { getResumeUrl } from "@/lib/resume";

const STUDYING_ITEMS = [
  "aws",
  "kubernetes",
  "springBoot",
  "distributedArchitecture",
  "microservices",
] as const;

const FOOTER_LINKS = [
  { key: "projects", href: "/#projetos" as const },
] as const;

const SOCIAL_LINKS_FOOTER = [
  {
    key: "github",
    href: SOCIAL_LINKS.github,
    icon: GithubIcon,
    external: true,
  },
  {
    key: "linkedin",
    href: SOCIAL_LINKS.linkedin,
    icon: LinkedinIcon,
    external: true,
  },
  {
    key: "instagram",
    href: SOCIAL_LINKS.instagram,
    icon: InstagramIcon,
    external: true,
  },
  {
    key: "email",
    href: `mailto:${SOCIAL_LINKS.email}`,
    icon: null,
    external: false,
  },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale() as Locale;
  const year = new Date().getFullYear();
  const resumeUrl = getResumeUrl(locale);

  return (
    <footer className="border-t bg-card/50">
      <div className="section-container space-y-10 py-12">
        <section aria-labelledby="footer-studying-heading">
          <h2
            id="footer-studying-heading"
            className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary"
          >
            {t("studyingTitle")}
          </h2>
          <ul className="flex flex-wrap gap-2" role="list">
            {STUDYING_ITEMS.map((item) => (
              <li
                key={item}
                className="rounded-full border bg-background/50 px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {t(`studying.${item}`)}
              </li>
            ))}
          </ul>
        </section>

        <nav aria-label={t("mainNav")}>
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm" role="list">
            {SOCIAL_LINKS_FOOTER.map((link) => (
              <li key={link.key}>
                <Link
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.icon && <link.icon className="h-4 w-4" aria-hidden />}
                  {t(`social.${link.key}`)}
                </Link>
              </li>
            ))}
            {FOOTER_LINKS.map((link) => (
              <li key={link.key}>
                <NavigationLink
                  href={link.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t(`links.${link.key}`)}
                </NavigationLink>
              </li>
            ))}
            <li>
              <I18nLink
                href="/blog"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {t("links.blog")}
              </I18nLink>
            </li>
            <li>
              <I18nLink
                href="/technical-knowledge"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {t("links.knowledge")}
              </I18nLink>
            </li>
            <li>
              <Link
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {t("links.resume")}
              </Link>
            </li>
          </ul>
        </nav>

        <p className="border-t pt-8 text-center text-sm text-muted-foreground sm:text-left">
          © {year} {SITE_CONFIG.fullName}. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
