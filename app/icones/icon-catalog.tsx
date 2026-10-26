"use client";

import { useState } from "react";
import { CodeComment } from "@/registry/marcio/ui/code-comment";
import { Input } from "@/registry/marcio/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/registry/marcio/ui/table";
import { authoredIcons, iconPacks } from "../_docs/icons.generated";

const sizes = ["size-4", "size-5", "size-6"] as const;

export function IconCatalog() {
  const [query, setQuery] = useState("");
  const term = query.trim().toLowerCase();
  const matches = authoredIcons.filter((icon) => !term || icon.name.includes(term) || icon.tags.some((tag) => tag.includes(term)));

  return (
    <div className="flex flex-col gap-10">
      <Input
        type="search"
        aria-label="Buscar ícone por nome ou tag"
        placeholder="Buscar por nome ou tag"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="max-w-measure"
      />
      {iconPacks.map((pack) => {
        const icons = matches.filter((icon) => icon.pack === pack.name);
        if (!icons.length) return null;
        return (
          <section key={pack.name} aria-labelledby={`pacote-${pack.name}`} className="flex flex-col gap-3">
            <h2 id={`pacote-${pack.name}`} className="font-display text-display-sm font-extrabold">
              {pack.name}
            </h2>
            <p className="text-ink-soft">
              {pack.description}
              {pack.dependsOn.length > 0 && ` Depende de ${pack.dependsOn.join(", ")}.`}
            </p>
            <CodeComment>npx shadcn@latest add @marcio/icons-{pack.name}</CodeComment>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>nome</TableHead>
                  <TableHead>16, 20 e 24px</TableHead>
                  <TableHead>parecidos no lucide</TableHead>
                  <TableHead>tags</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {icons.map(({ name, Icon, similar, tags }) => (
                  <TableRow key={name} data-icon={name}>
                    <TableCell className="font-mono text-mono-sm">{name}</TableCell>
                    <TableCell>
                      <span className="flex items-end gap-4">
                        {sizes.map((size) => (
                          <Icon key={size} aria-hidden="true" className={size} />
                        ))}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-4">
                        {similar.map(({ name: lucideName, Icon: Similar }) => (
                          <Similar key={lucideName} aria-hidden="true" className="size-6 text-ink-muted" />
                        ))}
                        <span className="font-mono text-mono-xs text-ink-muted">{similar.map((icon) => icon.name).join(", ")}</span>
                      </span>
                    </TableCell>
                    <TableCell className="text-ink-soft">{tags.join(", ")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
        );
      })}
      {!matches.length && <p className="text-ink-soft">Nenhum ícone com esse nome ou tag.</p>}
    </div>
  );
}
