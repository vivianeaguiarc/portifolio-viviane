import { getTranslations } from "next-intl/server";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/constants/site";
import {
  getRecruiterCertifications,
  getRecruiterEducation,
  getRecruiterProfile,
} from "@/data/recruiter";
import { getPathname, type Locale } from "@/i18n/routing";

interface RecruiterJsonLdProps {
  locale: Locale;
}

export async function RecruiterJsonLd({ locale }: RecruiterJsonLdProps) {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const recruiterProfile = getRecruiterProfile(locale);
  const education = getRecruiterEducation(locale);
  const certifications = getRecruiterCertifications(locale);
  const recruiterPath = getPathname({ locale, href: "/recruiter" });
  const recruiterUrl = `${SITE_CONFIG.url}${recruiterPath}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: recruiterProfile.fullName,
    jobTitle: recruiterProfile.role,
    image: `${SITE_CONFIG.url}${SITE_CONFIG.profileImage}`,
    url: recruiterUrl,
    description: t("recruiterDescription"),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Juiz de Fora",
      addressRegion: "MG",
      addressCountry: "BR",
    },
    sameAs: [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.github, SITE_CONFIG.url],
    alumniOf: education.map((item) => ({
      "@type": "EducationalOrganization",
      name: item.institution,
      description: item.degree,
    })),
    hasCredential: certifications.map((cert) => ({
      "@type": "EducationalOccupationalCredential",
      name: cert.name,
      credentialCategory: cert.category,
      recognizedBy: {
        "@type": "Organization",
        name: cert.institution,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
