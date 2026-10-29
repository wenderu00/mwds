import { Button } from "@/registry/marcio/ui/button";
import { Hero } from "@/registry/marcio/ui/hero";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("hero"),
  usage: {
    use: ["Topo de landing pages e portfólios, uma vez por página.", "Uma ação principal e no máximo uma secundária."],
    avoid: ["Telas de sistema: use PageHeader.", "Textos longos: o hero apresenta, as seções explicam."],
  },
  props: [
    { name: "title", type: "ReactNode", description: "Título em display-xl. É o h1 da página por padrão." },
    { name: "kicker / description", type: "ReactNode", description: "Etiqueta acima do título e texto de apoio em lead." },
    { name: "typing", type: "string", description: "Linha em mono que aparece letra a letra, com TypingText." },
    { name: "actions / aside", type: "ReactNode", description: "Botões abaixo do texto e conteúdo ao lado, como uma foto." },
    { name: "decorated", type: "boolean", default: "true", description: "Mostra a DotGrid animada ao fundo." },
    { name: "headingLevel", type: '"h1" | "h2"', default: '"h1"', description: "Nível do título." },
  ],
  examples: [
    {
      title: "Portfólio",
      className: "w-full",
      stacked: true,
      code: `<Hero\n  kicker="Desenvolvedor full-stack · Recife, PE"\n  title="Márcio Wendell"\n  description="Construo sistemas web de ponta a ponta, do Next.js ao banco de dados."\n  typing="// disponível para projetos full-stack"\n  actions={<><Button size="lg">Ver trabalhos</Button><Button size="lg" variant="secondary">E-mail</Button></>}\n/>`,
      render: () => (
        <Hero
          headingLevel="h2"
          className="w-full"
          kicker="Desenvolvedor full-stack · Recife, PE"
          title="Márcio Wendell"
          description="Construo sistemas web de ponta a ponta, do Next.js ao banco de dados."
          typing="// disponível para projetos full-stack"
          actions={
            <>
              <Button size="lg">Ver trabalhos</Button>
              <Button size="lg" variant="secondary">
                E-mail
              </Button>
            </>
          }
        />
      ),
    },
  ],
  a11y: [
    "O título é o h1 da página; use headingLevel h2 só quando o hero não abre a página.",
    "A DotGrid é decorativa e para com movimento reduzido; a linha digitando aparece inteira.",
    "O texto digitado está todo no DOM, então o leitor de tela lê a frase completa de uma vez.",
  ],
};
