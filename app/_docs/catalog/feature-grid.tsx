import { Code, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { FeatureGrid } from "@/registry/marcio/ui/feature-grid";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("feature-grid"),
  usage: {
    use: ["O que um produto faz ou os serviços de uma pessoa, de três a oito itens.", "Seções de landing page logo abaixo do Hero."],
    avoid: ["Itens que levam a outras páginas: use Cards com link.", "Dados para comparar: use Table.", "Um item só: um parágrafo basta."],
  },
  props: [
    { name: "items", type: "{ title, description, icon? }[]", description: "Itens da grade. O ícone é um elemento lucide com aria-hidden." },
    { name: "columns", type: "2 | 3 | 4", default: "2", description: "Colunas em telas largas; no celular, uma." },
    { name: "numbered", type: "boolean", default: "true", description: "Mostra o índice 01, 02 em mono, decorativo." },
    { name: "headingLevel", type: '"h3" | "h4"', default: '"h3"', description: "Nível do título de cada item." },
  ],
  examples: [
    {
      title: "Serviços",
      className: "w-full",
      stacked: true,
      code: `<FeatureGrid\n  items={[\n    { icon: <Code aria-hidden="true" />, title: "Desenvolvimento full-stack", description: "Do layout ao deploy." },\n    { icon: <ShieldCheck aria-hidden="true" />, title: "Qualidade e testes", description: "BDD, E2E e testes de mutação." },\n  ]}\n/>`,
      render: () => (
        <FeatureGrid
          className="w-full"
          items={[
            { icon: <Code aria-hidden="true" />, title: "Desenvolvimento full-stack", description: "Interfaces em Next.js e Tailwind, APIs em NestJS e Effect-TS, banco PostgreSQL. Do layout ao deploy." },
            { icon: <ShieldCheck aria-hidden="true" />, title: "Qualidade e testes", description: "BDD com playwright-bdd, testes E2E e testes de mutação com Stryker." },
            { icon: <Workflow aria-hidden="true" />, title: "Infraestrutura e CI/CD", description: "Docker, pipelines no GitLab CI e GitHub Actions, deploy em Vercel e Render." },
            { icon: <Sparkles aria-hidden="true" />, title: "Arquitetura e IA aplicada", description: "Clean Architecture, DDD, ADRs e times de agentes para requisitos." },
          ]}
        />
      ),
    },
  ],
  a11y: ["É uma lista: o leitor de tela anuncia quantos itens há.", "Ícones e índices são decorativos; o título de cada item diz o que ele é."],
};
