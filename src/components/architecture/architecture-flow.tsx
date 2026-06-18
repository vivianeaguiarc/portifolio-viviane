import { ArrowDown, ArrowRight } from "lucide-react";
import { ArchitectureNode } from "@/components/architecture/architecture-node";
import { cn } from "@/lib/utils";

interface ArchitectureFlowProps {
  nodes: string[];
  ariaLabel: string;
  className?: string;
}

export function ArchitectureFlow({
  nodes,
  ariaLabel,
  className,
}: ArchitectureFlowProps) {
  const useHorizontal = nodes.length <= 5;

  return (
    <ol
      className={cn(
        useHorizontal
          ? "flex flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center"
          : "mx-auto flex max-w-md flex-col items-stretch gap-2",
        className,
      )}
      aria-label={ariaLabel}
    >
      {nodes.map((node, index) => {
        const isFirst = index === 0;
        const isLast = index === nodes.length - 1;

        return (
          <li
            key={`${node}-${index}`}
            className={cn(
              "flex items-center gap-2",
              useHorizontal ? "sm:flex-row" : "flex-col",
            )}
          >
            <ArchitectureNode
              label={node}
              variant={isFirst ? "accent" : isLast ? "accent" : "default"}
              className={
                useHorizontal ? "sm:min-w-[8.5rem] sm:flex-none" : undefined
              }
            />
            {index < nodes.length - 1 && (
              <>
                <ArrowDown
                  className={cn(
                    "mx-auto h-4 w-4 shrink-0 text-muted-foreground",
                    useHorizontal && "sm:hidden",
                  )}
                  aria-hidden
                />
                <ArrowRight
                  className={cn(
                    "hidden h-4 w-4 shrink-0 text-muted-foreground",
                    useHorizontal && "sm:block",
                  )}
                  aria-hidden
                />
              </>
            )}
          </li>
        );
      })}
    </ol>
  );
}
