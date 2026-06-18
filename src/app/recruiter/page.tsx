import type { Metadata } from "next";
import { RecruiterContent } from "@/components/sections/recruiter-content";
import { RecruiterJsonLd } from "@/components/shared/recruiter-json-ld";
import { RECRUITER_METADATA } from "@/data/recruiter";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: RECRUITER_METADATA.title,
    description: RECRUITER_METADATA.description,
    path: "/recruiter",
  }),
  title: {
    absolute: RECRUITER_METADATA.title,
  },
};

export default function RecruiterPage() {
  return (
    <>
      <RecruiterJsonLd />
      <RecruiterContent />
    </>
  );
}
