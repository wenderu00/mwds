"use client";

import { Checkbox as CheckboxPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/registry/marcio/lib/utils";

export type CheckboxProps = ComponentProps<typeof CheckboxPrimitive.Root>;

export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer group inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-mark border border-line-control bg-ground text-on-accent transition-colors duration-base ease-standard hover:border-accent-line disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger-text data-[state=checked]:border-accent data-[state=checked]:bg-accent data-[state=indeterminate]:border-accent data-[state=indeterminate]:bg-accent",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className="flex items-center justify-center">
        <Check aria-hidden="true" strokeWidth={3} className="size-3.5 group-data-[state=indeterminate]:hidden" />
        <Minus aria-hidden="true" strokeWidth={3} className="hidden size-3.5 group-data-[state=indeterminate]:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
