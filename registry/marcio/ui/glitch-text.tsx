import type { ComponentProps } from "react";
import { cn } from "@/registry/marcio/lib/utils";

export type GlitchTextProps = ComponentProps<"span"> & {
  trigger?: "mount" | "hover";
};

export function GlitchText({ trigger = "hover", className, ...props }: GlitchTextProps) {
  return (
    <span
      data-slot="glitch-text"
      data-trigger={trigger}
      className={cn(
        "inline-block",
        trigger === "mount" ? "motion-safe:animate-mw-glitch" : "motion-safe:hover:animate-mw-glitch",
        className,
      )}
      {...props}
    />
  );
}
