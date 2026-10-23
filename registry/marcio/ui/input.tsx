import type { ComponentProps } from "react";
import { cn } from "@/registry/marcio/lib/utils";

export const fieldClasses =
  "w-full min-w-0 rounded-md border border-line-control bg-ground px-3 text-base text-ink transition-colors duration-200 ease-out placeholder:text-ink-muted disabled:cursor-not-allowed disabled:opacity-50 read-only:bg-band aria-invalid:border-danger-text";

export type InputProps = ComponentProps<"input">;

export function Input({ className, type = "text", ...props }: InputProps) {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(
        fieldClasses,
        "h-11 file:mr-3 file:border-0 file:bg-transparent file:font-mono file:text-mono-xs file:text-ink",
        className,
      )}
      {...props}
    />
  );
}
