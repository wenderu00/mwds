import { FormField } from "@/registry/marcio/ui/form-field";
import { SearchInput } from "@/registry/marcio/ui/search-input";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("search-input"),
  usage: {
    use: ["Filtrar uma listagem ou tabela pelo texto.", "Busca dentro de uma seção, perto do que ela filtra."],
    avoid: ["Busca global com atalhos e comandos: use CommandPalette.", "Escolher um valor de uma lista conhecida: use Combobox."],
  },
  keyboard: [
    { keys: "Esc", action: "Limpa o texto. Com o campo vazio, não faz nada." },
    { keys: "Tab", action: "Vai do campo para o botão Limpar busca, quando há texto." },
  ],
  props: [
    { name: "value / onValueChange", type: "string / (value) => void", description: "Uso controlado." },
    { name: "defaultValue", type: "string", description: "Valor inicial não controlado." },
    { name: "clearLabel", type: "string", default: '"Limpar busca"', description: "Nome do botão de limpar." },
    { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Mesma altura do Button e do Input." },
    classNameProp,
  ],
  examples: [
    {
      title: "Filtro de listagem",
      className: "w-full flex-col items-stretch",
      code: `<FormField label="Buscar projetos">\n  <SearchInput value={busca} onValueChange={setBusca} />\n</FormField>`,
      render: (theme) => (
        <FormField label="Buscar projetos" id={`search-${theme}`}>
          <SearchInput defaultValue="ouvidoria" />
        </FormField>
      ),
    },
  ],
  a11y: [
    "É um input type search, anunciado como campo de busca.",
    "A lupa é decorativa; o nome vem do rótulo do FormField ou de aria-label.",
    "Depois de limpar pelo botão, o foco volta ao campo.",
  ],
};
