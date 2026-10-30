import { Calendar } from "@/registry/marcio/ui/calendar";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("calendar"),
  usage: {
    use: ["Calendário sempre visível na página, como numa agenda ou num filtro lateral. A grade aparece só no cliente, porque o dia de hoje depende do relógio de quem visita.", "Base de DatePicker e DateRangePicker."],
    avoid: ["Campo de data em formulário: use DatePicker, que ocupa uma linha.", "Datas muito distantes, como nascimento: digitar é mais rápido que navegar mês a mês."],
  },
  props: [
    { name: "mode", type: '"single" | "range" | "multiple"', description: "Um dia, um intervalo ou vários dias." },
    { name: "selected / onSelect", type: "Date | DateRange / (value) => void", description: "Uso controlado." },
    { name: "defaultMonth", type: "Date", description: "Mês mostrado ao abrir." },
    { name: "disabled", type: "Matcher | Matcher[]", description: "Dias bloqueados, por exemplo { before: hoje } ou { dayOfWeek: [0, 6] }." },
    { name: "numberOfMonths", type: "number", default: "1", description: "Quantos meses lado a lado." },
    { name: "showOutsideDays", type: "boolean", default: "true", description: "Mostra os dias dos meses vizinhos em ink-muted." },
    classNameProp,
  ],
  examples: [
    {
      title: "Um dia",
      code: `<Calendar mode="single" selected={data} onSelect={setData} />`,
      render: () => <Calendar mode="single" aria-label="Calendário de um dia" defaultMonth={new Date(2026, 9, 1)} selected={new Date(2026, 9, 15)} />,
    },
    {
      title: "Intervalo",
      code: `<Calendar mode="range" selected={periodo} onSelect={setPeriodo} />`,
      render: () => <Calendar mode="range" aria-label="Calendário de intervalo" defaultMonth={new Date(2026, 9, 1)} selected={{ from: new Date(2026, 9, 12), to: new Date(2026, 9, 16) }} />,
    },
  ],
  a11y: [
    "A grade tem role grid, com o mês e o ano como nome. Cada dia é um botão com a data por extenso, e o dia de hoje é anunciado como Hoje.",
    "O dia escolhido usa accent com texto on-accent; o intervalo, accent-soft. Hoje ganha borda e peso, não só cor.",
    "Com mais de um calendário na página, dê um aria-label a cada um: ele também nomeia a barra de navegação.",
  ],
  keyboard: [
    { keys: "Setas", action: "Movem o foco entre os dias. Passar do fim do mês troca de mês." },
    { keys: "Page Up / Page Down", action: "Mês anterior e próximo." },
    { keys: "Shift + Page Up / Page Down", action: "Ano anterior e próximo." },
    { keys: "Home / End", action: "Início e fim da semana." },
    { keys: "Enter / Espaço", action: "Escolhe o dia com foco." },
  ],
};
