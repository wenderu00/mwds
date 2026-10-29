import { Button } from "@/registry/marcio/ui/button";
import { FormField } from "@/registry/marcio/ui/form-field";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/marcio/ui/popover";
import { Switch } from "@/registry/marcio/ui/switch";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("popover"),
  usage: {
    use: ["Conteúdo curto e interativo ancorado num gatilho, como um pequeno formulário ou filtro.", "Base para componentes próprios, como Combobox e DatePicker."],
    avoid: ["Dica de texto curta sem interação: use Tooltip.", "Lista de ações: use DropdownMenu.", "Conteúdo longo ou tarefa completa: use Dialog ou Sheet."],
  },
  keyboard: [
    { keys: "Enter / Espaço", action: "No gatilho, abre e fecha." },
    { keys: "Tab", action: "Percorre o conteúdo do painel." },
    { keys: "Esc", action: "Fecha e devolve o foco ao gatilho." },
  ],
  props: [
    { name: "open / onOpenChange", type: "boolean / (open) => void", description: "Uso controlado." },
    { name: "PopoverContent align", type: '"start" | "center" | "end"', default: '"start"', description: "Alinhamento em relação ao gatilho." },
    classNameProp,
  ],
  examples: [
    {
      title: "Filtro rápido",
      code: `<Popover>\n  <PopoverTrigger asChild><Button variant="secondary">Filtros</Button></PopoverTrigger>\n  <PopoverContent aria-label="Filtros">...</PopoverContent>\n</Popover>`,
      render: (theme) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary">Filtros</Button>
          </PopoverTrigger>
          <PopoverContent aria-label="Filtros" className="flex flex-col gap-3">
            <FormField label="Só os meus" orientation="horizontal" id={`pop-meus-${theme}`}>
              <Switch />
            </FormField>
            <FormField label="Com prazo" orientation="horizontal" id={`pop-prazo-${theme}`}>
              <Switch defaultChecked />
            </FormField>
          </PopoverContent>
        </Popover>
      ),
    },
  ],
  a11y: ["Dê um nome ao PopoverContent com aria-label ou aria-labelledby.", "Esc fecha e devolve o foco ao gatilho."],
};
