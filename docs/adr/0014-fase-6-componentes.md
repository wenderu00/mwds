# 0014. Decisões visuais da Fase 6

Status: aceito

## Contexto

A Fase 6 adiciona componentes que o portfólio não tem. As decisões abaixo foram tomadas com o Márcio no início de cada etapa.

## Etapa A: formulário e navegação

- **Radio marcado:** círculo preenchido em `accent` com ponto `on-accent`, a mesma regra do Checkbox.
- **Item destacado em listas** (DropdownMenu, Combobox, Command): `accent-soft`, igual ao Select. Um único padrão de destaque no DS.
- **Pagination:** página atual como botão primário amarelo; as demais em ghost.
- **Combobox e Command** usam `cmdk`, com busca que ignora acentos.
- **FormField** passa a expor o id do rótulo no contexto, para grupos (RadioGroup) usarem `aria-labelledby`, já que `<label for>` não nomeia um `radiogroup`.

## Etapa B: feedback e estrutura

- **Alert:** fundo `-soft` inteiro do estado, com ícone e título no tom `-text`. Diferencia o aviso fixo na página do Toast flutuante, que usa faixa lateral.
- **Sheet:** abre pela direita por padrão; `side` aceita os quatro lados. Reaproveita o overlay `scrim` do Dialog.
- **Avatar sem foto:** fundo `surface`, borda `line-strong`, iniciais em mono `ink-soft`.
- **Progress:** barra em `accent-line` sobre trilho `surface`. No escuro é o amarelo; no claro vira oliva, pela regra do amarelo (ADR 0003), porque amarelo sobre o trilho claro daria 1,2:1 e a barra é informação, não decoração.
- **Skeleton:** blocos em `surface` com pulso lento, só com `motion-safe`.

## Etapa C: Command Palette e AppShell

- **Sidebar recolhida:** 256px aberta e 64px recolhida, só com ícones; o nome de cada item aparece em tooltip e continua como nome acessível. A escolha fica salva em `localStorage` (`mw-sidebar`).
- **Item ativo:** barra de 2px em `accent-line` à esquerda, fundo `accent-soft` e texto `ink`, com `aria-current="page"`.
- **Mobile (abaixo de 1024px):** a sidebar sai e a mesma navegação abre num Sheet pela esquerda.
- **Command Palette:** o campo mantém o prompt `>` em `accent-text` do Command; abre com ⌘K no Mac e Ctrl+K nos outros sistemas, centralizado no alto da tela.

## Etapa D: blocos

- **Dashboard:** painel de gestão de projetos, continuando a tela de listagem: projetos ativos, horas no mês, entregas atrasadas, taxa de conclusão, prazos da semana e atividade recente.
- **Sem gráficos por enquanto.** Gráficos pedem uma paleta de dados própria, que fica para uma fase futura. As métricas usam números, Badge e Progress.
- **404:** GlitchText, linha de terminal com o caminho não encontrado e cursor; sem jogo.
- **Formato no registry:** cada pasta em `registry/marcio/blocks/` vira um item `registry:block`. Páginas têm `target` fixo (`app/login/page.tsx`, `app/not-found.tsx`, `app/dashboard/page.tsx`, `app/configuracoes/page.tsx`); componentes do bloco vão para `components/blocks/<bloco>/`, o mesmo caminho para onde o CLI reescreve os imports `@/registry/marcio/blocks/...`.
- **`admin-shell`** é um bloco só de componente (AppShell com navegação, busca ⌘K e menu do usuário), compartilhado por Dashboard e Configurações.
- **O site de documentação usa os próprios blocos** nas mesmas rotas que eles ocupam num projeto instalado (`/login`, `/dashboard`, `/configuracoes` e a página 404).
- **Exceção de foco nas Tabs:** a lista de abas rola na horizontal, e o `overflow` cortaria o contorno de foco com offset de 3px. Nas abas o contorno continua com 3px e cor `focus`, mas fica para dentro (offset −3px). A linha de base passou a ser um pseudo-elemento, o que eliminou a barra de rolagem vertical que aparecia ao lado das abas.
- **CardTitle** ganhou a prop `as` (h2, h3, h4 ou p), porque nas Configurações os títulos dos cards vinham logo depois do h1 e pulavam um nível.
