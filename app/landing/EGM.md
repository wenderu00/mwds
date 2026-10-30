# Landing

## Overview
Rota `/landing` do site de documentação. Não tem código próprio: reexporta a página do bloco `landing` do registry, para que a prévia publicada seja o mesmo arquivo que `npx shadcn@latest add @marcio/landing` instala no projeto de quem usa.

## Interface
- `app/landing/page.tsx:default` e `metadata` - reexportados de `registry/marcio/blocks/landing/page.tsx`.

## Invariants
- O arquivo contém só `export { default, metadata } from "@/registry/marcio/blocks/landing/page"`; mudanças de conteúdo ou comportamento acontecem no bloco do registry, não aqui.
- A rota precisa continuar coerente com o bloco `landing` em `app/_docs/blocks.ts:blocks` (`route: "/landing"`), que `app/blocos/page.tsx:BlocksIndex` usa como `src` do `iframe` de prévia.

## Side Effects
- None neste diretório; os efeitos são os do bloco reexportado.

## Verification
- Run: `npm test`
