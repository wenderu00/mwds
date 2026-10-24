import type { ComponentProps } from "react";
import { cn } from "@/registry/marcio/lib/utils";

export function Kbd({ className, ...props }: ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn("inline-flex items-center rounded-mark border border-line-strong px-1.5 font-mono text-mono-xs text-ink-muted", className)}
      {...props}
    />
  );
}
