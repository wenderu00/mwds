# Demos

## Overview
Demos interativas usadas nos exemplos do catálogo de componentes (`app/_docs/catalog/`). Cada arquivo é um módulo cliente (`"use client"`) com uma única função exportada, que guarda estado React local para mostrar um componente do registry em uso. Ficam fora dos arquivos de `catalog/` para que os documentos do catálogo continuem módulos de servidor que só descrevem dados e `render`.

## Interface
- `alert-dismiss.tsx:AlertDismissDemo()` - `Alert` dispensável (`onDismiss`) com botão "Mostrar aviso de novo".
- `app-shell.tsx:AppShellDemo({ theme })` - `AppShell` com navegação lateral; `theme` compõe `mainId`, o `id` do main e o `aria-label` da nav.
- `app-shell-bottom.tsx:AppShellBottomDemo({ theme })` - `AppShell` com navegação inferior; `theme` compõe o `data-testid`.
- `character-stage.tsx:CharacterStageDemo()` - `CharacterStage` com rodadas.
- `command-palette.tsx:CommandPaletteDemo()` - `CommandPalette` com itens de exemplo.
- `data-table.tsx:DataTableDemo()` - `DataTable` com seleção de linhas.
- `dropdown-menu.tsx:DropdownMenuDemo()` - `DropdownMenu` com itens, opção de densidade e ordenação.
- `file-upload-progress.tsx:FileUploadProgressDemo({ id })` - `FileUpload` em `FormField` com progresso simulado.
- `meter.tsx:MeterDemo()` - `Meter` "Ouro" com botão "Saquear" (soma 250 até `max` 5000 e muda `highlightKey`).
- `pagination.tsx:PaginationDemo({ pageCount, label })` - `Pagination` controlada.
- `progress.tsx:ProgressDemo()` - `Progress` com valor alterável.
- `scene-canvas.tsx:SceneCanvasDemo()` - `SceneCanvas` com a cena `orbit` (oito pontos em órbita) e fallback "quadro estático".
- `sentinel.tsx:SentinelDemo()` - personagem de `character-sentinel` com troca de pose.
- `stepper.tsx:StepperDemo()` - `Stepper` com etapa atual controlada.
- `toast.tsx:ToastDemo()` - botões que disparam `toast` em cada tom.
- `toast-action.tsx:ToastActionDemo()` - `toast` com ação "Desfazer".
- `tour.tsx:TourDemo()` - `Tour` aberto por botão.

## Invariants
- Todo arquivo começa com `"use client"` e importa só de `react`, `lucide-react` e `@/registry/marcio/ui/...`; nenhuma demo importa outra pasta do site.
- Cada demo é importada por exatamente um documento de `app/_docs/catalog/` (por exemplo `catalog/file-upload.tsx` importa `FileUploadProgressDemo`).
- Quando uma demo recebe `theme` ou `id`, o catálogo passa um valor diferente por tema (`render: (theme) => ...`), porque `Preview` renderiza o exemplo duas vezes na mesma página e os ids precisam ser únicos.
- `scene-canvas.tsx:orbit` devolve `destroy`, que remove o `tick` do `app.ticker`, e `theme`, que retinge os pontos com `tokens.pixi["category-N-line"]`.
- `FileUploadProgressDemo` avança 20% a cada 300 ms e faz o segundo arquivo falhar uma vez ao chegar em 60% (`failed`), para mostrar o estado de erro e o `onRetry`.

## Side Effects
- `file-upload-progress.tsx:FileUploadProgressDemo` usa `setInterval` (limpo no retorno do `useEffect`).
- `scene-canvas.tsx:orbit` registra um callback em `app.ticker` do PixiJS.
- Chamam `toast` de `registry/marcio/ui/toast`: `AlertDismissDemo` ("Sessão renovada"), `CommandPaletteDemo`, `DropdownMenuDemo`, `ToastDemo` e `ToastActionDemo`.
- Nenhuma demo faz rede ou grava armazenamento.

## Verification
- Run: `npm test`
