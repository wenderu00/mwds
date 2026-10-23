# @mw/ui

Design system pessoal de Márcio Wendell. Visual de terminal: fundo preto, um único amarelo elétrico (`#ece41f`) como destaque e muito texto monoespaçado. Tema escuro por padrão, tema claro acessível, componentes em React com Tailwind CSS v4 e Radix UI, distribuídos pelo registry do shadcn.

A fonte da verdade da identidade é o portfólio em [wenderu00.github.io](https://wenderu00.github.io).

## Sumário

- [Instalar num projeto novo](#instalar-num-projeto-novo)
- [Configurar o layout](#configurar-o-layout)
- [Como os tokens funcionam](#como-os-tokens-funcionam)
- [Aplicar os tokens sem o CLI](#aplicar-os-tokens-sem-o-cli)
- [Itens do registry](#itens-do-registry)
- [Desenvolver o DS](#desenvolver-o-ds)
- [Publicar o registry](#publicar-o-registry)
- [Decisões](#decisões)

## Instalar num projeto novo

Requisitos: Next.js com App Router, React 19 e Tailwind CSS v4. Nos exemplos, `<url>` é o endereço onde o registry está publicado (por exemplo `http://localhost:3000` durante o desenvolvimento).

**1. Crie o projeto**, se ainda não existir:

```bash
npx create-next-app@latest meu-app --ts --tailwind --app --eslint --import-alias "@/*"
```

**2. Instale os tokens** (uma vez por projeto):

```bash
npx shadcn@latest init <url>/r/marcio-tokens.json
```

Esse comando não faz perguntas. Ele:

- cria o `components.json` com os aliases padrão (`@/components/ui`, `@/lib/utils`) e o namespace `@marcio`;
- adiciona Bricolage Grotesque, IBM Plex Sans e IBM Plex Mono ao `app/layout.tsx` via `next/font`;
- cria `lib/utils.ts` com o helper `cn`;
- escreve no `app/globals.css` as variáveis dos dois temas, o mapeamento para o Tailwind, a escala tipográfica, foco, seleção, os utilitários `mw-caret`, `mw-dot-grid` e `mw-typing` e as animações.

Não rode `npx shadcn init` sem a URL antes disso: o init padrão instala o tema do shadcn, que conflita com o nosso.

**3. Adicione componentes**, pela URL ou pelo namespace:

```bash
npx shadcn@latest add <url>/r/button.json
```

```bash
npx shadcn@latest add @marcio/button @marcio/form-field @marcio/select
```

Para instalar tudo de uma vez:

```bash
npx shadcn@latest add @marcio/marcio-ui
```

Cada componente traz as dependências que usa (Radix, class-variance-authority, outros componentes). Os arquivos ficam em `components/ui/` e são seus: edite à vontade.

## Configurar o layout

Três componentes precisam de algo no layout raiz. O CLI também mostra essas instruções ao instalar. Mantenha no `<html>` as classes das fontes que o `init` já adicionou.

```tsx
import { ThemeScript } from "@/components/ui/theme-toggle";
import { Toaster } from "@/components/ui/toast";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
      </body>
    </html>
  );
}
```

| Componente | O que colocar no layout |
|---|---|
| ThemeToggle | `<ThemeScript />` no `<head>` e `suppressHydrationWarning` no `<html>`, para o tema escolhido valer antes da primeira pintura |
| Toast | `<Toaster />` uma vez; depois chame `toast({ title, tone })` de qualquer lugar |
| Tooltip | `<TooltipProvider>` envolvendo a aplicação |

### Opcional: só cores do DS

O registry não apaga a paleta padrão do Tailwind, para não quebrar projetos existentes. Para garantir que só os tokens do DS existam como classe de cor (como neste repositório), adicione no início do `@theme inline` do `globals.css`:

```css
@theme inline {
  --color-*: initial;
  --color-transparent: transparent;
  --color-current: currentColor;
}
```

Depois disso, `bg-red-500` deixa de existir e só classes como `bg-surface` e `text-accent-text` funcionam.

## Como os tokens funcionam

Os componentes só usam tokens semânticos. O valor de cada um muda com o tema:

| Situação | Tema |
|---|---|
| Sem atributo no `<html>` | Segue `prefers-color-scheme`; se o sistema não informar, fica escuro |
| `data-theme="dark"` | Escuro |
| `data-theme="light"` | Claro |

O atributo também funciona em qualquer elemento, para forçar um tema numa parte da página.

Principais classes:

| Grupo | Classes |
|---|---|
| Fundos | `bg-ground`, `bg-band`, `bg-surface` |
| Texto | `text-ink`, `text-ink-soft`, `text-ink-muted` |
| Bordas | `border-line`, `border-line-strong`, `border-line-control` (controles interativos) |
| Accent | `bg-accent` + `text-on-accent` (preenchimento), `text-accent-text` (texto e links), `border-accent-line` (borda acesa), `bg-accent-soft` (seleção) |
| Estados | `bg-{estado}` + `text-on-{estado}`, `bg-{estado}-soft`, `text-{estado}-text` para `danger`, `success`, `warning` e `info` |
| Escala | `bg-accent-50` até `bg-accent-950` |
| Tipografia | `font-display`, `font-sans`, `font-mono`, `text-display-xl` a `text-display-sm`, `text-lead`, `text-mono-sm`, `text-mono-xs`, `tracking-kicker` |

A regra do amarelo: `#ece41f` é sempre preenchimento com texto preto. Quando precisa ser texto ou linha, use `accent-text` e `accent-line`, que no tema claro viram oliva (`#6e6600`), porque amarelo sobre branco dá 1,3:1.

Todos os pares usados passam WCAG AA nos dois temas. A tabela completa está em [docs/tokens.md](docs/tokens.md) e na página inicial do site de documentação.

## Aplicar os tokens sem o CLI

Para projetos fora do Next.js ou sem o shadcn:

1. Copie [`registry/marcio/tokens.css`](registry/marcio/tokens.css) para o projeto.
2. Importe depois do Tailwind no CSS principal:

   ```css
   @import "tailwindcss";
   @import "./tokens.css";
   ```

3. Carregue as fontes e exponha as variáveis `--font-bricolage`, `--font-plex-sans` e `--font-plex-mono` no `<html>`. Sem elas, os tokens caem nas fontes do sistema.
4. Copie [`registry/marcio/lib/utils.ts`](registry/marcio/lib/utils.ts) e os componentes que quiser, ajustando os imports `@/registry/marcio/...`.

## Itens do registry

| Item | Tipo | Conteúdo |
|---|---|---|
| `marcio-tokens` | base | Tokens, fontes e `cn`. Use com `init` |
| `font-bricolage`, `font-plex-sans`, `font-plex-mono` | font | Fontes via `next/font` |
| `utils` | lib | Helper `cn` |
| `kicker`, `section-title`, `code-comment`, `logo-block`, `dot-grid`, `typing-text`, `glitch-text` | ui | Identidade |
| `button`, `input`, `textarea`, `label`, `checkbox`, `switch`, `radio-group`, `badge`, `avatar`, `skeleton`, `spinner`, `link` | ui | Primitivos |
| `form-field`, `card`, `select`, `combobox`, `command`, `popover`, `dropdown-menu`, `dialog`, `sheet`, `toast`, `alert`, `tabs`, `table`, `pagination`, `breadcrumb`, `progress`, `tooltip` | ui | Compostos |
| `page-header`, `empty-state`, `theme-toggle`, `command-palette`, `app-shell` | ui | Padrões |
| `login`, `not-found`, `dashboard`, `settings` | block | Telas prontas (ver abaixo) |
| `admin-shell` | block | Casca de painel usada por `dashboard` e `settings` |
| `marcio-ui` | item | Todos os componentes |

Exemplos, props e notas de acessibilidade de cada componente ficam em `<url>/componentes`. Telas completas de sistema estão em `<url>/exemplos`, e os blocos em `<url>/blocos`.

### Blocos

Blocos são telas inteiras. Cada um instala a página, os componentes próprios em `components/blocks/<bloco>/` e todos os componentes do DS que usa.

```bash
npx shadcn@latest add @marcio/dashboard
```

| Bloco | Página criada | Observação |
|---|---|---|
| `login` | `app/login/page.tsx` | Passe `onLogin` para o `LoginForm` no lugar da função de demonstração |
| `not-found` | `app/not-found.tsx` | Substitui a página 404 do projeto |
| `dashboard` | `app/dashboard/page.tsx` | Dados de exemplo em `components/blocks/dashboard/data.ts` |
| `settings` | `app/configuracoes/page.tsx` | Perfil, preferências (tema, densidade, fuso, notificações) e conta |

Dashboard e Configurações instalam também o `admin-shell`. Edite a lista `navigation` dele com as rotas do seu sistema. Os blocos usam toasts, então o `<Toaster />` precisa estar no layout raiz (ver [Configurar o layout](#configurar-o-layout)).

## Desenvolver o DS

```bash
npm install
```

```bash
npm run dev
```

| Script | Faz |
|---|---|
| `npm run dev` | Site de documentação em `http://localhost:3000`, que também serve o registry em `/r` |
| `npm run build` | Gera o `registry.json`, roda `shadcn build` (saída em `public/r`) e o `next build` |
| `npm run registry:build` | Só o registry |
| `npm run lint` | ESLint, com a regra que proíbe cores fora dos tokens, e a checagem de cores em CSS |
| `npm run test` | Validação de contraste e testes (Vitest, Testing Library e vitest-axe) |
| `npm run contrast` | Tabela de contraste de todos os pares nos dois temas |
| `npm run accent-scale` | Mostra a escala do accent gerada em OKLCH |
| `npm run typecheck` | TypeScript sem emitir arquivos |

Rode `npm run registry:build` em outro terminal depois de mudar algo em `registry/` com o `dev` rodando; o `dev` serve o que estiver em `public/r`.

### Regras do repositório

- **Cores só em `tokens.css`.** A regra `mw/no-raw-color` reprova hex, `rgb()`, `oklch()`, valores arbitrários como `bg-[#fff]` e classes da paleta padrão como `bg-red-500`.
- **Contraste validado.** `scripts/contrast-pairs.ts` lista cada par de token usado. Um par novo num componente entra na lista; `npm run test` falha se algum ficar abaixo de 4,5:1 (texto) ou 3:1 (bordas de controle e foco).
- **Movimento opcional.** Toda animação usa `motion-safe:` ou fica dentro de `prefers-reduced-motion: no-preference`.
- **Acessibilidade testada.** Cada componente tem testes de comportamento e de axe nos dois temas.

### Adicionar um componente

1. Crie `registry/marcio/ui/<nome>.tsx` usando só tokens semânticos, aceitando `className` e repassando as props nativas.
2. Escreva os testes em `registry/marcio/ui/__tests__/`.
3. Documente em `app/_docs/catalog.tsx`; a página `/componentes/<nome>` é gerada a partir disso.
4. Rode `npm run registry:build`. O item entra no `registry.json` com as dependências lidas dos imports. O teste `scripts/build-registry.test.ts` falha se o passo 3 ou 4 for esquecido.

## Publicar o registry

O registry é o próprio site de documentação. Para publicar:

1. Defina a URL final antes do build, porque ela entra nas dependências entre itens:

   ```bash
   REGISTRY_URL=https://seu-dominio.com npm run build
   ```

2. Publique o resultado num host de Next.js (Vercel, por exemplo). Os arquivos ficam em `https://seu-dominio.com/r/<item>.json`.

O `registry.json` versionado usa `http://localhost:3000`. Isso não importa para quem instala: os arquivos servidos em `/r` são gerados no build com a `REGISTRY_URL` definida.

## Decisões

As decisões de design e arquitetura estão registradas em [docs/adr/](docs/adr/). As principais:

- [0003](docs/adr/0003-regra-do-amarelo.md): regra do amarelo nos dois temas
- [0006](docs/adr/0006-borda-de-controles.md): token `line-control` para bordas de 3:1
- [0007](docs/adr/0007-validacao-de-contraste.md): contraste validado por script
- [0013](docs/adr/0013-formato-do-registry.md): formato do registry e fluxo de instalação
