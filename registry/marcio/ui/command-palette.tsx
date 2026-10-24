"use client";

import { Dialog as DialogPrimitive } from "radix-ui";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ComponentProps,
  type ReactNode,
} from "react";
import { cn } from "@/registry/marcio/lib/utils";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/registry/marcio/ui/command";
import { DialogOverlay } from "@/registry/marcio/ui/dialog";
import { Kbd } from "@/registry/marcio/ui/kbd";

const subscribeNothing = () => () => {};

export function useIsMac() {
  return useSyncExternalStore(
    subscribeNothing,
    () => /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent),
    () => false,
  );
}

type CommandPaletteContextValue = { close: () => void };

const CommandPaletteContext = createContext<CommandPaletteContextValue | null>(null);

export type CommandPaletteProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  shortcutKey?: string | false;
  title?: string;
  placeholder?: string;
  emptyText?: ReactNode;
  listLabel?: string;
  className?: string;
  trigger?: ReactNode;
  children: ReactNode;
};

export function CommandPalette({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  shortcutKey = "k",
  title = "Paleta de comandos",
  placeholder = "Digite um comando ou busque",
  emptyText = "Nenhum resultado",
  listLabel = "Resultados",
  className,
  trigger,
  children,
}: CommandPaletteProps) {
  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const open = controlledOpen ?? innerOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (controlledOpen === undefined) setInnerOpen(next);
      onOpenChange?.(next);
    },
    [controlledOpen, onOpenChange],
  );

  useEffect(() => {
    if (!shortcutKey) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() === shortcutKey && (event.metaKey || event.ctrlKey) && !event.altKey) {
        event.preventDefault();
        setOpen(!open);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen, shortcutKey]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      {trigger && <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>}
      <DialogPrimitive.Portal>
        <DialogOverlay />
        <DialogPrimitive.Content
          data-slot="command-palette"
          aria-describedby={undefined}
          className={cn(
            "fixed top-[12vh] left-1/2 z-dialog w-[calc(100vw-2rem)] max-w-xl -translate-x-1/2 overflow-hidden rounded-card border border-line-strong bg-surface motion-safe:data-[state=open]:animate-mw-pop-in",
            className,
          )}
        >
          <DialogPrimitive.Title className="sr-only">{title}</DialogPrimitive.Title>
          <CommandPaletteContext.Provider value={{ close: () => setOpen(false) }}>
            <Command label={title} className="rounded-none">
              <CommandInput placeholder={placeholder} />
              <CommandList label={listLabel} className="max-h-[min(60vh,420px)]">
                <CommandEmpty>{emptyText}</CommandEmpty>
                {children}
              </CommandList>
            </Command>
          </CommandPaletteContext.Provider>
          <div aria-hidden="true" className="flex items-center gap-4 border-t border-line px-3 py-2 font-mono text-mono-xs text-ink-muted">
            <span>↑↓ navegar</span>
            <span>↵ abrir</span>
            <span>esc fechar</span>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export type CommandPaletteItemProps = ComponentProps<typeof CommandItem> & {
  keepOpen?: boolean;
};

export function CommandPaletteItem({ onSelect, keepOpen = false, ...props }: CommandPaletteItemProps) {
  const context = useContext(CommandPaletteContext);
  return (
    <CommandItem
      onSelect={(value) => {
        onSelect?.(value);
        if (!keepOpen) context?.close();
      }}
      {...props}
    />
  );
}

export type CommandPaletteTriggerProps = ComponentProps<"button"> & {
  label?: string;
};

export function CommandPaletteTrigger({ label = "Buscar", className, ...props }: CommandPaletteTriggerProps) {
  const isMac = useIsMac();
  return (
    <button
      type="button"
      data-slot="command-palette-trigger"
      aria-keyshortcuts={isMac ? "Meta+K" : "Control+K"}
      className={cn(
        "inline-flex h-9 cursor-pointer items-center gap-3 rounded-control border border-line-control bg-ground px-3 text-sm text-ink-muted transition-colors duration-base hover:border-accent-line hover:text-ink",
        className,
      )}
      {...props}
    >
      <span className="font-mono text-accent-text" aria-hidden="true">
        {">"}
      </span>
      <span>{label}</span>
      <Kbd className="ml-auto">{isMac ? "⌘K" : "Ctrl K"}</Kbd>
    </button>
  );
}
