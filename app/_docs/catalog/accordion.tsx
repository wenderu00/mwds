import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/marcio/ui/accordion";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("accordion"),
  usage: {
    use: ["Perguntas frequentes e listas de seções em que a pessoa procura uma só.", "Reduzir uma página longa de configurações em grupos."],
    avoid: ["Conteúdo que quase todo mundo precisa ler: deixe aberto.", "Um único bloco de abre e fecha: use Collapsible.", "Navegar entre painéis do mesmo nível: use Tabs."],
  },
  props: [
    { name: "type", type: '"single" | "multiple"', description: "Uma seção aberta por vez ou várias." },
    { name: "collapsible", type: "boolean", default: "false", description: "Em single, permite fechar a seção aberta." },
    { name: "value / defaultValue", type: "string | string[]", description: "Seções abertas." },
    { name: "AccordionItem value", type: "string", description: "Identificador da seção." },
  ],
  examples: [
    {
      title: "Perguntas frequentes",
      className: "w-full flex-col items-stretch",
      code: `<Accordion type="single" collapsible defaultValue="instalar">\n  <AccordionItem value="instalar">\n    <AccordionTrigger>Como instalo um componente?</AccordionTrigger>\n    <AccordionContent>Rode npx shadcn@latest add @marcio/button.</AccordionContent>\n  </AccordionItem>\n</Accordion>`,
      render: () => (
        <Accordion type="single" collapsible defaultValue="instalar">
          <AccordionItem value="instalar">
            <AccordionTrigger>Como instalo um componente?</AccordionTrigger>
            <AccordionContent>Rode npx shadcn@latest add @marcio/button. O CLI instala o componente e as dependências.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="tema">
            <AccordionTrigger>Dá para usar só o tema claro?</AccordionTrigger>
            <AccordionContent>Sim. Coloque data-theme=&quot;light&quot; no html e não instale o ThemeToggle.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="atualizar">
            <AccordionTrigger>Como atualizo um componente?</AccordionTrigger>
            <AccordionContent>Rode o add de novo com --overwrite e confira a diferença antes de aceitar.</AccordionContent>
          </AccordionItem>
        </Accordion>
      ),
    },
  ],
  a11y: [
    "Cada gatilho é um botão dentro de um heading, com aria-expanded e aria-controls apontando para o conteúdo.",
    "O chevron gira e o texto muda de cor no hover, mas o estado aberto é anunciado por aria-expanded.",
    "Com movimento reduzido, abre e fecha sem animar a altura.",
  ],
  keyboard: [
    { keys: "Tab", action: "Percorre os gatilhos e o conteúdo aberto." },
    { keys: "Enter / Espaço", action: "Abre e fecha a seção com foco." },
    { keys: "Setas para cima e para baixo", action: "Movem o foco entre os gatilhos." },
    { keys: "Home / End", action: "Vão para o primeiro e o último gatilho." },
  ],
};
