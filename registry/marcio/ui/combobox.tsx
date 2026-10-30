"use client";

import { useId, useState, type ComponentProps, type ReactNode } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/registry/marcio/lib/utils";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/registry/marcio/ui/command";
import { useFormField } from "@/registry/marcio/ui/form-field";
import { controlHeights, triggerClasses, type ControlSize } from "@/registry/marcio/ui/input";
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
  size?: ControlSize;
  /** Liga a busca no servidor: as opções não são filtradas aqui e cada tecla chega neste callback, com "" ao fechar. Aplique debounce em quem busca. */
  onSearchChange?: (search: string) => void;
  /** Mostra loadingText no lugar do estado vazio. */
  loading?: boolean;
  loadingText?: ReactNode;
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
  size = "md",
  onSearchChange,
  loading = false,
  loadingText = "Carregando",
  className,
  disabled,
  ...props
}: ComboboxProps) {
  const field = useFormField();
  const contentId = useId();
  const [open, setOpen] = useState(false);
  const [innerValue, setInnerValue] = useState(defaultValue);
  const [picked, setPicked] = useState<ComboboxOption>();
  const value = controlledValue ?? innerValue;
  const selected = options.find((option) => option.value === value) ?? (picked?.value === value ? picked : undefined);

  function changeOpen(next: boolean) {
    setOpen(next);
    if (!next) onSearchChange?.("");
  }

  function select(next: string) {
    const resolved = next === value ? "" : next;
    if (controlledValue === undefined) setInnerValue(resolved);
    setPicked(options.find((option) => option.value === resolved));
    onValueChange?.(resolved);
    changeOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={changeOpen}>
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
            triggerClasses,
            controlHeights[size],
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
        <Command label={searchPlaceholder} shouldFilter={onSearchChange ? false : undefined}>
          <CommandInput placeholder={searchPlaceholder} onValueChange={onSearchChange} />
          {loading && (
            <div role="status" className="px-3 py-2 text-center font-mono text-mono-xs text-ink-muted">
              {loadingText}
            </div>
          )}
          <CommandList label={listLabel}>
            {!loading && <CommandEmpty>{emptyText}</CommandEmpty>}
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
