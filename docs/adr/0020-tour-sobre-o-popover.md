# 0020. Tour sobre o Popover do Radix

Status: aceito

## Contexto

O XPomodoro, primeiro app migrado para o @mw/ui, tem um tour de onboarding de seis passos feito com o `react-joyride`: recorte em volta do alvo, balão próprio e os botões pular, voltar e avançar. O DS não tinha nada parecido. As opções eram embutir o `react-joyride` num item do registry ou montar o Tour sobre o Popover do Radix que o DS já usa.

## Decisão

- `registry/marcio/ui/tour.tsx` monta o balão sobre o `Popover` do DS em modo `modal`, ancorado no alvo por uma âncora virtual (`virtualRef`). Sem alvo, ou com `placement: "center"`, a âncora vira o centro da tela.
- Do Radix vêm o posicionamento com troca de lado quando falta espaço, a camada de foco preso, o Esc e o `aria-hidden` no resto da página. O Tour acrescenta `aria-modal`, o nome pelo título do passo, a região `status` que anuncia cada passo, a rolagem até o alvo e a devolução do foco a quem tinha o foco antes de abrir.
- O recorte é um `div` com `rounded-card` e um contorno largo em `scrim`, então usa o raio e a cor dos tokens e passa pelo lint de cores e de tokens. Não é sombra: o DS não tem tokens de sombra.
- A API é controlada (`open`, `onOpenChange`, `step`, `onStepChange`, `onFinish`, `onSkip`). Guardar que a pessoa já viu o tour fica com o app.
- Clique fora do balão não fecha o tour; para sair, Pular ou Esc.

## Por que não o react-joyride

- O balão e os botões do joyride são próprios dele. Para ficarem com a cara do DS, o app teria de passar um `tooltipComponent` inteiro, o que é praticamente escrever o balão do Tour do mesmo jeito.
- A camada e o recorte do joyride saem de estilos em linha com cores próprias, fora dos tokens e dos temas escuro e claro.
- O DS já carrega o Radix. O joyride traz o próprio posicionamento e o próprio controle de foco, com comportamento diferente do Popover, Dialog e Sheet do resto do sistema.
- Sem dependência nova no registry: `npx shadcn@latest add @marcio/tour` só puxa o que o Popover e o Button já usam.

## Consequências

- O Tour não tem passos com espera por ação (avançar quando a pessoa clica no alvo), nem beacon, nem tour entre rotas. Se um app precisar, entra como prop nova.
- O Tour depende do `virtualRef` do `Popover.Anchor`, que está nos tipos do Radix mas não na documentação do Popover. Se uma versão do Radix mexer nele, os testes do Tour quebram antes de chegar aos apps.
- O Tour entra como beta.
