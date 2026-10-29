import { Button } from "@/registry/marcio/ui/button";
import { Footer } from "@/registry/marcio/ui/footer";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("footer"),
  usage: {
    use: ["Fim de landing pages e sites públicos, com o contato e os links secundários.", "Grupos de links como Produto, Recursos e Contato."],
    avoid: ["Sistemas internos: o AppShell não tem rodapé.", "Links principais: eles ficam na Navbar, o rodapé repete só se ajudar."],
  },
  props: [
    { name: "title / description / actions", type: "ReactNode", description: "Chamada no topo do rodapé, como Vamos conversar? com um botão de e-mail." },
    { name: "groups", type: "{ title, links }[]", description: "Grupos de links, cada um num nav rotulado pelo título." },
    { name: "copyright", type: "ReactNode", description: "Texto em CodeComment na linha final." },
    { name: "backToTop", type: "{ href, label? }", description: "Link de voltar ao topo, padrão voltar ao topo ↑." },
  ],
  examples: [
    {
      title: "Contato e links",
      className: "w-full",
      stacked: true,
      code: `<Footer\n  title="Vamos conversar?"\n  description="Aberto a oportunidades full-stack, projetos e parcerias."\n  actions={<Button>Enviar e-mail</Button>}\n  groups={[{ title: "Perfis", links: [{ href: "https://github.com/wenderu00", label: "GitHub" }] }]}\n  copyright="2026 Márcio Wendell · Recife, PE"\n  backToTop={{ href: "#topo" }}\n/>`,
      render: (theme) => (
        <Footer
          className="w-full"
          title="Vamos conversar?"
          description="Aberto a oportunidades full-stack, projetos e parcerias."
          actions={<Button>Enviar e-mail</Button>}
          groups={[
            {
              title: `Perfis, tema ${theme === "dark" ? "escuro" : "claro"}`,
              links: [
                { href: "https://github.com/wenderu00", label: "GitHub" },
                { href: "https://www.linkedin.com/in/marcio-wendell", label: "LinkedIn" },
              ],
            },
          ]}
          copyright="2026 Márcio Wendell · Recife, PE"
          backToTop={{ href: "#topo" }}
        />
      ),
    },
  ],
  a11y: [
    "É um footer (contentinfo); cada grupo de links é um nav rotulado pelo título do grupo.",
    "O título da chamada é h2, para seguir a hierarquia das seções da página.",
  ],
  keyboard: [
    { keys: "Tab", action: "Percorre as ações, os links dos grupos e o voltar ao topo." },
    { keys: "Enter", action: "Segue o link com foco." },
  ],
};
