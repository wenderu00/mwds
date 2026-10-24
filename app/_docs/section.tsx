import type { ReactNode } from "react";
import { cn } from "@/registry/marcio/lib/utils";
import { Kicker } from "@/registry/marcio/ui/kicker";
import { SectionTitle } from "@/registry/marcio/ui/section-title";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/registry/marcio/ui/table";
import { container } from "./site-header";

export type Theme = "dark" | "light";

export const themes: Theme[] = ["dark", "light"];

const themeLabel: Record<Theme, string> = { dark: "escuro", light: "claro" };

export type FoundationSectionProps = {
  id: string;
  index: string;
  kicker: string;
  title: ReactNode;
  intro?: ReactNode;
  band?: boolean;
  children: ReactNode;
};

export function FoundationSection({ id, index, kicker, title, intro, band = false, children }: FoundationSectionProps) {
  const titleId = `${id}-titulo`;
  return (
    <section id={id} aria-labelledby={titleId} className={cn("scroll-mt-20 border-t border-line", band && "bg-band")}>
      <div className={`${container} flex flex-col gap-10 py-20`}>
        <SectionTitle id={titleId} index={index} kicker={kicker}>
          {title}
        </SectionTitle>
        {intro && <div className="flex max-w-measure flex-col gap-3 text-ink-soft">{intro}</div>}
        {children}
      </div>
    </section>
  );
}

export function ThemePair({ children, className }: { children: (theme: Theme) => ReactNode; className?: string }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {themes.map((theme) => (
        <div key={theme} data-theme={theme} className={cn("flex min-w-0 flex-col gap-6 rounded-card border border-line bg-ground p-6 text-ink", className)}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Kicker className="text-mono-xs">tema {themeLabel[theme]}</Kicker>
            <code className="font-mono text-mono-xs text-ink-muted">data-theme=&quot;{theme}&quot;</code>
          </div>
          {children(theme)}
        </div>
      ))}
    </div>
  );
}

export function SpecTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <Table className="font-mono text-mono-xs">
      <TableHeader>
        <TableRow>
          {head.map((label) => (
            <TableHead key={label} scope="col">
              {label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <TableCell key={cellIndex} className={cellIndex === 0 ? "text-ink" : undefined}>
                {cell}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
