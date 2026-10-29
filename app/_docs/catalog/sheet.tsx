import { Button } from "@/registry/marcio/ui/button";
import { FormField } from "@/registry/marcio/ui/form-field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/marcio/ui/select";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/registry/marcio/ui/sheet";
import { Switch } from "@/registry/marcio/ui/switch";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("sheet"),
  usage: {
    use: ["Filtros e edição rápida mantendo a lista visível por trás.", "Conteúdo mais longo que um Dialog comporta, como um formulário de vários campos.", "Navegação no mobile, como faz o AppShell."],
    avoid: ["Tarefa curta e focada: use Dialog.", "Confirmar uma ação destrutiva: use AlertDialog."],
  },
  keyboard: [
    { keys: "Tab / Shift + Tab", action: "Percorrem o conteúdo. O foco não sai do painel." },
    { keys: "Esc", action: "Fecha e devolve o foco ao gatilho." },
  ],
  props: [
    { name: "SheetContent side", type: '"right" | "left" | "top" | "bottom"', default: '"right"', description: "Lado de onde o painel entra." },
    { name: "open / onOpenChange", type: "boolean / (open) => void", description: "Uso controlado." },
    { name: "SheetContent closeLabel", type: "string", default: '"Fechar"', description: "Nome do botão de fechar." },
  ],
  examples: [
    {
      title: "Filtros",
      code: `<Sheet>\n  <SheetTrigger asChild><Button variant="secondary">Filtros</Button></SheetTrigger>\n  <SheetContent>\n    <SheetHeader>\n      <SheetTitle>Filtros</SheetTitle>\n      <SheetDescription>Refine a lista.</SheetDescription>\n    </SheetHeader>\n    ...\n  </SheetContent>\n</Sheet>`,
      render: (theme) => (
        <>
          {(["right", "left", "bottom"] as const).map((side) => (
            <Sheet key={side}>
              <SheetTrigger asChild>
                <Button variant="secondary">{side === "right" ? "Direita" : side === "left" ? "Esquerda" : "Embaixo"}</Button>
              </SheetTrigger>
              <SheetContent side={side}>
                <SheetHeader>
                  <SheetTitle>Filtros</SheetTitle>
                  <SheetDescription>Refine a lista de projetos.</SheetDescription>
                </SheetHeader>
                <FormField label="Status" id={`sheet-status-${side}-${theme}`}>
                  <Select defaultValue="todos">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="ativo">Ativo</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Só os meus" orientation="horizontal" id={`sheet-meus-${side}-${theme}`}>
                  <Switch />
                </FormField>
                <SheetClose asChild>
                  <Button className="mt-auto">Aplicar filtros</Button>
                </SheetClose>
              </SheetContent>
            </Sheet>
          ))}
        </>
      ),
    },
  ],
  a11y: ["É um diálogo: prende o foco, fecha com Esc e devolve o foco ao gatilho.", "Abre no tema da página."],
};
