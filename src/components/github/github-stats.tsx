import Image from "next/image";
import { ExternalLink, GitFork, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Card, CardContent } from "@/components/ui/card";
import type { GitHubProfile } from "@/types/github";

interface GithubStatsProps {
  profile: GitHubProfile;
  locale: string;
}

export async function GithubStats({ profile, locale }: GithubStatsProps) {
  const t = await getTranslations({ locale, namespace: "github" });

  const stats = [
    { label: t("followers"), value: profile.followers, icon: Users },
    { label: t("following"), value: profile.following, icon: Users },
    { label: t("publicRepos"), value: profile.publicRepos, icon: GitFork },
  ];

  return (
    <Card className="glass overflow-hidden">
      <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
        <Image
          src={profile.avatarUrl}
          alt={t("avatarAlt", { name: profile.name ?? profile.login })}
          width={120}
          height={120}
          className="h-28 w-28 shrink-0 rounded-full border-2 border-primary/20"
          priority
        />
        <div className="min-w-0 flex-1 space-y-4">
          <div>
            <h2 className="text-2xl font-bold">
              {profile.name ?? profile.login}
            </h2>
            <p className="text-sm text-muted-foreground">@{profile.login}</p>
            {profile.bio ? (
              <p className="mt-2 text-muted-foreground leading-relaxed">
                {profile.bio}
              </p>
            ) : null}
          </div>
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="rounded-lg border bg-background/60 p-3 text-center"
                >
                  <Icon
                    className="mx-auto mb-1 h-4 w-4 text-primary"
                    aria-hidden
                  />
                  <p className="text-lg font-semibold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </div>
          <a
            href={profile.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            {t("viewProfile")}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
