"use client";

import { Collapsible as CollapsiblePrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/registry/marcio/lib/utils";

export const Collapsible = CollapsiblePrimitive.Root;
export const CollapsibleTrigger = CollapsiblePrimitive.Trigger;

export function CollapsibleContent({ className, ...props }: ComponentProps<typeof CollapsiblePrimitive.Content>) {
  return (
    <CollapsiblePrimitive.Content
      data-slot="collapsible-content"
      className={cn(
        "overflow-hidden [--mw-content-height:var(--radix-collapsible-content-height)] motion-safe:data-[state=closed]:animate-mw-collapse-up motion-safe:data-[state=open]:animate-mw-collapse-down",
        className,
      )}
      {...props}
    />
  );
}
