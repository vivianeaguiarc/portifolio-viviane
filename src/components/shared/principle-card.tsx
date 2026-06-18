import {
  Activity,
  Boxes,
  Building2,
  Component,
  FlaskConical,
  GitBranch,
  Layers,
  Lock,
  Puzzle,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PrincipleIcon, SoftwarePrinciple } from "@/types";

const iconMap: Record<PrincipleIcon, LucideIcon> = {
  layers: Layers,
  building: Building2,
  boxes: Boxes,
  component: Component,
  puzzle: Puzzle,
  flask: FlaskConical,
  "git-branch": GitBranch,
  activity: Activity,
  shield: Shield,
  lock: Lock,
};

interface PrincipleCardProps {
  principle: SoftwarePrinciple;
}

export function PrincipleCard({ principle }: PrincipleCardProps) {
  const Icon = iconMap[principle.icon];

  return (
    <Card className="glass h-full transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" aria-hidden />
        </div>
        <CardTitle className="text-base leading-snug">
          {principle.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {principle.description}
        </p>
      </CardContent>
    </Card>
  );
}
