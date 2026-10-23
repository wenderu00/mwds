"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Dialog as DialogPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/registry/marcio/lib/utils";
import { DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogTitle } from "@/registry/marcio/ui/dialog";

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;
export const SheetHeader = DialogHeader;
export const SheetFooter = DialogFooter;
export const SheetTitle = DialogTitle;
export const SheetDescription = DialogDescription;

export const sheetVariants = cva(
  "fixed z-50 flex flex-col gap-6 overflow-y-auto border-line-strong bg-surface p-6 text-ink",
  {
    variants: {
      side: {
        right: "inset-y-0 right-0 h-dvh w-[calc(100vw-3rem)] max-w-md border-l motion-safe:data-[state=open]:animate-mw-sheet-right",
        left: "inset-y-0 left-0 h-dvh w-[calc(100vw-3rem)] max-w-xs border-r motion-safe:data-[state=open]:animate-mw-sheet-left",
        top: "inset-x-0 top-0 max-h-[85dvh] border-b motion-safe:data-[state=open]:animate-mw-sheet-top",
        bottom: "inset-x-0 bottom-0 max-h-[85dvh] border-t motion-safe:data-[state=open]:animate-mw-sheet-bottom",
      },
    },
    defaultVariants: { side: "right" },
  },
);

export type SheetContentProps = ComponentProps<typeof DialogPrimitive.Content> &
  VariantProps<typeof sheetVariants> & {
    closeLabel?: string;
    showClose?: boolean;
  };

export function SheetContent({ side, className, children, closeLabel = "Fechar", showClose = true, ...props }: SheetContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="sheet-content"
        data-side={side ?? "right"}
        className={cn(sheetVariants({ side }), className)}
        {...props}
      >
        {children}
        {showClose && (
          <DialogPrimitive.Close
            aria-label={closeLabel}
            className="absolute top-4 right-4 inline-flex size-9 cursor-pointer items-center justify-center rounded-md text-ink-muted transition-colors duration-200 hover:bg-band hover:text-ink"
          >
            <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4">
              <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
            </svg>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
