import { Button } from "@/registry/marcio/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/registry/marcio/ui/dialog";
import { FormField } from "@/registry/marcio/ui/form-field";
import { Input } from "@/registry/marcio/ui/input";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("dialog"),
  usage: {
    use: ["Tarefa curta e focada que interrompe o fluxo: editar um nome, arquivar com motivo, ler os termos.", "No máximo um diálogo aberto por vez."],
    avoid: ["Confirmar ação destrutiva ou sem volta: use AlertDialog.", "Conteúdo longo ou filtros com a lista visível: use Sheet.", "Avisos que não pedem resposta: use Alert ou Toast."],
  },
  keyboard: [
    { keys: "Tab / Shift + Tab", action: "Percorrem o conteúdo. O foco não sai do diálogo." },
    { keys: "Esc", action: "Fecha e devolve o foco ao gatilho." },
  ],
  props: [
    { name: "open / onOpenChange", type: "boolean / (open) => void", description: "Uso controlado." },
    { name: "DialogContent showClose", type: "boolean", default: "true", description: "Mostra o botão de fechar no canto." },
    { name: "DialogContent closeLabel", type: "string", default: '"Fechar"', description: "Nome acessível do botão de fechar." },
    { name: "DialogContent size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Largura máxima: 384, 512 ou 672px." },
  ],
  examples: [
    {
      title: "Formulário curto",
      code: `<Dialog>\n  <DialogTrigger asChild><Button variant="secondary">Renomear projeto</Button></DialogTrigger>\n  <DialogContent>\n    <DialogHeader>\n      <DialogTitle>Renomear projeto</DialogTitle>\n      <DialogDescription>O nome aparece na lista e nos relatórios.</DialogDescription>\n    </DialogHeader>\n    <FormField label="Nome"><Input defaultValue="ResenhaHub" /></FormField>\n    <DialogFooter>\n      <DialogClose asChild><Button variant="secondary">Cancelar</Button></DialogClose>\n      <DialogClose asChild><Button>Salvar</Button></DialogClose>\n    </DialogFooter>\n  </DialogContent>\n</Dialog>`,
      render: () => (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary">Renomear projeto</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Renomear projeto</DialogTitle>
              <DialogDescription>O nome aparece na lista e nos relatórios.</DialogDescription>
            </DialogHeader>
            <FormField label="Nome">
              <Input defaultValue="ResenhaHub" />
            </FormField>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Cancelar</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button>Salvar</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ),
    },
  ],
  a11y: [
    "O foco vai para dentro do diálogo e fica preso nele; Esc fecha e devolve o foco ao gatilho.",
    "DialogTitle e DialogDescription dão nome e descrição ao diálogo.",
    "O diálogo abre no tema da página, não no painel do exemplo.",
    "Para confirmar uma ação destrutiva, use AlertDialog: ele não fecha com clique fora e abre com o foco em Cancelar.",
  ],
};
