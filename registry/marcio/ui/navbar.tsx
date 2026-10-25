"use client";

import { Menu } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/registry/marcio/lib/utils";
import { IconButton } from "@/registry/marcio/ui/icon-button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/registry/marcio/ui/sheet";

export type NavbarLink = { href: string; label: ReactNode; current?: boolean };

export type NavbarProps = Omit<ComponentProps<"header">, "children"> & {
  brand: ReactNode;
  links: NavbarLink[];
  actions?: ReactNode;
  // Conteúdo extra no fim do painel do celular, como o ThemeToggle escondido nas telas pequenas.
  menuFooter?: ReactNode;
  label?: string;
  menuLabel?: string;
  sticky?: boolean;
  // Abaixo deste ponto de corte os links vão para o painel. lg dá espaço a cabeçalhos com muitas ações.
  collapseBelow?: "md" | "lg";
};

const collapseClasses = {
  md: { nav: "hidden md:block", trigger: "md:hidden" },
  lg: { nav: "hidden lg:block", trigger: "lg:hidden" },
};

const linkClasses =
  "inline-flex min-h-11 items-center rounded-mark px-3 font-mono text-mono-sm text-ink-soft no-underline transition-colors duration-base hover:text-accent-text aria-[current=page]:text-accent-text aria-[current=page]:underline aria-[current=page]:underline-offset-8";

export function Navbar({
  brand,
  links,
  actions,
  menuFooter,
  label = "Principal",
  menuLabel = "Menu",
  sticky = true,
  collapseBelow = "md",
  className,
  ...props
}: NavbarProps) {
  const collapse = collapseClasses[collapseBelow];
  const items = (onSheet: boolean) =>
    links.map((link) => {
      const anchor = (
        <a href={link.href} aria-current={link.current ? "page" : undefined} className={cn(linkClasses, onSheet && "px-0")}>
          {link.label}
        </a>
      );
      return <li key={link.href}>{onSheet ? <SheetClose asChild>{anchor}</SheetClose> : anchor}</li>;
    });

  return (
    <header data-slot="navbar" className={cn("border-b border-line bg-ground", sticky && "sticky top-0 z-sticky", className)} {...props}>
      <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-6 py-3">
        {brand}
        <nav aria-label={label} className={collapse.nav}>
          <ul className="flex items-center gap-1">{items(false)}</ul>
        </nav>
        <div className="flex items-center gap-2">
          {actions}
          <Sheet>
            <SheetTrigger asChild>
              <IconButton aria-label={menuLabel} className={collapse.trigger}>
                <Menu aria-hidden="true" />
              </IconButton>
            </SheetTrigger>
            <SheetContent side="right" aria-describedby={undefined}>
              <SheetTitle>{menuLabel}</SheetTitle>
              <nav aria-label={label}>
                <ul className="flex flex-col gap-2">{items(true)}</ul>
              </nav>
              {menuFooter}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
