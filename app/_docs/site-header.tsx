import NextLink from "next/link";
import { LogoBlock } from "@/registry/marcio/ui/logo-block";
import { ThemeToggle } from "@/registry/marcio/ui/theme-toggle";
import { componentMeta, groups } from "./catalog-meta";
import { SiteCommand, type SiteCommandEntry } from "./site-command";
import { SiteMenu } from "./site-menu";

export const container = "mx-auto max-w-content px-6";

const nav = [
  { href: "/primeiros-passos", label: "primeiros passos" },
  { href: "/", label: "fundação" },
  { href: "/escrita", label: "escrita" },
  { href: "/componentes", label: "componentes" },
  { href: "/exemplos", label: "exemplos" },
  { href: "/blocos", label: "blocos" },
  { href: "/novidades", label: "novidades" },
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
  "icon-button": ["botão de ícone", "ícone"],
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
  meter: ["medidor", "recurso", "quantidade"],
  "icon-tile": ["ícone", "destaque", "categoria"],
  "form-field": ["campo de formulário", "validação"],
  card: ["cartão"],
  select: ["seleção", "lista de opções"],
  dialog: ["modal", "diálogo"],
  "alert-dialog": ["confirmação", "excluir", "alerta"],
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
  { href: "/primeiros-passos", label: "Primeiros passos: instalar o @mw/ui num projeto", group: "Páginas", keywords: ["instalar", "instalação", "setup", "começar", "registry", "shadcn"] },
  { href: "/", label: "Fundação: cor, tipografia, espaçamento, movimento e mais", group: "Páginas", keywords: ["tokens", "cores", "raio", "camadas", "z-index", "densidade", "ícones"] },
  { href: "/icones", label: "Ícones: pacotes autorais ao lado do lucide", group: "Páginas", keywords: ["ícones", "svg", "pacotes", "medieval", "lucide"] },
  { href: "/escrita", label: "Escrita: voz, tom e formatos pt-BR", group: "Páginas", keywords: ["tom", "voz", "texto", "mensagem de erro", "microcopy", "formatos", "datas", "moeda"] },
  { href: "/componentes", label: "Catálogo de componentes", group: "Páginas" },
  { href: "/exemplos", label: "Telas de exemplo", group: "Páginas" },
  { href: "/blocos", label: "Blocos", group: "Páginas", keywords: ["telas prontas", "templates"] },
  { href: "/novidades", label: "Novidades: o que mudou em cada versão", group: "Páginas", keywords: ["changelog", "versão", "migração", "atualizar"] },
  { href: "/login", label: "Bloco: Login", group: "Blocos", keywords: ["entrar", "acesso"] },
  { href: "/dashboard", label: "Bloco: Dashboard", group: "Blocos", keywords: ["painel", "métricas"] },
  { href: "/configuracoes", label: "Bloco: Configurações", group: "Blocos", keywords: ["preferências", "perfil"] },
  { href: "/esta-rota-nao-existe", label: "Bloco: 404", group: "Blocos", keywords: ["não encontrada", "erro"] },
  { href: "/exemplos/listagem", label: "Exemplo: listagem de projetos", group: "Páginas", keywords: ["tabela", "filtros"] },
  { href: "/exemplos/cadastro", label: "Exemplo: cadastro", group: "Páginas", keywords: ["formulário"] },
  ...componentMeta.map((doc) => ({
    href: `/componentes/${doc.slug}`,
    label: doc.name,
    group: `Componentes: ${groupTitle[doc.group]}`,
    keywords: [doc.slug, ...(portugueseNames[doc.slug] ?? []), doc.summary],
  })),
];

const navLinkClass = "text-ink-muted transition-colors duration-base hover:text-accent-text";

export function SiteHeader() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only z-tooltip bg-accent px-4 py-3 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Pular para o conteúdo
      </a>
      <header data-site-header className="sticky top-0 z-sticky border-b border-line bg-ground">
        <div className={`${container} flex items-center justify-between gap-4 py-3`}>
          <div className="flex items-center gap-6">
            <LogoBlock asChild>
              <NextLink href="/" aria-label="@mw/ui, início">
                MW
              </NextLink>
            </LogoBlock>
            <nav aria-label="Principal" className="hidden xl:block">
              <ul className="flex gap-5 font-mono text-mono-sm whitespace-nowrap">
                {nav.map((item) => (
                  <li key={item.href}>
                    <NextLink href={item.href} className={navLinkClass}>
                      {item.label}
                    </NextLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <SiteCommand entries={commandEntries} />
            <ThemeToggle className="hidden xl:inline-flex" />
            <SiteMenu links={nav} linkClassName={navLinkClass} className="xl:hidden" />
          </div>
        </div>
      </header>
    </>
  );
}
