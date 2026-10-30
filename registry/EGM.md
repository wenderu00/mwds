# registry

## Overview
Código-fonte publicado pelo registry shadcn do projeto. Hoje há um único namespace, `marcio`, consumido por `scripts/build-registry.ts` (gera `registry.json` na raiz, via `npm run registry:build`) e pelas páginas de documentação do app Next.js. Os testes em `marcio/ui/__tests__` e `marcio/lib/*.test.ts` rodam com `npm test`.

## Subdirectories & Boundaries
- marcio: [./marcio/EGM.md](./marcio/EGM.md) - design system `@mw/ui`: tokens CSS, componentes `ui`, utilitários `lib`, ícones gerados e blocos de página.
