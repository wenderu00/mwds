"use client";

import { Castle, Map as MapIcon, Store, Swords } from "lucide-react";
import { useState } from "react";
import { AppShell, AppShellAside, AppShellBody, AppShellHeader, AppShellMain, AppShellNav, AppShellNavGroup, AppShellNavItem, AppShellSidebar } from "@/registry/marcio/ui/app-shell";
import { LogoBlock } from "@/registry/marcio/ui/logo-block";

const kingdomNav = [
  { id: "castelo", label: "Castelo", icon: <Castle /> },
  { id: "mercado", label: "Mercado", icon: <Store /> },
  { id: "exercito", label: "Exército", icon: <Swords /> },
  { id: "mapa", label: "Mapa", icon: <MapIcon /> },
];

export function AppShellBottomDemo({ theme }: { theme: string }) {
  const [active, setActive] = useState("castelo");
  const current = kingdomNav.find((item) => item.id === active)!;
  return (
    <div data-testid={`app-shell-bottom-${theme}`} className="h-140 w-full overflow-hidden rounded-control border border-line contain-layout">
      <AppShell className="h-full min-h-0" mainId={`shell-bottom-main-${theme}`} mobileNav="bottom">
        <AppShellSidebar className="h-full" brand={<LogoBlock size="sm">GD</LogoBlock>}>
          <AppShellNav aria-label={`Reino (${theme})`}>
            <AppShellNavGroup label="Reino">
              {kingdomNav.map((item) => (
                <AppShellNavItem
                  key={item.id}
                  href={`#${item.id}`}
                  label={item.label}
                  icon={item.icon}
                  active={item.id === active}
                  onClick={(event) => {
                    event.preventDefault();
                    setActive(item.id);
                  }}
                />
              ))}
            </AppShellNavGroup>
          </AppShellNav>
        </AppShellSidebar>
        <AppShellBody className="min-h-0 overflow-y-auto">
          <AppShellHeader className="static">
            <span className="font-display text-display-sm font-extrabold">{current.label}</span>
          </AppShellHeader>
          <AppShellMain as="div" id={`shell-bottom-main-${theme}`}>
            <p className="text-ink-soft">No celular, os mesmos itens da sidebar viram abas no rodapé. A fila ao lado vai para baixo do conteúdo.</p>
          </AppShellMain>
          <AppShellAside aria-label={`Fila de construção (${theme})`}>
            <p className="font-mono text-mono-xs tracking-kicker text-ink-muted uppercase">Fila</p>
            <p className="mt-2 text-ink-soft">Quartel em 2 min</p>
          </AppShellAside>
        </AppShellBody>
      </AppShell>
    </div>
  );
}

// Cena de exemplo para o SceneCanvas: oito pontos em órbita, um por categoria.
