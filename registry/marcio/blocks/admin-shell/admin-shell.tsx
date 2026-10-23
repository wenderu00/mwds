"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import {
  AppShell,
  AppShellBody,
  AppShellHeader,
  AppShellMain,
  AppShellNav,
  AppShellNavGroup,
  AppShellNavItem,
  AppShellSidebar,
} from "@/registry/marcio/ui/app-shell";
import { Avatar } from "@/registry/marcio/ui/avatar";
import { Badge } from "@/registry/marcio/ui/badge";
import { BreadcrumbTrail, type BreadcrumbTrailItem } from "@/registry/marcio/ui/breadcrumb";
import { Button } from "@/registry/marcio/ui/button";
import { CommandGroup } from "@/registry/marcio/ui/command";
import { CommandPalette, CommandPaletteItem, CommandPaletteTrigger } from "@/registry/marcio/ui/command-palette";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/marcio/ui/dropdown-menu";
import { LogoBlock } from "@/registry/marcio/ui/logo-block";
import { setTheme, useTheme, type ThemeChoice } from "@/registry/marcio/ui/theme-toggle";

export type AdminSection = "dashboard" | "projetos" | "configuracoes";

const icon = (path: string) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d={path} />
  </svg>
);

const navigation: { id: AdminSection; label: string; href: string; icon: ReactNode; badge?: ReactNode }[] = [
  { id: "dashboard", label: "Painel", href: "/dashboard", icon: icon("M2.5 2.5h4.5v5h-4.5zM9 2.5h4.5v3H9zM9 7.5h4.5v6H9zM2.5 9.5h4.5v4h-4.5z") },
  {
    id: "projetos",
    label: "Projetos",
    href: "/dashboard#atividade",
    icon: icon("M2 4.5h4.5l1.5 1.5H14v7.5H2z"),
    badge: (
      <Badge tone="accent" className="px-1.5">
        12
      </Badge>
    ),
  },
  {
    id: "configuracoes",
    label: "Configurações",
    href: "/configuracoes",
    icon: icon("M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M3.4 12.6l1.4-1.4M11.2 4.8l1.4-1.4"),
  },
];

export type AdminUser = { name: string; email: string; avatarUrl?: string };

export type AdminShellProps = {
  active: AdminSection;
  breadcrumb: BreadcrumbTrailItem[];
  user?: AdminUser;
  children: ReactNode;
};

const themeLabels: Record<ThemeChoice, string> = { system: "Seguir o sistema", dark: "Escuro", light: "Claro" };

export function AdminShell({
  active,
  breadcrumb,
  user = { name: "Márcio Wendell", email: "marcio@exemplo.com" },
  children,
}: AdminShellProps) {
  const router = useRouter();
  const theme = useTheme();

  return (
    <AppShell>
      <AppShellSidebar
        brand={
          <LogoBlock asChild size="sm">
            <NextLink href="/dashboard" aria-label="Painel, início">
              MW
            </NextLink>
          </LogoBlock>
        }
        footer={<span className="px-1 font-mono text-mono-xs text-ink-muted">v0.1</span>}
      >
        <AppShellNav>
          <AppShellNavGroup label="Geral">
            {navigation.map((item) => (
              <AppShellNavItem key={item.id} asChild label={item.label} icon={item.icon} badge={item.badge} active={item.id === active}>
                <NextLink href={item.href} />
              </AppShellNavItem>
            ))}
          </AppShellNavGroup>
        </AppShellNav>
      </AppShellSidebar>

      <AppShellBody>
        <AppShellHeader>
          <BreadcrumbTrail items={breadcrumb} className="hidden min-w-0 sm:block" />
          <div className="ml-auto flex items-center gap-3">
            <CommandPalette trigger={<CommandPaletteTrigger className="hidden md:inline-flex" />}>
              <CommandGroup heading="Ir para">
                {navigation.map((item) => (
                  <CommandPaletteItem key={item.id} value={item.href} keywords={[item.label]} onSelect={() => router.push(item.href)}>
                    {item.label}
                  </CommandPaletteItem>
                ))}
              </CommandGroup>
              <CommandGroup heading="Tema">
                {(Object.keys(themeLabels) as ThemeChoice[]).map((choice) => (
                  <CommandPaletteItem key={choice} value={`tema-${choice}`} keywords={["tema", themeLabels[choice]]} onSelect={() => setTheme(choice)}>
                    Tema: {themeLabels[choice]}
                  </CommandPaletteItem>
                ))}
              </CommandGroup>
            </CommandPalette>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 px-1.5" aria-label={`Menu de ${user.name}`}>
                  <Avatar name={user.name} src={user.avatarUrl} size="sm" decorative />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-60">
                <div className="flex flex-col px-2 py-1.5">
                  <span className="truncate text-sm font-medium text-ink">{user.name}</span>
                  <span className="truncate font-mono text-mono-xs text-ink-muted">{user.email}</span>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => router.push("/configuracoes")}>Configurações</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Tema</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={theme} onValueChange={(value) => setTheme(value as ThemeChoice)}>
                  {(Object.keys(themeLabels) as ThemeChoice[]).map((choice) => (
                    <DropdownMenuRadioItem key={choice} value={choice}>
                      {themeLabels[choice]}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="danger" onSelect={() => router.push("/login")}>
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </AppShellHeader>
        <AppShellMain>
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">{children}</div>
        </AppShellMain>
      </AppShellBody>
    </AppShell>
  );
}
