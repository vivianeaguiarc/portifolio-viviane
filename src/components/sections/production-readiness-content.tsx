import { CheckCircle2, FlaskConical } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProductionReadinessItems } from "@/data/production-readiness";
import { Link, type Locale } from "@/i18n/routing";

interface ProductionReadinessContentProps {
  locale: Locale;
}

export async function ProductionReadinessContent({
  locale,
}: ProductionReadinessContentProps) {
  const t = await getTranslations({
    locale,
    namespace: "productionReadinessPage",
  });
  const items = getProductionReadinessItems(locale);

  return (
    <div className="section-container space-y-12 py-24 pt-28">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        align="left"
      />

      <section aria-labelledby="readiness-checklist-heading">
        <h2 id="readiness-checklist-heading" className="sr-only">
          {t("checklistTitle")}
        </h2>
        <ul className="grid gap-4 md:grid-cols-2" role="list">
          {items.map((item) => (
            <li key={item.id}>
              <Card className="glass h-full">
                <CardContent className="flex items-start gap-3 py-6">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500"
                    aria-hidden
                  />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="readiness-quality-heading">
        <h2 id="readiness-quality-heading" className="sr-only">
          {t("qualityLinkTitle")}
        </h2>
        <Card className="glass border-primary/20">
          <CardContent className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
                aria-hidden
              >
                <FlaskConical className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">{t("qualityTitle")}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t("qualityDescription")}
                </p>
              </div>
            </div>
            <Button asChild variant="outline" className="shrink-0">
              <Link href="/quality">{t("qualityCta")}</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
