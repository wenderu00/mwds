import { Check } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/registry/marcio/lib/utils";

export type StepperStep = { title: ReactNode; description?: ReactNode };

export type StepperStatus = "complete" | "current" | "pending";

const statusText: Record<StepperStatus, string> = { complete: "concluída", current: "etapa atual", pending: "pendente" };

export type StepperProps = Omit<ComponentProps<"ol">, "children"> & {
  steps: StepperStep[];
  current: number;
  orientation?: "horizontal" | "vertical";
  onStepChange?: (index: number) => void;
  "aria-label"?: string;
};

export function Stepper({ steps, current, orientation = "horizontal", onStepChange, className, "aria-label": ariaLabel = "Etapas", ...props }: StepperProps) {
  const vertical = orientation === "vertical";
  return (
    <ol
      data-slot="stepper"
      data-orientation={orientation}
      aria-label={ariaLabel}
      className={cn("flex", vertical ? "flex-col gap-0" : "flex-col gap-4 sm:flex-row sm:gap-0", className)}
      {...props}
    >
      {steps.map((step, index) => {
        const status: StepperStatus = index < current ? "complete" : index === current ? "current" : "pending";
        const last = index === steps.length - 1;
        const marker = (
          <span
            aria-hidden="true"
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-full border-2 font-mono text-mono-sm font-medium",
              status === "complete" && "border-accent-edge bg-accent text-on-accent",
              status === "current" && "border-accent-line text-accent-text",
              status === "pending" && "border-line-control text-ink-muted",
            )}
          >
            {status === "complete" ? <Check className="size-4" /> : index + 1}
          </span>
        );
        const label = (
          <span className="flex min-w-0 flex-col gap-0.5">
            <span className={cn("font-medium transition-colors duration-base group-hover:text-accent-text", status === "pending" ? "text-ink-soft" : "text-ink")}>{step.title}</span>
            {step.description && <span className="text-sm text-ink-muted">{step.description}</span>}
            <span className="sr-only">, {statusText[status]}</span>
          </span>
        );
        const clickable = onStepChange && status === "complete";
        return (
          <li
            key={index}
            data-status={status}
            aria-current={status === "current" ? "step" : undefined}
            className={cn("relative flex flex-1", vertical ? "gap-3 pb-6 last:pb-0" : "gap-3 sm:flex-col sm:pr-4")}
          >
            {!last && (
              <span
                aria-hidden="true"
                className={cn(
                  "absolute",
                  vertical ? "top-10 bottom-2 left-4 w-px -translate-x-1/2" : "hidden sm:top-4 sm:right-2 sm:left-12 sm:block sm:h-px",
                  status === "complete" ? "bg-accent-line" : "bg-line",
                )}
              />
            )}
            {clickable ? (
              <button
                type="button"
                onClick={() => onStepChange(index)}
                className={cn("group flex cursor-pointer gap-3 rounded-control text-left", !vertical && "sm:flex-col")}
              >
                {marker}
                {label}
              </button>
            ) : (
              <span className={cn("flex gap-3", !vertical && "sm:flex-col")}>
                {marker}
                {label}
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
