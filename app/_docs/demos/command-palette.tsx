"use client";

import { CommandGroup, CommandSeparator, CommandShortcut } from "@/registry/marcio/ui/command";
import { CommandPalette, CommandPaletteItem, CommandPaletteTrigger } from "@/registry/marcio/ui/command-palette";
import { toast } from "@/registry/marcio/ui/toast";

export function CommandPaletteDemo() {
  return (
    <CommandPalette shortcutKey={false} trigger={<CommandPaletteTrigger label="Buscar no painel" className="w-64" />}>
      <CommandGroup heading="Ações">
        <CommandPaletteItem onSelect={() => toast({ title: "Novo projeto", tone: "success" })}>
          Novo projeto
          <CommandShortcut>N</CommandShortcut>
        </CommandPaletteItem>
        <CommandPaletteItem onSelect={() => toast({ title: "Relatório exportado", tone: "info" })}>
          Exportar relatório
          <CommandShortcut>⌘E</CommandShortcut>
        </CommandPaletteItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Ir para">
        <CommandPaletteItem keywords={["dashboard", "inicio"]} onSelect={() => toast({ title: "Painel" })}>
          Painel
        </CommandPaletteItem>
        <CommandPaletteItem keywords={["preferencias", "conta"]} onSelect={() => toast({ title: "Configurações" })}>
          Configurações
        </CommandPaletteItem>
      </CommandGroup>
    </CommandPalette>
  );
}
