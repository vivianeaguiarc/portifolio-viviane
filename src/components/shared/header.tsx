"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NavigationLink } from "@/components/shared/navigation-link";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS, SITE_CONFIG } from "@/constants/site";
import { cn } from "@/lib/utils";

export function Header() {
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
          aria-label={`${SITE_CONFIG.fullName} - Início`}
        >
          <span className="text-gradient">{SITE_CONFIG.name}</span>
          <span className="text-muted-foreground">.</span>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Principal"
        >
          {NAV_ITEMS.map((item) => (
            <NavigationLink
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {item.label}
            </NavigationLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            asChild
            size="sm"
            variant="outline"
            className="hidden md:inline-flex"
          >
            <Link href="/recruiter" aria-label="Abrir modo recrutador">
              Modo Recrutador
            </Link>
          </Button>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <NavigationLink href="/#contato">Contato</NavigationLink>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isOpen && (
        <nav
          id="mobile-menu"
          className="glass border-t md:hidden"
          aria-label="Menu mobile"
        >
          <div className="section-container flex flex-col gap-1 py-4">
            {NAV_ITEMS.map((item) => (
              <NavigationLink
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {item.label}
              </NavigationLink>
            ))}
            <Link
              href="/recruiter"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-medium text-primary transition-colors hover:bg-accent"
            >
              Modo Recrutador
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
