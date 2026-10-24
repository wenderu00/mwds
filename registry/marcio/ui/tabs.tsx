"use client";

import { Tabs as TabsPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/registry/marcio/lib/utils";

export function Tabs({ className, ...props }: ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn("flex flex-col gap-6", className)} {...props} />;
}

export function TabsList({ className, ...props }: ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "relative flex gap-1 overflow-x-auto overflow-y-hidden before:pointer-events-none before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-line",
        className,
      )}
      {...props}
    />
  );
}

export function TabsTrigger({ className, ...props }: ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex h-control shrink-0 cursor-pointer items-center gap-2 border-b-2 border-transparent px-3 font-mono text-mono-sm whitespace-nowrap text-ink-muted transition-colors duration-base ease-standard hover:text-ink disabled:cursor-not-allowed disabled:opacity-50 data-[state=active]:border-accent-line data-[state=active]:text-ink focus-visible:outline-offset-[-3px]",
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({ className, ...props }: ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn("outline-none", className)} {...props} />;
}
