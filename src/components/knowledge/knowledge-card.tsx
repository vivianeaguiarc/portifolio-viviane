"use client";

import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { KnowledgeItem } from "@/types/technical-knowledge";

interface KnowledgeCardProps {
  item: KnowledgeItem;
  categoryLabel: string;
  isSelected: boolean;
  onSelect: (slug: string) => void;
}

export function KnowledgeCard({
  item,
  categoryLabel,
  isSelected,
  onSelect,
}: KnowledgeCardProps) {
  const t = useTranslations("technicalKnowledgePage");

  return (
    <button
      type="button"
      onClick={() => onSelect(item.slug)}
      aria-label={t("selectCardAria", { title: item.title })}
      aria-pressed={isSelected}
      className="w-full text-left"
    >
      <Card
        className={cn(
          "glass h-full transition-colors hover:border-primary/40",
          isSelected && "border-primary ring-1 ring-primary/30",
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base leading-snug">
              {item.title}
            </CardTitle>
            <ChevronRight
              className={cn(
                "mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                isSelected && "rotate-90 text-primary",
              )}
              aria-hidden
            />
          </div>
          <Badge variant="secondary" className="w-fit">
            {categoryLabel}
          </Badge>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {item.definition}
          </p>
        </CardContent>
      </Card>
    </button>
  );
}
