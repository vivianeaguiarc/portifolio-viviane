import { cn } from "@/lib/utils";

interface CodeBlockProps {
  language: string;
  content: string;
  className?: string;
}

export function CodeBlock({ language, content, className }: CodeBlockProps) {
  return (
    <div className={cn("overflow-hidden rounded-lg border", className)}>
      <div className="border-b bg-muted/50 px-4 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {language}
      </div>
      <pre className="overflow-x-auto bg-muted/30 p-4 text-sm leading-relaxed">
        <code>{content}</code>
      </pre>
    </div>
  );
}
