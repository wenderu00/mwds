# Configurações

## Overview
Rota `/configuracoes` do site de documentação. Não tem código próprio: reexporta a página do bloco `settings` do registry, para que a prévia publicada seja o mesmo arquivo que `npx shadcn@latest add @marcio/settings` instala no projeto de quem usa.

## Interface
- `app/configuracoes/page.tsx:default` e `metadata` - reexportados de `registry/marcio/blocks/settings/page.tsx`.

## Invariants
- O arquivo contém só `export { default, metadata } from "@/registry/marcio/blocks/settings/page"`; mudanças de conteúdo ou comportamento acontecem no bloco do registry, não aqui.
- A rota precisa continuar coerente com o bloco `settings` em `app/_docs/blocks.ts:blocks` (`route: "/configuracoes"`), que `app/blocos/page.tsx:BlocksIndex` usa como `src` do `iframe` de prévia.

## Side Effects
- None neste diretório; os efeitos são os do bloco reexportado.

## Verification
- Run: `npm test`
