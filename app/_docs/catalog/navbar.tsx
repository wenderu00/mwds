import { Badge } from "@/registry/marcio/ui/badge";
import { LogoBlock } from "@/registry/marcio/ui/logo-block";
import { Navbar } from "@/registry/marcio/ui/navbar";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("navbar"),
  usage: {
    use: ["Navegação principal de sites públicos e landing pages, com até seis links.", "Links para as seções de uma página longa, como no portfólio."],
    avoid: ["Sistemas internos com muitas telas: use AppShell.", "Ações da página, como salvar: elas ficam no conteúdo, não na navegação."],
  },
  props: [
    { name: "brand", type: "ReactNode", description: "Marca à esquerda, normalmente um LogoBlock com link para o início." },
    { name: "links", type: "{ href, label, current? }[]", description: "Links da navegação. current marca a página atual com aria-current." },
    { name: "actions", type: "ReactNode", description: "Ações à direita, como ThemeToggle ou um Button." },
    { name: "menuFooter", type: "ReactNode", description: "Conteúdo extra no fim do painel do celular." },
    { name: "label / menuLabel", type: "string", default: '"Principal" / "Menu"', description: "Nome da navegação e do botão do painel." },
    { name: "sticky", type: "boolean", default: "true", description: "Fixa no topo, na camada z-sticky." },
    {
      name: "collapseBelow",
      type: '"md" | "lg"',
      default: '"md"',
      description: "Largura abaixo da qual os links vão para o painel. Use lg quando links e ações não cabem juntos no tablet.",
    },
  ],
  examples: [
    {
      title: "Site com seções",
      className: "w-full",
      stacked: true,
      code: `<Navbar\n  brand={<LogoBlock asChild size="sm"><a href="#topo" aria-label="MW, Márcio Wendell, início">MW</a></LogoBlock>}\n  links={[\n    { href: "#quem-sou", label: "01 Quem sou eu", current: true },\n    { href: "#o-que-faco", label: "02 O que faço" },\n    { href: "#trabalhos", label: "03 Trabalhos" },\n  ]}\n  actions={<ThemeToggle />}\n/>`,
      render: (theme) => (
        <Navbar
          sticky={false}
          className="w-full"
          label={`Seções, exemplo no tema ${theme === "dark" ? "escuro" : "claro"}`}
          brand={
            <LogoBlock asChild size="sm">
              <a href="#topo" aria-label="MW, Márcio Wendell, início">
                MW
              </a>
            </LogoBlock>
          }
          links={[
            { href: "#quem-sou", label: "01 Quem sou eu", current: true },
            { href: "#o-que-faco", label: "02 O que faço" },
            { href: "#trabalhos", label: "03 Trabalhos" },
          ]}
        />
      ),
    },
    {
      title: "Links e ações recolhidos no tablet",
      className: "w-full",
      stacked: true,
      code: `<Navbar\n  collapseBelow="lg"\n  brand={<LogoBlock asChild size="sm"><a href="#topo" aria-label="XP, XPomodoro, início">XP</a></LogoBlock>}\n  links={[\n    { href: "#sessao", label: "sessão", current: true },\n    { href: "#manual", label: "manual xp" },\n    { href: "#filosofia", label: "a filosofia" },\n  ]}\n  actions={<Badge tone="accent">12 XP</Badge>}\n/>`,
      render: (theme) => (
        <Navbar
          sticky={false}
          collapseBelow="lg"
          className="w-full"
          label={`Navegação com ações, exemplo no tema ${theme === "dark" ? "escuro" : "claro"}`}
          menuLabel={`Menu, exemplo no tema ${theme === "dark" ? "escuro" : "claro"}`}
          brand={
            <LogoBlock asChild size="sm">
              <a href="#topo" aria-label="XP, XPomodoro, início">
                XP
              </a>
            </LogoBlock>
          }
          links={[
            { href: "#sessao", label: "sessão", current: true },
            { href: "#manual", label: "manual xp" },
            { href: "#filosofia", label: "a filosofia" },
          ]}
          actions={<Badge tone="accent">12 XP</Badge>}
        />
      ),
    },
  ],
  a11y: [
    "É um header (banner) com um nav rotulado; o link da página ou seção atual tem aria-current page e ganha sublinhado, não só cor.",
    "No celular, o botão Menu abre um Sheet que prende o foco; escolher um link fecha o painel.",
    "Se a página tiver mais de uma navegação, dê um label diferente a cada uma.",
  ],
  keyboard: [
    { keys: "Tab", action: "Percorre a marca, os links e as ações." },
    { keys: "Enter", action: "Segue o link com foco." },
    { keys: "Enter / Espaço no Menu", action: "Abre o painel no celular; Esc fecha e devolve o foco ao botão." },
  ],
};
