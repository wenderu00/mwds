# Login

## Overview
Rota `/login` do site de documentação. Não tem código próprio: reexporta a página do bloco `login` do registry, para que a prévia publicada seja o mesmo arquivo que `npx shadcn@latest add @marcio/login` instala no projeto de quem usa.

## Interface
- `app/login/page.tsx:default` e `metadata` - reexportados de `registry/marcio/blocks/login/page.tsx`.

## Invariants
- O arquivo contém só `export { default, metadata } from "@/registry/marcio/blocks/login/page"`; mudanças de conteúdo ou comportamento acontecem no bloco do registry, não aqui.
- A rota precisa continuar coerente com o bloco `login` em `app/_docs/blocks.ts:blocks` (`route: "/login"`), que `app/blocos/page.tsx:BlocksIndex` usa como `src` do `iframe` de prévia.

## Side Effects
- None neste diretório; os efeitos são os do bloco reexportado.

## Verification
- Run: `npm test`
