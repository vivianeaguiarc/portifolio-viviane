"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { NavigationLink } from "@/components/shared/navigation-link";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/constants/site";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { key: "home", href: "/#hero" },
  { key: "projects", href: "/#projetos" },
  { key: "engineering", href: "/#engenharia" },
  { key: "education", href: "/#formacao" },
  { key: "stack", href: "/#stack" },
  { key: "blog", href: "/blog" },
  { key: "github", href: "/github" },
  { key: "quality", href: "/quality" },
  { key: "contact", href: "/#contato" },
] as const;

export function Header() {
  const t = useTranslations("header");
  const tNav = useTranslations("nav");
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled ? "glass shadow-sm" : "bg-transparent",
      )}
    >
      <div className="section-container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight"
          aria-label={t("homeAria", { name: SITE_CONFIG.fullName })}
        >
          <span className="text-gradient">{SITE_CONFIG.name}</span>
          <span className="text-muted-foreground">.</span>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label={t("mainNav")}
        >
          {NAV_ITEMS.map((item) => (
            <NavigationLink
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {tNav(item.key)}
            </NavigationLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher className="hidden sm:flex" />
          <ThemeToggle />
          <Button
            asChild
            size="sm"
            variant="outline"
            className="hidden md:inline-flex"
          >
            <Link href="/recruiter" aria-label={t("recruiterAria")}>
              {t("recruiterMode")}
            </Link>
          </Button>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <NavigationLink href="/#contato">{tNav("contact")}</NavigationLink>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? t("closeMenu") : t("openMenu")}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <nav
          id="mobile-menu"
          className="glass border-t md:hidden"
          aria-label={t("mobileNav")}
        >
          <div className="section-container flex flex-col gap-1 py-4">
            {NAV_ITEMS.map((item) => (
              <NavigationLink
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {tNav(item.key)}
              </NavigationLink>
            ))}
            <Link
              href="/recruiter"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-medium text-primary transition-colors hover:bg-accent"
            >
              {t("recruiterMode")}
            </Link>
            <LanguageSwitcher className="px-3 pt-2 sm:hidden" />
          </div>
        </nav>
      )}
    </header>
  );
}
