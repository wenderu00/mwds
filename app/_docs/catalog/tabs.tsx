import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/marcio/ui/tabs";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc, classNameProp } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("tabs"),
  usage: {
    use: ["Alternar entre painéis de conteúdo relacionados na mesma página, como as seções de Configurações.", "De duas a seis abas com rótulos curtos."],
    avoid: ["Filtrar ou trocar a visualização dos mesmos dados: use ToggleGroup.", "Etapas que precisam ser feitas em ordem: use Stepper.", "Navegar entre páginas: use links."],
  },
  keyboard: [
    { keys: "Tab", action: "Entra na aba ativa e depois vai para o painel." },
    { keys: "Setas para a esquerda e para a direita", action: "Trocam de aba." },
    { keys: "Home / End", action: "Vão para a primeira e a última aba." },
  ],
  props: [
    { name: "defaultValue / value", type: "string", description: "Aba inicial ou controlada." },
    { name: "onValueChange", type: "(value) => void", description: "Chamado ao trocar de aba." },
    classNameProp,
  ],
  examples: [
    {
      title: "Básico",
      className: "w-full",
      code: `<Tabs defaultValue="visao-geral">\n  <TabsList aria-label="Seções do projeto">\n    <TabsTrigger value="visao-geral">visão geral</TabsTrigger>\n    <TabsTrigger value="tarefas">tarefas</TabsTrigger>\n  </TabsList>\n  <TabsContent value="visao-geral">...</TabsContent>\n</Tabs>`,
      render: () => (
        <Tabs defaultValue="visao-geral" className="w-full">
          <TabsList aria-label="Seções do projeto">
            <TabsTrigger value="visao-geral">visão geral</TabsTrigger>
            <TabsTrigger value="tarefas">tarefas</TabsTrigger>
            <TabsTrigger value="config" disabled>
              configurações
            </TabsTrigger>
          </TabsList>
          <TabsContent value="visao-geral" className="text-ink-soft">
            Resumo do projeto.
          </TabsContent>
          <TabsContent value="tarefas" className="text-ink-soft">
            12 tarefas abertas.
          </TabsContent>
        </Tabs>
      ),
    },
  ],
  a11y: ["Setas trocam de aba; Tab entra no painel.", "Dê um aria-label ao TabsList."],
};
