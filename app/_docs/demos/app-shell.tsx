"use client";

import { Folder, LayoutDashboard, Settings, Users } from "lucide-react";
import { useState } from "react";
import { AppShell, AppShellBody, AppShellHeader, AppShellMain, AppShellNav, AppShellNavGroup, AppShellNavItem, AppShellSidebar } from "@/registry/marcio/ui/app-shell";
import { Avatar } from "@/registry/marcio/ui/avatar";
import { BreadcrumbTrail } from "@/registry/marcio/ui/breadcrumb";
import { LogoBlock } from "@/registry/marcio/ui/logo-block";

const shellNav = [
  { id: "painel", label: "Painel", icon: <LayoutDashboard aria-hidden="true" /> },
  { id: "projetos", label: "Projetos", icon: <Folder aria-hidden="true" /> },
  { id: "equipe", label: "Equipe", icon: <Users aria-hidden="true" /> },
  { id: "configuracoes", label: "Configurações", icon: <Settings aria-hidden="true" /> },
];

export function AppShellDemo({ theme }: { theme: string }) {
  const [active, setActive] = useState("painel");
  const current = shellNav.find((item) => item.id === active)!;
  return (
    <div className="h-110 w-full overflow-hidden rounded-control border border-line">
      <AppShell className="h-full min-h-0" mainId={`shell-main-${theme}`}>
        <AppShellSidebar className="h-full" brand={<LogoBlock size="sm">MW</LogoBlock>} footer={<span className="font-mono text-mono-xs text-ink-muted">v0.1</span>}>
          <AppShellNav aria-label={`Principal (${theme})`}>
            <AppShellNavGroup label="Geral">
              {shellNav.map((item) => (
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
            <BreadcrumbTrail items={[{ label: "Início", href: "#" }, { label: current.label }]} />
            <Avatar name="Márcio Wendell" size="sm" className="ml-auto" />
          </AppShellHeader>
          <AppShellMain as="div" id={`shell-main-${theme}`}>
            <h4 className="font-display text-display-sm font-extrabold">{current.label}</h4>
            <p className="mt-2 text-ink-soft">Conteúdo da página. Recolha a sidebar pelo botão do cabeçalho.</p>
          </AppShellMain>
        </AppShellBody>
      </AppShell>
    </div>
  );
}
