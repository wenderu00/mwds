# 0012. Aparência dos compostos e padrões

Status: aceito

## Contexto

Overlay de diálogo, tooltip, toast e tabela não existem no portfólio. Estas decisões foram tomadas com o Márcio antes da Fase 4.

## Decisão

- **Overlay do Dialog:** novo token `scrim`, preto a 70% no escuro e a 40% no claro. Sem blur.
- **Dialog:** card `surface` com borda `line-strong`, `rounded-xl`, título em display e botão de fechar ghost.
- **Tooltip:** invertido, fundo `ink` e texto `ground`, mono 13px, `rounded-md`. O par `ground` sobre `ink` entra na validação de contraste.
- **Toast:** canto inferior direito, card `surface` com borda `line-strong` e faixa de 4px à esquerda na cor sólida do estado. Empilha de baixo para cima.
- **Table:** linhas separadas por `line`, cabeçalho `surface` em mono, hover de linha em `band`, linha selecionada em `accent-soft`.
- **Tabs:** abas em mono; a ativa fica `ink` com sublinhado de 2px em `accent-line`, como previsto em `docs/tokens.md`.
- **Select:** gatilho igual ao Input; lista em `surface`; item destacado em `accent-soft`; item marcado com check em `accent-text`.
- **FormField:** injeta `id`, `aria-describedby`, `aria-invalid` e `aria-required` no controle filho via Slot. Funciona com `register()` e com `Controller` do React Hook Form, sem depender da biblioteca.
- **ThemeToggle:** grupo de rádio com sistema, escuro e claro, gravando em `localStorage` (`mw-theme`). O `ThemeScript` aplica a escolha antes da primeira pintura.
- **Entradas animadas** (overlay, dialog, toast, tooltip) usam fade e escala curtos, só com `motion-safe`.

## Consequências

Paginação não virou componente: ela aparece só na tela de exemplo de listagem, montada com Button. Se for usada em outros projetos, pode virar componente numa fase futura.
