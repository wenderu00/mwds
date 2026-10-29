"use client";

import { useState } from "react";
import { Button } from "@/registry/marcio/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/registry/marcio/ui/dropdown-menu";
import { toast } from "@/registry/marcio/ui/toast";

export function DropdownMenuDemo() {
  const [compact, setCompact] = useState(false);
  const [sort, setSort] = useState("recentes");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">Ações do projeto</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Projeto</DropdownMenuLabel>
        <DropdownMenuItem onSelect={() => toast({ title: "Editar projeto" })}>
          Editar
          <DropdownMenuShortcut>E</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => toast({ title: "Projeto duplicado", tone: "success" })}>
          Duplicar
          <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Mover para</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Join Tecnologia</DropdownMenuItem>
            <DropdownMenuItem>Produto próprio</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={compact} onCheckedChange={setCompact}>
          Modo compacto
        </DropdownMenuCheckboxItem>
        <DropdownMenuLabel>Ordenar</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
          <DropdownMenuRadioItem value="recentes">Mais recentes</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="nome">Nome</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem tone="danger" onSelect={() => toast({ title: "Projeto excluído", tone: "danger" })}>
          Excluir
          <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
