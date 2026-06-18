import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getChangelogEntries } from "@/data/changelog";
import type { Locale } from "@/i18n/routing";

interface ChangelogContentProps {
  locale: Locale;
}

export async function ChangelogContent({ locale }: ChangelogContentProps) {
  const t = await getTranslations({ locale, namespace: "changelog" });
  const entries = getChangelogEntries(locale);

  return (
    <div className="section-container space-y-12 py-24 pt-28">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        align="left"
      />

      <ol
        className="relative space-y-8 border-l border-border pl-8"
        role="list"
      >
        {entries.map((entry, index) => (
          <li key={entry.version} className="relative">
            <span
              className="absolute -left-[2.125rem] flex h-7 w-7 items-center justify-center rounded-full border bg-background text-xs font-bold text-primary"
              aria-hidden
            >
              {entries.length - index}
            </span>
            <Card className="glass">
              <CardHeader className="pb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">v{entry.version}</Badge>
                  <CardTitle className="text-lg">{entry.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2" role="list">
                  {entry.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-sm text-muted-foreground"
                    >
                      <span className="text-primary" aria-hidden>
                        •
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </li>
        ))}
      </ol>
    </div>
  );
}
