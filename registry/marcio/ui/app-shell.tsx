"use client";

import { Slot } from "radix-ui";
import {
  createContext,
  useContext,
  useId,
  useState,
  useSyncExternalStore,
  type ComponentProps,
  type ReactNode,
} from "react";
import { cn } from "@/registry/marcio/lib/utils";
import { Sheet, SheetContent, SheetTitle } from "@/registry/marcio/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/registry/marcio/ui/tooltip";

export const sidebarStorageKey = "mw-sidebar";
const sidebarEvent = "mw-sidebar-change";

function subscribeCollapsed(onChange: () => void) {
  window.addEventListener(sidebarEvent, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(sidebarEvent, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function readCollapsed() {
  try {
    return localStorage.getItem(sidebarStorageKey) === "collapsed";
  } catch {
    return false;
  }
}

function writeCollapsed(collapsed: boolean) {
  try {
    if (collapsed) localStorage.setItem(sidebarStorageKey, "collapsed");
    else localStorage.removeItem(sidebarStorageKey);
  } catch {}
  window.dispatchEvent(new Event(sidebarEvent));
}

type AppShellContextValue = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  sidebarId: string;
  inMobileSheet: boolean;
};

const AppShellContext = createContext<AppShellContextValue | null>(null);

export function useAppShell() {
  const context = useContext(AppShellContext);
  if (!context) throw new Error("useAppShell precisa estar dentro de <AppShell>");
  return context;
}

export type AppShellProps = ComponentProps<"div"> & {
  skipLinkLabel?: string;
  mainId?: string;
};

export function AppShell({ skipLinkLabel = "Pular para o conteúdo", mainId = "conteudo", className, children, ...props }: AppShellProps) {
  const collapsed = useSyncExternalStore(subscribeCollapsed, readCollapsed, () => false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const sidebarId = useId();

  return (
    <AppShellContext.Provider
      value={{ collapsed, setCollapsed: writeCollapsed, mobileOpen, setMobileOpen, sidebarId, inMobileSheet: false }}
    >
      <TooltipProvider>
        <div
          data-slot="app-shell"
          data-collapsed={collapsed}
          className={cn("group/shell flex min-h-dvh bg-ground text-ink", className)}
          {...props}
        >
          <a
            href={`#${mainId}`}
            className="sr-only z-50 bg-accent px-4 py-3 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            {skipLinkLabel}
          </a>
          {children}
        </div>
      </TooltipProvider>
    </AppShellContext.Provider>
  );
}

export type AppShellSidebarProps = Omit<ComponentProps<"aside">, "children"> & {
  brand?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  mobileTitle?: string;
};

export function AppShellSidebar({ brand, footer, mobileTitle = "Menu", className, children, ...props }: AppShellSidebarProps) {
  const shell = useAppShell();
  const content = (inMobileSheet: boolean) => (
    <AppShellContext.Provider value={{ ...shell, collapsed: inMobileSheet ? false : shell.collapsed, inMobileSheet }}>
      {brand && <div className="flex h-16 shrink-0 items-center px-4">{brand}</div>}
      <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-3 py-4">{children}</div>
      {footer && <div className="border-t border-line p-3">{footer}</div>}
    </AppShellContext.Provider>
  );

  return (
    <>
      <aside
        id={shell.sidebarId}
        data-slot="app-shell-sidebar"
        className={cn(
          "sticky top-0 hidden h-dvh shrink-0 flex-col border-r border-line bg-band transition-[width] duration-200 ease-out motion-reduce:transition-none lg:flex",
          shell.collapsed ? "w-16" : "w-64",
          className,
        )}
        {...props}
      >
        {content(false)}
      </aside>
      <Sheet open={shell.mobileOpen} onOpenChange={shell.setMobileOpen}>
        <SheetContent side="left" className="w-72 gap-0 bg-band p-0" closeLabel="Fechar menu" aria-describedby={undefined}>
          <SheetTitle className="sr-only">{mobileTitle}</SheetTitle>
          {content(true)}
        </SheetContent>
      </Sheet>
    </>
  );
}

export function AppShellNav({ "aria-label": ariaLabel = "Principal", className, ...props }: ComponentProps<"nav">) {
  return <nav data-slot="app-shell-nav" aria-label={ariaLabel} className={cn("flex flex-col gap-6", className)} {...props} />;
}

export type AppShellNavGroupProps = ComponentProps<"div"> & {
  label?: ReactNode;
};

export function AppShellNavGroup({ label, className, children, ...props }: AppShellNavGroupProps) {
  const { collapsed } = useAppShell();
  const labelId = useId();
  return (
    <div data-slot="app-shell-nav-group" className={cn("flex flex-col gap-1", className)} {...props}>
      {label && (
        <p id={labelId} className={cn("px-3 pb-1 font-mono text-mono-xs tracking-kicker text-ink-muted uppercase", collapsed && "sr-only")}>
          {label}
        </p>
      )}
      <ul aria-labelledby={label ? labelId : undefined} className="flex flex-col gap-1">
        {children}
      </ul>
    </div>
  );
}

export type AppShellNavItemProps = Omit<ComponentProps<"a">, "children"> & {
  icon?: ReactNode;
  label: string;
  active?: boolean;
  badge?: ReactNode;
  asChild?: boolean;
  children?: ReactNode;
};

export function AppShellNavItem({ icon, label, active = false, badge, asChild = false, className, children, ...props }: AppShellNavItemProps) {
  const { collapsed, inMobileSheet, setMobileOpen } = useAppShell();
  const Comp = asChild ? Slot.Root : "a";
  const link = (
    <Comp
      data-slot="app-shell-nav-item"
      data-active={active || undefined}
      aria-current={active ? "page" : undefined}
      onClick={() => {
        if (inMobileSheet) setMobileOpen(false);
      }}
      className={cn(
        "relative flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-ink-soft no-underline transition-colors duration-200 hover:bg-surface hover:text-ink [&_svg]:size-[18px] [&_svg]:shrink-0",
        active &&
          "bg-accent-soft text-ink before:absolute before:inset-y-2 before:left-0 before:w-0.5 before:rounded-full before:bg-accent-line hover:bg-accent-soft",
        collapsed && "justify-center px-0",
        className,
      )}
      {...props}
    >
      <Slot.Slottable>{asChild ? children : null}</Slot.Slottable>
      {icon && (
        <span aria-hidden="true" className="inline-flex">
          {icon}
        </span>
      )}
      <span className={cn("truncate", collapsed && "sr-only")}>{label}</span>
      {badge && !collapsed && <span className="ml-auto">{badge}</span>}
    </Comp>
  );

  return (
    <li>
      {collapsed ? (
        <Tooltip>
          <TooltipTrigger asChild>{link}</TooltipTrigger>
          <TooltipContent side="right">{label}</TooltipContent>
        </Tooltip>
      ) : (
        link
      )}
    </li>
  );
}

export type AppShellHeaderProps = ComponentProps<"header"> & {
  menuLabel?: string;
  collapseLabel?: string;
  expandLabel?: string;
};

export function AppShellHeader({
  menuLabel = "Abrir menu",
  collapseLabel = "Recolher menu",
  expandLabel = "Expandir menu",
  className,
  children,
  ...props
}: AppShellHeaderProps) {
  const { collapsed, setCollapsed, setMobileOpen, sidebarId } = useAppShell();
  const iconButton =
    "inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md text-ink-muted transition-colors duration-200 hover:bg-surface hover:text-ink";

  return (
    <header
      data-slot="app-shell-header"
      className={cn("sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-line bg-ground px-4", className)}
      {...props}
    >
      <button type="button" aria-label={menuLabel} onClick={() => setMobileOpen(true)} className={cn(iconButton, "lg:hidden")}>
        <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-4">
          <path d="M2.5 4h11M2.5 8h11M2.5 12h11" strokeLinecap="round" />
        </svg>
      </button>
      <button
        type="button"
        aria-label={collapsed ? expandLabel : collapseLabel}
        aria-controls={sidebarId}
        aria-expanded={!collapsed}
        onClick={() => setCollapsed(!collapsed)}
        className={cn(iconButton, "hidden lg:inline-flex")}
      >
        <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-4">
          <rect x="2" y="2.5" width="12" height="11" rx="1.5" />
          <path d={collapsed ? "M6 2.5v11M8.5 6.5L10.5 8l-2 1.5" : "M6 2.5v11M10.5 6.5L8.5 8l2 1.5"} strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      </button>
      {children}
    </header>
  );
}

export function AppShellBody({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="app-shell-body" className={cn("flex min-w-0 flex-1 flex-col", className)} {...props} />;
}

export function AppShellMain({ id = "conteudo", className, ...props }: ComponentProps<"main">) {
  return <main data-slot="app-shell-main" id={id} tabIndex={-1} className={cn("flex-1 px-4 py-8 outline-none md:px-8", className)} {...props} />;
}
