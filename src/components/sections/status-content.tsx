import { CheckCircle2, AlertCircle, MinusCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/i18n/routing";
import { getSystemStatus, type ServiceStatus } from "@/services/status.service";
import { cn } from "@/lib/utils";

interface StatusContentProps {
  locale: Locale;
}

function StatusIcon({ status }: { status: ServiceStatus }) {
  if (status === "operational") {
    return <CheckCircle2 className="h-5 w-5 text-emerald-500" aria-hidden />;
  }

  if (status === "degraded") {
    return <AlertCircle className="h-5 w-5 text-amber-500" aria-hidden />;
  }

  return <MinusCircle className="h-5 w-5 text-muted-foreground" aria-hidden />;
}

export async function StatusContent({ locale }: StatusContentProps) {
  const t = await getTranslations({ locale, namespace: "status" });
  const system = await getSystemStatus(locale);

  return (
    <div className="section-container space-y-10 py-24 pt-28">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        align="left"
      />

      <Card className="glass border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <CardTitle>{t("overallTitle")}</CardTitle>
          <Badge
            variant={system.overall === "operational" ? "default" : "secondary"}
            className={cn(
              system.overall === "operational" &&
                "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
            )}
          >
            {t(`states.${system.overall}`)}
          </Badge>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              {t("environment")}
            </p>
            <p className="mt-1 font-medium capitalize">{system.environment}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              {t("version")}
            </p>
            <p className="mt-1 font-medium">v{system.version}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              {t("lastDeploy")}
            </p>
            <p className="mt-1 font-mono text-sm">
              {system.lastDeploy
                ? system.lastDeploy.slice(0, 7)
                : t("notAvailable")}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              {t("healthEndpoint")}
            </p>
            <p className="mt-1 font-mono text-sm">/api/health</p>
          </div>
        </CardContent>
      </Card>

      <section aria-labelledby="status-services-heading">
        <h2 id="status-services-heading" className="mb-6 text-xl font-semibold">
          {t("servicesTitle")}
        </h2>
        <ul className="space-y-3" role="list">
          {system.checks.map((check) => (
            <li key={check.id}>
              <Card className="glass">
                <CardContent className="flex items-center justify-between gap-4 p-4">
                  <div className="flex items-center gap-3">
                    <StatusIcon status={check.status} />
                    <div>
                      <p className="font-medium">{t(`checks.${check.id}`)}</p>
                      {check.detail ? (
                        <p className="text-sm text-muted-foreground">
                          {check.detail}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <Badge variant="outline">{t(`states.${check.status}`)}</Badge>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
