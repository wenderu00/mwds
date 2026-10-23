import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/registry/marcio/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";

export type SectionTitleProps = Omit<ComponentProps<"div">, "title"> & {
  index?: string;
  kicker?: ReactNode;
  as?: HeadingLevel;
  line?: boolean;
  size?: "lg" | "md";
};

export function SectionTitle({
  index,
  kicker,
  as: Heading = "h2",
  line = true,
  size = "lg",
  className,
  children,
  ...props
}: SectionTitleProps) {
  return (
    <div data-slot="section-title" className={cn("flex flex-col gap-2", className)} {...props}>
      {index !== undefined && (
        <p aria-hidden="true" className="flex items-center gap-4 font-mono text-mono-sm text-accent-text">
          {index}
          {line && <span className="h-px flex-1 bg-line" />}
        </p>
      )}
      {kicker && (
        <p className="font-mono text-mono-xs font-medium tracking-kicker text-accent-text uppercase">{kicker}</p>
      )}
      <Heading
        className={cn(
          "font-display font-extrabold text-ink",
          size === "lg" ? "text-display-lg" : "text-display-md",
        )}
      >
        {children}
      </Heading>
    </div>
  );
}
