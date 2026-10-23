# 0010. Distribuição via registry do shadcn e stack do repositório

Status: aceito. A parte de itens do registry foi detalhada no ADR 0013.

## Decisão

- Next.js 16 (App Router), React 19, TypeScript strict, Tailwind v4. Mesmas versões do portfólio.
- O app de documentação é também o host do registry: `shadcn build` gera `public/r/*.json`, servido em `<url>/r/<componente>.json`.
- Itens do registry:
  - `marcio-tokens` (`registry:style`): `tokens.css`, fontes e estilos base (seleção, foco).
  - `utils` (`registry:lib`): helper `cn`.
  - Um item `registry:ui` por componente, declarando `registryDependencies` (`marcio-tokens`, `utils` e outros componentes) e `dependencies` npm (Radix, cva).
- Instalar qualquer componente instala os tokens junto, então funciona num projeto vazio de primeira.
- Fontes via `next/font/google` no app e documentadas no README para projetos consumidores, com as variáveis `--font-bricolage`, `--font-plex-sans` e `--font-plex-mono` que os tokens esperam.
- Radix UI pelo pacote unificado `radix-ui`.
- Testes: Vitest + Testing Library + vitest-axe em jsdom.
