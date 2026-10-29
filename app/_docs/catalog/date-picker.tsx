import { DatePicker } from "@/registry/marcio/ui/date-picker";
import { FormField } from "@/registry/marcio/ui/form-field";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("date-picker"),
  usage: {
    use: ["Campo de data em formulário: vencimento, início, agendamento, nascimento. Quem sabe a data digita; quem não sabe abre o calendário."],
    avoid: ["Período com início e fim: use DateRangePicker.", "Calendário sempre visível: use Calendar.", "Mês e ano sem dia: use dois Select."],
  },
  props: [
    { name: "value / onValueChange", type: "Date | null / (date) => void", description: "Uso controlado, como no Controller do React Hook Form." },
    { name: "defaultValue", type: "Date | null", description: "Valor inicial não controlado." },
    { name: "fromDate / toDate", type: "Date", description: "Primeiro e último dia que podem ser escolhidos." },
    { name: "clearable", type: "boolean", default: "false", description: "Mostra o botão de limpar quando há data." },
    { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Mesma altura do Button e do Input." },
    { name: "placeholder", type: "string", default: '"dd/mm/aaaa"', description: "Texto do campo vazio." },
    { name: "calendarLabel", type: "string", default: '"Abrir calendário"', description: "Nome do botão que abre o calendário." },
    { name: "invalidMessage", type: "string", default: '"Data inválida. Digite no formato dd/mm/aaaa."', description: "Mensagem para data incompleta ou que não existe. Fora de fromDate e toDate, a mensagem diz o intervalo aceito." },
    { name: "name", type: "string", description: "Cria um input escondido com a data em aaaa-mm-dd." },
  ],
  examples: [
    {
      title: "Data única",
      className: "w-full flex-col items-stretch",
      code: `<FormField label="Vencimento">\n  <DatePicker value={data} onValueChange={setData} clearable />\n</FormField>`,
      render: (theme) => (
        <>
          <FormField label="Vencimento" id={`dp-a-${theme}`}>
            <DatePicker defaultValue={new Date(2026, 9, 15)} clearable />
          </FormField>
          <FormField label="Data de início" id={`dp-b-${theme}`} error="Escolha a data de início.">
            <DatePicker />
          </FormField>
        </>
      ),
    },
    {
      title: "Com React Hook Form",
      code: `<Controller\n  control={control}\n  name="vencimento"\n  rules={{ required: "Escolha a data de vencimento." }}\n  render={({ field, fieldState }) => (\n    <FormField label="Vencimento" required error={fieldState.error?.message}>\n      <DatePicker value={field.value} onValueChange={field.onChange} />\n    </FormField>\n  )}\n/>`,
      render: (theme) => (
        <FormField label="Vencimento" required id={`dp-rhf-${theme}`} className="w-full">
          <DatePicker />
        </FormField>
      ),
    },
  ],
  a11y: [
    "O DatePicker é um campo de texto com teclado numérico no celular. Recebe o rótulo, a descrição, o erro e o obrigatório do FormField.",
    "Data incompleta, inexistente ou fora do intervalo marca o campo com aria-invalid e liga a mensagem por aria-describedby. O valor vira null até a data ser corrigida.",
    "O botão Abrir calendário abre um diálogo. O foco vai para o dia escolhido ou para hoje; ao escolher ou fechar, volta ao campo.",
    "O botão de limpar tem nome próprio (Limpar data) e devolve o foco ao campo.",
  ],
  keyboard: [
    { keys: "Dígitos", action: "No campo, preenchem dd/mm/aaaa; as barras entram sozinhas." },
    { keys: "Alt + seta para baixo", action: "No campo, abre o calendário." },
    { keys: "Enter / Espaço", action: "No botão do calendário, abre. Num dia, escolhe e fecha." },
    { keys: "Setas, Page Up / Page Down, Home / End", action: "Navegam no calendário, como no Calendar." },
    { keys: "Esc", action: "Fecha sem mudar a data e devolve o foco ao campo." },
  ],
};
