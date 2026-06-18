import { CodeBlock } from "@/components/shared/code-block";
import type { BlogPostSection } from "@/types";

interface BlogSectionProps {
  section: BlogPostSection;
}

export function BlogSection({ section }: BlogSectionProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
        {section.heading}
      </h2>
      {section.paragraphs.map((paragraph) => (
        <p
          key={paragraph.slice(0, 40)}
          className="leading-relaxed text-muted-foreground"
        >
          {paragraph}
        </p>
      ))}
      {section.list && (
        <ul className="space-y-2 pl-1" role="list">
          {section.list.map((item) => (
            <li
              key={item}
              className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
            >
              <span className="text-primary" aria-hidden>
                •
              </span>
              {item}
            </li>
          ))}
        </ul>
      )}
      {section.code && (
        <CodeBlock
          language={section.code.language}
          content={section.code.content}
        />
      )}
    </section>
  );
}
