import { FormField } from "@/registry/marcio/ui/form-field";
import { RadioGroup, RadioGroupOption } from "@/registry/marcio/ui/radio-group";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("radio-group"),
  usage: {
    use: ["Escolha única entre até cinco opções, todas visíveis ao mesmo tempo.", "Opções que precisam de descrição ao lado para a escolha fazer sentido."],
    avoid: ["Mais de cinco opções ou pouco espaço: use Select.", "Lista longa ou que precisa de busca: use Combobox.", "Várias escolhas ao mesmo tempo: use Checkbox."],
  },
  dosDonts: [
    {
      do: {
        caption: "Até cinco opções, todas visíveis: a comparação é imediata.",
        render: () => (
          <FormField label="Plano">
            <RadioGroup defaultValue="mensal">
              <RadioGroupOption value="mensal" label="Mensal" />
              <RadioGroupOption value="anual" label="Anual" description="Dois meses grátis." />
            </RadioGroup>
          </FormField>
        ),
      },
      dont: {
        caption: "Uma lista longa de estados ocupa a tela inteira: use Select ou Combobox.",
        render: () => (
          <FormField label="Estado">
            <RadioGroup defaultValue="pe" className="grid-cols-2">
              {["AC", "AL", "AM", "BA", "CE", "PE", "PB", "RN"].map((uf) => (
                <RadioGroupOption key={uf} value={uf.toLowerCase()} label={uf} />
              ))}
            </RadioGroup>
          </FormField>
        ),
      },
    },
  ],
  keyboard: [
    { keys: "Tab", action: "Entra no grupo pela opção marcada, ou pela primeira, e sai do grupo." },
    { keys: "Setas", action: "Movem e marcam a opção anterior ou a próxima." },
    { keys: "Espaço", action: "Marca a opção com foco." },
  ],
  props: [
    { name: "value / defaultValue", type: "string", description: "Opção marcada." },
    { name: "onValueChange", type: "(value: string) => void", description: "Chamado ao trocar." },
    { name: "orientation", type: '"vertical" | "horizontal"', description: "Direção das setas do teclado." },
    { name: "RadioGroupOption label", type: "ReactNode", description: "Rótulo clicável da opção." },
    { name: "RadioGroupOption description", type: "ReactNode", description: "Texto de apoio ligado por aria-describedby." },
    { name: "aria-invalid", type: "boolean", description: "No RadioGroup, pinta a borda de todas as opções. Dentro do FormField, vem do error." },
    classNameProp,
  ],
  examples: [
    {
      title: "Dentro de FormField",
      className: "w-full",
      code: `<FormField label="Plano" required>\n  <RadioGroup defaultValue="mensal">\n    <RadioGroupOption value="mensal" label="Mensal" />\n    <RadioGroupOption value="anual" label="Anual" description="Dois meses grátis." />\n  </RadioGroup>\n</FormField>`,
      render: (theme) => (
        <FormField label="Plano" required id={`plano-${theme}`}>
          <RadioGroup defaultValue="mensal">
            <RadioGroupOption value="mensal" label="Mensal" />
            <RadioGroupOption value="anual" label="Anual" description="Dois meses grátis." />
            <RadioGroupOption value="vitalicio" label="Vitalício" disabled />
          </RadioGroup>
        </FormField>
      ),
    },
    {
      title: "Horizontal",
      code: `<RadioGroup orientation="horizontal" className="flex gap-6">...</RadioGroup>`,
      render: () => (
        <RadioGroup aria-label="Densidade" defaultValue="normal" orientation="horizontal" className="flex flex-wrap gap-6">
          <RadioGroupOption value="compacta" label="Compacta" />
          <RadioGroupOption value="normal" label="Normal" />
          <RadioGroupOption value="ampla" label="Ampla" />
        </RadioGroup>
      ),
    },
  ],
  a11y: [
    "Tab entra no grupo pela opção marcada; as setas trocam a opção.",
    "Dentro de FormField, o grupo recebe o nome do rótulo por aria-labelledby.",
  ],
};
