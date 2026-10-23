import type { ComponentProps } from "react";
import { cn } from "@/registry/marcio/lib/utils";

export type CardProps = ComponentProps<"div"> & {
  interactive?: boolean;
};

export function Card({ interactive = false, className, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(
        "flex flex-col gap-6 rounded-xl border border-line bg-surface p-6 text-ink",
        interactive && "transition-colors duration-200 ease-out hover:border-accent-line focus-within:border-accent-line",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="card-header" className={cn("flex flex-col gap-1.5", className)} {...props} />;
}

export type CardTitleProps = ComponentProps<"h3"> & {
  as?: "h2" | "h3" | "h4" | "p";
};

export function CardTitle({ as: Heading = "h3", className, ...props }: CardTitleProps) {
  return <Heading data-slot="card-title" className={cn("font-display text-display-sm font-extrabold", className)} {...props} />;
}

export function CardDescription({ className, ...props }: ComponentProps<"p">) {
  return <p data-slot="card-description" className={cn("text-base text-ink-muted", className)} {...props} />;
}

export function CardContent({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("flex flex-col gap-4", className)} {...props} />;
}

export function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex flex-wrap items-center gap-3 border-t border-line pt-5", className)}
      {...props}
    />
  );
}
