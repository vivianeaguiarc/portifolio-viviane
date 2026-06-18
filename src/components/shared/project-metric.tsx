import { cn } from "@/lib/utils";
import type { ProjectMetric } from "@/types";

interface ProjectMetricItemProps extends ProjectMetric {
  className?: string;
}

export function ProjectMetricItem({
  label,
  value,
  className,
}: ProjectMetricItemProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border/60 bg-background/60 px-3 py-2",
        className,
      )}
    >
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-medium leading-snug">{value}</p>
    </div>
  );
}

interface ProjectMetricGridProps {
  metrics: ProjectMetric[];
  className?: string;
}

export function ProjectMetricGrid({
  metrics,
  className,
}: ProjectMetricGridProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-2", className)}>
      {metrics.map((metric) => (
        <ProjectMetricItem
          key={`${metric.label}-${metric.value}`}
          {...metric}
        />
      ))}
    </div>
  );
}
