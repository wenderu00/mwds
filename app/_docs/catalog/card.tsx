import { Button } from "@/registry/marcio/ui/button";
import NextLink from "next/link";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/marcio/ui/card";
import { CodeComment } from "@/registry/marcio/ui/code-comment";
import { Kicker } from "@/registry/marcio/ui/kicker";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("card"),
  usage: {
    use: [
      "Agrupar conteúdo relacionado numa superfície: resumo, formulário, item de lista.",
      "interactive com CardAction quando o card inteiro leva a um lugar: o link fica no título e a área clicável cobre o card.",
    ],
    avoid: [
      "Cards dentro de cards.",
      "Separar seções de uma página que já têm títulos: espaço basta.",
      "Destacar um aviso: use Alert.",
      "Mais de um CardAction por card, ou um botão em volta do card inteiro: botão não pode conter título e blocos.",
    ],
  },
  keyboard: [
    { keys: "Tab", action: "No card interactive, foca o link ou botão de dentro e acende a borda." },
    { keys: "Enter", action: "Com CardAction, segue o link ou aciona o botão do título." },
  ],
  props: [
    { name: "interactive", type: "boolean", default: "false", description: "Borda em accent-line no hover e quando algo dentro tem foco." },
    { name: "CardTitle as", type: '"h2" | "h3" | "h4" | "p"', default: '"h3"', description: "Nível do título do card." },
    { name: "CardAction asChild", type: "boolean", default: "false", description: "Usa o filho (um link) no lugar do botão. A área clicável se estica até cobrir o card." },
    classNameProp,
  ],
  examples: [
    {
      title: "Completo",
      className: "w-full",
      code: `<Card interactive>\n  <CardHeader>\n    <Kicker>Produto próprio</Kicker>\n    <CardTitle>ResenhaHub</CardTitle>\n    <CardDescription>Plataforma de resenhas.</CardDescription>\n  </CardHeader>\n  <CardContent>...</CardContent>\n  <CardFooter><Button size="sm">Abrir</Button></CardFooter>\n</Card>`,
      render: () => (
        <Card interactive className="w-full">
          <CardHeader>
            <Kicker className="text-mono-xs">Produto próprio</Kicker>
            <CardTitle>ResenhaHub</CardTitle>
            <CardDescription>Plataforma de resenhas de filmes e séries.</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeComment>Next.js · Tailwind · Supabase</CodeComment>
          </CardContent>
          <CardFooter>
            <Button size="sm">Abrir</Button>
            <Button size="sm" variant="ghost">
              Detalhes
            </Button>
          </CardFooter>
        </Card>
      ),
    },
    {
      title: "Card clicável inteiro",
      className: "w-full",
      code: `<Card interactive>\n  <CardHeader>\n    <CardTitle>\n      <CardAction asChild>\n        <NextLink href="/componentes/badge/">Castelo</NextLink>\n      </CardAction>\n    </CardTitle>\n    <CardDescription>Nível 3, produz 40 de ouro por minuto.</CardDescription>\n  </CardHeader>\n</Card>`,
      render: () => (
        <Card interactive className="w-full">
          <CardHeader>
            <CardTitle>
              <CardAction asChild>
                <NextLink href="/componentes/badge/">Castelo</NextLink>
              </CardAction>
            </CardTitle>
            <CardDescription>Nível 3, produz 40 de ouro por minuto.</CardDescription>
          </CardHeader>
        </Card>
      ),
    },
  ],
  a11y: [
    "CardTitle é h3 por padrão; use as=\"h2\" ou outro nível para manter a hierarquia da página sem pular níveis.",
    "Com CardAction, o nome do link é o título do card e ele é a única parada de Tab. Outro controle dentro do card precisa de relative z-base para ficar acima da área esticada.",
  ],
};
