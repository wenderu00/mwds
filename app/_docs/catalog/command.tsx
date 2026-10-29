import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/registry/marcio/ui/command";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("command"),
  usage: {
    use: ["Lista filtrável por texto dentro de outro componente, como Popover ou Dialog.", "Base para buscas próprias quando Combobox e CommandPalette não servem."],
    avoid: ["Campo de formulário com busca: use Combobox.", "Busca global de páginas e ações: use CommandPalette."],
  },
  keyboard: [
    { keys: "Digitar", action: "Filtra a lista, ignorando acentos." },
    { keys: "Setas para cima e para baixo", action: "Percorrem os itens." },
    { keys: "Enter", action: "Executa o item destacado." },
  ],
  props: [
    { name: "label", type: "string", description: "Nome acessível do campo de busca." },
    { name: "filter", type: "(value, search, keywords) => number", default: "commandFilter", description: "Filtro sem acentos que exige todos os termos." },
    { name: "CommandItem keywords", type: "string[]", description: "Termos extras para a busca." },
    { name: "CommandList label", type: "string", description: "Nome acessível da lista." },
  ],
  examples: [
    {
      title: "Lista com grupos",
      className: "w-full",
      code: `<Command label="Buscar comando">\n  <CommandInput placeholder="Buscar comando" />\n  <CommandList label="Comandos">\n    <CommandEmpty>Nada encontrado</CommandEmpty>\n    <CommandGroup heading="Projetos">\n      <CommandItem>Novo projeto <CommandShortcut>N</CommandShortcut></CommandItem>\n    </CommandGroup>\n  </CommandList>\n</Command>`,
      render: () => (
        <Command label="Buscar comando" className="border border-line-strong">
          <CommandInput placeholder="Buscar comando" />
          <CommandList label="Comandos">
            <CommandEmpty>Nada encontrado</CommandEmpty>
            <CommandGroup heading="Projetos">
              <CommandItem>
                Novo projeto <CommandShortcut>N</CommandShortcut>
              </CommandItem>
              <CommandItem>
                Exportar relatório <CommandShortcut>⌘E</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Navegação">
              <CommandItem>Ir para configurações</CommandItem>
              <CommandItem>Ir para usuários</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      ),
    },
  ],
  a11y: ["Setas percorrem os itens e Enter executa.", "O campo e a lista precisam de label: o padrão do cmdk é em inglês."],
};
