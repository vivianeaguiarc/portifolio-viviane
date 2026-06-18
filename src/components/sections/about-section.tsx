import { AnimatedSection } from "@/components/shared/animated-section";
import { ProfilePhoto } from "@/components/shared/profile-photo";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PROFILE } from "@/data/profile";

export function AboutSection() {
  return (
    <AnimatedSection id="sobre" className="py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow="Sobre Mim"
          title="Transformando ideias em software de qualidade"
          description="Desenvolvedora apaixonada por tecnologia, arquitetura limpa e entrega de valor."
        />

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <ProfilePhoto
            className="mx-auto aspect-square w-full max-w-[280px] lg:mx-0"
            sizes="280px"
          />

          <div className="grid gap-8 lg:col-span-1 lg:grid-cols-2">
            <Card className="glass lg:col-span-2">
              <CardHeader>
                <CardTitle>Resumo Profissional</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground">
                  {PROFILE.summary}
                </p>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle>Especialidades</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-wrap gap-2" role="list">
                  {PROFILE.specialties.map((specialty) => (
                    <li key={specialty}>
                      <Badge variant="secondary">{specialty}</Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle>Tecnologias</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-wrap gap-2" role="list">
                  {PROFILE.technologies.map((tech) => (
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
