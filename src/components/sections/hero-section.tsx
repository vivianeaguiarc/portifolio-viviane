"use client";

import { motion } from "framer-motion";
import { ArrowDown, FileDown } from "lucide-react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/shared/brand-icons";
import { NavigationLink } from "@/components/shared/navigation-link";
import { ProfilePhoto } from "@/components/shared/profile-photo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SOCIAL_LINKS } from "@/constants/site";
import { getProfile } from "@/data/profile";
import type { Locale } from "@/i18n/routing";

export function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale() as Locale;
  const profile = useMemo(() => getProfile(locale), [locale]);

  const socialLinks = [
    {
      label: t("linkedin"),
      href: SOCIAL_LINKS.linkedin,
      icon: LinkedinIcon,
      variant: "default" as const,
    },
    {
      label: t("github"),
      href: SOCIAL_LINKS.github,
      icon: GithubIcon,
      variant: "outline" as const,
    },
    {
      label: t("resume"),
      href: SOCIAL_LINKS.resume,
      icon: FileDown,
      variant: "outline" as const,
    },
    {
      label: t("instagram"),
      href: SOCIAL_LINKS.instagram,
      icon: InstagramIcon,
      variant: "outline" as const,
    },
  ];

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 top-1/2 h-[300px] w-[300px] rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="section-container py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-16 xl:grid-cols-[minmax(0,420px)_1fr]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mx-auto w-full max-w-sm lg:max-w-none"
          >
            <ProfilePhoto
              priority
              className="aspect-[4/5] w-full"
              sizes="(max-width: 1024px) 320px, 420px"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-center lg:text-left"
          >
            <Badge variant="secondary" className="mb-6">
              {t("badge")}
            </Badge>

            <h1
              id="hero-heading"
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              {t("greeting")}{" "}
              <span className="text-gradient">{profile.fullName}</span>
            </h1>

            <p className="mt-4 text-xl font-medium text-muted-foreground sm:text-2xl">
              {profile.role}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              {profile.mainStack.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground lg:mx-0 mx-auto">
              {t("intro")}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              {socialLinks.map(({ label, href, icon: Icon, variant }) => (
                <Button key={label} variant={variant} asChild>
                  <Link
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                </Button>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 flex justify-center"
        >
          <NavigationLink
            href="/#sobre"
            className="flex flex-col items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            aria-label={t("exploreAria")}
          >
            <span>{t("explore")}</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </NavigationLink>
        </motion.div>
      </div>
    </section>
  );
}
