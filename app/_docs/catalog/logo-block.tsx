import { LogoBlock } from "@/registry/marcio/ui/logo-block";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp, asChildProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("logo-block"),
  usage: {
    use: ["A marca no cabeçalho do site e em telas de login.", "Um único ponto de identidade por tela."],
    avoid: ["Mais de um por tela.", "Destacar conteúdo ou ação: para isso existe o Button primário."],
  },
  props: [
    { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Altura de 36, 44 ou 64px." },
    asChildProp,
    classNameProp,
  ],
  examples: [
    {
      title: "Tamanhos",
      code: `<LogoBlock size="sm">MW</LogoBlock>\n<LogoBlock>MW</LogoBlock>\n<LogoBlock size="lg">MW</LogoBlock>`,
      render: () => (
        <>
          <LogoBlock size="sm">MW</LogoBlock>
          <LogoBlock>MW</LogoBlock>
          <LogoBlock size="lg">MW</LogoBlock>
        </>
      ),
    },
    {
      title: "Como link para o início",
      code: `<LogoBlock asChild>\n  <NextLink href="/" aria-label="MW, Márcio Wendell, início">MW</NextLink>\n</LogoBlock>`,
      render: () => (
        <LogoBlock asChild>
          <a href="#" aria-label="MW, Márcio Wendell, início">
            MW
          </a>
        </LogoBlock>
      ),
    },
  ],
  a11y: [
    "Quando for link, dê um aria-label com o nome completo: MW sozinho não diz nada.",
    'O aria-label começa pelas letras do bloco ("MW, Márcio Wendell, início"): quem usa comando de voz fala o que vê.',
  ],
};
