# admin-shell

## Overview
Casca de painel administrativo (sidebar, header com breadcrumb, paleta de comandos, troca de tema e menu do usuário) que envolve os blocos [dashboard](../dashboard/EGM.md), [record-detail](../record-detail/EGM.md) e [settings](../settings/EGM.md). Publicado como item `registry:block` `admin-shell`. Em `app/_docs/blocks.ts` o bloco tem `targets: {}`, então não gera `registry:page`: `admin-shell.tsx` é instalado em `components/blocks/admin-shell/admin-shell.tsx`.

## Interface
- `admin-shell.tsx` (`"use client"`): `AdminShell`, tipos `AdminSection`, `AdminUser`, `AdminShellProps` (sem default export). Compõe `AppShell` e subcomponentes, `LogoBlock`, `Badge`, `BreadcrumbTrail`, `CommandPalette`/`CommandPaletteItem`/`CommandPaletteTrigger`, `CommandGroup` (de `ui/command.tsx`, item `command` separado que entra nas `registryDependencies`), `DropdownMenu*`, `Avatar`, `Button` e `setTheme`/`useTheme` de [`../../ui`](../../ui/EGM.md).

## Invariants
- `admin-shell.tsx:AdminSection` é `"dashboard" | "projetos" | "configuracoes"`.
- `admin-shell.tsx:AdminShellProps` exige `active`, `breadcrumb: BreadcrumbTrailItem[]` e `children`; `user?: AdminUser` (`{ name; email; avatarUrl? }`) cai para um usuário de exemplo em `admin-shell.tsx:AdminShell`.
- `admin-shell.tsx:navigation` é constante interna com três itens fixos (`/dashboard`, `/dashboard#atividade`, `/configuracoes`); o item ativo é o de `id === active`.
- `admin-shell.tsx:themeLabels` cobre exatamente as chaves de `ThemeChoice` (`system`, `dark`, `light`).
- `admin-shell.tsx:AdminShell` marca "Sair" com `DropdownMenuItem tone="danger"`, a API atual (`variant="danger"` está descontinuado e sai na 0.23).

## Side Effects
- `admin-shell.tsx:AdminShell` navega com `router.push` ao escolher item na paleta e no menu do usuário (`/configuracoes`, `/login` em "Sair"); não há logout real.
- `admin-shell.tsx:AdminShell` chama `setTheme` (localStorage `mw-theme` e `data-theme`) pela paleta e pelo menu.
- Dados de navegação e usuário são estáticos; nenhum acesso a rede.

## Verification
- Run: `npm test`
