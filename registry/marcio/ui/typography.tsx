import { Slot } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/registry/marcio/lib/utils";

const headingSizes = {
  "display-xl": { tag: "h1", className: "text-display-xl" },
  "display-lg": { tag: "h2", className: "text-display-lg" },
  "display-md": { tag: "h2", className: "text-display-md" },
  "display-sm": { tag: "h3", className: "text-display-sm" },
} as const;

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

export type HeadingProps = ComponentProps<"h2"> & {
  size?: keyof typeof headingSizes;
  as?: HeadingTag;
  asChild?: boolean;
};

export function Heading({ size = "display-md", as, asChild = false, className, ...props }: HeadingProps) {
  const Comp = asChild ? Slot.Root : (as ?? headingSizes[size].tag);
  return <Comp data-slot="heading" className={cn("font-display font-extrabold text-ink", headingSizes[size].className, className)} {...props} />;
}

const textSizes = {
  lead: "text-lead",
  base: "text-base",
  "mono-sm": "font-mono text-mono-sm",
  "mono-xs": "font-mono text-mono-xs",
};

const textTones = { ink: "text-ink", soft: "text-ink-soft", muted: "text-ink-muted" };

type TextTag = "p" | "span" | "div" | "small" | "strong" | "em" | "figcaption" | "li" | "dd" | "dt";

export type TextProps = ComponentProps<"p"> & {
  size?: keyof typeof textSizes;
  tone?: keyof typeof textTones;
  as?: TextTag;
  asChild?: boolean;
};

export function Text({ size = "base", tone = "soft", as = "p", asChild = false, className, ...props }: TextProps) {
  const Comp = (asChild ? Slot.Root : as) as "p";
  return <Comp data-slot="text" className={cn(textSizes[size], textTones[tone], className)} {...props} />;
}
