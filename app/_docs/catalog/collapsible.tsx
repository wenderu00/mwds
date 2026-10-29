import { Button } from "@/registry/marcio/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/registry/marcio/ui/collapsible";
import { FormField } from "@/registry/marcio/ui/form-field";
import { Input } from "@/registry/marcio/ui/input";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("collapsible"),
  usage: {
    use: ["Esconder opções avançadas de um formulário atrás de um Mostrar opções avançadas.", "Mostrar mais itens de uma lista curta."],
    avoid: ["Várias seções do mesmo nível: use Accordion.", "Conteúdo sobre a página, como um painel flutuante: use Popover."],
  },
  props: [
    { name: "open / onOpenChange", type: "boolean / (open) => void", description: "Uso controlado." },
    { name: "defaultOpen", type: "boolean", default: "false", description: "Começa aberto." },
    { name: "CollapsibleTrigger asChild", type: "boolean", description: "Usa o seu botão como gatilho, por exemplo um Button ghost." },
  ],
  examples: [
    {
      title: "Opções avançadas",
      className: "w-full flex-col items-stretch",
      code: `<Collapsible>\n  <CollapsibleTrigger asChild>\n    <Button variant="ghost" size="sm">Opções avançadas</Button>\n  </CollapsibleTrigger>\n  <CollapsibleContent>...</CollapsibleContent>\n</Collapsible>`,
      render: (theme) => (
        <Collapsible className="flex flex-col gap-3">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="self-start">
              Opções avançadas
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <FormField label="Webhook" description="Recebe um POST a cada mudança no projeto." id={`col-${theme}`}>
              <Input placeholder="https://" />
            </FormField>
          </CollapsibleContent>
        </Collapsible>
      ),
    },
  ],
  a11y: ["O gatilho recebe aria-expanded e aria-controls.", "Diga no texto do gatilho o que vai aparecer: Opções avançadas, não Mais."],
  keyboard: [{ keys: "Enter / Espaço", action: "No gatilho, abre e fecha o conteúdo." }],
};
