import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/registry/marcio/lib/utils";

export const logoBlockVariants = cva(
  "inline-flex items-center justify-center bg-accent font-display font-extrabold tracking-display text-on-accent no-underline select-none",
  {
    variants: {
      size: {
        sm: "min-h-9 px-2 text-base",
        md: "min-h-control px-3 text-xl",
        lg: "min-h-16 px-4 text-3xl",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export type LogoBlockProps = ComponentProps<"span"> &
  VariantProps<typeof logoBlockVariants> & {
    asChild?: boolean;
  };

export function LogoBlock({ asChild = false, size, className, ...props }: LogoBlockProps) {
  const Comp = asChild ? Slot.Root : "span";
  return <Comp data-slot="logo-block" className={cn(logoBlockVariants({ size }), className)} {...props} />;
}
