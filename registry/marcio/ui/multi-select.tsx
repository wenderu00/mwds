"use client";

import { Check, ChevronsUpDown, X } from "lucide-react";
import { useId, useRef, useState, type ComponentProps, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/registry/marcio/lib/utils";
import { Badge } from "@/registry/marcio/ui/badge";
import type { ComboboxOption } from "@/registry/marcio/ui/combobox";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/registry/marcio/ui/command";
import { useFormField } from "@/registry/marcio/ui/form-field";
import type { ControlSize } from "@/registry/marcio/ui/input";
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from "@/registry/marcio/ui/popover";

export type MultiSelectOption = ComboboxOption;

const minHeights: Record<ControlSize, string> = { sm: "min-h-9", md: "min-h-control", lg: "min-h-12" };

export type MultiSelectProps = Omit<ComponentProps<"button">, "value" | "defaultValue" | "onChange"> & {
  options: MultiSelectOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: ReactNode;
  addLabel?: ReactNode;
  searchPlaceholder?: string;
  emptyText?: ReactNode;
  listLabel?: string;
  removeLabel?: (label: string) => string;
  name?: string;
  size?: ControlSize;
};

export function MultiSelect({
  options,
  value: controlledValue,
  defaultValue = [],
  onValueChange,
  placeholder = "Selecione",
  addLabel = "Adicionar",
  searchPlaceholder = "Buscar",
  emptyText = "Nada encontrado",
  listLabel = "Opções",
  removeLabel = (label) => `Remover ${label}`,
  name,
  size = "md",
  className,
  disabled,
  onKeyDown,
  ref,
  ...props
}: MultiSelectProps) {
  const field = useFormField();
  const contentId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [innerValue, setInnerValue] = useState(defaultValue);
  const value = controlledValue ?? innerValue;
  const selected = value.map((item) => options.find((option) => option.value === item)).filter((option) => option !== undefined);

  function change(next: string[]) {
    if (controlledValue === undefined) setInnerValue(next);
    onValueChange?.(next);
  }

  function toggle(item: string) {
    change(value.includes(item) ? value.filter((current) => current !== item) : [...value, item]);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    onKeyDown?.(event);
    if (event.key === "Backspace" && value.length && !event.defaultPrevented) {
      event.preventDefault();
      change(value.slice(0, -1));
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverAnchor asChild>
        <div
          data-slot="multi-select"
          data-disabled={disabled || undefined}
          className={cn(
            "flex w-full min-w-0 flex-wrap items-center gap-1.5 rounded-control border border-line-control bg-ground py-1 pr-1 pl-2 transition-colors duration-base ease-standard hover:border-accent-line has-[[aria-invalid=true]]:border-danger-text data-[disabled]:opacity-50",
            minHeights[size],
            className,
          )}
        >
          {selected.map((option) => (
            <Badge key={option.value} tone="neutral" className="gap-1 pr-0.5">
              {option.label}
              <button
                type="button"
                aria-label={removeLabel(option.label)}
                disabled={disabled}
                onClick={() => {
                  toggle(option.value);
                  triggerRef.current?.focus();
                }}
                className="inline-flex cursor-pointer items-center rounded-mark p-0.5 text-ink-muted transition-colors duration-base hover:bg-line hover:text-ink disabled:cursor-not-allowed"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            </Badge>
          ))}
          <PopoverTrigger asChild>
            <button
              type="button"
              role="combobox"
              aria-expanded={open}
              aria-controls={contentId}
              aria-haspopup="listbox"
              data-slot="multi-select-trigger"
              data-placeholder={selected.length ? undefined : ""}
              disabled={disabled}
              {...field?.controlProps}
              onKeyDown={handleKeyDown}
              className="flex min-h-7 min-w-24 flex-1 cursor-pointer items-center justify-between gap-2 rounded-mark px-1 text-left text-base text-ink data-[placeholder]:text-ink-muted disabled:cursor-not-allowed"
              {...props}
              ref={(node) => {
                triggerRef.current = node;
                if (typeof ref === "function") return ref(node);
                if (ref) ref.current = node;
              }}
            >
              <span className={cn("truncate", selected.length > 0 && "text-sm text-ink-muted")}>{selected.length ? addLabel : placeholder}</span>
              <span className="sr-only">{selected.length ? `, ${selected.length} selecionados: ${selected.map((option) => option.label).join(", ")}` : ""}</span>
              <ChevronsUpDown aria-hidden="true" className="size-4 shrink-0 text-ink-muted" />
            </button>
          </PopoverTrigger>
        </div>
      </PopoverAnchor>
      {name && value.map((item) => <input key={item} type="hidden" name={name} value={item} />)}
      <PopoverContent
        id={contentId}
        aria-labelledby={field?.labelId}
        aria-label={field ? undefined : (props["aria-label"] ?? searchPlaceholder)}
        className="w-(--radix-popper-anchor-width) min-w-64 p-0"
      >
        <Command label={searchPlaceholder}>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList label={listLabel}>
            <CommandEmpty>{emptyText}</CommandEmpty>
            {options.map((option) => {
              const checked = value.includes(option.value);
              return (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  keywords={[option.label, ...(option.keywords ?? [])]}
                  disabled={option.disabled}
                  onSelect={toggle}
                  aria-checked={checked}
                  data-checked={checked || undefined}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-mark border",
                      checked ? "border-accent-edge bg-accent text-on-accent" : "border-line-control",
                    )}
                  >
                    {checked && <Check className="size-4" strokeWidth={3} />}
                  </span>
                  <span className="truncate">{option.label}</span>
                </CommandItem>
              );
            })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
