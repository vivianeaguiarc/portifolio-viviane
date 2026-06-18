import {
  ExternalLink,
  GitCommitHorizontal,
  GitPullRequest,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GitHubActivityItem, GitHubRepository } from "@/types/github";

interface GithubActivityProps {
  activity: GitHubActivityItem[];
  recentlyUpdatedRepos: GitHubRepository[];
  locale: string;
}

function formatRelativeDate(date: string, locale: string) {
  const formatter = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  const diffMs = new Date(date).getTime() - Date.now();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (Math.abs(diffDays) < 1) {
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    return formatter.format(diffHours, "hour");
  }

  return formatter.format(diffDays, "day");
}

export async function GithubActivity({
  activity,
  recentlyUpdatedRepos,
  locale,
}: GithubActivityProps) {
  const t = await getTranslations({ locale, namespace: "github" });

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-lg">{t("recentActivity")}</CardTitle>
        </CardHeader>
        <CardContent>
          {activity.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t("noActivity")}</p>
          ) : (
            <ul className="space-y-4" role="list">
              {activity.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <div className="mt-0.5 shrink-0 text-primary">
                    {item.type === "commit" ? (
                      <GitCommitHorizontal className="h-4 w-4" aria-hidden />
                    ) : (
                      <GitPullRequest className="h-4 w-4" aria-hidden />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="line-clamp-2 text-sm font-medium hover:text-primary"
                    >
                      {item.title}
                    </a>
                    <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span>{item.repository}</span>
                      <span aria-hidden>·</span>
                      <time dateTime={item.occurredAt}>
                        {formatRelativeDate(item.occurredAt, locale)}
                      </time>
                      <ExternalLink className="h-3 w-3" aria-hidden />
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-lg">{t("recentlyUpdated")}</CardTitle>
        </CardHeader>
        <CardContent>
          {recentlyUpdatedRepos.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t("noRepos")}</p>
          ) : (
            <ul className="space-y-3" role="list">
              {recentlyUpdatedRepos.map((repo) => (
                <li
                  key={repo.id}
                  className="flex items-center justify-between gap-3 rounded-lg border bg-background/50 px-3 py-2"
                >
                  <a
                    href={repo.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate text-sm font-medium hover:text-primary"
                  >
                    {repo.name}
                  </a>
                  <time
                    className="shrink-0 text-xs text-muted-foreground"
                    dateTime={repo.pushedAt}
                  >
                    {formatRelativeDate(repo.pushedAt, locale)}
                  </time>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
