import { Clock, Layers, Link2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { NavigationLink } from "@/components/shared/navigation-link";
import { TechBadgeGroup } from "@/components/shared/tech-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SOCIAL_LINKS } from "@/constants/site";
import { getProfile } from "@/data/profile";
import { getPortfolioMetrics, getRecruiterEducation } from "@/data/recruiter";
import type { Locale } from "@/i18n/routing";
import { getResumeUrl } from "@/lib/resume";

interface RecruiterQuickSummaryProps {
  locale: Locale;
}

export async function RecruiterQuickSummary({
  locale,
}: RecruiterQuickSummaryProps) {
  const t = await getTranslations({ locale, namespace: "recruiter" });
  const profile = getProfile(locale);
  const metrics = getPortfolioMetrics(locale);
  const education = getRecruiterEducation(locale);

  const quickLinks = [
    { label: t("downloadCv"), href: getResumeUrl(locale), external: true },
    { label: "LinkedIn", href: SOCIAL_LINKS.linkedin, external: true },
    { label: "GitHub", href: SOCIAL_LINKS.github, external: true },
    { label: t("contactAria"), href: "/#contato", external: false },
  ];

  return (
    <Card className="glass border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle className="text-lg">{t("quickSummaryTitle")}</CardTitle>
          <Badge variant="secondary" className="gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {t("readingTime")}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{t("quickSummaryHint")}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("quickEducation")}
            </p>
            <ul className="mt-2 space-y-1" role="list">
              {education.map((item) => (
                <li key={item.id} className="text-sm">
                  {item.degree}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Layers className="h-3.5 w-3.5" aria-hidden />
              {t("quickStack")}
            </p>
            <TechBadgeGroup
              title=""
              items={[...profile.mainStack]}
              variant="secondary"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("quickNumbers")}
            </p>
            <ul className="mt-2 space-y-1 text-sm" role="list">
              <li>
                {metrics.projectsPublished} {t("metrics.projects")}
              </li>
              <li>
                {metrics.technicalArticles} {t("metrics.articles")}
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Link2 className="h-3.5 w-3.5" aria-hidden />
              {t("quickLinks")}
            </p>
            <ul className="space-y-1" role="list">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary underline-offset-4 hover:underline"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <NavigationLink
                      href="/#contato"
                      className="text-sm text-primary underline-offset-4 hover:underline"
                    >
                      {link.label}
                    </NavigationLink>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
