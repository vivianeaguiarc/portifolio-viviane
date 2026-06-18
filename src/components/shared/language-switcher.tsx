"use client";

import { Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { locales, type Locale } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const localeLabels: Record<Locale, string> = {
  "pt-BR": "PT",
  "en-US": "EN",
};

export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("language");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (nextLocale: Locale) => {
    if (nextLocale === locale) {
      return;
    }
    router.replace(pathname as Parameters<typeof router.replace>[0], {
      locale: nextLocale,
    });
  };

  return (
    <div
      className={cn("flex items-center gap-1", className)}
      role="group"
      aria-label={t("label")}
    >
      <Globe
        className="hidden h-4 w-4 text-muted-foreground sm:block"
        aria-hidden
      />
      {locales.map((item) => (
        <Button
          key={item}
          type="button"
          variant={item === locale ? "secondary" : "ghost"}
          size="sm"
          className="h-8 px-2.5 text-xs font-semibold uppercase"
          onClick={() => switchLocale(item)}
          aria-label={t("switchAria", { language: t(item) })}
          aria-pressed={item === locale}
        >
          {localeLabels[item]}
        </Button>
      ))}
    </div>
  );
}
