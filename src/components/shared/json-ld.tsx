import { createJsonLd } from "@/lib/seo";

export function JsonLd() {
  const jsonLd = createJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
