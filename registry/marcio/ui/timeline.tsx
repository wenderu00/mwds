import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/registry/marcio/lib/utils";

export type TimelineStatus = "complete" | "current" | "pending";

export type TimelineTone = "neutral" | "accent" | "success" | "warning" | "danger" | "info";

export type TimelineItem = {
  title: ReactNode;
  description?: ReactNode;
  date?: ReactNode;
  dateTime?: string;
  status?: TimelineStatus;
  tone?: TimelineTone;
};

const toneClasses: Record<TimelineTone, string> = {
  neutral: "border-ink-muted bg-ink-muted",
  accent: "border-accent-line bg-accent-line",
  success: "border-success-text bg-success-text",
  warning: "border-warning-text bg-warning-text",
  danger: "border-danger-text bg-danger-text",
  info: "border-info-text bg-info-text",
};

const statusText: Record<TimelineStatus, string> = { complete: "concluído", current: "em andamento", pending: "pendente" };

export type TimelineProps = Omit<ComponentProps<"ol">, "children"> & {
  items: TimelineItem[];
  "aria-label"?: string;
};

export function Timeline({ items, className, "aria-label": ariaLabel = "Histórico", ...props }: TimelineProps) {
  return (
    <ol data-slot="timeline" aria-label={ariaLabel} className={cn("flex flex-col", className)} {...props}>
      {items.map((item, index) => {
        const status = item.status ?? "complete";
        const last = index === items.length - 1;
        return (
          <li
            key={index}
            data-status={status}
            aria-current={status === "current" ? "step" : undefined}
            className="relative grid grid-cols-[1rem_minmax(0,1fr)] gap-x-4 pb-6 last:pb-0"
          >
            {!last && <span aria-hidden="true" className="absolute top-5 bottom-1 left-2 w-px -translate-x-1/2 bg-line" />}
            <span
              aria-hidden="true"
              className={cn(
                "mt-1.5 size-3 justify-self-center rounded-full border-2",
                status === "complete" && toneClasses[item.tone ?? "accent"],
                status === "current" && "border-accent-line bg-ground ring-4 ring-accent-soft",
                status === "pending" && "border-line-control bg-ground",
              )}
            />
            <div className="flex min-w-0 flex-col gap-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className={cn("font-medium", status === "pending" ? "text-ink-soft" : "text-ink")}>{item.title}</span>
                {item.date && (
                  <time dateTime={item.dateTime} className="font-mono text-mono-xs text-ink-muted">
                    {item.date}
                  </time>
                )}
              </div>
              {item.description && <p className="text-sm text-ink-soft">{item.description}</p>}
              <span className="sr-only">{statusText[status]}</span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
