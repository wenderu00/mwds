import { FormField } from "@/registry/marcio/ui/form-field";
import { Slider } from "@/registry/marcio/ui/slider";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("slider"),
  usage: {
    use: ["Ajustes aproximados em que a pessoa vê o efeito na hora: volume, zoom, opacidade.", "Faixas de filtro, como preço mínimo e máximo, com dois thumbs."],
    avoid: ["Valores exatos que a pessoa já sabe: use Input ou CurrencyInput.", "Faixas muito grandes, em que cada passo é minúsculo: digitar é mais rápido."],
  },
  props: [
    { name: "value / onValueChange", type: "number[] / (value) => void", description: "Um número por thumb. Dois números criam um intervalo." },
    { name: "defaultValue", type: "number[]", description: "Valor inicial não controlado." },
    { name: "min / max / step", type: "number", default: "0 / 100 / 1", description: "Faixa e passo." },
    { name: "formatValue", type: "(value) => string", description: "Texto anunciado pelo leitor de tela. Padrão: número em pt-BR." },
    { name: "thumbLabels", type: "string[]", description: "Nome de cada thumb, como Mínimo e Máximo." },
    { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Direção." },
  ],
  examples: [
    {
      title: "Valor único",
      className: "w-full flex-col items-stretch",
      code: `<FormField label="Volume">\n  <Slider defaultValue={[40]} />\n</FormField>`,
      render: (theme) => (
        <FormField label="Volume" id={`slider-a-${theme}`}>
          <Slider defaultValue={[40]} />
        </FormField>
      ),
    },
    {
      title: "Intervalo",
      className: "w-full flex-col items-stretch",
      code: `<FormField label="Faixa de preço">\n  <Slider defaultValue={[200, 800]} min={0} max={1000} step={50} thumbLabels={["Mínimo", "Máximo"]} />\n</FormField>`,
      render: (theme) => (
        <FormField label="Faixa de preço" id={`slider-b-${theme}`}>
          <Slider defaultValue={[200, 800]} min={0} max={1000} step={50} thumbLabels={["Preço mínimo", "Preço máximo"]} />
        </FormField>
      ),
    },
  ],
  a11y: [
    "Cada thumb tem role slider, com valor, mínimo, máximo e o texto de formatValue em aria-valuetext.",
    "Dentro de FormField, o thumb recebe o nome do rótulo. Em intervalos, dê nome a cada thumb com thumbLabels.",
    "Mostre o valor também em texto perto do controle quando ele for importante: arrastar não é preciso.",
  ],
  keyboard: [
    { keys: "Setas", action: "Aumentam e diminuem um passo." },
    { keys: "Page Up / Page Down", action: "Aumentam e diminuem dez passos." },
    { keys: "Home / End", action: "Vão para o mínimo e o máximo." },
    { keys: "Tab", action: "Passa de um thumb para o outro no intervalo." },
  ],
};
