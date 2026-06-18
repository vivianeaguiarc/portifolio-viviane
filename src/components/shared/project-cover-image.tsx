"use client";

import Image from "next/image";
import { useState } from "react";
import { PROJECT_COVER_FALLBACK } from "@/lib/project-cover";
import { cn } from "@/lib/utils";

interface ProjectCoverImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

export function ProjectCoverImage({
  src,
  alt,
  priority = false,
  className,
  sizes = "(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw",
}: ProjectCoverImageProps) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      priority={priority}
      className={cn("object-cover", className)}
      sizes={sizes}
      onError={() => {
        if (imageSrc !== PROJECT_COVER_FALLBACK) {
          setImageSrc(PROJECT_COVER_FALLBACK);
        }
      }}
    />
  );
}
