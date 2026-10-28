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

/** Horas registradas por semana, por frente de trabalho, nas últimas 8 semanas. */
export const hoursByWeek = [
  { semana: "01/09", produto: 32, suporte: 12, gestao: 6 },
  { semana: "08/09", produto: 36, suporte: 10, gestao: 6 },
  { semana: "15/09", produto: 30, suporte: 16, gestao: 8 },
  { semana: "22/09", produto: 40, suporte: 9, gestao: 5 },
  { semana: "29/09", produto: 42, suporte: 11, gestao: 6 },
  { semana: "06/10", produto: 38, suporte: 14, gestao: 7 },
  { semana: "13/10", produto: 44, suporte: 8, gestao: 6 },
  { semana: "20/10", produto: 46, suporte: 10, gestao: 5 },
];

export const workstreams = [
  { key: "produto", label: "Produto" },
  { key: "suporte", label: "Suporte" },
  { key: "gestao", label: "Gestão" },
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
