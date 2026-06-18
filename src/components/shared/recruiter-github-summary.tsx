import { Github } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, type Locale } from "@/i18n/routing";
import { getGitHubDashboard } from "@/services/github.service";

interface RecruiterGithubSummaryProps {
  locale: Locale;
}

export async function RecruiterGithubSummary({
  locale,
}: RecruiterGithubSummaryProps) {
  const t = await getTranslations({ locale, namespace: "recruiter" });
  const dashboard = await getGitHubDashboard();

  if (dashboard.error || !dashboard.profile) {
    return null;
  }

  const { summary } = dashboard;

  return (
    <Card className="glass border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Github className="h-5 w-5 text-primary" aria-hidden />
          <CardTitle className="text-lg">{t("githubSummaryTitle")}</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          {t("githubSummaryHint")}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="grid gap-3 sm:grid-cols-3" role="list">
          <li className="rounded-lg border bg-background/60 p-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("githubPublicRepos")}
            </p>
            <p className="mt-1 text-xl font-semibold">{summary.publicRepos}</p>
          </li>
          <li className="rounded-lg border bg-background/60 p-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("githubTopLanguage")}
            </p>
            <p className="mt-1 text-xl font-semibold">{summary.topLanguage}</p>
          </li>
          <li className="rounded-lg border bg-background/60 p-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("githubMostRecent")}
            </p>
            <p className="mt-1 truncate text-xl font-semibold">
              {summary.mostRecentProject}
            </p>
          </li>
        </ul>
        <Link
          href="/github"
          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          {t("githubViewActivity")}
        </Link>
      </CardContent>
    </Card>
  );
}
