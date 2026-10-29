import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/registry/marcio/ui/select";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("select"),
  usage: {
    use: ["Escolha única numa lista média, de seis a mais ou menos quinze opções.", "Quando o espaço é curto e as opções não precisam de descrição."],
    avoid: ["Até cinco opções: use RadioGroup, que mostra todas.", "Lista longa ou que precisa de busca: use Combobox.", "Ações: use DropdownMenu."],
  },
  keyboard: [
    { keys: "Enter / Espaço / Setas", action: "No gatilho, abrem a lista com o foco na opção marcada." },
    { keys: "Setas para cima e para baixo", action: "Percorrem as opções." },
    { keys: "Letra", action: "Pula para a opção que começa com ela." },
    { keys: "Enter / Espaço", action: "Escolhe a opção e fecha." },
    { keys: "Esc", action: "Fecha sem mudar e devolve o foco ao gatilho." },
  ],
  props: [
    { name: "value / onValueChange", type: "string / (value) => void", description: "Uso controlado, como no Controller do React Hook Form." },
    { name: "defaultValue", type: "string", description: "Valor inicial não controlado." },
    { name: "disabled", type: "boolean", description: "Desabilita o gatilho." },
    { name: "SelectTrigger size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Mesma altura do Button e do Input." },
    { name: "SelectTrigger aria-invalid", type: "boolean", description: "Borda de erro. Dentro do FormField, vem do error." },
  ],
  examples: [
    {
      title: "Básico",
      className: "w-full max-w-xs",
      code: `<Select defaultValue="ativo">\n  <SelectTrigger aria-label="Status"><SelectValue /></SelectTrigger>\n  <SelectContent>\n    <SelectItem value="ativo">Ativo</SelectItem>\n    <SelectItem value="pausado">Pausado</SelectItem>\n  </SelectContent>\n</Select>`,
      render: () => (
        <Select defaultValue="ativo">
          <SelectTrigger aria-label="Status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="pausado">Pausado</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectItem value="arquivado" disabled>
              Arquivado
            </SelectItem>
          </SelectContent>
        </Select>
      ),
    },
  ],
  a11y: ["Abre com Enter, Espaço ou setas; digitar uma letra pula para a opção.", "Sem rótulo visível, use aria-label no SelectTrigger."],
};
