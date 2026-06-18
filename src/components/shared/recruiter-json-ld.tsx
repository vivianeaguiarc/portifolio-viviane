import { SITE_CONFIG, SOCIAL_LINKS } from "@/constants/site";
import {
  getRecruiterCertifications,
  getRecruiterEducation,
  RECRUITER_METADATA,
  RECRUITER_PROFILE,
} from "@/data/recruiter";

export function RecruiterJsonLd() {
  const education = getRecruiterEducation();
  const certifications = getRecruiterCertifications();
  const recruiterUrl = `${SITE_CONFIG.url}/recruiter`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: RECRUITER_PROFILE.fullName,
    jobTitle: RECRUITER_PROFILE.role,
    image: `${SITE_CONFIG.url}${SITE_CONFIG.profileImage}`,
    url: recruiterUrl,
    description: RECRUITER_METADATA.description,
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
