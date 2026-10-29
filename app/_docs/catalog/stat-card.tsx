import { StatCard } from "@/registry/marcio/ui/stat-card";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("stat-card"),
  usage: {
    use: ["Números-chave no topo de painéis, de dois a quatro por linha.", "Variação em relação a um período, com o tom que diz se é bom ou ruim."],
    avoid: ["Séries ao longo do tempo: use um gráfico.", "Mais de quatro por linha: a comparação se perde.", "Listar muitos números: use Table."],
  },
  props: [
    { name: "label / value", type: "string / ReactNode", description: "Rótulo em mono e valor em display." },
    { name: "change / trend", type: 'ReactNode / "up" | "down" | "flat"', default: '- / "flat"', description: "Variação. A seta é decorativa; o sentido é lido por extenso (subiu, caiu, estável)." },
    { name: "tone", type: '"neutral" | "success" | "danger" | "warning" | "info" | "accent"', default: '"neutral"', description: "Cor da variação. Subir nem sempre é bom: atrasos subindo é danger." },
    { name: "detail", type: "ReactNode", description: "Linha de contexto, como desde o mês passado." },
    { name: "progress / progressLabel", type: "number / string", description: "Barra de progresso de 0 a 100 e o nome dela." },
  ],
  examples: [
    {
      title: "Painel",
      className: "grid w-full items-stretch gap-4 sm:grid-cols-2",
      stacked: true,
      code: `<StatCard label="Horas no mês" value="186h" change="+8%" trend="up" tone="success" detail="meta de 220h" />\n<StatCard label="Entregas atrasadas" value="3" change="+1" trend="up" tone="danger" detail="precisam de atenção" />`,
      render: () => (
        <>
          <StatCard label="Horas no mês" value="186h" change="+8%" trend="up" tone="success" detail="meta de 220h" />
          <StatCard label="Entregas atrasadas" value="3" change="+1" trend="up" tone="danger" detail="precisam de atenção" />
          <StatCard label="Taxa de conclusão" value="74%" change="estável" trend="flat" detail="das tarefas do trimestre" progress={74} />
          <StatCard label="Projetos ativos" value="12" />
        </>
      ),
    },
  ],
  a11y: ["A seta da variação é escondida e o sentido vai em texto para o leitor de tela.", "A cor nunca é a única pista: o sinal e o texto da variação dizem o mesmo."],
};
