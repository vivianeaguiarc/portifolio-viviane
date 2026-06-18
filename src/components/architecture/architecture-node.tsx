import { cn } from "@/lib/utils";

type ArchitectureNodeVariant = "default" | "accent" | "muted";

interface ArchitectureNodeProps {
  label: string;
  variant?: ArchitectureNodeVariant;
  className?: string;
}

const variantStyles: Record<ArchitectureNodeVariant, string> = {
  default: "border-border/70 bg-background/80 text-foreground",
  accent: "border-primary/40 bg-primary/10 text-foreground",
  muted: "border-border/50 bg-muted/50 text-muted-foreground",
};

export function ArchitectureNode({
  label,
  variant = "default",
  className,
}: ArchitectureNodeProps) {
  return (
    <div
      className={cn(
        "w-full min-w-0 rounded-xl border px-4 py-3 text-center text-sm font-semibold shadow-sm transition-colors",
        variantStyles[variant],
        className,
      )}
    >
      {label}
    </div>
  );
}
