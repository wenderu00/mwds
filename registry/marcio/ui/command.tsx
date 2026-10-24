"use client";

import { Command as CommandPrimitive } from "cmdk";
import type { ComponentProps } from "react";
import { cn } from "@/registry/marcio/lib/utils";

export function normalizeSearch(value: string) {
  return value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();
}

export function commandFilter(value: string, search: string, keywords?: string[]) {
  const haystack = normalizeSearch([value, ...(keywords ?? [])].join(" "));
  const terms = normalizeSearch(search).split(/\s+/).filter(Boolean);
  return terms.every((term) => haystack.includes(term)) ? 1 : 0;
}

export function Command({ className, filter = commandFilter, ...props }: ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      filter={filter}
      className={cn("flex h-full w-full flex-col overflow-hidden rounded-control bg-surface text-ink", className)}
      {...props}
    />
  );
}

export function CommandInput({ className, ...props }: ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div data-slot="command-input-wrapper" className="flex items-center gap-2 border-b border-line px-3">
      <span aria-hidden="true" className="font-mono text-mono-sm text-accent-text">
        {">"}
      </span>
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn("h-control w-full bg-transparent text-base text-ink outline-none placeholder:text-ink-muted disabled:cursor-not-allowed disabled:opacity-50", className)}
        {...props}
      />
    </div>
  );
}

export function CommandList({ className, ...props }: ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn("max-h-72 scroll-py-1 overflow-x-hidden overflow-y-auto p-1", className)}
      {...props}
    />
  );
}

export function CommandEmpty({ className, ...props }: ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn("px-3 py-6 text-center font-mono text-mono-xs text-ink-muted", className)}
      {...props}
    />
  );
}

export function CommandGroup({ className, ...props }: ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-mono-xs [&_[cmdk-group-heading]]:tracking-kicker [&_[cmdk-group-heading]]:text-ink-muted [&_[cmdk-group-heading]]:uppercase",
        className,
      )}
      {...props}
    />
  );
}

export function CommandSeparator({ className, ...props }: ComponentProps<typeof CommandPrimitive.Separator>) {
  return <CommandPrimitive.Separator data-slot="command-separator" className={cn("-mx-1 my-1 h-px bg-line", className)} {...props} />;
}

export function CommandItem({ className, ...props }: ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "relative flex min-h-9 cursor-pointer items-center gap-2 rounded-mark px-2 py-1.5 text-base text-ink outline-none select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-accent-soft [&_svg]:size-4 [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}

export function CommandShortcut({ className, ...props }: ComponentProps<"span">) {
  return <span data-slot="command-shortcut" className={cn("ml-auto font-mono text-mono-xs text-ink-muted", className)} {...props} />;
}
