"use client";

import { useId, type ReactNode } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, type TooltipContentProps } from "recharts";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { cn } from "@/registry/marcio/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/registry/marcio/ui/table";

export type ChartSeries = { key: string; label: string };

export type ChartDatum = Record<string, string | number>;

export type ChartProps = {
  kind: "bar" | "line" | "area";
  title: ReactNode;
  description?: ReactNode;
  data: ChartDatum[];
  categoryKey: string;
  series: ChartSeries[];
  palette?: "categorica" | "sequencial";
  unit?: string;
  stacked?: boolean;
  height?: number;
  tableLabel?: string;
  className?: string;
};

const number = new Intl.NumberFormat("pt-BR");

// Cores só por variável: os tokens chart-1..8 e seq-1..5 mudam com o tema.
const colorOf = (palette: ChartProps["palette"], index: number) =>
  palette === "sequencial" ? `var(--color-seq-${5 - (index % 5)})` : `var(--color-chart-${(index % 8) + 1})`;

const axisTick = { fill: "var(--color-ink-muted)", fontSize: 12, fontFamily: "var(--font-mono)" };

export function Chart({
  kind,
  title,
  description,
  data,
  categoryKey,
  series,
  palette = "categorica",
  unit,
  stacked = false,
  height = 260,
  tableLabel = "ver os dados em tabela",
  className,
}: ChartProps) {
  const id = useId();
  const format = (value: number) => (unit ? `${number.format(value)} ${unit}` : number.format(value));
  const color = (index: number) => colorOf(palette, index);

  const tooltip = (
    <Tooltip
      cursor={{ fill: "var(--color-surface)", stroke: "var(--color-line-strong)" }}
      content={(props: TooltipContentProps<ValueType, NameType>) => <ChartTooltip {...props} format={format} series={series} />}
      isAnimationActive={false}
    />
  );
  const grid = <CartesianGrid vertical={false} stroke="var(--color-line)" />;
  const xAxis = <XAxis dataKey={categoryKey} tick={axisTick} tickLine={false} axisLine={{ stroke: "var(--color-line-strong)" }} />;
  const yAxis = <YAxis tick={axisTick} tickLine={false} axisLine={false} width={48} tickFormatter={(value: number) => number.format(value)} />;
  const stackId = stacked ? "total" : undefined;

  return (
    <figure data-slot="chart" className={cn("flex min-w-0 flex-col gap-3", className)}>
      <figcaption id={`${id}-titulo`} className="flex flex-col gap-1">
        <span className="font-medium text-ink">{title}</span>
        {description && <span className="text-sm text-ink-soft">{description}</span>}
      </figcaption>
      <ul aria-label="Legenda" className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-mono-xs text-ink-soft">
        {series.map((item, index) => (
          <li key={item.key} className="flex items-center gap-1.5">
            <span aria-hidden="true" className="size-2.5 rounded-full" style={{ background: color(index) }} />
            {item.label}
          </li>
        ))}
      </ul>
      <div role="group" aria-labelledby={`${id}-titulo`} style={{ height }} className="w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          {kind === "bar" ? (
            <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              {grid}
              {xAxis}
              {yAxis}
              {tooltip}
              {series.map((item, index) => (
                <Bar key={item.key} dataKey={item.key} name={item.label} fill={color(index)} radius={stacked ? 0 : [4, 4, 0, 0]} stackId={stackId} isAnimationActive={false} />
              ))}
            </BarChart>
          ) : kind === "line" ? (
            <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              {grid}
              {xAxis}
              {yAxis}
              {tooltip}
              {series.map((item, index) => (
                <Line
                  key={item.key}
                  type="monotone"
                  dataKey={item.key}
                  name={item.label}
                  stroke={color(index)}
                  strokeWidth={2}
                  dot={{ r: 3, fill: color(index), stroke: "var(--color-ground)", strokeWidth: 1 }}
                  activeDot={{ r: 5, stroke: "var(--color-ground)" }}
                  isAnimationActive={false}
                />
              ))}
            </LineChart>
          ) : (
            <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              {grid}
              {xAxis}
              {yAxis}
              {tooltip}
              {series.map((item, index) => (
                <Area
                  key={item.key}
                  type="monotone"
                  dataKey={item.key}
                  name={item.label}
                  stroke={color(index)}
                  strokeWidth={2}
                  fill={color(index)}
                  fillOpacity={0.18}
                  stackId={stackId}
                  isAnimationActive={false}
                />
              ))}
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
      <details className="group">
        <summary className="w-fit cursor-pointer rounded-mark font-mono text-mono-xs text-accent-text underline-offset-4 hover:underline">{tableLabel}</summary>
        <Table className="mt-3 font-mono text-mono-xs">
          <TableHeader>
            <TableRow>
              <TableHead scope="col">{categoryKey}</TableHead>
              {series.map((item) => (
                <TableHead key={item.key} scope="col" className="text-right">
                  {item.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={String(row[categoryKey])}>
                <TableHead scope="row" className="font-normal text-ink">
                  {row[categoryKey]}
                </TableHead>
                {series.map((item) => (
                  <TableCell key={item.key} className="text-right">
                    {format(Number(row[item.key] ?? 0))}
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

function ChartTooltip({
  active,
  payload,
  label,
  format,
  series,
}: TooltipContentProps<ValueType, NameType> & { format: (value: number) => string; series: ChartSeries[] }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="flex min-w-36 flex-col gap-1.5 rounded-control border border-line-strong bg-surface px-3 py-2 text-sm text-ink">
      <span className="font-mono text-mono-xs text-ink-muted">{label}</span>
      {payload.map((entry) => (
        <span key={String(entry.dataKey)} className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true" className="size-2 rounded-full" style={{ background: entry.color }} />
            {series.find((item) => item.key === entry.dataKey)?.label ?? entry.name}
          </span>
          <span className="font-mono text-mono-xs">{format(Number(entry.value))}</span>
        </span>
      ))}
    </div>
  );
}
