import { Button } from "@/registry/marcio/ui/button";
import { PageHeader } from "@/registry/marcio/ui/page-header";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("page-header"),
  usage: {
    use: ["Topo de toda tela de sistema: trilha, título h1, descrição e ações da página.", "A ação principal da tela fica à direita, como o único botão primário."],
    avoid: ["Mais de um por página.", "Seções dentro da página: use SectionTitle ou CardTitle."],
  },
  props: [
    { name: "title", type: "ReactNode", description: "Vira o h1 da página." },
    { name: "kicker", type: "ReactNode", description: "Rótulo acima do título." },
    { name: "description", type: "ReactNode", description: "Texto de apoio." },
    { name: "actions", type: "ReactNode", description: "Botões alinhados à direita; quebram abaixo em telas estreitas." },
    { name: "breadcrumb", type: "ReactNode", description: "Trilha acima de tudo." },
    classNameProp,
  ],
  examples: [
    {
      title: "Listagem",
      className: "w-full",
      code: `<PageHeader\n  kicker="Painel"\n  title="Projetos"\n  description="Tudo o que está em andamento."\n  actions={<Button>Novo projeto</Button>}\n/>`,
      render: () => (
        <PageHeader
          className="w-full"
          breadcrumb="início / projetos"
          kicker="Painel"
          title="Projetos"
          description="Tudo o que está em andamento, pausado ou arquivado."
          actions={
            <>
              <Button variant="secondary">Exportar</Button>
              <Button>Novo projeto</Button>
            </>
          }
        />
      ),
    },
  ],
  a11y: ["Use um PageHeader por página: o título é o h1."],
};
