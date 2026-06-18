"use client";

import { BookOpen, Briefcase, Calendar, Medal } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getPortfolioMetrics } from "@/data/recruiter";
import type { Locale } from "@/i18n/routing";

const METRIC_ITEMS = [
  {
    key: "projectsPublished",
    translationKey: "projects",
    icon: Briefcase,
  },
  {
    key: "technicalArticles",
    translationKey: "articles",
    icon: BookOpen,
  },
  {
    key: "certifications",
    translationKey: "certifications",
    icon: Medal,
  },
  {
    key: "yearsInTech",
    translationKey: "years",
    icon: Calendar,
  },
] as const;

export function PortfolioMetrics() {
  const t = useTranslations("recruiter.metrics");
  const tRecruiter = useTranslations("recruiter");
  const locale = useLocale() as Locale;
  const metrics = useMemo(() => getPortfolioMetrics(locale), [locale]);

  return (
    <section aria-labelledby="portfolio-metrics-heading">
      <h2 id="portfolio-metrics-heading" className="sr-only">
        {tRecruiter("metricsSr")}
      </h2>
      <ul
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        role="list"
        aria-label={tRecruiter("metricsAria")}
      >
        {METRIC_ITEMS.map((metric) => (
          <li key={metric.key}>
            <Card className="glass h-full">
              <CardContent className="flex items-center gap-4 p-5">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
                  aria-hidden
                >
                  <metric.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold tabular-nums">
                    {metrics[metric.key]}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t(metric.translationKey)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
