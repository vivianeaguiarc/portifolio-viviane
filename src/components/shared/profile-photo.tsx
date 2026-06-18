import Image from "next/image";
import { SITE_CONFIG } from "@/constants/site";
import { cn } from "@/lib/utils";

interface ProfilePhotoProps {
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
}

export function ProfilePhoto({
  className,
  imageClassName,
  priority = false,
  sizes = "(max-width: 1024px) 280px, 400px",
}: ProfilePhotoProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/60 bg-muted shadow-2xl ring-1 ring-primary/10",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"
        aria-hidden
      />
      <Image
        src="/viviane.jpg"
        alt={`Foto profissional de ${SITE_CONFIG.fullName}`}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover object-top", imageClassName)}
      />
    </div>
  );
}
