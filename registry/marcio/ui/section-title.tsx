import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/registry/marcio/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";

const headingSizes = { sm: "text-display-sm", md: "text-display-md", lg: "text-display-lg" } as const;

export type SectionTitleProps = Omit<ComponentProps<"div">, "title"> & {
  index?: string;
  kicker?: ReactNode;
  as?: HeadingLevel;
  line?: boolean;
  /** sm usa display-sm, md usa display-md e lg usa display-lg. */
  size?: "sm" | "md" | "lg";
};

export function SectionTitle({
  index,
  kicker,
  as: Heading = "h2",
  line = true,
  size = "md",
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
          headingSizes[size],
        )}
      >
        {children}
      </Heading>
    </div>
  );
}
