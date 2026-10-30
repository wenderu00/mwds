# Exemplos / Listagem

## Overview
Rota `/exemplos/listagem`: tela de exemplo de listagem de projetos com busca, filtro por status, tabela paginada e ordenável, seleção de linhas, ações por linha, confirmação em diálogo, toast com desfazer e estado vazio. A página (servidor) só monta o esqueleto do site; toda a interação está em `ProjectsView`, componente cliente que trabalha sobre dados fixos de `projects.ts`.

## Interface
- `app/exemplos/listagem/page.tsx:default` (`ListingExample`) - `SiteHeader`, `<main id="conteudo">` com `ProjectsView` e `SiteFooter`.
- `app/exemplos/listagem/page.tsx:metadata` - título "Listagem de projetos · @mw/ui".
- `app/exemplos/listagem/projects-view.tsx:ProjectsView` - listagem cliente (`"use client"`): `PageHeader`, `SearchInput`, `Select` de status, `DataTable<Project>`, `EmptyState` e os diálogos de arquivar e excluir.
- `app/exemplos/listagem/projects.ts:Project` e `ProjectStatus` (`"ativo" | "pausado" | "rascunho" | "arquivado"`) - formato de um projeto.
- `app/exemplos/listagem/projects.ts:projects` - 23 projetos fictícios (`p01` a `p23`).
- `app/exemplos/listagem/projects.ts:statusLabel` e `statusTone` - rótulo e tom de `Badge` por status.

## Invariants
- A busca ignora acentos e caixa: `normalize` em `projects-view.tsx` aplica `normalize("NFD")`, remove `\p{Diacritic}` e passa para minúsculas antes de comparar nome, cliente e responsável.
- Toda mudança de busca ou de status volta para a página 1 (`onValueChange` do `SearchInput` e do `Select`, e `resetFilters` em `ProjectsView`).
- A tabela mostra `pageSize = 8` linhas por página e ordena por `atualizado` decrescente por padrão (`defaultSort` do `DataTable`).
- Excluir um projeto também o remove de `selected` (`ProjectsView:remove`).
- Arquivar guarda o status anterior e o toast oferece "Desfazer", que restaura esse status (`ProjectsView:archive`); o item "Arquivar" do menu fica desabilitado para projetos já arquivados (`ProjectActions`).
- Datas são formatadas em pt-BR com `timeZone: "UTC"` (`dateFormat` em `projects-view.tsx`), para que `updatedAt` não mude com o fuso de quem abre a página.
- `statusLabel` e `statusTone` precisam cobrir todas as chaves de `ProjectStatus`.

## Side Effects
- `ProjectsView` e `ProjectActions` chamam `toast` de `registry/marcio/ui/toast` (exportar, novo projeto, editar, duplicar, arquivar, excluir). Nenhuma chamada de rede ou armazenamento: todas as mudanças vivem só no estado React de `ProjectsView` e se perdem ao recarregar.

## Verification
- Run: `npm test`
