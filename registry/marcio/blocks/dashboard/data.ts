export type Tone = "neutral" | "accent" | "danger" | "success" | "warning" | "info";

export type Metric = {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "flat";
  tone: Tone;
  detail: string;
  progress?: number;
};

export const metrics: Metric[] = [
  { label: "Projetos ativos", value: "12", change: "+2", trend: "up", tone: "success", detail: "desde o mês passado" },
  { label: "Horas no mês", value: "186h", change: "+8%", trend: "up", tone: "success", detail: "meta de 220h" },
  { label: "Entregas atrasadas", value: "3", change: "+1", trend: "up", tone: "danger", detail: "precisam de atenção" },
  { label: "Taxa de conclusão", value: "74%", change: "estável", trend: "flat", tone: "neutral", detail: "das tarefas do trimestre", progress: 74 },
];

export type Deadline = { project: string; task: string; due: string; tone: Tone; status: string };

export const deadlines: Deadline[] = [
  { project: "Ouvidoria Digital", task: "Homologação com o cliente", due: "2026-10-24", tone: "danger", status: "atrasado" },
  { project: "ResenhaHub", task: "Lançar página de perfis", due: "2026-10-27", tone: "warning", status: "hoje" },
  { project: "Agenda de Vacinação", task: "Testes de carga", due: "2026-10-29", tone: "info", status: "em 2 dias" },
  { project: "Painel de Matrículas", task: "Revisar acessibilidade", due: "2026-10-31", tone: "neutral", status: "em 4 dias" },
];

export type Activity = { id: string; who: string; action: string; project: string; when: string; tone: Tone; status: string };

export const activities: Activity[] = [
  { id: "a1", who: "Ana Lima", action: "concluiu a tarefa Integração com SSO", project: "Ouvidoria Digital", when: "há 12 min", tone: "success", status: "concluído" },
  { id: "a2", who: "Bruno Souza", action: "abriu o bug Filtro de datas", project: "Gestor de Frotas", when: "há 40 min", tone: "danger", status: "bug" },
  { id: "a3", who: "Márcio Wendell", action: "publicou a versão 1.4", project: "ResenhaHub", when: "há 2 h", tone: "info", status: "deploy" },
  { id: "a4", who: "Carla Dias", action: "pediu revisão do layout", project: "Painel de Matrículas", when: "há 3 h", tone: "warning", status: "revisão" },
  { id: "a5", who: "Ana Lima", action: "registrou 6 h", project: "Sistema de Chamados", when: "ontem", tone: "neutral", status: "horas" },
];
