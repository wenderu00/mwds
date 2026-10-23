# 0002. Arquitetura de tokens em duas camadas e troca de tema por atributo

Status: aceito

## Contexto

Os componentes precisam funcionar nos dois temas sem variantes `dark:` espalhadas, e o Tailwind v4 lê tokens direto do CSS.

## Decisão

Duas camadas em `registry/marcio/tokens.css`:

1. **Primitivos** (`--mw-accent-50` a `--mw-accent-950`): valores crus, sem significado de uso.
2. **Semânticos** (`--mw-ground`, `--mw-accent-text`, `--mw-danger-soft`...): definidos em `:root` (escuro) e redefinidos para o claro.

O Tailwind expõe só os semânticos, via `@theme inline { --color-ground: var(--mw-ground); ... }`. Assim `bg-surface` muda sozinho quando o tema muda.

Resolução do tema:

- Sem atributo: segue `prefers-color-scheme`. Se o sistema não informar preferência, fica escuro.
- `data-theme="light"` ou `data-theme="dark"` no `<html>` força o tema e vence o sistema.
- Seletores: `:root` (escuro), `@media (prefers-color-scheme: light) { :root:not([data-theme="dark"]) }` e `[data-theme="light"]` (claro).
- `color-scheme` acompanha o tema, para scrollbars e controles nativos.
- O `ThemeToggle` grava a escolha em `localStorage` e um script inline no `<head>` aplica o atributo antes da pintura, evitando piscar.

As paletas padrão do Tailwind (`red-500`, `neutral-800`...) são removidas com `--color-*: initial`, de modo que só os tokens do DS existem como classes de cor.

## Consequências

- Um componente nunca escolhe cor por tema; quem escolhe é o token.
- Projetos que já usam a paleta padrão do Tailwind perdem essas classes ao importar os tokens. O README vai explicar como manter as duas, se for preciso.
