import { Badge } from "@/registry/marcio/ui/badge";
import { statusLabel, type DocStatus } from "./catalog";

const tones = { estavel: "neutral", beta: "accent", experimental: "warning" } as const;

export function StatusBadge({ status, className }: { status: DocStatus; className?: string }) {
  return (
    <Badge tone={tones[status]} appearance={status === "estavel" ? "outline" : "soft"} className={className}>
      <span className="sr-only">status: </span>
      {statusLabel[status]}
    </Badge>
  );
}
