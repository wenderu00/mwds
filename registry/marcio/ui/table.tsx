import type { ComponentProps } from "react";
import { cn } from "@/registry/marcio/lib/utils";

export type TableProps = ComponentProps<"table"> & {
  containerClassName?: string;
};

export function Table({ className, containerClassName, ...props }: TableProps) {
  return (
    <div data-slot="table-container" className={cn("relative w-full overflow-x-auto rounded-card border border-line", containerClassName)}>
      <table data-slot="table" className={cn("w-full caption-bottom border-collapse text-left text-base", className)} {...props} />
    </div>
  );
}

export function TableHeader({ className, ...props }: ComponentProps<"thead">) {
  return <thead data-slot="table-header" className={cn("bg-surface", className)} {...props} />;
}

export function TableBody({ className, ...props }: ComponentProps<"tbody">) {
  return <tbody data-slot="table-body" className={cn(className)} {...props} />;
}

export function TableFooter({ className, ...props }: ComponentProps<"tfoot">) {
  return <tfoot data-slot="table-footer" className={cn("border-t border-line bg-surface font-medium", className)} {...props} />;
}

export function TableRow({ className, ...props }: ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-t border-line transition-colors duration-base first:border-t-0 [tbody_&]:hover:bg-band data-[state=selected]:bg-accent-soft [tbody_&]:data-[state=selected]:hover:bg-accent-soft",
        className,
      )}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }: ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      scope="col"
      className={cn("h-control px-4 align-middle font-mono text-mono-xs font-medium whitespace-nowrap text-ink-muted", className)}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: ComponentProps<"td">) {
  return <td data-slot="table-cell" className={cn("px-4 py-cell-y align-middle text-ink-soft", className)} {...props} />;
}

export function TableCaption({ className, ...props }: ComponentProps<"caption">) {
  return (
    <caption data-slot="table-caption" className={cn("border-t border-line px-4 py-cell-y text-left font-mono text-mono-xs text-ink-muted", className)} {...props} />
  );
}
