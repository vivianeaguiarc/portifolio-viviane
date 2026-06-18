import { AboutSection } from "@/components/sections/about-section";
import { CertificationsSection } from "@/components/sections/certifications-section";
import { ContactSection } from "@/components/sections/contact-section";
import { EducationSection } from "@/components/sections/education-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SoftwareEngineeringSection } from "@/components/sections/software-engineering-section";
import { StackSection } from "@/components/sections/stack-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SoftwareEngineeringSection />
      <EducationSection />
      <CertificationsSection />
      <StackSection />
      <ContactSection />
    </>
  );
}
