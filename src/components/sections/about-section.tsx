import { getTranslations } from "next-intl/server";
import { AnimatedSection } from "@/components/shared/animated-section";
import { ProfilePhoto } from "@/components/shared/profile-photo";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProfile } from "@/data/profile";
import type { Locale } from "@/i18n/routing";

interface AboutSectionProps {
  locale: Locale;
}

export async function AboutSection({ locale }: AboutSectionProps) {
  const t = await getTranslations({ locale, namespace: "about" });
  const profile = getProfile(locale);

  return (
    <AnimatedSection id="sobre" className="py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <ProfilePhoto
            className="mx-auto aspect-square w-full max-w-[280px] lg:mx-0"
            sizes="280px"
          />

          <div className="grid gap-8 lg:col-span-1 lg:grid-cols-2">
            <Card className="glass lg:col-span-2">
              <CardHeader>
                <CardTitle>{t("summaryTitle")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground">
                  {profile.summary}
                </p>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle>{t("specialtiesTitle")}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-wrap gap-2" role="list">
                  {profile.specialties.map((specialty) => (
                    <li key={specialty}>
                      <Badge variant="secondary">{specialty}</Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle>{t("technologiesTitle")}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-wrap gap-2" role="list">
                  {profile.technologies.map((tech) => (
                    <li key={tech}>
                      <Badge variant="outline">{tech}</Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
