"use client";

import { ContextMenu as ContextMenuPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/registry/marcio/lib/utils";
import { menuContentClasses, menuItemClasses } from "@/registry/marcio/ui/dropdown-menu";

export const ContextMenu = ContextMenuPrimitive.Root;
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
export const ContextMenuGroup = ContextMenuPrimitive.Group;
export const ContextMenuSub = ContextMenuPrimitive.Sub;
export const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

export function ContextMenuContent({ className, ...props }: ComponentProps<typeof ContextMenuPrimitive.Content>) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content data-slot="context-menu-content" className={cn(menuContentClasses, className)} {...props} />
    </ContextMenuPrimitive.Portal>
  );
}

export type ContextMenuItemProps = ComponentProps<typeof ContextMenuPrimitive.Item> & {
  /** danger pinta o item de perigo, para ações destrutivas. */
  tone?: "neutral" | "danger";
  /** @deprecated Use tone. Sai na 0.21. */
  variant?: "default" | "danger";
  inset?: boolean;
};

export function ContextMenuItem({ className, tone, variant, inset = false, ...props }: ContextMenuItemProps) {
  const resolvedTone = tone ?? (variant === "danger" ? "danger" : "neutral");
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-tone={resolvedTone}
      data-variant={resolvedTone === "danger" ? "danger" : "default"}
      className={cn(
        menuItemClasses,
        resolvedTone === "danger" ? "text-danger-text data-[highlighted]:bg-danger-soft" : "text-ink",
        inset && "pl-8",
        className,
      )}
      {...props}
    />
  );
}

export function ContextMenuCheckboxItem({ className, children, ...props }: ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) {
  return (
    <ContextMenuPrimitive.CheckboxItem data-slot="context-menu-checkbox-item" className={cn(menuItemClasses, "pl-8 text-ink", className)} {...props}>
      <span className="absolute left-2 inline-flex size-4 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <Check aria-hidden="true" className="text-accent-text" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
}

export function ContextMenuRadioItem({ className, children, ...props }: ComponentProps<typeof ContextMenuPrimitive.RadioItem>) {
  return (
    <ContextMenuPrimitive.RadioItem data-slot="context-menu-radio-item" className={cn(menuItemClasses, "pl-8 text-ink", className)} {...props}>
      <span className="absolute left-2 inline-flex size-4 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <span className="block size-2 rounded-full bg-accent-text" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
}

export function ContextMenuLabel({ className, inset = false, ...props }: ComponentProps<typeof ContextMenuPrimitive.Label> & { inset?: boolean }) {
  return (
    <ContextMenuPrimitive.Label
      data-slot="context-menu-label"
      className={cn("px-2 py-1.5 font-mono text-mono-xs tracking-kicker text-ink-muted uppercase", inset && "pl-8", className)}
      {...props}
    />
  );
}

export function ContextMenuSeparator({ className, ...props }: ComponentProps<typeof ContextMenuPrimitive.Separator>) {
  return <ContextMenuPrimitive.Separator data-slot="context-menu-separator" className={cn("-mx-1 my-1 h-px bg-line", className)} {...props} />;
}

export function ContextMenuShortcut({ className, ...props }: ComponentProps<"span">) {
  return <span data-slot="context-menu-shortcut" className={cn("ml-auto font-mono text-mono-xs text-ink-muted", className)} {...props} />;
}

export function ContextMenuSubTrigger({ className, children, ...props }: ComponentProps<typeof ContextMenuPrimitive.SubTrigger>) {
  return (
    <ContextMenuPrimitive.SubTrigger
      data-slot="context-menu-sub-trigger"
      className={cn(menuItemClasses, "text-ink data-[state=open]:bg-accent-soft", className)}
      {...props}
    >
      {children}
      <ChevronRight aria-hidden="true" className="ml-auto text-ink-muted" />
    </ContextMenuPrimitive.SubTrigger>
  );
}

export function ContextMenuSubContent({ className, ...props }: ComponentProps<typeof ContextMenuPrimitive.SubContent>) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.SubContent data-slot="context-menu-sub-content" className={cn(menuContentClasses, className)} {...props} />
    </ContextMenuPrimitive.Portal>
  );
}
