import { ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSecurityPractices } from "@/data/security";
import type { Locale } from "@/i18n/routing";

interface SecurityContentProps {
  locale: Locale;
}

export async function SecurityContent({ locale }: SecurityContentProps) {
  const t = await getTranslations({ locale, namespace: "security" });
  const practices = getSecurityPractices(locale);

  return (
    <div className="section-container space-y-12 py-24 pt-28">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        align="left"
      />

      <div className="grid gap-4 md:grid-cols-2">
        {practices.map((practice) => (
          <Card key={practice.id} className="glass h-full">
            <CardHeader className="flex flex-row items-start gap-3">
              <ShieldCheck
                className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                aria-hidden
              />
              <CardTitle className="text-lg">{practice.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {practice.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
