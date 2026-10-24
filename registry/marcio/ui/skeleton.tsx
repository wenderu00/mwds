import type { ComponentProps } from "react";
import { cn } from "@/registry/marcio/lib/utils";

export function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      data-slot="skeleton"
      className={cn("rounded-control bg-surface motion-safe:animate-mw-pulse", className)}
      {...props}
    />
  );
}

export type SkeletonTextProps = ComponentProps<"div"> & {
  lines?: number;
};

export function SkeletonText({ lines = 3, className, ...props }: SkeletonTextProps) {
  return (
    <div aria-hidden="true" data-slot="skeleton-text" className={cn("flex flex-col gap-2", className)} {...props}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton key={i} className={cn("h-3.5", i === lines - 1 && lines > 1 ? "w-3/5" : "w-full")} />
      ))}
    </div>
  );
}

export type LoadingRegionProps = ComponentProps<"div"> & {
  loading: boolean;
  label?: string;
};

export function LoadingRegion({ loading, label = "Carregando", children, ...props }: LoadingRegionProps) {
  return (
    <div data-slot="loading-region" aria-busy={loading || undefined} {...props}>
      {loading && <span className="sr-only" role="status">{label}</span>}
      {children}
    </div>
  );
}
