"use client";

import { Archive, Pencil } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/marcio/ui/alert-dialog";
import { Button } from "@/registry/marcio/ui/button";
import { toast } from "@/registry/marcio/ui/toast";

export function RecordActions({ name }: { name: string }) {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="secondary">
            <Archive aria-hidden="true" />
            Arquivar
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Arquivar projeto?</AlertDialogTitle>
            <AlertDialogDescription>{`${name} sai da lista de ativos. Você pode desfazer logo em seguida.`}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction variant="primary" onClick={() => toast({ tone: "info", title: "Nada foi arquivado", description: "Esta é uma tela de demonstração." })}>
              Arquivar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Button onClick={() => toast({ title: "Este é só um exemplo", description: "O botão abriria o formulário de edição." })}>
        <Pencil aria-hidden="true" />
        Editar
      </Button>
    </>
  );
}
