"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface KnowledgeSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
}

export function KnowledgeSearch({
  value,
  onChange,
  placeholder,
  label,
}: KnowledgeSearchProps) {
  return (
    <div className="relative">
      <label htmlFor="knowledge-search" className="sr-only">
        {label}
      </label>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
      <Input
        id="knowledge-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="pl-9"
      />
    </div>
  );
}
