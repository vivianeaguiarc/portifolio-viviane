import { getTranslations } from "next-intl/server";
import { QualityCrossLink } from "@/components/shared/quality-cross-link";
import { PrincipleCard } from "@/components/shared/principle-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getEngineeringApplications } from "@/data/engineering";
import {
  getPrincipleCategories,
  getSoftwarePrinciples,
} from "@/data/software-engineering";
import type { Locale } from "@/i18n/routing";

interface EngineeringContentProps {
  locale: Locale;
}

const FEATURED_PRINCIPLE_IDS = [
  "solid",
  "clean-architecture",
  "ddd",
  "hexagonal",
  "cicd",
  "testing",
  "owasp",
] as const;

export async function EngineeringContent({ locale }: EngineeringContentProps) {
  const t = await getTranslations({ locale, namespace: "engineeringPage" });
  const categories = getPrincipleCategories(locale);
  const principles = getSoftwarePrinciples(locale).filter((principle) =>
    (FEATURED_PRINCIPLE_IDS as readonly string[]).includes(principle.id),
  );
  const applications = getEngineeringApplications(locale);
  const applicationMap = Object.fromEntries(
    applications.map((item) => [item.id, item.application]),
  );

  return (
    <div className="section-container space-y-12 py-24 pt-28">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        align="left"
      />

      <section aria-labelledby="engineering-principles-heading">
        <h2
          id="engineering-principles-heading"
          className="mb-6 text-xl font-semibold"
        >
          {t("principlesTitle")}
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle) => (
            <PrincipleCard key={principle.id} principle={principle} />
          ))}
        </div>
      </section>

      <section aria-labelledby="engineering-applications-heading">
        <h2
          id="engineering-applications-heading"
          className="mb-6 text-xl font-semibold"
        >
          {t("applicationsTitle")}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {principles.map((principle) => (
            <Card key={principle.id} className="glass">
              <CardHeader>
                <CardTitle className="text-base">{principle.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {applicationMap[principle.id] ?? principle.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="engineering-categories-heading">
        <h2
          id="engineering-categories-heading"
          className="mb-4 text-xl font-semibold"
        >
          {t("categoriesTitle")}
        </h2>
        <ul className="flex flex-wrap gap-2" role="list">
          {categories.map((category) => (
            <li
              key={category.key}
              className="rounded-full border bg-muted/50 px-3 py-1 text-sm"
            >
              {category.label}
            </li>
          ))}
        </ul>
      </section>

      <QualityCrossLink locale={locale} />
    </div>
  );
}
