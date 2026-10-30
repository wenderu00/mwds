# Novidades

## Overview
Rota `/novidades`: changelog do `@mw/ui` gerado no build a partir do `CHANGELOG.md` da raiz. `changelog.ts` faz o parse do formato fixo (ADR 0016) e quebra o build em qualquer desvio; a página mostra uma tabela-resumo das versões, uma tabela de mudanças por versão com o componente afetado e, à parte, os blocos que não são lista (como passos de migração).

## Interface
- `app/novidades/page.tsx:default` (`ChangelogPage`) - `PageHeader` com a versão atual, `nav` "Versões" com tabela-resumo (versão, data, número de mudanças, quebra compatibilidade) e uma `FoundationSection` por versão com `ReleaseTable` e as seções não-lista.
- `app/novidades/page.tsx:metadata` - título "Novidades · @mw/ui".
- `app/novidades/changelog.ts:parseChangelog(source)` - devolve `ChangelogRelease[]`.
- `app/novidades/changelog.ts:readChangelog()` - lê `CHANGELOG.md` e chama `parseChangelog`.
- `app/novidades/changelog.ts:ChangelogBlock` (`list` | `paragraph` | `code`), `ChangelogSection`, `ChangelogRelease` - árvore do changelog.
- `app/novidades/changelog.ts:sectionTitles` - `["Novo", "Mudou", "Corrigido", "Quebra compatibilidade"]`.
- `app/novidades/changelog.ts:inline(text)` e `InlinePart` - partes de texto, `code`, `strong` e link.
- `app/novidades/changelog.ts:resolveHref(href)` - mantém `http(s):`, `mailto:` e `#`; caminhos relativos viram `https://github.com/wenderu00/mwds/blob/main/{caminho}`.
- `app/novidades/changelog.ts:componentsOf(text, names)`, `entriesOf(release, names)` e `ChangelogEntry` - itens de lista com os componentes citados.
- `app/novidades/changelog.ts:isBreaking(release)` - `true` se a versão tem seção "Quebra compatibilidade".

## Invariants
- `parseChangelog` aceita só o formato fixo e, a partir do primeiro título de versão, lança `Error` com o número da linha em qualquer desvio: título de versão fora de `## [x.y.z] - aaaa-mm-dd`, seção `###` fora de `sectionTitles`, conteúdo fora de uma seção `###` ou bloco de código sem fechamento. Antes do primeiro título de versão, linhas que não começam com `"## "` são ignoradas (`if (!current) continue`); uma linha `## ` fora do formato lança erro mesmo ali. Um changelog sem nenhuma versão também lança erro. Como a página é gerada no build, qualquer um desses erros quebra o build.
- Quebras de linha `\r\n` são normalizadas antes do parse.
- A versão atual exibida é `releases[0]`, então o `CHANGELOG.md` precisa listar a versão mais nova primeiro (`ChangelogPage`).
- Os nomes de componente reconhecidos vêm de `componentMeta` de `app/_docs/catalog-meta.ts`, com nomes compostos separados em " e " (`componentNames` em `page.tsx`); `componentsOf` exige nome inteiro (sem letra ou hífen colado) e transforma "Bloco `x`" em "bloco x". Itens sem componente aparecem como "geral".
- A âncora de cada versão é `v{versão com pontos trocados por hífens}` (`anchor`); datas são formatadas em pt-BR com `timeZone: "UTC"` (`formatDay`).
- O fundo alternado (`band`) é calculado a partir da versão mais antiga, para uma versão nova não trocar o fundo das anteriores.

## Side Effects
- `app/novidades/changelog.ts:readChangelog` lê `CHANGELOG.md` do disco com `readFileSync(join(process.cwd(), "CHANGELOG.md"))` durante o build; depende do diretório de trabalho ser a raiz do repositório.

## Verification
- Run: `npm test`
