export type BlockDoc = {
  slug: string;
  name: string;
  summary: string;
  route?: string;
  previewPath?: string;
  targets: Record<string, string>;
  setup?: string;
};

export const blocks: BlockDoc[] = [
  {
    slug: "login",
    name: "Login",
    summary: "Entrar com e-mail e senha. Painel de marca com DotGrid e TypingText, validação, erro em Alert e toast de boas-vindas.",
    route: "/login",
    targets: { "page.tsx": "app/login/page.tsx" },
    setup: "Troque a função de demonstração passando onLogin para o LoginForm.",
  },
  {
    slug: "not-found",
    name: "404",
    summary: "Página não encontrada com GlitchText, linha de terminal com o caminho pedido e cursor piscando.",
    previewPath: "/esta-rota-nao-existe",
    targets: { "not-found.tsx": "app/not-found.tsx" },
  },
  {
    slug: "admin-shell",
    name: "AdminShell",
    summary: "Casca dos painéis: AppShell com navegação, busca ⌘K, menu do usuário com tema e saída. Usado pelo Dashboard e pelas Configurações.",
    targets: {},
    setup: "Edite a lista navigation em components/blocks/admin-shell/admin-shell.tsx com as rotas do seu sistema.",
  },
  {
    slug: "dashboard",
    name: "Dashboard",
    summary: "Painel de gestão de projetos: alerta de atrasos, cards de métricas, atividade recente com carregamento e prazos da semana.",
    route: "/dashboard",
    targets: { "page.tsx": "app/dashboard/page.tsx" },
    setup: "Os dados de exemplo ficam em data.ts; troque pela sua fonte.",
  },
  {
    slug: "record-detail",
    name: "Detalhe de registro",
    summary: "Tela de detalhe dentro do AdminShell: cabeçalho com ações, dados em DescriptionList, histórico em Timeline e confirmação de arquivamento.",
    route: "/exemplos/detalhe",
    targets: { "page.tsx": "app/projeto/page.tsx" },
    setup: "Os dados de exemplo ficam em components/blocks/record-detail/data.ts; troque pela sua fonte e leve a página para a rota do seu registro.",
  },
  {
    slug: "settings",
    name: "Configurações",
    summary: "Abas de perfil (formulário validado), preferências (tema, densidade, fuso, notificações) e conta (exclusão com confirmação).",
    route: "/configuracoes",
    targets: { "page.tsx": "app/configuracoes/page.tsx" },
  },
  {
    slug: "landing",
    name: "Landing page",
    summary: "Página de apresentação no estilo do portfólio: Navbar com seções, Hero com DotGrid e TypingText, FeatureGrid de serviços, stack, projetos e Footer de contato.",
    route: "/landing",
    targets: { "page.tsx": "app/page.tsx" },
    setup: "O conteúdo de exemplo fica em components/blocks/landing/data.ts; troque pelo seu.",
  },
];
