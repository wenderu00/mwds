"use client";

import { Switch as SwitchPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/registry/marcio/lib/utils";

export type SwitchProps = ComponentProps<typeof SwitchPrimitive.Root>;

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-line-control bg-surface p-0.5 transition-colors duration-base ease-standard hover:border-accent-line aria-invalid:border-danger-text disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-accent-edge data-[state=checked]:bg-accent",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="block size-4 rounded-full bg-ink-muted transition-transform duration-base ease-standard data-[state=checked]:translate-x-5 data-[state=checked]:bg-on-accent motion-reduce:transition-none"
      />
    </SwitchPrimitive.Root>
  );
}
