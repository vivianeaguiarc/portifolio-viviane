import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type TechBadgeVariant = "default" | "secondary" | "outline";

interface TechBadgeProps {
  label: string;
  variant?: TechBadgeVariant;
  className?: string;
}

export function TechBadge({
  label,
  variant = "secondary",
  className,
}: TechBadgeProps) {
  return (
    <Badge variant={variant} className={cn("text-xs", className)}>
      {label}
    </Badge>
  );
}

interface TechBadgeGroupProps {
  title: string;
  items: string[];
  variant?: TechBadgeVariant;
  className?: string;
}

export function TechBadgeGroup({
  title,
  items,
  variant = "secondary",
  className,
}: TechBadgeGroupProps) {
  return (
    <div className={className}>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </p>
      <ul className="flex flex-wrap gap-1.5" role="list">
        {items.map((item) => (
          <li key={item}>
            <TechBadge label={item} variant={variant} />
          </li>
        ))}
      </ul>
    </div>
  );
}
