import { Timeline } from "@/registry/marcio/ui/timeline";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("timeline"),
  usage: {
    use: ["Trâmite de pedido, protocolo ou processo.", "Histórico de mudanças de status de um registro."],
    avoid: ["Etapas de um formulário que a pessoa percorre: use Stepper.", "Muitos eventos com filtros e colunas: use Table."],
  },
  props: [
    { name: "items", type: "TimelineItem[]", description: "{ title, description?, date?, dateTime?, status?, tone? } na ordem do tempo." },
    { name: "status", type: '"complete" | "current" | "pending"', default: '"complete"', description: "Por item. current ganha aria-current step." },
    { name: "tone", type: '"neutral" | "accent" | "success" | "warning" | "danger" | "info"', default: '"accent"', description: "Cor do marcador dos itens concluídos." },
    { name: "dateTime", type: "string", description: "Data em aaaa-mm-dd para o atributo datetime do time." },
    { name: "aria-label", type: "string", default: '"Histórico"', description: "Nome da lista." },
  ],
  examples: [
    {
      title: "Trâmite de um pedido",
      code: `<Timeline aria-label="Trâmite do pedido" items={[{ title: "Pedido aberto", date: "21/10/2026", dateTime: "2026-10-21" }, ...]} />`,
      render: () => (
        <Timeline
          aria-label="Trâmite do pedido"
          className="w-full"
          items={[
            { title: "Pedido aberto", description: "Pelo portal, com 2 anexos.", date: "21/10/2026", dateTime: "2026-10-21" },
            { title: "Encaminhado à Secretaria de Planejamento", date: "22/10/2026", dateTime: "2026-10-22", tone: "info" },
            { title: "Prazo prorrogado", description: "Mais 10 dias, com justificativa.", date: "23/10/2026", dateTime: "2026-10-23", tone: "warning" },
            { title: "Em análise", date: "24/10/2026", dateTime: "2026-10-24", status: "current" },
            { title: "Resposta ao solicitante", status: "pending" },
          ]}
        />
      ),
    },
  ],
  a11y: [
    "É uma lista ordenada; o item atual tem aria-current step e cada item diz o status em texto para o leitor de tela.",
    "A data fica num time com datetime, e a cor do marcador nunca é a única informação: o título diz o que aconteceu.",
  ],
};
