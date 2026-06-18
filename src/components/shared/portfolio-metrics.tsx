import { BookOpen, Briefcase, Calendar, Medal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PORTFOLIO_METRICS } from "@/data/recruiter";

const METRIC_ITEMS = [
  {
    key: "projectsPublished",
    label: "Projetos publicados",
    icon: Briefcase,
    value: PORTFOLIO_METRICS.projectsPublished,
  },
  {
    key: "technicalArticles",
    label: "Artigos técnicos",
    icon: BookOpen,
    value: PORTFOLIO_METRICS.technicalArticles,
  },
  {
    key: "certifications",
    label: "Certificações",
    icon: Medal,
    value: PORTFOLIO_METRICS.certifications,
  },
  {
    key: "yearsInTech",
    label: "Anos estudando tecnologia",
    icon: Calendar,
    value: PORTFOLIO_METRICS.yearsInTech,
  },
] as const;

export function PortfolioMetrics() {
  return (
    <section aria-labelledby="portfolio-metrics-heading">
      <h2 id="portfolio-metrics-heading" className="sr-only">
        Métricas do portfólio
      </h2>
      <ul
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        role="list"
        aria-label="Indicadores do portfólio"
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
                    {metric.value}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {metric.label}
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
