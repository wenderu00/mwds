import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/registry/marcio/lib/utils";
import { Badge } from "@/registry/marcio/ui/badge";
import { Card } from "@/registry/marcio/ui/card";
import { Progress } from "@/registry/marcio/ui/progress";

const trends = {
  up: { symbol: "↑", label: "subiu" },
  down: { symbol: "↓", label: "caiu" },
  flat: { symbol: "→", label: "estável" },
};

export type StatCardProps = Omit<ComponentProps<"div">, "children"> & {
  label: string;
  value: ReactNode;
  change?: ReactNode;
  trend?: keyof typeof trends;
  tone?: "neutral" | "accent" | "success" | "danger" | "warning" | "info";
  detail?: ReactNode;
  progress?: number;
  progressLabel?: string;
};

export function StatCard({ label, value, change, trend = "flat", tone = "neutral", detail, progress, progressLabel, className, ...props }: StatCardProps) {
  return (
    <Card data-slot="stat-card" className={cn("gap-3 p-5", className)} {...props}>
      <p className="font-mono text-mono-xs tracking-kicker text-ink-muted uppercase">{label}</p>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="font-display text-display-md font-extrabold text-ink">{value}</p>
        {change !== undefined && (
          <Badge tone={tone}>
            <span aria-hidden="true">{trends[trend].symbol}</span>
            <span className="sr-only">{trends[trend].label}: </span>
            {change}
          </Badge>
        )}
      </div>
      {progress !== undefined && <Progress value={progress} size="sm" aria-label={progressLabel ?? `${label}: ${progress}%`} />}
      {detail && <p className="text-sm text-ink-muted">{detail}</p>}
    </Card>
  );
}
