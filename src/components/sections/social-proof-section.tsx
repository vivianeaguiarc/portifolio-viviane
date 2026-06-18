import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { TechBadgeGroup } from "@/components/shared/tech-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProjectBySlug } from "@/data/projects";
import { getSocialProofSlugs } from "@/data/social-proof";
import { Link, type Locale } from "@/i18n/routing";
import type { Project } from "@/types";

interface SocialProofSectionProps {
  locale: Locale;
}

export async function SocialProofSection({ locale }: SocialProofSectionProps) {
  const t = await getTranslations({ locale, namespace: "socialProof" });
  const tProjects = await getTranslations({ locale, namespace: "projects" });
  const projects = getSocialProofSlugs()
    .map((slug) => getProjectBySlug(slug, locale))
    .filter((project): project is Project => project !== undefined);

  return (
    <AnimatedSection id="destaques" className="border-t bg-muted/30 py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.slug} className="glass h-full">
              <CardHeader>
                <CardTitle className="text-xl">{project.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                <TechBadgeGroup
                  title={tProjects("technologies")}
                  items={project.technologies}
                />
                <TechBadgeGroup
                  title={t("concepts")}
                  items={project.concepts}
                  variant="outline"
                />
                <TechBadgeGroup
                  title={t("challenges")}
                  items={project.challenges}
                  variant="outline"
                />
                <Button asChild variant="secondary" className="mt-auto w-full">
                  <Link
                    href={{
                      pathname: "/projects/[slug]",
                      params: { slug: project.slug },
                    }}
                    aria-label={tProjects("viewDetailsAria", {
                      name: project.name,
                    })}
                  >
                    {tProjects("viewDetails")}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
