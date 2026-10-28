"use client";

import { Castle, Coins, Folder, LayoutDashboard, Map as MapIcon, Settings, Store, Swords, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Alert } from "@/registry/marcio/ui/alert";
import {
  AppShell,
  AppShellAside,
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
import { FileUpload, type FileUploadStatus } from "@/registry/marcio/ui/file-upload";
import { FormField } from "@/registry/marcio/ui/form-field";
import { LogoBlock } from "@/registry/marcio/ui/logo-block";
import { Pagination } from "@/registry/marcio/ui/pagination";
import { Meter } from "@/registry/marcio/ui/meter";
import { Progress } from "@/registry/marcio/ui/progress";
import { SceneCanvas, type Scene } from "@/registry/marcio/ui/scene-canvas";
import { Sentinel, type SentinelPose } from "@/registry/marcio/ui/character-sentinel";
import { CharacterStage, type CharacterAnimate } from "@/registry/marcio/ui/character-stage";
import { Stepper } from "@/registry/marcio/ui/stepper";
import { toast, type ToastTone } from "@/registry/marcio/ui/toast";
import { Tour } from "@/registry/marcio/ui/tour";

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

export function PaginationDemo({ pageCount, label }: { pageCount: number; label: string }) {
  const [page, setPage] = useState(1);
  return <Pagination page={page} pageCount={pageCount} onPageChange={setPage} labels={{ navigation: label }} />;
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

export function TourDemo() {
  const [open, setOpen] = useState(false);
  const timer = useRef<HTMLParagraphElement>(null);
  const start = useRef<HTMLButtonElement>(null);
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <p ref={timer} className="font-mono text-display-sm text-ink">
        25:00
      </p>
      <div className="flex gap-2">
        <Button ref={start} size="sm">
          Iniciar foco
        </Button>
        <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
          Ver tour
        </Button>
      </div>
      <Tour
        open={open}
        onOpenChange={setOpen}
        steps={[
          { target: timer, title: "Tempo restante", content: "Cada ciclo de foco tem 25 minutos.", placement: "right" },
          { target: start, title: "Comece por aqui", content: "Inicie o foco e o tempo começa a contar." },
          { title: "Tudo pronto", content: "Você pode rever este tour nas configurações." },
        ]}
      />
    </div>
  );
}

// Envio simulado: 20% a cada 300ms; o segundo arquivo da lista cai em 60% na primeira tentativa.
export function FileUploadProgressDemo({ id }: { id: string }) {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState(new Map<File, FileUploadStatus>());
  const failed = useRef(new Set<File>());

  useEffect(() => {
    const timer = setInterval(() => {
      setStatus((current) => {
        let changed = false;
        const next = new Map(current);
        files.forEach((file, index) => {
          const state = next.get(file) ?? { progress: 0 };
          if (state.done || state.error || state.progress === undefined || state.progress === null) return;
          changed = true;
          const progress = state.progress + 20;
          if (index === 1 && progress >= 60 && !failed.current.has(file)) {
            failed.current.add(file);
            next.set(file, { error: "A conexão caiu em 60%. Envie de novo." });
          } else next.set(file, progress >= 100 ? { done: true } : { progress });
        });
        return changed ? next : current;
      });
    }, 300);
    return () => clearInterval(timer);
  }, [files]);

  return (
    <FormField label="Documentos" id={id} className="w-full">
      <FileUpload
        multiple
        maxFiles={3}
        hint="Escolha dois ou três arquivos para ver o envio"
        value={files}
        onValueChange={setFiles}
        fileStatus={(file) => status.get(file) ?? { progress: 0 }}
        onRetry={(file) => setStatus((current) => new Map(current).set(file, { progress: 0 }))}
      />
    </FormField>
  );
}

export function MeterDemo() {
  const [gold, setGold] = useState(1234);
  const [loots, setLoots] = useState(0);
  return (
    <div className="flex w-full flex-col gap-4">
      <Meter label="Ouro" value={gold} max={5000} rate="+40/min" icon={<Coins />} highlightKey={loots} />
      <Button
        size="sm"
        variant="secondary"
        className="self-start"
        onClick={() => {
          setGold((value) => Math.min(5000, value + 250));
          setLoots((count) => count + 1);
        }}
      >
        Saquear
      </Button>
    </div>
  );
}

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
const orbit: Scene = ({ app, PIXI, tokens }) => {
  const dots = Array.from({ length: 8 }, (_, i) => {
    const dot = new PIXI.Graphics().circle(0, 0, 5).fill(0xffffff);
    dot.tint = tokens.pixi[`category-${(i + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}-line`];
    app.stage.addChild(dot);
    return dot;
  });
  let time = 0;
  const tick = ({ deltaMS }: { deltaMS: number }) => {
    time += deltaMS / 1000;
    const { width, height } = app.screen;
    dots.forEach((dot, i) => {
      const angle = time * 0.8 + (i / dots.length) * Math.PI * 2;
      dot.position.set(width / 2 + Math.cos(angle) * width * 0.3, height / 2 + Math.sin(angle) * height * 0.3);
    });
  };
  app.ticker.add(tick);
  return {
    api: undefined,
    theme: (next) => dots.forEach((dot, i) => (dot.tint = next.pixi[`category-${(i + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}-line`])),
    destroy: () => app.ticker.remove(tick),
  };
};

export function SceneCanvasDemo() {
  return (
    <SceneCanvas
      scene={orbit}
      options={undefined}
      fallback={<p className="flex h-full items-center justify-center font-mono text-mono-xs text-ink-muted">quadro estático</p>}
      className="h-40 w-full rounded-control border border-line"
    />
  );
}

const poseLabels: Record<SentinelPose, string> = { idle: "Parada", celebrar: "Celebrar", duvida: "Dúvida" };

export function SentinelDemo() {
  const [pose, setPose] = useState<SentinelPose>("idle");
  return (
    <div className="flex flex-col items-center gap-4">
      <Sentinel pose={pose} label={`Sentinela, pose ${poseLabels[pose].toLowerCase()}`} />
      <div className="flex gap-2">
        {(Object.keys(poseLabels) as SentinelPose[]).map((name) => (
          <Button key={name} size="sm" variant={pose === name ? "primary" : "secondary"} aria-pressed={pose === name} onClick={() => setPose(name)}>
            {poseLabels[name]}
          </Button>
        ))}
      </div>
    </div>
  );
}

// Animação própria: a bola quica; com movimento reduzido, só acende.
const quicar: CharacterAnimate = ({ gsap, part, tokens, reduced }) => {
  if (reduced) {
    gsap.to(part("bola"), { fill: tokens.color.success, duration: 0.3, repeat: 1, yoyo: true });
    return;
  }
  gsap.to(part("bola"), { y: -40, duration: 0.4, ease: "power2.out", repeat: 3, yoyo: true });
};

export function CharacterStageDemo() {
  const [round, setRound] = useState(0);
  return (
    <div className="flex flex-col items-center gap-4">
      <CharacterStage width={120} height={80} animate={quicar} replay={round} className="max-w-40">
        <circle data-parte="bola" cx={60} cy={66} r={10} className="fill-accent" />
        <line x1={20} y1={77} x2={100} y2={77} className="stroke-line" strokeDasharray="2 6" />
      </CharacterStage>
      <Button size="sm" variant="secondary" onClick={() => setRound((n) => n + 1)}>
        Quicar de novo
      </Button>
    </div>
  );
}