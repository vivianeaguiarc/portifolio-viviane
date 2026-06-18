import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectArchitectureFlowProps {
  steps: string[];
  className?: string;
}

export function ProjectArchitectureFlow({
  steps,
  className,
}: ProjectArchitectureFlowProps) {
  return (
    <ol
      className={cn("flex flex-col gap-3 sm:flex-row sm:flex-wrap", className)}
      aria-label="Fluxo da arquitetura"
    >
      {steps.map((step, index) => (
        <li key={step} className="flex items-center gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-3 rounded-lg border border-border/60 bg-background/60 px-4 py-3">
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary"
              aria-hidden
            >
              {index + 1}
            </span>
            <span className="text-sm font-medium leading-snug">{step}</span>
          </div>
          {index < steps.length - 1 && (
            <ArrowRight
              className="hidden h-4 w-4 shrink-0 text-muted-foreground sm:block"
              aria-hidden
            />
          )}
        </li>
      ))}
    </ol>
  );
}
