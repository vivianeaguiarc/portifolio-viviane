import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TECH_STACK } from "@/data/stack";

export function StackSection() {
  return (
    <AnimatedSection id="stack" className="py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow="Stack Tecnológica"
          title="Ferramentas que domino"
          description="Tecnologias que utilizo no dia a dia para construir soluções robustas."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TECH_STACK.map((category) => (
            <Card key={category.id} className="glass">
              <CardHeader>
                <CardTitle className="text-lg">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-wrap gap-2" role="list">
                  {category.items.map((item) => (
                    <li key={item.name}>
                      <Badge variant="outline">{item.name}</Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
