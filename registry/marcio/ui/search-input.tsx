"use client";

import { Search, X } from "lucide-react";
import { useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { cn } from "@/registry/marcio/lib/utils";
import { IconButton } from "@/registry/marcio/ui/icon-button";
import { Input, type InputProps } from "@/registry/marcio/ui/input";

export type SearchInputProps = Omit<InputProps, "type" | "start" | "end" | "value" | "defaultValue"> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  clearLabel?: string;
};

export function SearchInput({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  clearLabel = "Limpar busca",
  placeholder = "Buscar",
  size,
  disabled,
  onChange,
  onKeyDown,
  ref,
  className,
  ...props
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [innerValue, setInnerValue] = useState(defaultValue);
  const value = controlledValue === undefined ? innerValue : controlledValue;

  function change(next: string) {
    if (controlledValue === undefined) setInnerValue(next);
    onValueChange?.(next);
  }

  return (
    <Input
      data-slot="search-input"
      type="search"
      enterKeyHint="search"
      autoComplete="off"
      placeholder={placeholder}
      size={size}
      disabled={disabled}
      {...props}
      className={cn("[&::-webkit-search-cancel-button]:appearance-none", className)}
      value={value}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        change(event.target.value);
        onChange?.(event);
      }}
      onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
        onKeyDown?.(event);
        if (event.key === "Escape" && value !== "" && !event.defaultPrevented) {
          event.preventDefault();
          change("");
        }
      }}
      ref={(node) => {
        inputRef.current = node;
        if (typeof ref === "function") return ref(node);
        if (ref) ref.current = node;
      }}
      start={<Search aria-hidden="true" />}
      end={
        value !== "" && !disabled ? (
          <IconButton
            size="sm"
            aria-label={clearLabel}
            className={cn(size === "sm" && "size-7")}
            onClick={() => {
              change("");
              inputRef.current?.focus();
            }}
          >
            <X aria-hidden="true" />
          </IconButton>
        ) : undefined
      }
    />
  );
}
