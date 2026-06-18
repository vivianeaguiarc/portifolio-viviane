import { BookOpen, Briefcase, Target } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getNowPageContent } from "@/data/now";
import type { Locale } from "@/i18n/routing";

interface NowContentProps {
  locale: Locale;
}

export async function NowContent({ locale }: NowContentProps) {
  const t = await getTranslations({ locale, namespace: "now" });
  const content = getNowPageContent(locale);

  return (
    <div className="section-container space-y-12 py-24 pt-28">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        align="left"
      />

      <p className="text-sm text-muted-foreground">
        {t("updatedAt")}: <time>{content.updatedAt}</time>
      </p>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="glass">
          <CardHeader>
            <BookOpen className="mb-2 h-5 w-5 text-primary" aria-hidden />
            <CardTitle className="text-base">{t("studyingTitle")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-wrap gap-2" role="list">
              {content.studying.map((topic) => (
                <li key={topic}>
                  <Badge variant="secondary">{topic}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <Briefcase className="mb-2 h-5 w-5 text-primary" aria-hidden />
            <CardTitle className="text-base">{t("projectsTitle")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {content.currentProjects.map((project) => (
              <div key={project.name}>
                <p className="font-medium">{project.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {project.description}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <Target className="mb-2 h-5 w-5 text-primary" aria-hidden />
            <CardTitle className="text-base">{t("goalsTitle")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2" role="list">
              {content.goals.map((goal) => (
                <li
                  key={goal}
                  className="flex gap-2 text-sm text-muted-foreground"
                >
                  <span className="text-primary" aria-hidden>
                    •
                  </span>
                  {goal}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <p className="text-sm text-muted-foreground">
        {t("inspiredBy")}{" "}
        <a
          href="https://nownownow.com/about"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline-offset-4 hover:underline"
        >
          Now Page
        </a>
      </p>
    </div>
  );
}
