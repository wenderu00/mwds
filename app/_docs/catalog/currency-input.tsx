import { FormField } from "@/registry/marcio/ui/form-field";
import { CurrencyInput } from "@/registry/marcio/ui/masked-input";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("currency-input"),
  usage: {
    use: ["Valores em reais: preço, contrato, reembolso.", "Guarde e envie em centavos inteiros, sem ponto flutuante."],
    avoid: ["Quantidades e números sem moeda: use NumberInput.", "Outras moedas: o formato é só o do real."],
  },
  keyboard: [
    { keys: "Dígitos", action: "Entram pela direita: 1, 12, 123 viram R$ 0,01, R$ 0,12, R$ 1,23." },
    { keys: "Backspace", action: "Apaga o último dígito." },
  ],
  props: [
    { name: "value / onValueChange", type: "number | null / (cents) => void", description: "Valor em centavos inteiros: 123456 aparece como R$ 1.234,56. Campo vazio é null." },
    { name: "defaultValue", type: "number | null", description: "Valor inicial não controlado, em centavos." },
    { name: "name", type: "string", description: "Cria um input escondido com os centavos, para formulários nativos." },
    classNameProp,
  ],
  examples: [
    {
      title: "Valor do contrato",
      className: "w-full flex-col items-stretch",
      code: `<FormField label="Valor do contrato">\n  <CurrencyInput value={centavos} onValueChange={setCentavos} />\n</FormField>`,
      render: (theme) => (
        <FormField label="Valor do contrato" id={`brl-${theme}`}>
          <CurrencyInput defaultValue={123456} />
        </FormField>
      ),
    },
  ],
  a11y: [
    "Abre o teclado numérico no celular (inputmode numeric).",
    "O valor lido pelo leitor de tela já vem formatado, com R$ e vírgula.",
  ],
};
