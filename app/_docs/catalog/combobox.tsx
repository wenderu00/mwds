import { Combobox } from "@/registry/marcio/ui/combobox";
import { FormField } from "@/registry/marcio/ui/form-field";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("combobox"),
  usage: {
    use: ["Escolha única numa lista longa, de mais ou menos 15 opções para cima.", "Listas em que a pessoa sabe o nome do que procura: cidades, clientes, projetos."],
    avoid: ["Até cinco opções: use RadioGroup.", "Lista média que dá para ler inteira: use Select.", "Várias escolhas ao mesmo tempo: ainda não há componente; use Checkbox numa lista."],
  },
  keyboard: [
    { keys: "Enter / Espaço / Seta para baixo", action: "No gatilho, abre a lista com o foco na busca." },
    { keys: "Digitar", action: "Filtra as opções, ignorando acentos." },
    { keys: "Setas para cima e para baixo", action: "Percorrem as opções." },
    { keys: "Enter", action: "Escolhe a opção destacada e fecha." },
    { keys: "Esc", action: "Fecha sem mudar e devolve o foco ao gatilho." },
  ],
  props: [
    { name: "options", type: "ComboboxOption[]", description: "{ value, label, keywords?, disabled? }" },
    { name: "value / defaultValue", type: "string", description: "Valor selecionado. Clicar de novo na opção marcada limpa a seleção." },
    { name: "onValueChange", type: "(value: string) => void", description: "Chamado ao escolher." },
    { name: "placeholder", type: "ReactNode", default: '"Selecione"', description: "Texto sem seleção." },
    { name: "searchPlaceholder", type: "string", default: '"Buscar"', description: "Texto e nome do campo de busca." },
    { name: "emptyText", type: "ReactNode", default: '"Nada encontrado"', description: "Estado sem resultado." },
    { name: "name", type: "string", description: "Cria um input escondido para formulários nativos." },
    { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Mesma altura do Button: 36px, a altura de controle da densidade (44px na padrão) e 48px." },
    classNameProp,
  ],
  examples: [
    {
      title: "Cidades",
      className: "w-full max-w-sm",
      code: `<FormField label="Cidade">\n  <Combobox options={cidades} placeholder="Escolha uma cidade" emptyText="Nenhuma cidade" />\n</FormField>`,
      render: (theme) => (
        <FormField label="Cidade" id={`cidade-${theme}`} className="w-full">
          <Combobox
            placeholder="Escolha uma cidade"
            emptyText="Nenhuma cidade"
            options={[
              { value: "recife", label: "Recife" },
              { value: "olinda", label: "Olinda" },
              { value: "jaboatao", label: "Jaboatão dos Guararapes" },
              { value: "paulista", label: "Paulista" },
              { value: "caruaru", label: "Caruaru" },
              { value: "petrolina", label: "Petrolina" },
              { value: "garanhuns", label: "Garanhuns", disabled: true },
            ]}
          />
        </FormField>
      ),
    },
  ],
  a11y: [
    "O gatilho tem role combobox e recebe nome, descrição e erro do FormField.",
    "Ao abrir, o foco vai para a busca; Enter escolhe, Esc fecha e devolve o foco.",
  ],
};
