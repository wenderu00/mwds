import { Chart } from "@/registry/marcio/ui/chart";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("chart"),
  usage: {
    use: ["Uma medida ao longo do tempo ou comparada entre poucas categorias.", "Painéis e relatórios, sempre com título que diz a conclusão ou a pergunta."],
    avoid: ["Dois ou três números: escreva a frase ou use StatCard.", "Valores que a pessoa precisa ler um por um: use Table.", "Mais de oito séries: junte em Outros ou divida o gráfico."],
  },
  props: [
    { name: "kind", type: '"bar" | "line" | "area"', description: "Barras para comparar categorias, linha para tendência, área para volume acumulado." },
    { name: "title / description", type: "ReactNode", description: "Título e apoio no figcaption; o título também nomeia o gráfico." },
    { name: "data", type: "Record<string, string | number>[]", description: "Uma linha por categoria do eixo x." },
    { name: "categoryKey", type: "string", description: "Campo de data usado no eixo x e na primeira coluna da tabela." },
    { name: "series", type: "{ key: string; label: string }[]", description: "Séries na ordem das cores: a primeira é chart-1." },
    { name: "palette", type: '"categorica" | "sequencial"', default: '"categorica"', description: "Sequencial para séries ordenadas, como faixas de valor." },
    { name: "unit", type: "string", description: "Unidade no tooltip e na tabela, como h ou entregas." },
    { name: "stacked", type: "boolean", default: "false", description: "Empilha barras ou áreas quando as séries somam um total." },
    { name: "height", type: "number", default: "260", description: "Altura do gráfico em px; a largura acompanha o contêiner." },
    { name: "tableLabel", type: "string", default: '"ver os dados em tabela"', description: "Texto que abre a tabela com os dados." },
  ],
  examples: [
    {
      title: "Barras",
      className: "w-full flex-col items-stretch",
      code: `<Chart\n  kind="bar"\n  title="Horas por trimestre"\n  data={[{ trimestre: "T1", portal: 120, app: 90 }, ...]}\n  categoryKey="trimestre"\n  series={[{ key: "portal", label: "Portal" }, { key: "app", label: "App" }]}\n  unit="h"\n/>`,
      render: () => (
        <Chart
          kind="bar"
          title="Horas por trimestre"
          data={[
            { trimestre: "T1", portal: 120, app: 90 },
            { trimestre: "T2", portal: 180, app: 110 },
            { trimestre: "T3", portal: 150, app: 160 },
            { trimestre: "T4", portal: 210, app: 140 },
          ]}
          categoryKey="trimestre"
          series={[
            { key: "portal", label: "Portal" },
            { key: "app", label: "App" },
          ]}
          unit="h"
        />
      ),
    },
    {
      title: "Área empilhada",
      description: "Use stacked quando as séries somam um total que faz sentido.",
      className: "w-full flex-col items-stretch",
      code: `<Chart kind="area" stacked title="Pedidos por canal" data={pedidos} categoryKey="mês" series={canais} />`,
      render: () => (
        <Chart
          kind="area"
          stacked
          title="Pedidos por canal"
          data={[
            { mês: "mai", portal: 40, telefone: 22, presencial: 12 },
            { mês: "jun", portal: 52, telefone: 20, presencial: 10 },
            { mês: "jul", portal: 61, telefone: 18, presencial: 11 },
            { mês: "ago", portal: 70, telefone: 15, presencial: 9 },
            { mês: "set", portal: 84, telefone: 14, presencial: 8 },
            { mês: "out", portal: 96, telefone: 12, presencial: 8 },
          ]}
          categoryKey="mês"
          series={[
            { key: "portal", label: "Portal" },
            { key: "telefone", label: "Telefone" },
            { key: "presencial", label: "Presencial" },
          ]}
          unit="pedidos"
        />
      ),
    },
  ],
  a11y: [
    "O gráfico fica num figure com figcaption; o título nomeia a área do gráfico.",
    "Toda série aparece na legenda em texto, e a tabela com os dados fica num details logo abaixo, para quem não enxerga as cores ou usa leitor de tela.",
    "O tooltip do Recharts também abre pelo teclado: foque o gráfico e use as setas.",
    "Sem animação: o gráfico aparece pronto, inclusive com movimento reduzido.",
  ],
  keyboard: [
    { keys: "Tab", action: "Foca o gráfico e depois o link da tabela." },
    { keys: "Setas", action: "No gráfico, passam de uma categoria para outra e mostram o tooltip." },
  ],
};
