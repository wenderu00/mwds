import { DateRangePicker } from "@/registry/marcio/ui/date-picker";
import { FormField } from "@/registry/marcio/ui/form-field";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("date-range-picker"),
  usage: {
    use: ["Filtros de relatório e listagem por período.", "Reservas e vigências com início e fim."],
    avoid: ["Uma data só: use DatePicker.", "Períodos fixos, como este mês ou últimos 30 dias: use ToggleGroup ou Select."],
  },
  props: [
    { name: "value / onValueChange", type: "{ from?: Date; to?: Date } | null / (range) => void", description: "Uso controlado. Fecha quando início e fim estão escolhidos." },
    { name: "defaultValue", type: "{ from?: Date; to?: Date } | null", description: "Valor inicial não controlado." },
    { name: "numberOfMonths", type: "number", default: "2", description: "Meses lado a lado." },
    { name: "fromDate / toDate", type: "Date", description: "Primeiro e último dia que podem ser escolhidos." },
    { name: "clearable", type: "boolean", default: "false", description: "Mostra o botão Limpar período." },
    { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Mesma altura do Button e do Input." },
    { name: "name", type: "string", description: "Cria um input escondido com aaaa-mm-dd/aaaa-mm-dd." },
  ],
  examples: [
    {
      title: "Período",
      className: "w-full flex-col items-stretch",
      code: `<FormField label="Período">\n  <DateRangePicker value={periodo} onValueChange={setPeriodo} clearable />\n</FormField>`,
      render: (theme) => (
        <FormField label="Período" id={`drp-${theme}`}>
          <DateRangePicker defaultValue={{ from: new Date(2026, 9, 12), to: new Date(2026, 9, 16) }} clearable />
        </FormField>
      ),
    },
  ],
  a11y: [
    "O gatilho tem role combobox, abre um diálogo e recebe o rótulo, a descrição e o erro do FormField.",
    "O texto do gatilho diz o período inteiro: 12/10/2026 até 16/10/2026.",
    "Ao fechar, o foco volta ao gatilho.",
  ],
  keyboard: [
    { keys: "Enter / Espaço", action: "No gatilho, abre o calendário. Num dia, marca o início e depois o fim." },
    { keys: "Setas, Page Up / Page Down, Home / End", action: "Navegam no calendário, como no Calendar." },
    { keys: "Esc", action: "Fecha sem mudar o período." },
  ],
};
