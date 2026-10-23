import type { Metric } from "@/registry/marcio/blocks/dashboard/data";
import { Badge } from "@/registry/marcio/ui/badge";
import { Card } from "@/registry/marcio/ui/card";
import { Progress } from "@/registry/marcio/ui/progress";

const trendSymbol = { up: "↑", down: "↓", flat: "→" } as const;

export function MetricCard({ metric }: { metric: Metric }) {
  return (
    <Card className="gap-3 p-5">
      <p className="font-mono text-mono-xs tracking-kicker text-ink-muted uppercase">{metric.label}</p>
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-display text-display-md font-extrabold">{metric.value}</p>
        <Badge tone={metric.tone}>
          <span aria-hidden="true">{trendSymbol[metric.trend]}</span>
          {metric.change}
        </Badge>
      </div>
      {metric.progress !== undefined ? (
        <Progress value={metric.progress} size="sm" aria-label={`${metric.label}: ${metric.value}`} />
      ) : null}
      <p className="text-sm text-ink-muted">{metric.detail}</p>
    </Card>
  );
}
