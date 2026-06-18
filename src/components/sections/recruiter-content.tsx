import {
  ArrowRight,
  Award,
  Briefcase,
  FileDown,
  GraduationCap,
  Mail,
  MapPin,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/shared/brand-icons";
import { NavigationLink } from "@/components/shared/navigation-link";
import { PortfolioMetrics } from "@/components/shared/portfolio-metrics";
import { ProfilePhoto } from "@/components/shared/profile-photo";
import { SectionHeading } from "@/components/shared/section-heading";
import { TechBadgeGroup } from "@/components/shared/tech-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SOCIAL_LINKS } from "@/constants/site";
import {
  getAvailability,
  getFeaturedProjects,
  getRecruiterCertifications,
  getRecruiterEducation,
  getRecruiterProfile,
  getRecruiterSkillCategories,
} from "@/data/recruiter";
import { Link, type Locale } from "@/i18n/routing";

interface RecruiterContentProps {
  locale: Locale;
}

export async function RecruiterContent({ locale }: RecruiterContentProps) {
  const t = await getTranslations({ locale, namespace: "recruiter" });
  const tProjects = await getTranslations({ locale, namespace: "projects" });
  const recruiterProfile = getRecruiterProfile(locale);
  const skillCategories = getRecruiterSkillCategories(locale);
  const availability = getAvailability(locale);
  const featuredProjects = getFeaturedProjects(locale);
  const education = getRecruiterEducation(locale);
  const certifications = getRecruiterCertifications(locale);

  const contactLinks = [
    {
      label: t("linkedinAria"),
      channel: "LinkedIn",
      href: SOCIAL_LINKS.linkedin,
      icon: LinkedinIcon,
    },
    {
      label: t("githubAria"),
      channel: "GitHub",
      href: SOCIAL_LINKS.github,
      icon: GithubIcon,
    },
    {
      label: t("openChannelAria", { channel: "Instagram" }),
      channel: "Instagram",
      href: SOCIAL_LINKS.instagram,
      icon: InstagramIcon,
    },
    {
      label: t("sendEmailAria"),
      channel: "Email",
      href: SOCIAL_LINKS.email,
      icon: Mail,
      display: "contato@viviane.dev",
    },
  ] as const;

  return (
    <div className="pt-16">
      <section
        className="relative overflow-hidden py-20"
        aria-labelledby="recruiter-hero-heading"
      >
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <div className="absolute left-1/4 top-1/4 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-[280px] w-[280px] rounded-full bg-purple-500/10 blur-3xl" />
        </div>

        <div className="section-container">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-16">
            <ProfilePhoto
              className="mx-auto aspect-[4/5] w-full max-w-[320px] lg:mx-0"
              priority
              sizes="(max-width: 1024px) 320px, 320px"
            />

            <div className="text-center lg:text-left">
              <Badge variant="secondary" className="mb-4">
                {t("badge")}
              </Badge>
              <h1
                id="recruiter-hero-heading"
                className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
              >
                {recruiterProfile.fullName}
              </h1>
              <p className="mt-2 text-xl text-primary">
                {recruiterProfile.role}
              </p>
              <p className="mt-4 flex items-center justify-center gap-2 text-muted-foreground lg:justify-start">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden />
                {recruiterProfile.location}
              </p>
              <p className="mt-6 max-w-2xl text-muted-foreground leading-relaxed">
                {recruiterProfile.summary}
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Button asChild>
                  <a
                    href={SOCIAL_LINKS.resume}
                    download
                    aria-label={t("downloadCvAria")}
                  >
                    <FileDown className="mr-2 h-4 w-4" aria-hidden />
                    {t("downloadCv")}
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("linkedinAria")}
                  >
                    <LinkedinIcon className="mr-2 h-4 w-4" aria-hidden />
                    LinkedIn
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a
                    href={SOCIAL_LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("githubAria")}
                  >
                    <GithubIcon className="mr-2 h-4 w-4" aria-hidden />
                    GitHub
                  </a>
                </Button>
                <Button asChild variant="secondary">
                  <NavigationLink
                    href="/#contato"
                    aria-label={t("contactAria")}
                  >
                    {t("contactEyebrow")}
                  </NavigationLink>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <PortfolioMetrics />
          </div>
        </div>
      </section>

      <section
        className="border-t bg-muted/30 py-20"
        aria-labelledby="skills-heading"
      >
        <div className="section-container">
          <SectionHeading
            eyebrow={t("skillsEyebrow")}
            title={t("skillsTitle")}
            description={t("skillsDescription")}
            id="skills-heading"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((category) => (
              <Card key={category.id} className="glass">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <TechBadgeGroup
                    title=""
                    items={[...category.skills]}
                    variant="secondary"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" aria-labelledby="projects-heading">
        <div className="section-container">
          <SectionHeading
            eyebrow={t("featuredEyebrow")}
            title={t("featuredTitle")}
            description={t("featuredDescription")}
            id="projects-heading"
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <Card
                key={project.slug}
                className="glass flex flex-col transition-shadow hover:shadow-md"
              >
                <CardHeader>
                  <div className="mb-2 flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" aria-hidden />
                    <Badge variant="outline">
                      {tProjects(`status.${project.status}`)}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                  <TechBadgeGroup
                    title={tProjects("technologies")}
                    items={project.technologies}
                  />
                  <TechBadgeGroup
                    title={t("concepts")}
                    items={project.concepts}
                    variant="outline"
                  />
                  <Button asChild variant="link" className="mt-auto h-auto p-0">
                    <Link
                      href={{
                        pathname: "/projects/[slug]",
                        params: { slug: project.slug },
                      }}
                      aria-label={t("caseStudyAria", { name: project.name })}
                    >
                      {t("caseStudy")}
                      <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        className="border-t bg-muted/30 py-20"
        aria-labelledby="education-heading"
      >
        <div className="section-container">
          <SectionHeading
            eyebrow={t("educationEyebrow")}
            title={t("educationTitle")}
            description={t("educationDescription")}
            id="education-heading"
          />

          <div className="grid gap-4 md:grid-cols-3">
            {education.map((item) => (
              <Card key={item.id} className="glass">
                <CardHeader>
                  <GraduationCap
                    className="mb-2 h-5 w-5 text-primary"
                    aria-hidden
                  />
                  <CardTitle className="text-base leading-snug">
                    {item.degree}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium">{item.institution}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.period}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" aria-labelledby="certifications-heading">
        <div className="section-container">
          <SectionHeading
            eyebrow={t("certEyebrow")}
            title={t("certTitle")}
            description={t("certDescription")}
            id="certifications-heading"
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((cert) => (
              <Card key={cert.id} className="glass">
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
      </section>

      <section
        className="border-t bg-muted/30 py-20"
        aria-labelledby="availability-heading"
      >
        <div className="section-container">
          <Card className="glass mx-auto max-w-2xl border-primary/20">
            <CardHeader className="text-center">
              <CardTitle
                id="availability-heading"
                className="text-2xl text-primary"
              >
                {availability.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul
                className="grid gap-3 sm:grid-cols-2"
                role="list"
                aria-label={t("availabilityAria")}
              >
                {availability.roles.map((role) => (
                  <li key={role}>
                    <div className="flex items-center gap-2 rounded-lg border bg-background/50 px-4 py-3 text-sm font-medium">
                      <span
                        className="h-2 w-2 shrink-0 rounded-full bg-green-500"
                        aria-hidden
                      />
                      {role}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20" aria-labelledby="contact-heading">
        <div className="section-container">
          <SectionHeading
            eyebrow={t("contactEyebrow")}
            title={t("contactTitle")}
            description={t("contactDescription")}
            id="contact-heading"
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactLinks.map((link) => (
              <a
                key={link.channel}
                href={link.href}
                target={link.channel === "Email" ? undefined : "_blank"}
                rel={
                  link.channel === "Email" ? undefined : "noopener noreferrer"
                }
                className="glass group flex items-center gap-4 rounded-xl border p-4 transition-colors hover:border-primary/50 hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label={link.label}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                  aria-hidden
                >
                  <link.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{link.channel}</p>
                  {"display" in link && (
                    <p className="text-sm text-muted-foreground">
                      {link.display}
                    </p>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
