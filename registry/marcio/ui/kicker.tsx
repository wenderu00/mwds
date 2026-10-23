import { Slot } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/registry/marcio/lib/utils";

export type KickerProps = ComponentProps<"p"> & {
  asChild?: boolean;
};

export function Kicker({ asChild = false, className, ...props }: KickerProps) {
  const Comp = asChild ? Slot.Root : "p";
  return (
    <Comp
      data-slot="kicker"
      className={cn("font-mono text-mono-sm font-medium tracking-kicker text-accent-text uppercase", className)}
      {...props}
    />
  );
}
