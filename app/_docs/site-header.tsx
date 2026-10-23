import NextLink from "next/link";
import { LogoBlock } from "@/registry/marcio/ui/logo-block";
import { ThemeToggle } from "@/registry/marcio/ui/theme-toggle";
import { docs, groups } from "./catalog";
import { SiteCommand, type SiteCommandEntry } from "./site-command";

export const container = "mx-auto max-w-[1200px] px-6";

const nav = [
  { href: "/", label: "fundação" },
  { href: "/componentes", label: "componentes" },
  { href: "/exemplos", label: "exemplos" },
  { href: "/blocos", label: "blocos" },
];

const groupTitle = Object.fromEntries(groups.map((group) => [group.id, group.title]));

const portugueseNames: Record<string, string[]> = {
  kicker: ["rótulo acima do título"],
  "section-title": ["título de seção", "numeração"],
  "code-comment": ["comentário", "legenda"],
  "logo-block": ["logo", "marca"],
  "dot-grid": ["grade de pontos", "fundo"],
  "typing-text": ["digitação", "cursor"],
  "glitch-text": ["glitch", "tremida"],
  button: ["botão"],
  input: ["campo de texto"],
  textarea: ["texto longo", "área de texto"],
  label: ["rótulo"],
  checkbox: ["caixa de seleção"],
  switch: ["interruptor", "liga desliga"],
  badge: ["etiqueta", "status"],
  spinner: ["carregando"],
  link: ["âncora"],
  "radio-group": ["opção única", "rádio"],
  avatar: ["foto", "iniciais"],
  skeleton: ["carregando", "esqueleto"],
  pagination: ["paginação", "páginas"],
  popover: ["painel flutuante"],
  command: ["comandos", "busca"],
  combobox: ["busca", "autocompletar", "seleção com busca"],
  "dropdown-menu": ["menu", "ações"],
  breadcrumb: ["trilha", "navegação"],
  alert: ["aviso", "alerta"],
  sheet: ["painel lateral", "gaveta"],
  progress: ["progresso", "barra"],
  "form-field": ["campo de formulário", "validação"],
  card: ["cartão"],
  select: ["seleção", "lista de opções"],
  dialog: ["modal", "diálogo"],
  toast: ["notificação"],
  tabs: ["abas"],
  table: ["tabela"],
  tooltip: ["dica"],
  "page-header": ["cabeçalho da página"],
  "empty-state": ["estado vazio", "vazio"],
  "theme-toggle": ["tema", "escuro", "claro"],
  "command-palette": ["paleta de comandos", "atalho"],
  "app-shell": ["layout", "sidebar", "menu lateral", "painel"],
};

const commandEntries: SiteCommandEntry[] = [
  { href: "/", label: "Fundação: paleta, tipografia e contraste", group: "Páginas", keywords: ["tokens", "cores"] },
  { href: "/componentes", label: "Catálogo de componentes", group: "Páginas" },
  { href: "/exemplos", label: "Telas de exemplo", group: "Páginas" },
  { href: "/blocos", label: "Blocos", group: "Páginas", keywords: ["telas prontas", "templates"] },
  { href: "/login", label: "Bloco: Login", group: "Blocos", keywords: ["entrar", "acesso"] },
  { href: "/dashboard", label: "Bloco: Dashboard", group: "Blocos", keywords: ["painel", "métricas"] },
  { href: "/configuracoes", label: "Bloco: Configurações", group: "Blocos", keywords: ["preferências", "perfil"] },
  { href: "/esta-rota-nao-existe", label: "Bloco: 404", group: "Blocos", keywords: ["não encontrada", "erro"] },
  { href: "/exemplos/listagem", label: "Exemplo: listagem de projetos", group: "Páginas", keywords: ["tabela", "filtros"] },
  { href: "/exemplos/cadastro", label: "Exemplo: cadastro", group: "Páginas", keywords: ["formulário"] },
  ...docs.map((doc) => ({
    href: `/componentes/${doc.slug}`,
    label: doc.name,
    group: `Componentes: ${groupTitle[doc.group]}`,
    keywords: [doc.slug, ...(portugueseNames[doc.slug] ?? []), doc.summary],
  })),
];

export function SiteHeader() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only z-20 bg-accent px-4 py-3 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Pular para o conteúdo
      </a>
      <header className="sticky top-0 z-10 border-b border-line bg-ground">
        <div className={`${container} flex flex-wrap items-center justify-between gap-4 py-3`}>
          <div className="flex items-center gap-6">
            <LogoBlock asChild>
              <NextLink href="/" aria-label="@mw/ui, início">
                MW
              </NextLink>
            </LogoBlock>
            <nav aria-label="Principal">
              <ul className="flex gap-5 font-mono text-mono-sm">
                {nav.map((item) => (
                  <li key={item.href}>
                    <NextLink href={item.href} className="text-ink-muted transition-colors duration-200 hover:text-accent-text">
                      {item.label}
                    </NextLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <SiteCommand entries={commandEntries} />
            <ThemeToggle />
          </div>
        </div>
      </header>
    </>
  );
}
