import { AboutSection } from "@/components/sections/about-section";
import { CertificationsSection } from "@/components/sections/certifications-section";
import { BlogPreviewSection } from "@/components/sections/blog-preview-section";
import { ContactSection } from "@/components/sections/contact-section";
import { EducationSection } from "@/components/sections/education-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SocialProofSection } from "@/components/sections/social-proof-section";
import { SoftwareEngineeringSection } from "@/components/sections/software-engineering-section";
import { StackSection } from "@/components/sections/stack-section";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (!routing.locales.includes(locale as Locale)) {
    return null;
  }

  return (
    <>
      <HeroSection />
      <AboutSection locale={locale as Locale} />
      <ProjectsSection locale={locale as Locale} />
      <SocialProofSection locale={locale as Locale} />
      <SoftwareEngineeringSection locale={locale as Locale} />
      <EducationSection locale={locale as Locale} />
      <CertificationsSection locale={locale as Locale} />
      <StackSection locale={locale as Locale} />
      <BlogPreviewSection locale={locale as Locale} />
      <ContactSection />
    </>
  );
}
