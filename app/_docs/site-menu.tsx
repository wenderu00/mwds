"use client";

import { Menu } from "lucide-react";
import NextLink from "next/link";
import { Button } from "@/registry/marcio/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/registry/marcio/ui/sheet";
import { ThemeToggle } from "@/registry/marcio/ui/theme-toggle";

export type SiteMenuLink = { href: string; label: string };

export function SiteMenu({ links, linkClassName, className }: { links: SiteMenuLink[]; linkClassName: string; className?: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary" size="sm" className={className}>
          <Menu aria-hidden="true" />
          Menu
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        closeLabel="Fechar menu"
        aria-describedby={undefined}
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          (event.currentTarget as HTMLElement).querySelector<HTMLElement>("nav a")?.focus();
        }}
      >
        <SheetTitle>Menu</SheetTitle>
        <nav aria-label="Principal">
          <ul className="flex flex-col gap-4 font-mono text-mono-sm">
            {links.map((item) => (
              <li key={item.href}>
                <SheetClose asChild>
                  <NextLink href={item.href} className={linkClassName}>
                    {item.label}
                  </NextLink>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>
        <ThemeToggle className="self-start" />
      </SheetContent>
    </Sheet>
  );
}
