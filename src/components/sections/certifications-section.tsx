import { getTranslations } from "next-intl/server";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { getCertifications } from "@/data/certifications";
import type { Locale } from "@/i18n/routing";

interface CertificationsSectionProps {
  locale: Locale;
}

export async function CertificationsSection({
  locale,
}: CertificationsSectionProps) {
  const certifications = getCertifications(locale);

  if (certifications.length === 0) {
    return null;
  }

  const t = await getTranslations({ locale, namespace: "certifications" });

  return (
    <AnimatedSection id="certificacoes" className="bg-muted/30 py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />
      </div>
    </AnimatedSection>
  );
}
