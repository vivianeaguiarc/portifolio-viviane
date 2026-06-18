import { ArchitectureFlow } from "@/components/architecture/architecture-flow";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ArchitectureDiagramProps {
  title: string;
  nodes: string[];
  features?: string[];
  ariaLabel: string;
  featuresLabel?: string;
}

export function ArchitectureDiagram({
  title,
  nodes,
  features,
  ariaLabel,
  featuresLabel,
}: ArchitectureDiagramProps) {
  return (
    <Card className="glass h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ArchitectureFlow nodes={nodes} ariaLabel={ariaLabel} />
        {features && features.length > 0 && (
          <div>
            {featuresLabel && (
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {featuresLabel}
              </p>
            )}
            <ul className="flex flex-wrap gap-2" role="list">
              {features.map((feature) => (
                <li key={feature}>
                  <Badge variant="secondary">{feature}</Badge>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
