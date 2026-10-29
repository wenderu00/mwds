import { Button } from "@/registry/marcio/ui/button";
import { EmptyState } from "@/registry/marcio/ui/empty-state";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("empty-state"),
  usage: {
    use: ["Lista ou tabela sem itens, com a ação que resolve: Criar o primeiro projeto.", "Busca sem resultado, dizendo como ampliar a busca."],
    avoid: ["Erro ao carregar: use Alert com a ação de tentar de novo.", "Carregamento: use Skeleton."],
  },
  props: [
    { name: "title", type: "ReactNode", description: "Título do estado." },
    { name: "comment", type: "ReactNode", description: "Linha em formato // comentário acima do título." },
    { name: "description", type: "ReactNode", description: "Explica o que fazer." },
    { name: "icon", type: "ReactNode", description: "Ícone opcional em accent-text." },
    { name: "actions", type: "ReactNode", description: "Botões." },
    { name: "decorated", type: "boolean", default: "false", description: "Fundo com DotGrid." },
    { name: "headingLevel", type: '"h2" | "h3" | "h4"', default: '"h2"', description: "Nível do título." },
    classNameProp,
  ],
  examples: [
    {
      title: "Filtro sem resultado",
      className: "w-full",
      code: `<EmptyState\n  comment="0 resultados"\n  title="Nenhum projeto encontrado"\n  description="Ajuste a busca ou limpe os filtros."\n  actions={<Button variant="secondary">Limpar filtros</Button>}\n/>`,
      render: () => (
        <EmptyState
          className="w-full"
          headingLevel="h4"
          comment="0 resultados"
          title="Nenhum projeto encontrado"
          description="Ajuste a busca ou limpe os filtros."
          actions={<Button variant="secondary">Limpar filtros</Button>}
        />
      ),
    },
    {
      title: "Primeiro uso, decorado",
      className: "w-full",
      code: `<EmptyState decorated comment="nada por aqui ainda" title="Crie seu primeiro projeto" actions={<Button>Criar projeto</Button>} />`,
      render: () => (
        <EmptyState
          className="w-full"
          headingLevel="h4"
          decorated
          comment="nada por aqui ainda"
          title="Crie seu primeiro projeto"
          description="Projetos agrupam tarefas, prazos e pessoas."
          actions={<Button>Criar projeto</Button>}
        />
      ),
    },
  ],
  a11y: ["A grade de pontos é decorativa e parada.", "Escolha o nível do título conforme a página."],
};
