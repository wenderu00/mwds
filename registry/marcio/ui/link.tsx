import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/registry/marcio/lib/utils";

export const linkVariants = cva(
  "cursor-pointer rounded-mark underline-offset-4 transition-colors duration-base ease-standard",
  {
    variants: {
      variant: {
        inline: "text-accent-text underline decoration-1 hover:decoration-2",
        standalone: "inline-flex items-center gap-1 font-medium text-accent-text no-underline hover:underline",
        muted: "text-ink-muted underline decoration-1 hover:text-ink",
      },
      mono: {
        true: "font-mono",
        false: "",
      },
    },
    defaultVariants: { variant: "inline", mono: false },
  },
);

export type LinkProps = ComponentProps<"a"> &
  VariantProps<typeof linkVariants> & {
    asChild?: boolean;
    external?: boolean;
    newTabLabel?: string;
  };

export function Link({
  asChild = false,
  external = false,
  newTabLabel = "(abre em nova aba)",
  variant,
  mono,
  className,
  children,
  target,
  rel,
  ...props
}: LinkProps) {
  const classes = cn(linkVariants({ variant, mono }), className);

  if (asChild) {
    return (
      <Slot.Root data-slot="link" className={classes} {...props}>
        {children}
      </Slot.Root>
    );
  }

  return (
    <a
      data-slot="link"
      className={classes}
      target={external ? "_blank" : target}
      rel={external ? "noopener noreferrer" : rel}
      {...props}
    >
      {children}
      {external && (
        <>
          {" "}
          <span aria-hidden="true">↗</span>
          <span className="sr-only">{newTabLabel}</span>
        </>
      )}
    </a>
  );
}
