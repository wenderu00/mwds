# settings

## Overview
Página de configurações com abas de perfil (formulário), preferências (tema, densidade, fuso, notificações) e conta (exclusão de demonstração), dentro do [admin-shell](../admin-shell/EGM.md). `page.tsx` é publicado como `registry:page` com destino `app/configuracoes/page.tsx`; `settings-tabs.tsx` vai para `components/blocks/settings/`.

## Interface
- `page.tsx`: default `SettingsPage`, `metadata` — página de servidor; compõe `AdminShell` (`active="configuracoes"`), `PageHeader` e `SettingsTabs`.
- `settings-tabs.tsx` (`"use client"`): `SettingsTabs` (exportado); internos `ProfileForm`, `Preferences`, `Account`, `timezones` e `wait` — compõem `Tabs`, `Card`, `FormField`, `Input`, `Textarea`, `Select`, `Avatar`, `RadioGroup`/`RadioGroupOption`, `Combobox`, `Switch`, `Alert`, `AlertDialog`, `Button`, `toast` e `setTheme`/`useTheme`.

## Invariants
- `settings-tabs.tsx:ProfileForm` exige nome e e-mail (padrão `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`), limita `bio` a 280 caracteres e usa `mode: "onTouched"`; "Descartar" fica desabilitado sem `isDirty` ou durante `isSubmitting`.
- `settings-tabs.tsx:Preferences` oferece densidade `compacta`/`normal`/`ampla` no `RadioGroup`, mas o estado inicial vem de `document.documentElement.dataset.density` sem validação (qualquer valor já presente em `data-density` vira o estado; `"normal"` no servidor); o fuso fica limitado à lista `timezones` (padrão `America/Recife`); o `Combobox` mantém o valor anterior se esvaziado.
- `settings-tabs.tsx:SettingsTabs` abre na aba `perfil`.
- `settings-tabs.tsx:Account` usa o `AlertDialogAction` com o padrão `variant="danger"`.

## Side Effects
- `settings-tabs.tsx:Preferences.changeDensity` grava `data-density` em `document.documentElement` (remove para `normal`) e lê o valor inicial de lá.
- `settings-tabs.tsx:Preferences` chama `setTheme` (localStorage `mw-theme` e `data-theme`).
- `settings-tabs.tsx:ProfileForm.onSubmit` espera 600 ms, chama `reset(values)` e dispara `toast`; notificações, fuso e exclusão de conta (`settings-tabs.tsx:Account`) não são persistidos.
- `settings-tabs.tsx:Preferences.toggle` dispara `toast` ("Notificação ativada"/"Notificação desativada") a cada `Switch`.
- `settings-tabs.tsx:Account`: o `AlertDialogAction` dispara um `toast` informativo ("Nada foi excluído") em vez de excluir.

## Verification
- Run: `npm test`
