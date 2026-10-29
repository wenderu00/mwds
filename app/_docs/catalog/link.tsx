import { Link } from "@/registry/marcio/ui/link";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp, asChildProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("link"),
  usage: {
    use: ["Navegar para outra página ou âncora.", "Links dentro de texto corrido, sempre sublinhados."],
    avoid: ["Disparar uma ação na mesma página: use Button.", "Texto como clique aqui: o texto do link precisa dizer o destino."],
  },
  dosDonts: [
    {
      do: {
        caption: "O texto do link diz para onde ele leva.",
        render: () => (
          <p className="text-ink-soft">
            Antes de enviar, leia a <Link href="#">política de privacidade</Link>.
          </p>
        ),
      },
      dont: {
        caption: "Clique aqui não diz o destino, e lista de links do leitor de tela fica sem sentido.",
        render: () => (
          <p className="text-ink-soft">
            Para ler a política de privacidade, <Link href="#">clique aqui</Link>.
          </p>
        ),
      },
    },
  ],
  keyboard: [
    { keys: "Tab", action: "Leva o foco ao link." },
    { keys: "Enter", action: "Segue o link." },
  ],
  props: [
    { name: "variant", type: '"inline" | "standalone" | "muted"', default: '"inline"', description: "Contexto do link." },
    { name: "mono", type: "boolean", default: "false", description: "Usa a fonte mono." },
    { name: "external", type: "boolean", default: "false", description: "Abre em nova aba, mostra ↗ e anuncia isso." },
    asChildProp,
    classNameProp,
  ],
  examples: [
    {
      title: "Dentro de texto",
      code: `<p>Leia a <Link href="/docs">documentação</Link> antes de começar.</p>`,
      render: () => (
        <p className="text-ink-soft">
          Leia a <Link href="#">documentação</Link> antes de começar.
        </p>
      ),
    },
    {
      title: "Navegação e externo",
      code: `<Link variant="standalone" mono href="mailto:...">contato@exemplo.com</Link>\n<Link variant="standalone" external href="https://github.com">GitHub</Link>`,
      render: () => (
        <>
          <Link variant="standalone" mono href="#">
            contato@exemplo.com
          </Link>
          <Link variant="standalone" external href="https://github.com/wenderu00">
            GitHub
          </Link>
          <Link variant="muted" href="#">
            termos de uso
          </Link>
        </>
      ),
    },
    {
      title: "Com next/link",
      code: `<Link asChild variant="standalone">\n  <NextLink href="/componentes">componentes</NextLink>\n</Link>`,
      render: () => (
        <Link asChild variant="standalone">
          <a href="#">componentes</a>
        </Link>
      ),
    },
  ],
  a11y: ["Dentro de parágrafos o sublinhado fica sempre visível, porque a cor sozinha não basta.", "Links externos anunciam que abrem em nova aba."],
};
