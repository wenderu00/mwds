"use client";

import { cva } from "class-variance-authority";
import { Toast as ToastPrimitive } from "radix-ui";
import { useSyncExternalStore, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/registry/marcio/lib/utils";

export type ToastTone = "neutral" | "success" | "danger" | "warning" | "info";

export type ToastOptions = {
  title: ReactNode;
  description?: ReactNode;
  tone?: ToastTone;
  duration?: number;
  action?: { label: string; altText: string; onClick: () => void };
};

type ToastRecord = ToastOptions & { id: number; open: boolean };

let records: ToastRecord[] = [];
let nextId = 1;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const getSnapshot = () => records;
const emptyRecords: ToastRecord[] = [];
const getServerSnapshot = () => emptyRecords;

export function dismissToast(id: number) {
  records = records.map((record) => (record.id === id ? { ...record, open: false } : record));
  emit();
  setTimeout(() => {
    records = records.filter((record) => record.id !== id);
    emit();
  }, 300);
}

export function toast(options: ToastOptions) {
  const id = nextId++;
  records = [...records, { ...options, id, open: true }];
  emit();
  return id;
}

export function clearToasts() {
  records = [];
  emit();
}

const toastVariants = cva(
  "relative grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-3 gap-y-1 rounded-md border border-line-strong border-l-4 bg-surface py-3 pr-3 pl-4 text-ink motion-safe:data-[state=open]:animate-mw-slide-in data-[swipe=move]:translate-x-(--radix-toast-swipe-move-x) data-[swipe=end]:translate-x-(--radix-toast-swipe-end-x)",
  {
    variants: {
      tone: {
        neutral: "border-l-line-control",
        success: "border-l-success",
        danger: "border-l-danger",
        warning: "border-l-warning",
        info: "border-l-info",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export type ToasterProps = Omit<ComponentProps<typeof ToastPrimitive.Viewport>, "children"> & {
  closeLabel?: string;
  label?: string;
  duration?: number;
};

export function Toaster({ closeLabel = "Fechar", label = "Notificações", duration = 5000, className, ...props }: ToasterProps) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <ToastPrimitive.Provider label={label} duration={duration} swipeDirection="right">
      {items.map((item) => (
        <ToastPrimitive.Root
          key={item.id}
          data-slot="toast"
          data-tone={item.tone ?? "neutral"}
          open={item.open}
          duration={item.duration}
          type={item.tone === "danger" ? "foreground" : "background"}
          onOpenChange={(open) => {
            if (!open) dismissToast(item.id);
          }}
          className={toastVariants({ tone: item.tone })}
        >
          <ToastPrimitive.Title className="text-base font-semibold">{item.title}</ToastPrimitive.Title>
          <ToastPrimitive.Close
            aria-label={closeLabel}
            className="row-span-2 inline-flex size-8 cursor-pointer items-center justify-center rounded-md text-ink-muted transition-colors duration-200 hover:bg-band hover:text-ink"
          >
            <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4">
              <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
            </svg>
          </ToastPrimitive.Close>
          {item.description && (
            <ToastPrimitive.Description className="text-sm text-ink-soft">{item.description}</ToastPrimitive.Description>
          )}
          {item.action && (
            <ToastPrimitive.Action
              altText={item.action.altText}
              onClick={item.action.onClick}
              className="col-start-1 mt-1 inline-flex h-8 w-fit cursor-pointer items-center rounded-md border border-line-control px-3 text-sm font-medium text-ink transition-colors duration-200 hover:border-accent-line hover:text-accent-text"
            >
              {item.action.label}
            </ToastPrimitive.Action>
          )}
        </ToastPrimitive.Root>
      ))}
      <ToastPrimitive.Viewport
        data-slot="toast-viewport"
        className={cn(
          "fixed right-0 bottom-0 z-[60] m-0 flex w-full max-w-sm list-none flex-col gap-2 p-4 outline-none",
          className,
        )}
        {...props}
      />
    </ToastPrimitive.Provider>
  );
}
