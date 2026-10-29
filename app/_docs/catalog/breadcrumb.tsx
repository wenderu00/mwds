import { BreadcrumbTrail } from "@/registry/marcio/ui/breadcrumb";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("breadcrumb"),
  usage: {
    use: ["Mostrar onde a página está numa hierarquia de três níveis ou mais.", "Dentro do PageHeader, acima do título."],
    avoid: ["Sites rasos, de um ou dois níveis.", "Mostrar o histórico de navegação: a trilha é a hierarquia, não o caminho percorrido."],
  },
  keyboard: [
    { keys: "Tab", action: "Percorre os links da trilha. A página atual não é link." },
    { keys: "Enter", action: "Segue o link com foco." },
  ],
  props: [
    { name: "BreadcrumbTrail items", type: "{ label, href? }[]", description: "Atalho: o último item vira a página atual." },
    { name: "aria-label", type: "string", default: '"Trilha de navegação"', description: "Nome do nav." },
    { name: "BreadcrumbLink asChild", type: "boolean", description: "Para usar com next/link." },
    { name: "BreadcrumbSeparator children", type: "ReactNode", default: '"/"', description: "Troca o separador." },
  ],
  examples: [
    {
      title: "Trilha simples",
      code: `<BreadcrumbTrail items={[\n  { label: "Início", href: "/" },\n  { label: "Projetos", href: "/projetos" },\n  { label: "ResenhaHub" },\n]} />`,
      render: () => (
        <BreadcrumbTrail
          items={[
            { label: "Início", href: "#" },
            { label: "Projetos", href: "#" },
            { label: "ResenhaHub" },
          ]}
        />
      ),
    },
  ],
  a11y: ["Fica num nav rotulado; a página atual tem aria-current=\"page\".", "Os separadores são escondidos do leitor de tela."],
};
