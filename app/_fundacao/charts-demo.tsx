"use client";

import { useId, useState } from "react";
import { cn } from "@/registry/marcio/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/registry/marcio/ui/table";

export type ChartSeries = { name: string; values: number[] };

const fills = ["fill-chart-1", "fill-chart-2", "fill-chart-3", "fill-chart-4", "fill-chart-5", "fill-chart-6", "fill-chart-7", "fill-chart-8"];
const strokes = ["stroke-chart-1", "stroke-chart-2", "stroke-chart-3", "stroke-chart-4", "stroke-chart-5", "stroke-chart-6", "stroke-chart-7", "stroke-chart-8"];
const swatches = ["bg-chart-1", "bg-chart-2", "bg-chart-3", "bg-chart-4", "bg-chart-5", "bg-chart-6", "bg-chart-7", "bg-chart-8"];

const width = 640;
const height = 260;
const pad = { top: 16, right: 112, bottom: 32, left: 44 };
const innerW = width - pad.left - pad.right;
const innerH = height - pad.top - pad.bottom;
const number = new Intl.NumberFormat("pt-BR");

function niceMax(value: number) {
  const step = 10 ** Math.floor(Math.log10(value));
  return Math.ceil(value / step) * step;
}

// Barra com as pontas de cima arredondadas e a base reta, presa à linha zero.
function barPath(x: number, y: number, w: number, h: number) {
  const r = Math.min(4, w / 2, h);
  return `M${x},${y + h}V${y + r}Q${x},${y} ${x + r},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${y + h}Z`;
}

export function Chart({ kind, title, categories, series, unit }: { kind: "bar" | "line"; title: string; categories: string[]; series: ChartSeries[]; unit: string }) {
  const id = useId();
  const [active, setActive] = useState<number | null>(null);
  const max = niceMax(Math.max(...series.flatMap((s) => s.values)));
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * max);
  const band = innerW / categories.length;
  const y = (value: number) => pad.top + innerH - (value / max) * innerH;
  const cx = (index: number) => pad.left + band * index + band / 2;
  const format = (value: number) => `${number.format(value)} ${unit}`;

  const groupW = band * 0.64;
  const gap = 2;
  const barW = (groupW - gap * (series.length - 1)) / series.length;

  return (
    <figure className="flex min-w-0 flex-col gap-3">
      <figcaption id={`${id}-titulo`} className="font-medium text-ink">
        {title}
      </figcaption>
      <ul aria-label="Legenda" className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-mono-xs text-ink-soft">
        {series.map((s, i) => (
          <li key={s.name} className="flex items-center gap-1.5">
            <span aria-hidden="true" className={cn("size-2.5 rounded-full", swatches[i])} />
            {s.name}
          </li>
        ))}
      </ul>
      <div className="relative">
        <svg viewBox={`0 0 ${width} ${height}`} role="group" aria-labelledby={`${id}-titulo`} className="h-auto w-full overflow-visible" onMouseLeave={() => setActive(null)}>
          {ticks.map((tick) => (
            <g key={tick}>
              <line x1={pad.left} x2={pad.left + innerW} y1={y(tick)} y2={y(tick)} className={tick === 0 ? "stroke-line-strong" : "stroke-line"} strokeWidth={1} />
              <text x={pad.left - 8} y={y(tick)} dy="0.32em" textAnchor="end" className="fill-ink-muted font-mono text-[11px]">
                {number.format(tick)}
              </text>
            </g>
          ))}
          {categories.map((category, i) => (
            <text key={category} x={cx(i)} y={height - 10} textAnchor="middle" className="fill-ink-muted font-mono text-[11px]">
              {category}
            </text>
          ))}

          {active !== null && kind === "line" && (
            <line x1={cx(active)} x2={cx(active)} y1={pad.top} y2={pad.top + innerH} className="stroke-line-strong" strokeWidth={1} strokeDasharray="3 3" />
          )}

          {kind === "bar" &&
            series.map((s, si) =>
              s.values.map((value, ci) => {
                const x = cx(ci) - groupW / 2 + si * (barW + gap);
                return (
                  <path
                    key={`${s.name}-${ci}`}
                    d={barPath(x, y(value), barW, y(0) - y(value))}
                    className={cn(fills[si], "transition-opacity duration-fast", active !== null && active !== ci && "opacity-40")}
                  />
                );
              }),
            )}

          {kind === "line" &&
            series.map((s, si) => {
              const points = s.values.map((value, ci) => `${cx(ci)},${y(value)}`).join(" ");
              const last = s.values.length - 1;
              return (
                <g key={s.name}>
                  <polyline points={points} fill="none" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" className={strokes[si]} />
                  {s.values.map((value, ci) => (
                    <circle key={ci} cx={cx(ci)} cy={y(value)} r={active === ci ? 5 : 4} strokeWidth={2} className={cn(fills[si], "stroke-ground")} />
                  ))}
                  <text x={cx(last) + 12} y={y(s.values[last]!)} dy="0.32em" className="fill-ink-soft font-mono text-[11px]">
                    {s.name}
                  </text>
                </g>
              );
            })}

          {categories.map((category, ci) => (
            <rect
              key={category}
              x={pad.left + band * ci}
              y={pad.top}
              width={band}
              height={innerH}
              fill="transparent"
              tabIndex={0}
              role="img"
              aria-label={`${category}: ${series.map((s) => `${s.name} ${format(s.values[ci]!)}`).join(", ")}`}
              className="cursor-crosshair outline-none focus-visible:stroke-focus"
              strokeWidth={2}
              onMouseEnter={() => setActive(ci)}
              onFocus={() => setActive(ci)}
              onBlur={() => setActive(null)}
            />
          ))}
        </svg>

        {active !== null && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-2 z-base flex min-w-36 -translate-x-1/2 flex-col gap-1 rounded-control border border-line-strong bg-surface px-3 py-2 font-mono text-mono-xs text-ink"
            style={{ left: `${(cx(active) / width) * 100}%` }}
          >
            <span className="text-ink-muted">{categories[active]}</span>
            {series.map((s, i) => (
              <span key={s.name} className="flex items-center gap-2">
                <span className={cn("size-2 rounded-full", swatches[i])} />
                <span className="flex-1 text-ink-soft">{s.name}</span>
                <span>{format(s.values[active]!)}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      <details className="font-mono text-mono-xs text-ink-muted">
        <summary className="cursor-pointer rounded-mark hover:text-ink">ver os dados em tabela</summary>
        <Table className="mt-3 font-sans text-sm">
          <TableHeader>
            <TableRow>
              <TableHead>{kind === "bar" ? "trimestre" : "mês"}</TableHead>
              {series.map((s) => (
                <TableHead key={s.name} className="text-right">
                  {s.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category, ci) => (
              <TableRow key={category}>
                <TableCell className="text-ink">{category}</TableCell>
                {series.map((s) => (
                  <TableCell key={s.name} className="text-right font-mono text-mono-xs">
                    {format(s.values[ci]!)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </details>
    </figure>
  );
}
