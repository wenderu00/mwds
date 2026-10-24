"use client";

import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import type { ComponentProps } from "react";
import { DayPicker } from "react-day-picker";
import { ptBR } from "react-day-picker/locale";
import { cn } from "@/registry/marcio/lib/utils";

const chevrons = { left: ChevronLeft, right: ChevronRight, up: ChevronUp, down: ChevronDown };

const navButton =
  "inline-flex size-9 cursor-pointer items-center justify-center rounded-control border border-line-control text-ink transition-colors duration-base hover:border-accent-line hover:text-accent-text aria-disabled:cursor-not-allowed aria-disabled:opacity-50 [&_svg]:size-4";

const weekdays = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];

export type CalendarProps = ComponentProps<typeof DayPicker>;

export function Calendar({ className, classNames, components, formatters, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      data-slot="calendar"
      locale={ptBR}
      weekStartsOn={0}
      showOutsideDays={showOutsideDays}
      className={cn("w-fit text-ink", className)}
      classNames={{
        months: "relative flex flex-col gap-6 sm:flex-row",
        month: "flex flex-col gap-3",
        nav: "absolute inset-x-0 top-0 flex items-center justify-between",
        button_previous: navButton,
        button_next: navButton,
        month_caption: "flex h-9 items-center justify-center",
        caption_label: "font-mono text-mono-sm font-medium first-letter:uppercase",
        month_grid: "border-collapse",
        weekdays: "flex",
        weekday: "flex size-control items-center justify-center font-mono text-mono-xs font-normal text-ink-muted uppercase",
        week: "flex",
        day: "group/day size-control p-0 text-center",
        day_button:
          "inline-flex size-full cursor-pointer items-center justify-center rounded-control border border-transparent text-sm transition-colors duration-fast hover:border-accent-line group-data-[today]/day:border-line-strong group-data-[today]/day:font-semibold group-data-[outside]/day:text-ink-muted group-data-[selected]/day:bg-accent group-data-[selected]/day:font-semibold group-data-[selected]/day:text-on-accent disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-transparent",
        range_middle: "[&>button]:rounded-none [&>button]:bg-accent-soft! [&>button]:text-ink! [&>button]:font-normal!",
        range_start: "[&>button]:rounded-r-none",
        range_end: "[&>button]:rounded-l-none",
        today: "",
        outside: "",
        disabled: "",
        hidden: "invisible",
        ...classNames,
      }}
      formatters={{ formatWeekdayName: (date) => weekdays[date.getDay()]!, ...formatters }}
      components={{
        Chevron: ({ orientation = "left", className: chevronClassName }) => {
          const Icon = chevrons[orientation];
          return <Icon aria-hidden="true" className={chevronClassName} />;
        },
        ...components,
      }}
      {...props}
    />
  );
}
