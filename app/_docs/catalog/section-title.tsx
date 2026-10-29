import { SectionTitle } from "@/registry/marcio/ui/section-title";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("section-title"),
  usage: {
    use: ["Abrir seções numeradas de páginas de conteúdo e documentação.", "Títulos de seção em telas de destaque, como o portfólio."],
    avoid: ["Títulos dentro de cards e formulários: use CardTitle.", "O título principal de uma tela de sistema: use PageHeader."],
  },
  props: [
    { name: "index", type: "string", description: "Número da seção, como 01. É decorativo para leitores de tela." },
    { name: "kicker", type: "ReactNode", description: "Rótulo opcional entre o número e o título." },
    { name: "as", type: '"h1" | "h2" | "h3" | "h4"', default: '"h2"', description: "Nível do cabeçalho." },
    { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "sm usa display-sm, md usa display-md e lg usa display-lg. Use lg na abertura de seções de página de conteúdo." },
    { name: "line", type: "boolean", default: "true", description: "Mostra a linha ao lado do número." },
    classNameProp,
  ],
  examples: [
    {
      title: "Com número",
      code: `<SectionTitle size="lg" index="01">Quem sou eu?</SectionTitle>`,
      render: () => <SectionTitle size="lg" index="01" className="w-full">Quem sou eu?</SectionTitle>,
    },
    {
      title: "Com kicker e tamanho md",
      code: `<SectionTitle index="02" kicker="Serviços" size="md" as="h3">O que faço?</SectionTitle>`,
      render: () => (
        <SectionTitle index="02" kicker="Serviços" size="md" as="h3" className="w-full">
          O que faço?
        </SectionTitle>
      ),
    },
  ],
  a11y: ["O número fica com aria-hidden para o leitor de tela anunciar só o título.", "Escolha o nível com as para manter a hierarquia da página."],
};
