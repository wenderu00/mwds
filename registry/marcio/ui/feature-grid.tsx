import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/registry/marcio/lib/utils";

export type Feature = { title: ReactNode; description: ReactNode; icon?: ReactNode };

const columnClasses = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" };

export type FeatureGridProps = Omit<ComponentProps<"ul">, "children"> & {
  items: Feature[];
  columns?: keyof typeof columnClasses;
  numbered?: boolean;
  headingLevel?: "h3" | "h4";
};

export function FeatureGrid({ items, columns = 2, numbered = true, headingLevel: Heading = "h3", className, ...props }: FeatureGridProps) {
  return (
    <ul data-slot="feature-grid" className={cn("grid gap-4", columnClasses[columns], className)} {...props}>
      {items.map((item, index) => (
        <li key={index} className="flex flex-col gap-3 rounded-card border border-line bg-surface p-6">
          <div className="flex items-center justify-between gap-3">
            {item.icon && <span className="text-accent-text [&_svg]:size-6">{item.icon}</span>}
            {numbered && (
              <span aria-hidden="true" className="ml-auto font-mono text-mono-xs text-ink-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
            )}
          </div>
          <Heading className="font-display text-display-sm font-extrabold text-ink">{item.title}</Heading>
          <p className="text-ink-soft">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}
