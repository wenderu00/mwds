import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/registry/marcio/lib/utils";

export const alertVariants = cva(
  "relative grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-3 gap-y-1 rounded-md border px-4 py-3 text-ink [&>svg]:mt-0.5 [&>svg]:size-5",
  {
    variants: {
      tone: {
        neutral: "border-line-strong bg-surface [&>svg]:text-ink-muted [&_[data-slot=alert-title]]:text-ink",
        info: "border-transparent bg-info-soft [&>svg]:text-info-text [&_[data-slot=alert-title]]:text-info-text",
        success: "border-transparent bg-success-soft [&>svg]:text-success-text [&_[data-slot=alert-title]]:text-success-text",
        warning: "border-transparent bg-warning-soft [&>svg]:text-warning-text [&_[data-slot=alert-title]]:text-warning-text",
        danger: "border-transparent bg-danger-soft [&>svg]:text-danger-text [&_[data-slot=alert-title]]:text-danger-text",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

const icons: Record<NonNullable<VariantProps<typeof alertVariants>["tone"]>, ReactNode> = {
  neutral: <path d="M8 7.5v4M8 5v.5" strokeLinecap="round" />,
  info: <path d="M8 7.5v4M8 5v.5" strokeLinecap="round" />,
  success: <path d="M5 8.5l2 2 4-4.5" strokeLinecap="round" strokeLinejoin="round" />,
  warning: <path d="M8 4.5v4.5M8 11v.5" strokeLinecap="round" />,
  danger: <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" strokeLinecap="round" />,
};

export type AlertProps = Omit<ComponentProps<"div">, "title"> &
  VariantProps<typeof alertVariants> & {
    title?: ReactNode;
    icon?: ReactNode | false;
    action?: ReactNode;
    onDismiss?: () => void;
    dismissLabel?: string;
  };

export function Alert({
  tone,
  title,
  icon,
  action,
  onDismiss,
  dismissLabel = "Fechar aviso",
  className,
  children,
  ...props
}: AlertProps) {
  const resolvedTone = tone ?? "neutral";
  return (
    <div data-slot="alert" data-tone={resolvedTone} className={cn(alertVariants({ tone }), onDismiss && "pr-12", className)} {...props}>
      {icon === false ? (
        <span aria-hidden="true" />
      ) : (
        icon ?? (
          <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="8" cy="8" r="6.5" />
            {icons[resolvedTone]}
          </svg>
        )
      )}
      <div className="flex min-w-0 flex-col gap-1">
        {title && (
          <p data-slot="alert-title" className="font-semibold">
            {title}
          </p>
        )}
        {children && (
          <div data-slot="alert-description" className="text-sm text-ink-soft">
            {children}
          </div>
        )}
        {action && <div className="mt-2 flex flex-wrap gap-2">{action}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          aria-label={dismissLabel}
          onClick={onDismiss}
          className="absolute top-2 right-2 inline-flex size-8 cursor-pointer items-center justify-center rounded-md text-ink-muted transition-colors duration-200 hover:bg-ground hover:text-ink"
        >
          <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4">
            <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
