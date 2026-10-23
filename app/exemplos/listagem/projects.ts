export type ProjectStatus = "ativo" | "pausado" | "rascunho" | "arquivado";

export type Project = {
  id: string;
  name: string;
  client: string;
  owner: string;
  status: ProjectStatus;
  hours: number;
  updatedAt: string;
};

export const statusLabel: Record<ProjectStatus, string> = {
  ativo: "ativo",
  pausado: "pausado",
  rascunho: "rascunho",
  arquivado: "arquivado",
};

export const statusTone = {
  ativo: "success",
  pausado: "warning",
  rascunho: "neutral",
  arquivado: "info",
} as const;

export const projects: Project[] = [
  { id: "p01", name: "ResenhaHub", client: "Produto próprio", owner: "Márcio", status: "ativo", hours: 128, updatedAt: "2026-10-21" },
  { id: "p02", name: "Portal da Transparência", client: "Join Tecnologia", owner: "Ana", status: "ativo", hours: 342, updatedAt: "2026-10-20" },
  { id: "p03", name: "Seed Garden", client: "Código aberto", owner: "Márcio", status: "pausado", hours: 42, updatedAt: "2026-09-30" },
  { id: "p04", name: "Mate o Mutante", client: "Produto próprio", owner: "Márcio", status: "rascunho", hours: 7, updatedAt: "2026-10-02" },
  { id: "p05", name: "Agenda de Vacinação", client: "Prefeitura do Recife", owner: "Bruno", status: "ativo", hours: 210, updatedAt: "2026-10-19" },
  { id: "p06", name: "CLI de Estudos", client: "Código aberto", owner: "Márcio", status: "arquivado", hours: 18, updatedAt: "2026-06-11" },
  { id: "p07", name: "Painel de Matrículas", client: "UFPE", owner: "Carla", status: "ativo", hours: 96, updatedAt: "2026-10-18" },
  { id: "p08", name: "Loja de Cafés", client: "Café Moenda", owner: "Ana", status: "pausado", hours: 64, updatedAt: "2026-08-27" },
  { id: "p09", name: "Gestor de Frotas", client: "LogPE", owner: "Bruno", status: "ativo", hours: 188, updatedAt: "2026-10-15" },
  { id: "p10", name: "Site Institucional", client: "Clínica Boa Vista", owner: "Carla", status: "arquivado", hours: 33, updatedAt: "2026-04-03" },
  { id: "p11", name: "App de Treinos", client: "Produto próprio", owner: "Márcio", status: "rascunho", hours: 12, updatedAt: "2026-10-08" },
  { id: "p12", name: "Ouvidoria Digital", client: "Governo de Pernambuco", owner: "Ana", status: "ativo", hours: 275, updatedAt: "2026-10-22" },
  { id: "p13", name: "Controle de Estoque", client: "Mercado São José", owner: "Bruno", status: "pausado", hours: 71, updatedAt: "2026-09-12" },
  { id: "p14", name: "Blog Técnico", client: "Produto próprio", owner: "Márcio", status: "ativo", hours: 24, updatedAt: "2026-10-12" },
  { id: "p15", name: "Reserva de Salas", client: "CIn UFPE", owner: "Carla", status: "ativo", hours: 54, updatedAt: "2026-10-05" },
  { id: "p16", name: "Testes de Carga", client: "Join Tecnologia", owner: "Ana", status: "arquivado", hours: 40, updatedAt: "2026-05-20" },
  { id: "p17", name: "Chatbot de Atendimento", client: "LogPE", owner: "Bruno", status: "rascunho", hours: 9, updatedAt: "2026-10-16" },
  { id: "p18", name: "Gerador de Currículo", client: "Código aberto", owner: "Márcio", status: "ativo", hours: 15, updatedAt: "2026-10-01" },
  { id: "p19", name: "Mapa de Ciclovias", client: "Prefeitura do Recife", owner: "Carla", status: "pausado", hours: 58, updatedAt: "2026-07-29" },
  { id: "p20", name: "Sistema de Chamados", client: "UFPE", owner: "Ana", status: "ativo", hours: 133, updatedAt: "2026-10-14" },
  { id: "p21", name: "Catálogo de Livros", client: "Livraria Cultura PE", owner: "Bruno", status: "arquivado", hours: 27, updatedAt: "2026-03-17" },
  { id: "p22", name: "Pipeline de Deploy", client: "Join Tecnologia", owner: "Márcio", status: "ativo", hours: 61, updatedAt: "2026-10-09" },
  { id: "p23", name: "Pesquisa de Satisfação", client: "Clínica Boa Vista", owner: "Carla", status: "rascunho", hours: 4, updatedAt: "2026-10-20" },
];
