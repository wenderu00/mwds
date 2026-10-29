import { Heading, Text } from "@/registry/marcio/ui/typography";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, asChildProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("typography"),
  usage: {
    use: ["Títulos e parágrafos fora dos componentes que já trazem tipografia, como páginas de conteúdo.", "Escolher o nível certo da hierarquia com as, mantendo o tamanho visual."],
    avoid: ["Título de seção numerada: use SectionTitle.", "Título de tela de sistema: use PageHeader.", "Pular níveis de heading para conseguir um tamanho: troque o size, não o as."],
  },
  props: [
    { name: "Heading size", type: '"display-xl" | "display-lg" | "display-md" | "display-sm"', default: '"display-md"', description: "Tamanho do título. Define a tag padrão: h1, h2, h2 e h3." },
    { name: "Heading as", type: '"h1" a "h6" | "p" | "span"', description: "Troca a tag sem mudar o tamanho." },
    { name: "Text size", type: '"lead" | "base" | "mono-sm" | "mono-xs"', default: '"base"', description: "Tamanho. Os tamanhos mono usam IBM Plex Mono." },
    { name: "Text tone", type: '"ink" | "soft" | "muted"', default: '"soft"', description: "Cor do texto: ink, ink-soft ou ink-muted." },
    { name: "Text as", type: '"p" | "span" | "div" | "small" | "li" | ...', default: '"p"', description: "Tag do texto." },
    asChildProp,
  ],
  examples: [
    {
      title: "Escala de títulos",
      className: "flex-col items-start",
      code: `<Heading size="display-xl">Display XL</Heading>\n<Heading size="display-lg">Display LG</Heading>\n<Heading>Display MD</Heading>\n<Heading size="display-sm">Display SM</Heading>`,
      render: () => (
        <>
          <Heading size="display-xl" as="p">Display XL</Heading>
          <Heading size="display-lg" as="p">Display LG</Heading>
          <Heading as="p">Display MD</Heading>
          <Heading size="display-sm" as="p">Display SM</Heading>
        </>
      ),
    },
    {
      title: "Textos",
      className: "flex-col items-start",
      code: `<Text size="lead">Texto de abertura.</Text>\n<Text>Corpo do texto.</Text>\n<Text size="mono-sm" tone="muted">metadado em mono</Text>`,
      render: () => (
        <>
          <Text size="lead">Um design system com visual de terminal.</Text>
          <Text>Corpo do texto em IBM Plex Sans, 17px, com altura de linha confortável para leitura.</Text>
          <Text size="mono-sm" tone="muted">atualizado em 24/10/2026</Text>
          <Text size="mono-xs" tone="muted">v0.1.0 · beta</Text>
        </>
      ),
    },
  ],
  a11y: ["A tag padrão do Heading segue o tamanho, mas a hierarquia da página manda: use as para não pular níveis.", "Text com tone muted fica em ink-muted, que passa 4,5:1 nos dois temas."],
};
