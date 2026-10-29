import { Checkbox } from "@/registry/marcio/ui/checkbox";
import { Label } from "@/registry/marcio/ui/label";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("checkbox"),
  usage: {
    use: ["Escolhas que só valem depois de enviar o formulário, como aceitar termos.", "Marcar vários itens de uma lista, como linhas de tabela."],
    avoid: ["Preferência com efeito imediato: use Switch.", "Escolha única entre opções: use RadioGroup."],
  },
  keyboard: [
    { keys: "Tab", action: "Leva o foco à caixa." },
    { keys: "Espaço", action: "Marca e desmarca." },
  ],
  props: [
    { name: "checked", type: 'boolean | "indeterminate"', description: "Estado controlado." },
    { name: "defaultChecked", type: "boolean", description: "Estado inicial não controlado." },
    { name: "onCheckedChange", type: "(checked) => void", description: "Chamado ao alternar." },
    { name: "aria-invalid", type: "boolean", description: "Borda de erro. Dentro do FormField, vem do error." },
    classNameProp,
  ],
  examples: [
    {
      title: "Estados",
      code: `<Checkbox id="termos" />\n<Label htmlFor="termos">Aceito os termos</Label>`,
      render: (theme) => (
        <div className="flex flex-col gap-3">
          {[
            { id: "a", label: "Desmarcado" },
            { id: "b", label: "Marcado", checked: true as const },
            { id: "c", label: "Parcial", checked: "indeterminate" as const },
            { id: "d", label: "Desabilitado", disabled: true },
          ].map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <Checkbox id={`cb-${item.id}-${theme}`} defaultChecked={item.checked} disabled={item.disabled} />
              <Label htmlFor={`cb-${item.id}-${theme}`}>{item.label}</Label>
            </div>
          ))}
        </div>
      ),
    },
  ],
  a11y: ["Espaço alterna o estado. Clicar no Label também alterna."],
};
