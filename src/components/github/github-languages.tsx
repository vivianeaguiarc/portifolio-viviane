import { getTranslations } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GitHubLanguageStat } from "@/types/github";

interface GithubLanguagesProps {
  languages: GitHubLanguageStat[];
  locale: string;
}

export async function GithubLanguages({
  languages,
  locale,
}: GithubLanguagesProps) {
  const t = await getTranslations({ locale, namespace: "github" });

  return (
    <Card className="glass h-full">
      <CardHeader>
        <CardTitle className="text-lg">{t("languagesTitle")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {languages.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t("noLanguages")}</p>
        ) : (
          languages.map((language) => (
            <div key={language.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{language.name}</span>
                <span className="text-muted-foreground">
                  {language.percentage}%
                </span>
              </div>
              <div
                className="h-2 overflow-hidden rounded-full bg-muted"
                role="presentation"
              >
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.max(language.percentage, 2)}%`,
                    backgroundColor: language.color,
                  }}
                />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
