import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/registry/marcio/lib/utils";
import { DotGrid } from "@/registry/marcio/ui/dot-grid";
import { Kicker } from "@/registry/marcio/ui/kicker";
import { TypingText } from "@/registry/marcio/ui/typing-text";

export type HeroProps = Omit<ComponentProps<"section">, "title"> & {
  title: ReactNode;
  kicker?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  typing?: string;
  decorated?: boolean;
  headingLevel?: "h1" | "h2";
};

export function Hero({
  title,
  kicker,
  description,
  actions,
  aside,
  typing,
  decorated = true,
  headingLevel: Heading = "h1",
  className,
  ...props
}: HeroProps) {
  return (
    <section data-slot="hero" className={cn("relative isolate overflow-hidden", className)} {...props}>
      {decorated && <DotGrid animated />}
      <div className="mx-auto flex max-w-content flex-wrap items-center gap-14 px-6 pt-20 pb-24">
        <div className="flex min-w-0 flex-[999_1_480px] flex-col gap-6">
          {kicker && <Kicker>{kicker}</Kicker>}
          <Heading className="font-display text-display-xl font-extrabold text-ink">{title}</Heading>
          {description && <p className="max-w-measure text-lead text-ink-soft">{description}</p>}
          {typing && <TypingText text={typing} delay={300} className="text-mono-xs text-ink-muted" />}
          {actions && <div className="flex flex-wrap gap-3 pt-2">{actions}</div>}
        </div>
        {aside && <div className="min-w-0 flex-[1_1_280px]">{aside}</div>}
      </div>
    </section>
  );
}
