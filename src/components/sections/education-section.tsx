import { GraduationCap } from "lucide-react";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { EDUCATION } from "@/data/education";

export function EducationSection() {
  return (
    <AnimatedSection id="formacao" className="py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow="Formação Acadêmica"
          title="Trajetória educacional"
          description="Formação contínua em engenharia de software e arquitetura de sistemas."
        />

        <div className="relative mx-auto max-w-3xl">
          <div
            className="absolute left-4 top-0 h-full w-px bg-border sm:left-1/2 sm:-translate-x-px"
            aria-hidden
          />

          <ol className="space-y-12">
            {EDUCATION.map((item, index) => (
              <li
                key={item.id}
                className={`relative flex flex-col gap-4 sm:flex-row ${
                  index % 2 === 0 ? "sm:flex-row-reverse" : ""
                }`}
              >
                <div className="hidden flex-1 sm:block" />

                <div className="absolute left-4 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary bg-background sm:left-1/2">
                  <GraduationCap className="h-4 w-4 text-primary" aria-hidden />
                </div>

                <article className="glass ml-12 flex-1 rounded-xl p-6 sm:ml-0">
                  <time className="text-sm font-medium text-primary">
                    {item.period}
                  </time>
                  <h3 className="mt-1 text-lg font-semibold">{item.degree}</h3>
                  <p className="text-sm font-medium text-muted-foreground">
                    {item.institution}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </AnimatedSection>
  );
}
