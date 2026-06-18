import { Award } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCertifications } from "@/data/certifications";
import type { Locale } from "@/i18n/routing";

interface CertificationsSectionProps {
  locale: Locale;
}

export async function CertificationsSection({
  locale,
}: CertificationsSectionProps) {
  const t = await getTranslations({ locale, namespace: "certifications" });
  const certifications = getCertifications(locale);

  return (
    <AnimatedSection id="certificacoes" className="bg-muted/30 py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <Card
              key={cert.id}
              className="glass transition-shadow hover:shadow-md"
            >
              <CardHeader className="pb-3">
                <div className="mb-2 flex items-center justify-between">
                  <Award className="h-5 w-5 text-primary" aria-hidden />
                  <Badge variant="outline">{cert.year}</Badge>
                </div>
                <CardTitle className="text-base leading-snug">
                  {cert.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {cert.institution}
                </p>
                <Badge variant="secondary" className="mt-3">
                  {cert.category}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
