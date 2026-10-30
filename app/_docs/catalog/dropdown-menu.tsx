import { DropdownMenuDemo } from "../demos/dropdown-menu";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("dropdown-menu"),
  usage: {
    use: ["Ações sobre um item, como no botão de mais ações de uma linha de tabela.", "Ações secundárias que não cabem na tela, com atalhos em mono."],
    avoid: ["Escolher um valor para um formulário: use Select ou Combobox.", "Navegação principal do site: use links visíveis ou AppShell.", "A ação principal da tela: ela merece um Button visível."],
  },
  keyboard: [
    { keys: "Enter / Espaço / Seta para baixo", action: "No gatilho, abre o menu com o foco no primeiro item." },
    { keys: "Setas para cima e para baixo", action: "Percorrem os itens." },
    { keys: "Seta para a direita / esquerda", action: "Abre e fecha um submenu." },
    { keys: "Enter / Espaço", action: "Executa o item ou marca a opção." },
    { keys: "Letra", action: "Pula para o item que começa com ela." },
    { keys: "Esc", action: "Fecha e devolve o foco ao gatilho." },
  ],
  props: [
    { name: "DropdownMenuItem tone", type: '"neutral" | "danger"', default: '"neutral"', description: "danger para ação destrutiva. variant=\"danger\" é o nome antigo, descontinuado, e sai na 0.23." },
    { name: "DropdownMenuItem onSelect", type: "(event) => void", description: "Executa a ação e fecha o menu." },
    { name: "DropdownMenuContent align", type: '"start" | "center" | "end"', default: '"end"', description: "Alinhamento com o gatilho." },
    { name: "DropdownMenuShortcut", type: "componente", description: "Atalho exibido à direita. Só visual: registre o atalho no app." },
  ],
  examples: [
    {
      title: "Completo",
      code: `<DropdownMenu>\n  <DropdownMenuTrigger asChild><Button variant="secondary">Ações</Button></DropdownMenuTrigger>\n  <DropdownMenuContent>\n    <DropdownMenuItem>Editar <DropdownMenuShortcut>E</DropdownMenuShortcut></DropdownMenuItem>\n    <DropdownMenuSeparator />\n    <DropdownMenuItem tone="danger">Excluir</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>`,
      render: () => <DropdownMenuDemo />,
    },
  ],
  a11y: [
    "Abre com Enter, Espaço ou seta para baixo; setas percorrem, seta para a direita abre submenu, Esc fecha.",
    "Botão só com ícone como gatilho precisa de aria-label.",
  ],
};
