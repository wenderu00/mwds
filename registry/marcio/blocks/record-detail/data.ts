import type { TimelineItem } from "@/registry/marcio/ui/timeline";

export type RecordStatus = { label: string; tone: "neutral" | "accent" | "success" | "warning" | "danger" | "info" };

export const record = {
  id: "PRJ-0042",
  name: "Ouvidoria Digital",
  client: "Secretaria de Planejamento",
  status: { label: "em homologação", tone: "warning" } satisfies RecordStatus,
  owner: "Márcio Wendell",
  team: "Ana Souza, Bruno Lima, Carla Dias",
  startedAt: "02/06/2026",
  dueAt: "31/10/2026",
  budget: "R$ 184.000,00",
  hours: "612h de 720h",
  summary: "Canal único para pedidos de informação e manifestações, com acompanhamento do trâmite pelo cidadão.",
};

export const history: TimelineItem[] = [
  { title: "Projeto aberto", description: "Escopo aprovado pela Secretaria.", date: "02/06/2026", dateTime: "2026-06-02" },
  { title: "Protótipo validado", description: "Três rodadas de teste com 18 pessoas.", date: "14/07/2026", dateTime: "2026-07-14", tone: "success" },
  { title: "Prazo da homologação estendido", description: "Mais 15 dias para integrar o login gov.br.", date: "30/09/2026", dateTime: "2026-09-30", tone: "warning" },
  { title: "Em homologação", description: "Testes com a equipe da Secretaria.", date: "20/10/2026", dateTime: "2026-10-20", status: "current" },
  { title: "Publicação", status: "pending" },
];
