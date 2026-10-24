"use client";

import { Folder, LayoutDashboard, Settings, Users } from "lucide-react";
import { useState } from "react";
import { Alert } from "@/registry/marcio/ui/alert";
import {
  AppShell,
  AppShellBody,
  AppShellHeader,
  AppShellMain,
  AppShellNav,
  AppShellNavGroup,
  AppShellNavItem,
  AppShellSidebar,
} from "@/registry/marcio/ui/app-shell";
import { Avatar } from "@/registry/marcio/ui/avatar";
import { BreadcrumbTrail } from "@/registry/marcio/ui/breadcrumb";
import { Button } from "@/registry/marcio/ui/button";
import { CommandGroup, CommandSeparator, CommandShortcut } from "@/registry/marcio/ui/command";
import { CommandPalette, CommandPaletteItem, CommandPaletteTrigger } from "@/registry/marcio/ui/command-palette";
import { DataTable, type DataTableColumn } from "@/registry/marcio/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/registry/marcio/ui/dropdown-menu";
import { LogoBlock } from "@/registry/marcio/ui/logo-block";
import { Pagination } from "@/registry/marcio/ui/pagination";
import { Progress } from "@/registry/marcio/ui/progress";
import { Stepper } from "@/registry/marcio/ui/stepper";
import { toast, type ToastTone } from "@/registry/marcio/ui/toast";

export function AlertDismissDemo() {
  const [visible, setVisible] = useState(true);
  if (!visible) {
    return (
      <Button variant="secondary" size="sm" onClick={() => setVisible(true)}>
        Mostrar aviso de novo
      </Button>
    );
  }
  return (
    <Alert
      tone="warning"
      title="Sua sessão expira em 5 minutos"
      onDismiss={() => setVisible(false)}
      action={
        <Button size="sm" variant="secondary" onClick={() => toast({ tone: "success", title: "Sessão renovada" })}>
          Continuar conectado
        </Button>
      }
      className="w-full"
    >
      Salve o que estiver editando para não perder alterações.
    </Alert>
  );
}

export function ProgressDemo() {
  const [value, setValue] = useState(35);
  return (
    <div className="flex w-full flex-col gap-4">
      <Progress value={value} label="Enviando 3 arquivos" showValue />
      <div className="flex gap-2">
        <Button size="sm" variant="secondary" onClick={() => setValue((v) => Math.max(0, v - 15))}>
          -15%
        </Button>
        <Button size="sm" variant="secondary" onClick={() => setValue((v) => Math.min(100, v + 15))}>
          +15%
        </Button>
      </div>
    </div>
  );
}

export function PaginationDemo({ pageCount }: { pageCount: number }) {
  const [page, setPage] = useState(1);
  return <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />;
}

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
        <DropdownMenuItem variant="danger" onSelect={() => toast({ title: "Projeto excluído", tone: "danger" })}>
          Excluir
          <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const samples: { tone: ToastTone; label: string; title: string; description: string }[] = [
  { tone: "success", label: "Sucesso", title: "Conta criada", description: "Você já pode entrar no painel." },
  { tone: "danger", label: "Erro", title: "Não foi possível salvar", description: "Verifique a conexão e tente de novo." },
  { tone: "warning", label: "Aviso", title: "Sessão expira em 5 minutos", description: "Salve o que estiver editando." },
  { tone: "info", label: "Info", title: "Nova versão disponível", description: "Recarregue a página para atualizar." },
  { tone: "neutral", label: "Neutro", title: "Rascunho salvo", description: "Última alteração agora." },
];

export function ToastDemo() {
  return (
    <>
      {samples.map((sample) => (
        <Button
          key={sample.tone}
          variant="secondary"
          size="sm"
          onClick={() => toast({ tone: sample.tone, title: sample.title, description: sample.description })}
        >
          {sample.label}
        </Button>
      ))}
    </>
  );
}

export function ToastActionDemo() {
  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={() =>
        toast({
          title: "Projeto arquivado",
          action: { label: "Desfazer", altText: "Desfazer arquivamento", onClick: () => toast({ tone: "info", title: "Arquivamento desfeito" }) },
        })
      }
    >
      Arquivar projeto
    </Button>
  );
}

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
    <div className="h-[440px] w-full overflow-hidden rounded-control border border-line">
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
          <AppShellMain id={`shell-main-${theme}`}>
            <h4 className="font-display text-display-sm font-extrabold">{current.label}</h4>
            <p className="mt-2 text-ink-soft">Conteúdo da página. Recolha a sidebar pelo botão do cabeçalho.</p>
          </AppShellMain>
        </AppShellBody>
      </AppShell>
    </div>
  );
}

type DemoProject = { id: string; name: string; owner: string; hours: number };

const demoProjects: DemoProject[] = [
  { id: "1", name: "ResenhaHub", owner: "Ana Lima", hours: 120 },
  { id: "2", name: "Ouvidoria Digital", owner: "Bruno Costa", hours: 86 },
  { id: "3", name: "Agenda de Vacinação", owner: "Carla Souza", hours: 240 },
  { id: "4", name: "Ágora", owner: "Diego Rocha", hours: 12 },
  { id: "5", name: "Bússola", owner: "Elisa Martins", hours: 58 },
];

const demoColumns: DataTableColumn<DemoProject>[] = [
  { id: "nome", header: "Projeto", sortValue: (row) => row.name, cell: (row) => <span className="font-medium text-ink">{row.name}</span> },
  { id: "responsavel", header: "Responsável", sortValue: (row) => row.owner, cell: (row) => row.owner },
  { id: "horas", header: "Horas", align: "right", className: "font-mono text-mono-sm", sortValue: (row) => row.hours, cell: (row) => row.hours },
];

export function DataTableDemo() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  return (
    <div className="flex w-full min-w-0 flex-col gap-2">
      <DataTable
        data={demoProjects}
        columns={demoColumns}
        getRowId={(row) => row.id}
        pageSize={3}
        selectable
        selected={selected}
        onSelectedChange={setSelected}
        rowLabel={(row) => row.name}
        caption={({ first, last, total }) => `Mostrando ${first} a ${last} de ${total}`}
      />
      <p aria-live="polite" className="font-mono text-mono-xs text-ink-muted">
        {`// ${selected.size} selecionado${selected.size === 1 ? "" : "s"}`}
      </p>
    </div>
  );
}

const demoSteps = [
  { title: "Dados", description: "Nome e documento" },
  { title: "Endereço", description: "CEP e número" },
  { title: "Revisão", description: "Confira e envie" },
];

export function StepperDemo() {
  const [current, setCurrent] = useState(1);
  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper steps={demoSteps} current={current} onStepChange={setCurrent} aria-label="Cadastro" />
      <div className="flex gap-2">
        <Button variant="secondary" size="sm" disabled={current === 0} onClick={() => setCurrent(current - 1)}>
          Voltar
        </Button>
        <Button size="sm" disabled={current === demoSteps.length} onClick={() => setCurrent(current + 1)}>
          {current >= demoSteps.length - 1 ? "Concluir" : "Continuar"}
        </Button>
      </div>
    </div>
  );
}
