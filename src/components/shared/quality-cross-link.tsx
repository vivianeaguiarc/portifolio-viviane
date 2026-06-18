import { FlaskConical } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, type Locale } from "@/i18n/routing";

interface QualityCrossLinkProps {
  locale: Locale;
}

export async function QualityCrossLink({ locale }: QualityCrossLinkProps) {
  const t = await getTranslations({ locale, namespace: "qualityCrossLink" });

  return (
    <Card className="glass border-primary/20">
      <CardContent className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
            aria-hidden
          >
            <FlaskConical className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium">{t("title")}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("description")}
            </p>
          </div>
        </div>
        <Button asChild variant="outline" className="shrink-0">
          <Link href="/quality">{t("cta")}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
