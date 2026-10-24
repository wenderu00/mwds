"use client";

import { CalendarDays, X } from "lucide-react";
import { useId, useRef, useState, type ComponentProps, type ReactNode } from "react";
import type { DateRange } from "react-day-picker";
import { cn } from "@/registry/marcio/lib/utils";
import { Calendar } from "@/registry/marcio/ui/calendar";
import { useFormField } from "@/registry/marcio/ui/form-field";
import { IconButton } from "@/registry/marcio/ui/icon-button";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/marcio/ui/popover";

export type { DateRange };

const dateFormat = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });

export function formatDate(date: Date) {
  return dateFormat.format(date);
}

const triggerClasses =
  "flex h-control w-full min-w-0 cursor-pointer items-center gap-2 rounded-control border border-line-control bg-ground px-3 text-left text-base text-ink transition-colors duration-base ease-standard hover:border-accent-line disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger-text data-[placeholder]:text-ink-muted";

type PickerBaseProps = Omit<ComponentProps<"button">, "value" | "defaultValue" | "onChange" | "children"> & {
  placeholder?: ReactNode;
  fromDate?: Date;
  toDate?: Date;
  clearable?: boolean;
  clearLabel?: string;
  name?: string;
};

type PickerShellProps = Omit<PickerBaseProps, "fromDate" | "toDate"> & {
  label: string | null;
  hiddenValue: string;
  hasValue: boolean;
  onClear: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  calendar: ReactNode;
};

function PickerShell({
  label,
  hiddenValue,
  hasValue,
  onClear,
  open,
  onOpenChange,
  calendar,
  placeholder,
  clearable = false,
  clearLabel = "Limpar data",
  name,
  className,
  disabled,
  ref,
  ...props
}: PickerShellProps) {
  const field = useFormField();
  const contentId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <div data-slot="date-picker" className={cn("relative flex w-full min-w-0 items-center", className)}>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-haspopup="dialog"
            aria-controls={contentId}
            data-placeholder={hasValue ? undefined : ""}
            disabled={disabled}
            {...field?.controlProps}
            className={cn(triggerClasses, clearable && hasValue && "pr-12")}
            {...props}
            ref={(node) => {
              triggerRef.current = node;
              if (typeof ref === "function") return ref(node);
              if (ref) ref.current = node;
            }}
          >
            <CalendarDays aria-hidden="true" className="size-4 shrink-0 text-ink-muted" />
            <span className="truncate">{label ?? placeholder}</span>
          </button>
        </PopoverTrigger>
        {clearable && hasValue && !disabled && (
          <IconButton
            size="sm"
            aria-label={clearLabel}
            className="absolute right-1"
            onClick={() => {
              onClear();
              triggerRef.current?.focus();
            }}
          >
            <X aria-hidden="true" />
          </IconButton>
        )}
      </div>
      {name && <input type="hidden" name={name} value={hiddenValue} />}
      <PopoverContent
        id={contentId}
        aria-labelledby={field?.labelId}
        aria-label={field ? undefined : (props["aria-label"] ?? "Calendário")}
        className="w-auto p-3"
      >
        {calendar}
      </PopoverContent>
    </Popover>
  );
}

const isoDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

function boundsOf(fromDate?: Date, toDate?: Date) {
  const disabled = [...(fromDate ? [{ before: fromDate }] : []), ...(toDate ? [{ after: toDate }] : [])];
  return { startMonth: fromDate, endMonth: toDate, disabled: disabled.length ? disabled : undefined };
}

export type DatePickerProps = PickerBaseProps & {
  value?: Date | null;
  defaultValue?: Date | null;
  onValueChange?: (date: Date | null) => void;
};

export function DatePicker({
  value: controlledValue,
  defaultValue = null,
  onValueChange,
  placeholder = "dd/mm/aaaa",
  fromDate,
  toDate,
  ...props
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [innerValue, setInnerValue] = useState(defaultValue);
  const value = controlledValue === undefined ? innerValue : controlledValue;

  function change(next: Date | null) {
    if (controlledValue === undefined) setInnerValue(next);
    onValueChange?.(next);
  }

  return (
    <PickerShell
      {...props}
      placeholder={placeholder}
      label={value ? formatDate(value) : null}
      hiddenValue={value ? isoDate(value) : ""}
      hasValue={value !== null}
      onClear={() => change(null)}
      open={open}
      onOpenChange={setOpen}
      calendar={
        <Calendar
          mode="single"
          autoFocus
          selected={value ?? undefined}
          defaultMonth={value ?? undefined}
          onSelect={(date) => {
            change(date ?? null);
            setOpen(false);
          }}
          {...boundsOf(fromDate, toDate)}
        />
      }
    />
  );
}

export type DateRangePickerProps = PickerBaseProps & {
  value?: DateRange | null;
  defaultValue?: DateRange | null;
  onValueChange?: (range: DateRange | null) => void;
  numberOfMonths?: number;
};

export function DateRangePicker({
  value: controlledValue,
  defaultValue = null,
  onValueChange,
  placeholder = "dd/mm/aaaa até dd/mm/aaaa",
  clearLabel = "Limpar período",
  numberOfMonths = 2,
  fromDate,
  toDate,
  ...props
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [innerValue, setInnerValue] = useState(defaultValue);
  const value = controlledValue === undefined ? innerValue : controlledValue;

  function change(next: DateRange | null) {
    if (controlledValue === undefined) setInnerValue(next);
    onValueChange?.(next);
  }

  const label = value?.from ? `${formatDate(value.from)} até ${value.to ? formatDate(value.to) : "..."}` : null;

  return (
    <PickerShell
      {...props}
      placeholder={placeholder}
      clearLabel={clearLabel}
      label={label}
      hiddenValue={value?.from ? `${isoDate(value.from)}/${value.to ? isoDate(value.to) : ""}` : ""}
      hasValue={Boolean(value?.from)}
      onClear={() => change(null)}
      open={open}
      onOpenChange={setOpen}
      calendar={
        <Calendar
          mode="range"
          autoFocus
          numberOfMonths={numberOfMonths}
          selected={value ?? undefined}
          defaultMonth={value?.from}
          onSelect={(range) => {
            change(range?.from ? range : null);
            if (range?.from && range.to && range.from.getTime() !== range.to.getTime()) setOpen(false);
          }}
          {...boundsOf(fromDate, toDate)}
        />
      }
    />
  );
}
