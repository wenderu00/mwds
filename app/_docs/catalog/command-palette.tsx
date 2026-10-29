import { CommandPaletteDemo } from "../demos/command-palette";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("command-palette"),
  usage: {
    use: ["Busca global de páginas e ações em sistemas com muitas telas.", "Atalho para quem usa o teclado; o mesmo destino precisa existir na navegação visível."],
    avoid: ["Única forma de chegar a uma página.", "Busca dentro de um campo de formulário: use Combobox."],
  },
  keyboard: [
    { keys: "Ctrl + K / ⌘ + K", action: "Abre e fecha de qualquer lugar da página." },
    { keys: "Digitar", action: "Filtra os comandos, ignorando acentos." },
    { keys: "Setas para cima e para baixo", action: "Percorrem os comandos." },
    { keys: "Enter", action: "Executa o comando e fecha." },
    { keys: "Esc", action: "Fecha e devolve o foco." },
  ],
  props: [
    { name: "children", type: "CommandGroup / CommandPaletteItem", description: "Itens e grupos da paleta." },
    { name: "trigger", type: "ReactNode", description: "Botão que abre a paleta; use CommandPaletteTrigger." },
    { name: "shortcutKey", type: "string | false", default: '"k"', description: "Tecla usada com ⌘ ou Ctrl. false desliga o atalho." },
    { name: "open / onOpenChange", type: "boolean / (open) => void", description: "Uso controlado." },
    { name: "title", type: "string", default: '"Paleta de comandos"', description: "Nome do diálogo e do campo." },
    { name: "placeholder / emptyText", type: "string / ReactNode", description: "Textos do campo e do estado vazio." },
    { name: "CommandPaletteItem keepOpen", type: "boolean", default: "false", description: "Mantém a paleta aberta depois de escolher." },
  ],
  examples: [
    {
      title: "Com gatilho",
      description: "Neste exemplo o atalho está desligado para não disputar com a paleta do site.",
      code: `<CommandPalette trigger={<CommandPaletteTrigger />}>\n  <CommandGroup heading="Ações">\n    <CommandPaletteItem onSelect={novoProjeto}>\n      Novo projeto <CommandShortcut>N</CommandShortcut>\n    </CommandPaletteItem>\n  </CommandGroup>\n</CommandPalette>`,
      render: () => <CommandPaletteDemo />,
    },
  ],
  a11y: [
    "O atalho funciona em qualquer lugar da página; o gatilho anuncia o atalho com aria-keyshortcuts.",
    "Setas percorrem, Enter executa e fecha, Esc fecha e devolve o foco.",
    "A busca ignora acentos e aceita palavras-chave extras por item.",
  ],
};
