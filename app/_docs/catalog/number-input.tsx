import { FormField } from "@/registry/marcio/ui/form-field";
import { NumberInput } from "@/registry/marcio/ui/number-input";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("number-input"),
  usage: {
    use: ["Quantidades e valores pequenos que a pessoa ajusta de um em um: itens, parcelas, vagas.", "Números com casas decimais em pt-BR, como peso e porcentagem, com step 0,1 ou 0,5."],
    avoid: ["Dinheiro: use CurrencyInput.", "Códigos que só têm dígitos, como CEP e CPF: use MaskedInput.", "Escolha aproximada numa faixa: use Slider."],
  },
  props: [
    { name: "value / onValueChange", type: "number | null / (value) => void", description: "Uso controlado. Campo vazio é null." },
    { name: "defaultValue", type: "number | null", description: "Valor inicial não controlado." },
    { name: "min / max", type: "number", description: "Limites. Os botões se desabilitam nos extremos e o valor é ajustado ao sair do campo." },
    { name: "step", type: "number", default: "1", description: "Passo das setas e dos botões. Também define as casas decimais exibidas." },
    { name: "formatOptions", type: "Intl.NumberFormatOptions", description: 'Formato de exibição, por exemplo { style: "percent" } ou unidade.' },
    { name: "decrementLabel / incrementLabel", type: "string", default: '"Diminuir" / "Aumentar"', description: "Nomes dos botões." },
    { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Mesma altura do Button: 36px, a altura de controle da densidade (44px na padrão) e 48px." },
  ],
  examples: [
    {
      title: "Quantidade e decimal",
      className: "w-full flex-col items-stretch",
      code: `<FormField label="Vagas">\n  <NumberInput defaultValue={4} min={1} max={20} />\n</FormField>\n<FormField label="Peso (kg)">\n  <NumberInput defaultValue={72.5} step={0.5} min={0} />\n</FormField>`,
      render: (theme) => (
        <>
          <FormField label="Vagas" id={`num-a-${theme}`}>
            <NumberInput defaultValue={4} min={1} max={20} />
          </FormField>
          <FormField label="Peso (kg)" id={`num-b-${theme}`} description="Use vírgula para os decimais.">
            <NumberInput defaultValue={72.5} step={0.5} min={0} />
          </FormField>
        </>
      ),
    },
  ],
  a11y: [
    "O campo tem role spinbutton com valor, mínimo, máximo e o texto formatado em aria-valuetext.",
    "Os botões de diminuir e aumentar ficam fora do Tab: pelo teclado, as setas fazem o mesmo.",
    "Aceita 1.234,5 e também 1234.5. Ao sair do campo, o valor volta formatado em pt-BR.",
  ],
  keyboard: [
    { keys: "Setas para cima e para baixo", action: "Aumentam e diminuem um passo." },
    { keys: "Page Up / Page Down", action: "Aumentam e diminuem dez passos." },
    { keys: "Home / End", action: "Vão para o mínimo e o máximo, quando definidos." },
  ],
};
