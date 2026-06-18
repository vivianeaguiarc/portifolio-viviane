import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface PipelineFlowProps {
  steps: readonly { id: string; label: string }[];
  className?: string;
}

export function PipelineFlow({ steps, className }: PipelineFlowProps) {
  return (
    <ol
      className={cn(
        "flex flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3",
        className,
      )}
      aria-label="Pipeline steps"
    >
      {steps.map((step, index) => (
        <li key={step.id} className="flex items-center gap-2 sm:gap-3">
          <div className="flex min-h-11 flex-1 items-center justify-center rounded-xl border bg-card px-4 py-3 text-sm font-semibold shadow-sm sm:min-w-[7.5rem] sm:flex-none">
            {step.label}
          </div>
          {index < steps.length - 1 && (
            <ArrowDown
              className="mx-auto h-4 w-4 shrink-0 text-muted-foreground sm:hidden"
              aria-hidden
            />
          )}
          {index < steps.length - 1 && (
            <span
              className="hidden text-lg text-muted-foreground sm:inline"
              aria-hidden
            >
              ↓
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
