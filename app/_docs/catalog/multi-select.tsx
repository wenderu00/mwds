import { FormField } from "@/registry/marcio/ui/form-field";
import { MultiSelect } from "@/registry/marcio/ui/multi-select";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("multi-select"),
  usage: {
    use: ["Filtros e categorias com várias escolhas numa lista longa.", "Até umas dez escolhas visíveis como chips."],
    avoid: ["Até cinco opções: use Checkbox, todas visíveis.", "Uma escolha só: use Select ou Combobox."],
  },
  keyboard: [
    { keys: "Enter / Espaço / seta para baixo", action: "No gatilho, abre a lista com a busca focada." },
    { keys: "Setas", action: "Navegam nas opções." },
    { keys: "Enter", action: "Marca ou desmarca a opção, sem fechar." },
    { keys: "Esc", action: "Fecha e devolve o foco ao gatilho." },
    { keys: "Backspace", action: "No gatilho, remove a última escolha." },
  ],
  props: [
    { name: "options", type: "MultiSelectOption[]", description: "{ value, label, keywords?, disabled? }, o mesmo formato do Combobox." },
    { name: "value / onValueChange", type: "string[] / (value) => void", description: "Uso controlado, na ordem em que foram escolhidas." },
    { name: "defaultValue", type: "string[]", description: "Valor inicial não controlado." },
    { name: "placeholder / addLabel", type: "ReactNode", default: '"Selecione" / "Adicionar"', description: "Texto do gatilho sem e com escolhas." },
    { name: "removeLabel", type: "(label) => string", default: '"Remover <rótulo>"', description: "Nome do botão de cada chip." },
    { name: "name", type: "string", description: "Cria um input escondido por valor escolhido." },
    { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Altura mínima; o campo cresce quando os chips quebram linha." },
  ],
  examples: [
    {
      title: "Estados atendidos",
      className: "w-full flex-col items-stretch",
      code: `<FormField label="Estados atendidos">\n  <MultiSelect options={estados} value={escolhidos} onValueChange={setEscolhidos} />\n</FormField>`,
      render: (theme) => (
        <FormField label="Estados atendidos" id={`ms-${theme}`}>
          <MultiSelect
            defaultValue={["pe", "pb"]}
            options={[
              { value: "al", label: "Alagoas" },
              { value: "ba", label: "Bahia" },
              { value: "ce", label: "Ceará" },
              { value: "pb", label: "Paraíba" },
              { value: "pe", label: "Pernambuco" },
              { value: "rn", label: "Rio Grande do Norte" },
              { value: "se", label: "Sergipe" },
            ]}
          />
        </FormField>
      ),
    },
  ],
  a11y: [
    "O gatilho tem role combobox e diz quantas e quais opções estão escolhidas.",
    "Cada opção da lista tem aria-checked, e cada chip tem um botão Remover com o rótulo.",
    "Depois de remover um chip, o foco volta ao gatilho.",
  ],
};
