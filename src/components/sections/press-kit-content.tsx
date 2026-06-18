import {
  ArrowRight,
  Briefcase,
  FileDown,
  Github,
  Linkedin,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/section-heading";
import { TechBadgeGroup } from "@/components/shared/tech-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPressKitContent } from "@/data/media-kit";
import { getProjectBySlug } from "@/data/projects";
import { Link, type Locale } from "@/i18n/routing";
import type { Project } from "@/types";

interface PressKitContentProps {
  locale: Locale;
}

export async function PressKitContent({ locale }: PressKitContentProps) {
  const t = await getTranslations({ locale, namespace: "pressKit" });
  const tProjects = await getTranslations({ locale, namespace: "projects" });
  const content = getPressKitContent(locale);
  const featuredProjects = content.featuredSlugs
    .map((slug) => getProjectBySlug(slug, locale))
    .filter((project): project is Project => project !== undefined);

  const quickLinks = [
    {
      label: t("resume"),
      href: content.resume,
      icon: FileDown,
      type: "download" as const,
    },
    {
      label: "GitHub",
      href: content.links.github,
      icon: Github,
      type: "external" as const,
    },
    {
      label: "LinkedIn",
      href: content.links.linkedin,
      icon: Linkedin,
      type: "external" as const,
    },
    {
      label: t("recruiterPage"),
      href: "/recruiter" as const,
      icon: Briefcase,
      type: "internal" as const,
    },
  ];

  return (
    <div className="section-container space-y-12 py-24 pt-28">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        align="left"
      />

      <Card className="glass">
        <CardHeader>
          <CardTitle>{content.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            {content.mediumBio}
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          const className = "flex h-full items-center justify-center gap-2";

          if (link.type === "internal") {
            return (
              <Button
                key={link.label}
                asChild
                variant="outline"
                className="h-auto py-4"
              >
                <Link href={link.href} className={className}>
                  <Icon className="h-4 w-4" aria-hidden />
                  {link.label}
                </Link>
              </Button>
            );
          }

          return (
            <Button
              key={link.label}
              asChild
              variant="outline"
              className="h-auto py-4"
            >
              <a
                href={link.href}
                target={link.type === "external" ? "_blank" : undefined}
                rel={
                  link.type === "external" ? "noopener noreferrer" : undefined
                }
                className={className}
                {...(link.type === "download" ? { download: true } : {})}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {link.label}
              </a>
            </Button>
          );
        })}
      </div>

      <section aria-labelledby="press-kit-stack">
        <h2 id="press-kit-stack" className="mb-4 text-xl font-semibold">
          {t("stackTitle")}
        </h2>
        <TechBadgeGroup title="" items={content.stack} variant="secondary" />
      </section>

      <section aria-labelledby="press-kit-projects">
        <h2 id="press-kit-projects" className="mb-6 text-xl font-semibold">
          {t("featuredProjects")}
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <Card key={project.slug} className="glass">
              <CardHeader>
                <CardTitle className="text-lg">{project.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
                <TechBadgeGroup
                  title={tProjects("technologies")}
                  items={project.technologies}
                />
                <Button asChild variant="link" className="h-auto p-0">
                  <Link
                    href={{
                      pathname: "/projects/[slug]",
                      params: { slug: project.slug },
                    }}
                  >
                    {tProjects("viewDetails")}
                    <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
