import { ExternalLink, Star } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GitHubRepository } from "@/types/github";

interface GithubRepositoriesProps {
  repositories: GitHubRepository[];
  locale: string;
}

function formatDate(date: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export async function GithubRepositories({
  repositories,
  locale,
}: GithubRepositoriesProps) {
  const t = await getTranslations({ locale, namespace: "github" });

  return (
    <section aria-labelledby="github-featured-repos">
      <h2 id="github-featured-repos" className="mb-6 text-xl font-semibold">
        {t("featuredRepos")}
      </h2>
      {repositories.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t("noRepos")}</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {repositories.map((repo) => (
            <Card key={repo.id} className="glass h-full">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-base">
                    <a
                      href={repo.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 hover:text-primary"
                    >
                      {repo.name}
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  </CardTitle>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-3.5 w-3.5" aria-hidden />
                    {repo.stars}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {repo.description ?? t("noDescription")}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {repo.language ? (
                    <Badge variant="secondary">{repo.language}</Badge>
                  ) : null}
                  <span className="text-xs text-muted-foreground">
                    {t("lastUpdated")}: {formatDate(repo.pushedAt, locale)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
