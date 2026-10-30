# app

## Overview
App Router do Next.js 16 que gera o site de documentação do `@mw/ui` como site estático (`output: "export"`, `trailingSlash: true` e `basePath` vindo de `BASE_PATH` em `next.config.ts`, publicado no GitHub Pages em `/mwds`). A raiz define o layout global (fontes, tema, providers), a página inicial com a fundação de tokens e o 404. Os subdiretórios são rotas de documentação (componentes, blocos, ícones, escrita, primeiros passos, novidades), telas de exemplo, rotas que só reexportam blocos do registry e duas pastas privadas (`_docs`, `_fundacao`). O código dos componentes vive em `registry/marcio/`; `app/` só o consome.

## Interface
- `app/layout.tsx:default` (`RootLayout`) - `<html lang="pt-BR" suppressHydrationWarning>` com as variáveis de fonte (`--font-bricolage`, `--font-plex-sans`, `--font-plex-mono`), `ThemeScript` no `<head>`, `TooltipProvider` em volta do conteúdo e `Toaster`.
- `app/layout.tsx:metadata` - título "@mw/ui" e descrição do site.
- `app/layout.tsx:viewport` - `colorScheme: "dark light"`.
- `app/page.tsx:default` (`Home`) - página `/`: hero com versão do `package.json` e contagem de pares de contraste, navegação por âncoras (`sections`) e as 13 seções de `app/_fundacao`.
- `app/not-found.tsx:default` e `metadata` - reexportam `registry/marcio/blocks/not-found/not-found`.
- `app/globals.css` - importa `tailwindcss` e `registry/marcio/tokens.css`.
- Subdiretórios:
  - [_docs](./_docs/EGM.md) - metadados e conteúdo do catálogo, template da página de componente, blocos, ícones gerados, cabeçalho, rodapé e componentes de apresentação.
  - [_fundacao](./_fundacao/EGM.md) - as 13 seções da página de fundação.
  - [blocos](./blocos/EGM.md) - `/blocos`, lista de blocos com prévia em `iframe`.
  - [componentes](./componentes/EGM.md) - `/componentes` e as 85 rotas estáticas `/componentes/<slug>`.
  - [configuracoes](./configuracoes/EGM.md) - reexporta o bloco `settings`.
  - [dashboard](./dashboard/EGM.md) - reexporta o bloco `dashboard`.
  - [escrita](./escrita/EGM.md) - `/escrita`, guia de voz, tom e formatos pt-BR.
  - [exemplos](./exemplos/EGM.md) - `/exemplos` e as telas de listagem, cadastro, detalhe e wizard.
  - [icones](./icones/EGM.md) - `/icones`, catálogo dos ícones autorais.
  - [landing](./landing/EGM.md) - reexporta o bloco `landing`.
  - [login](./login/EGM.md) - reexporta o bloco `login`.
  - [novidades](./novidades/EGM.md) - `/novidades`, changelog lido do `CHANGELOG.md`.
  - [primeiros-passos](./primeiros-passos/EGM.md) - `/primeiros-passos`, guia de instalação.
- `app/_data/` (sem código, sem contrato próprio) - `tokens.json` e `contrast.json`, gerados por `scripts/contrast.ts --write`.

## Invariants
- `app/` não implementa componentes de UI: páginas importam de `@/registry/marcio/...`, e as rotas de bloco (`configuracoes`, `dashboard`, `landing`, `login`, `exemplos/detalhe`, `not-found.tsx`) só reexportam `default` e `metadata` do registry, para que a prévia seja o mesmo código instalado pelo shadcn.
- `ThemeScript` fica no `<head>` e o `<html>` usa `suppressHydrationWarning`, porque o script aplica o tema antes da hidratação (`RootLayout`).
- As páginas de documentação seguem o mesmo esqueleto: `SiteHeader`, `<main id="conteudo">` (alvo do link "Pular para o conteúdo" de `app/_docs/site-header.tsx:SiteHeader`) e `SiteFooter`.
- As âncoras de `sections` em `app/page.tsx` correspondem aos `id` das seções de `app/_fundacao`.
- `Home` conta falhas como `contrastResults.filter((r) => !r.pass).length` sobre `app/_data/contrast.json`. Os JSON de `app/_data/` são escritos por `npm run contrast`; o `npm test` roda `scripts/contrast.ts` sem `--write` e falha se estiverem desatualizados.
- Como o site é exportado estaticamente, nenhuma página pode depender de dados de requisição; rotas por item são diretórios estáticos (ver `app/componentes/EGM.md`), não rotas dinâmicas.
- O `src` de `iframe` precisa de `process.env.NEXT_PUBLIC_BASE_PATH` (definido em `next.config.ts` a partir de `BASE_PATH`), porque só o `NextLink` recebe o `basePath` sozinho.

## Side Effects
- `app/novidades/changelog.ts:readChangelog` lê `CHANGELOG.md` do disco durante o build.
- `app/_docs/code-block.tsx:CodeBlock` escreve na área de transferência; `app/_docs/site-command.tsx:SiteCommand` navega e troca o tema por `setTheme`.
- `app/layout.tsx` carrega Bricolage Grotesque, IBM Plex Sans e IBM Plex Mono por `next/font/google` (baixadas no build).
- As telas de exemplo e as demos só mudam estado React local e chamam `toast`; nenhuma página faz chamada de rede em tempo de execução.

## Verification
- Run: `npm test`
