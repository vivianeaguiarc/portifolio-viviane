import { getTranslations } from "next-intl/server";
import { createJsonLd } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

interface JsonLdProps {
  locale: Locale;
}

export async function JsonLd({ locale }: JsonLdProps) {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const jsonLd = createJsonLd(locale, t("siteDescription"), t("portfolioName"));

  return (
    <>
      {jsonLd.map((schema) => (
        <script
          key={schema["@type"] as string}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
