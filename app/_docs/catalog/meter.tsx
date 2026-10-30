import { Coins, Trees } from "lucide-react";
import { Meter } from "@/registry/marcio/ui/meter";
import { MeterDemo } from "../demos/meter";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("meter"),
  usage: {
    use: ["Quantidade de algo que tem teto: ouro no cofre, espaço usado, vagas ocupadas.", "Barra de recursos no topo de um jogo ou painel, com size=\"sm\"."],
    avoid: [
      "Tarefa em andamento, que termina: use Progress.",
      "Número-chave de painel com variação: use StatCard.",
      "highlightKey a cada tique de produção contínua: o destaque é para evento discreto, como saque ou compra.",
    ],
  },
  props: [
    { name: "label", type: "string", description: "Nome do recurso. No sm fica só para o leitor de tela." },
    { name: "value / max", type: "number", description: "Valor e teto. Sem max, mostra só o valor, sem barra e sem papel de medidor." },
    { name: "icon", type: "ReactNode", description: "Ícone do recurso, em size-4. Decorativo." },
    { name: "rate", type: "ReactNode", description: "Taxa em linha, em mono, como +40/min." },
    { name: "size", type: '"sm" | "md"', default: '"md"', description: "No sm, o ícone toma o lugar do rótulo. compact é o nome antigo de sm, descontinuado, e sai na 0.23." },
    { name: "highlightKey", type: "string | number", description: "Quando muda, o valor pisca uma vez em accent-soft. Não pisca na montagem." },
    { name: "formatOptions", type: "Intl.NumberFormatOptions", description: "Formato dos números, sempre em pt-BR." },
    classNameProp,
  ],
  examples: [
    {
      title: "Com destaque por evento",
      className: "w-full",
      code: `<Meter label="Ouro" value={gold} max={5000} rate="+40/min" icon={<Coins />} highlightKey={loots} />`,
      render: () => <MeterDemo />,
    },
    {
      title: "Compacto",
      className: "w-full",
      stacked: true,
      code: `<Meter size="sm" label="Ouro" value={1234} max={5000} icon={<Coins />} />\n<Meter size="sm" label="Madeira" value={320} max={1000} icon={<Trees />} />`,
      render: () => (
        <div className="grid w-full gap-4 sm:grid-cols-2">
          <Meter size="sm" label="Ouro" value={1234} max={5000} icon={<Coins />} />
          <Meter size="sm" label="Madeira" value={320} max={1000} icon={<Trees />} />
        </div>
      ),
    },
  ],
  a11y: [
    "Com max, é um meter com nome, valor, mínimo, máximo e o texto 1.234 de 5.000 para o leitor de tela.",
    "A taxa fica fora do medidor, porque o conteúdo de um meter não é lido.",
    "O destaque só roda com movimento permitido e acontece uma vez por evento.",
  ],
};
