"use client";

import { useId, useState, type ComponentProps, type ReactNode } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/registry/marcio/lib/utils";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/registry/marcio/ui/command";
import { useFormField } from "@/registry/marcio/ui/form-field";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/marcio/ui/popover";

export type ComboboxOption = {
  value: string;
  label: string;
  keywords?: string[];
  disabled?: boolean;
};

export type ComboboxProps = Omit<ComponentProps<"button">, "value" | "defaultValue" | "onChange"> & {
  options: ComboboxOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: ReactNode;
  searchPlaceholder?: string;
  emptyText?: ReactNode;
  listLabel?: string;
  name?: string;
};

export function Combobox({
  options,
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  placeholder = "Selecione",
  searchPlaceholder = "Buscar",
  emptyText = "Nada encontrado",
  listLabel = "Opções",
  name,
  className,
  disabled,
  ...props
}: ComboboxProps) {
  const field = useFormField();
  const contentId = useId();
  const [open, setOpen] = useState(false);
  const [innerValue, setInnerValue] = useState(defaultValue);
  const value = controlledValue ?? innerValue;
  const selected = options.find((option) => option.value === value);

  function select(next: string) {
    const resolved = next === value ? "" : next;
    if (controlledValue === undefined) setInnerValue(resolved);
    onValueChange?.(resolved);
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-controls={contentId}
          aria-haspopup="listbox"
          data-slot="combobox-trigger"
          data-placeholder={selected ? undefined : ""}
          disabled={disabled}
          {...field?.controlProps}
          className={cn(
            "flex h-control w-full min-w-0 cursor-pointer items-center justify-between gap-2 rounded-control border border-line-control bg-ground px-3 text-left text-base text-ink transition-colors duration-base ease-standard hover:border-accent-line disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger-text data-[placeholder]:text-ink-muted",
            className,
          )}
          {...props}
        >
          <span className="truncate">{selected ? selected.label : placeholder}</span>
          <ChevronsUpDown aria-hidden="true" className="size-4 shrink-0 text-ink-muted" />
        </button>
      </PopoverTrigger>
      {name && <input type="hidden" name={name} value={value} />}
      <PopoverContent
        id={contentId}
        aria-labelledby={field?.labelId}
        aria-label={field ? undefined : (props["aria-label"] ?? searchPlaceholder)}
        className="w-(--radix-popover-trigger-width) min-w-56 p-0"
      >
        <Command label={searchPlaceholder}>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList label={listLabel}>
            <CommandEmpty>{emptyText}</CommandEmpty>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                keywords={[option.label, ...(option.keywords ?? [])]}
                disabled={option.disabled}
                onSelect={select}
                data-checked={option.value === value || undefined}
              >
                <span className="truncate">{option.label}</span>
                {option.value === value && (
                  <Check aria-hidden="true" className="ml-auto text-accent-text" />
                )}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
