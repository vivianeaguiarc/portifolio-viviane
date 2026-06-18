import { AlertCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { GithubActivity } from "@/components/github/github-activity";
import { GithubLanguages } from "@/components/github/github-languages";
import { GithubRepositories } from "@/components/github/github-repositories";
import { GithubStats } from "@/components/github/github-stats";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import type { Locale } from "@/i18n/routing";
import { getGitHubDashboard } from "@/services/github.service";

interface GithubContentProps {
  locale: Locale;
}

export async function GithubContent({ locale }: GithubContentProps) {
  const t = await getTranslations({ locale, namespace: "github" });
  const dashboard = await getGitHubDashboard();

  return (
    <div className="section-container space-y-12 py-24 pt-28">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        align="left"
      />

      {dashboard.error || !dashboard.profile ? (
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="flex items-start gap-3 p-6">
            <AlertCircle
              className="mt-0.5 h-5 w-5 shrink-0 text-destructive"
              aria-hidden
            />
            <div>
              <p className="font-medium">{t("errorTitle")}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("errorDescription")}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <GithubStats profile={dashboard.profile} locale={locale} />

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <GithubRepositories
                repositories={dashboard.featuredRepos}
                locale={locale}
              />
            </div>
            <GithubLanguages
              languages={dashboard.languageStats}
              locale={locale}
            />
          </div>

          <GithubActivity
            activity={dashboard.recentActivity}
            recentlyUpdatedRepos={dashboard.recentlyUpdatedRepos}
            locale={locale}
          />

          <p className="text-center text-xs text-muted-foreground">
            {t("cacheNote")}
          </p>
        </>
      )}
    </div>
  );
}
