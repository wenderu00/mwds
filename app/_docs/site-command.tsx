"use client";

import { useRouter } from "next/navigation";
import { CommandGroup } from "@/registry/marcio/ui/command";
import { CommandPalette, CommandPaletteItem, CommandPaletteTrigger } from "@/registry/marcio/ui/command-palette";
import { setTheme } from "@/registry/marcio/ui/theme-toggle";

export type SiteCommandEntry = { href: string; label: string; group: string; keywords?: string[] };

export function SiteCommand({ entries }: { entries: SiteCommandEntry[] }) {
  const router = useRouter();
  const groups = [...new Set(entries.map((entry) => entry.group))];

  return (
    <CommandPalette
      title="Buscar no @mw/ui"
      placeholder="Componente, página ou comando"
      trigger={<CommandPaletteTrigger label="Buscar" className="hidden sm:inline-flex" />}
    >
      {groups.map((group) => (
        <CommandGroup key={group} heading={group}>
          {entries
            .filter((entry) => entry.group === group)
            .map((entry) => (
              <CommandPaletteItem key={entry.href} value={entry.href} keywords={[entry.label, ...(entry.keywords ?? [])]} onSelect={() => router.push(entry.href)}>
                {entry.label}
              </CommandPaletteItem>
            ))}
        </CommandGroup>
      ))}
      <CommandGroup heading="Tema">
        <CommandPaletteItem value="tema-escuro" keywords={["dark", "escuro"]} onSelect={() => setTheme("dark")}>
          Usar tema escuro
        </CommandPaletteItem>
        <CommandPaletteItem value="tema-claro" keywords={["light", "claro"]} onSelect={() => setTheme("light")}>
          Usar tema claro
        </CommandPaletteItem>
        <CommandPaletteItem value="tema-sistema" keywords={["system", "sistema"]} onSelect={() => setTheme("system")}>
          Seguir o sistema
        </CommandPaletteItem>
      </CommandGroup>
    </CommandPalette>
  );
}
