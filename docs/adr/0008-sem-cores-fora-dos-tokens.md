# 0008. Nenhuma cor fora de `tokens.css`, garantido por lint

Status: aceito

## Decisão

- Regra local de ESLint (`eslint-rules/no-raw-color.js`) que falha em strings de `className`, `cn()`, `cva()` e `style` contendo:
  - hex (`#fff`, `#ece41f`), `rgb(`, `hsl(`, `oklch(`;
  - valores arbitrários de cor (`bg-[#...]`, `text-[rgb(...)]`, `border-[color:...]`);
  - classes de paleta padrão do Tailwind (`bg-red-500`, `text-neutral-400`).
- Um script complementar (`scripts/check-colors.ts`) procura hex e funções de cor em `.css` fora de `tokens.css`.
- Aplica-se a `registry/**` e `app/**`.

## Consequências

A paleta padrão do Tailwind também é removida no `@theme` (ADR 0002), então uma classe proibida não gera CSS mesmo que escape do lint.
