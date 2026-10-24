import type { ReactNode } from "react";
import { cn } from "@/registry/marcio/lib/utils";

export type PreviewTheme = "dark" | "light";

const themeLabel: Record<PreviewTheme, string> = { dark: "escuro", light: "claro" };

export function Preview({
  render,
  code,
  className,
  stacked = false,
}: {
  render: (theme: PreviewTheme) => ReactNode;
  code?: string;
  className?: string;
  stacked?: boolean;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-card border border-line">
      <div className={cn("grid", !stacked && "md:grid-cols-2")}>
        {(["dark", "light"] as const).map((theme) => (
          <div
            key={theme}
            data-theme={theme}
            className={cn(
              "relative isolate flex flex-col gap-4 bg-ground p-6 text-ink not-last:border-b not-last:border-line",
              !stacked && "md:not-last:border-r md:not-last:border-b-0",
            )}
          >
            <p className="font-mono text-mono-xs text-ink-muted">{`// ${themeLabel[theme]}`}</p>
            <div className={cn("flex flex-wrap items-center gap-3", className)}>{render(theme)}</div>
          </div>
        ))}
      </div>
      {code && (
        <pre tabIndex={0} className="overflow-x-auto border-t border-line bg-band p-4 font-mono text-mono-xs text-ink-soft">
          <code>{code.trim()}</code>
        </pre>
      )}
    </div>
  );
}
