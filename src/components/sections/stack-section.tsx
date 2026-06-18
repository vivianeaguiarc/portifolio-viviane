import { getTranslations } from "next-intl/server";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTechStack } from "@/data/stack";
import type { Locale } from "@/i18n/routing";

interface StackSectionProps {
  locale: Locale;
}

export async function StackSection({ locale }: StackSectionProps) {
  const t = await getTranslations({ locale, namespace: "stack" });
  const techStack = getTechStack(locale);

  return (
    <AnimatedSection id="stack" className="py-24">
      <div className="section-container">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {techStack.map((category) => (
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
