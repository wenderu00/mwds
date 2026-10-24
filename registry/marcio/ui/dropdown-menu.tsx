"use client";

import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/registry/marcio/lib/utils";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export const menuContentClasses =
  "z-popover min-w-48 overflow-hidden rounded-control border border-line-strong bg-surface p-1 text-ink motion-safe:data-[state=open]:animate-mw-fade-in";

export const menuItemClasses =
  "relative flex min-h-9 cursor-pointer items-center gap-2 rounded-mark px-2 py-1.5 text-base outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-accent-soft [&_svg]:size-4 [&_svg]:shrink-0";

export function DropdownMenuContent({ className, sideOffset = 6, align = "end", ...props }: ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        align={align}
        className={cn(menuContentClasses, className)}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

export type DropdownMenuItemProps = ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  variant?: "default" | "danger";
  inset?: boolean;
};

export function DropdownMenuItem({ className, variant = "default", inset = false, ...props }: DropdownMenuItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-variant={variant}
      className={cn(
        menuItemClasses,
        variant === "danger" ? "text-danger-text data-[highlighted]:bg-danger-soft" : "text-ink",
        inset && "pl-8",
        className,
      )}
      {...props}
    />
  );
}

const indicator = <Check aria-hidden="true" className="text-accent-text" />;

export function DropdownMenuCheckboxItem({ className, children, ...props }: ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(menuItemClasses, "pl-8 text-ink", className)}
      {...props}
    >
      <span className="absolute left-2 inline-flex size-4 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>{indicator}</DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

export function DropdownMenuRadioItem({ className, children, ...props }: ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem data-slot="dropdown-menu-radio-item" className={cn(menuItemClasses, "pl-8 text-ink", className)} {...props}>
      <span className="absolute left-2 inline-flex size-4 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <span className="block size-2 rounded-full bg-accent-text" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

export function DropdownMenuLabel({ className, inset = false, ...props }: ComponentProps<typeof DropdownMenuPrimitive.Label> & { inset?: boolean }) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      className={cn("px-2 py-1.5 font-mono text-mono-xs tracking-kicker text-ink-muted uppercase", inset && "pl-8", className)}
      {...props}
    />
  );
}

export function DropdownMenuSeparator({ className, ...props }: ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return <DropdownMenuPrimitive.Separator data-slot="dropdown-menu-separator" className={cn("-mx-1 my-1 h-px bg-line", className)} {...props} />;
}

export function DropdownMenuShortcut({ className, ...props }: ComponentProps<"span">) {
  return <span data-slot="dropdown-menu-shortcut" className={cn("ml-auto font-mono text-mono-xs text-ink-muted", className)} {...props} />;
}

export function DropdownMenuSubTrigger({ className, children, ...props }: ComponentProps<typeof DropdownMenuPrimitive.SubTrigger>) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      className={cn(menuItemClasses, "text-ink data-[state=open]:bg-accent-soft", className)}
      {...props}
    >
      {children}
      <ChevronRight aria-hidden="true" className="ml-auto text-ink-muted" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

export function DropdownMenuSubContent({ className, ...props }: ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.SubContent data-slot="dropdown-menu-sub-content" className={cn(menuContentClasses, className)} {...props} />
    </DropdownMenuPrimitive.Portal>
  );
}
