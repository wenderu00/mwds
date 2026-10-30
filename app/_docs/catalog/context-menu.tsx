import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuTrigger } from "@/registry/marcio/ui/context-menu";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("context-menu"),
  usage: {
    use: ["Atalho para ações de uma linha de tabela ou de um card, para quem já conhece a tela."],
    avoid: ["Ação que só existe ali: ninguém descobre o clique direito. Repita a ação num DropdownMenu ou botão visível.", "Celular: não há clique direito; use DropdownMenu."],
  },
  keyboard: [
    { keys: "Shift + F10 / tecla Menu", action: "Abre o menu no elemento focado." },
    { keys: "Setas", action: "Navegam nos itens e abrem submenus." },
    { keys: "Enter / Espaço", action: "Executa o item." },
    { keys: "Esc", action: "Fecha o menu." },
  ],
  props: [
    { name: "ContextMenuTrigger asChild", type: "boolean", description: "Usa o filho, como uma linha de tabela, como área do clique direito." },
    { name: "ContextMenuItem tone", type: '"neutral" | "danger"', default: '"neutral"', description: "danger para ação destrutiva. variant=\"danger\" é o nome antigo, descontinuado, e sai na 0.23." },
    { name: "ContextMenuItem inset", type: "boolean", default: "false", description: "Alinha com itens que têm indicador." },
    { name: "onSelect", type: "(event) => void", description: "Ação do item." },
  ],
  examples: [
    {
      title: "Ações de um registro",
      className: "w-full",
      code: `<ContextMenu>\n  <ContextMenuTrigger asChild>\n    <div>Pedido 0042</div>\n  </ContextMenuTrigger>\n  <ContextMenuContent>\n    <ContextMenuItem>Abrir</ContextMenuItem>\n    <ContextMenuItem>Duplicar</ContextMenuItem>\n    <ContextMenuSeparator />\n    <ContextMenuItem tone="danger">Excluir</ContextMenuItem>\n  </ContextMenuContent>\n</ContextMenu>`,
      render: () => (
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <div className="flex w-full flex-col gap-1 rounded-card border border-dashed border-line-control p-5">
              <span className="text-ink">Pedido 0042 · Portal da Transparência</span>
              <span className="font-mono text-mono-xs text-ink-muted">{"// clique com o botão direito"}</span>
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>
              Abrir
              <ContextMenuShortcut>Enter</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>Duplicar</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem tone="danger">Excluir</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ),
    },
  ],
  a11y: [
    "O menu tem role menu, itens menuitem e navegação por setas do Radix.",
    "Como o clique direito não aparece na tela, toda ação do ContextMenu precisa existir também num controle visível.",
  ],
};
