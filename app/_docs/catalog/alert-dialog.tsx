import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/registry/marcio/ui/alert-dialog";
import { Button } from "@/registry/marcio/ui/button";
import { metaOf } from "../catalog-meta";
import { type ComponentDoc } from "./shared";

export const doc: ComponentDoc = {
  ...metaOf("alert-dialog"),
  usage: {
    use: ["Confirmar uma ação destrutiva ou sem volta: excluir, publicar, encerrar conta.", "O título é uma pergunta e o botão repete o verbo: Excluir projeto? / Excluir."],
    avoid: ["Ações que podem ser desfeitas: faça direto e ofereça Desfazer num Toast.", "Tarefas com campos: use Dialog."],
  },
  props: [
    { name: "open / onOpenChange", type: "boolean / (open) => void", description: "Uso controlado, por exemplo para abrir a partir de um item de menu." },
    { name: "AlertDialogAction variant", type: '"danger" | "primary" | "secondary" | "ghost"', default: '"danger"', description: "Botão de confirmação. Aceita as props do Button, como onClick e loading." },
    { name: "AlertDialogCancel variant", type: '"secondary" | "ghost" | "primary" | "danger"', default: '"secondary"', description: "Botão que fecha sem confirmar. Recebe o foco ao abrir." },
    { name: "AlertDialogContent size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Largura máxima: 384, 448 ou 512px." },
  ],
  examples: [
    {
      title: "Confirmação destrutiva",
      code: `<AlertDialog>\n  <AlertDialogTrigger asChild><Button variant="danger">Excluir projeto</Button></AlertDialogTrigger>\n  <AlertDialogContent>\n    <AlertDialogHeader>\n      <AlertDialogTitle>Excluir projeto?</AlertDialogTitle>\n      <AlertDialogDescription>Essa ação não pode ser desfeita.</AlertDialogDescription>\n    </AlertDialogHeader>\n    <AlertDialogFooter>\n      <AlertDialogCancel>Cancelar</AlertDialogCancel>\n      <AlertDialogAction onClick={excluir}>Excluir</AlertDialogAction>\n    </AlertDialogFooter>\n  </AlertDialogContent>\n</AlertDialog>`,
      render: () => (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="danger">Excluir projeto</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Excluir projeto?</AlertDialogTitle>
              <AlertDialogDescription>O ResenhaHub e todos os dados ligados a ele serão apagados. Essa ação não pode ser desfeita.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction>Excluir</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ),
    },
    {
      title: "Ação sem volta, não destrutiva",
      description: "Quando a ação não apaga nada mas não pode ser desfeita, troque a variante da confirmação.",
      code: `<AlertDialogAction variant="primary">Publicar</AlertDialogAction>`,
      render: () => (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="secondary">Publicar versão</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Publicar a versão 2.0?</AlertDialogTitle>
              <AlertDialogDescription>Todos os usuários passam a ver a versão nova. Uma versão publicada não volta para rascunho.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction variant="primary">Publicar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ),
    },
  ],
  a11y: [
    "Tem role alertdialog, com nome no AlertDialogTitle e descrição no AlertDialogDescription.",
    "Abre com o foco em Cancelar: um Enter apressado não confirma nada.",
    "Clicar fora não fecha. A pessoa precisa escolher Cancelar, a confirmação ou Esc.",
    "Use só para ação destrutiva ou sem volta. Ação que pode ser desfeita usa Dialog ou um toast com Desfazer.",
  ],
  keyboard: [
    { keys: "Tab / Shift + Tab", action: "Alterna entre Cancelar e a confirmação. O foco não sai do diálogo." },
    { keys: "Enter / Espaço", action: "Ativa o botão com foco." },
    { keys: "Esc", action: "Fecha sem confirmar, como Cancelar, e devolve o foco ao gatilho." },
  ],
};
