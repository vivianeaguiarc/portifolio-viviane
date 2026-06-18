import type { ReactNode } from "react";

interface ProjectSectionProps {
  title: string;
  children: ReactNode;
  id?: string;
  className?: string;
}

export function ProjectSection({
  title,
  children,
  id,
  className,
}: ProjectSectionProps) {
  return (
    <section
      id={id}
      className={className}
      aria-labelledby={id ? `${id}-title` : undefined}
    >
      <h2
        id={id ? `${id}-title` : undefined}
        className="mb-4 text-xl font-semibold tracking-tight sm:text-2xl"
      >
        {title}
      </h2>
      <div className="glass rounded-xl border p-6">{children}</div>
    </section>
  );
}
