import { Badge } from "@/registry/marcio/ui/badge";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp, asChildProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("badge"),
  usage: {
    use: ["Status e categorias curtas em tabelas, cards e cabeçalhos.", "Contagens pequenas ao lado de um item de navegação."],
    avoid: ["Ações: badge não é clicável. Use Button ou Link.", "Avisos que a pessoa precisa ler: use Alert."],
  },
  props: [
    { name: "tone", type: '"neutral" | "accent" | "danger" | "success" | "warning" | "info"', default: '"neutral"', description: "Significado." },
    { name: "appearance", type: '"soft" | "solid" | "outline"', default: '"soft"', description: "Peso visual." },
    asChildProp,
    classNameProp,
  ],
  examples: [
    {
      title: "Suave",
      code: `<Badge tone="success">ativo</Badge>`,
      render: () => (
        <>
          <Badge>rascunho</Badge>
          <Badge tone="accent">novo</Badge>
          <Badge tone="danger">erro</Badge>
          <Badge tone="success">ativo</Badge>
          <Badge tone="warning">pendente</Badge>
          <Badge tone="info">beta</Badge>
        </>
      ),
    },
    {
      title: "Sólido",
      code: `<Badge tone="danger" appearance="solid">erro</Badge>`,
      render: () => (
        <>
          <Badge appearance="solid">rascunho</Badge>
          <Badge tone="accent" appearance="solid">novo</Badge>
          <Badge tone="danger" appearance="solid">erro</Badge>
          <Badge tone="success" appearance="solid">ativo</Badge>
          <Badge tone="warning" appearance="solid">pendente</Badge>
          <Badge tone="info" appearance="solid">beta</Badge>
        </>
      ),
    },
    {
      title: "Contorno",
      code: `<Badge tone="info" appearance="outline">beta</Badge>`,
      render: () => (
        <>
          <Badge appearance="outline">rascunho</Badge>
          <Badge tone="accent" appearance="outline">novo</Badge>
          <Badge tone="danger" appearance="outline">erro</Badge>
          <Badge tone="success" appearance="outline">ativo</Badge>
          <Badge tone="warning" appearance="outline">pendente</Badge>
          <Badge tone="info" appearance="outline">beta</Badge>
        </>
      ),
    },
  ],
  a11y: ["A cor nunca é a única pista: o texto do badge diz o status."],
};
