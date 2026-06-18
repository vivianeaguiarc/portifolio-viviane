import {
  CheckCircle2,
  GitBranch,
  Layers,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { PipelineFlow } from "@/components/shared/pipeline-flow";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getAdoptedPatterns,
  getPipelineSteps,
  getQualityTools,
  getTestingStrategy,
} from "@/data/quality";
import { Link, type Locale } from "@/i18n/routing";

interface QualityContentProps {
  locale: Locale;
}

export async function QualityContent({ locale }: QualityContentProps) {
  const t = await getTranslations({ locale, namespace: "qualityPage" });
  const tools = getQualityTools(locale);
  const testingLevels = getTestingStrategy(locale);
  const pipelineSteps = getPipelineSteps(locale);
  const patterns = getAdoptedPatterns(locale);

  return (
    <div className="section-container space-y-12 py-24 pt-28">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        align="left"
      />

      <section aria-labelledby="quality-tools-heading">
        <h2
          id="quality-tools-heading"
          className="mb-2 flex items-center gap-2 text-xl font-semibold"
        >
          <Wrench className="h-5 w-5 text-primary" aria-hidden />
          {t("toolsTitle")}
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">{t("toolsHint")}</p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Card key={tool.id} className="glass h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{tool.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {tool.description}
                </p>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {t("purposeLabel")}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {tool.purpose}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="quality-testing-heading">
        <h2
          id="quality-testing-heading"
          className="mb-2 flex items-center gap-2 text-xl font-semibold"
        >
          <Layers className="h-5 w-5 text-primary" aria-hidden />
          {t("testingTitle")}
        </h2>
        <p className="mb-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {t("testingStrategy")}
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {testingLevels.map((level) => (
            <Card key={level.id} className="glass h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-base">{level.title}</CardTitle>
                  {level.id === "e2e" && (
                    <Badge variant="secondary">{t("plannedBadge")}</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {level.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="quality-pipeline-heading">
        <h2
          id="quality-pipeline-heading"
          className="mb-2 flex items-center gap-2 text-xl font-semibold"
        >
          <GitBranch className="h-5 w-5 text-primary" aria-hidden />
          {t("pipelineTitle")}
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          {t("pipelineHint")}
        </p>
        <Card className="glass">
          <CardContent className="py-8">
            <PipelineFlow steps={pipelineSteps} />
          </CardContent>
        </Card>
      </section>

      <section aria-labelledby="quality-patterns-heading">
        <h2
          id="quality-patterns-heading"
          className="mb-6 flex items-center gap-2 text-xl font-semibold"
        >
          <ShieldCheck className="h-5 w-5 text-primary" aria-hidden />
          {t("patternsTitle")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {patterns.map((pattern) => (
            <Card key={pattern.id} className="glass h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{pattern.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {pattern.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="quality-related-heading">
        <h2 id="quality-related-heading" className="sr-only">
          {t("relatedTitle")}
        </h2>
        <Card className="glass border-primary/20">
          <CardContent className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <CheckCircle2
                className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                aria-hidden
              />
              <div>
                <p className="font-medium">{t("readinessTitle")}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t("readinessDescription")}
                </p>
              </div>
            </div>
            <Button asChild variant="outline" className="shrink-0">
              <Link href="/production-readiness">{t("readinessCta")}</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
