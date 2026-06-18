import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMediaKitContent } from "@/data/media-kit";
import type { Locale } from "@/i18n/routing";

interface MediaKitContentProps {
  locale: Locale;
}

export async function MediaKitContent({ locale }: MediaKitContentProps) {
  const t = await getTranslations({ locale, namespace: "mediaKit" });
  const content = getMediaKitContent(locale);

  const bios = [
    { key: "short", label: t("shortBio"), text: content.shortBio },
    { key: "medium", label: t("mediumBio"), text: content.mediumBio },
    { key: "long", label: t("longBio"), text: content.longBio },
  ] as const;

  const links = [
    { label: "Website", href: content.links.website },
    { label: "LinkedIn", href: content.links.linkedin },
    { label: "GitHub", href: content.links.github },
    { label: "Instagram", href: content.links.instagram },
    { label: "Email", href: content.links.email },
  ];

  return (
    <div className="section-container space-y-12 py-24 pt-28">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        align="left"
      />

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <div className="space-y-4">
          <div className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-2xl border bg-muted">
            <Image
              src={content.photo}
              alt={t("photoAlt", { name: content.name })}
              fill
              className="object-cover object-top"
              sizes="280px"
              priority
            />
          </div>
          <div className="text-center lg:text-left">
            <p className="font-semibold">{content.name}</p>
            <p className="text-sm text-muted-foreground">{content.tagline}</p>
          </div>
        </div>

        <div className="space-y-6">
          {bios.map((bio) => (
            <Card key={bio.key} className="glass">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{bio.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {bio.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-base">{t("officialLinks")}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-3 sm:grid-cols-2" role="list">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border px-4 py-3 text-sm transition-colors hover:border-primary/50 hover:bg-accent/50"
                >
                  <ExternalLink
                    className="h-4 w-4 shrink-0 text-primary"
                    aria-hidden
                  />
                  <span className="font-medium">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
