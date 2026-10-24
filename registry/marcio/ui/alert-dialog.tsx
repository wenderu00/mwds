"use client";

import { AlertDialog as AlertDialogPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/registry/marcio/lib/utils";
import { Button, type ButtonProps } from "@/registry/marcio/ui/button";

export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const alertDialogSizes = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-lg" } as const;

export type AlertDialogContentProps = ComponentProps<typeof AlertDialogPrimitive.Content> & { size?: keyof typeof alertDialogSizes };

export function AlertDialogContent({ className, size = "md", ...props }: AlertDialogContentProps) {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay
        data-slot="alert-dialog-overlay"
        className="fixed inset-0 z-dialog bg-scrim motion-safe:data-[state=open]:animate-mw-fade-in"
      />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-dialog flex max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col gap-6 overflow-y-auto rounded-card border border-line-strong bg-surface p-6 text-ink motion-safe:data-[state=open]:animate-mw-pop-in",
          alertDialogSizes[size],
          className,
        )}
        {...props}
      />
    </AlertDialogPrimitive.Portal>
  );
}

export function AlertDialogHeader({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="alert-dialog-header" className={cn("flex flex-col gap-2", className)} {...props} />;
}

export function AlertDialogFooter({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="alert-dialog-footer" className={cn("flex flex-wrap justify-end gap-3", className)} {...props} />;
}

export function AlertDialogTitle({ className, ...props }: ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title data-slot="alert-dialog-title" className={cn("font-display text-display-sm font-extrabold", className)} {...props} />
  );
}

export function AlertDialogDescription({ className, ...props }: ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return <AlertDialogPrimitive.Description data-slot="alert-dialog-description" className={cn("text-base text-ink-soft", className)} {...props} />;
}

export function AlertDialogCancel({ variant = "secondary", ...props }: Omit<ButtonProps, "asChild">) {
  return (
    <AlertDialogPrimitive.Cancel asChild>
      <Button data-slot="alert-dialog-cancel" variant={variant} {...props} />
    </AlertDialogPrimitive.Cancel>
  );
}

export function AlertDialogAction({ variant = "danger", ...props }: Omit<ButtonProps, "asChild">) {
  return (
    <AlertDialogPrimitive.Action asChild>
      <Button data-slot="alert-dialog-action" variant={variant} {...props} />
    </AlertDialogPrimitive.Action>
  );
}
