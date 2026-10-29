import { AppShellBottomDemo } from "../demos/app-shell-bottom";
import { AppShellDemo } from "../demos/app-shell";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("app-shell"),
  usage: {
    use: ["Casca de sistemas internos e painéis com várias seções.", "Sidebar recolhível quando a pessoa precisa de espaço para tabelas."],
    avoid: [
      "Sites públicos e páginas de conteúdo: use um cabeçalho simples.",
      "Sistemas de uma ou duas telas.",
      "mobileNav=\"bottom\" com menos de 3 ou mais de 5 itens: o AppShell volta para o Sheet e avisa no console.",
    ],
  },
  keyboard: [
    { keys: "Tab", action: "O primeiro Tab mostra o link Pular para o conteúdo." },
    { keys: "Enter", action: "No link de pular, leva o foco ao conteúdo principal." },
    { keys: "Tab / Enter na sidebar", action: "Percorrem e seguem os itens de navegação." },
    { keys: "Enter / Espaço no botão de recolher", action: "Recolhe e expande a sidebar." },
  ],
  props: [
    { name: "AppShell skipLinkLabel / mainId", type: "string", description: "Link de pular para o conteúdo e o id do main." },
    { name: "AppShell mobileNav", type: '"sheet" | "bottom"', default: '"sheet"', description: "No mobile, abre a navegação num Sheet ou mostra os mesmos itens como abas no rodapé. bottom aceita de 3 a 5 itens escritos direto no AppShellNav." },
    { name: "AppShell sidebarBreakpoint", type: '"md" | "lg"', default: '"lg"', description: "A partir de onde a sidebar aparece no lugar do Sheet ou das abas." },
    { name: "AppShellAside aria-label", type: "string", description: "Painel à direita a partir de lg. Abaixo disso, vai para depois do conteúdo principal. O nome é obrigatório." },
    { name: "AppShellSidebar brand / footer", type: "ReactNode", description: "Topo e rodapé da sidebar." },
    { name: "AppShellNavGroup label", type: "ReactNode", description: "Título do grupo; some quando recolhido." },
    { name: "AppShellMain as", type: '"main" | "div"', default: '"main"', description: "Use div quando o AppShell fica dentro de uma página que já tem main." },
    { name: "AppShellNavItem", type: "{ label, icon, active, badge, href, asChild }", description: "Item de navegação; active marca a página atual. Com asChild, passe um link vazio (como NextLink) e o ícone e o rótulo entram dentro dele." },
    { name: "AppShellHeader", type: "componente", description: "Cabeçalho com os botões de menu (mobile) e recolher (desktop) e o que você colocar." },
    { name: "useAppShell", type: "hook", description: "Lê e muda collapsed e mobileOpen." },
  ],
  examples: [
    {
      title: "Painel",
      description: "A versão em tela cheia está no bloco Dashboard. No mobile, o botão de menu abre a navegação num Sheet.",
      className: "w-full",
      stacked: true,
      code: `<AppShell>\n  <AppShellSidebar brand={<LogoBlock size="sm">MW</LogoBlock>}>\n    <AppShellNav>\n      <AppShellNavGroup label="Geral">\n        <AppShellNavItem asChild label="Painel" icon={icone} active>\n          <NextLink href="/painel" />\n        </AppShellNavItem>\n      </AppShellNavGroup>\n    </AppShellNav>\n  </AppShellSidebar>\n  <AppShellBody>\n    <AppShellHeader><BreadcrumbTrail items={...} /></AppShellHeader>\n    <AppShellMain>...</AppShellMain>\n  </AppShellBody>\n</AppShell>`,
      render: (theme) => <AppShellDemo theme={theme} />,
    },
    {
      title: "Abas no rodapé e painel lateral",
      description: "Num celular, os itens viram abas no rodapé e a fila de construção vai para baixo do conteúdo.",
      className: "w-full",
      stacked: true,
      code: `<AppShell mobileNav="bottom">
<AppShellSidebar brand={...}>
  <AppShellNav>
    <AppShellNavGroup label="Reino">
      <AppShellNavItem href="/castelo" label="Castelo" icon={<Castle />} active />
      ...
    </AppShellNavGroup>
  </AppShellNav>
</AppShellSidebar>
<AppShellBody>
  <AppShellHeader>...</AppShellHeader>
  <AppShellMain>...</AppShellMain>
  <AppShellAside aria-label="Fila de construção">...</AppShellAside>
</AppShellBody>
</AppShell>`,
      render: (theme) => <AppShellBottomDemo theme={theme} />,
    },
  ],
  a11y: [
    "Inclui o link Pular para o conteúdo e marca a página atual com aria-current.",
    "Recolhida, cada item mantém o nome acessível e mostra o nome em tooltip.",
    "O botão de recolher informa o estado com aria-expanded; a escolha fica salva.",
    "As abas do rodapé têm pelo menos a altura de h-control e marcam a página atual com aria-current. Os rótulos de grupo ficam só para o leitor de tela.",
    "AppShellAside é um landmark complementary com nome e aparece uma vez só no DOM.",
  ],
};
