import { createJsonLd } from "@/lib/seo";

export function JsonLd() {
  const jsonLd = createJsonLd();

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
