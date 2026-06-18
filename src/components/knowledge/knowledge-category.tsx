"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type {
  KnowledgeCategory,
  KnowledgeCategoryId,
} from "@/types/technical-knowledge";

interface KnowledgeCategoryProps {
  categories: KnowledgeCategory[];
  allLabel: string;
  activeCategory: KnowledgeCategoryId | "all";
  onCategoryChange: (category: KnowledgeCategoryId | "all") => void;
  filterAria: string;
}

export function KnowledgeCategoryFilter({
  categories,
  allLabel,
  activeCategory,
  onCategoryChange,
  filterAria,
}: KnowledgeCategoryProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label={filterAria}>
      <button type="button" onClick={() => onCategoryChange("all")}>
        <Badge
          variant={activeCategory === "all" ? "default" : "outline"}
          className={cn(
            "cursor-pointer px-3 py-1.5 text-sm",
            activeCategory === "all" && "hover:bg-primary/90",
          )}
        >
          {allLabel}
        </Badge>
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onCategoryChange(category.id)}
        >
          <Badge
            variant={activeCategory === category.id ? "default" : "outline"}
            className={cn(
              "cursor-pointer px-3 py-1.5 text-sm",
              activeCategory === category.id && "hover:bg-primary/90",
            )}
          >
            {category.label}
          </Badge>
        </button>
      ))}
    </div>
  );
}
