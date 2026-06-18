import { ArrowDown } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getArchitectureDecisions,
  getArchitectureFlow,
} from "@/data/architecture";
import type { Locale } from "@/i18n/routing";

interface ArchitectureContentProps {
  locale: Locale;
}

export async function ArchitectureContent({
  locale,
}: ArchitectureContentProps) {
  const t = await getTranslations({ locale, namespace: "architecture" });
  const flow = getArchitectureFlow();
  const decisions = getArchitectureDecisions(locale);

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
          <CardTitle>{t("flowTitle")}</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="flex flex-col items-center gap-2" role="list">
            {flow.map((node, index) => (
              <li key={node} className="flex flex-col items-center gap-2">
                <span className="rounded-lg border bg-background/80 px-6 py-3 text-sm font-semibold">
                  {node}
                </span>
                {index < flow.length - 1 ? (
                  <ArrowDown
                    className="h-4 w-4 text-muted-foreground"
                    aria-hidden
                  />
                ) : null}
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <section aria-labelledby="architecture-decisions-heading">
        <h2
          id="architecture-decisions-heading"
          className="mb-6 text-xl font-semibold"
        >
          {t("decisionsTitle")}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {decisions.map((decision) => (
            <Card key={decision.id} className="glass h-full">
              <CardHeader>
                <CardTitle className="text-lg">{decision.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {decision.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
