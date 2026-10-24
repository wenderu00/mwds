# 0017. Contorno do preenchimento amarelo

Status: aceito. Revisa a consequência do [ADR 0003](0003-regra-do-amarelo.md).

## Contexto

O ADR 0003 aceitou o preenchimento `#ece41f` sobre branco sem contorno, porque o rótulo em preto identifica o botão. Isso vale para o Button, mas não para controles sem texto dentro: Checkbox, Radio e Switch marcados e o dia selecionado do Calendar. Neles o próprio preenchimento é o indicador de estado, e o WCAG 1.4.11 pede 3:1 contra o fundo. Amarelo sobre ground, band e surface no claro fica perto de 1,3:1. A página atual da Pagination, que reaproveita o botão primário, também parecia apagada.

## Decisão

- Novo token `accent-edge`: accent-300 (`#ece41f`) no escuro e accent-700 (`#6e6600`) no claro.
- Todo preenchimento `accent` que marca estado ou ação ganha borda de 1px em `accent-edge`: Button primary (e com ele a página atual da Pagination), Checkbox marcado e indeterminado, Radio marcado, Switch ligado e dia selecionado do Calendar.
- No escuro a borda tem a mesma cor do preenchimento e não muda nada na tela.
- `npm run contrast` verifica `accent-edge` sobre ground, band e surface com mínimo de 3:1. O par `accent` sobre fundo claro continua fora da lista, de propósito: quem garante o contorno é a borda.
- Ficam sem borda: LogoBlock, badge sólido, seleção de texto, ThemeToggle e ToggleGroup, em que o texto ou o grupo com borda já identificam o elemento.

## Consequências

No claro, os controles marcados ganham um contorno oliva fino e passam 3:1 (5,89 / 5,65 / 5,41 sobre ground, band e surface). Quem sobrescreve a borda do botão primário com `className` perde o contorno no tema claro.
