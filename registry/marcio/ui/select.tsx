"use client";

import { Select as SelectPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/registry/marcio/lib/utils";
import { useFormField } from "@/registry/marcio/ui/form-field";

export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

export function SelectTrigger({ className, children, ...props }: ComponentProps<typeof SelectPrimitive.Trigger>) {
  const field = useFormField();
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      {...field?.controlProps}
      className={cn(
        "flex h-control w-full min-w-0 cursor-pointer items-center justify-between gap-2 rounded-control border border-line-control bg-ground px-3 text-left text-base text-ink transition-colors duration-base ease-standard hover:border-accent-line disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger-text data-[placeholder]:text-ink-muted [&>span]:truncate",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown aria-hidden="true" className="size-4 shrink-0 text-ink-muted" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

export function SelectContent({
  className,
  children,
  position = "popper",
  sideOffset = 6,
  ...props
}: ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        position={position}
        sideOffset={sideOffset}
        className={cn(
          "relative z-popover max-h-(--radix-select-content-available-height) min-w-(--radix-select-trigger-width) overflow-hidden rounded-control border border-line-strong bg-surface text-ink motion-safe:data-[state=open]:animate-mw-fade-in",
          className,
        )}
        {...props}
      >
        <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

export function SelectLabel({ className, ...props }: ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("px-2 py-1.5 font-mono text-mono-xs tracking-kicker text-ink-muted uppercase", className)}
      {...props}
    />
  );
}

export function SelectItem({ className, children, ...props }: ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex min-h-9 cursor-pointer items-center rounded-mark py-1.5 pr-8 pl-2 text-base text-ink outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-accent-soft",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute right-2 inline-flex text-accent-text">
        <Check aria-hidden="true" className="size-4" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

export function SelectSeparator({ className, ...props }: ComponentProps<typeof SelectPrimitive.Separator>) {
  return <SelectPrimitive.Separator data-slot="select-separator" className={cn("-mx-1 my-1 h-px bg-line", className)} {...props} />;
}
